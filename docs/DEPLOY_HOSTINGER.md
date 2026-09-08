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
- [ ] Zoho mailbox for the sender address, with an **app-specific password**
- [ ] DNS control for `klruniversal.com`

## 1. Create the app

hPanel -> Web Apps -> Create application.

- Source: **GitHub**, repo `BycConsulting/KLRIndustries`, branch `main`
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
| `ZOHO_SMTP_USER` | `enquire@klruniversal.com` |
| `ZOHO_SMTP_PASS` | app-specific password from Zoho |
| `ZOHO_SMTP_HOST` | `smtp.zoho.in` |
| `ZOHO_SMTP_PORT` | `465` |
| `CONTACT_TO_EMAIL` | `sales@klruniversal.com,info@bycconsulting.in` |
| `CONTACT_FROM_EMAIL` | `KLR Universal <enquire@klruniversal.com>` |

Do **not** set `RESEND_API_KEY` on Hostinger. Its absence is what makes the
app use Zoho.

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

## 4. Cut over DNS

Only after step 3 passes. Point the `klruniversal.com` A/CNAME records at
Hostinger, keeping the MX records on Zoho so mail is unaffected. Allow up to
24h for propagation, then enable SSL in hPanel.

Keep the Vercel deployment alive for about a week as a rollback target.

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

**Image optimisation needs `sharp`.** Next installs it automatically on most
platforms. If images come back unoptimised or the build warns about it, add
`sharp` to dependencies.

## What is lost by leaving Vercel

Worth knowing, not necessarily worth blocking on: atomic deploys with instant
rollback, per-commit preview URLs, and the global edge CDN. Hostinger includes
a CDN but the origin is a single region.
