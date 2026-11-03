import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {LANGUAGES} from '../data.js';
import {PHRASEBOOK,getPhrasePack,sanitizePhraseProgress} from '../phrasebook.js';
import {createConversationQuest,currentConversationQuestion,answerConversationQuestion,advanceConversationQuest,conversationQuestResults,CONVERSATION_QUESTS} from '../conversationquest.js';
import {createLanguageChallenge,currentLanguageQuestion,answerLanguageChallenge,advanceLanguageChallenge,languageChallengeResults} from '../languagechallenge.js';
import {chooseOfflineLanguageVoice} from '../voicecoach.js';

const newCodes=['ar','pt','hi','th','vi','id','ru','tr','nl','sv','el'];
test('all twenty selectable languages have complete, distinct offline phrase data',()=>{
 assert.equal(LANGUAGES.length,20);
 assert.equal(Object.keys(PHRASEBOOK).length,20);
 assert.deepEqual(new Set(Object.keys(PHRASEBOOK)),new Set(LANGUAGES.map(l=>l.code)));
 for(const [code,pack] of Object.entries(PHRASEBOOK)){
  assert.match(pack.locale,/^[a-z]{2,3}-[A-Z]{2}$/);
  assert.equal(pack.phrases.length,8,code);
  assert.equal(new Set(pack.phrases.map(p=>p.target)).size,8,code+' repeated phrase');
  assert.deepEqual(pack.phrases.map(p=>p.id),['1','2','3','4','5','6','7','8']);
  for(const phrase of pack.phrases){
   assert.equal(typeof phrase.english,'string');
   assert.ok(phrase.target.trim().length>1,code+' has meaningful target text');
   assert.ok(!/[<>]/.test(phrase.target),code+' has no markup');
  }
  const voice={lang:pack.locale,localService:true,voiceURI:'test-local',name:'Test Voice'};
  assert.equal(chooseOfflineLanguageVoice([voice],pack.locale),voice);
 }
 assert.equal(Object.values(PHRASEBOOK).reduce((sum,p)=>sum+p.phrases.length,0),160);
 assert.equal(getPhrasePack('ar').note.includes('Modern Standard Arabic'),true);
 assert.equal(getPhrasePack('pt').note.includes('obrigada'),true);
});
test('every expanded pack completes 3 situation quests and a two-way challenge',()=>{
 for(const code of newCodes){
  for(const quest of CONVERSATION_QUESTS){
   let run=createConversationQuest(PHRASEBOOK,code,{questId:quest.id,seed:103,now:1750000000000});
   assert.ok(run,code+' '+quest.id);
   for(let i=0;i<5;i++){
    const question=currentConversationQuestion(run,PHRASEBOOK);
    assert.equal(question.options.length,4);
    run=advanceConversationQuest(answerConversationQuestion(run,question.phraseId,PHRASEBOOK),PHRASEBOOK);
   }
   assert.equal(conversationQuestResults(run,PHRASEBOOK).correct,5,code);
  }
  for(const mode of ['recognition','meaning']){
   let run=createLanguageChallenge(PHRASEBOOK,code,{mode,seed:300,now:1750000000000});
   for(let i=0;i<8;i++){
    const question=currentLanguageQuestion(run,PHRASEBOOK);
    assert.ok(question.options.some(x=>x.id===question.correctId));
    run=advanceLanguageChallenge(answerLanguageChallenge(run,question.correctId,PHRASEBOOK),PHRASEBOOK);
   }
   assert.equal(languageChallengeResults(run,PHRASEBOOK).correct,8,code+' '+mode);
  }
 }
 assert.deepEqual(sanitizePhraseProgress({ar:['1','2','2','99'],hi:['8'],ru:['3'],unknown:['1']}),{ar:['1','2'],hi:['8'],ru:['3']});
});
test('expanded language content and right-to-left rendering ship offline',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 assert.match(app,/language-region-note/);
 assert.match(app,/lang="\$\{esc\(pack\.locale\)\}" dir="auto"/);
 assert.match(sw,/\/phrasebook\.js/);
 assert.match(sw,/const CACHE = CACHE_PREFIX \+ 'v[0-9]+'/);
});
