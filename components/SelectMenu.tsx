'use client';
import {useEffect,useRef,useState} from 'react';
type Option={value:string;label:string};
export default function SelectMenu({id,name,label,placeholder,options,value,onChange,required=false,up=false}:{id:string;name?:string;label:string;placeholder?:string;options:Option[];value?:string;onChange?:(value:string)=>void;required?:boolean;up?:boolean}){
 const root=useRef<HTMLDivElement>(null),button=useRef<HTMLButtonElement>(null);
 const [local,setLocal]=useState(''),[open,setOpen]=useState(false),[invalid,setInvalid]=useState(false),[focus,setFocus]=useState(0);
 const current=value??local;
 useEffect(()=>{const close=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false)};const form=root.current?.closest('form');const reset=()=>{setLocal('');setInvalid(false);setOpen(false)};document.addEventListener('pointerdown',close);form?.addEventListener('reset',reset);return()=>{document.removeEventListener('pointerdown',close);form?.removeEventListener('reset',reset)}},[]);
 useEffect(()=>{if(open)root.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')[focus]?.focus()},[open,focus]);
 const choose=(v:string)=>{setLocal(v);onChange?.(v);setInvalid(false);setOpen(false);button.current?.focus()};
 return <div ref={root} className={'select-menu'+(up?' select-up':'')+(open?' is-open':'')} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false)}}>
  <select className="select-native" name={name} required={required} value={current} tabIndex={-1} aria-hidden="true" onChange={()=>{}} onInvalid={e=>{e.preventDefault();setInvalid(true);button.current?.focus()}}><option value=""/>{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>
  <button ref={button} id={id} type="button" className="select-trigger" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={id+'-options'} aria-invalid={invalid||undefined} onClick={()=>{setFocus(Math.max(0,options.findIndex(o=>o.value===current)));setOpen(!open)}} onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setFocus(Math.max(0,options.findIndex(o=>o.value===current)));setOpen(true)}}}><span>{options.find(o=>o.value===current)?.label??placeholder??label}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg></button>
  {open&&<div id={id+'-options'} className="select-options" role="listbox" aria-label={label} data-lenis-prevent onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();setOpen(false);button.current?.focus()}else if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();setFocus(n=>e.key==='Home'?0:e.key==='End'?options.length-1:(n+(e.key==='ArrowDown'?1:-1)+options.length)%options.length)}else if(e.key.length===1&&e.key!==' '){const i=options.findIndex(o=>o.label.toLowerCase().startsWith(e.key.toLowerCase()));if(i>=0)setFocus(i)}}}>{options.map((o,i)=><button key={o.value} type="button" role="option" aria-selected={current===o.value} tabIndex={i===focus?0:-1} onClick={()=>choose(o.value)}><span>{o.label}</span>{current===o.value&&<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>}</button>)}</div>}
  {invalid&&<span className="select-error">Please choose an option.</span>}
 </div>
}
