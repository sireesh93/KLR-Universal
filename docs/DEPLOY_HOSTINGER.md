# Deploying to Hostinger

The site currently runs on Vercel at `klr-universal.vercel.app`. This is the
runbook for moving it to Hostinger's managed Next.js hosting and switching
email from Resend to Zoho Mail.

## What plan is needed

Hostinger's **Web Apps / Next.js hosting** (Node.js runtime). The
Premium/Business shared tiers list Node.js support; Cloud Startup adds
dedicated CPU and RAM.

This project will **not** run on a PHP-only shared plan. It needs:

- Node.js 20 or newer (`next@16` requirement)
- A long-running Node process, not per-request PHP
- Outbound network access for SMTP (see the risk below)

Sizing: the site is almost entirely static (58 prerendered routes) with one
dynamic API route. Traffic is low. The entry Next.js plan is sufficient;
Cloud Startup only matters if traffic grows.

## Before you start

- [ ] Hostinger plan with Web Apps / Node.js active
- [ ] Access to the `BycConsulting/KLRIndustries` GitHub repo (currently private)
- [ ] Zoho mailbox `info@bycconsulting.in`, with an **app-specific password**
- [ ] DNS control for `klruniversal.com`

## 1. Create the app

hPanel -> Web Apps -> Create application.

- Source: **GitHub**, repo `BycConsulting/KLRIndustries`, branch `hostinger`

  Deploy from `hostinger`, **not** `main`. Vercel auto-deploys `main` to
  production, and the Zoho-only commit has no Resend fallback -- pushing it to
  `main` would take the live Vercel contact form down. `hostinger` carries the
  same code without touching Vercel production. Merge it into `main` only at
  DNS cutover, when Vercel stops mattering.
- Framework: Next.js (auto-detected)
- Node version: **20 or higher**
- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Region: **India** (audience is India, Africa, LatAm; India is the origin)

## 2. Environment variables

Set these in hPanel -> Web Apps -> Environment variables. Values and
explanations are in `.env.example`.

| Variable | Value |
|---|---|
| `ZOHO_SMTP_USER` | `info@bycconsulting.in` |
| `ZOHO_SMTP_PASS` | app-specific password from Zoho |
| `ZOHO_SMTP_HOST` | `smtp.zoho.in` |
| `ZOHO_SMTP_PORT` | `465` |
| `CONTACT_TO_EMAIL` | `sales@klruniversal.com,info@bycconsulting.in` |
| `CONTACT_FROM_EMAIL` | `KLR Universal <info@bycconsulting.in>` |

All six are required. Zoho SMTP is now the only transport -- there is no
fallback, so if these are missing or wrong the contact form returns an error
and sends nothing.

## 3. Verify before pointing DNS

Deploy to the temporary Hostinger URL and check all of this while the live
domain still resolves to Vercel:

- [ ] Homepage renders, hero carousel rotates, headline animates
- [ ] Products drawer opens and category panels cascade
- [ ] A product page loads (e.g. `/drilling-rigs/water-well/dthr-300`)
- [ ] `/sitemap.xml` and `/robots.txt` respond
- [ ] Images are optimised, not full-size originals
- [ ] **Submit the contact form and confirm the email arrives at both addresses**
- [ ] Response headers still carry the CSP from `next.config.ts`

## 4. Cut over DNS -- NOT YET

Deliberately not done. The site stays live on Vercel until explicitly asked.

The domain is already owned, so Hostinger's bundled free domain is not needed
and should not be registered -- it would just add a domain nobody uses.

When the time comes: point the `klruniversal.com` A/CNAME records at
Hostinger, **keep the MX records on Zoho** so mail is unaffected, allow up to
24h for propagation, then enable SSL in hPanel. Keep the Vercel deployment
alive for about a week as a rollback target.

## Known risks

**Outbound SMTP may be blocked.** Shared hosts commonly restrict outbound
ports 465/587 to limit spam. If the contact form fails on Hostinger with a
connection timeout, this is why. In order of preference:

1. Try `ZOHO_SMTP_PORT=587` -- some hosts allow 587 but not 465.
2. Ask Hostinger support to open outbound SMTP for the account.
3. Switch to **ZeptoMail**, Zoho's transactional email API. It sends over
   HTTPS on port 443, which is never blocked. This is a contained change to
   the send block in `src/app/api/contact/route.ts`.

**Next.js 16 is very new.** Hostinger's framework auto-detection may lag. If
the build fails, set the build and start commands manually as in step 1.

**Node version.** `package.json` pins `engines.node: ">=24"`. Next 16 itself
only needs 20.9+, so if Hostinger tops out at 20 or 22 this pin is what will
block the build. Relaxing it to `">=20"` is a one-line change -- do that
rather than fighting the platform.

**Image optimisation is fine.** Verified against a local production server
with no `sharp` installed: `/_next/image` returned 200 and compressed a 99KB
hero to 16.7KB. Next 16 bundles its own optimiser, so nothing extra is needed.

## What is lost by leaving Vercel

Worth knowing, not necessarily worth blocking on: atomic deploys with instant
rollback, per-commit preview URLs, and the global edge CDN. Hostinger includes
a CDN but the origin is a single region.
