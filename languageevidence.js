/**
 * Xyra Atlas — real-world language evidence missions.
 * One original transfer-and-verification brief for every existing language.
 * Uses the exact source phrases already authored for each pack; creates NO
 * additional target-language translations or unverifiable fluency claims.
 * Every case awaits independent qualified native/regional language review.
 */
const raw={
 en:['The courteous interruption','A traveller recognizes the station question in print but receives an unfamiliar spoken direction over a noisy announcement. They know the English word “station” yet cannot identify a platform number.',
  'Role-play a first question, a request for repetition and a confirmation of one location detail. Ask the other speaker to change the direction on a second attempt. Record whether the information was actually understood, not just whether you pronounced the original request.',
  'Check whether a listener can independently follow your request and whether you can restate the destination accurately; ask for a second speaker or a recorded sample with permission.'],
 ja:['Polite phrases outside the textbook','The learner can read the model station question after completing kana, but a station employee responds using rapid connected speech and a word outside the taught phrase inventory.',
  'Without inventing conjugations, practise reading the authored question, using the authored repetition request, and confirming a written station name. Identify the point at which the learner needs native-checked polite repair phrases or additional vocabulary.',
  'A qualified Japanese reviewer must check honorific suitability, naturalness, reading accuracy and the spoken comprehension task. Kana recall alone is not a Japanese speaking qualification.'],
 ko:['Register under unexpected contact','A learner memorizes a polite Korean request but does not know whether its form suits older adults, peers and unfamiliar transit staff, and cannot understand a reply given quickly.',
  'Create two distinct social scenarios, retain the existing authored model for the unfamiliar-staff context, and list which address or ending differences must be verified by a qualified speaker before adapting the line.',
  'Have a fluent regional speaker assess appropriateness and an unscripted clarification exchange separately; hearing an installed TTS voice cannot validate production.'],
 es:['Same language, different travel context','A traveller reads a familiar location question in Spanish but meets speakers with regional vocabulary, accents and different expectations of formality. The learner treats a memorized textbook phrase as universally natural.',
  'Write a comparison plan for two Spanish-speaking regions without inventing new translations. Practise the existing question and repetition request, note one unfamiliar expression in a genuine reply, and seek a region-specific explanation.',
  'Verify local vocabulary, address form and authentic listening comprehension with a qualified regional speaker; distinguish country-specific conventions from universal rules.'],
 fr:['Written correctness and fast conversation','A written French phrase is recognizable to the learner. In ordinary speech, the answer is faster and more reduced than the written example, so the learner misses a location detail.',
  'Use the source question, then a clarification and a written landmark confirmation. Ask a qualified speaker to provide two naturally spoken replies with different directions and record which one was understood on the first attempt.',
  'Evaluate whether listening succeeds with novel speech, not only whether the learner reads the printed line. Check appropriate formality before use.'],
 zh:['Characters are not a tone assessment','A beginner recognizes several Mandarin characters and their printed pinyin but uses the English gloss to guess how the spoken phrase should sound. A real reply introduces unfamiliar tones and a place name.',
  'Present the existing station phrase with characters and, if available, approved audio. Ask the learner to identify what information is missing, seek repetition, and verify the written destination without pretending accurate tones or unscripted comprehension.',
  'Require an appropriate Mandarin-speaking reviewer for tone, regional usage and spoken exchanges. A visual character test cannot certify phonetic accuracy.'],
 de:['Formal address in practical service','The learner knows a formal German station question but assumes any alternative way of addressing someone will be just as suitable, regardless of familiarity or institutional setting.',
  'Rehearse the original polite request to an unfamiliar staff member, followed by a missed-answer repair. Describe which pronoun and register changes require expert checking before attempting the same conversation with a close friend.',
  'Verify Sie/du context with an experienced German speaker and test comprehension against at least two different spoken responses rather than printed prompt memory.'],
 ar:['Modern Standard and local speech differ','A learner recognizes the Arabic-script phrase pack but meets a speaker using a regional dialect and social forms that may not match Modern Standard Arabic examples.',
  'Choose a target region before rehearsing the authored phrase. Prepare a short request, a clarification strategy and a request for written directions. List three uncertainties a regional speaker must resolve before the phrase is used in a consequential situation.',
  'A qualified dialect-specific reviewer must verify register, script, spoken form and naturalness. A single pan-Arabic translation cannot demonstrate local conversational competence.'],
 fil:['Politeness without treating regions as one','A learner recognizes Filipino phrases containing respectful wording, then assumes the same form can simply be imposed on every Philippine language, age group and relationship.',
  'Practise the authored Filipino location and repetition phrases in two realistic service contexts. State where a regional language, relationship or respectful address may change the expected phrasing, and do not improvise another language’s translation.',
  'Ask a qualified Filipino or local-language reviewer to evaluate appropriateness in the target setting and verify the listener’s response independently.'],
 it:['Public-service formality and follow-up','The learner can read the Italian transit question but is unsure how to adapt formal requests across strangers and friends and cannot react to unfamiliar spoken directions.',
  'Use the source model with a fictional station employee, then arrange a second prompt where the reply changes unexpectedly. Note where an expert must check polite address and which spoken information remains unclear.',
  'A native/regional reviewer should evaluate formal register and spontaneous directions, not only a copied written sentence.'],
 pt:['Regional variant matters from the start','The available starter phrase inventory uses European Portuguese. A learner travels to Brazil and assumes identical phrasing and pronunciation can be inferred without hearing local speech.',
  'Label the existing model as the variety provided, avoid guessing Brazilian equivalents, and plan a region-verified rehearsal of a question, repetition request and price check using authentic examples.',
  'Have a reviewer from the intended region check pronunciation, naturalness and lexical choices; treat broad mutual intelligibility as distinct from verified local usage.'],
 hi:['Script familiarity is not conversation','A learner copies the Devanagari model correctly but cannot independently interpret a response, and mistakes a memorized respectful request for mastery of politeness and grammatical agreement.',
  'Practise reading the authored request, then ask a qualified speaker to provide a different answer without an English gloss. Record which details were understood and which parts require further work on script, register or agreement.',
  'A qualified Hindi reviewer should verify the respectful address, transcription and conversational follow-up before a proficiency claim is made.'],
 th:['Tone and social setting under pressure','The traveller can identify Thai characters in a prepared phrase but has not verified tone production, suitable polite forms or comprehension of spoken station directions.',
  'Use a written destination as the shared reference, attempt the existing location request, and identify the exact moment when a repetition or written clarification is needed. Do not infer the speaker’s comfort from a memorized English translation.',
  'Request independent qualified Thai-speaker review of tonal accuracy, social particles and the naturalness of repair language. Text alone cannot grade pronunciation.'],
 vi:['Regional pronunciation changes the listening task','A phrase is familiar in written Vietnamese, but the learner does not understand a speaker from a different region and assumes tone marks guarantee accurate spoken production.',
  'Use the authored source text and a written station name, then obtain two authentic short replies from a target-region reviewer. Compare what the learner can understand before and after an explicit clarification.',
  'A qualified Vietnamese reviewer must verify tonal and regional usage; reading diacritics does not establish independent listening or speaking ability.'],
 id:['Respectful forms for a real audience','The learner recognizes an Indonesian travel phrase but has not considered whether their chosen address and register suit an unfamiliar adult, a colleague or a friend.',
  'Practise the exact authored service question and repetition request, then describe two social settings where a qualified reviewer should assess formality. Ask for an unscripted location reply and confirm one actionable detail.',
  'Use a native/regional speaker to check register, pronoun choice and understanding; avoid translating English pronouns into Indonesian automatically.'],
 ru:['Cases and listening beyond a single model','A learner recognizes a Russian station question but assumes new sentences can be safely formed by swapping English word equivalents while keeping endings unchanged.',
  'Rehearse the complete verified model, then request clarification after an unfamiliar answer. Document any proposed new noun or preposition as needing qualified case-form and stress review before using it.',
  'Native/regional review should inspect grammar, word stress and actual listening comprehension. A memorized phrase cannot establish independent case formation.'],
 tr:['Suffix changes hide inside new requests','A learner can repeat a complete Turkish question but tries to improvise a different destination by replacing English vocabulary and attaching an unfamiliar suffix.',
  'Keep the existing authored question intact for the first rehearsal, then identify one proposed substitution that requires expert suffix, vowel-harmony and register verification. Practise handling a reply that provides an unexpected landmark.',
  'Ask a qualified Turkish reviewer to check the constructed form and the meaning obtained from an unprompted answer; do not grant correctness from an English gloss alone.'],
 nl:['Question word order in changing contexts','The learner can read a Dutch location question but then tries to convert an unrelated English statement to a question without checking verb placement.',
  'Review the authored question as a complete unit. Request an independently verified contrasting question from a fluent speaker and explain what changed. Practise asking for repetition when a new spoken direction is unclear.',
  'Check verb placement, pronunciation and genuine comprehension using native-reviewed contexts instead of extrapolating a universal word order from one phrase.'],
 sv:['A printed phrase cannot teach sentence melody','A learner recognizes a Swedish model in writing but cannot distinguish a rapid spoken answer or reliably reproduce the rhythm and sounds of the question.',
  'Use the authored station question, attempt clarification, then practise with two authentic regional responses. Describe what written recall demonstrates versus what a listener must judge in live interaction.',
  'A fluent Swedish reviewer should check prosody, word order, regional form and comprehension. Device speech synthesis is not a validated speaking exam.'],
 el:['Written accents versus spoken understanding','The learner identifies the Greek script of a station question but has not practised hearing new replies and assumes a familiar English translation is enough to construct inflected Greek phrases.',
  'Rehearse the complete authored question, ask for a slower reply, and verify a written landmark. Note which novel inflected forms need independent language review before being introduced as correct examples.',
  'Seek qualified Greek review of stress, morphology and real-time understanding. Transcribing a memorized line is not evidence of spontaneous fluency.']
};
export const LANGUAGE_EVIDENCE_MISSIONS=Object.freeze(Object.fromEntries(Object.entries(raw).map(([code,[title,problem,task,verification]])=>[code,Object.freeze({title,problem,task,verification,reviewStatus:'awaiting-qualified-language-review'})])));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function validateLanguageEvidence(codes){
 if(!Array.isArray(codes)||codes.length!==20||new Set(codes).size!==20||
    codes.some(code=>!Object.hasOwn(LANGUAGE_EVIDENCE_MISSIONS,code)))throw Error('All twenty language evidence missions required');
 for(const code of codes){
  const item=LANGUAGE_EVIDENCE_MISSIONS[code];
  if(!item||item.title.length<25||item.problem.length<85||item.task.length<90||item.verification.length<85)
   throw Error('Insufficient authentic language exercise: '+code);
 }
 return 20;
}
export function languageEvidencePanel(code,pack,{unlocked=true}={}){
 const item=LANGUAGE_EVIDENCE_MISSIONS[code];
 if(!item||!pack||!Array.isArray(pack.phrases)||pack.phrases.length<7)return '';
 const intro='<section id="language-evidence" class="language-evidence" aria-label="Independent language transfer verification">'+
  '<span class="overline">TRANSFER MISSION · REAL-WORLD VERIFICATION</span><h2>'+esc(item.title)+'</h2>';
 if(!unlocked)return intro+'<p>Finish the Japanese kana and first-sentences foundation before beginning conversation transfer.</p></section>';
 const phrases=[3,4,5,6].map(i=>pack.phrases[i]);
 return intro+'<p>'+esc(item.problem)+'</p>'+
  '<h3>Independent communication challenge</h3><p>'+esc(item.task)+'</p>'+
  '<details><summary>Reveal existing authored phrases to check your recall</summary><ul>'+
   phrases.map(p=>'<li><strong>'+esc(p.english)+'</strong> <span lang="'+esc(pack.locale)+'" dir="auto">'+esc(p.target)+'</span></li>').join('')+
   '</ul></details><h3>What would count as stronger evidence?</h3><p>'+esc(item.verification)+'</p>'+
  '<p class="fineprint">Text-only practice, without a listening or pronunciation score. Authored contextual advice and target phrases await independent qualified native/regional review.</p></section>';
}
