/** CI-friendly machine-readable snapshot of Atlas pedagogy readiness. */
import fs from 'node:fs';
import path from 'node:path';
import {COURSES} from '../data.js';
import {auditCurriculum} from '../curriculumaudit.js';
const report=auditCurriculum(COURSES);
const out=path.join(process.cwd(),'artifacts','curriculum-audit.json');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
console.log('Xyra Atlas curriculum audit:',JSON.stringify(report.totals));
console.log('Editorially flagged lessons:',report.lessons.filter(x=>x.editorialNeeds.length).map(x=>x.id).join(', '));
console.log('Full report:',out);
if(!report.valid){console.error('Critical curriculum structure errors:',report.criticalIssues);process.exitCode=1;}
