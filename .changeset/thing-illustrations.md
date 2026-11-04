---
"@developer-overheid-nl/register-site-template": minor
---

Show the illustration of each thing on its detail page. The Dingen API (OAS 1.3.0) returns the filename in the new `image` field; the new `IMAGE_BASE_URL` env var sets where the images are loaded from (default: the `images/webp` folder of the dingen-api repository on GitHub). The new `getImageUrl()` helper in `@your_org_name/components` joins the two. For a local json-server, add `IMAGE_BASE_URL="http://localhost:3000/webp/"` to `.env.local`.
