# Fortune Cookie Match

A memory game in memory of Grum. Match fortune cookie pairs in a 4×4 grid. When you find Grum's signature fortune, confetti flies and a laugh track plays.

## What this is

Tap cookies to crack them open. Fortune slips appear below the grid so you can read and compare them. Match all pairs to win.

## How to run it locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

**What this does:** Installs dependencies and starts a local preview server so you can play the game in your browser while developing.

## How to build for production

```bash
npm run build
npm run preview
```

**What this does:** Creates an optimized static site in the `dist/` folder, then serves it locally so you can test the production version before deploying.

## Deploy to Vercel

### One-time setup (you do this once)

1. Create an empty repo on GitHub (e.g. `fortune-cookie`)
2. In this project folder, initialize git and push:

```bash
git init
git add .
git commit -m "Initial commit: Fortune Cookie Match"
git remote add origin git@github.com:YOUR_USERNAME/fortune-cookie.git
git push -u origin main
```

3. Go to [vercel.com](https://vercel.com) and sign in with GitHub
4. Click **New Project** → import your `fortune-cookie` repo
5. Confirm settings: Framework **Vite**, Build command `npm run build`, Output directory `dist`
6. Click **Deploy** and copy the `.vercel.app` URL to share with family

No environment variables or database needed. The free tier is enough.

## Key configuration

None required. Optional: mute button in the game header toggles the Grum laugh track.

## Audio license

All audio under the [Mixkit Free License](https://mixkit.co/license/#musicFree).

- Background music: *Lounging By Moonlight* by Ahjay Stelino (Mixkit #40)
- Laugh track: Mixkit Sound Effect #2570

## Project structure

```
fortune-cookie/
├── src/
│   ├── components/     # UI: cookies, slips, intro, win, celebration
│   ├── data/fortunes.ts
│   ├── hooks/useMemoryGame.ts
│   └── App.tsx
├── public/audio/       # Grum laugh track
├── dist/               # Production build output (generated)
└── docs/CONTEXT.md     # Session handoff notes
```
