import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Lock, MailOpen } from "lucide-react";
import { WEDDING, type Lang } from "../data/wedding";
import { EXTRAS } from "../i18n";

export function LoveNote({ lang }: { lang: Lang }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);
  const copy = EXTRAS[lang];

  function unlock(event: React.FormEvent) {
    event.preventDefault();
    const isCorrect =
      Number(day) === WEDDING.couple.brideBirthday.day &&
      Number(month) === WEDDING.couple.brideBirthday.month;
    if (isCorrect) {
      setError("");
      setOpened(true);
    } else {
      setError(copy.secretError);
    }
  }

  return (
    <section className="px-6 py-10">
      <div className="mb-6 text-center">
        <p className="section-label">{copy.secretTitle}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-maroon-700">
          {copy.secretTitle}
        </h2>
      </div>

      <div className="mx-auto max-w-sm">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.form
              key="locked"
              onSubmit={unlock}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, rotateX: -35 }}
              className="relative overflow-hidden rounded-3xl border border-gold-300/60 bg-gradient-to-b from-cream-100 to-cream-200 p-6 shadow-card"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-maroon-600 to-maroon-800 text-cream-50 shadow-lg"
              >
                <Lock size={22} />
              </motion.span>

              <p className="mt-4 text-center text-sm leading-relaxed text-ink/70">{copy.secretHint}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="secret-day" className="section-label">
                    {copy.secretDay}
                  </label>
                  <input
                    id="secret-day"
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={2}
                    value={day}
                    onChange={(event) => setDay(event.target.value.replace(/\D/g, ""))}
                    className="field mt-2 text-center text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="secret-month" className="section-label">
                    {copy.secretMonth}
                  </label>
                  <input
                    id="secret-month"
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={2}
                    value={month}
                    onChange={(event) => setMonth(event.target.value.replace(/\D/g, ""))}
                    className="field mt-2 text-center text-lg"
                  />
                </div>
              </div>

              {error && <p className="mt-3 text-center text-sm font-medium text-maroon-600">{error}</p>}

              <motion.button type="submit" whileTap={{ scale: 0.98 }} className="btn-primary mt-5">
                <Heart size={18} fill="currentColor" />
                {copy.secretButton}
              </motion.button>
            </motion.form>
          ) : (
            <motion.article
              key="opened"
              initial={{ opacity: 0, y: 22, rotateX: 18 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-gold-300/60 bg-cream-50 p-6 shadow-soft"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              <span className="absolute -right-6 -top-6 text-6xl opacity-10">❤️</span>
              <MailOpen className="text-gold-500" size={20} />

              <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-ink/80">{copy.loveNoteBody}</p>

              <p className="mt-6 whitespace-pre-line font-display text-xl font-semibold italic text-maroon-700">
                {copy.loveNoteSignature}
              </p>

              <div className="mt-5 flex items-center gap-2 text-gold-500">
                <span className="h-px flex-1 bg-gold-300/60" />
                <Heart size={14} fill="currentColor" />
                <span className="h-px flex-1 bg-gold-300/60" />
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
