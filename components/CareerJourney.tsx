'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '@/lib/content';

// Earliest work first; overlapping roles keep their original date ranges.
const chapters = [experience[1], experience[3], experience[2], experience[0]];
const chapterNames = ['The foundation', 'A wider perspective', 'People & performance', 'Leading the bigger picture'];

export default function CareerJourney({ motion }: { motion: boolean }) {
 const root = useRef<HTMLElement>(null);
 const [active, setActive] = useState(0);
 useEffect(() => {
  if (!motion) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const ctx = gsap.context(() => {
   media.add('all', () => {
    const section = root.current!;
    section.classList.add('career-enhanced');
    const panels = gsap.utils.toArray<HTMLElement>('.career-panel', section);
    const timeline = gsap.timeline({ scrollTrigger: {
     trigger: section.querySelector('.career-track'), start: 'top top+=86', end: () => 'bottom top+=' + (section.querySelector<HTMLElement>('.career-stage')!.offsetHeight + 86), scrub: .8,
     onUpdate: self => {
      const index = Math.min(3, Math.round(self.progress * 3));
      setActive(previous => previous === index ? previous : index);
      panels.forEach((panel, i) => { panel.inert = i !== index; panel.setAttribute('aria-hidden', String(i !== index)); });
     }
    }});
    gsap.set(panels.slice(1), { autoAlpha: 0, z: -1500, rotationY: -45, xPercent: 65, scale: .65 });
    panels.forEach((panel, i) => {
     if (i === 0) return;
     timeline.to(panels[i - 1], { autoAlpha: 0, z: 450, rotationY: 30, xPercent: -70, scale: 1.25, duration: .75, ease: 'power2.inOut' }, i - 1)
      .to(panel, { autoAlpha: 1, z: 0, rotationY: 0, xPercent: 0, scale: 1, duration: .85, ease: 'power2.inOut' }, i - .8)
      .fromTo(panel.querySelectorAll('.career-point'), { opacity: 0, x: 35 }, { opacity: 1, x: 0, stagger: .06, duration: .25 }, i - .35);
    });
    timeline.to('.career-runway-fill', { scaleX: 1, duration: timeline.duration(), ease: 'none' }, 0);
    gsap.to('.career-light', { xPercent: 50, rotation: 30, ease: 'none', scrollTrigger: { trigger: '.career-track', start: 'top bottom', end: 'bottom top', scrub: true } });
    ScrollTrigger.refresh();
    return () => { section.classList.remove('career-enhanced'); panels.forEach(panel => { panel.inert = false; panel.removeAttribute('aria-hidden'); }); };
   });
  }, root);
  return () => { media.revert(); ctx.revert(); };
 }, [motion]);
 const jump = (index: number) => {
  const section = root.current!;
  if (section.classList.contains('career-enhanced')) {
   const track = section.querySelector<HTMLElement>('.career-track')!;
   const stage = section.querySelector<HTMLElement>('.career-stage')!;
   const top = scrollY + track.getBoundingClientRect().top - 86 + (track.offsetHeight - stage.offsetHeight) * index / 3;
   window.dispatchEvent(new CustomEvent('portfolio:chapter', { detail: top }));
  } else section.querySelectorAll('.career-panel')[index].scrollIntoView({ behavior: 'instant', block: 'start' });
 };
 return <section ref={root} id="experience" className="career-section">
  <div className="section-label"><span>04 / THE CAREER JOURNEY</span><span>EVERY CHAPTER BUILDS THE NEXT</span></div>
  <div className="career-intro"><h2>The road<br/><em>to right here.</em></h2><p>Different roles. A growing perspective.<br/>Move through the chapters of my career.</p></div>
  <div className="career-track"><div className="career-stage">
   <div className="career-light" aria-hidden="true"/>
   <div className="career-stage-top"><span>EXPERIENCE / IN FOUR CHAPTERS</span><span>SCROLL TO CONTINUE ↓</span></div>
   <div className="career-panels">{chapters.map((entry, i) => <article className="career-panel" key={entry.company}>
    <div className="career-watermark" aria-hidden="true">{entry.period.slice(0,4)}</div>
    <div className="career-narrative"><p className="eyebrow">CHAPTER 0{i + 1} — {chapterNames[i]}</p><p className="career-period">{entry.period}</p><h3>{entry.company}</h3><p className="career-role">{entry.role}</p></div>
    <div className="career-evidence"><div className="career-company-record"><span>EMPLOYMENT / 0{i+1}</span><strong>{entry.period}</strong><p>{entry.role}</p><span>RESPONSIBILITIES →</span></div><ul>{entry.points.map(point => <li key={point} className="career-point">{point}</li>)}</ul></div>
   </article>)}</div>
   <div className="career-controls"><div className="career-runway" aria-hidden="true"><span className="career-runway-fill"/></div><nav aria-label="Career chapters">{chapters.map((entry, i) => <button key={entry.company} onClick={() => jump(i)} aria-label={'Jump to ' + entry.company} aria-current={active === i ? 'step' : undefined}><span>0{i + 1}</span>{entry.company.replace(' Digital Marketing', '').replace(' Travel & Tours', '').replace(' LLC', '').replace(' USA', '')}</button>)}</nav></div>
  </div></div>
 </section>;
}
