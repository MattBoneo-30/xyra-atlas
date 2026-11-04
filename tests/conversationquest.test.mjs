import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PHRASEBOOK} from '../phrasebook.js';
import {CONVERSATION_QUESTS,CONVERSATION_QUEST_VERSION,createConversationQuest,normalizeConversationQuest,
 currentConversationQuestion,answerConversationQuestion,advanceConversationQuest,
 conversationQuestResults,normalizeConversationQuestHistory,recordConversationQuestHistory} from '../conversationquest.js';
const date=1730000000000;
function finish(code='ja',questId='directions',{wrongFirst=false}={}){
 let session=createConversationQuest(PHRASEBOOK,code,{questId,seed:18,now:date});
 while(session.position<CONVERSATION_QUESTS.find(q=>q.id===questId).steps.length){
  const question=currentConversationQuestion(session,PHRASEBOOK);
  const chosen=wrongFirst&&session.position===0?question.options.find(x=>x.id!==question.phraseId).id:question.phraseId;
  session=advanceConversationQuest(answerConversationQuestion(session,chosen,PHRASEBOOK),PHRASEBOOK);
 }
 return session;
}
test('three distinct five-turn context sequences work for every authored starter language',()=>{
 assert.equal(CONVERSATION_QUEST_VERSION,1);
 assert.equal(CONVERSATION_QUESTS.length,3);
 assert.deepEqual(CONVERSATION_QUESTS.map(q=>q.id),['directions','market','meeting']);
 for(const [code,pack] of Object.entries(PHRASEBOOK)){
  for(const quest of CONVERSATION_QUESTS){
   assert.equal(quest.steps.length,5);
   const a=createConversationQuest(PHRASEBOOK,code,{questId:quest.id,seed:14,now:date});
   const b=createConversationQuest(PHRASEBOOK,code,{questId:quest.id,seed:14,now:date});
   assert.deepEqual(a,b);
   assert.deepEqual(normalizeConversationQuest(a,PHRASEBOOK),a);
   let session=a;
   while(session.position<5){
    const question=currentConversationQuestion(session,PHRASEBOOK),phrase=pack.phrases.find(x=>x.id===question.phraseId);
    assert.ok(question.cue.length>=20);
    assert.equal(question.target,phrase.target,'never invent a translation in situational practice');
    assert.equal(question.english,phrase.english);
    assert.equal(question.locale,pack.locale);
    assert.equal(question.options.length,4);
    assert.equal(new Set(question.options.map(x=>x.id)).size,4);
    assert.ok(question.options.some(x=>x.id===question.phraseId));
    session=advanceConversationQuest(answerConversationQuestion(session,question.phraseId,PHRASEBOOK),PHRASEBOOK);
   }
   assert.equal(conversationQuestResults(session,PHRASEBOOK).correct,5);
   assert.deepEqual(conversationQuestResults(session,PHRASEBOOK).entries.map(e=>e.phraseId),quest.steps.map(s=>s.phraseId));
   assert.equal(conversationQuestResults(session,PHRASEBOOK).done,true);
  }
 }
});
test('choices cannot be skipped, rewritten, faked or selected outside four visible options',()=>{
 let s=createConversationQuest(PHRASEBOOK,'fil',{questId:'market',seed:8,now:date});
 const first=currentConversationQuestion(s,PHRASEBOOK);
 assert.deepEqual(advanceConversationQuest(s,PHRASEBOOK),s);
 assert.deepEqual(answerConversationQuestion(s,'nonsense',PHRASEBOOK),s);
 const wrong=first.options.find(o=>o.id!==first.phraseId).id;
 s=answerConversationQuestion(s,wrong,PHRASEBOOK);
 assert.equal(conversationQuestResults(s,PHRASEBOOK).correct,0);
 assert.equal(answerConversationQuestion(s,first.phraseId,PHRASEBOOK).answers[0],wrong);
 assert.equal(advanceConversationQuest(s,PHRASEBOOK).position,1);
 const advanced=advanceConversationQuest(s,PHRASEBOOK);
 assert.deepEqual(advanced,advanceConversationQuest(advanced,PHRASEBOOK));
 assert.equal(normalizeConversationQuest({...advanced,position:4},PHRASEBOOK),null);
 assert.equal(normalizeConversationQuest({...advanced,answers:{'0':'invalid'}},PHRASEBOOK),null);
 assert.equal(normalizeConversationQuest({...advanced,answers:{'0':wrong,'1':'no-choice'}},PHRASEBOOK),null);
 assert.equal(normalizeConversationQuest({...advanced,questId:'fake'},PHRASEBOOK),null);
 assert.equal(normalizeConversationQuest({...advanced,seed:NaN},PHRASEBOOK),null);
 assert.equal(normalizeConversationQuest({...advanced,code:'shadow'},PHRASEBOOK),null);
 assert.equal(createConversationQuest(PHRASEBOOK,'ja',{questId:'fake'}),null);
 assert.equal(createConversationQuest(PHRASEBOOK,'ja',{seed:Infinity}),null);
});
test('completed quest history is per language and quest, sanitized, and idempotent',()=>{
 const first=finish('ja','directions',{wrongFirst:true});
 let history=recordConversationQuestHistory({},first,PHRASEBOOK);
 assert.equal(history.ja.directions.attempts,1);
 assert.equal(history.ja.directions.best,4);
 assert.equal(history.ja.directions.last,4);
 history=recordConversationQuestHistory(history,first,PHRASEBOOK);
 assert.equal(history.ja.directions.attempts,1);
 const second=finish('ko','market');
 history=recordConversationQuestHistory(history,second,PHRASEBOOK);
 assert.equal(history.ko.market.best,5);
 assert.equal(history.ja.directions.best,4);
 assert.deepEqual(normalizeConversationQuestHistory(JSON.parse(JSON.stringify(history)),PHRASEBOOK),history);
 const tampered=structuredClone(history);
 tampered.ja.meeting={attempts:5,best:12,last:12,lastStartedAt:date};
 tampered.fake={directions:{attempts:1,best:0,last:0,lastStartedAt:date}};
 assert.deepEqual(normalizeConversationQuestHistory(tampered,PHRASEBOOK),history);
 assert.deepEqual(normalizeConversationQuestHistory([],PHRASEBOOK),{});
 assert.deepEqual(recordConversationQuestHistory(history,createConversationQuest(PHRASEBOOK,'ja'),PHRASEBOOK),history);
});
test('conversation quests are included in app state, backups, offline build and cache',()=>{
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),
  build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/from '\.\/conversationquest\.js'/);
 assert.match(app,/conversationQuest:normalizeConversationQuest\(data\.conversationQuest,PHRASEBOOK\)/);
 assert.match(app,/conversationQuestHistory:normalizeConversationQuestHistory\(data\.conversationQuestHistory,PHRASEBOOK\)/);
 assert.match(app,/conversationQuest:normalizeConversationQuest\(clean\.conversationQuest,PHRASEBOOK\)/);
 assert.match(app,/conversationQuestHistory:normalizeConversationQuestHistory\(clean\.conversationQuestHistory,PHRASEBOOK\)/);
 assert.match(sw,/\/conversationquest\.js/);
 assert.match(build,/'conversationquest\.js'/);
});
