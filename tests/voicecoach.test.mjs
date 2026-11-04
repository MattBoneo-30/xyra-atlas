import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PHRASEBOOK} from '../phrasebook.js';
import {LANGUAGE_SPEECH_RATES,DEFAULT_LANGUAGE_SPEECH_RATE,normalizeLanguageSpeechRate,
 matchingLanguageVoices,languageVoiceAvailability,chooseOfflineLanguageVoice,
 languageVoiceMessage} from '../voicecoach.js';
const voice=(lang,name,localService=true,voiceURI=name)=>({lang,name,localService,voiceURI});
test('speech rates are bounded to three explicitly supported presets',()=>{
 assert.deepEqual([...LANGUAGE_SPEECH_RATES],[.75,.9,1]);
 for(const rate of [.75,.9,1])assert.equal(normalizeLanguageSpeechRate(String(rate)),rate);
 for(const bad of [-1,0,1.2,2,NaN,Infinity,{},[],null,undefined,'','90','0.8'])
  assert.equal(normalizeLanguageSpeechRate(bad),DEFAULT_LANGUAGE_SPEECH_RATE);
});
test('matching offline voices must declare localService=true and correct primary language',()=>{
 const voices=[
  voice('es-MX','Regional offline'),voice('en-US','Wrong language'),
  voice('es-ES','Network voice',false),
  voice('es-ES','Spanish offline'),voice('es-ES','Spanish offline B'),
  voice('xx','Malformed',true,'bad'),voice('de_DE','Different language')
 ];
 const local=matchingLanguageVoices(voices,'es-ES');
 assert.deepEqual(local.map(v=>v.name),['Spanish offline','Spanish offline B','Regional offline']);
 assert.equal(local.every(v=>v.localService===true),true);
 assert.equal(languageVoiceAvailability(voices,'es-ES').status,'local');
 assert.equal(languageVoiceAvailability(voices,'es-ES').remoteCount,1);
 assert.equal(chooseOfflineLanguageVoice(voices,'es-ES','Regional offline').lang,'es-MX');
 assert.equal(chooseOfflineLanguageVoice(voices,'es-ES','missing').name,'Spanish offline');
 assert.equal(chooseOfflineLanguageVoice(voices,'en-US').name,'Wrong language');
});

test('regional-only voices require deliberate opt-in before speech can start',()=>{
 const mexican=[voice('es-MX','Regional offline')];
 const status=languageVoiceAvailability(mexican,'es-ES');
 assert.equal(status.status,'regional-only');
 assert.equal(status.exact.length,0);
 assert.equal(status.regional.length,1);
 assert.equal(chooseOfflineLanguageVoice(mexican,'es-ES'),null);
 assert.match(languageVoiceMessage(mexican,'es-ES'),/Choose one yourself/);
 assert.equal(chooseOfflineLanguageVoice(mexican,'es-ES','Regional offline'),mexican[0]);
 assert.match(languageVoiceMessage(mexican,'es-ES',true,'Regional offline'),/You chose/);
 assert.equal(chooseOfflineLanguageVoice(mexican,'es-ES','missing'),null);
 const exact=[voice('es-ES','Spain offline'),...mexican];
 assert.equal(chooseOfflineLanguageVoice(exact,'es-ES').name,'Spain offline');
 assert.equal(chooseOfflineLanguageVoice(exact,'es-ES','Regional offline').name,'Regional offline');
 assert.equal(languageVoiceAvailability(exact,'es-ES').status,'local');
});
test('Filipino can explicitly choose an installed local Tagalog voice but never selects it silently',()=>{
 const tagalog=[voice('tl-PH','Tagalog on-device')];
 assert.equal(languageVoiceAvailability(tagalog,'fil-PH').status,'regional-only');
 assert.equal(chooseOfflineLanguageVoice(tagalog,'fil-PH'),null);
 assert.equal(chooseOfflineLanguageVoice(tagalog,'fil-PH','Tagalog on-device'),tagalog[0]);
 assert.equal(matchingLanguageVoices(tagalog,'en-US').length,0);
 assert.equal(matchingLanguageVoices([voice('tl-PH','Cloud',false)],'fil-PH').length,0);
});

test('remote-only and unsupported voices never become offline audio',()=>{
 const remote=[voice('ja-JP','Remote Japanese',false)];
 assert.equal(languageVoiceAvailability(remote,'ja-JP').status,'remote-only');
 assert.equal(chooseOfflineLanguageVoice(remote,'ja-JP'),null);
 assert.match(languageVoiceMessage(remote,'ja-JP'),/network-backed/);
 assert.equal(languageVoiceAvailability([], 'ja-JP').status,'unavailable');
 assert.match(languageVoiceMessage([], 'ja-JP'),/No confirmed local/);
 assert.match(languageVoiceMessage(remote,'ja-JP',false),/does not support/);
 assert.equal(chooseOfflineLanguageVoice([{lang:'ja-JP',name:'unknown',voiceURI:'v'}],'ja-JP'),null);
 assert.deepEqual(matchingLanguageVoices([voice('en-US','English')],'fil-PH'),[]);
 assert.deepEqual(matchingLanguageVoices(null,'es-ES'),[]);
 assert.deepEqual(matchingLanguageVoices([voice('es-ES','Spanish')],'invalid!',{localOnly:false}),[]);
});
test('each authored starter language can match a suitable hypothetical local voice',()=>{
 for(const [code,pack] of Object.entries(PHRASEBOOK)){
  const voices=[voice(pack.locale,'Local '+code)];
  assert.equal(chooseOfflineLanguageVoice(voices,pack.locale)?.lang,pack.locale);
  assert.match(languageVoiceMessage(voices,pack.locale),/Local /);
 }
});
test('audio integration uses the voice gate, local TTS and safe state restoration',()=>{
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),
  build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/from '\.\/voicecoach\.js'/);
 assert.match(app,/languageSpeechRate:normalizeLanguageSpeechRate\(data\.languageSpeechRate\)/);
 assert.match(app,/languageSpeechRate:normalizeLanguageSpeechRate\(clean\.languageSpeechRate\)/);
 assert.match(app,/chooseOfflineLanguageVoice\(/);
 assert.match(app,/voice\.localService===true|chooseOfflineLanguageVoice/);
 assert.match(app,/data-action="language-speak"|,'language-speak'/);
 assert.match(sw,/\/voicecoach\.js/);
 assert.match(build,/'voicecoach\.js'/);
});
