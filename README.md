# Fortune Cookie Match

A memory game in memory of Grum. Match fortune cookie pairs in a 4×4 grid. When you find Grum's signature fortune, confetti flies and a laugh track plays.

**Live site:** https://fortune-cookie-dun.vercel.app

## What this is

Tap cookies to crack them open — each tap plays a crunch sound. Fortune slips appear below the grid in a fixed two-row area so the grid stays put when the second slip appears. Match all pairs to win; matched cookies turn green with a checkmark. Classic big band swing loops in the background after you tap Start.

## How to run it locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

**What this does:** Installs dependencies and starts a local preview server so you can play the game in your browser while developing.

## How to build and preview

```bash
npm run build
npm run preview
```

**What this does:** Creates an optimized static site in the `dist/` folder, then serves it locally so you can test the production version before deploying.

## Deploy to Vercel

The project is already linked and deployed. Pushes to `main` on GitHub trigger automatic redeploys.

**Production URL:** https://fortune-cookie-dun.vercel.app

**Repo:** https://github.com/ngreenwall/fortune-cookie

To redeploy manually from the project folder:

```bash
npx vercel deploy --prod
```

Build settings: Framework **Vite**, command `npm run build`, output `dist`. No environment variables needed.

## Key configuration

None required. The mute button (top corner on every screen) toggles background music, cookie crack sounds, and the Grum laugh track.

## Audio license

All audio under the [Mixkit Free License](https://mixkit.co/license/#musicFree).

- Background music: *Swing is the Answer* by Diego Nava (Mixkit #526)
- Cookie crack: *Chewing something crunchy* (Mixkit SFX #2244)
- Laugh track: *Small crowd laugh and applause* (Mixkit SFX #422)

## Project structure

```
fortune-cookie/
├── src/
│   ├── components/       # UI: cookies, slips, intro, win, celebration, audio
│   ├── data/fortunes.ts
│   ├── hooks/useMemoryGame.ts
│   ├── utils/            # playCookieCrack.ts
│   └── App.tsx
├── public/audio/         # bigband-bg.mp3, cookie-crack.wav, grum-laugh.wav
├── dist/                 # Production build output (generated)
├── vercel.json           # SPA fallback
└── docs/CONTEXT.md       # Session handoff notes
```
