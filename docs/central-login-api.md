# Central admin login API (lmsdomain.com)

How the login form on **lmsdomain.com** signs an academy admin in and sends them to their own academy's dashboard.

> **Status: planned.** This is the agreed contract. Build the form against it; the API goes live on the central domain once the backend is done. Ask the Laravel team for the reCAPTCHA site key and the staging central URL.

## Who can use it

- **Academy admins only.** Instructors, students and super admins get "Incorrect email or password", as if the account didn't exist.
- Point instructors and students to their academy's own login page instead. A "Not an admin? Log in on your academy's site" note under the form is enough.

## The flow

1. The admin enters their email and password on lmsdomain.com.
2. The landing site sends them to `POST /api/central-login`.
3. The API answers with one of two results:
   - **`redirect`**: one matching academy. Go to step 5.
   - **`choose`**: the email is an admin in several academies. Show the list (step 4).
4. The admin picks an academy, and the landing site sends the choice to `POST /api/central-login/select`. That returns a `redirect`.
5. The browser **posts a form** to the academy's address with the one-time token. The academy logs the admin in and shows:
   - the dashboard, or
   - the login-code page, if the academy requires a code. Admins enter it there, on the academy's site.

The landing site never stores passwords, tokens or sessions. Each academy keeps its own login session.

## Setup: the central domain

The API runs on the **central domain**, the main LMS app that holds the platform's data:

- every academy
- their domains
- their plans
- the lookup list of admin emails

From there it can check an admin's password in their academy. The landing site only ever talks to the central domain, never to an academy directly.

**Landing site (you add this).** Set the central domain as a server setting, read at request time (not a `NEXT_PUBLIC_` build-time value), so one image runs on staging and production. Don't hard-code it anywhere in the code:

```dotenv
# hosting environment settings
LMS_CENTRAL_URL=https://app.lmsdomain.com
```

| Environment | `LMS_CENTRAL_URL` |
|---|---|
| Production | `https://app.lmsdomain.com` |
| Staging | From the Laravel team |
| Local | From the Laravel team (e.g. `http://localhost:8000`) |

- **Format:** HTTPS (except local), with no trailing slash and no path. Every endpoint below is added to it, e.g. `${LMS_CENTRAL_URL}/api/central-login`.
- **If the central domain ever changes,** update this variable and redeploy; no code changes.

**LMS side (the Laravel team adds this).** The API only answers requests from landing sites on its allowed list. Send the Laravel team every address the form will run on (production, `www`, staging, local), so they can add them:

```dotenv
# LMS .env
CENTRAL_LOGIN_ALLOWED_ORIGINS=https://lmsdomain.com,https://www.lmsdomain.com
```

| LMS environment | Allowed origins |
|---|---|
| Production | `https://lmsdomain.com`, `https://www.lmsdomain.com` |
| Staging | `https://staging.lmsdomain.online` |
| Local only | `http://localhost:3001`, `http://127.0.0.1:3001` (never on production) |

CORS headers are sent on **every** response from these endpoints, including the `OPTIONS` preflight, `422`, `429` (rate limit) and `503` (maintenance mode), so the browser always lets you read the error body.

A request from an address not on that list is refused by the browser (CORS error).

## Basics

| | |
|---|---|
| Base URL | `LMS_CENTRAL_URL` (see Setup) |
| Format | JSON in, JSON out. Send `Content-Type: application/json` and `Accept: application/json`. |
| Cookies | None. Use `credentials: 'omit'`. |
| CORS | Only the addresses in `CENTRAL_LOGIN_ALLOWED_ORIGINS` are allowed. |
| HTTPS | Required. Plain HTTP is refused (except local). |

Every response has a `status` field. Errors also have a `code` (use this in your logic) and a `message` (safe to show to the user).

---

## 1. `POST /api/central-login`

Checks the email and password.

### Request

```json
{
  "email": "owner@acme.com",
  "password": "the-password",
  "remember": false,
  "recaptcha_token": "token-from-the-recaptcha-widget"
}
```

