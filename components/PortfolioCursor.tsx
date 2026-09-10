'use client';
import {useEffect,useRef} from 'react';
import {gsap} from 'gsap';
export default function PortfolioCursor({enabled}:{enabled:boolean}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!enabled||!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const el=root.current!;let entered=false;
  const x=gsap.quickTo(el,'x',{duration:.22,ease:'power3.out'}),y=gsap.quickTo(el,'y',{duration:.22,ease:'power3.out'});
  const move=(event:PointerEvent)=>{if(event.pointerType!=='mouse')return;if(!entered){gsap.set(el,{x:event.clientX,y:event.clientY});entered=true}x(event.clientX);y(event.clientY);el.style.opacity='1';el.classList.toggle('cursor-action',!!(event.target as Element).closest('a,button,summary,select'));el.classList.toggle('cursor-hidden',!!(event.target as Element).closest('input,textarea,dialog'))};
  const leave=()=>{el.style.opacity='0';entered=false};
  window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',leave);window.addEventListener('blur',leave);
  return()=>{window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);window.removeEventListener('blur',leave);x.tween.kill();y.tween.kill();el.style.opacity='0'};
 },[enabled]);
 return <div ref={root} className="portfolio-cursor" aria-hidden="true"><span/></div>
}
