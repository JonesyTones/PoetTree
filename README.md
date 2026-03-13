# PoetTree

A poetry discovery app built with React and TypeScript. Search poems by title or author, read them in full, and save your favorites — which transform into richly styled cards with a tree bark aesthetic.

**Live demo:** https://poet-tree.vercel.app

---

## Features

- **Search** poems by title, author, or all fields via the [PoetryDB API](https://poetrydb.org)
- **Poem of the Day** — a randomly featured poem on every visit
- **Explore tab** — browse poems without searching
- **Favorites** — save poems with a leaf icon; favorited cards and modals get a distinct bark-textured brown theme
- **Read more modal** — full poem text with sticky title/author header and scrollable lines
- **Responsive** — mobile-friendly layout with stacked search controls on small screens
- **Persistent favorites** — saved to `localStorage` so they survive page refreshes

---

## Tech Stack

- [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev) — build tool
- [Chakra UI](https://chakra-ui.com) — component library
- [PoetryDB](https://poetrydb.org) — free public poetry API

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
```