| Field | Required | Notes |
|---|---|---|
| `email` | Yes | Max 255 characters. Case doesn't matter. |
| `password` | Yes | Sent as typed. Don't trim or change it. |
| `remember` | No | `true` keeps the admin signed in on the academy ("Remember me"). Default `false`. |
| `recaptcha_token` | Yes | From the Google reCAPTCHA **v2 checkbox** ("I'm not a robot"), using the central site key (separate from academies' own keys). Get a fresh token for every attempt. |

### Response: one academy (`200`)

```json
{
  "status": "redirect",
  "redirect": {
    "url": "https://acme.lmsdomain.com/auth/handoff",
    "token": "k3J9...long-random-string...Qx",
    "expires_in": 60
  },
  "academy": {
    "id": "acme",
    "name": "Acme Academy",
    "logo_url": "https://acme.lmsdomain.com/uploads/logo.png"
  }
}
```

Go to [3. Sending the admin to the academy](#3-sending-the-admin-to-the-academy) **immediately**. The token works once and expires after `expires_in` seconds.

### Response: several academies (`200`)

```json
{
  "status": "choose",
  "selection_token": "p8Lm...long-random-string...7d",
  "expires_in": 300,
  "academies": [
    { "id": "acme", "name": "Acme Academy", "logo_url": "https://acme.lmsdomain.com/uploads/logo.png", "domain": "acme.lmsdomain.com" },
    { "id": "globex", "name": "Globex IELTS", "logo_url": null, "domain": "learn.globex.in" }
  ]
}
```

- **What's listed:** only academies where this email is an admin **and** the password matched. Suspended academies are left out. If only one academy remains after that, you get `redirect` instead of `choose`.
- **Display:** show each academy's logo (or its initials when `logo_url` is `null`), name and domain.
- **Order:** keep the order the API sends.
- **Time limit:** the admin has `expires_in` seconds (5 minutes) to pick.

---

## 2. `POST /api/central-login/select`

Sends the admin's choice from the list.

### Request

```json
{
  "selection_token": "p8Lm...7d",
  "academy_id": "globex"
}
```

### Response (`200`)

The same `redirect` response as above, including the `academy` object, so you can show "Taking you to Globex IELTS…". Then go to step 3.

- **The selection token works once.** If the admin goes back and picks again, they must log in again.

---

## 3. Sending the admin to the academy

**Submit a real form (a full-page navigation), not `fetch`.** The academy has to set its login cookie in the browser, which only happens on a real page load. Don't put the token in the URL.

```ts
function goToAcademy(redirect: { url: string; token: string }) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = redirect.url;

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'token';
  input.value = redirect.token;

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
}
```

- **Use `redirect.url` exactly as returned.** Never build it yourself. Academies can move to their own custom domain at any time.
- **Field name:** the form field must be `token`. Send no other fields.
- **The academy's `/auth/handoff` route:**
  - it accepts this cross-site post (no CSRF field needed) and doesn't need an existing session
  - it checks the token belongs to that academy, then starts a fresh session
  - the token is never written to logs
- **What the admin sees next** happens on the academy's site:
  - **Dashboard:** signed in.
  - **Login code page:** the academy emailed a code; the admin enters it there.
  - **The academy's login page, with a message:** the token expired or was already used, and the admin can log in there directly.

---

## Errors

| HTTP | `code` | When | Show the user |
|---|---|---|---|
| 422 | `validation_failed` | Missing or badly formatted field. `errors` lists them per field. | The message under each field |
| 422 | `recaptcha_failed` | reCAPTCHA token missing, expired or rejected | "Please confirm you're not a robot and try again." Reset the widget. |
| 422 | `invalid_credentials` | Wrong email or password, not an admin, or account disabled | "Incorrect email or password." |
| 403 | `academy_suspended` | Every matching academy is suspended | "This academy is currently unavailable. Please contact support." |
| 422 | `selection_expired` | `selection_token` is older than 5 minutes or already used | "That took too long. Please log in again." Go back to the login form. |
| 422 | `invalid_selection` | `academy_id` isn't in the list that was offered | "Please log in again." Go back to the login form. |
| 429 | `too_many_attempts` | Too many attempts (see limits) | "Too many attempts. Try again in N minutes." Use `retry_after`. |
| 503 | `service_unavailable` | Temporary problem on our side | "We can't sign you in right now. Please try again shortly." |

Error body:

```json
{
  "status": "error",
  "code": "invalid_credentials",
  "message": "Incorrect email or password."
}
```

Validation error body:

```json
{
  "status": "error",
  "code": "validation_failed",
  "message": "Please check the highlighted fields.",
  "errors": { "email": ["Enter a valid email address."] }
}
```

Rate-limit body (also sent as a `Retry-After` header, in seconds):

```json
{
  "status": "error",
  "code": "too_many_attempts",
  "message": "Too many attempts. Try again in 15 minutes.",
  "retry_after": 900
}
```

### Things the API never tells you, on purpose

- **Whether an email exists**, or whether it belongs to a non-admin. All of these return `invalid_credentials`. Don't add hints like "this email isn't registered".
- **Anything about an academy before the password is correct.** Academy names and logos only come back after a successful check.

## Limits

Limits apply to this API only. The academy's own login page has its own, separate limits, so nobody can lock an admin out of their academy from here.

| Endpoint | Limit |
|---|---|
| `/api/central-login` | 5 failed attempts per 15 minutes per **email + IP**, and 30 attempts per 15 minutes per IP |
| `/api/central-login` | 50 failed attempts per hour per email from all IPs combined, to slow down guessing spread across many IPs |
| `/api/central-login/select` | 30 requests per 15 minutes per IP |
| `/api/central-login/forgot-password` | 3 per hour per email, and 10 per 15 minutes per IP. Over the limit, it still answers `sent` but doesn't send another email. |

**Tokens:** a `redirect.token` lasts 60 seconds and a `selection_token` 5 minutes, and each works once.

## Forgot password

Each academy has its own password, so resetting happens on the academy's site.

### `POST /api/central-login/forgot-password`

```json
{
  "email": "owner@acme.com",
  "recaptcha_token": "token-from-the-recaptcha-widget"
}
```

The response is always `200`, whether or not the email exists:

```json
{
  "status": "sent",
  "message": "If this email belongs to an academy admin, we've sent a link to reset the password."
}
```

- If the email belongs to an admin, we email them a reset link for each of their academies.
- Show the `message` as it is.
- The same reCAPTCHA and rate limits apply.

## Form checklist (landing site)

- [ ] **Central domain:** `LMS_CENTRAL_URL` set for production, staging and local.
- [ ] **Allowed list:** every address the form runs on sent to the Laravel team for `CENTRAL_LOGIN_ALLOWED_ORIGINS`.
- [ ] **Fields:**
  - email (`type="email"`, `autocomplete="username"`)
  - password (`type="password"`, `autocomplete="current-password"`, with a show/hide toggle)
  - "Remember me"
  - reCAPTCHA
- [ ] **Submit button:** disabled while a request is running, to prevent double submits.
- [ ] **Errors:** use the table above. Never show raw server text other than `message`.
- [ ] **After an error,** clear the password field and reset reCAPTCHA. Keep the email.
- [ ] **On `redirect`,** submit the hidden form straight away. Show "Taking you to Acme Academy…" with the academy name.
- [ ] **The academy list:**
  - accessible: buttons, keyboard navigation, visible focus
  - shows logo or initials, name and domain
  - has a "Use a different account" link back to the form
- [ ] **Never store data the API returns.** Don't keep the password, tokens or the academy list in `localStorage`, cookies, logs or analytics.
- [ ] **Never send the password or tokens to analytics or error trackers** (Sentry, GA and so on). Strip them from captured request bodies.
- [ ] **Link** "Forgot password?" to the forgot-password form.
- [ ] **Add the note** "Not an admin? Log in on your academy's site" for instructors and students.

## Example (Next.js, client component)

```ts
// LMS_CENTRAL_URL is read on the server at request time and passed to this component.
let API = '';

export function setCentralUrl(url: string | undefined) {
  if (!url) throw new Error('LMS_CENTRAL_URL is not set (see Setup).');
  API = url.replace(/\/+$/, '');
}

type Redirect = { url: string; token: string; expires_in: number };
type Academy = { id: string; name: string; logo_url: string | null; domain: string };

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    credentials: 'omit',
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({ status: 'error', code: 'service_unavailable', message: "We can't sign you in right now. Please try again shortly." }));
  if (!res.ok || data.status === 'error') throw data;

  return data as T;
}

export async function login(email: string, password: string, remember: boolean, recaptchaToken: string) {
  const data = await post<
    | { status: 'redirect'; redirect: Redirect }
    | { status: 'choose'; selection_token: string; academies: Academy[] }
  >('/api/central-login', { email, password, remember, recaptcha_token: recaptchaToken });

  if (data.status === 'redirect') {
    goToAcademy(data.redirect); // from section 3
    return null;
  }

  return data; // show data.academies; call select() with the admin's choice
}

export async function select(selectionToken: string, academyId: string) {
  const data = await post<{ status: 'redirect'; redirect: Redirect }>('/api/central-login/select', {
    selection_token: selectionToken,
    academy_id: academyId,
  });

  goToAcademy(data.redirect);
}
```

Errors are thrown as the error body, so read `error.code` and show `error.message`.

> Landing-site note: this example is a sketch. Our build passes the central URL into each call instead of a module-level variable, adds a timeout, and maps network/CORS failures to `service_unavailable` instead of throwing raw errors (prompt 22a).

## Testing on staging

The Laravel team will provide test accounts for each case:

| Account | Expect |
|---|---|
| Admin of one academy | `redirect`, then that academy's dashboard (or its login-code page) |
| Admin of two academies, same password | `choose` with both |
| Admin of two academies, different passwords | `redirect` to the one whose password was typed |
| Instructor or student | `invalid_credentials` |
| Admin of a suspended academy | `academy_suspended` |
| Admin of an academy with a custom domain | `redirect.url` on the custom domain |
| Wrong password 6 times | `too_many_attempts` |
| Wait 61 seconds before submitting the form | The academy's login page with "link expired" |
