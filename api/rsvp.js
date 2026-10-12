import nodemailer from "nodemailer";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label, value) {
  return `<tr>
    <td style="padding:10px 14px;border-bottom:1px solid #ead9bc;font-weight:600;color:#651d2a;width:180px">${escapeHtml(label)}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #ead9bc;color:#2e2119">${escapeHtml(value || "—")}</td>
  </tr>`;
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  let raw = "";
  for await (const chunk of req) raw += chunk;
  try {
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const rsvpTo = process.env.RSVP_TO || gmailUser;

  if (!gmailUser || !gmailPass || !rsvpTo) {
    return res.status(503).json({
      ok: false,
      code: "MAIL_NOT_CONFIGURED",
      message: "Gmail environment variables are not configured.",
    });
  }

  const data = await readBody(req);
  const name = String(data.name || "").trim();
  if (!name) return res.status(400).json({ ok: false, message: "Name is required" });

  const attending = data.attending === "no" ? "Unable to attend" : "Attending";
  const guests = data.attending === "no" ? "0" : String(data.guests || 1);
  const wishes = String(data.wishes || "").trim();
  const lang = String(data.lang || "uz").toUpperCase();
  const submittedAt = new Date().toLocaleString("en-GB", { hour12: false });

  const html = `
  <div style="background:#fbf6ec;padding:28px;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#fffdf8;border:1px solid #ead9bc;border-radius:18px;overflow:hidden">
      <div style="background:#651d2a;padding:22px 24px;color:#fdfbf6">
        <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#e3c27a">Wedding RSVP</div>
        <div style="font-size:22px;font-weight:700;margin-top:6px">Jamshidbek &amp; Kamola</div>
        <div style="font-size:13px;color:#f5ebd8;margin-top:4px">27 April 2027 · Istiqlol to'yxonasi, Kosonsoy</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${row("Guest name", name)}
        ${row("Attending", attending)}
        ${row("Number of guests", guests)}
        ${row("Language", lang)}
        ${row("Submitted at", submittedAt)}
      </table>
      <div style="padding:18px 24px 24px">
        <div style="font-size:12px;font-weight:700;color:#651d2a;text-transform:uppercase;letter-spacing:1px">Wishes / Message</div>
        <div style="margin-top:8px;padding:14px;border-radius:12px;background:#fbf6ec;color:#2e2119;line-height:1.6">${escapeHtml(wishes || "—")}</div>
      </div>
    </div>
  </div>`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"Wedding RSVP" <${gmailUser}>`,
      to: rsvpTo,
      replyTo: gmailUser,
      subject: `💍 RSVP — ${name} (${attending})`,
      text: [
        `Guest name: ${name}`,
        `Attending: ${attending}`,
        `Number of guests: ${guests}`,
        `Language: ${lang}`,
        `Submitted at: ${submittedAt}`,
        `Wishes: ${wishes || "—"}`,
      ].join("\n"),
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Gmail send failed:", error);
    return res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : "Could not send email",
    });
  }
}
