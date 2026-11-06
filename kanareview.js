/** Offline, post-lesson kana recall. No pronunciation grading or network calls. */
import {JAPANESE_UNITS,JAPANESE_BASIC_HIRAGANA,JAPANESE_BASIC_KATAKANA,normalizeJapaneseFoundationDone} from './japanesefoundation.js';
export const KANA_REVIEW_DAYS=Object.freeze([1,3,7,14,30,60]);
export const KANA_RETRY_MS=10*60*1000;
const ALLOWED=new Set([...JAPANESE_BASIC_HIRAGANA,...JAPANESE_BASIC_KATAKANA]);
const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const contrast=Object.freeze({'ぬ':['め','Observe the extra curve in ぬ.'],'め':['ぬ','Compare the complete strokes of ぬ and め.'],'ね':['れ','Compare the final turn of ね and れ.'],'れ':['ね','Compare the final turn of れ and ね.'],'シ':['ツ','Compare the direction of the short strokes in シ and ツ.'],'ツ':['シ','Compare the short strokes in ツ and シ.'],'ソ':['ン','Compare the direction of the longer strokes in ソ and ン.'],'ン':['ソ','Compare the longer strokes in ン and ソ.'],'は':['ほ','Compare the middle strokes of は and ほ.'],'ほ':['は','Compare the middle strokes of ほ and は.']});
const isKanaUnit=x=>x.id==='vowels'||x.id.startsWith('hiragana-')||x.id.startsWith('katakana-');
export function learnedKana(done){
 const completed=new Set(normalizeJapaneseFoundationDone(done)),seen=new Set(),out=[];
 for(const unit of JAPANESE_UNITS){
  if(!completed.has(unit.id))break;
  if(!isKanaUnit(unit))continue;
  for(const row of unit.rows)for(const item of row.items){
   if(!ALLOWED.has(item.kana)||seen.has(item.kana))continue;
   seen.add(item.kana);out.push({kana:item.kana,roman:item.roman,unitId:unit.id});
  }
 }
 return out;
}
export function normalizeKanaReviews(raw){
 const result=Object.create(null);
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return result;
 for(const [kana,item] of Object.entries(raw)){
  if(!ALLOWED.has(kana)||!item||typeof item!=='object'||Array.isArray(item))continue;
  if(!Number.isInteger(item.step)||item.step<0||item.step>KANA_REVIEW_DAYS.length)continue;
  if(!Number.isFinite(item.dueAt)||item.dueAt<0||item.dueAt>8640000000000000)continue;
  const attempts=Number.isInteger(item.attempts)&&item.attempts>=0&&item.attempts<=100000?item.attempts:0;
  const misses=Number.isInteger(item.misses)&&item.misses>=0&&item.misses<=attempts?item.misses:0;
  result[kana]={step:item.step,dueAt:item.dueAt,attempts,misses};
 }
 return result;
}
export function kanaReviewStatus(done,raw,now=Date.now()){
 const available=learnedKana(done),reviews=normalizeKanaReviews(raw);
 // New material is offered before revisiting a familiar row, then previously
 // missed readings and the oldest due cards are prioritized. Stable row order is
 // retained for ties. No changes to the persisted spaced-review format.
 const due=available.filter(x=>!reviews[x.kana]||reviews[x.kana].dueAt<=now)
  .sort((a,b)=>{
   const left=reviews[a.kana],right=reviews[b.kana];
   if(!left&&!right)return 0;
   if(!left)return -1;
   if(!right)return 1;
   return right.misses-left.misses||left.dueAt-right.dueAt;
  });
 const scheduled=available.filter(x=>reviews[x.kana]&&reviews[x.kana].dueAt>now);
 const practiced=available.filter(x=>(reviews[x.kana]?.attempts||0)>0).length;
 const newCount=due.filter(x=>!reviews[x.kana]).length;
 const weakCount=due.filter(x=>(reviews[x.kana]?.misses||0)>0).length;
 return {available,due,scheduled,practiced,newCount,weakCount,nextAt:scheduled.length?Math.min(...scheduled.map(x=>reviews[x.kana].dueAt)):null};
}
export function evaluateKanaReview(item,value){
 if(!item||!ALLOWED.has(item.kana)||!value||!String(value).trim())return {valid:false,correct:false};
 const normalize=s=>String(s).normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' ');
 return {valid:true,correct:normalize(value)===normalize(item.roman),expected:item.roman};
}
export function scheduleKanaReview(previous,correct,now=Date.now()){
 const p=previous&&typeof previous==='object'?previous:{};
 const old=Number.isInteger(p.step)&&p.step>=0&&p.step<=6?p.step:0;
 const step=correct?Math.min(old+1,6):0;
 const attempts=Number.isInteger(p.attempts)&&p.attempts>=0?p.attempts:0;
 const misses=Number.isInteger(p.misses)&&p.misses>=0?p.misses:0;
 return {step,dueAt:now+(correct?KANA_REVIEW_DAYS[step-1]*86400000:KANA_RETRY_MS),attempts:Math.min(attempts+1,100000),misses:Math.min(misses+Number(!correct),100000)};
}
export function kanaContrastNote(kana,available){
 const [other,note]=contrast[kana]||[];
 return other&&available.some(x=>x.kana===other)?note:'';
}
export function kanaReviewPanel({done=[],reviews={},feedback=null,now=Date.now()}={}){
 const st=kanaReviewStatus(done,reviews,now),item=st.due[0];
 if(!st.available.length)return '<section class="kana-review-panel" id="kana-review-panel"><span class="overline">OPTIONAL KANA RECALL</span><h2>Remember what you learn.</h2><p>Finish the first vowel lesson to unlock review cards. Nothing unfamiliar is tested.</p></section>';
 const response=feedback?.kana&&ALLOWED.has(feedback.kana)?
  '<div class="kana-review-feedback" role="status"><strong>'+(feedback.correct?'Remembered ✓':'Let’s review that sound')+'</strong><p><span lang="ja">'+safe(feedback.kana)+'</span> = '+safe(feedback.expected)+'. '+(feedback.correct?'Next review scheduled.':'Try again after a short break; this does not block learning.')+'</p>'+(feedback.memory?'<p>'+safe(feedback.memory)+'</p>':'')+'</div>':'';
 const card=item?'<div class="kana-review-card"><span class="overline">READ WITHOUT THE ROMAJI</span><strong class="kana-review-glyph" lang="ja">'+safe(item.kana)+'</strong><label for="kana-review-answer" class="field-label">What is this kana’s sound?</label><input type="text" id="kana-review-answer" maxlength="25" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type the romaji" /><div class="kana-review-actions"><button type="button" class="primary-button" data-action="kana-review-check">Check reading</button><button type="button" class="secondary-button" data-action="kana-review-reveal">Show answer & review later</button></div></div>':
  '<div class="kana-review-empty" role="status"><strong>Nothing due right now.</strong><p>Come back when the next review is scheduled. Existing lessons remain available.</p>'+(st.nextAt?'<small>Next due: '+safe(new Date(st.nextAt).toLocaleString())+'</small>':'')+'</div>';
 return '<section class="kana-review-panel" id="kana-review-panel" aria-label="Offline Japanese kana recall"><span class="overline">RECALL FROM MEMORY</span><h2>Remember what you learned.</h2><p>Optional review of <strong>completed kana only</strong>. New readings come first; then previously missed and older due cards. Mistakes are part of the process.</p><div class="kana-review-stats"><span><b>'+st.due.length+'</b> due</span><span><b>'+st.practiced+'</b> practised</span><span><b>'+st.newCount+'</b> new</span><span><b>'+st.available.length+'</b> unlocked</span></div>'+response+card+'<p class="fineprint">Private and offline. Correct readings return after 1, 3, 7, 14, 30 or 60 days; forgotten ones after 10 minutes. This does not measure pronunciation or fluency.</p></section>';
}
