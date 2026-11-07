/** Xyra Atlas sentence grammar bridges: 40 original authored units.
 * Two sequential observation/check units per language, using only previously
 * authored station and comprehension phrase IDs. Not a native-language review,
 * pronunciation test, listening assessment, A1 certification, or mastery grade.
 * Deliberately no persistent storage or network access.
 */
import {SENTENCE_BRIDGES_ONE} from './sentencebridges1.js';
import {SENTENCE_BRIDGES_TWO} from './sentencebridges2.js';
export const SENTENCE_BRIDGES=Object.freeze({...SENTENCE_BRIDGES_ONE,...SENTENCE_BRIDGES_TWO});
export const SENTENCE_BRIDGE_COUNT=Object.keys(SENTENCE_BRIDGES).length;
const safe=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function validateSentenceBridges(codes){
 if(!Array.isArray(codes)||codes.length!==20||new Set(codes).size!==20||
   SENTENCE_BRIDGE_COUNT!==20||codes.some(code=>!Object.hasOwn(SENTENCE_BRIDGES,code)))
  throw Error('Sentence bridge coverage is incomplete');
 const titles=new Set();
 for(const code of codes){
  const data=SENTENCE_BRIDGES[code];
  for(const key of ['question','negative']){
   const unit=data[key];
   if(!unit||typeof unit.title!=='string'||unit.title.length<24||
    !['principle','notice','contrast','task'].every(field=>
      typeof unit[field]==='string'&&unit[field].length>=110)||
    !Array.isArray(unit.check)||unit.check.length!==3||
    unit.check.some(line=>typeof line!=='string'||line.length<12)||
    new Set(unit.check).size!==3||
    !Number.isInteger(unit.answer)||unit.answer<0||unit.answer>2)
    throw Error('Incomplete grammar teaching: '+code+':'+key);
   if(titles.has(unit.title))throw Error('Duplicate grammar lesson heading: '+unit.title);
   titles.add(unit.title);
  }
 }
 return {languages:20,units:40};
}
export function sentenceBridgeFeedback(code,index,choice){
 if(!Object.hasOwn(SENTENCE_BRIDGES,code)||!Number.isInteger(index)||!Number.isInteger(choice)||
   index<0||index>1||choice<0||choice>2)return null;
 const unit=SENTENCE_BRIDGES[code][index===0?'question':'negative'];
 return {correct:unit.answer===choice,reason:unit.notice,exercise:unit.task};
}
export function sentenceBridgePanel(code,pack,{unlocked=true}={}){
 if(!Object.hasOwn(SENTENCE_BRIDGES,code)||!pack||!Array.isArray(pack.phrases)||pack.phrases.length<6)return '';
 const data=SENTENCE_BRIDGES[code];
 const head='<section class="sentence-bridge" id="sentence-bridge" aria-label="Sequential sentence structure lessons">'+
  '<span class="overline">HOW A SENTENCE WORKS</span><h2>From a phrase to a grammar pattern</h2>'+
  '<p class="sentence-bridge-intro">Two guided stages: investigate a location question, then study a negative sentence. Both use the authored starter phrases; neither is an independent translation, listening, speaking or CEFR test.</p>';
 if(!unlocked)return head+'<p class="sentence-bridge-locked">Complete the Japanese kana and first-sentences foundation before starting sentence analysis. This path cannot bypass the existing reading prerequisites.</p></section>';
 const rtl=code==='ar'?' dir="rtl"':'';
 const units=[data.question,data.negative];
 return head+units.map((unit,i)=>{
  const phrase=pack.phrases[i===0?4:5];
  return '<article class="sentence-bridge-unit" data-sentence-step="'+i+'"'+(i?' hidden':'')+'>'+
   '<span class="sentence-bridge-label">STAGE '+(i+1)+' OF 2 · '+(i?'NEGATION':'QUESTIONS')+'</span>'+
   '<h3>'+safe(unit.title)+'</h3><p>'+safe(unit.principle)+'</p>'+
   '<div class="sentence-bridge-evidence"><strong>Authored source phrase: '+safe(phrase.english)+'</strong>'+
   '<p class="sentence-bridge-target" lang="'+safe(code)+'"'+rtl+'>'+safe(phrase.target)+'</p>'+
   (phrase.pronunciation?'<small>Approximate romanization: '+safe(phrase.pronunciation)+'</small>':'')+'</div>'+
   '<h4>Read it closely</h4><p>'+safe(unit.notice)+'</p>'+
   '<h4>What this example does NOT prove</h4><p>'+safe(unit.contrast)+'</p>'+
   '<fieldset class="sentence-bridge-question"><legend>Check the meaning of the pattern</legend>'+
    '<div class="sentence-bridge-options">'+unit.check.map((text,j)=>
      '<button type="button" data-action="sentence-bridge-answer" data-step="'+i+'" data-option="'+j+'" aria-pressed="false">'+safe(text)+'</button>').join('')+'</div>'+
    '<p class="sentence-bridge-feedback" role="status" aria-live="polite">Choose the best explanation to continue.</p></fieldset>'+
   '<details class="sentence-bridge-transfer"><summary>Independent sentence investigation</summary><p>'+safe(unit.task)+'</p></details>'+
  '</article>';
 }).join('')+
 '<p class="fineprint">Unreviewed authored grammar annotations. The second stage appears after you correctly answer the first. Choices are not stored, do not affect course progress, and do not verify pronunciation or naturalness.</p></section>';
}
