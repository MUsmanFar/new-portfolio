'use client';
import {useEffect,useRef,useState} from 'react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export default function Preloader({onComplete}:{onComplete:()=>void}){
 const [phase,setPhase]=useState('loading');
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let finished=false,cancelled=false,exitTimer:ReturnType<typeof setTimeout>,minimum:ReturnType<typeof setTimeout>,settle:ReturnType<typeof setTimeout>;
  const start=performance.now();
  const previous=document.body.style.overflow;document.body.style.overflow='hidden';
  const finish=()=>{if(finished||cancelled)return;finished=true;minimum=setTimeout(()=>{
   // Restore layout and settle pinned scenes while the opaque loader still covers them.
   document.body.style.overflow=previous;
   ScrollTrigger.refresh();
   settle=setTimeout(()=>{setPhase('leaving');exitTimer=setTimeout(()=>{setPhase('done');onComplete()},matchMedia('(prefers-reduced-motion: reduce)').matches?50:850)},900);
  },Math.max(0,1400-(performance.now()-start)))};
  window.addEventListener('portfolio:scene-ready',finish);
  // The static/reduced-motion scene needs no WebGL readiness signal.
  const fallback=setTimeout(finish,4500);
  const image=new Image();image.src='/assets/portal.webp';image.decode().catch(()=>{}).then(()=>{let savedOff=false;try{savedOff=localStorage.getItem('cinematic-motion')==='off'}catch{}if(matchMedia('(prefers-reduced-motion: reduce)').matches||savedOff)finish()});
  return()=>{cancelled=true;window.removeEventListener('portfolio:scene-ready',finish);clearTimeout(fallback);clearTimeout(minimum);clearTimeout(settle);clearTimeout(exitTimer);document.body.style.overflow=previous};
 },[onComplete]);
 if(phase==='done')return null;
 return <div ref={root} data-lenis-prevent className={'arrival-loader '+phase} role="status" aria-label="Preparing portfolio"><div className="arrival-loader-top"><span>USMAN FAROOQI</span><span>DIGITAL EXPERIENCES / 2026</span></div><div className="arrival-loader-center"><div className="arrival-monogram">uf<span>®</span></div><p>A little anticipation.<br/><em>Something beyond the ordinary.</em></p><div className="arrival-loader-line"><span/></div></div><div className="arrival-loader-bottom"><span>SETTING THE SCENE</span><span className="arrival-loader-dot"/></div></div>
}
