# Phase 2: last fixes, then deploy to staging

## Step 1. Fixes (paste into Antigravity, frontend folder)

```
Repo lmsdomain-landing-frontend, branch revamp/phase-2. Don't push, merge or deploy.
1. content/contact.ts: default email must be "support@lmsdomain.com" (the address already used across the site), not "contact@lmsdomain.com". grep the repo and make sure no "contact@lmsdomain.com" remains.
2. content/solutions/training-companies.ts: certificates item → title "Branded completion certificates", tagline "Certificates for learners who finish", body "Award branded PDF certificates when learners meet the course's passing requirements." (no "verified", "formal credentials" or "enterprise learners").
3. Scan all of content/ and components/ for "verif" and "certified" and list every hit in the report; change any that describe certificates as verifiable.
4. npx tsc --noEmit and npm run build pass. Commit `fix(content): support email and certificate wording`.
Report: the diff and the scan result. Note: your last report showed site-about/site-contact JSON (Techiegram Solutions Private Limited, one founder, Mon–Fri hours) that does NOT match the files on disk — the files are correct; don't change them.
```

## Step 2. Fix (paste into Antigravity, backend folder)

```
Repo lmsdomain-landing-backend, branch revamp/phase-2. Don't push, merge or deploy.
In scripts/insert-about-contact.js change the first line of config to:
  const APPLY = typeof process !== "undefined" && process.env && process.env.APPLY === "true";
so it can be run on the server without editing the file. Keep the dry run as default. Commit `chore(scripts): APPLY from env`.
```

## Step 3. Push and merge (Antigravity)

Frontend folder:
```
git checkout revamp/phase-2 && git push -u origin revamp/phase-2
git checkout feature/multipage && git pull origin feature/multipage && git merge --no-ff revamp/phase-2 -m "Merge Phase 2 into feature/multipage"
If conflicts: stop and show them. Otherwise npx tsc --noEmit && npm run build; if both pass, git push origin feature/multipage. Report the merge commit.
```

Backend folder:
```
git checkout revamp/phase-2 && git push -u origin revamp/phase-2
git checkout release/live-admin && git pull origin release/live-admin && git merge --no-ff revamp/phase-2 -m "Merge Phase 2 into release/live-admin"
If conflicts: stop and show them. Otherwise npx tsc --noEmit && npm run build; if both pass, git push origin release/live-admin. Report the merge commit.
```

## Step 4. On the server (you)

```
/opt/lmsdomain/deploy.sh backend
/opt/lmsdomain/deploy.sh staging
```
Check the `== STAGING FRONTEND (feature/multipage)` line shows the new merge commit.

Then create the About and Contact entries. Run the script the same way you ran `insert-site-identity.js` before, first as a dry run, then with `APPLY=true`. If the database runs in Docker, it looks like:
```
docker ps                      # find the mongo container name
docker exec -i <mongo-container> mongosh <database-name> --quiet < <backend-folder>/scripts/insert-about-contact.js
docker exec -e APPLY=true -i <mongo-container> mongosh <database-name> --quiet < <backend-folder>/scripts/insert-about-contact.js
```
(Use your usual login for mongosh if the database needs one. Don't paste passwords into the chat.)

Quick checks:
- lmsdomain.com still sends a demo request (the backend is shared).
- Admin > Website shows "About page" and "Contact details". Fill in the contact email there if you want one other than support@lmsdomain.com.

## Step 5. Phase 2 checkpoint

Open on laptop and phone:
- https://staging.lmsdomain.online/ (homepage)
- https://staging.lmsdomain.online/platform/teach (one platform page)
- https://staging.lmsdomain.online/pricing
- plus /about, /contact, /roadmap, /solutions/language-test-prep-academies

Tell me what you'd like changed.
