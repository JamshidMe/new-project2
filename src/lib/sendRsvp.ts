import { WEDDING } from "../data/wedding";

export type RsvpPayload = {
  name: string;
  attending: "yes" | "no";
  guests: number;
  wishes: string;
  lang: string;
};

/**
 * Sends the RSVP to Gmail.
 *
 * 1. Preferred: the local mail server (`server/index.mjs`) sends directly
 *    through Gmail SMTP using your App Password. No confirmation step.
 * 2. Fallback: if the mail server is not running/configured (for example on
 *    static hosting), FormSubmit delivers to the same Gmail address after a
 *    one-time confirmation email.
 */
export async function sendRsvp(payload: RsvpPayload): Promise<void> {
  const recipient = import.meta.env.VITE_RSVP_EMAIL || WEDDING.rsvp.email;
  const apiBase = import.meta.env.VITE_RSVP_API_URL || "";

  try {
    const response = await fetch(`${apiBase}/api/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) return;
    const body = await response.json().catch(() => null);
    // If the server exists but Gmail is not configured, fall through to FormSubmit.
    if (body?.code !== "MAIL_NOT_CONFIGURED") {
      throw new Error(body?.message || "RSVP could not be sent.");
    }
  } catch {
    // Fall back to FormSubmit below.
  }

  const attendingText =
    payload.attending === "yes" ? "Albatta, kelaman / Attending" : "Afsuski, kela olmayman / Unable to attend";
  const submittedAt = new Date().toLocaleString("en-GB", { hour12: false });

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `💍 RSVP — ${payload.name}`,
      _template: "table",
      _captcha: "false",
      "Guest name": payload.name,
      "Attending": attendingText,
      "Number of guests": payload.attending === "yes" ? String(payload.guests) : "0",
      "Wishes / Message": payload.wishes || "—",
      "Language": payload.lang.toUpperCase(),
      "Submitted at": submittedAt,
      "Wedding": `${WEDDING.couple.groom} & ${WEDDING.couple.bride} — ${WEDDING.date.en}`,
    }),
  });

  if (!response.ok) {
    throw new Error("RSVP email could not be sent.");
  }
}
