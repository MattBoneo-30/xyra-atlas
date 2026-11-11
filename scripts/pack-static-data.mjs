/** Compact repo-authored, immutable JSON-like teaching modules at build time.
 * The authoring files are untouched: reviewer hashes and lesson identities stay
 * based on source values, while static output carries native-gzip encoded data.
 *
 * Strictly limited to known content modules; no user uploads, eval, network,
 * persistent state or third-party dependencies. Unsupported values remain
 * in their original uncompressed JavaScript file.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import {pathToFileURL} from 'node:url';

export const PACKABLE_COURSE_DATA=new Set([
 'literacychecks1.js','literacychecks2.js',
 'competencybridges1.js','competencybridges2.js',
 'firstprinciples1.js','firstprinciples2.js',
 'fieldexpeditions1.js','fieldexpeditions2.js',
 'qualifying1.js','qualifying2.js',
 'masteryresearch1.js','masteryresearch2.js',
 'practicalstudios1.js','practicalstudios2.js',
 'sentencebridges1.js','sentencebridges2.js',
 'decisionrevisions1.js','decisionrevisions2.js',
 'beginnerworkshops1.js','beginnerworkshops2.js',
 'portfoliojourneys1.js','portfoliojourneys2.js',
 'skillspirals1.js','skillspirals2.js',
 'advancedconcepts1.js','advancedconcepts2.js',
 'recoverystudio1.js','recoverystudio2.js',
 'misconceptions1.js','misconceptions2.js','misconceptions3.js',
 'responsesimulations1.js','responsesimulations2.js',
 'inquirytrails1.js','inquirytrails2.js',
 'atlascrossroads1.js','atlascrossroads2.js',
 'foundationdepth1.js','foundationdepth2.js',
 'transferlabs1.js','transferlabs2.js',
 'crosssubjectmissions1.js','crosssubjectmissions2.js',
 'evidenceinquiries1.js','evidenceinquiries2.js',
 'foundationdiagnostics1.js','foundationdiagnostics2.js',
 'advancedcases1.js','advancedcases2.js',
 'foundationcases2.js',
 'masterytracks.js','synthesisseminars.js','capstonelabs.js',
 'advancedenrichments.js','deeptracks.js','phcasework.js',
 'fieldguides.js','lifepractice.js','foundationdepth.js',
 'intermediatedepth.js','advanceddepth.js','foundationcases.js',
 'criticalfoundation.js','generalfoundation.js','appliedfoundation.js',
 'practiceguides.js','scenarios.js','phrasebook.js','glossary.js'
]);

export function isPlainTeachingData(value,seen=new WeakSet()){
 if(value===null||typeof value==='string'||typeof value==='boolean')return true;
 if(typeof value==='number')return Number.isFinite(value)&&!Object.is(value,-0);
 if(typeof value!=='object'||seen.has(value)||Object.isFrozen(value))return false;
 seen.add(value);
 if(!Array.isArray(value)&&Object.getPrototypeOf(value)!==Object.prototype)return false;
 if(Reflect.ownKeys(value).some(key=>typeof key==='symbol'))return false;
 const descriptors=Object.getOwnPropertyDescriptors(value);
 return Reflect.ownKeys(descriptors).every(key=>{
  const entry=descriptors[key];
  return 'value' in entry && isPlainTeachingData(entry.value,seen);
 });
}

/** Returns bytes saved, or zero when the source is not safely representable. */
export async function packCourseData(root,out,name){
 if(!PACKABLE_COURSE_DATA.has(name))return 0;
 const srcPath=path.join(root,name);
 const source=fs.readFileSync(srcPath,'utf8');
 if(/^\s*import\s/m.test(source))return 0;
 const exports=[...source.matchAll(/^export\s+(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/gm)];
 if(exports.length!==1||/\bexport\s+(?:default|function|class|\{)/.test(source))return 0;
 const symbol=exports[0][1];
 const module=await import(pathToFileURL(srcPath).href);
 if(Object.keys(module).length!==1||!Object.hasOwn(module,symbol))return 0;
 const data=module[symbol];
 if(!isPlainTeachingData(data))return 0;
 const json=JSON.stringify(data);
 if(!json||json.length<1000)return 0;
 const zipped=zlib.gzipSync(Buffer.from(json,'utf8'),{level:9});
 if(zlib.gunzipSync(zipped).toString('utf8')!==json)
  throw Error('Internal round-trip mismatch in '+name);
 const packed="import {unpackAtlasJSON} from './atlas-packed-content.js';\n"+
  "export const "+symbol+"=await unpackAtlasJSON('"+zipped.toString('base64')+"');\n";
 const rawBytes=Buffer.byteLength(source,'utf8'),packedBytes=Buffer.byteLength(packed,'utf8');
 if(rawBytes-packedBytes<1000)return 0;
 fs.writeFileSync(path.join(out,name),packed,'utf8');
 return rawBytes-packedBytes;
}
