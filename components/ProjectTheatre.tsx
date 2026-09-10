'use client';
import {ArrowIcon,CloseIcon} from './UiIcons';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '@/lib/content';
import SelectMenu from './SelectMenu';

const INTRO=3.8, STEP=3.8, ENTER=1.2, EXIT=1, GAP=.15, TAIL=1.6;
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
    gsap.set(cards,{autoAlpha:0,xPercent:0,y:65,z:0,rotationY:0,scale:1,clipPath:'inset(100% 0% 0% 0% round 24px)'});
    gsap.set('.collection-ready',{autoAlpha:0,scale:.8});
    gsap.set(controls,{autoAlpha:0});controls.inert=true;
    cards.forEach(card=>{card.inert=true;card.setAttribute('aria-hidden','true')});
    const story=gsap.timeline({scrollTrigger:{trigger:el,start:'top top+=80',end:()=>'+='+((projects.length+3)*Math.max(1400,innerHeight*2.2)),pin:el.querySelector('.collection-stage'),scrub:1.1,invalidateOnRefresh:true},onUpdate:()=>{
     const time=story.time(),index=Math.min(projects.length-1,Math.max(0,Math.floor((time-INTRO)/STEP)));
     setActive(index);controls.inert=time<3.8;
     cards.forEach((card,i)=>{const hidden=time<3.8||i!==index;card.inert=hidden;card.setAttribute('aria-hidden',String(hidden))});
    }});
    story.fromTo('.collection-heading',{autoAlpha:0,scale:.78,y:65},{autoAlpha:1,scale:1,y:0,duration:1,ease:'power3.out'})
     .to('.collection-heading',{xPercent:130,rotationY:-12,autoAlpha:0,duration:1.1,ease:'power2.inOut'},1.4)
     .to('.collection-ready',{autoAlpha:1,scale:1,duration:.7,ease:'power2.out'},2.3)
     .to('.collection-ready',{autoAlpha:0,scale:1.2,y:-45,duration:.5},3.3)
     .to(controls,{autoAlpha:1,duration:.4},3.8);
    cards.forEach((card,i)=>{
     const at=INTRO+i*STEP;
     // Finish the outgoing card before the next entrance: no crossfade overlap.
     if(i)story.to(cards[i-1],{xPercent:0,y:-45,z:0,rotationY:0,scale:.98,clipPath:'inset(0% 0% 100% 0% round 24px)',autoAlpha:0,duration:EXIT,ease:'power2.inOut'},at-EXIT-GAP);
     story.to(card,{autoAlpha:1,xPercent:0,y:0,z:0,rotationY:0,scale:1,clipPath:'inset(0% 0% 0% 0% round 24px)',duration:ENTER,ease:'power2.inOut'},at)
      .fromTo(card.querySelector('.collection-copy'),{y:25},{y:0,duration:.9,ease:'power2.out'},at+.2);
    });
    story.to({}, {duration:TAIL});
    trigger.current=story.scrollTrigger!;
    return()=>{trigger.current=null;el.classList.remove('collection-live');controls.inert=false;cards.forEach(card=>{card.inert=false;card.removeAttribute('aria-hidden')})};
   });
  },root);
  return()=>{media.revert();ctx.revert()};
 },[motion]);
 const jump=(index:number)=>{
  const st=trigger.current;
  if(st)window.dispatchEvent(new CustomEvent('portfolio:chapter',{detail:st.start+(st.end-st.start)*(INTRO+index*STEP+ENTER)/(INTRO+(projects.length-1)*STEP+ENTER+TAIL)}));
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
