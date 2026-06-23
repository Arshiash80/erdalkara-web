# erdalkara-web

Website for **Erdal Kara Hair Design** — a premium men's barber in Osmangazi, Bursa (est. 2008).

## Stack
- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4**
- **Three.js** (r128) — interactive 3D clipper in the hero, loading `public/models/clipper.glb`
- Payload CMS — *planned* (admin panel, not wired yet)

## Design
Dark, cinematic, bronze-accented. Single-page, bilingual (TR default / EN toggle).
The design was authored in Claude Design and ported here 1:1:

- `app/_design/markup.ts` — the page markup (auto-generated; do not hand-edit)
- `app/_design/logic.ts` — reveal/parallax/nav/lang/gallery/counters + the Three.js clipper scene (auto-generated)
- `app/_design/design.css` — keyframes, resets, responsive rules
- `app/page.tsx` — injects the markup and bootstraps the design + 3D
- `scripts/extract-design.cjs` — one-shot generator used to produce the `_design` files

## Photos
Real photography goes in `public/assets/` — see `public/assets/README.md` for the filenames.

## Develop
```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

## Notes
- Booking currently links out to KolayRandevu; native booking is a later phase.
- See `BUSINESS_BRIEF.md` for business research + design direction.
