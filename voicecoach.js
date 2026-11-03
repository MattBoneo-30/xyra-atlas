/** Local-only language TTS voice selection. Never silently pick a different language
 * or a potentially network-backed browser voice for purported offline audio.
 * This is synthetic speech, not reviewed reference pronunciation.
 */
export const LANGUAGE_SPEECH_RATES=Object.freeze([0.75,0.9,1]);
export const DEFAULT_LANGUAGE_SPEECH_RATE=0.9;
export function normalizeLanguageSpeechRate(value){
 const num=typeof value==='number'?value:typeof value==='string'&&value.trim()?Number(value):NaN;
 return LANGUAGE_SPEECH_RATES.includes(num)?num:DEFAULT_LANGUAGE_SPEECH_RATE;
}
function primary(lang){return typeof lang==='string'&&/^[a-z]{2,3}(?:[-_][a-z0-9]{2,8})*$/i.test(lang)?lang.replaceAll('_','-').toLowerCase().split('-')[0]:null;}
function normalized(lang){return typeof lang==='string'?lang.replaceAll('_','-').toLowerCase():'';}
export function matchingLanguageVoices(voices,locale,{localOnly=true}={}){
 const target=primary(locale);
 if(!target||!Array.isArray(voices))return [];
 return voices.filter(v=>v&&typeof v==='object'&&primary(v.lang)===target&&
  typeof v.voiceURI==='string'&&v.voiceURI.length>0&&v.voiceURI.length<=512&&
  typeof v.name==='string'&&v.name.length>0&&v.name.length<=200&&
  (!localOnly||v.localService===true)
 ).sort((a,b)=>{
  const exactA=normalized(a.lang)===normalized(locale)?0:1,exactB=normalized(b.lang)===normalized(locale)?0:1;
  return exactA-exactB||String(a.name).localeCompare(String(b.name));
 });
}
export function languageVoiceAvailability(voices,locale){
 const local=matchingLanguageVoices(voices,locale);
 const all=matchingLanguageVoices(voices,locale,{localOnly:false});
 return {local,remoteCount:all.length-local.length,
  status:local.length?'local':all.length?'remote-only':'unavailable'};
}
export function chooseOfflineLanguageVoice(voices,locale,selectedURI=''){
 const local=matchingLanguageVoices(voices,locale);
 return local.find(v=>v.voiceURI===selectedURI)||local[0]||null;
}
export function languageVoiceMessage(voices,locale,supported=true){
 if(!supported)return 'This browser does not support speech synthesis. Text practice is still available.';
 const info=languageVoiceAvailability(voices,locale);
 if(info.status==='local'){
  const chosen=info.local[0];
  return `Local ${chosen.lang} speech voice detected (${chosen.name}). Playback may vary by device and is not a pronunciation assessment.`;
 }
 if(info.status==='remote-only')return 'Only a potentially network-backed voice was detected for this language. Offline playback is disabled to avoid a misleading promise.';
 return 'No confirmed local speech voice detected for this language. Install a matching voice in your device settings, then reopen or refresh Atlas.';
}
