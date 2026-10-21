# CMS Revalidation Webhook Specification

**Endpoint:** `POST /api/revalidate`  
**Host:** `https://lmsdomain.com` (or local/staging frontend URL)

## Authentication & Headers
- `Content-Type: application/json`
- `secret`: Shared secret configured in frontend environment as `CMS_REVALIDATE_SECRET`.

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
