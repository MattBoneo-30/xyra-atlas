/** Local-only language TTS voice selection. Never silently pick a different language
 * or a potentially network-backed browser voice for purported offline audio.
 * This is synthetic speech, not reviewed reference pronunciation.
 */
export const LANGUAGE_SPEECH_RATES=Object.freeze([0.75,0.9,1]);
// Filipino/Tagalog can share installed device voices, but cross-locale playback
// must remain a deliberate user choice, never an automatic pronunciation claim.
const relatedLanguage=(actual,target)=>actual===target||(target==='fil'&&actual==='tl');
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
 return voices.filter(v=>v&&typeof v==='object'&&relatedLanguage(primary(v.lang),target)&&
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
 const exact=local.filter(v=>normalized(v.lang)===normalized(locale));
 const all=matchingLanguageVoices(voices,locale,{localOnly:false});
 return {local,exact,regional:local.filter(v=>normalized(v.lang)!==normalized(locale)),
  remoteCount:all.length-local.length,
  status:exact.length?'local':local.length?'regional-only':all.length?'remote-only':'unavailable'};
}
export function chooseOfflineLanguageVoice(voices,locale,selectedURI=''){
 const local=matchingLanguageVoices(voices,locale);
 // An explicit selection opts into a different region/dialect; otherwise only
 // an exact locale is started automatically. Never use cloud-backed voices.
 return local.find(v=>v.voiceURI===selectedURI)||
  local.find(v=>normalized(v.lang)===normalized(locale))||null;
}
export function languageVoiceMessage(voices,locale,supported=true,selectedURI=''){
 if(!supported)return 'This browser does not support speech synthesis. Text practice is still available.';
 const info=languageVoiceAvailability(voices,locale);
 const selected=selectedURI?info.local.find(v=>v.voiceURI===selectedURI):null;
 if(selected&&normalized(selected.lang)!==normalized(locale))
  return `You chose a local ${selected.lang} regional voice (${selected.name}) for ${locale}. Accents and pronunciation may differ. This is synthetic speech, not teacher-verified audio.`;
 if(info.status==='local'){
  const voice=selected||info.exact[0];
  return `Local ${voice.lang} speech voice detected (${voice.name}). Playback may vary by device and is not a pronunciation assessment.`;
 }
 if(info.status==='regional-only'){
  const region=info.local.map(v=>v.lang).filter((x,i,all)=>all.indexOf(x)===i).join(', ');
  return `Only local regional voice(s) ${region} found for ${locale}. Choose one yourself to opt into potentially different pronunciation. Speech remains synthetic and unverified.`;
 }
 if(info.status==='remote-only')
  return 'Only a potentially network-backed voice was detected for this language. Offline playback is disabled to avoid a misleading promise.';
 return 'No confirmed local speech voice detected for this language. Install a matching voice in your device settings, then reopen or refresh Atlas.';
}
