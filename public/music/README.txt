Music
=====

The invitation plays "Izzat Shukurov — Azizam" from YouTube,
starting at 0:43, when the guest taps to open the gift.

Configured in src/data/wedding.ts:

    music.youtubeId = "oBzE7gDRbdo"
    music.startAt   = 43

You can override it without editing code by adding this to .env:

    VITE_MUSIC_YOUTUBE_ID=oBzE7gDRbdo
    VITE_MUSIC_START=43

Optional offline fallback:
If you own a licensed audio file, put it here as azizam.mp3 and leave
youtubeId empty to use the local file instead.
