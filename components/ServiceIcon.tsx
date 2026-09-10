const paths=[
'M4 5h24v20H4z M4 11h24 M9 8h.01 M13 8h.01 M8 16h7v5H8z M19 16h5 M19 21h5',
'M16 4a12 12 0 1 0 12 12 M16 10a6 6 0 1 0 6 6 M16 16L28 4 M22 4h6v6',
'M4 5h10v10H4z M18 5h10v6H18z M4 19h10v8H4z M18 15h10v12H18z',
'M5 5h22v9H5z M5 18h22v9H5z M9 9h.01 M9 22h.01 M17 9h6 M17 22h6',
'M16 3l3.5 9.5L29 16l-9.5 3.5L16 29l-3.5-9.5L3 16l9.5-3.5z',
'M12 5h8v5h-8z M7 8H5v21h22V8h-2 M9 17l2 2 4-4 M18 17h5 M9 24h5 M18 24h5',
'M4 5h24v22H4z M4 11h24 M8 8h.01 M12 8h.01 M11 15l-4 4 4 4 M21 15l4 4-4 4 M18 14l-4 10',
'M8 7h16a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H13l-6 4v-4a4 4 0 0 1-3-4V11a4 4 0 0 1 4-4z M16 3v4 M10 14h.01 M22 14h.01 M11 20h10'
];
export default function ServiceIcon({index}:{index:number}){return <span className="service-icon" aria-hidden="true"><span className="service-icon-base"/><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[index]}/></svg></span>}
