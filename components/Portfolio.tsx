'use client';
import {ArrowIcon,CloseIcon} from './UiIcons';
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CareerJourney from './CareerJourney';
import ProjectTheatre from './ProjectTheatre';
import ProcessReel from './ProcessReel';
import ServiceIcon from './ServiceIcon';
import Preloader from './Preloader';
import PortfolioCursor from './PortfolioCursor';
import ContactForm from './ContactForm';
import { projects, services, experience, site, type Project } from '@/lib/content';

const Entrance = dynamic(()=>import('./Entrance'),{ssr:false});
const imageFor=(p:Project)=>'/assets/'+p.screenshot.split('/').pop()!.replace('.png','.webp');
export default function Portfolio(){
 const root=useRef<HTMLDivElement>(null), dialog=useRef<HTMLDialogElement>(null);
 const [loading,setLoading]=useState(true);
 const finishLoading=useCallback(()=>{setLoading(false)},[]);
 const [motion,setMotion]=useState(true),[selected,setSelected]=useState<Project|null>(null),[active,setActive]=useState('home');
 useEffect(()=>{let saved:string|null=null;try{saved=localStorage.getItem('cinematic-motion')}catch{}setMotion(saved?saved==='on':!matchMedia('(prefers-reduced-motion: reduce)').matches);const media=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>{let explicit=false;try{explicit=localStorage.getItem('cinematic-motion')!==null}catch{}if(!explicit)setMotion(!media.matches)};media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const lenis=motion?new Lenis({duration:1.05,smoothWheel:true,syncTouch:false,anchors:true,prevent:node=>node.tagName==='DIALOG'}):null;
  const jumpChapter=(event:Event)=>{const top=(event as CustomEvent<number>).detail;if(lenis)lenis.scrollTo(top,{immediate:true});else window.scrollTo({top,behavior:'instant'})};
  window.addEventListener('portfolio:chapter',jumpChapter);
  const tick=(time:number)=>lenis?.raf(time*1000);if(lenis){lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(tick)}
  const responsive=gsap.matchMedia();
  const ctx=gsap.context(()=>{
   if(motion){
    gsap.to('.intro-copy',{opacity:0,y:-65,ease:'none',scrollTrigger:{trigger:'.entrance',start:'top top',end:'25% top',scrub:true}});
    const reveal=gsap.timeline({scrollTrigger:{trigger:'.entrance',start:'28% top',end:'bottom bottom',scrub:true}});
    reveal.fromTo('.person-copy',{autoAlpha:0,y:45},{autoAlpha:1,y:0,duration:.5}).to('.person-copy',{autoAlpha:0,y:-35,duration:.3},1.1);
    gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>gsap.fromTo(el,{y:35,opacity:.3},{y:0,opacity:1,scrollTrigger:{trigger:el,start:'top 95%',end:'top 75%',scrub:true}}));
    responsive.add('(min-width: 900px) and (min-height: 700px)',()=>{
     const about=gsap.timeline({scrollTrigger:{trigger:'.about-grid',start:'top 65%',end:'bottom 65%',scrub:.8}});
     about.fromTo('.about-portrait',{clipPath:'inset(0% 48% 0% 48%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1})
      .fromTo('.about-portrait img',{scale:1.4,filter:'grayscale(1)'},{scale:1,filter:'grayscale(0)',duration:1.5},0)
      .fromTo('.about-copy h2',{y:80,opacity:.15},{y:0,opacity:1,duration:.8},.4);
     gsap.fromTo('.contact-title-line',{yPercent:100,rotation:5},{yPercent:0,rotation:0,stagger:.15,ease:'power2.out',scrollTrigger:{trigger:'.contact',start:'top 75%',end:'top 5%',scrub:.8}});
     gsap.fromTo('.contact-panel',{clipPath:'inset(0 0 100% 0)',y:70},{clipPath:'inset(0 0 0% 0)',y:0,scrollTrigger:{trigger:'.contact-grid',start:'top 90%',end:'top 35%',scrub:.65}});
    });

    gsap.utils.toArray<HTMLElement>('.services details').forEach(row=>gsap.fromTo(row,{opacity:.35,x:25},{opacity:1,x:0,scrollTrigger:{trigger:row,start:'top 90%',end:'top 55%',scrub:.35}}));
    gsap.fromTo('.portrait-rule',{scaleX:0},{scaleX:1,scrollTrigger:{trigger:'.about-portrait',start:'top 75%',end:'center center',scrub:true}});
   }
   gsap.to('.progress-line',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});
  },root);
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.id)})},{rootMargin:'-15% 0px -60% 0px'});root.current?.querySelectorAll('main>section[id]').forEach(el=>observer.observe(el));
  const refresh=()=>ScrollTrigger.refresh();window.addEventListener('load',refresh);const timer=setTimeout(refresh,350);
  return()=>{clearTimeout(timer);window.removeEventListener('load',refresh);window.removeEventListener('portfolio:chapter',jumpChapter);observer.disconnect();responsive.revert();ctx.revert();gsap.ticker.remove(tick);lenis?.destroy()};
 },[motion]);
 useEffect(()=>{if(selected){dialog.current?.showModal();document.body.style.overflow='hidden'}return()=>{document.body.style.overflow=''}},[selected]);
 const sceneUnavailable=useCallback(()=>setMotion(false),[]);
 const toggle=()=>{setMotion(!motion);try{localStorage.setItem('cinematic-motion',motion?'off':'on')}catch{}};
 return <><Preloader onComplete={finishLoading}/><PortfolioCursor enabled={motion&&!loading}/><div ref={root} inert={loading} className={motion?'portfolio':'portfolio still'}>
  <a className="skip" href="#projects">Skip to work</a><div className="progress-line"/>
  <header className="navigation"><a className="wordmark" href="#home" aria-label="Usman Farooqi home">uf<span>®</span></a><nav aria-label="Main navigation">{[['projects','Work'],['about','About'],['experience','Experience']].map(([id,label])=><a key={id} href={'#'+id} aria-current={active===id?'location':undefined}>{label}</a>)}</nav><div className="nav-actions"><button onClick={toggle} className="motion-button" aria-pressed={!motion} aria-label={motion?'Reduce motion':'Enable cinematic motion'}><span className={motion?'status-dot':'status-dot off'}/><span>Motion {motion?'on':'off'}</span></button><a className="talk" href="#contact">Let’s talk <span><ArrowIcon/></span></a></div></header>
  <main>
   <section className="entrance" id="home"><div className="entrance-stage"><div className="scene-fallback" aria-hidden="true"><img src="/assets/portal.webp" alt=""/></div>{motion&&<Entrance onUnavailable={sceneUnavailable}/>}<div className="scene-vignette"/><div className="intro-copy"><p className="eyebrow"><span/> USMAN FAROOQI — DIGITAL EXPERIENCES</p><h1>Beyond<br/>the <em>ordinary.</em></h1><div className="intro-bottom"><p>Thoughtfully built.<br/>Carefully led.<br/>Made to move you.</p><a className="circle" href="#projects" aria-label="Explore my work"><ArrowIcon/></a></div></div><div className="person-copy"><p className="eyebrow">THE PERSON BEHIND THE PIXELS</p><h2>Ideas meet<br/><em>execution.</em></h2><p>I’m Usman. Web development lead,<br/>project manager, and your partner<br/>from first idea to final launch.</p><a href="#about">A little about me ↗</a></div><div className="entrance-footer"><span>LAHORE, PAKISTAN<br/>WORKING ACROSS BORDERS</span><a href={motion?'#inside':'#projects'}>{motion?'SCROLL TO STEP INSIDE':'EXPLORE THE WORK'} <b>↓</b></a><span>01 — THE ENTRANCE</span></div></div><div id="inside" className="inside-anchor"/></section>
   <ProcessReel motion={motion}/><section id="projects" className="work section"><div className="section-label"><span>02 / SELECTED WORK</span><span>IDEAS, OUT IN THE WORLD</span></div><ProjectTheatre motion={motion} onSelect={setSelected}/></section>
   <div className="ticker" aria-hidden="true"><div>STRATEGY ✳ DEVELOPMENT ✳ DELIVERY ✳ STRATEGY ✳ DEVELOPMENT ✳ DELIVERY ✳ </div></div>
   <section className="section about" id="about"><div className="section-label"><span>03 / THE HUMAN SIDE</span><span>CLARITY BEFORE COMPLEXITY</span></div><div className="about-grid"><div className="about-portrait reveal"><img src="/assets/usman-portrait.jpg" alt="Usman Farooqi" loading="lazy" width="700" height="900"/><div className="portrait-rule"/><span>USMAN FAROOQI / LAHORE</span><div className="portrait-index" aria-hidden="true">UF / 01</div></div><div className="about-copy reveal"><p className="eyebrow">WEB DEVELOPMENT LEAD & PROJECT MANAGER</p><h2>The vision.<br/>The details.<br/><em>The delivery.</em></h2><p>I bring people, technology and the details together. From understanding a business to coordinating its launch, I help turn a good idea into something people can use.</p><p>My work spans healthcare, travel, recruitment, automotive and digital services. I build with WordPress and modern web tools, lead development teams, and keep the full journey connected.</p><a href={site.linkedin} target="_blank" rel="noreferrer">Meet me on LinkedIn ↗</a></div></div><div className="services-layout"><div className="services-heading"><p className="eyebrow">FROM FIRST IDEA TO FINAL LAUNCH</p><h2>Consider<br/>it <em>covered.</em></h2><p>One connected approach.<br/>Every part of your digital presence.</p></div><div className="services" id="services">{services.map(s=><details open key={s.index} onToggle={()=>ScrollTrigger.refresh()}><summary><ServiceIcon index={Number(s.index)-1}/><span className="service-index">{s.index} / EXPERTISE</span><h3>{s.title}</h3><b>+</b></summary><p>{s.body}</p></details>)}</div></div></section>
   <CareerJourney motion={motion}/>
   <section className="section contact" id="contact"><div className="section-label"><span>05 / THE NEXT CHAPTER</span><span>LET’S BUILD SOMETHING THAT MATTERS</span></div><h2 className="contact-title"><span className="contact-title-mask"><span className="contact-title-line">Your next</span></span><span className="contact-title-mask"><em className="contact-title-line">great move.</em></span><a href={'mailto:'+site.email} aria-label="Email Usman"><ArrowIcon/></a></h2><div className="contact-grid"><div><p>Have a project in mind?<br/>Let’s give it a remarkable beginning.</p><a className="email" href={'mailto:'+site.email}>{site.email} ↗</a><a className="linkedin" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div><ContactForm/></div></section>
  </main><footer className="portfolio-footer"><div className="footer-invitation"><p>Good ideas deserve<br/><em>a remarkable beginning.</em></p><a href="#contact">LET’S MAKE IT HAPPEN ↗</a></div><div className="footer-base"><a href="#home" className="wordmark" aria-label="Back to entrance">uf<span>®</span></a><span>© {new Date().getFullYear()} USMAN FAROOQI</span><a href="#home">BACK TO THE ENTRANCE ↑</a></div></footer>
  <dialog ref={dialog} aria-labelledby="project-title" data-lenis-prevent onClose={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close()}}}><button className="close-dialog" aria-label="Close project" onClick={()=>dialog.current?.close()}><CloseIcon/></button>{selected&&<><img src={imageFor(selected)} alt={selected.title+' website'}/><div className="dialog-copy"><p className="eyebrow">{selected.industry}</p><h2 id="project-title">{selected.title}</h2><p>{selected.description}</p><div className="tags">{selected.tags.map(tag=><span key={tag}>{tag}</span>)}</div>{selected.url&&<a className="talk" href={selected.url} target="_blank" rel="noreferrer">Visit website ↗</a>}</div></>}</dialog>
 </div></>
}
