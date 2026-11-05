/** Validate real-device QA evidence without manufacturing pass results. */
import fs from 'node:fs';
import {isIP} from 'node:net';
const ids=['IOS-01','IOS-02','IOS-03','IOS-04','IOS-05','IOS-06','IOS-07','AND-01','AND-02','AND-03','AND-04','AND-05','AND-06','BOTH-01','BOTH-02','BOTH-03','BOTH-04','BOTH-05'];
const statuses=new Set(['PASS','FAIL','BLOCKED','NOT RUN']);
const valid=s=>typeof s==='string'&&s.trim().length>0;
// This checks URL syntax only: independently verify the actual deployment.
// IANA documentation domains and IP-literal hosts are not suitable signoff URLs.
function plausiblePublicDeployment(value){
 try{
  const url=new URL(value);
  const host=url.hostname.toLowerCase();
  const ip=host.startsWith('[')&&host.endsWith(']')?host.slice(1,-1):host;
  if(url.protocol!=='https:'||url.username||url.password||url.port||
     url.hash||url.search||host.endsWith('.')||isIP(ip)!==0||!host.includes('.')||
     !host.split('.').every(label=>/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)))return false;
  if(/(?:^|\.)(?:localhost|local|test|invalid|example|internal)$/.test(host)||
     /(?:^|\.)example\.(?:com|net|org)$/.test(host))return false;
  return true;
 }catch{return false;}
}
function validEvidenceTime(value){
 if(typeof value!=='string')return false;
 const match=value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|([+-])(\d{2}):(\d{2}))$/);
 if(!match)return false;
 const [,yearText,monthText,dayText,hourText,minuteText,secondText,,offsetHours,offsetMinutes]=match;
 const [year,month,day,hour,minute,second]=[yearText,monthText,dayText,hourText,minuteText,secondText].map(Number);
 const leap=year%4===0&&(year%100!==0||year%400===0);
 const dayCounts=[31,leap?29:28,31,30,31,30,31,31,30,31,30,31];
 if(month<1||month>12||day<1||day>dayCounts[month-1]||hour>23||minute>59||second>59||
    (offsetHours!==undefined&&(Number(offsetHours)>14||Number(offsetMinutes)>59||
     (Number(offsetHours)===14&&Number(offsetMinutes)!==0))))return false;
 const parsed=Date.parse(value);
 return Number.isFinite(parsed)&&parsed<=Date.now()+300000;
}
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
   // A recorded pass must identify a source revision and a plausible public
   // HTTPS host; real deployment and physical evidence need human verification.
   if(!/^[0-9a-f]{40}$/.test(item.commit||''))errors.push('PASS has invalid source commit: '+item.id);
   else if(expectedCommit&&item.commit!==expectedCommit)errors.push('PASS belongs to a different source commit: '+item.id);
   if(!plausiblePublicDeployment(item.deploymentUrl))
    errors.push('PASS deployment URL is not a public HTTPS host: '+item.id);
   if(!valid(item.commit)||!valid(item.deploymentUrl)||!/^https:\/\//.test(item.deploymentUrl)||
      !valid(item.device)||!valid(item.os)||!valid(item.browser)||!valid(item.testedAt)||
      !valid(item.tester)||!valid(item.procedure)||!Array.isArray(item.evidence)||
      item.evidence.length===0||!item.evidence.every(valid))
    errors.push('PASS lacks required actual evidence: '+item.id);
   if(!validEvidenceTime(item.testedAt))
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
