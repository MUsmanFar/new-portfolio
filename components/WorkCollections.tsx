'use client';
import { collections, projects, type Project } from '@/lib/content';
import ProjectTheatre from './ProjectTheatre';
import { ArrowIcon } from './UiIcons';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Stable inventories prevent scroll timelines from rebuilding on modal changes.
const groups = collections.map(collection => ({ ...collection, projects: projects.filter(project => project.category === collection.id) }));
export default function WorkCollections({motion,onSelect}:{motion:boolean;onSelect:(project:Project)=>void}) {
 return <div className="work-collections" onClick={event=>{
  const link=(event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#work-"],a[href="#creative-work"]');
  if(!link)return;
  const target=document.querySelector(link.getAttribute('href')!);
  if(!target)return;
  event.preventDefault();event.stopPropagation();
  ScrollTrigger.refresh();
  history.replaceState(null,'',link.getAttribute('href')!);
  window.dispatchEvent(new CustomEvent('portfolio:chapter',{detail:scrollY+target.getBoundingClientRect().top-90}));
 }}>
  <nav className="collection-directory" aria-label="Work categories">{groups.map((group,i)=><a key={group.id} href={'#work-'+group.id}><span>0{i+1}</span>{group.title}<small>{group.projects.length} {group.projects.length===1?'project':'projects'}</small><ArrowIcon/></a>)}<a href="#creative-work"><span>06</span>Creative Experiments<small>Visual & video content</small><ArrowIcon/></a></nav>
  {groups.map((group,i)=><section className={'work-category category-'+group.id} id={'work-'+group.id} key={group.id} aria-labelledby={'category-title-'+group.id}>
   <header className="category-header reveal"><p className="eyebrow">COLLECTION 0{i+1} / {group.projects.length} {group.projects.length===1?'PROJECT':'PROJECTS'}</p><h2 id={'category-title-'+group.id}>{group.title}</h2><p>{group.description}</p><span>{group.accent}</span></header>
   {group.projects.length>1?<ProjectTheatre projects={group.projects} collectionId={group.id} title={group.title} first={i===0} next={'#'+(groups[i+1]?'work-'+groups[i+1].id:'creative-work')} motion={motion} onSelect={onSelect}/>:group.projects.map(project=><article className="motion-feature reveal" key={project.id}><button className="motion-feature-visual" onClick={()=>onSelect(project)} aria-label={'Explore '+project.title}>{project.screenshot?<img src={project.screenshot} alt="Usman Farooqi cinematic portfolio homepage" width="1440" height="900" loading="lazy"/>:<div className="self-preview"><span>uf® / A PERSONAL EXPERIENCE</span><strong>Beyond<br/>the <em>ordinary.</em></strong><small>2D / 3D · CINEMATIC SCROLLING</small></div>}</button><div><p className="eyebrow">SELF-PROJECT / {project.platform}</p><h3>{project.title}</h3><p>{project.description}</p><p className="feature-role">My role: {project.role}</p><button className="collection-open" onClick={()=>onSelect(project)}>Explore project <ArrowIcon/></button></div></article>)}
  </section>)}
  <section className="creative-showcase" id="creative-work" aria-labelledby="creative-title"><header className="category-header reveal"><p className="eyebrow">COLLECTION 06 / CREATIVE WORK</p><h2 id="creative-title">Creative Experiments</h2><p>Visual ideas for brands, campaigns and stories.</p></header><div className="creative-grid">{[
   {title:'Graphic Design',label:'VISUAL COMMUNICATION',body:'Digital advertising graphics, promotional visuals and creative marketing assets.',shape:'graphic'},
   {title:'UGC-Style Content',label:'CONTENT WITH A HUMAN FEEL',body:'Advertising concepts and promotional content shaped for social audiences.',shape:'ugc'},
   {title:'AI Video Generation',label:'STORIES IN MOTION',body:'AI-generated scenes, animated storytelling and marketing-focused video creatives.',shape:'video'}
  ].map((item,i)=><article className={'creative-card reveal creative-'+item.shape} key={item.title}><div className="creative-art" aria-hidden="true"><span/><span/><span/><b>0{i+1}</b></div><p className="eyebrow">{item.label}</p><h3>{item.title}</h3><p>{item.body}</p><a href="#contact">Discuss a creative brief <ArrowIcon/></a></article>)}</div></section>
 </div>;
}
