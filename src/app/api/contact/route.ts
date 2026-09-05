import { NextResponse } from "next/server";
import { Resend } from "resend";

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

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "sales@klruniversal.com";
// Must be an address on a domain verified in the Resend account. Resend's
// onboarding@resend.dev works for testing but only delivers to the account owner.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "KLR Universal <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fail loudly in the server log, vaguely to the visitor.
    console.error("[contact] RESEND_API_KEY is not set — enquiry not sent.");
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

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: values.email,
      subject: `Website enquiry — ${values["select-product"]} (${values.country})`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error.message);
      return NextResponse.json(
        {
          error:
            "We couldn't send your enquiry right now. Please email sales@klruniversal.com.",
        },
        { status: 502 }
      );
    }

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
