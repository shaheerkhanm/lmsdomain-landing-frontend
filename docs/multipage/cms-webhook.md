# CMS Revalidation Webhook Specification

**Endpoint:** `POST /api/revalidate`  
**Host:** `https://lmsdomain.com` (or local/staging frontend URL)

## Authentication & Headers
- `Content-Type: application/json`
- `secret`: Shared secret configured in frontend environment as `CMS_REVALIDATE_SECRET`.
- `CMS_REVALIDATE_SECRET` is required. There is no default: if it is unset, the endpoint answers `503` and revalidates nothing. Use a long random value per environment (e.g. `openssl rand -hex 32`); staging and production must differ.

## Payload
```json
{
  "secret": "<CMS_REVALIDATE_SECRET>",
  "tag": "cms:home-hero"
}
```

## Supported Tags
- `cms`: Revalidates all CMS documents.
- `cms:<slug>`: Revalidates specific CMS document (e.g. `cms:address`, `cms:pricing-hero`, `cms:about-hero`).
- `cms:address` / `cms:footer`: the footer (email, phone, social links, description) on every page. Also covered by `cms`.
- `pricing`: Revalidates pricing plans and FAQ data.
- `features`: Revalidates features and feature content collections.
- `about`: Revalidates values and leadership collections.
- `seo:<slug>`: Revalidates SEO metadata for the specified slug.

## Example curl
```bash
curl -X POST https://lmsdomain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your_secret_key", "tag": "cms"}'
```
