import type { Metadata, Viewport } from 'next';
import './globals.css';
import './sections.css';
import './career.css';
import './theatre.css';
import './sequence.css';
import './collection.css';
import './arrival.css';
import './refinement.css';
import './menus.css';
const origin=process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL ? 'https://'+process.env.VERCEL_URL : 'https://usman-farooqi.vercel.app');
const title='Usman Farooqi — Beyond the ordinary';
const description='Web development lead and project manager in Lahore. Explore websites, digital experiences and the thinking behind their delivery.';
export const metadata: Metadata = {
 metadataBase:new URL(origin),title,description,
 openGraph:{type:'website',locale:'en_US',siteName:'Usman Farooqi',title,description,url:'/',images:[{url:'/og-thumbnail.jpg',width:1200,height:630,type:'image/jpeg',alt:'Usman Farooqi — Beyond the ordinary. A cinematic green doorway into digital experiences.'}]},
 twitter:{card:'summary_large_image',title,description,images:[{url:'/og-thumbnail.jpg',alt:'Usman Farooqi — Beyond the ordinary'}]}
};
export const viewport: Viewport = {themeColor:'#0b0e0b',colorScheme:'dark'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
