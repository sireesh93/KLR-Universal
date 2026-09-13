# Deploying klruniversal.com

The site runs on Hostinger Node.js hosting, serving `klruniversal.com`
directly. This is the working procedure, plus the platform quirks that cost
real time to discover.

## The app

| | |
|---|---|
| Host | Hostinger, Web Apps (Node.js) |
| Account | `u641137092` |
| Domain | `klruniversal.com` |
| Datacentre | Mumbai |
| Node | 22 |
| Build script | `build:hostinger` |
| Output | `.next` |
| Source branch | `hostinger` on `BycConsulting/KLRIndustries` |

## Deploy procedure

Deployment is archive-based: a zip of the committed tree is uploaded to
`public_html`, then a build is started from it.

1. Commit and push to the `hostinger` branch.
2. Build the archive from the committed tree, not the working directory:
   `git archive --format=zip -o klr-app.zip HEAD`
3. Upload it to `public_html/klr-app.zip` (TUS upload, hPanel file manager, or
   the Hostinger API).
4. Start a Node.js build with `build_script: build:hostinger`, Node 22,
   `root_directory: .`, `output_directory: .next`, source `archive`.
5. **Purge the cache.** Non-optional — see below.
6. Verify against the live domain.
7. Delete the local archive (`rm -f klr-app.zip`), and check the document root
   is clean. A successful build consumes the archive, but **a failed build does
   not** — it is left sitting in `public_html` until someone removes it.

A build takes roughly two to four minutes. The previous version keeps serving
throughout, so there is no downtime.

### Wiring Git deployment instead

Worth doing. Archive upload means the server only changes when someone
uploads a zip, which has already caused the server to sit on stale code for
two days. Pointing the app at the `hostinger` branch removes that failure
mode entirely.

## Platform quirks

**The cache must be purged after every deploy.** Next sets
`Cache-Control: s-maxage=31536000` on prerendered pages and Hostinger's CDN
honours it. Without a purge, visitors keep the previous build. This has
produced two false diagnoses already, where a fix looked half-applied because
some routes served cached HTML and others did not. If a change looks partly
live, check `x-hcdn-cache-status` and `Age` before assuming the code is wrong.

**Turbopack cannot run on this host.** The build image ships glibc older than
2.29, so Next 16's native SWC binary will not load and only the WASM bindings
are available. Turbopack requires the native ones. `build:hostinger` runs
`next build --webpack`, which works with WASM. The default `build` script
keeps Turbopack for local use, where it is much faster.

**The config must be plain JavaScript.** For the same reason, a
`next.config.ts` fails outright: WASM initialises too late to transpile a
TypeScript config, and the build dies with `ERR_MODULE_NOT_FOUND`. The config
is `next.config.mjs` and must stay that way.

**The app is served by Passenger, not by Apache from `public_html`.** The
document root holds only an `.htaccess`, which points Passenger at
`hbuilds/current/nodejs/server.js` with `PassengerBaseURI /`. The deployed
application lives outside the document root entirely. Requests for files that
were uploaded to `public_html` have been observed returning the Next.js 404
page rather than the file, which suggests Passenger takes the request before
Apache can serve it statically — but this has not been tested with a file
actually present, so do not rely on it. Treat anything placed in `public_html`
as potentially reachable and remove it promptly (see step 7).

**The archive is consumed by a successful build.** Re-running a build without
re-uploading fails in about two seconds with no logs, because
`source_options.archive_path` points at a file that no longer exists.

**Hostinger's build analysis is unreliable.** It has twice suggested fixes
that would not have worked, including claiming `engines.node: ">=20.9"` was
incompatible with Node 22. Read the build log instead.

**The edge replaces the Content-Security-Policy header.** Whatever the app
sends, the response carries only `upgrade-insecure-requests`. The other four
security headers pass through untouched. The policy is therefore also emitted
as a `<meta http-equiv>` in the root layout, where the edge cannot strip it;
the two are kept identical. Getting the header honoured needs a support
ticket.

**An ICO wrapping a PNG must be RGBA.** `favicon.ico` carries a PNG payload,
and Next's image decoder rejects the build with "The PNG is not in RGBA
format" otherwise.

## Environment variables

Set in hPanel under Web Apps. Values and explanations are in `.env.example`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Origin for canonicals, sitemap, robots, OG and JSON-LD |
| `ZOHO_SMTP_HOST` | `smtppro.zoho.in` — the **pro** host; paid accounts reject `smtp.zoho.in` |
| `ZOHO_SMTP_PORT` | `465` |
| `ZOHO_SMTP_USER` | Sending mailbox |
| `ZOHO_SMTP_PASS` | App-specific password from Zoho, never the account password |
| `CONTACT_TO_EMAIL` | Comma-separated recipients |
| `CONTACT_FROM_EMAIL` | Must match `ZOHO_SMTP_USER` or one of its verified aliases |

**Changing a variable needs a rebuild, not just a restart.** Next standalone
bakes them at build time. A restart alone leaves the old values in place, and
the symptom is a contact form that keeps failing with the variable visibly
set.

## Verifying a deploy

- Every sitemap route returns 200
- Canonicals point at `klruniversal.com`, not any other origin
- `/enquiry` redirects to `/contact-and-support` (spot-check of the legacy redirects)
- `www` returns 308 to the bare domain
- Image optimisation works: `/_next/image` returns a smaller file than the original
- The language switcher opens and translates, and spec table values stay in English
- Security headers present, including `Strict-Transport-Security`

Do not submit the contact form as a test. `CONTACT_TO_EMAIL` includes the
client's sales inbox, so every submission is a real enquiry landing in front
of their team. Test SMTP against a local capture server instead.
