import http from "node:http";
import "dotenv/config";
import nodemailer from "nodemailer";

const PORT = Number(process.env.RSVP_PORT || 8787);
const GMAIL_USER = process.env.GMAIL_USER || "";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";
const RSVP_TO = process.env.RSVP_TO || GMAIL_USER;

const mailConfigured = Boolean(GMAIL_USER && GMAIL_APP_PASSWORD && RSVP_TO);

const transporter = mailConfigured
  ? nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    })
  : null;

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  });
  res.end(JSON.stringify(body));
}

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

async function handleRsvp(req, res) {
  let raw = "";
  for await (const chunk of req) raw += chunk;

  let data;
  try {
    data = JSON.parse(raw || "{}");
  } catch {
    return sendJson(res, 400, { ok: false, message: "Invalid JSON" });
  }

  const name = String(data.name || "").trim();
  if (!name) return sendJson(res, 400, { ok: false, message: "Name is required" });

  const attending = data.attending === "no" ? "Unable to attend" : "Attending";
  const guests = data.attending === "no" ? "0" : String(data.guests || 1);
  const wishes = String(data.wishes || "").trim();
  const lang = String(data.lang || "uz").toUpperCase();
  const submittedAt = new Date().toLocaleString("en-GB", { hour12: false });

  if (!transporter) {
    return sendJson(res, 503, {
      ok: false,
      code: "MAIL_NOT_CONFIGURED",
      message:
        "Gmail is not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to .env and restart the server.",
    });
  }

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
    await transporter.sendMail({
      from: `"Wedding RSVP" <${GMAIL_USER}>`,
      to: RSVP_TO,
      replyTo: GMAIL_USER,
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
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Gmail send failed:", error);
    return sendJson(res, 500, {
      ok: false,
      message: error instanceof Error ? error.message : "Could not send email",
    });
  }
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    });
    return res.end();
  }

  if (req.method === "GET" && req.url === "/api/health") {
    return sendJson(res, 200, { ok: true, mailConfigured });
  }

  if (req.method === "POST" && req.url === "/api/rsvp") {
    void handleRsvp(req, res);
    return;
  }

  return sendJson(res, 404, { ok: false, message: "Not found" });
});

server.listen(PORT, () => {
  console.log(`RSVP mail server running on http://localhost:${PORT}`);
  if (!mailConfigured) {
    console.log("Gmail is not configured yet. Add GMAIL_USER and GMAIL_APP_PASSWORD to .env");
  }
});
