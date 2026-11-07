/** Interdisciplinary transfer missions use existing intermediate lesson IDs and
 * explicit links to another already published lesson. No new progress schema.
 * All authored content remains pending independent specialist review.
 */
import {TRANSFER_LABS} from './transferlabs.js';
import {CROSS_SUBJECT_MISSIONS_ONE} from './crosssubjectmissions1.js';
import {CROSS_SUBJECT_MISSIONS_TWO} from './crosssubjectmissions2.js';
export const CROSS_SUBJECT_MISSIONS=Object.freeze({...CROSS_SUBJECT_MISSIONS_ONE,...CROSS_SUBJECT_MISSIONS_TWO});
export const CROSS_SUBJECT_MISSION_COUNT=Object.keys(CROSS_SUBJECT_MISSIONS).length;
export function attachCrossSubjectMissions(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas course list');
 const keys=new Set(courses.map(c=>c?.id));
 if(keys.size!==14||CROSS_SUBJECT_MISSION_COUNT!==14||
  Object.keys(CROSS_SUBJECT_MISSIONS).some(id=>!keys.has(id)))
  throw Error('Cross-subject coverage incomplete');
 const staged=[];
 for(const [id,entry] of Object.entries(CROSS_SUBJECT_MISSIONS)){
  const ownerLesson=TRANSFER_LABS[id]?.lessonId;
  const owner=courses.find(c=>c.id===id)?.lessons?.find(l=>l.id===ownerLesson);
  const peer=courses.find(c=>c.id===entry.peerCourse)?.lessons?.find(l=>l.id===entry.peerLesson);
  if(!owner||owner.stage!=='Intermediate'||!owner.transferLab||!peer||entry.peerCourse===id)
   throw Error('Invalid cross-subject prerequisite or destination: '+id);
  for(const [field,min] of Object.entries({title:25,scene:160,bridge:170,challenge:150,model:150})){
   if(typeof entry[field]!=='string'||entry[field].length<min)
    throw Error('Incomplete bridge '+id+': '+field);
  }
  if(!Array.isArray(entry.rubric)||entry.rubric.length!==4||
    entry.rubric.some(line=>typeof line!=='string'||line.length<45))
   throw Error('Incomplete cross-subject rubric: '+id);
  const key=id+':'+ownerLesson;
  if(owner.crossSubjectMission){
   if(owner.crossSubjectMission.key!==key)throw Error('Cross-subject conflict '+id);
   continue;
  }
  staged.push({owner,entry,key});
 }
 // No lesson mutated until every cross-reference has been validated.
 for(const {owner,entry,key} of staged){
  owner.crossSubjectMission=Object.freeze({key,title:entry.title,
   peerCourse:entry.peerCourse,peerLesson:entry.peerLesson,
   scene:entry.scene,bridge:entry.bridge,challenge:entry.challenge,
   model:entry.model,rubric:Object.freeze([...entry.rubric]),
   reviewStatus:'pending-independent-review'});
 }
 return staged.length;
}
