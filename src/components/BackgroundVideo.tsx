import { WEDDING } from "../data/wedding";

export function BackgroundVideo() {
  const src = import.meta.env.VITE_BACKGROUND_VIDEO_URL || WEDDING.backgroundVideo.src;
  const youtubeId =
    import.meta.env.VITE_BACKGROUND_VIDEO_YOUTUBE || WEDDING.backgroundVideo.youtubeId;

  return (
    <div
      className="animated-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-cream-100 via-cream-200 to-gold-300/50"
      aria-hidden="true"
    >
      {youtubeId ? (
        <iframe
          title="Wedding background"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1`}
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          allow="autoplay; encrypted-media"
        />
      ) : src ? (
        <video
          className="h-full w-full object-cover"
          src={src}
          poster={WEDDING.backgroundVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : null}

      <div className="absolute inset-0 bg-cream-100/75 backdrop-blur-[2px]" />
    </div>
  );
}
