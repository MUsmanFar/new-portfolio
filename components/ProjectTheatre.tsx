'use client';
import {ArrowIcon} from './UiIcons';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '@/lib/content';
import SelectMenu from './SelectMenu';

const INTRO=3.8, REVEAL=.8, STEP=.9, TAIL=.35;
export default function ProjectTheatre({ motion, onSelect }: { motion: boolean; onSelect: (project: Project) => void }) {
 const root=useRef<HTMLDivElement>(null);
 const trigger=useRef<ScrollTrigger|null>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  if(!motion)return;
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  const ctx=gsap.context(()=>{
   media.add('(min-width: 900px) and (min-height: 600px)',()=>{
    const el=root.current!; el.classList.add('collection-live');
    const cards=Array.from(el.querySelectorAll<HTMLElement>('.collection-card'));
    const controls=el.querySelector<HTMLElement>('.collection-controls')!;
    const playhead={index:0};
    const visibleCards=new Set<HTMLElement>();
    let lastIndex=-1;
    const placeCards=()=>{
     const index=Math.round(playhead.index);if(index!==lastIndex){setActive(index);lastIndex=index;}
     cards.forEach((card,i)=>{
      const offset=i-playhead.index,distance=Math.abs(offset),near=distance<1.85;
      card.inert=i!==index;card.setAttribute('aria-hidden',String(i!==index));
      if(near){const d=Math.min(distance,1),soft=d*d*(3-2*d),angle=offset*.78,depth=1-Math.cos(angle),edge=Math.max(0,Math.min(1,(1.85-distance)/.5));visibleCards.add(card);gsap.set(card,{xPercent:Math.sin(angle)*125,yPercent:depth*9,z:-depth*420,scale:1-soft*.16,rotationY:-Math.sin(angle)*18,autoAlpha:(1-soft*.58)*edge,filter:'blur('+soft*5+'px)',borderColor:'rgba(184,210,145,'+(.16+(1-soft)*.3)+')',zIndex:10-Math.round(distance*4)})}
      else if(visibleCards.has(card)){gsap.set(card,{autoAlpha:0});visibleCards.delete(card)}
     });
    };
    gsap.set(cards,{autoAlpha:0});placeCards();
    gsap.set('.collection-window',{autoAlpha:0,y:45});
    gsap.set('.collection-ready',{autoAlpha:0,scale:.8});
    gsap.set(controls,{autoAlpha:0});controls.inert=true;
    cards.forEach(card=>{card.inert=true;card.setAttribute('aria-hidden','true')});
    const story=gsap.timeline({scrollTrigger:{trigger:el,start:'top top+=80',end:()=>'+='+(innerHeight*1.6+(projects.length-1)*Math.max(320,innerHeight*.52)),pin:el.querySelector('.collection-stage'),scrub:.55,invalidateOnRefresh:true},onUpdate:()=>{
     placeCards();const hidden=story.time()<INTRO;controls.inert=hidden;
     if(hidden)cards.forEach(card=>{card.inert=true;card.setAttribute('aria-hidden','true')});
    }});
    story.fromTo('.collection-heading',{autoAlpha:0,xPercent:25,scale:.96},{autoAlpha:1,xPercent:0,scale:1,duration:1,ease:'power2.out'})
     .to('.collection-heading',{xPercent:-120,autoAlpha:0,duration:1.1,ease:'sine.inOut'},1.2)
     .to('.collection-ready',{autoAlpha:1,scale:1,duration:.65,ease:'power2.out'},2.2)
     .to('.collection-ready',{autoAlpha:0,scale:1.1,y:-25,duration:.5},3.2)
     .to('.collection-window',{autoAlpha:1,y:0,duration:.8,ease:'power2.out'},INTRO)
     .to(controls,{autoAlpha:1,duration:.4},INTRO+.3);
    // Continuous progress: scrolling never waits through a per-project hold.
    story.to(playhead,{index:cards.length-1,duration:(cards.length-1)*STEP,ease:'none'},INTRO+REVEAL);
    story.to({}, {duration:TAIL});
    trigger.current=story.scrollTrigger!;
    return()=>{trigger.current=null;el.classList.remove('collection-live');controls.inert=false;cards.forEach(card=>{card.inert=false;card.removeAttribute('aria-hidden')})};
   });
  },root);
  return()=>{media.revert();ctx.revert()};
 },[motion]);
 const jump=(index:number)=>{
  const st=trigger.current;
  if(st)window.dispatchEvent(new CustomEvent('portfolio:chapter',{detail:st.start+(st.end-st.start)*(INTRO+REVEAL+index*STEP)/(INTRO+REVEAL+(projects.length-1)*STEP+TAIL)}));
  else root.current?.querySelectorAll('.collection-card')[index]?.scrollIntoView({block:'start',behavior:motion?'smooth':'instant'});
  setActive(index);
 };
 return <div ref={root} className="collection"><div className="collection-stage">
  <div className="collection-heading"><h2>Enter the <em>work collection.</em></h2><p>{projects.length} projects. A world of possibilities.<span>Scroll to explore →</span></p></div>
  <div className="collection-ready" aria-hidden="true"><span>{projects.length} DIFFERENT STORIES. ONE CONNECTED VISION.</span><p>Are you <em>ready?</em></p><b>LET’S GET INTO IT ↓</b></div><div className="collection-window"><div className="collection-rail">{projects.map((project,i)=><article key={project.title} className="collection-card">
   <div className="collection-visual"><div className="collection-browser"><span aria-hidden="true">● ● ●</span><span>{project.url?new URL(project.url).hostname:project.title}</span><span><ArrowIcon/></span></div><button className="collection-image" onClick={()=>onSelect(project)} aria-label={'View '+project.title}><img src={'/assets/'+project.screenshot.split('/').pop()!.replace('.png','.webp')} alt={project.title+' website homepage'} loading={i<2?'eager':'lazy'} width="1600" height="1000"/></button></div>
   <div className="collection-copy"><p className="eyebrow">{String(i+1).padStart(2,'0')} / {project.industry}</p><h3>{project.title}</h3><p>{project.description}</p><div className="collection-tags">{project.tags.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div><button className="collection-open" onClick={()=>onSelect(project)}>Explore project <span><ArrowIcon/></span></button></div>
  </article>)}</div></div>
  <div className="collection-controls"><div className="collection-chooser"><span>THE COLLECTION</span><SelectMenu id="project-choice" label="Choose a project" value={String(active)} onChange={value=>jump(Number(value))} up options={projects.map((p,i)=>({value:String(i),label:String(i+1).padStart(2,'0')+' — '+p.title}))}/></div><div className="collection-meter" aria-hidden="true"><span style={{width:((active+1)/projects.length*100)+'%'}}/></div><span className="collection-count">{String(active+1).padStart(2,'0')} / {projects.length}</span><button aria-label="Previous project" disabled={active===0} onClick={()=>jump(active-1)}><ArrowIcon direction="left"/></button><button aria-label="Next project" disabled={active===projects.length-1} onClick={()=>jump(active+1)}><ArrowIcon direction="right"/></button><a href="#about">Continue ↓</a></div>
 </div></div>;
}
