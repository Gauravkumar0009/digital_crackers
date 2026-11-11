# Echo — Music Discovery Frontend

## Separate files
- `index.html` — page structure
- `style.css` — responsive visual design
- `script.js` — catalogue search, playback, voice commands, likes and playlists

## Run it
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Run `index.html` using the Live Server extension (recommended).
4. Allow microphone access when prompted.

Use localhost or HTTPS for microphone permissions. Voice recognition support varies by browser; current Chromium browsers are generally the best option.

## Features
- Live search for songs and artists using the public iTunes Search API
- Search filter for songs/music videos
- Mood-based discovery shortcuts
- Album artwork and available audio previews
- Play/pause, next/previous, seek and volume controls
- Voice search and commands: search a phrase, pause, play/resume, next, previous
- Liked songs, a playlist with no app-imposed item cap, and recently played history
- Data stored locally in the browser with localStorage
- Responsive desktop and mobile interface

## Important music/API note
This is a frontend-only project. The iTunes Search API provides catalogue information and preview URLs where available; it does not provide unlimited full-length streaming. Preview availability and duration vary. For licensed full-track playback, user accounts and production-grade recommendations, connect an approved music provider API and follow its developer terms. Playlist length is not capped by this app, but browser storage has practical limits.
