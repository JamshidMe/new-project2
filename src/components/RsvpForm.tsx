import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, Loader2, Minus, Plus, Send, X } from "lucide-react";
import type { Lang } from "../data/wedding";
import { t } from "../i18n";
import { sendRsvp } from "../lib/sendRsvp";

export function RsvpForm({ lang }: { lang: Lang }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [wishes, setWishes] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setError(t(lang, "requiredName"));
      return;
    }
    setError("");
    setSending(true);
    try {
      await sendRsvp({
        name: name.trim(),
        attending,
        guests,
        wishes: wishes.trim(),
        lang,
      });
      try {
        const previous = JSON.parse(localStorage.getItem("wedding-rsvp") || "[]");
        localStorage.setItem(
          "wedding-rsvp",
          JSON.stringify([
            ...previous,
            { name: name.trim(), attending, guests, wishes: wishes.trim(), at: new Date().toISOString() },
          ])
        );
      } catch {
        // localStorage may be unavailable in private mode; the email was still sent.
      }
      setSubmitted(true);
    } catch {
      setError(t(lang, "sendError"));
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setSubmitted(false);
    setName("");
    setGuests(1);
    setWishes("");
    setAttending("yes");
  }

  return (
    <>
      <form onSubmit={submit} className="rounded-3xl border border-gold-300/50 bg-cream-50 p-5 shadow-card">
        <div>
          <label htmlFor="guest-name" className="section-label">
            {t(lang, "nameLabel")}
          </label>
          <input
            id="guest-name"
            className="field mt-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t(lang, "namePlaceholder")}
          />
        </div>

        <fieldset className="mt-5">
          <legend className="section-label">{t(lang, "rsvpTitle")}</legend>
          <div className="mt-2 grid gap-2">
            {(
              [
                { value: "yes" as const, label: t(lang, "attending"), icon: <Check size={16} /> },
                { value: "no" as const, label: t(lang, "notAttending"), icon: <X size={16} /> },
              ]
            ).map((option) => {
              const active = attending === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold transition ${
                    active
                      ? "border-maroon-600 bg-maroon-600 text-cream-50 shadow-sm"
                      : "border-gold-300/60 bg-cream-100 text-ink/70"
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={option.value}
                    checked={active}
                    onChange={() => setAttending(option.value)}
                    className="sr-only"
                  />
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cream-50/20">
                    {option.icon}
                  </span>
                  {option.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {attending === "yes" && (
          <div className="mt-5">
            <span className="section-label">{t(lang, "guestsLabel")}</span>
            <div className="mt-2 flex items-center gap-4 rounded-2xl border border-gold-300/60 bg-cream-100 px-4 py-3">
              <button
                type="button"
                onClick={() => setGuests((value) => Math.max(1, value - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50 text-maroon-700 shadow-sm active:scale-95"
                aria-label="minus"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-10 text-center font-display text-2xl font-semibold text-maroon-700">
                {guests}
              </span>
              <button
                type="button"
                onClick={() => setGuests((value) => Math.min(12, value + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50 text-maroon-700 shadow-sm active:scale-95"
                aria-label="plus"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="mt-5">
          <label htmlFor="wishes" className="section-label">
            {t(lang, "wishesLabel")}
          </label>
          <textarea
            id="wishes"
            rows={4}
            className="field mt-2 resize-none"
            value={wishes}
            onChange={(event) => setWishes(event.target.value)}
            placeholder={t(lang, "wishesPlaceholder")}
          />
        </div>

        {error && <p className="mt-3 text-sm font-medium text-maroon-600">{error}</p>}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          disabled={sending}
          className="btn-primary mt-5 disabled:opacity-70"
        >
          {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          {sending ? t(lang, "sendingRsvp") : t(lang, "submitRsvp")}
        </motion.button>
      </form>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-6 backdrop-blur-sm"
            onClick={reset}
          >
            <motion.div
              initial={{ scale: 0.88, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-sm rounded-[28px] border border-gold-300/50 bg-cream-50 p-7 text-center shadow-soft"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maroon-600/10 text-maroon-700">
                <Heart size={26} />
              </span>
              <h3 className="mt-4 font-display text-3xl font-semibold text-maroon-700">
                {t(lang, "confirmationTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {attending === "yes"
                  ? t(lang, "confirmationAttending")
                  : t(lang, "confirmationNotAttending")}
              </p>
              <button type="button" onClick={reset} className="btn-primary mt-6">
                {t(lang, "close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
