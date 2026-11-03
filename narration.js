/** Browser speech content preparation. No audio is stored or uploaded by Atlas. */
function chunks(text,maxLength) {
 const value=String(text??'').replace(/\s+/g,' ').trim();if(!value)return [];
 const words=value.split(' '),out=[];let current='';
 for(const word of words) {
  if(!word)continue;
  if(word.length>maxLength) {
   if(current){out.push(current);current='';}
   for(let i=0;i<word.length;i+=maxLength)out.push(word.slice(i,i+maxLength));
   continue;
  }
  if(current && current.length+word.length+1>maxLength){out.push(current);current='';}
  current+=(current?' ':'')+word;
 }
 if(current)out.push(current);
 return out;
}
export function buildLessonNarration(course,lesson,{maxLength=175}={}){
 if(!course||!lesson||!Array.isArray(lesson.sections))return [];
 const max=Number.isInteger(maxLength)?Math.max(80,Math.min(240,maxLength)):175;
 const paragraphs=[lesson.title,lesson.intro];
 for(const section of lesson.sections) if(section) paragraphs.push(section.heading,section.body);
 if(lesson.example)paragraphs.push('Worked example.',lesson.example);
 if(lesson.task)paragraphs.push('Practice exercise.',lesson.task);
 return paragraphs.flatMap(text=>chunks(text,max)).filter(Boolean).slice(0,200);
}
