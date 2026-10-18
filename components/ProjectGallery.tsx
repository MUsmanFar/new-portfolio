'use client';
import {useEffect,useRef,useState} from 'react';
import type {Project} from '@/lib/content';
import {ArrowIcon} from './UiIcons';
import {AppPreview} from './AppScreens';

export default function ProjectGallery({projects,collectionId,onSelect,motion}:{projects:Project[];collectionId:string;onSelect:(project:Project)=>void;motion:boolean}){
 const root=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const cards=Array.from(root.current?.querySelectorAll<HTMLElement>('.exhibit-card')||[]);
  let frame=0,visible=false;
  const update=()=>{frame=0;if(!visible)return;const line=innerHeight*.46;let index=0;cards.forEach((card,i)=>{if(card.getBoundingClientRect().top<=line)index=i});setActive(index)};
  const schedule=()=>{if(visible&&!frame)frame=requestAnimationFrame(update)};
  const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule()});
  if(root.current)visibility.observe(root.current);
  const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-in-view');reveal.unobserve(entry.target)}})},{threshold:.08});
  cards.forEach(card=>reveal.observe(card));
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  return()=>{visibility.disconnect();reveal.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
 },[]);
 return <div ref={root} className={'project-exhibition'+(motion?' exhibition-motion':'')}>
  <aside className="exhibit-index"><span className="eyebrow">IN THIS COLLECTION</span><div className="exhibit-count"><strong>{String(active+1).padStart(2,'0')}</strong><span>/ {String(projects.length).padStart(2,'0')}</span></div><nav aria-label={collectionId+' project index'}>{projects.map((project,i)=><a href={'#exhibit-'+project.id} key={project.id} aria-current={i===active?'location':undefined}><span>{String(i+1).padStart(2,'0')}</span>{project.title}<span aria-hidden="true">↗</span></a>)}</nav><p>A closer look at the work.<br/>Open a project for the full story.</p></aside>
  <div className="exhibit-grid">{projects.map((project,i)=><article id={'exhibit-'+project.id} data-index={i} key={project.id} className={'exhibit-card'+(i===0?' exhibit-featured':'')}>
   <button className="exhibit-image" onClick={()=>onSelect(project)} aria-label={'View '+project.title+' project details'}><span className="exhibit-browser" aria-hidden="true"><span>● ● ●</span><span>{project.appScreens?'MOBILE APP / '+project.platform:project.url?new URL(project.url).hostname:'PROJECT PREVIEW'}</span><ArrowIcon/></span>{project.appScreens?<AppPreview screens={project.appScreens}/>:project.screenshot?<img src={project.screenshot} alt={project.title+' project preview'} width="1440" height="900" loading="lazy" decoding="async"/>:<span className="exhibit-placeholder"><span>uf®</span>{project.title}<small>Discover the story behind this project</small></span>}<span className="exhibit-view">View the project <ArrowIcon/></span></button>
   <div className="exhibit-copy"><p className="eyebrow">{String(i+1).padStart(2,'0')} / {project.industry}</p><button className="exhibit-title" onClick={()=>onSelect(project)}><h3>{project.title}</h3><ArrowIcon/></button><p>{project.description}</p>{project.previewLabel&&<small className="exhibit-caption">{project.previewLabel}</small>}<div className="exhibit-tags">{project.tags.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div></div>
  </article>)}</div>
 </div>;
}
