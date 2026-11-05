import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons} from '../data.js';
import {auditCurriculum} from '../curriculumaudit.js';
test('curriculum produces a deterministic comprehensive, cautious editorial backlog',()=>{
 const report=auditCurriculum(COURSES);
 assert.equal(report.valid,true);
 assert.equal(report.totals.subjects,14);
 assert.equal(report.totals.lessons,totalLessons);
 assert.equal(totalLessons,139);
 assert.equal(report.subjects.length,14);
 assert.equal(report.lessons.length,139);
 assert.equal(report.totals.structuredEvidencePractice,139);
 assert.equal(report.totals.threeSectionDepth,139);
 assert.equal(report.totals.appliedExercises,139);
 assert.equal(report.totals.lessonsWithEditorialFlags,0);
 assert.ok(report.totals.workedExamples>=26);
 assert.ok(report.totals.uniqueSourceURLs>=25);
 assert.equal(report.totals.lessonsWithEditorialFlags,0,'all automated pedagogical shape checks now pass');
 const releaseGates=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.equal(releaseGates.gates[0].complete,false,'structural readiness must not be confused with independent expert signoff');
 assert.ok(releaseGates.gates[0].blockers.some(s=>/review|source|verification/i.test(s)),'human evidence and source audits remain tracked');
 assert.equal(report.limitations.length,3);
 assert.deepEqual(report,auditCurriculum(COURSES));
});
test('audit detects bad quiz distractors, missing learning stages and unsafe sources',()=>{
 const base={id:'sample',lessons:[
  {id:'a',stage:'Beginner',title:'A',sections:[{heading:'First',body:'Valid body'}],task:'Task',quiz:{question:'Question',options:['Yes','yes ','No'],correct:2},sources:[{label:'Fake',url:'http://unsafe.test'}]},
  {id:'b',stage:'Intermediate',title:'B',sections:[{heading:'First',body:'Valid body'}],task:'Task',quiz:{question:'Question',options:['A','B','C'],correct:1}},
 ]};
 const r=auditCurriculum([base]);
 assert.equal(r.valid,false);
 assert.ok(r.criticalIssues.includes('sample:missing-stage'));
 assert.ok(r.criticalIssues.includes('sample:a:invalid-quiz'));
 assert.ok(r.criticalIssues.includes('sample:a:unsafe-reference'));
 assert.ok(r.lessons[0].editorialNeeds.includes('worked-example'));
 assert.ok(r.lessons[0].editorialNeeds.includes('deeper-sections'));
 assert.equal(auditCurriculum(null).valid,false);
});
test('audit runs offline using the bundled source and is saved in CI',()=>{
 const workflow=fs.readFileSync('.github/workflows/verify.yml','utf8');
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 assert.match(pkg.scripts['audit:curriculum'],/audit-curriculum/);
 assert.match(workflow,/Audit lesson pedagogy and source inventory/);
 assert.match(workflow,/Save curriculum audit/);
});
