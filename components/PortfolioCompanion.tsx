'use client';
import {useEffect,useState,type CSSProperties} from 'react';
import type {CompanionMood} from '@/lib/companion';

const stops=[
 ['#home','Hi, I’m Pip. Scroll to open the door. I’ll show you around!'],
 ['.process-reel','A good idea needs a good process. Here’s how Usman brings it to life.'],
 ['#projects','Pick a chapter, then open any project for its story.'],
 ['#work-vibe','Custom builds, one at a time. The index follows your scroll.'],
 ['#work-wordpress','Everyday websites with plenty happening behind the scenes.'],
 ['#work-shopify','A little window shopping? These are the eCommerce projects.'],
 ['#work-managed','Teamwork in action. Open Go-Jetter or YalaRide to explore the app screens!'],
 ['#work-motion','Personalities, in pixels. Explore these interactive portfolios.'],
 ['#creative-work','A little room for experiments. This is where ideas get playful.'],
 ['#about','Meet the human behind the pixels.'],
 ['#experience','Every chapter adds a new perspective. Keep scrolling.'],
 ['#contact','Your turn! Tell Usman what you’d love to build.'],
];
export default function PortfolioCompanion(){
 const [note,setNote]=useState({message:stops[0][1],mood:'happy' as CompanionMood});
 const [open,setOpen]=useState(false),[hidden,setHidden]=useState(false);
 const [dock,setDock]=useState({left:false,lift:0});
 useEffect(()=>{
  let timer:ReturnType<typeof setTimeout>;
  const show=(message:string,mood:CompanionMood)=>{clearTimeout(timer);setNote({message,mood});setOpen(true);timer=setTimeout(()=>setOpen(false),8000)};
  const observer=new IntersectionObserver(entries=>{const matches=entries.filter(entry=>entry.isIntersecting);if(!matches.length)return;const entry=matches[matches.length-1];const index=stops.findIndex(([selector])=>entry.target.matches(selector));if(index>=0){setDock({left:index%2===1||stops[index][0]==='#contact',lift:index%3===1?55:0});show(stops[index][1],'curious')}},{rootMargin:'-20% 0px -60% 0px'});
  stops.forEach(([selector])=>{const el=document.querySelector(selector);if(el)observer.observe(el)});
  const feedback=(event:Event)=>{const detail=(event as CustomEvent<{message:string;mood:CompanionMood}>).detail;setDock({left:true,lift:0});show(detail.message,detail.mood)};
  window.addEventListener('portfolio:companion',feedback);
  return()=>{observer.disconnect();clearTimeout(timer);window.removeEventListener('portfolio:companion',feedback)};
 },[]);
 if(hidden)return <button className="pip-restore" onClick={()=>{setHidden(false);setOpen(true)}} aria-label="Show Pip portfolio guide">Pip ✦</button>;
 return <aside className={'pip-guide mood-'+note.mood+(dock.left?' pip-dock-left':' pip-dock-right')} style={{'--pip-dock':dock.left?0:1,'--pip-lift':-dock.lift+'px'} as CSSProperties} aria-label="Pip portfolio guide">
  {open&&<div className="pip-bubble"><div><span>PIP / YOUR LITTLE GUIDE</span><button onClick={()=>setOpen(false)} aria-label="Close guide hint">×</button></div><p role="status">{note.message}</p><button className="pip-hide" onClick={()=>setHidden(true)}>Hide guide</button></div>}
  <button className="pip-character" aria-label={open?'Close Pip hint':'Open Pip hint'} aria-expanded={open} onClick={()=>setOpen(value=>!value)}>
   <svg viewBox="0 0 120 120" fill="none" aria-hidden="true"><defs><radialGradient id="pip-body" cx=".32" cy=".24" r=".8"><stop stopColor="#efffb6"/><stop offset=".5" stopColor="#c8f56a"/><stop offset="1" stopColor="#6caa32"/></radialGradient></defs><ellipse cx="61" cy="109" rx="27" ry="4" fill="#000" opacity=".22"/><g className="pip-float"><path d="M57 30Q50 8 32 15Q34 34 57 30" fill="#98c84e"/><path d="M58 29Q61 5 82 12Q80 30 58 29" fill="#d4ff80"/><path className="pip-hand" d="M25 65Q10 57 13 48M94 65Q109 57 106 46" stroke="#c9f874" strokeWidth="7" strokeLinecap="round"/><path d="M41 94l-5 8M79 94l6 8" stroke="#a3d84e" strokeWidth="9" strokeLinecap="round"/><path d="M60 28C87 28 99 49 97 72C95 94 78 101 60 101C40 101 23 89 23 70C23 45 36 28 60 28Z" fill="url(#pip-body)"/><ellipse cx="41" cy="72" rx="7" ry="4" fill="#fb9e8b" opacity=".55"/><ellipse cx="80" cy="72" rx="7" ry="4" fill="#fb9e8b" opacity=".55"/><g className="pip-eyes" fill="#243714"><ellipse cx="46" cy="60" rx="4" ry="6"/><ellipse cx="74" cy="60" rx="4" ry="6"/></g><path className="pip-brows" d="m40 49 11 3m18 0 11-3" stroke="#243714" strokeWidth="2.5" strokeLinecap="round"/>{note.mood==='concerned'?<path d="M53 81Q60 73 67 81" stroke="#243714" strokeWidth="3" strokeLinecap="round"/>:note.mood==='thinking'?<ellipse cx="61" cy="79" rx="4" ry="5" fill="#243714"/>:<path d="M51 76Q60 88 70 76" stroke="#243714" strokeWidth="3" strokeLinecap="round"/>}<path d="M36 46Q42 36 52 36" stroke="#fff" opacity=".5" strokeWidth="4" strokeLinecap="round"/></g></svg>
  </button>
 </aside>;
}
