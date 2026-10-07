# Shared cinematic scenes

ProcessReel, ProjectTheatre, CareerJourney and the about/contact reveals use the same GSAP timelines at every viewport width. Responsive CSS changes composition, not scene order. Motion-off and reduced-motion preferences retain their accessible static mode.

Tablet/phone layouts retain the sticky process stack, pinned project orbit, sticky career chapters and stacked service cards. Portrait and landscape have separate composition rules; short portrait screens do not use the landscape grid. Career stage uses overflow:clip to avoid focus scrolling the scene internally.

## Character asset

Built-in imagegen edit target: public/assets/usman-cutout.png.

Final prompt: Edit target: supplied transparent illustrated portrait. Precise object recolour only: replace the navy blue suit jacket with deep forest/olive green fabric (#34452b midtone), harmonizing with a dark green/lime portfolio. Preserve EXACT person identity, face, hair, skin, white shirt, pose, framing, silhouette, expression, lighting, fabric details and transparency. No added objects or background. Same bust portrait. Only suit colour changes.

Saved edit: public/assets/usman-green-cutout.png. Runtime asset: public/assets/usman-green-cutout.webp (900 × 920, alpha, 85,052 bytes). Original assets remain available. Existing Three.js character motion, silhouette rim and camera choreography are retained.

Browser checks covered desktop, 390 × 844 phone, 768 × 1024 tablet and 844 × 390 landscape. All three enhanced scenes activate; project navigation and career chapter controls work. No document horizontal overflow was observed in these viewports. These are browser viewport checks, not physical-device performance measurements.
