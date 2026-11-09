import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import {stageArtworkFiles} from './render-stage-art.mjs';
import {stampServiceWorker} from './release-fingerprint.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive:true, force:true });
fs.mkdirSync(out, {recursive:true});
for (const name of ['index.html','styles.css','atlas-visual-experience.css','atlas-world-gallery.css','atlas-inquiry.css','atlas-crossroads.css','language-path.css','study-bridges.css','literacy-studio.css','languageliteracy.js','literacychecks1.js','literacychecks2.js','practical-studio.css','competency-bridges.css','practicalstudios.js','competencybridges.js','competencybridges1.js','competencybridges2.js','masteryresearch.js','fieldexpeditions.js','firstprinciples.js','firstprinciples1.js','firstprinciples2.js','fieldexpeditions1.js','fieldexpeditions2.js','qualifyingclinic.js','qualifying1.js','qualifying2.js','masteryresearch1.js','masteryresearch2.js','practicalstudios1.js','practicalstudios2.js','sentencebridges.js','sentencebridges1.js','sentencebridges2.js','sentence-bridges.css','decisionrevisions.js','synthesisseminars.js','decisionrevisions1.js','decisionrevisions2.js','decision-revisions.css','beginnerworkshops.js','beginnerworkshops1.js','beginnerworkshops2.js','beginner-workshops.css','portfoliojourneys.js','portfoliojourneys1.js','portfoliojourneys2.js','portfolio-journeys.css','skillspirals.js','skillspirals1.js','skillspirals2.js','advancedconcepts.js','advancedconcepts1.js','advancedconcepts2.js','specialist-concepts.css','skill-spirals.css','evidenceprotocols.js','evidencepath.js','evidence-path.css','recoverystudio.js','recoverystudio1.js','recoverystudio2.js','misconceptioncoach.js','misconceptions1.js','misconceptions2.js','misconceptions3.js','recovery-studio.css','responsesimulations.js','responsesimulations1.js','responsesimulations2.js','response-simulations.css','app.js','atlas-icons.js','atlas-visual-experience.js','atlas-world-gallery.js','atlas-inquiry.js','inquirytrails1.js','inquirytrails2.js','atlas-crossroads.js','atlascrossroads1.js','atlascrossroads2.js','data.js','frontiercurriculum.js','calibrationlabs.js','calibration-interactions.js','calibration-labs.css','masterydefenses.js','masterydefense-interactions.js','mastery-defenses.css','languageevidence.js','language-evidence.css','review.js','phrasebook.js','japanesefoundation.js','kanareview.js','japaneserows.js','japanesepath2.js','depthcurriculum.js','foundationdepth.js','foundationdepth1.js','foundationdepth2.js','intermediatedepth.js','advanceddepth.js','scienceastronomy.js','transferlabs.js','transferlabs1.js','transferlabs2.js','crosssubjectmissions.js','crosssubjectmissions1.js','crosssubjectmissions2.js','evidenceinquiries.js','evidenceinquiries1.js','evidenceinquiries2.js','foundationdiagnostics.js','foundationdiagnostics1.js','foundationdiagnostics2.js','advancedcases1.js','advancedcases2.js','voicecoach.js','phrasereview.js','languagechallenge.js','conversationquest.js','languagestarterpaths.js','deeptracks.js','fieldguides.js','lifepractice.js','masterytracks.js','capstonelabs.js','phcasework.js','advancedenrichments.js','foundationcases.js','foundationcases2.js','criticalfoundation.js','generalfoundation.js','appliedfoundation.js','practiceguides.js','capstonechecks.js','fieldnotes.js','studio.js','paths.js','scenarios.js','atlasmap.js','dailyquest.js','glossary.js','search.js','calendar.js','insights.js','mentor.js','casebook.js','reader.js','visualmap.js','chapterart.js','stageart.js','narration.js','storagehealth.js','offline.js','backup.js','backupcrypto.js','datacontrols.js','curriculumpath.js','clinics.js','advanceddecisions.js','notebook.js','mistakes.js','exam.js','examhistory.js','focusedexam.js','personalcards.js','sw.js','manifest.webmanifest']) {
  fs.copyFileSync(path.join(root, name), path.join(out, name));
}
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
// Render 42 original, lightweight stage-specific subject worlds into the final offline bundle.
for(const {filename,svg} of stageArtworkFiles()){
 fs.writeFileSync(path.join(out,'assets',filename),svg);
}

