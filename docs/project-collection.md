# Project collection assets

The collection renders every project in `lib/content.ts` (16 projects as of 10 September 2026). Add a project there and place its matching WebP image under `public/assets/`; the stage and navigation derive their count automatically.

New additions: Grow Dental Supply (growdentalsupply.com), Al-Awan Furniture (al-awanfurniture.com), Dubai TV Repair (dubaitvrepair.com). Their previews are real homepage captures, taken 10 September 2026 and compressed to WebP.

Recommended replacement image: **1600 × 1000 px (16:10), WebP, approximately 150–300 KB**. Capture the homepage's first viewport; avoid a very long full-page image. The portfolio uses `object-fit: contain` so different source ratios remain fully visible. Current new captures are approximately 1270 × 715 px. No separate mobile asset is required; the image and text stack on narrow screens.

Desktop cinematic mode pins the stage: the oversized heading appears, travels right, an “Are you ready?” interlude appears, then all 16 project panels enter one at a time with depth and lateral motion. Previous/next, a project selector, and Continue allow direct navigation. Below 900 px wide or 600 px tall, or with motion disabled, every project appears in normal vertical document flow.

Service icons are lightweight vector symbols on dimensional CSS mounts, with hover lift and reduced-motion support. They do not create additional WebGL contexts.

Startup uses an opaque themed preloader while the first Three.js frame and portrait load, with a bounded fallback for unavailable WebGL. The default initial markup uses cinematic mode, preventing the previous motion-off layout flash. Explicit saved motion settings and system reduced-motion preferences remain respected. The navbar is centered; process cards transition as three layered panels on desktop, with lighter mobile reveals.

Project transitions now complete the outgoing exit before the next entrance, with a short gap and a longer reading hold. Timing is expressed in scrubbed timeline units, so actual speed remains controlled by scrolling. Added theme-matched app/icon.svg, app/favicon.ico, and app/apple-icon.png.
