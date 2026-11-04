/** Validate real-device QA evidence without manufacturing pass results. */
import fs from 'node:fs';
const ids=['IOS-01','IOS-02','IOS-03','IOS-04','IOS-05','IOS-06','IOS-07','AND-01','AND-02','AND-03','AND-04','AND-05','AND-06','BOTH-01','BOTH-02','BOTH-03','BOTH-04','BOTH-05'];
const statuses=new Set(['PASS','FAIL','BLOCKED','NOT RUN']);
const valid=s=>typeof s==='string'&&s.trim().length>0;
export function auditDeviceEvidence(report,{expectedCommit=null}={}){
 const errors=[];
 if(!report||report.schemaVersion!==1||!Array.isArray(report.cases))return {passes:false,errors:['Invalid device evidence schema'],summary:null};
 const seen=new Set(),counts={PASS:0,FAIL:0,BLOCKED:0,'NOT RUN':0};
 for(const item of report.cases){
  if(!item||!ids.includes(item.id)){errors.push('Unknown case ID');continue;}
  if(seen.has(item.id)){errors.push('Duplicate '+item.id);continue;}
  seen.add(item.id);
  if(!statuses.has(item.status)){errors.push('Invalid status '+item.id);continue;}
  counts[item.status]++;
  if(item.status==='PASS'){
   // A recorded pass must identify a plausible source revision and an actual
   // public HTTPS deployment, not a local/dev host or placeholder address.
   if(!/^[0-9a-f]{40}$/.test(item.commit||''))errors.push('PASS has invalid source commit: '+item.id);
   else if(expectedCommit&&item.commit!==expectedCommit)errors.push('PASS belongs to a different source commit: '+item.id);
   try{
    const u=new URL(item.deploymentUrl);
    if(u.protocol!=='https:'||u.username||u.password||u.port||
       !u.hostname.includes('.')||u.hostname==='localhost'||
       /(?:^|\.)(?:localhost|local|test|invalid|example)$/.test(u.hostname)||
       /^(?:127\.|10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)/.test(u.hostname))
      errors.push('PASS deployment URL is not a public HTTPS host: '+item.id);
   }catch{errors.push('PASS deployment URL is malformed: '+item.id);}
   if(!valid(item.commit)||!valid(item.deploymentUrl)||!/^https:\/\//.test(item.deploymentUrl)||
      !valid(item.device)||!valid(item.os)||!valid(item.browser)||!valid(item.testedAt)||
      !valid(item.tester)||!valid(item.procedure)||!Array.isArray(item.evidence)||
      item.evidence.length===0||!item.evidence.every(valid))
    errors.push('PASS lacks required actual evidence: '+item.id);
   const timestamp=Date.parse(item.testedAt);
   if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(item.testedAt||'')||
      !Number.isFinite(timestamp)||timestamp>Date.now()+300000)
    errors.push('PASS has invalid or future timestamp: '+item.id);
  }
 }
 for(const id of ids)if(!seen.has(id))errors.push('Missing '+id);
 return {passes:errors.length===0&&counts.PASS===ids.length,errors,summary:{total:ids.length,...counts}};
}
if(process.argv[1]&&import.meta.url===new URL('file://'+process.argv[1]).href){
 const filename=process.argv[2]||'docs/device-evidence.json';
 const report=JSON.parse(fs.readFileSync(filename,'utf8'));
 const result=auditDeviceEvidence(report);
 console.log(JSON.stringify(result,null,2));
 if(!result.passes)process.exitCode=1;
}