// Generate PNG icons with Node built-ins, so the entire repository builds without npm dependencies.
const clamp = n => Math.max(0,Math.min(1,n));
const mix = (a,b,t) => a+(b-a)*t;
function distancePointSegment(px,py,ax,ay,bx,by){
  const dx=bx-ax,dy=by-ay;
  const t=clamp(((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy || 1));
  return Math.hypot(px-(ax+t*dx),py-(ay+t*dy));
}
function polylineDistance(x,y,points){let d=10;for(let i=1;i<points.length;i++)d=Math.min(d,distancePointSegment(x,y,...points[i-1],...points[i]));return d;}
function withinPolygon(x,y,pts){let inside=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){
  const a=pts[i],b=pts[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;
}return inside;}
const star=[];for(let i=0;i<16;i++){const a=-Math.PI/2+i*Math.PI/8,r=i%2?0.045:0.16;star.push([.5+Math.cos(a)*r,.33+Math.sin(a)*r]);}
const outerArc=[];for(let i=0;i<=60;i++){const angle=(212+i*2.2)*Math.PI/180;outerArc.push([.5+.33*Math.cos(angle),.455+.33*Math.sin(angle)]);}
const bookLines=[
  [[.18,.65],[.27,.63],[.38,.64],[.5,.72],[.62,.64],[.73,.63],[.82,.65]],
  [[.18,.65],[.2,.83],[.32,.81],[.42,.84],[.5,.9],[.58,.84],[.68,.81],[.8,.83],[.82,.65]],
  [[.5,.72],[.5,.9]],
  [[.23,.71],[.35,.7],[.46,.76]],
  [[.77,.71],[.65,.7],[.54,.76]]
];
function png(size){
  const pixels=Buffer.alloc((size*4+1)*size);
  for(let y=0;y<size;y++){
    const stride=y*(size*4+1);pixels[stride]=0;
    for(let x=0;x<size;x++){
      const u=(x+.5)/size,v=(y+.5)/size;
      const angle=clamp((u+v)/2), glow=Math.max(0,1-Math.hypot(u-.6,v-.3)*1.6);
      let rgb=[mix(19,92,angle)+glow*18,mix(10,42,angle)+glow*7,mix(37,113,angle)+glow*23];
      const dist=polylineDistance(u,v,outerArc);
      const line1=polylineDistance(u,v,bookLines[0]);
      const line2=polylineDistance(u,v,bookLines[1]);
      const line3=polylineDistance(u,v,bookLines[2]);
      const line4=polylineDistance(u,v,bookLines[3]);
      const line5=polylineDistance(u,v,bookLines[4]);
      let coverage=withinPolygon(u,v,star)?1:0;
      coverage=Math.max(coverage,clamp((.014-dist)*size/1.4));
      coverage=Math.max(coverage,clamp((.018-Math.min(line1,line2,line3))*size/1.4));
      coverage=Math.max(coverage,clamp((.009-Math.min(line4,line5))*size/1.4)*.75);
      const glowHalo=clamp((.04-dist)/.05)*.16;
      const strength=clamp(coverage+glowHalo);
      rgb=rgb.map((c,i)=>Math.round(mix(c,[255,218,157][i],strength)));
      const p=stride+1+x*4;pixels[p]=rgb[0];pixels[p+1]=rgb[1];pixels[p+2]=rgb[2];pixels[p+3]=255;
    }
  }
  const crcTable=new Uint32Array(256);
  for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;crcTable[n]=c>>>0;}
  function crc32(buffer){let c=0xffffffff;for(let i=0;i<buffer.length;i++)c=crcTable[(c^buffer[i])&255]^(c>>>8);return(c^0xffffffff)>>>0;}
  function chunk(name,buffer){const tag=Buffer.from(name),len=Buffer.alloc(4),crc=Buffer.alloc(4);len.writeUInt32BE(buffer.length);crc.writeUInt32BE(crc32(Buffer.concat([tag,buffer])));return Buffer.concat([len,tag,buffer,crc]);}
  const header=Buffer.alloc(13);header.writeUInt32BE(size,0);header.writeUInt32BE(size,4);header[8]=8;header[9]=6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',zlib.deflateSync(pixels,{level:9})),chunk('IEND',Buffer.alloc(0))]);
}
for(const [size,name] of [[192,'icon-192.png'],[512,'icon-512.png'],[180,'apple-touch-icon.png']]){
  fs.writeFileSync(path.join(out,name),png(size));
}
// Vary deployable service worker bytes whenever ANY learning asset changes,
// so users cannot get stuck with an old offline edition after source-only edits.
const release=stampServiceWorker(out);
console.log('Built offline-first Xyra Atlas in dist/ (zero external dependencies).');
console.log('Content-fingerprinted release cache:',release.version,'from',release.fileCount,'assets.');
