/** Periodic opt-in/public-source availability check; not a claim-validation substitute. */
import fs from 'node:fs';
import path from 'node:path';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {authoredCourseLinks,inspectPublicSources} from '../sourcehealth.js';
const urls=authoredCourseLinks(COURSES,CLINICS);
const results=await inspectPublicSources(urls,fetch,4);
const summary=Object.fromEntries([...new Set(results.map(r=>r.status))].map(status=>[status,results.filter(r=>r.status===status).length]));
const report={schemaVersion:1,checkedAt:new Date().toISOString(),publicSourceCount:urls.length,summary,results,
 limitations:['HTTP status reflects an external site response, not article validity or relevance.',
  'Government and institutional sites may block automated checks, show temporary errors or change location.',
  'A separate human claim-level review of all lesson text and sources remains necessary.']};
const dest=path.join(process.cwd(),'artifacts','public-source-health.json');
fs.mkdirSync(path.dirname(dest),{recursive:true});
fs.writeFileSync(dest,JSON.stringify(report,null,2)+'\n');
console.log('Atlas public reference URL health:',JSON.stringify(summary),'of',urls.length);
console.log('Result: '+dest);
// Unknown, missing, or restricted public pages should trigger editorial attention,
// but must not make all offline learning or source availability checks fail CI.
