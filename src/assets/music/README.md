# Background music

`wedding-intro.mp3` is the music the site plays. It is detected automatically at build time: the music button
appears and playback starts when a guest taps "Open Invitation". With no audio file in this folder, music is off
and the button is hidden. If several audio files are present, the first by filename is used, so keep only one.

**Source and licence (as supplied by the site owner):** trimmed from the Pixabay download
`india_happy-indian-wedding-490659.mp3` (Pixabay Content License: free to use and modify, no attribution required,
but the content may not be redistributed on a standalone basis). Please keep the original Pixabay track page or
download receipt as proof. Only use recordings you hold the licence for; never add audio ripped from streaming
services or download sites.

**How it was made:** the first 16 seconds, 128 kbps, tags removed. The site itself stops playback at 15 seconds,
resets to 0:00 and never loops.

Settings (volume, fade-in time, the 15-second limit) are at the top of `src/useMusic.ts`.
