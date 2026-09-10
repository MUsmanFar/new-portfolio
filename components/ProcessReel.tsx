'use client';
import { useEffect,useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const scenes=[
 {number:'01',title:'Start with',accent:'the right questions.',body:'Understand the business, define the requirements and bring the right people together.',words:['DISCOVER','PLAN','ALIGN']},
 {number:'02',title:'Build with',accent:'intention.',body:'Turn the brief into a responsive website. Connect design, development and every detail in between.',words:['DESIGN','DEVELOP','REFINE']},
 {number:'03',title:'Make the',accent:'launch count.',body:'Bring the website online, handle the infrastructure and keep the experience working after launch.',words:['DEPLOY','MANAGE','SUPPORT']}
];
export default function ProcessReel({motion}:{motion:boolean}){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  if(!motion)return;
  gsap.registerPlugin(ScrollTrigger);const media=gsap.matchMedia();
  const ctx=gsap.context(()=>{
   media.add('(min-width:900px) and (min-height:650px)',()=>{
    const el=root.current!;el.classList.add('reel-live');
    const panels=gsap.utils.toArray<HTMLElement>('.reel-panel',el);
    gsap.set(panels.slice(1),{yPercent:110,rotationX:-12,scale:.9,autoAlpha:0});
    const camera=gsap.timeline({scrollTrigger:{trigger:el,start:'top top+=86',end:'bottom bottom',scrub:.75}});
    panels.forEach((panel,i)=>{
     if(i){camera.to(panels[i-1],{scale:.9,y:-28,z:-180,autoAlpha:0,rotationX:6,duration:.8},i*1.6-.4)
      .to(panel,{yPercent:0,rotationX:0,scale:1,autoAlpha:1,duration:1,ease:'power3.out'},i*1.6-.4)}
     camera.fromTo(panel.querySelectorAll('.reel-words>span'),{x:65,opacity:0,rotationY:-20},{x:0,opacity:1,rotationY:0,stagger:.13,duration:.5},i*1.6+.1);
    });
    camera.to('.reel-stack-label',{autoAlpha:1,y:0,duration:.4},3.9);
    camera.to({}, {duration:.5});
    return()=>el.classList.remove('reel-live');
   });
   media.add('(max-width:899px), (max-height:649px)',()=>{
    gsap.utils.toArray<HTMLElement>('.reel-panel',root.current).forEach(panel=>gsap.fromTo(panel,{y:45,scale:.96},{y:0,scale:1,ease:'none',scrollTrigger:{trigger:panel,start:'top 95%',end:'top 45%',scrub:.4}}));
   });
  },root);return()=>{media.revert();ctx.revert()};
 },[motion]);
 return <section ref={root} className="process-reel" aria-label="How I work"><div className="reel-stage">
  <div className="reel-top"><span>THE WAY I WORK</span><span>ONE IDEA. A CONNECTED JOURNEY.</span></div>
  <div className="reel-window"><div className="reel-rail">{scenes.map(scene=><article className={'reel-panel reel-panel-'+scene.number} key={scene.number}>
   <span className="reel-number" aria-hidden="true">{scene.number}</span><div className="reel-copy"><p className="eyebrow">{scene.words.join(' / ')}</p><h2>{scene.title}<br/><em>{scene.accent}</em></h2><p>{scene.body}</p></div>
   <div className="reel-words" aria-hidden="true">{scene.words.map((word,i)=><span key={word}><b>0{i+1}</b>{word}<i>↗</i></span>)}</div>
  </article>)}</div></div><div className="reel-stack-label">THE PLAN. THE BUILD. THE DELIVERY. <span>NEXT: THE WORK ↓</span></div>
 </div></section>
}
