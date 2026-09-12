import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// SMTP opens a raw TCP socket, which the Edge runtime cannot do.
export const runtime = "nodejs";

/** Fields the enquiry form sends, in the order we present them in the email. */
const FIELDS = [
  { key: "name", label: "Name" },
  { key: "email", label: "E-mail" },
  { key: "phone", label: "Phone" },
  { key: "country", label: "Country" },
  { key: "drilling-depth", label: "Drilling Depth" },
  { key: "drilling-diameter", label: "Drilling Diameter" },
  { key: "select-category", label: "Category" },
  { key: "select-product", label: "Product" },
  { key: "message", label: "Requirements" },
] as const;

// Comma-separated list; every address receives each enquiry.
const TO_EMAILS = (
  process.env.CONTACT_TO_EMAIL ??
  "sales@klruniversal.com,info@bycconsulting.in"
)
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);
// Zoho Mail SMTP. Use smtp.zoho.in for India-hosted accounts, smtp.zoho.com
// for US, smtp.zoho.eu for EU -- the wrong region rejects the login. Port 465
// is implicit TLS; 587 is STARTTLS. The password must be an app-specific
// password generated in Zoho, not the account password.
const SMTP_HOST = process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.in";
const SMTP_PORT = Number(process.env.ZOHO_SMTP_PORT ?? 465);
const SMTP_USER = process.env.ZOHO_SMTP_USER;
const SMTP_PASS = process.env.ZOHO_SMTP_PASS;

// Zoho only accepts a From that is the authenticated mailbox or one of its
// verified aliases, so ZOHO_SMTP_USER must be this same address (or hold it as
// an alias) or Zoho rejects the message with a relay error.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "KLR Universal <info@bycconsulting.in>";

const MAX_BODY_BYTES = 64 * 1024;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/** Per-IP submission times. The app runs as a single long-lived Node
 *  process, so this map is shared by every request and the limit is
 *  genuinely global rather than per-instance. */
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter(
    (at) => now - at < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    recentByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  recentByIp.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (recentByIp.size > 5000) {
    for (const [key, times] of recentByIp) {
      if (times.every((at) => now - at >= RATE_LIMIT_WINDOW_MS)) {
        recentByIp.delete(key);
      }
    }
  }
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so user input can never inject extra email headers. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  // Require JSON. Browsers must send a CORS preflight for application/json,
  // and we return no Access-Control-Allow-Origin, so a cross-site page can no
  // longer make a visitor's browser submit this form.
  const contentType = (request.headers.get("content-type") ?? "").toLowerCase();
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  const ip =
    (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Too many enquiries from this connection. Please try again shortly, or email sales@klruniversal.com.",
      },
      { status: 429 }
    );
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let payload: Record<string, unknown>;
  try {
    const parsed = JSON.parse(rawBody);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new Error("not an object");
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a field hidden from real users. If it has a value, a bot filled
  // it in. Return success so the bot doesn't learn it was rejected.
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const values: Record<string, string> = {};
  for (const field of FIELDS) {
    const raw = payload[field.key];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (!value) {
      return NextResponse.json(
        { error: `Please fill in ${field.label}.` },
        { status: 400 }
      );
    }
    if (value.length > 5000) {
      return NextResponse.json(
        { error: `${field.label} is too long.` },
        { status: 400 }
      );
    }
    values[field.key] = value;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!SMTP_USER || !SMTP_PASS) {
    // Fail loudly in the server log, vaguely to the visitor.
    console.error(
      "[contact] SMTP is not configured — set ZOHO_SMTP_USER and ZOHO_SMTP_PASS. Enquiry not sent."
    );
    return NextResponse.json(
      {
        error:
          "We couldn't send your enquiry right now. Please email sales@klruniversal.com.",
      },
      { status: 500 }
    );
  }

  const rows = FIELDS.map(
    (field) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${field.label}</td><td style="padding:6px 0;color:#111">${escapeHtml(values[field.key]).replace(/\n/g, "<br>")}</td></tr>`
  ).join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6">
<h2 style="margin:0 0 4px;font-size:18px;color:#111">New website enquiry</h2>
<p style="margin:0 0 16px;color:#666">${escapeHtml(values["select-product"])} &mdash; ${escapeHtml(values["select-category"])}</p>
<table style="border-collapse:collapse">${rows}</table>
</div>`;

  const text = FIELDS.map((field) => `${field.label}: ${values[field.key]}`).join(
    "\n"
  );

  const subject = singleLine(
    `Website enquiry — ${values["select-product"]} (${values.country})`
  );

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAILS.join(", "),
      replyTo: values.email,
      subject,
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "[contact] Unexpected error sending enquiry:",
      err instanceof Error ? err.message : "unknown"
    );
    return NextResponse.json(
      {
        error:
          "We couldn't send your enquiry right now. Please email sales@klruniversal.com.",
      },
      { status: 500 }
    );
  }
}
