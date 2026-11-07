/** Reviewer handoff for the exact 160 authored starter phrases.
 * This exports public course material, never user progress, recording or voice data.
 * No automated translation verification, synthesized "native" score, or credentials.
 */
import {createHash} from 'node:crypto';
import {LANGUAGE_STARTER_PATHS} from '../languagestarterpaths.js';
import {LANGUAGE_LITERACY_CHECKS} from '../languageliteracy.js';
import {SENTENCE_BRIDGES} from '../sentencebridges.js';
const reviewCriteria=Object.freeze([
 'Translation expresses the intended meaning accurately in this locale.',
 'Register and politeness are appropriate for the stated everyday scenario.',
 'Gender, number, age, address forms and regional variants are documented.',
 'Script, diacritics, transliteration and approximate pronunciation are correct.',
 'If a real pronunciation reference is supplied, its origin and reuse rights are verified.',
 'Ambiguous, unnatural or potentially unsafe wording is identified for correction.'
]);
const good=x=>typeof x==='string'&&x.trim().length>0;
export function languagePhraseHash(value){
 return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}
export function buildLanguageReviewPacket(packs,languages){
 if(!packs||typeof packs!=='object'||Array.isArray(packs)||!Array.isArray(languages))
  throw Error('Invalid language course inventory');
 const names=new Map(languages.map(item=>[item.code,item.name]));
 const records=[],summary=[];
 for(const [code,pack] of Object.entries(packs)){
  if(!names.has(code)||!good(pack?.locale)||!Array.isArray(pack.phrases))
   throw Error('Invalid locale data for '+code);
  const ids=new Set();
  for(const phrase of pack.phrases){
   if(!good(phrase.id)||ids.has(phrase.id)||!good(phrase.english)||!good(phrase.target))
    throw Error('Incomplete or duplicate phrase in '+code);
   ids.add(phrase.id);
   const content={code,language:names.get(code),locale:pack.locale,
    phraseId:phrase.id,intendedMeaning:phrase.english,translation:phrase.target,
    approximateRomanization:phrase.pronunciation||'',
    editorialRegionalNote:pack.note||''};
   records.push({id:code+':'+phrase.id,contentHash:languagePhraseHash(content),
    content,reviewStatus:'awaiting-qualified-language-review',reviewerAttestation:null,
    reviewCriteria});
  }
  summary.push({code,language:names.get(code),locale:pack.locale,
   phraseCount:pack.phrases.length,verifiedPhrases:0,regionalNote:pack.note||''});
 }
 const foundations=Object.entries(LANGUAGE_STARTER_PATHS)
  .filter(([code])=>names.has(code)&&Object.hasOwn(packs,code))
  .map(([code,guide])=>{
  const content={code,language:names.get(code),locale:packs[code].locale,
   writing:guide.writing,sound:guide.sound,pattern:guide.pattern,
   context:guide.context,limitations:guide.avoid};
  return {id:'foundation:'+code,contentHash:languagePhraseHash(content),
   content,reviewStatus:'awaiting-qualified-language-review',
   reviewerAttestation:null,reviewCriteria};
 });
 const literacyChecks=Object.entries(LANGUAGE_LITERACY_CHECKS)
  .filter(([code])=>names.has(code)&&Object.hasOwn(packs,code))
  .flatMap(([code,checks])=>checks.map((check,index)=>{
   const content={code,language:names.get(code),locale:packs[code].locale,
    item:index+1,title:check.title,question:check.question,
    choices:[...check.choices],correct:check.correct,
    explanation:check.why,independentTask:check.try};
   return {id:'literacy:'+code+':'+(index+1),content,
    contentHash:languagePhraseHash(content),reviewStatus:'awaiting-qualified-language-review',
    reviewerAttestation:null,reviewCriteria};
  }));
 const sentenceBridges=Object.entries(SENTENCE_BRIDGES)
  .filter(([code])=>names.has(code)&&Object.hasOwn(packs,code)&&
    Array.isArray(packs[code]?.phrases)&&packs[code].phrases.length>=6)
  .flatMap(([code,guide])=>['question','negative'].map((kind,index)=>{
   const unit=guide[kind];
   const phrase=packs[code].phrases[index===0?4:5];
   const content={code,language:names.get(code),locale:packs[code].locale,
    kind,sourcePhraseId:phrase.id,sourcePhrase:phrase.target,
    title:unit.title,principle:unit.principle,workedAnnotation:unit.notice,
    limits:unit.contrast,independentTask:unit.task,
    choices:[...unit.check],correct:unit.answer};
   return {id:'sentence:'+code+':'+kind,content,
    contentHash:languagePhraseHash(content),reviewStatus:'awaiting-qualified-language-review',
    reviewerAttestation:null,reviewCriteria};
  }));
 return {schemaVersion:1,status:'native-or-qualified-editor-review-required',foundations,literacyChecks,sentenceBridges,
  summary:{languages:summary.length,phrases:records.length,qualifiedApprovedPhrases:0},
  languages:summary,records,notes:[
  'A phrase may be grammatical but inappropriate or unnatural in a specific region or situation.',
  'Any romanization is an approximation and device TTS is not independently certified pronunciation.',
  'A SHA-256 digest detects later changes; it does not establish reviewer competence or linguistic accuracy.',
  'No language stage gate may be completed solely from generated source inventory.'
  ]};
}
const mdEscape=x=>String(x??'').replaceAll('|','\\|').replace(/[\r\n]+/g,' ').replace(/</g,'&lt;');
export function renderLanguageReviewMarkdown(packet){
 if(!packet||packet.status!=='native-or-qualified-editor-review-required')throw Error('Invalid language reviewer packet');
 const chunks=['# Xyra Atlas — Independent Language Review Workbook','',
 '**Status: No independent language signoffs have been provided.** This document contains authored source text only, not proof of fluency or pronunciation accuracy.','',
 'Validate context, register, regional usage, script, transliteration and a documented audio source if relevant. The English gloss is only a prompt; it is not the sole acceptable target expression.','',
 'Reviewer fields (to be completed externally after real review): reviewer name and verified qualifications; locale and dialect; review date; evidence used; suggested corrections; approval decision; source hash. Do not invent or auto-populate these fields.',''];
 for(const lang of packet.languages){
  const items=packet.records.filter(row=>row.content.code===lang.code);
  chunks.push('## '+mdEscape(lang.language)+' — '+mdEscape(lang.locale),'',
   'Regional caveat: '+mdEscape(lang.regionalNote||'No additional regional note is currently provided; native editor should identify necessary qualifications.'),'',
   '| ID | Intended meaning | Authored phrase | Approx. romanization | Hash | Reviewer result |',
   '|---|---|---|---|---|---|');
  for(const row of items){
   const c=row.content;
   chunks.push('| '+mdEscape(c.phraseId)+' | '+mdEscape(c.intendedMeaning)+' | '+mdEscape(c.translation)+
    ' | '+mdEscape(c.approximateRomanization||'Not provided')+
    ' | '+mdEscape(row.contentHash)+' | **Unreviewed** |');
  }
  const foundation=packet.foundations?.find(item=>item.content.code===lang.code);
  if(foundation){
   chunks.push('','### Guided foundation — requires independent review','',
    'Writing: '+mdEscape(foundation.content.writing),
    'Sound: '+mdEscape(foundation.content.sound),
    'Meaning and structure: '+mdEscape(foundation.content.pattern),
    'Communication: '+mdEscape(foundation.content.context),
    'Limitations: '+mdEscape(foundation.content.limitations),
    'Foundation content hash: '+mdEscape(foundation.contentHash),
    '**Status: Unreviewed**. The guide is not a complete A1 curriculum or a verified pronunciation reference.','');
  }
  const literacy=packet.literacyChecks?.filter(item=>item.content.code===lang.code)||[];
  if(literacy.length){
   chunks.push('','### Literacy pattern checks — qualified review pending','');
   for(const item of literacy){
    chunks.push('#### '+mdEscape(item.content.title),'',
     'Prompt: '+mdEscape(item.content.question),
     'Options: '+item.content.choices.map(mdEscape).join(' / '),
     'Authored answer index: '+String(item.content.correct),
     'Explanation: '+mdEscape(item.content.explanation),
     'Independent transfer practice: '+mdEscape(item.content.independentTask),
     'Exact item hash: '+mdEscape(item.contentHash),
     '**Status: Unreviewed; not a speech or language-level assessment.**','');
   }
  }
  const grammar=packet.sentenceBridges?.filter(item=>item.content.code===lang.code)||[];
  if(grammar.length){
   chunks.push('','### Sequential sentence structure — qualified review pending','');
   for(const item of grammar){
    const c=item.content;
    chunks.push('#### '+mdEscape(c.title),'',
     'Authored model phrase ('+mdEscape(c.sourcePhraseId)+'): '+mdEscape(c.sourcePhrase),
     'Teaching principle: '+mdEscape(c.principle),
     'Worked grammar annotation: '+mdEscape(c.workedAnnotation),
     'Limitations and exceptions: '+mdEscape(c.limits),
     'Independent production task: '+mdEscape(c.independentTask),
     'Choices: '+c.choices.map(mdEscape).join(' / '),
     'Expected response index: '+String(c.correct),
     'Exact content hash: '+mdEscape(item.contentHash),
     '**Status: Unreviewed.** Grammar, morphology and regional forms require a qualified reviewer.','');
   }
  }
  chunks.push('', 'Editorial questions:',...reviewCriteria.map(x=>'- [ ] '+x),'',
   'Evidence of independent human approval: **not supplied**.','');
 }
 return chunks.join('\n')+'\n';
}
