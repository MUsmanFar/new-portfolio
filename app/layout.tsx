import type { Metadata, Viewport } from 'next';
import { siteUrl, seoTitle, seoDescription } from '@/lib/seo';
import './globals.css';
import './sections.css';
import './career.css';
import './theatre.css';
import './sequence.css';
import './collection.css';
import './arrival.css';
import './refinement.css';
import './menus.css';
import './focus-gallery.css';
import './polish.css';
import './responsive-scenes.css';
import './enhancement.css';
const title=seoTitle;
const description=seoDescription;
export const metadata: Metadata = {
 metadataBase:new URL(siteUrl),title,description,
 alternates:{canonical:'/'},
 authors:[{name:'Usman Farooqi',url:siteUrl}],
 verification:{google:'iHfdvGYJug6FRYh1hS--ZK3dpwaQX9awlt_gKJKx4-Y'},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
 openGraph:{type:'website',locale:'en_US',siteName:'Usman Farooqi',title,description,url:'/',images:[{url:'/og-thumbnail.jpg',width:1200,height:630,type:'image/jpeg',alt:'Usman Farooqi — Beyond the ordinary. A cinematic green doorway into digital experiences.'}]},
 twitter:{card:'summary_large_image',title,description,images:[{url:'/og-thumbnail.jpg',alt:'Usman Farooqi — Beyond the ordinary'}]}
};
export const viewport: Viewport = {themeColor:'#0b0e0b',colorScheme:'dark'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
