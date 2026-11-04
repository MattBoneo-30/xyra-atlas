/** Generated offline cinematic stage art, 14 subjects and three difficulty levels. */
import {STAGE_ART} from '../stageart.js';
const MOTIFS={
  "mind": "<path d=\"M-22 -114C-93-118-126-46-100 17c11 28 34 42 38 71l72 0c-13-34-6-55 22-76 46-36 32-100-17-119-12-5-24-9-37-7Z\" fill=\"url(#glass)\" stroke=\"#f8ddad\" stroke-width=\"5\"/><path d=\"M-69-38q46-65 93-3M-70 3q27-30 59-2M-46 43q29-20 47-3\" fill=\"none\" stroke=\"#efc9eb\" stroke-width=\"5\" stroke-linecap=\"round\"/><g stroke=\"#ffdb99\" stroke-width=\"3\" fill=\"#f7b8d7\"><circle cx=\"66\" cy=\"-78\" r=\"13\"/><circle cx=\"99\" cy=\"-43\" r=\"8\"/><circle cx=\"72\" cy=\"16\" r=\"11\"/><path d=\"M40-78h20M70-64l21 18M79-32V3\" fill=\"none\"/></g>",
  "law": "<path d=\"M-135-95 0-153 135-95-135-95Z\" fill=\"url(#foil)\" opacity=\".95\"/><path d=\"M-130-84h260M-117 100h234M-140 120h280\" stroke=\"#ffe4b3\" stroke-width=\"12\"/><g fill=\"url(#glass)\" stroke=\"#d8acdc\" stroke-width=\"5\"><rect x=\"-100\" y=\"-68\" width=\"25\" height=\"158\" rx=\"5\"/><rect x=\"-44\" y=\"-68\" width=\"25\" height=\"158\" rx=\"5\"/><rect x=\"18\" y=\"-68\" width=\"25\" height=\"158\" rx=\"5\"/><rect x=\"75\" y=\"-68\" width=\"25\" height=\"158\" rx=\"5\"/></g><path d=\"M0-63v115M-77-20H77\" stroke=\"#ffdb9c\" stroke-width=\"7\"/><path d=\"M-77-20-109 37h65L-77-20ZM77-20 44 37h66L77-20Z\" stroke=\"#ffe8c5\" stroke-width=\"4\" fill=\"#e6c3e1\" fill-opacity=\".26\"/>",
  "business": "<path d=\"M-118 109V-83l108-50 123 52v191Z\" fill=\"url(#glass)\" stroke=\"#ffe0ad\" stroke-width=\"7\"/><path d=\"M-105-74h208M-84-104v193M-14-102v193M59-102v193\" stroke=\"#e8bcd7\" stroke-width=\"4\" opacity=\".8\"/><path d=\"M-125 110h257M-72 70l42-34 31 10 53-71 42-17\" fill=\"none\" stroke=\"#ffdf9a\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M66-52h40v39\" fill=\"none\" stroke=\"#ffdf9a\" stroke-width=\"8\"/><circle cx=\"-67\" cy=\"70\" r=\"8\" fill=\"#fff3d5\"/>",
  "savings": "<path d=\"M-69-120h134l-9 27H-58Z\" fill=\"url(#foil)\" stroke=\"#ffe7bc\" stroke-width=\"4\"/><path d=\"M-79-87h158l18 55-5 131q-3 21-24 21H-65q-25 0-27-24l-7-126Z\" fill=\"url(#glass)\" stroke=\"#ffe3b1\" stroke-width=\"7\"/><g fill=\"#ffca76\" stroke=\"#fff0c7\" stroke-width=\"3\"><circle cx=\"-39\" cy=\"52\" r=\"25\"/><circle cx=\"0\" cy=\"64\" r=\"25\"/><circle cx=\"42\" cy=\"53\" r=\"25\"/><circle cx=\"-15\" cy=\"15\" r=\"24\"/><circle cx=\"31\" cy=\"8\" r=\"25\"/></g><path d=\"M0-66v28M-21-48q20-24 42 0\" stroke=\"#fff3d4\" stroke-width=\"4\" fill=\"none\"/>",
  "time": "<circle r=\"137\" fill=\"url(#glass)\" stroke=\"#f7d7a0\" stroke-width=\"11\"/><circle r=\"113\" fill=\"none\" stroke=\"#ddb8e6\" stroke-width=\"5\"/><circle r=\"86\" fill=\"none\" stroke=\"#ffedc6\" stroke-width=\"2\" opacity=\".8\"/><g stroke=\"#ffdbab\" stroke-width=\"6\"><path d=\"M0-118v21M118 0H97M0 118V97M-118 0h21\"/></g><path d=\"M0 0v-69M0 0l54 29\" stroke=\"#fff3d4\" stroke-width=\"10\" stroke-linecap=\"round\"/><circle r=\"13\" fill=\"#fff2db\"/><circle cx=\"100\" cy=\"-102\" r=\"28\" fill=\"url(#foil)\" stroke=\"#fff2d6\" stroke-width=\"4\"/>",
  "language": "<path d=\"M-117-99q53-29 117 1 65-30 118-1V88Q57 64 0 95q-58-29-117-7Z\" fill=\"url(#glass)\" stroke=\"#ffe4b1\" stroke-width=\"7\"/><path d=\"M0-97V95M-84-56q39-10 61 3M-82-29q38-8 61 7M21-56q44-10 62 1M22-27q38-9 59 6\" stroke=\"#e5bfe6\" stroke-width=\"5\" fill=\"none\"/><path d=\"M-61 132h123M-70-145c-26-41 40-58 49-13M50-146c42-43 95-13 67 25\" fill=\"none\" stroke=\"#ffdba4\" stroke-width=\"7\"/>",
  "communication": "<path d=\"M-125 71q58-113 125-112t125 112\" fill=\"none\" stroke=\"#ffe5b9\" stroke-width=\"18\"/><path d=\"M-136 81h272\" stroke=\"#deaeec\" stroke-width=\"7\"/><g fill=\"url(#foil)\" stroke=\"#fff1d3\" stroke-width=\"4\"><path d=\"M-105-90h78v53h-38l-27 24 1-24h-14Z\"/><path d=\"M25-148h85v60H65l-20 23 2-23H25Z\"/></g><path d=\"M-91-73h49M42-126h53M43-110h44\" stroke=\"#5b397c\" stroke-width=\"5\"/>",
  "thinking": "<path d=\"M-30-136 107 88H-150Z\" fill=\"url(#glass)\" stroke=\"#fff2cd\" stroke-width=\"9\"/><path d=\"M-144 3H-22L105 88\" stroke=\"#eabbe9\" stroke-width=\"8\" fill=\"none\"/><path d=\"M-150 8h-95M78 50l92-37M88 78l112 19M-8-110l-40-64\" stroke=\"#f5b8c9\" stroke-width=\"7\" fill=\"none\"/><path d=\"M-35-126 39-4l-160 74\" stroke=\"#ffe0a8\" stroke-width=\"3\" fill=\"none\"/>",
  "digital": "<path d=\"M0-146 112-97v88q0 92-112 148Q-113 83-113-9v-88Z\" fill=\"url(#glass)\" stroke=\"#ffdeab\" stroke-width=\"9\"/><path d=\"M-47-9v-28a47 47 0 0 1 94 0v28\" fill=\"none\" stroke=\"#f4b7d7\" stroke-width=\"12\"/><rect x=\"-69\" y=\"-14\" width=\"138\" height=\"105\" rx=\"16\" fill=\"url(#foil)\" stroke=\"#fff3ce\" stroke-width=\"5\"/><circle cx=\"0\" cy=\"34\" r=\"14\" fill=\"#70467f\"/><path d=\"M0 48v22\" stroke=\"#70467f\" stroke-width=\"10\"/><g stroke=\"#e5bfe4\" stroke-width=\"4\"><path d=\"M-132-40h-32m32 28h-55m319-18h44m-44 30h62\"/></g>",
  "career": "<rect x=\"-133\" y=\"-121\" width=\"266\" height=\"180\" rx=\"17\" fill=\"url(#glass)\" stroke=\"#ffe4ae\" stroke-width=\"8\"/><rect x=\"-105\" y=\"-90\" width=\"210\" height=\"116\" rx=\"5\" fill=\"#261f4f\" stroke=\"#d3b1de\" stroke-width=\"3\"/><path d=\"M-79-56h91M-79-30h120M-79-4h58M23-54l22 20 28-32\" stroke=\"#ffdb98\" stroke-width=\"7\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M0 59v30M-75 97h150\" stroke=\"#f6cfa6\" stroke-width=\"11\"/><path d=\"M-76 133h151\" stroke=\"#fff0cf\" stroke-width=\"5\"/>",
  "science": "<path d=\"M-128 70q0-100 128-100 128 0 128 100Z\" fill=\"url(#glass)\" stroke=\"#f3dba9\" stroke-width=\"9\"/><path d=\"M-156 76h312M0-30V-94\" stroke=\"#ffe5b5\" stroke-width=\"8\"/><path d=\"m-27-122 50-36 81 88-47 37Z\" fill=\"url(#foil)\" stroke=\"#ffecca\" stroke-width=\"5\"/><path d=\"M25-85 4 17M6 17-52 107M5 17 69 114M-77 111H86\" stroke=\"#ffe5b4\" stroke-width=\"8\" fill=\"none\"/><circle cx=\"117\" cy=\"-118\" r=\"25\" fill=\"#ffd1ae\" opacity=\".85\"/>",
  "relationship": "<path d=\"M-89 123q-25-150 88-235Q109-27 88 123\" fill=\"none\" stroke=\"#ffdca5\" stroke-width=\"13\"/><path d=\"M-91 113q35-75 94-48 52-27 92 48\" fill=\"none\" stroke=\"#e7b5d5\" stroke-width=\"8\"/><g stroke=\"#f9e6c5\" stroke-width=\"6\" fill=\"url(#foil)\"><path d=\"M-55-30c-22-31-53 11-17 40 7 5 15 12 17 17 16-23 53-39 24-63-13-11-25-5-24 6Z\"/><path d=\"M53-30c-18-32-56-7-31 24 9 12 23 20 31 33 12-16 48-35 29-58-9-11-24-12-29 1Z\"/></g><path d=\"M-5 36v91\" stroke=\"#fff0d0\" stroke-width=\"4\"/>",
  "negotiation": "<path d=\"M0-125V112M-110-86h220M-119-81-156 17h74Z M116-81 79 17h74Z\" fill=\"none\" stroke=\"#ffe1af\" stroke-width=\"9\" stroke-linejoin=\"round\"/><path d=\"M-156 17q37 39 74 0M79 17q37 39 74 0\" stroke=\"#f8dbaa\" stroke-width=\"7\" fill=\"none\"/><path d=\"M-74 113h149M-32 92H32\" stroke=\"#ffe8bc\" stroke-width=\"13\"/><g fill=\"url(#glass)\" stroke=\"#f7cbdf\" stroke-width=\"4\"><rect x=\"-133\" y=\"-157\" width=\"58\" height=\"46\" rx=\"5\"/><rect x=\"75\" y=\"-157\" width=\"58\" height=\"46\" rx=\"5\"/></g>",
  "shadow": "<path d=\"M-70-91h140l-15 33-1 158h-110l-2-158Z\" fill=\"url(#glass)\" stroke=\"#fbe1ad\" stroke-width=\"9\"/><path d=\"M-72-91q-8-64 72-64 80 0 72 64\" fill=\"none\" stroke=\"#ffe7bc\" stroke-width=\"9\"/><path d=\"M-88 106h176M-100 126h200\" stroke=\"#ffe3b0\" stroke-width=\"10\"/><path d=\"M0-32c30 46 35 76 0 106-42-20-27-65 0-106Z\" fill=\"url(#foil)\" stroke=\"#fff6d1\" stroke-width=\"6\"/><circle cx=\"0\" cy=\"20\" r=\"70\" fill=\"#ffc785\" opacity=\".16\"/><path d=\"M-164 102v-91M164 102v-91M-164 9h45M119 9h45\" stroke=\"#d8b6e4\" stroke-width=\"8\"/>"
};
const PALETTES={
  "dawn": {
    "sky": "#151b42",
    "mid": "#6d4c7b",
    "horizon": "#e4a58f",
    "mountain": "#3d335f",
    "fore": "#262343",
    "glow": "#ffdca2"
  },
  "dusk": {
    "sky": "#0e1437",
    "mid": "#423c77",
    "horizon": "#9b6faf",
    "mountain": "#303467",
    "fore": "#1a2247",
    "glow": "#f9ce9d"
  },
  "night": {
    "sky": "#0a102c",
    "mid": "#282c60",
    "horizon": "#644f90",
    "mountain": "#24284c",
    "fore": "#141731",
    "glow": "#dac0ff"
  }
};
function renderStageArtwork(scene){
 if(!scene||!Object.hasOwn(MOTIFS,scene.motif)||!Object.hasOwn(PALETTES,scene.tone))throw Error("Unknown stage artwork descriptor");
 const p=PALETTES[scene.tone];
 const escape=s=>String(s).replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;");
 let seed=[...scene.courseId+scene.stage].reduce((n,c)=>(Math.imul(n,33)^c.codePointAt(0))>>>0,0x91c2a5);
 const rand=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
 const stars=Array.from({length:56},()=>{
  const x=(35+rand()*1330).toFixed(1),y=(20+rand()*374).toFixed(1),r=(.8+rand()*2.4).toFixed(2);
  return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" opacity="'+(.18+rand()*.65).toFixed(2)+'"/>';
 }).join("");
 const fireflies=Array.from({length:13},()=>{
  const x=110+rand()*1190,y=290+rand()*270;
  return '<ellipse cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" rx="'+(4+rand()*6).toFixed(0)+'" ry="'+(2+rand()*4).toFixed(0)+'" fill="#ffe9ad" opacity="'+(.15+rand()*.3).toFixed(2)+'"/>';
 }).join("");
 const clouds=Array.from({length:11},(_,i)=>{
  const x=-110+i*150+(rand()-.5)*95,y=50+rand()*300,rx=100+rand()*150;
  return '<ellipse cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" rx="'+rx.toFixed(0)+'" ry="'+(23+rand()*41).toFixed(0)+'" fill="'+(i%2?'#e8acd3':'#ccc0ef')+'" opacity=".06"/>';
 }).join("");
 const brush=Array.from({length:16},()=>{
  const x=rand()*1400,y=300+rand()*400,dr=35+rand()*150;
  return '<path d="M'+x.toFixed(0)+' '+y.toFixed(0)+'q'+dr.toFixed(0)+' '+(-dr/4).toFixed(0)+' '+(dr*2).toFixed(0)+' '+(-dr/7).toFixed(0)+'" stroke="'+(rand()>.5?'#f1d2dc':'#b7b3ee')+'" stroke-width="'+(4+rand()*16).toFixed(0)+'" fill="none" opacity=".07" stroke-linecap="round"/>';
 }).join("");
 const svg=[
 '<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="700" viewBox="0 0 1400 700" role="img" aria-label="'+escape(scene.alt)+'">',
 '<defs><linearGradient id="sky" x2=".16" y2="1"><stop stop-color="'+p.sky+'"/><stop offset=".55" stop-color="'+p.mid+'"/><stop offset="1" stop-color="'+p.horizon+'"/></linearGradient>',
 '<radialGradient id="aura"><stop stop-color="'+p.glow+'" stop-opacity=".78"/><stop offset=".3" stop-color="'+p.glow+'" stop-opacity=".23"/><stop offset="1" stop-color="'+p.glow+'" stop-opacity="0"/></radialGradient>',
 '<linearGradient id="water" x2="0" y2="1"><stop stop-color="'+p.mid+'"/><stop offset="1" stop-color="#11172f"/></linearGradient>',
 '<linearGradient id="foil" x2=".17" y2=".98"><stop stop-color="#fff2d3"/><stop offset=".45" stop-color="#f2c785"/><stop offset="1" stop-color="#b87879"/></linearGradient>',
 '<linearGradient id="glass" x2="1" y2=".8"><stop stop-color="#7e5fa4" stop-opacity=".91"/><stop offset=".5" stop-color="#543e84" stop-opacity=".66"/><stop offset="1" stop-color="#242c59" stop-opacity=".84"/></linearGradient>',
 '<radialGradient id="mist"><stop stop-color="#d2b2f5" stop-opacity=".24"/><stop offset="1" stop-color="#d2b2f5" stop-opacity="0"/></radialGradient>',
 '<filter id="haze"><feGaussianBlur stdDeviation="22"/></filter></defs>',
 '<rect width="1400" height="700" fill="url(#sky)"/>',
 '<g fill="#ffeed1">'+stars+'</g>',
 '<circle cx="1060" cy="158" r="242" fill="url(#aura)"/><circle cx="1053" cy="154" r="55" fill="#f9d9bf" opacity=".75"/>',
 '<ellipse cx="495" cy="213" rx="540" ry="320" fill="url(#mist)"/>',
 '<g>'+clouds+'</g>',
 '<path d="M0 431 130 346 229 385 355 262 475 364 595 304 720 393 864 284 989 352 1128 262 1250 360 1400 282v418H0Z" fill="'+p.mountain+'" opacity=".58"/>',
 '<path d="M0 493 120 442 226 487 336 389 460 456 598 411 743 477 888 413 996 471 1118 391 1248 466 1400 401v299H0Z" fill="'+p.fore+'" opacity=".89"/>',
 '<rect y="510" width="1400" height="190" fill="url(#water)" opacity=".93"/>',
 '<path d="M0 514Q330 485 696 514T1400 514M-20 567q350-24 720 4t722-3M-50 626q391-28 752 0t749-1" fill="none" stroke="#ead4ee" stroke-width="3" opacity=".24"/>',
 '<g stroke="'+p.glow+'" fill="none" stroke-width="2" opacity=".22"><path d="M40 581h264M338 618h314M783 567h194M1079 607h250"/><path d="M83 595h116M412 638h103M900 584h192"/></g>',
 // Celestial cathedral silhouette sits entirely behind the subject.
 '<g opacity=".61"><path d="M742 516V330q0-212 213-213 211 0 211 213v186" fill="#161630" stroke="#d7a7c4" stroke-width="13"/><path d="M765 517V331q0-187 190-187 189 0 189 187v186" fill="none" stroke="#efcba7" stroke-width="3"/><path d="M824 500V338q0-133 131-133 133 0 133 133v162" fill="#534275" fill-opacity=".6" stroke="#c4add8" stroke-width="5"/></g>',
 '<path d="M674 516h589M731 527h483" stroke="#c8a4d9" stroke-width="12" opacity=".6"/>',
 '<g fill="url(#aura)"><ellipse cx="946" cy="352" rx="315" ry="279"/></g>',
 '<g transform="translate(951 354) scale(.86)" stroke-linecap="round" stroke-linejoin="round">'+MOTIFS[scene.motif]+'</g>',
 '<path d="M683 535h568M714 554h514" stroke="#f2c898" stroke-width="5" opacity=".61"/>',
 '<g fill="#cba6df" opacity=".42"><path d="M722 540l34 56h390l45-56Z"/><path d="M775 602l-36 44h430l-24-44Z"/></g>',
 '<g>'+fireflies+'</g>',
 '<g>'+brush+'</g>',
 '<g fill="none" stroke="'+p.glow+'" stroke-width="3" opacity=".7"><path d="M114 160v22m-11-11h22M427 101v18m-9-9h18M1261 231v27m-13-14h27"/></g>',
 '<path d="M0 635Q256 571 535 645T1400 624V700H0Z" fill="#12152e" opacity=".75"/>',
 '<g stroke="#a784c7" stroke-width="5" fill="none" opacity=".45"><path d="M80 700q9-73 54-102m-8 102q22-64 51-83m1123 83q-6-75-41-100m-8 100q-25-54-56-73"/></g>',
 '<g fill="#e9b7d7" opacity=".55"><ellipse cx="155" cy="612" rx="13" ry="4" transform="rotate(34 155 612)"/><ellipse cx="251" cy="677" rx="18" ry="5" transform="rotate(-22 251 677)"/><ellipse cx="1211" cy="640" rx="16" ry="5" transform="rotate(-28 1211 640)"/></g>',
 '</svg>'
 ];
 return svg.join("");
}
export {renderStageArtwork};
export function stageArtworkFiles(){return Object.values(STAGE_ART).map(scene=>({filename:scene.file,svg:renderStageArtwork(scene)}));}
