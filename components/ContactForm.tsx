'use client';
import {ArrowIcon,CloseIcon} from './UiIcons';
import {useRef,useState} from 'react';
import SelectMenu from './SelectMenu';
import {submitContact,type ContactDetails} from '@/lib/contact';
export default function ContactForm(){
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const busy=useRef(false);
 return <form className="contact-panel" aria-busy={status==='sending'} onSubmit={async event=>{
  event.preventDefault();if(busy.current)return;
  const form=event.currentTarget,data=new FormData(form);
  if(data.get('website'))return;
  const details=Object.fromEntries(['name','email','growth_call','timeline','message'].map(key=>[key,String(data.get(key)||'').trim()])) as ContactDetails;
  if(Object.values(details).some(value=>!value)){setStatus('error');return}
  busy.current=true;setStatus('sending');
  try{await submitContact(details);form.reset();setStatus('success')}catch{setStatus('error')}finally{busy.current=false}
 }}>
  <div className="contact-form-heading"><span>YOUR NEXT CHAPTER</span><h3>Tell me about<br/><em>your idea.</em></h3></div>
  <fieldset disabled={status==='sending'}><div className="contact-fields"><div><label htmlFor="contact-name">Full name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="Your full name"/></div><div><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com"/></div></div>
  <label htmlFor="growth-call">Growth call</label><SelectMenu id="growth-call" name="growth_call" label="Growth call" required placeholder="What would you like to discuss?" options={['Build a new website','Redesign an existing website','Launch an online store','Website management & support','Explore an idea together'].map(value=>({value,label:value}))}/>
  <label htmlFor="project-timeline">Project timeline</label><SelectMenu id="project-timeline" name="timeline" label="Project timeline" required placeholder="When would you like to get started?" options={['As soon as possible','Within 2–4 weeks','Within 1–3 months','Flexible / still planning'].map(value=>({value,label:value}))}/>
  <label htmlFor="project-message">Project parameters & message</label><textarea id="project-message" name="message" required minLength={10} maxLength={5000} rows={4} placeholder="Tell me about your business, goals, scope and anything else I should know."/>
  <div className="contact-trap" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></div>
  <button type="submit" disabled={status==='sending'}>{status==='sending'?'Sending your message…':'Send project enquiry'}<span aria-hidden="true"><ArrowIcon/></span></button>
  </fieldset><p role="status" aria-live="polite" className={'form-note form-'+status}>{status==='success'?'Thank you — your enquiry has been sent. I’ll be in touch by email.':status==='error'?'Unable to confirm delivery. Please check your fields and connection, or use the email link beside this form.':status==='sending'?'Please wait while your enquiry is sent.':'Your details will only be used to respond to your enquiry.'}</p>
 </form>
}
