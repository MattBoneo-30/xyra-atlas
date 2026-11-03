import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {COURSES} from '../data.js';
import {PERSONAL_CARD_LIMIT,CARD_FRONT_LIMIT,CARD_BACK_LIMIT,newPersonalCardId,normalizePersonalCards,createPersonalCard,
 updatePersonalCard,deletePersonalCard,duePersonalCards,ratePersonalCard,searchPersonalCards} from '../personalcards.js';
const id='pc-00000000-0000-4000-8000-000000000001';
const sample={front:'What is active recall?',back:'Retrieving an answer without looking first.',courseId:'psychology'};
const created=()=>createPersonalCard([],sample,COURSES,{id,now:1730000000000});

test('validates card creation and blocks mature subject tags',()=>{
 const cards=created();
 assert.equal(cards.length,1);assert.equal(cards[0].front,sample.front);assert.equal(cards[0].review,null);
 assert.throws(()=>createPersonalCard([],{...sample,courseId:'shadow'},COURSES,{id}),/subject/);
 assert.throws(()=>createPersonalCard([],{...sample,front:' '},COURSES,{id}),/Question/);
 assert.throws(()=>createPersonalCard([],{...sample,back:'x'.repeat(CARD_BACK_LIMIT+1)},COURSES,{id}),/Answer/);
 assert.throws(()=>createPersonalCard(cards,sample,COURSES,{id}),/already in use/);
 assert.equal(CARD_FRONT_LIMIT,240);assert.equal(PERSONAL_CARD_LIMIT,120);
 assert.ok(/^pc-[a-f\d-]{36}$/.test(newPersonalCardId(webcrypto)));
});
test('remembered/again use scheduled intervals and changed cards restart scheduling',()=>{
 const cards=created();
 assert.equal(duePersonalCards(cards,COURSES).length,1);
 const remembered=ratePersonalCard(cards,id,'remembered',COURSES,1730000000000);
 assert.equal(remembered[0].review.step,0);
 assert.equal(duePersonalCards(remembered,COURSES,1730000000000+60000).length,0);
 assert.equal(duePersonalCards(remembered,COURSES,1730000000000+86400000).length,1);
 const again=ratePersonalCard(remembered,id,'again',COURSES,1730000000000);
 assert.equal(again[0].review.step,-1);
 assert.equal(duePersonalCards(again,COURSES,1730000000000+600000).length,1);
 const unchanged=updatePersonalCard(remembered,id,sample,COURSES,{now:1730000000100});
 assert.equal(unchanged[0].review.step,0);
 const changed=updatePersonalCard(remembered,id,{...sample,front:'Different prompt'},COURSES,{now:1730000000100});
 assert.equal(changed[0].review,null);
 assert.equal(deletePersonalCard(remembered,id,COURSES).length,0);
});
test('import sanitizes malicious data, invalid IDs, oversized text and duplicates',()=>{
 const original=created()[0];
 const raw=[original,original,{...original,id:'pc-00000000-0000-4000-8000-000000000002',courseId:'shadow'},
  {...original,id:'pc-00000000-0000-4000-8000-000000000003',front:'X'.repeat(241)},
  {...original,id:'evil',front:'<script>x</script>'},
  {...original,id:'pc-00000000-0000-4000-8000-000000000004',review:{step:9999,dueAt:'not-a-date'}}];
 const clean=normalizePersonalCards(raw,COURSES);
 assert.equal(clean.length,2);assert.equal(clean[1].review,null);
 assert.deepEqual(normalizePersonalCards({},COURSES),[]);
 const repeated=Array.from({length:150},(_,i)=>({...original,id:'pc-00000000-0000-4000-8000-'+String(i).padStart(12,'0')}));
 assert.equal(normalizePersonalCards(repeated,COURSES).length,120);
});
test('search text, filter by subject and preserve validated backup shape',()=>{
 const cards=created();assert.equal(searchPersonalCards(cards,'active recall',COURSES).length,1);
 assert.equal(searchPersonalCards(cards,'psychology',COURSES).length,1);
 assert.equal(searchPersonalCards(cards,'not-found',COURSES).length,0);
 const imported=normalizePersonalCards(JSON.parse(JSON.stringify(cards)),COURSES);
 assert.deepEqual(imported,cards);
});
test('study cards are wired into offline build, storage and backup restore',async()=>{
 const fs=await import('node:fs');
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/from '\.\/personalcards\.js'/);
 assert.match(app,/personalcards:personalCardsPage/);
 assert.match(app,/personalCards:normalizePersonalCards\(clean\.personalCards,COURSES\)/);
 assert.match(sw,/\/personalcards\.js/);
 assert.match(build,/'personalcards\.js'/);
});
