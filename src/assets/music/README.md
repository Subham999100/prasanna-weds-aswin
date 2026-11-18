# Background music

The site plays one file, imported by name in `src/useMusic.ts`: **`raataan-lambiyan.mp3`**. Nothing else in this
folder is bundled, and there is no fallback track.

**What it is:** "Raataan Lambiyan", an unmodified copy of `Raataan Lambiyana_320(KoshalWorld.Com).mp3`
(320 kbps, about 3:50). The file's tags say it was downloaded from a download site and name Jubin Nautiyal and
Asees Kaur. It is a commercial film-song recording.

**Publication rights: not established.** There is no licence, receipt or written permission for this recording
in this project. It is published here at the site owner's decision, and a 15-second clip on a public website
can still require permission from the label and the publisher. If a rights holder objects, or to switch to a
recording with a licence (for example a licensed instrumental or cover, keeping the receipt), replace the file
and update the import in `src/useMusic.ts`.

**Playback:** it starts when a guest taps "Open Invitation", plays the first 15 seconds, then stops at once,
resets to 0:00 and never loops. Settings (volume, fade-in time, the 15-second limit) are at the top of
`src/useMusic.ts`.
