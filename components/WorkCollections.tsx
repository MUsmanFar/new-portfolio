'use client';
import { collections, projects, type Project } from '@/lib/content';
import ProjectTheatre from './ProjectTheatre';
import { ArrowIcon } from './UiIcons';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Stable inventories prevent scroll timelines from rebuilding on modal changes.
const groups = collections.map(collection => ({ ...collection, projects: projects.filter(project => project.category === collection.id) }));
const chapterIcons=['M8 10l-5 6 5 6 M24 10l5 6-5 6 M19 6l-6 20','M5 6h22v20H5z M5 12h22 M10 9h.01 M14 9h.01 M10 17h12 M10 21h8','M7 11h18l2 16H5z M11 12V9a5 5 0 0 1 10 0v3','M5 8h8v7H5z M19 18h8v7h-8z M13 11h10v7 M9 15v7h10','M8 5h19v22H8z M4 9v14 M13 10h9 M13 15h6 M13 20h9','M6 25l2-8L22 3l7 7-14 14z M8 17l7 7 M19 6l7 7'];
const chapterLabels=['CUSTOM BUILDS','CONTENT & COMMERCE','SHOPPING EXPERIENCES','TEAM & DELIVERY','INTERACTIVE STORIES','VISUAL EXPLORATIONS'];
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
  <div className="directory-intro"><div><p className="eyebrow">THE COLLECTION INDEX</p><h3>Choose a <em>chapter.</em></h3></div><p>Different disciplines.<br/>One connected approach.<span>{projects.length} projects · 6 chapters</span></p></div>
  <nav className="collection-directory" aria-label="Work categories">{[...groups.map(group=>({id:group.id,title:group.title,href:'#work-'+group.id,count:group.projects.length+' projects',subtitle:group.accent})),{id:'creative',title:'Creative Experiments',href:'#creative-work',count:'Design · UGC · Video',subtitle:'Ideas beyond the browser.'}].map((chapter,i)=><a key={chapter.id} href={chapter.href} className={'directory-card directory-'+chapter.id}><span className="directory-card-top"><span className="chapter-number">CHAPTER 0{i+1}</span><span className="chapter-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={chapterIcons[i]}/></svg></span></span><span className="chapter-label">{chapterLabels[i]}</span><span className="chapter-title">{chapter.title}</span><span className="chapter-description">{chapter.subtitle}</span><span className="chapter-footer"><span>{chapter.count}</span><span className="chapter-arrow" aria-hidden="true"><ArrowIcon/></span></span></a>)}</nav>
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
