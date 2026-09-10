# Vercel deployment

This project is configured for a Next.js static export. Import this repository into Vercel using the Next.js framework preset. `vercel.json` specifies `npm run build` and the `out` output directory. Keep Node.js 22 or 24 selected. No frontend secrets are required for the current portfolio.

The contact form submits directly to Web3Forms using the owner-supplied public access key in lib/contact.ts. Fields: full name, email, growth call topic, project timeline, project parameters/message. Loading and confirmed success/error states, required-field validation, a honeypot, and a 20-second timeout are implemented. Tests use mocked fetch responses and send no emails.

Import this repository into Vercel and deploy. Live email delivery and provider-side domain restrictions must be checked on the deployed domain. No deployment or live test submission has been performed by this change.

Web3Forms reference: https://docs.web3forms.com/how-to-guides/js-frameworks/react-js/react-js

Static export reference: https://nextjs.org/docs/app/guides/static-exports

Social preview: public/og-thumbnail.jpg is 1200 x 630 (approximately 161 KB). Open Graph and Twitter large-image metadata are included in the exported HTML. Set NEXT_PUBLIC_SITE_URL to the final public HTTPS origin if using a custom domain; otherwise Vercel production/deployment URL variables are used. Local builds default to the existing usman-farooqi.vercel.app domain. Rebuild and deploy after changing the origin. Live share previews require a publicly accessible deployment; localhost cannot be fetched by social crawlers.
