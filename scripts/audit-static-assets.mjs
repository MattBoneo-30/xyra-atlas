import fs from 'node:fs';
import path from 'node:path';
import {auditStaticSite} from './static-asset-audit.mjs';
const out=path.join(process.cwd(),'artifacts','static-asset-audit.json');
fs.mkdirSync(path.dirname(out),{recursive:true});
const audit=auditStaticSite(path.join(process.cwd(),'dist'));
fs.writeFileSync(out,JSON.stringify(audit,null,2)+'\n');
console.log('Xyra Atlas static bundle audit:',JSON.stringify(audit.summary));
console.log('Budget:',JSON.stringify(audit.budgets));
console.log('Violations:',audit.violations.length);
if(!audit.passes){console.error(audit.violations.join('\n'));process.exitCode=1;}
