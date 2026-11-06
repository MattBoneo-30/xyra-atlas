/** Evidence-led astronomy case study for Science & The World.
 * Sources: NASA Science and Philippine PAGASA; teaching is not a professional credential.
 * Appends an astronomical application to the existing advanced systems lesson,
 * preserving course/lesson IDs, stored progress, quiz answers, and release counts.
 */
export const ASTRONOMY_CASE_STUDY=Object.freeze({
 sections:Object.freeze([
  Object.freeze({
   heading:'Astronomy lab — Why the Moon changes shape',
   body:'Begin with the observable pattern: at different dates, the visible illuminated portion of the Moon changes. The Moon does not produce its own visible light; its surface reflects sunlight. Except during a lunar eclipse, sunlight illuminates approximately half the Moon at any moment. As the Moon travels around Earth, an observer sees changing fractions of that illuminated half. This geometry creates the lunar phases; ordinary phases are not Earth casting its shadow on the Moon. The cycle from one new Moon to the next lasts about 29.5 days, whereas a revolution relative to distant stars is about 27.3 days because Earth and Moon are also orbiting the Sun. Describe the Sun, Earth, Moon and observer before naming a phase. A sketch with arrows for sunlight and the sightline is a better explanation than memorizing eight labels alone.'
  }),
  Object.freeze({
   heading:'Astronomy lab — Why seasons are not about being nearer the Sun',
   body:'Earth’s rotation axis is tilted about 23.4 degrees relative to the direction perpendicular to its orbital plane. As Earth orbits the Sun, the tilt changes the angle of sunlight and the length of daylight in each hemisphere. This explains the major seasonal pattern away from the equator. The popular claim that northern summer happens because Earth is closer to the Sun fails a direct comparison: Earth is nearest the Sun around early January, during northern winter. For a Philippines-based observer, local rainfall patterns also depend on regional climate and monsoons; astronomical seasons should not be presented as an automatic explanation for every local wet or dry period. Make a prediction for two locations on opposite sides of the equator and distinguish the sunlight geometry from actual local weather.'
  }),
  Object.freeze({
   heading:'Astronomy lab — Build and challenge a scientific model',
   body:'A physical model is a simplified representation with limits, not a miniature proof. Use a lamp to represent sunlight, a small ball for the Moon and your eyes for an observer on Earth. Keep the lamp fixed and move the ball around the observer; record which part of its illuminated hemisphere is visible. Then predict the geometry of a quarter Moon and compare it with the model before looking at an answer. In a separate tilt model, use a slightly tilted globe with its axis kept in the same direction while moving it around a stationary lamp. Compare midday illumination and day length rather than the globe’s distance. State two limitations: the model is not drawn to astronomical scale and lamp light may not approximate nearly parallel solar rays. Never point a telescope or unfiltered optics at the Sun.'
  })
 ]),
 task:'Astronomy transfer challenge: (1) Observe or consult a dated official Moon chart for three different nights. Sketch the illuminated shape and predict whether the visible fraction should grow or shrink. (2) Explain why a first-quarter Moon is not a lunar eclipse. (3) Draw the Sun–Earth axis at two opposite positions in Earth’s orbit and predict which hemisphere receives longer daylight; separately explain why Philippine rainy seasons cannot be inferred from axial tilt alone. (4) Name two limitations of each drawing or model and check your claims against the original official sources.',
 sources:Object.freeze([
  Object.freeze({label:'NASA Science — Moon Phases',url:'https://science.nasa.gov/moon/moon-phases/'}),
  Object.freeze({label:'NASA Space Place — What Causes the Seasons?',url:'https://spaceplace.nasa.gov/seasons/en/'}),
  Object.freeze({label:'PAGASA — Astronomy Questions and Explanations',url:'https://pagasa.dost.gov.ph/learnings/faqs-and-trivias'})
 ])
});
export function extendScienceWithAstronomy(courses){
 const science=Array.isArray(courses)?courses.find(course=>course?.id==='science'):null;
 const lesson=science?.lessons?.find(item=>item?.id==='systems');
 if(!lesson||!Array.isArray(lesson.sections)||!Array.isArray(lesson.sources)||typeof lesson.task!=='string')
  throw Error('Astronomy case requires the established science systems lesson');
 if(lesson.astronomySections?.some(section=>section.heading===ASTRONOMY_CASE_STUDY.sections[0].heading))
  return false;
 lesson.astronomySections=ASTRONOMY_CASE_STUDY.sections.map(section=>({...section}));
 // Supplementary reading stays separate from the pre-existing signed 52-source
 // audit register until independent reviewers explicitly expand that register.
 lesson.astronomySources=ASTRONOMY_CASE_STUDY.sources.map(source=>({...source}));
 lesson.task+=' '+ASTRONOMY_CASE_STUDY.task;
 return true;
}
