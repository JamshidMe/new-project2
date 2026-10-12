import { useCallback, useEffect, useRef, useState } from "react";
import { WEDDING } from "../data/wedding";

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
  getPlayerState: () => number;
};

type YouTubeApi = {
  Player: new (
    elementId: string | HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
      };
    }
  ) => YouTubePlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) return resolve();
    const existing = document.getElementById("youtube-iframe-api");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
  });
}

/**
 * Plays "Izzat Shukurov — Azizam" from YouTube starting at 0:43.
 * The YouTube player stays invisible; the UI uses our own music button.
 */
export function useWeddingMusic() {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const pendingStartRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const videoId = import.meta.env.VITE_MUSIC_YOUTUBE_ID || WEDDING.music.youtubeId;
  const startAt = Number(import.meta.env.VITE_MUSIC_START || WEDDING.music.startAt);

  useEffect(() => {
    let cancelled = false;
    if (!videoId) return;

    const container = document.createElement("div");
    container.id = "azizam-youtube-player";
    container.style.cssText =
      "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;bottom:0;right:0;overflow:hidden;";
    document.body.appendChild(container);

    void loadYouTubeApi().then(() => {
      if (cancelled || !window.YT) return;
      playerRef.current = new window.YT.Player(container.id, {
        videoId,
        playerVars: {
          start: startAt,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setReady(true);
            if (pendingStartRef.current) {
              playerRef.current?.seekTo(startAt, true);
              playerRef.current?.playVideo();
            }
          },
          onStateChange: (event) => {
            const state = window.YT?.PlayerState;
            if (!state) return;
            if (event.data === state.PLAYING) setPlaying(true);
            if (event.data === state.PAUSED) setPlaying(false);
            if (event.data === state.ENDED) {
              playerRef.current?.seekTo(startAt, true);
              playerRef.current?.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        // player may already be gone
      }
      playerRef.current = null;
      container.remove();
    };
  }, [videoId, startAt]);

  const start = useCallback(() => {
    if (!playerRef.current) {
      pendingStartRef.current = true;
      return;
    }
    playerRef.current.seekTo(startAt, true);
    playerRef.current.playVideo();
  }, [startAt]);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else start();
  }, [playing, pause, start]);

  return { playing, ready, start, pause, toggle };
}
