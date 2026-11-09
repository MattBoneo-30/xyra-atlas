/** Atlas local SVG icon painter, extracted from the app to keep page rendering lean.
 * Inline paths only; no external fonts, tracking, storage or event handling.
 */
export function icon(name,size=20) {
  const p = {
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.2 4.2"/>',
    arrow:'<path d="m9 18 6-6-6-6"/>', back:'<path d="m15 18-6-6 6-6"/>',
    down:'<path d="m6 9 6 6 6-6"/>',
    home:'<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.7 5.1-5.3 2.9 2.7-5.3z"/>',
    chart:'<path d="M4 20V4M4 20h16M8 16v-4M13 16V8M18 16V5"/>',
    bookmark:'<path d="M6 4h12v17l-6-4-6 4z"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 5-7 8-7s7 2 8 7"/>',
    bell:'<path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5z"/><path d="M10 20h4"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    moon:'<path d="M20 15a8 8 0 0 1-11-11 8 8 0 1 0 11 11"/>',
    spark:'<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>',
    flame:'<path d="M12 22c5 0 8-3.5 8-8 0-3-1.6-6.1-5-9-.2 3-1.9 4.3-3 5-1-4-3.1-6-4-7C8 8 4 10 4 15c0 4 3 7 8 7Z"/>',
    brain:'<path d="M12 7a4 4 0 0 0-7-2c-3 1-3 5-1 7-2 3 0 6 3 6 0 3 5 4 5 0V7zm0 0a4 4 0 0 1 7-2c3 1 3 5 1 7 2 3 0 6-3 6 0 3-5 4-5 0V7zM8 9c3 0 4 2 4 4m4-4c-3 0-4 2-4 4"/>',
    scale:'<path d="M12 3v18M4 7h16M6 7l-4 8c2 2 6 2 8 0L6 7Zm12 0-4 8c2 2 6 2 8 0l-4-8ZM7 21h10"/>',
    briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V4h6v3M3 12c6 4 12 4 18 0M12 12v4"/>',
    wallet:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9h18M15 15h6M17 15h.1"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
    languages:'<path d="M4 5h13M11 3v3M6 9c2 5 6 8 11 10M15 9c-1 3-6 8-11 11M15 19l3-9 3 9m-5-3h4"/>',
    message:'<path d="M4 5h16v12H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
    shield:'<path d="M12 2 20 5v6c0 6-4 9-8 11-4-2-8-5-8-11V5z"/><path d="m8 12 3 3 5-6"/>',
    heart:'<path d="M20.8 8.2c0 5-8.8 11.2-8.8 11.2S3.2 13.2 3.2 8.2a4.8 4.8 0 0 1 8.8-2.4 4.8 4.8 0 0 1 8.8 2.4Z"/>',
    rocket:'<path d="M6 14c-2-6 6-12 14-12 0 8-6 16-12 14l-2-2Zm4-1 1 1M5 19l-2 2m3-2 2-2M9 6 6 4 4 6v3M15 15l3 3v3h-3"/>',
    orbit:'<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-35 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(35 12 12)"/>',
    check:'<path d="m5 12 5 5 9-10"/>', close:'<path d="M5 5 19 19M19 5 5 19"/>',
    play:'<path d="m8 5 11 7-11 7z"/>',
    book:'<path d="M12 6c-3-2-6-2-10-1v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1Zm0 0v14"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    download:'<path d="M12 3v13m-5-5 5 5 5-5M4 18v3h16v-3"/>',
    upload:'<path d="M12 17V4m-5 5 5-5 5 5M4 17v4h16v-4"/>',
    trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6m4-6v6"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10v.2"/>',
    wifi:'<path d="M2 8c6-5 14-5 20 0M5 12c4-4 10-4 14 0m-11 4c3-3 5-3 8 0M12 20h.1"/>',
    'wifi-off':'<path d="m2 2 20 20M2 8c2-2 5-3 7-3m4 0c3 0 6 1 9 3M6 12c2-1 4-2 6-2m5 2 2 0m-11 4c2-2 4-2 5-2M12 20h.1"/>',
    alert:'<path d="m12 2 10 19H2zM12 8v5m0 4v.2"/>',
    external:'<path d="M14 4h6v6m0-6-9 9M20 14v6H4V4h6"/>',
    dots:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
  };
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${p[name] || p.spark}</svg>`;
}
