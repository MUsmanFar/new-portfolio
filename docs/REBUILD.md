# Analysis and implementation

The live portfolio has strong project imagery and professional detail. Services and expertise repeat similar information, while Experience links incorrectly target the expertise section. The rebuild consolidates the narrative and uses the correct timeline anchor.

## Sequence

Closed 3D doors → hinged opening → illustrated character reveal → forward camera dolly through a corridor → animated project reveals → about/services → experience → contact.

The scene uses actual Three.js meshes, lights and a perspective camera. GSAP ScrollTrigger drives door rotation, camera position and light color/intensity. The supplied character is a textured image plane, not a rigged avatar. Lenis integrates with GSAP's ticker and preserves native touch behavior.

## Performance controls

- Dynamic Three.js chunk, omitted for reduced motion.
- Pixel ratio capped at 1 on mobile/low-memory devices and 1.5 on desktop.
- No mobile shadows or antialiasing; one desktop 1024-pixel shadow map.
- No postprocessing or external 3D-model downloads.
- Render only on scene changes, while visible and in an active tab.
- Dispose GPU resources, listeners and ScrollTriggers on unmount.
- Native project dialogs, keyboard controls, skip link, lazy project images and reduced-motion preference.

These are implemented controls, not measured FPS or Lighthouse results. Physical-device profiling remains necessary before claiming performance numbers.

## Content

All 13 projects from the supplied v2 data are retained. Four are featured and nine appear in an expandable archive. Quantitative project impact figures remain in the reference data but are not displayed without verification. Contact prepares an email draft rather than pretending to submit to a backend.

The original project folders remain unchanged. The rebuild is in `D:/Projects/New Portfolio Codex`, with the earlier static implementation retained in `dist/`.

## Full scene redesign
Projects now use ProjectTheatre: a sticky fullscreen stage with perspective-driven scene transitions and direct project navigation. CareerJourney uses a separate sticky stage with large year typography, incoming depth transitions, role reveals and chapter navigation. About uses a full-width portrait composition; services become stacked sticky panels. Mobile and short viewports render sequential panels. Both stages revert observers and GSAP contexts on motion and breakpoint changes. Chapter navigation uses the shared Lenis event handler.

## Scroll sequence and personal portrait
A separate ProcessReel now moves three screens right-to-left, then gathers them into a stack. ProjectTheatre follows with descending project screens. Project screenshots use contained imagery without skew or darkening. Career shows employment records, dates, role titles and responsibilities only; website screenshots have been removed. The hero character is being replaced with a cartoon portrait derived from the user's actual photograph.
