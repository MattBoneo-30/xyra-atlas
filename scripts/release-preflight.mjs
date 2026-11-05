/** Build a traceable release-candidate handoff from the tested static bundle.
 * This command does not grant production approval or invent external review.
 */
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {auditDeviceEvidence} from './audit-device-evidence.mjs';

const read=(file)=>JSON.parse(fs.readFileSync(file,'utf8'));
const stage=read('docs/stage-gates.json');
const editorial=read('artifacts/editorial-attestation-audit.json');
const claims=read('artifacts/source-claim-attestation-audit.json');
const language=read('artifacts/language-attestation-audit.json');
const devices=auditDeviceEvidence(read('docs/device-evidence.json'),{expectedCommit:process.env.GITHUB_SHA||null});
const root=path.resolve('dist');
if(!fs.statSync(root).isDirectory())throw Error('Build required first: npm run build');
const relative=[];
function collect(folder){
 for(const entry of fs.readdirSync(folder,{withFileTypes:true})){
  const full=path.join(folder,entry.name);
  if(entry.isSymbolicLink())throw Error('Symlink prohibited in release package: '+full);
  if(entry.isDirectory())collect(full);
  else if(entry.isFile())relative.push(path.relative(root,full).split(path.sep).join('/'));
  else throw Error('Unknown release item type: '+full);
 }
}
collect(root);
relative.sort();
if(!relative.includes('index.html')||!relative.includes('sw.js')||
 !relative.includes('manifest.webmanifest')||!relative.includes('app.js')||
 !relative.some(x=>x.startsWith('assets/'))||relative.length<80)
 throw Error('Built release candidate has missing app resources');
const files=relative.map(name=>{
 const contents=fs.readFileSync(path.join(root,...name.split('/')));
 return {path:name,bytes:contents.length,sha256:createHash('sha256').update(contents).digest('hex')};
});
const order=['advanced-curriculum','final-visual-experience','language-quality','release-readiness'];
if(stage.schemaVersion!==1||!Array.isArray(stage.gates)||
 stage.gates.length!==4||stage.gates.some((g,i)=>g.id!==order[i]))
 throw Error('Release stage definitions are not the expected four stages');
const e=editorial.totals,c=claims.totals,l=language.totals;
if(e.lessons!==139||e.decisions!==42||c.distinctSourceURLs!==51||
 l.phrases!==160||devices.summary?.total!==18)
 throw Error('Review scope changed; rebuild review evidence before packaging');
const approvals={
  curriculum:{lessonsApproved:e.approvedLessons,lessonsTotal:e.lessons,
   decisionsApproved:e.approvedDecisions,decisionsTotal:e.decisions,
   sourceUseSitesApproved:c.approvedSourceUseSites,sourceUseSitesTotal:c.sourceUseSites},
  language:{phrasesApproved:l.approvedPhrases,phrasesTotal:l.phrases},
  realDevices:{passed:devices.summary.PASS,total:devices.summary.total}
};
const releaseStages=stage.gates.map(x=>({
 id:x.id,complete:x.complete===true,
 blockers:x.complete?[]:x.blockers
}));
const externallyVerified=editorial.reviewEvidenceComplete===true&&
 claims.reviewEvidenceComplete===true&&language.reviewEvidenceComplete===true&&devices.passes;
const productionReady=releaseStages.every(x=>x.complete)&&externallyVerified;
const manifest={schemaVersion:1,kind:'xyra-atlas-reviewable-release-candidate',
  sourceCommit:process.env.GITHUB_SHA||null,
  packageVersion:read('package.json').version,
  fileCount:files.length,totalBytes:files.reduce((n,f)=>n+f.bytes,0),
  files,approvals,releaseStages,productionReady,
  labeling:productionReady?'All independent release gates met; production deployment still requires live verification':
   'RELEASE CANDIDATE ONLY — NOT VERIFIED FOR PRODUCTION',
  caveats:[
    'Automated tests and a reproducible build do not prove expert content accuracy.',
    'Linux browser emulation is not a real iPhone/Android installation test.',
    'This bundle contains interim vector artwork; final painterly artwork and art signoff are outstanding.',
    'No public Vercel deployment or live HTTPS/headers verification has been established here.'
  ]};
fs.mkdirSync('artifacts',{recursive:true});
fs.writeFileSync('artifacts/release-candidate-manifest.json',JSON.stringify(manifest,null,2)+'\n');
const readme=['# XYRA Atlas release candidate','',
 'Build: '+(manifest.sourceCommit||'local / unspecified Git commit'),
 'Version: '+manifest.packageVersion,
 'Files: '+manifest.fileCount+' ('+manifest.totalBytes+' raw bytes)',
 '',
 '**'+manifest.labeling+'**','',
 'The deployable offline-first website is packaged under dist/. Confirm the SHA-256 file manifest before using a downloaded archive.','',
 '## Human approval status','',
 'Lessons: '+approvals.curriculum.lessonsApproved+'/'+approvals.curriculum.lessonsTotal,
 'Decisions: '+approvals.curriculum.decisionsApproved+'/'+approvals.curriculum.decisionsTotal,
 'Source usages: '+approvals.curriculum.sourceUseSitesApproved+'/'+approvals.curriculum.sourceUseSitesTotal,
 'Language phrases: '+approvals.language.phrasesApproved+'/'+approvals.language.phrasesTotal,
 'Real device acceptance: '+approvals.realDevices.passed+'/'+approvals.realDevices.total,'',
 ...releaseStages.flatMap(g=>['## '+g.id+' — '+(g.complete?'complete':'blocked'),...(g.blockers||[]).map(x=>'- '+x),'']),
 'See docs/RELEASE_HANDOFF.md for deployment and owner review requirements.',
 ''];
fs.writeFileSync('artifacts/release-candidate-summary.md',readme.join('\n'));
console.log('Release candidate:',files.length,'files; productionReady =',productionReady);
console.log('Human review:',JSON.stringify(approvals));
console.log('No external deployment has been performed.');
