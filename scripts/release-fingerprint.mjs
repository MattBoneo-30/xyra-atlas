/** Deterministic release hash for versioned offline assets.
 * Source sw.js remains a simple numeric base for unit-tested service worker code;
 * the deployable worker receives a content fingerprint from the complete bundle.
 * No private learner state, network access or wall-clock input is used.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

function inventory(root,rel=''){
 const absolute=path.join(root,rel);
 const entries=fs.readdirSync(absolute,{withFileTypes:true});
 return entries.flatMap(entry=>{
  const name=rel?rel+'/'+entry.name:entry.name;
  if(entry.isDirectory())return inventory(root,name);
  if(!entry.isFile())throw Error('Unexpected non-file in release assets: '+name);
  return name==='sw.js'?[]:[name];
 }).sort((a,b)=>a.localeCompare(b,'en'));
}
export function staticContentFingerprint(root){
 if(!fs.existsSync(path.join(root,'sw.js')))throw Error('Missing service worker in built release');
 const filenames=inventory(root);
 if(!filenames.includes('index.html')||!filenames.includes('app.js')||!filenames.includes('styles.css'))
  throw Error('Incomplete release bundle for fingerprinting');
 const digest=createHash('sha256');
 for(const file of filenames){
  const contents=fs.readFileSync(path.join(root,...file.split('/')));
  // A file rename, path change, or byte-level content change must change the ID.
  digest.update(file,'utf8').update('\0').update(
   createHash('sha256').update(contents).digest('hex'),'utf8'
  ).update('\n');
 }
 return {sha256:digest.digest('hex'),fileCount:filenames.length};
}
export function stampServiceWorker(root){
 const file=path.join(root,'sw.js');
 const worker=fs.readFileSync(file,'utf8');
 const marker=/const CACHE = CACHE_PREFIX \+ '(v\d+)';/g;
 const matches=[...worker.matchAll(marker)];
 if(matches.length!==1)throw Error('Source service worker base version not found or ambiguous');
 const {sha256,fileCount}=staticContentFingerprint(root);
 const version=matches[0][1]+'-'+sha256.slice(0,12);
 fs.writeFileSync(file,worker.replace(matches[0][0],
  "const CACHE = CACHE_PREFIX + '"+version+"';"));
 return {version,sha256,fileCount};
}
