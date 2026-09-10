# Usman Farooqi — Cinematic Portfolio

Next.js App Router + GSAP ScrollTrigger + Lenis + Three.js.

## Run

Node.js 20.9+ required. Run `npm install`, then `npm run dev`. Open http://localhost:3001.
Run `npm run typecheck` and `npm run build` for validation. The static production export is in `out/`.

## Source

- `components/Portfolio.tsx`: page, projects, navigation, scroll transitions and contact section.
- `components/Entrance.tsx`: Three.js doors, corridor, camera and lighting.
- `app/globals.css`: visual system and responsive styles.
- `lib/content.ts`: 16 projects and content from the existing v2 portfolio.
- `public/assets/`: original images and illustrated character.

The character is the supplied illustrated portrait on a plane in 3D space, not a rigged full-body model.
Mobile caps pixel ratio at 1, disables shadows and keeps native touch scrolling. Rendering pauses when offscreen or inactive. Reduced motion skips WebGL and Lenis.
The contact form sends through Web3Forms, with validated fields and confirmed success/error states.
Earlier static files remain in `dist/`. Both reference project folders are unchanged. Local changes do not automatically publish.

Run npm start after npm run build to serve the production export on port 3001. Stop the development server first. Optimized WebP variants are used for the illustrated character and larger project screenshots.
