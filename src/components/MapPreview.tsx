import { motion } from "framer-motion";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { WEDDING, type Lang } from "../data/wedding";
import { t } from "../i18n";

export function MapPreview({ lang }: { lang: Lang }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gold-300/50 bg-cream-50 shadow-card">
      <div className="relative h-52 w-full overflow-hidden">
        <iframe
          title="Venue map"
          src={WEDDING.venue.embed}
          className="h-full w-full border-0 grayscale-[0.15]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-cream-50/80 to-transparent" />
        <motion.div
          initial={{ y: -6, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-maroon-600 text-cream-50 shadow-lg"
        >
          <MapPin size={18} />
        </motion.div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="section-label">{t(lang, "venueLabel")}</p>
          <p className="mt-1 font-display text-xl font-semibold text-maroon-700">{WEDDING.venue.name}</p>
        </div>
        <div>
          <p className="section-label">{t(lang, "addressLabel")}</p>
          <p className="mt-1 text-sm text-ink/70">{WEDDING.venue.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <motion.a
            whileTap={{ scale: 0.97 }}
            href={WEDDING.venue.googleMaps}
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            <ExternalLink size={15} />
            {t(lang, "openGoogleMaps")}
          </motion.a>
          <motion.a
            whileTap={{ scale: 0.97 }}
            href={WEDDING.venue.yandexGo}
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            <Navigation size={15} />
            {t(lang, "openYandexGo")}
          </motion.a>
        </div>
      </div>
    </div>
  );
}
