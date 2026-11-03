/** Local calendar keys for offline streaks and daily learning.
 * Do not use toISOString() for local dates: its UTC day can differ on phones. */
export function localDayKey(date=new Date()) {
  if(!(date instanceof Date)||!Number.isFinite(date.getTime()))return null;
  const y=String(date.getFullYear()).padStart(4,'0');
  const m=String(date.getMonth()+1).padStart(2,'0');
  const d=String(date.getDate()).padStart(2,'0');
  return y+'-'+m+'-'+d;
}
export function validDayKey(value) {
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const [year,month,day]=value.split('-').map(Number);
  if(year<100||year>9999||month<1||month>12||day<1||day>31)return false;
  const check=new Date(Date.UTC(year,month-1,day));
  return check.getUTCFullYear()===year&&check.getUTCMonth()+1===month&&check.getUTCDate()===day;
}
export function countVisitStreak(days,now=new Date()) {
  if(!(now instanceof Date)||!Number.isFinite(now.getTime()))return 0;
  const visited=new Set((Array.isArray(days)?days:[]).filter(validDayKey));
  const start=new Date(now.getFullYear(),now.getMonth(),now.getDate(),12,0,0);
  if(!visited.has(localDayKey(start)))start.setDate(start.getDate()-1);
  let count=0;
  for(let i=0;i<400;i++){
    if(!visited.has(localDayKey(start)))break;
    count++;start.setDate(start.getDate()-1);
  }
  return count;
}
