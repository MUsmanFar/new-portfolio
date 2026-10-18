export type CompanionMood='happy'|'curious'|'thinking'|'concerned'|'celebrate';
export function tellCompanion(message:string,mood:CompanionMood='happy'){
 window.dispatchEvent(new CustomEvent('portfolio:companion',{detail:{message,mood}}));
}
