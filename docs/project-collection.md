# Project collection assets

The collection renders every project in `lib/content.ts` (16 projects as of 10 September 2026). Add a project there and place its matching WebP image under `public/assets/`; the stage and navigation derive their count automatically.

New additions: Grow Dental Supply (growdentalsupply.com), Al-Awan Furniture (al-awanfurniture.com), Dubai TV Repair (dubaitvrepair.com). Their previews are real homepage captures, taken 10 September 2026 and compressed to WebP.

Recommended replacement image: **1600 × 1000 px (16:10), WebP, approximately 150–300 KB**. Capture the homepage's first viewport; avoid a very long full-page image. The portfolio uses `object-fit: contain` so different source ratios remain fully visible. Current new captures are approximately 1270 × 715 px. No separate mobile asset is required; the image and text stack on narrow screens.

Desktop cinematic mode pins the stage: the oversized heading appears, travels right, an “Are you ready?” interlude appears, then all 16 project panels enter one at a time with depth and lateral motion. Previous/next, a project selector, and Continue allow direct navigation. Below 900 px wide or 600 px tall, or with motion disabled, every project appears in normal vertical document flow.

Service icons are lightweight vector symbols on dimensional CSS mounts, with hover lift and reduced-motion support. They do not create additional WebGL contexts.

Startup uses an opaque themed preloader while the first Three.js frame and portrait load, with a bounded fallback for unavailable WebGL. The default initial markup uses cinematic mode, preventing the previous motion-off layout flash. Explicit saved motion settings and system reduced-motion preferences remain respected. The navbar is centered; process cards transition as three layered panels on desktop, with lighter mobile reveals.

Project transitions now complete the outgoing exit before the next entrance, with a short gap and a longer reading hold. Timing is expressed in scrubbed timeline units, so actual speed remains controlled by scrolling. Added theme-matched app/icon.svg, app/favicon.ico, and app/apple-icon.png.

Focus-gallery revision: desktop scroll starts with Enter the World, moves Enter the Work right-to-left, shows Are you ready, then presents a sharp central project with blurred neighboring previews. Main content stays interactive; neighboring cards are inert and hidden from screen readers. Touch/small-screen and reduced-motion modes retain the vertical collection. Hero character uses gentle intact-cutout breathing/sway, capped at 24 fps on constrained devices and 40 fps otherwise, and pauses outside the visible hero. It is not a facial or skeletal animation rig.

Continuous orbit: removed all per-project hold segments. Scroll drives one linear playhead, with sine/cosine positioning, depth and smaller blurred side cards. Intro appears once. Hero now has a soft alpha-derived green silhouette rim, rendered without modifying the portrait asset.
