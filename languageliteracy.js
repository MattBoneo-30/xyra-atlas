/** Xyra Atlas — offline language pattern checks for twenty locales.
 * Author-created, ungraded written recognition, not an A1 exam or oral test.
 * No side effects, local storage or network access. Requires independent
 * qualified review for local usage, phonology and pedagogical claims.
 */
import {LITERACY_CHECKS_ONE} from './literacychecks1.js';
import {LITERACY_CHECKS_TWO} from './literacychecks2.js';
export const LANGUAGE_LITERACY_CHECKS=Object.freeze({...LITERACY_CHECKS_ONE,...LITERACY_CHECKS_TWO});
const html=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function getLanguageLiteracyChecks(code){
 if(typeof code!=='string'||!Object.hasOwn(LANGUAGE_LITERACY_CHECKS,code))return null;
 return LANGUAGE_LITERACY_CHECKS[code];
}
export function validateLanguageLiteracyChecks(codes){
 if(!Array.isArray(codes)||codes.length!==20||new Set(codes).size!==20||
    new Set(Object.keys(LANGUAGE_LITERACY_CHECKS)).size!==20||
    codes.some(code=>!Object.hasOwn(LANGUAGE_LITERACY_CHECKS,code)))
  throw Error('Language literacy coverage does not match 20 available locales');
 const prompts=new Set();
 for(const code of codes){
  const items=LANGUAGE_LITERACY_CHECKS[code];
  if(!Array.isArray(items)||items.length!==2)throw Error('Missing language checks for '+code);
  for(const q of items){
   if(typeof q.title!=='string'||q.title.length<20||
      typeof q.question!=='string'||q.question.length<45||
      !Array.isArray(q.choices)||q.choices.length!==3||
      q.choices.some(x=>typeof x!=='string'||x.length<10)||
      new Set(q.choices).size!==3||!Number.isInteger(q.correct)||q.correct<0||q.correct>2||
      typeof q.why!=='string'||q.why.length<120||
      typeof q.try!=='string'||q.try.length<80)
    throw Error('Incomplete language literacy check '+code+': '+q?.title);
   if(prompts.has(q.question))throw Error('Duplicate language literacy question');
   prompts.add(q.question);
  }
 }
 return {languages:codes.length,checks:prompts.size};
}
export function languageLiteracyFeedback(code,index,choice){
 const questions=getLanguageLiteracyChecks(code);
 if(!questions||!Number.isInteger(index)||!Number.isInteger(choice))return null;
 const q=questions[index];
 if(!q||choice<0||choice>=q.choices.length)return null;
 return {correct:choice===q.correct,explanation:q.why,transfer:q.try};
}
export function languageLiteracyPanel(code,{unlocked=true}={}){
 const questions=getLanguageLiteracyChecks(code);
 if(!questions)return '';
 const intro='<section class="language-literacy" id="language-literacy" aria-label="Written language pattern checks">'+
 '<span class="overline">READ · NOTICE · VERIFY</span><h2>Language pattern workshop</h2>'+
 '<p>Two authored, language-specific checks. Choose your interpretation, inspect the explanation and try the extension. These do not grade actual listening, speaking, fluency or CEFR level.</p>';
 if(!unlocked)return intro+'<p class="language-literacy-locked">Complete the existing Japanese kana and first-sentence pathway before unlocking these written recognition checks. This keeps the learning order consistent.</p></section>';
 return intro+questions.map((q,i)=>'<fieldset class="language-literacy-question" data-literacy-index="'+i+'">'+
 '<legend><span class="language-literacy-number">PATTERN '+(i+1)+' / '+questions.length+'</span><strong>'+html(q.title)+'</strong></legend>'+
 '<p class="language-literacy-prompt">'+html(q.question)+'</p>'+
 '<div class="language-literacy-options">'+q.choices.map((choice,j)=>'<button type="button" data-action="language-literacy-answer" data-question="'+i+'" data-option="'+j+'" aria-pressed="false">'+html(choice)+'</button>').join('')+'</div>'+
 '<p class="language-literacy-feedback" role="status" aria-live="polite">Select an answer to see the reasoning and follow-up practice.</p></fieldset>').join('')+
 '<p class="fineprint">The items have not been approved by a qualified language reviewer. Explanations use authored text; audio from a local device voice is not a native reference. Results are not stored or certified.</p></section>';
}
