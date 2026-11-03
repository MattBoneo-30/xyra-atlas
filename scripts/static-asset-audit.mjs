/** Offline bundle budget, precache integrity and SVG safety audit.
 * Build artifacts are public static assets; no learner files or secrets are read.
 * Mechanical checks are not a substitute for accessibility/performance device QA.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const safeSvg=/<(?:script|foreignObject)\b|\bon(?:load|error|click|mouseover|focus)\s*=|(?:xlink:)?href\s*=\s*["'](?:https?:|javascript:|data:)/i;
export function svgViolations(svg){
 const issues=[];
 if(typeof svg!=='string'||!/^\s*<svg\b/i.test(svg))issues.push('missing-svg-root');
 if(safeSvg.test(svg||''))issues.push('active-or-external-content');
 return issues;
}
export function shellPaths(sw){
 const body=typeof sw==='string'?sw.match(/const APP_SHELL\s*=\s*\[([\s\S]*?)\];/)?.[1]:null;
 if(body===null||body===undefined)throw Error('Missing static APP_SHELL array');
 const paths=[...body.matchAll(/'([^']+)'/g)].map(m=>m[1]);
 if(!paths.length||!paths.includes('/'))throw Error('Invalid shell inventory');
 return paths;
}
export function pngSize(buffer){
 if(!Buffer.isBuffer(buffer)||buffer.length<24||
  !buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return null;
 return {width:buffer.readUInt32BE(16),height:buffer.readUInt32BE(20)};
}
function walk(dir){
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(item=>{
  const next=path.join(dir,item.name);
  return item.isDirectory()?walk(next):item.isFile()?[next]:[];
 });
}
const BUDGET={rawAll:3000000,gzipAll:1600000,maxSVG:65000,maxCSS:180000,maxAppJS:240000};
export function auditStaticSite(root){
 const violations=[],warnings=[];
 if(!fs.existsSync(root))throw Error('Run npm run build before auditing assets');
 const all=walk(root).map(file=>{
  const bytes=fs.readFileSync(file);
  const relative=path.relative(root,file).replaceAll(path.sep,'/');
  return {path:relative,rawBytes:bytes.length,gzipBytes:zlib.gzipSync(bytes,{level:9}).length};
 }).sort((a,b)=>a.path.localeCompare(b.path));
 const lookup=new Map(all.map(x=>[x.path,x]));
 const raw=all.reduce((n,x)=>n+x.rawBytes,0);
 const gzip=all.reduce((n,x)=>n+x.gzipBytes,0);
 if(raw>BUDGET.rawAll)violations.push('raw-bundle-over-budget');
 if(gzip>BUDGET.gzipAll)violations.push('compressed-bundle-over-budget');
 if((lookup.get('styles.css')?.rawBytes||Infinity)>BUDGET.maxCSS)violations.push('style-over-budget');
 if((lookup.get('app.js')?.rawBytes||Infinity)>BUDGET.maxAppJS)violations.push('main-script-over-budget');
 const shell=shellPaths(fs.readFileSync(path.join(root,'sw.js'),'utf8'));
 const seen=new Set();
 for(const p of shell){
  if(!p.startsWith('/')||p.includes('..')||p.includes('?')||p.includes('#'))violations.push('invalid-precache-path:'+p);
  const target=p==='/'?'index.html':p.slice(1);
  if(!lookup.has(target))violations.push('missing-precache-file:'+p);
  if(seen.has(p))violations.push('duplicate-precache-path:'+p);
  seen.add(p);
 }
 const images=all.filter(x=>x.path.endsWith('.svg'));
 for(const img of images){
  if(img.rawBytes>BUDGET.maxSVG)violations.push('oversized-svg:'+img.path);
  const source=fs.readFileSync(path.join(root,img.path),'utf8');
  for(const issue of svgViolations(source))violations.push(img.path+':'+issue);
  if(/assets\/(?:chapter-|atlas-(?:archive|lantern|starlit))/.test(img.path)&&
   !/<svg[^>]*(?:aria-label|aria-hidden|role)=/.test(source.slice(0,550)))
   violations.push('unlabeled-narrative-art:'+img.path);
 }
 for(const [file,dimension] of [['icon-192.png',192],['icon-512.png',512],['apple-touch-icon.png',180]]){
  const target=path.join(root,file);
  if(!fs.existsSync(target)){violations.push('missing-icon:'+file);continue;}
  const size=pngSize(fs.readFileSync(target));
  if(!size||size.width!==dimension||size.height!==dimension)violations.push('wrong-icon-size:'+file);
 }
 if(images.length<30)warnings.push('Fewer than 30 SVG illustrations in bundled art inventory');
 return {schemaVersion:1,passes:violations.length===0,violations,warnings,
  summary:{assetFiles:all.length,precacheEntries:shell.length,svgImages:images.length,rawBytes:raw,gzipBytes:gzip},
  budgets:BUDGET,largest:all.sort((a,b)=>b.rawBytes-a.rawBytes).slice(0,12),
  limitations:['Compressed total counts gzip for each file independently and is a conservative estimate, not measured network transfer.',
   'No device-level startup time, contrast compliance, painterly-art signoff or actual iOS/Android installation is inferred.']};
}
