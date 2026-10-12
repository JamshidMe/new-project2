import { motion } from "framer-motion";
import { Music2, Pause } from "lucide-react";
import { WEDDING, type Lang } from "../data/wedding";
import { t } from "../i18n";

type Props = {
  lang: Lang;
  playing: boolean;
  onToggle: () => void;
};

export function MusicButton({ lang, playing, onToggle }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.94 }}
      aria-label={playing ? t(lang, "musicOff") : t(lang, "musicOn")}
      className="flex h-9 items-center gap-2 rounded-full border border-gold-300/60 bg-cream-50 px-3 text-maroon-700 shadow-sm"
    >
      {playing ? (
        <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
          {[0, 1, 2].map((bar) => (
            <motion.span
              key={bar}
              className="w-[3px] rounded-full bg-maroon-600"
              animate={{ height: ["5px", "15px", "7px", "13px", "5px"] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: bar * 0.16,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      ) : (
        <Music2 size={15} />
      )}
      <span className="hidden max-w-[86px] truncate text-[10px] font-semibold uppercase tracking-wider sm:inline">
        {playing ? "Azizam" : t(lang, "musicOn")}
      </span>
      {playing && <Pause size={13} />}
      <span className="sr-only">{WEDDING.music.title}</span>
    </motion.button>
  );
}
