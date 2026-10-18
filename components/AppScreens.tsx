'use client';
import {useState} from 'react';
import type {Project} from '@/lib/content';
import {ArrowIcon} from './UiIcons';
type Screens=NonNullable<Project['appScreens']>;
// Preserve the supplied artwork. CSS frames just hide the captured phone viewer chrome.
export function AppPreview({screens}:{screens:Screens}){
 return <span className="app-preview">{screens.slice(0,3).map(screen=><span className="app-artwork" key={screen.src}><img src={screen.src} alt={screen.label+' mobile app preview'} width="739" height="1600" loading="lazy" decoding="async"/></span>)}<span className="app-preview-label">MOBILE APPLICATION / {screens.length} SCREENS</span></span>;
}
export default function AppScreens({screens,title}:{screens:Screens;title:string}){
 const [active,setActive]=useState(0);
 const next=(direction:number)=>setActive(value=>(value+direction+screens.length)%screens.length);
 return <section className="app-screen-gallery" aria-label={title+' app screenshots'}>
  <div className="app-screen-heading"><span className="eyebrow">INSIDE THE APPLICATION</span><span>{String(active+1).padStart(2,'0')} / {screens.length}</span></div>
  <div className="app-screen-stage"><button onClick={()=>next(-1)} aria-label="Previous app screenshot"><ArrowIcon direction="left"/></button><figure><div className="app-artwork"><img src={screens[active].src} alt={title+' — '+screens[active].label} width="739" height="1600"/></div><figcaption aria-live="polite">{screens[active].label}</figcaption></figure><button onClick={()=>next(1)} aria-label="Next app screenshot"><ArrowIcon direction="right"/></button></div>
  <div className="app-screen-thumbs" aria-label="Choose an app screen">{screens.map((screen,i)=><button key={screen.src} onClick={()=>setActive(i)} aria-label={'Show '+screen.label+' screenshot'} aria-pressed={active===i}><span className="app-artwork"><img src={screen.src} alt="" width="739" height="1600" loading="lazy"/></span><span>{screen.label}</span></button>)}</div>
 </section>;
}
