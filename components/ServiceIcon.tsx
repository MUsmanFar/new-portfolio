const paths=[
'M4 5h24v20H4z M4 11h24 M9 8h.01 M13 8h.01 M8 16h7v5H8z M19 16h5 M19 21h5',
'M6 10h20l2 18H4z M11 11V8a5 5 0 0 1 10 0v3 M12 18h8 M16 14v8',
'M4 5h24v22H4z M4 11h24 M8 8h.01 M12 8h.01 M11 15l-4 4 4 4 M21 15l4 4-4 4 M18 14l-4 10',
'M16 4v24 M4 16h24 M22 6c-6-4-12-2-14 4s0 12 6 14 12 0 14-6-2-12-8-14 M9 9l14 14',
'M12 5h8v5h-8z M7 8H5v21h22V8h-2 M9 17l2 2 4-4 M18 17h5 M9 24h5 M18 24h5',
'M5 26l3-9L22 3l7 7-14 14z M8 17l7 7 M19 6l7 7 M5 26l8-2',
'M4 7h18v18H4z M22 13l7-5v16l-7-5 M10 12l7 4-7 4z',
'M8 7h16a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H13l-6 4v-4a4 4 0 0 1-3-4V11a4 4 0 0 1 4-4z M16 3v4 M10 14h.01 M22 14h.01 M11 20h10'
];
export default function ServiceIcon({index}:{index:number}){return <span className="service-icon" aria-hidden="true"><span className="service-icon-base"/><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[index]}/></svg></span>}
