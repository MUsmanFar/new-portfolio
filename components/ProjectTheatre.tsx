'use client';
import {ArrowIcon} from './UiIcons';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Project } from '@/lib/content';
import SelectMenu from './SelectMenu';

const REVEAL=.8, STEP=.9, TAIL=.35;
export default function ProjectTheatre({ motion, onSelect, projects, collectionId, title, first=false, next="#about" }: { motion: boolean; onSelect: (project: Project) => void; projects: Project[]; collectionId: string; title: string; first?: boolean; next?: string }) {
 const INTRO=first?3.8:1.4;
 const root=useRef<HTMLDivElement>(null);
 const trigger=useRef<ScrollTrigger|null>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  if(!motion)return;
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  const ctx=gsap.context(()=>{
   media.add({mobile:'(max-width: 899px)',desktop:'(min-width: 900px)'},context=>{
    const el=root.current!; el.classList.add('collection-live');
    const nativeSticky=Boolean(context.conditions?.mobile);
    const stage=el.querySelector<HTMLElement>('.collection-stage')!;
    el.classList.toggle('collection-native',nativeSticky);
    const scrollDistance=()=>{const height=stage.clientHeight+80;return height*(first?1.6:.65)+(projects.length-1)*Math.max(320,height*.52)};
    let stageWidth=0;
    const sizeSticky=()=>{
     if(!nativeSticky)return;
     // iOS browser bars resize the visual viewport mid-swipe. Keep the theatre
     // and its scroll distance at one height until the actual screen width changes.
     if(stageWidth!==innerWidth){stage.style.removeProperty('height');stage.style.height=stage.clientHeight+'px';stageWidth=innerWidth}
     el.style.height=(stage.clientHeight+scrollDistance())+'px';
    };
    sizeSticky();
    const cards=Array.from(el.querySelectorAll<HTMLElement>('.collection-card'));
    const controls=el.querySelector<HTMLElement>('.collection-controls')!;
    const playhead={index:0};
    const visibleCards=new Set<HTMLElement>();
    let lastIndex=-1,lastPosition=-1,lastHidden=true;
    const transforms=cards.map(card=>gsap.quickSetter(card,'css'));
    const syncAccess=(index:number,hidden:boolean)=>{if(index===lastIndex&&hidden===lastHidden)return;cards.forEach((card,i)=>{card.inert=hidden||i!==index;card.setAttribute('aria-hidden',String(hidden||i!==index));card.classList.toggle('is-current',i===index)});controls.inert=hidden;if(index!==lastIndex)setActive(index);lastIndex=index;lastHidden=hidden;};
    const placeCards=()=>{
     if(Math.abs(playhead.index-lastPosition)<.0001)return;lastPosition=playhead.index;
     cards.forEach((card,i)=>{
      const offset=i-playhead.index,distance=Math.abs(offset),near=distance<1.85;

      if(near){const d=Math.min(distance,1),soft=d*d*(3-2*d),angle=offset*.78,depth=1-Math.cos(angle),edge=Math.max(0,Math.min(1,(1.85-distance)/.5));visibleCards.add(card);transforms[i]({xPercent:Math.sin(angle)*125,yPercent:depth*9,z:-depth*420,scale:1-soft*.16,rotationY:-Math.sin(angle)*18,autoAlpha:(1-soft*.58)*edge,zIndex:10-Math.round(distance*4)})}
      else if(visibleCards.has(card)){gsap.set(card,{autoAlpha:0});visibleCards.delete(card)}
     });
    };
    gsap.set(cards,{autoAlpha:0});placeCards();
    gsap.set('.collection-window',{autoAlpha:0,y:45});
    gsap.set('.collection-ready',{autoAlpha:0,scale:.8});
    gsap.set(controls,{autoAlpha:0});controls.inert=true;
    cards.forEach(card=>{card.inert=true;card.setAttribute('aria-hidden','true')});
    const story=gsap.timeline({scrollTrigger:{trigger:el,start:'top top+=80',end:()=>'+='+scrollDistance(),pin:nativeSticky?false:stage,anticipatePin:nativeSticky?0:1,scrub:nativeSticky?true:.55,invalidateOnRefresh:true,onRefreshInit:sizeSticky,onToggle:self=>el.classList.toggle('collection-active',self.isActive)},onUpdate:()=>{
     placeCards();syncAccess(Math.round(playhead.index),story.time()<INTRO);
    }});
    if(first){
     story.fromTo('.collection-heading',{autoAlpha:0,xPercent:25,scale:.96},{autoAlpha:1,xPercent:0,scale:1,duration:1,ease:'power2.out'})
      .to('.collection-heading',{xPercent:-120,autoAlpha:0,duration:1.1,ease:'sine.inOut'},1.2)
      .to('.collection-ready',{autoAlpha:1,scale:1,duration:.65},2.2)
      .to('.collection-ready',{autoAlpha:0,scale:1.1,y:-25,duration:.5},3.2);
    }else{
     story.fromTo('.collection-heading',{autoAlpha:0,y:25},{autoAlpha:1,y:0,duration:.5})
      .to('.collection-heading',{autoAlpha:0,y:-25,duration:.4},.9);
    }
    story.to('.collection-window',{autoAlpha:1,y:0,duration:REVEAL},INTRO)
     .to(controls,{autoAlpha:1,duration:.4},INTRO+.3);
    // Continuous progress: scrolling never waits through a per-project hold.
    // An explicit start value survives ScrollTrigger refreshes after viewport changes.
    story.fromTo(playhead,{index:0},{index:cards.length-1,duration:(cards.length-1)*STEP,ease:'none',immediateRender:false},INTRO+REVEAL);
    story.to({}, {duration:TAIL});
    trigger.current=story.scrollTrigger!;
    return()=>{trigger.current=null;el.style.removeProperty('height');stage.style.removeProperty('height');el.classList.remove('collection-live','collection-active','collection-native');controls.inert=false;cards.forEach(card=>{card.inert=false;card.removeAttribute('aria-hidden');card.classList.remove('is-current')})};
   });
  },root);
  return()=>{media.revert();ctx.revert()};
 },[motion,projects,first,INTRO]);
 const jump=(index:number)=>{
  const st=trigger.current;
  if(st)window.dispatchEvent(new CustomEvent('portfolio:chapter',{detail:st.start+(st.end-st.start)*(INTRO+REVEAL+index*STEP)/(INTRO+REVEAL+(projects.length-1)*STEP+TAIL)}));
  else root.current?.querySelectorAll('.collection-card')[index]?.scrollIntoView({block:'start',behavior:motion?'smooth':'instant'});
  setActive(index);
 };
 return <div ref={root} className="collection"><div className="collection-stage">
  <div className="collection-heading"><h2>{first?<>Enter the <em>work collection.</em></>:title}</h2><p>{projects.length} projects. A world of possibilities.<span>Scroll to explore →</span></p></div>
  <div className="collection-ready" aria-hidden="true"><span>{projects.length} DIFFERENT STORIES. ONE CONNECTED VISION.</span><p>Are you <em>ready?</em></p><b>LET’S GET INTO IT ↓</b></div><div className="collection-window"><div className="collection-rail">{projects.map((project,i)=><article key={project.id} className="collection-card">
   <div className="collection-visual"><div className="collection-browser"><span aria-hidden="true">● ● ●</span><span>{project.url?new URL(project.url).hostname:project.title}</span><span><ArrowIcon/></span></div><button className="collection-image" onClick={()=>onSelect(project)} aria-label={'View '+project.title}>{project.screenshot?<img src={project.screenshot} alt={project.title+' website homepage'} loading="lazy" width="1600" height="1000" decoding="async"/>:<span className="project-preview-missing"><b>{project.title}</b><small>{project.platform}</small><span>Website preview pending</span></span>}</button>{project.previewLabel&&<p className="preview-label">{project.previewLabel}</p>}</div>
   <div className="collection-copy"><p className="eyebrow">{String(i+1).padStart(2,'0')} / {project.industry}</p><h3>{project.title}</h3><p>{project.description}</p><div className="project-attribution"><span>{project.platform}</span><span>My role: {project.role}</span></div><div className="collection-tags">{project.tags.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div><button className="collection-open" onClick={()=>onSelect(project)}>Explore project <span><ArrowIcon/></span></button></div>
  </article>)}</div></div>
  <div className="collection-controls"><div className="collection-chooser"><span>THE COLLECTION</span><SelectMenu id={"project-choice-"+collectionId} label={"Choose a project in "+title} value={String(active)} onChange={value=>jump(Number(value))} up options={projects.map((p,i)=>({value:String(i),label:String(i+1).padStart(2,'0')+' — '+p.title}))}/></div><div className="collection-meter" aria-hidden="true"><span style={{width:((active+1)/projects.length*100)+'%'}}/></div><span className="collection-count">{String(active+1).padStart(2,'0')} / {projects.length}</span><button aria-label="Previous project" disabled={active===0} onClick={()=>jump(active-1)}><ArrowIcon direction="left"/></button><button aria-label="Next project" disabled={active===projects.length-1} onClick={()=>jump(active+1)}><ArrowIcon direction="right"/></button><a href={next}>Continue ↓</a></div>
 </div></div>;
}
