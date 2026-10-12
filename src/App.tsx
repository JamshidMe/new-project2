import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundVideo } from "./components/BackgroundVideo";
import { GiftScreen } from "./components/GiftScreen";
import { InvitationScreen } from "./components/InvitationScreen";
import { Fireflies } from "./components/Fireflies";
import { MusicButton } from "./components/MusicButton";
import { Petals } from "./components/Petals";
import { ScrollProgress } from "./components/ScrollProgress";
import { TopBar } from "./components/TopBar";
import { WEDDING, type Lang } from "./data/wedding";
import { useWeddingMusic } from "./hooks/useWeddingMusic";
import { celebrate } from "./lib/celebrate";

export default function App() {
  const [lang, setLang] = useState<Lang>("uz");
  const [opened, setOpened] = useState(false);
  const music = useWeddingMusic();

  const handleOpen = useCallback(() => {
    setOpened(true);
    navigator.vibrate?.(30);
    celebrate();
    // Music starts from the user's tap — allowed by browser autoplay rules.
    music.start();
  }, [music]);

  return (
    <div className="relative min-h-screen w-full bg-cream-100">
      <BackgroundVideo />
      <ScrollProgress />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col overflow-hidden bg-cream-100/70 shadow-[0_0_80px_-40px_rgba(75,21,32,0.6)] backdrop-blur-[3px]">
        <TopBar
          lang={lang}
          setLang={setLang}
          right={
            opened ? (
              <MusicButton lang={lang} playing={music.playing} onToggle={music.toggle} />
            ) : undefined
          }
        />

        {opened && <Petals />}
        {opened && <Fireflies />}

        <main className="relative flex flex-1 flex-col">
          <AnimatePresence mode="wait" initial={false}>
            {!opened ? (
              <motion.div
                key="gift"
                className="flex flex-1 flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GiftScreen lang={lang} onOpen={handleOpen} />
              </motion.div>
            ) : (
              <motion.div
                key="invitation"
                className="flex flex-1 flex-col"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <InvitationScreen lang={lang} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {!opened && (
          <p className="pb-5 text-center text-[10px] uppercase tracking-[0.3em] text-ink/35">
            {WEDDING.couple.groom} &amp; {WEDDING.couple.bride}
          </p>
        )}
      </div>
    </div>
  );
}
