import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES} from '../data.js';
import {makeReviewCards,dueReviewCards,recordReview,normalizeReviews,REVIEW_DAYS} from '../review.js';
const cards=makeReviewCards(COURSES);
const now=Date.UTC(2026,10,3,2,0,0);
test('Review Deck covers each lesson',()=>{
  const n=COURSES.reduce((s,c)=>s+c.lessons.length,0);
  assert.equal(cards.length,n);
  assert.equal(new Set(cards.map(c=>c.id)).size,n);
  assert.ok(cards.every(c=>c.question&&c.answer&&c.explanation));
});
test('dark cards need the session acknowledgment',()=>{
  const a=cards.find(c=>!c.dark), b=cards.find(c=>c.dark);
  assert.equal(dueReviewCards(cards,[a.id,b.id],{},now).length,1);
  assert.equal(dueReviewCards(cards,[a.id,b.id],{},now,true).length,2);
  assert.equal(dueReviewCards(cards,[],{},now,true).length,0);
});
test('review intervals increase and forgotten cards repeat after 10 minutes',()=>{
  let r;
  for(const days of REVIEW_DAYS){r=recordReview(r,'remembered',now);assert.equal(Date.parse(r.dueAt)-now,days*86400000);}
  assert.equal(Date.parse(recordReview(r,'remembered',now).dueAt)-now,60*86400000);
  const again=recordReview(r,'again',now);
  assert.equal(Date.parse(again.dueAt)-now,600000);
  assert.equal(recordReview(again,'remembered',now).step,0);
});
test('review history is sanitized',()=>{
  const a=cards[0],r=recordReview(null,'remembered',now);
  assert.equal(dueReviewCards(cards,[a.id],{[a.id]:r},now).length,0);
  assert.equal(dueReviewCards(cards,[a.id],{[a.id]:r},now+86400000).length,1);
  assert.deepEqual(Object.keys(normalizeReviews({[a.id]:r,'evil<script>':r})),[a.id]);
  assert.deepEqual(normalizeReviews(null),{});
  assert.throws(()=>recordReview(r,'unknown',now));
});
