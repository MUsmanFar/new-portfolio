import Portfolio from '@/components/Portfolio';
import { structuredData } from '@/lib/seo';
export default function Page(){return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,'\\u003c')}}/><Portfolio/></>}
