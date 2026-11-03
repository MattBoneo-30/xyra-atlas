/** Original ethical curriculum exercises for communication, reasoning, career,
 * scientific methods, relationships and fair negotiation. Educational content only.
 */
const CONTENT={
  "communication": {
    "listen": {
      "explain": [
        "Listen for the speaker's stated facts and needs without assuming the conclusion you think they should reach. Reflection is a short test of understanding: paraphrase the concern and ask whether that interpretation is right before presenting a possible solution.",
        "An open question should invite missing context instead of steering the conversation toward your favorite answer. Some people want empathy, others want a practical plan; check which is welcome. A disagreement is not permission to interrupt or dismiss the account."
      ],
      "task": "A teammate says the launch plan is impossible. Write three plausible underlying concerns, then a four-line exchange containing one neutral reflection, an open clarification and a request for permission before offering advice. Identify what evidence would change your initial guess."
    },
    "boundaries": {
      "explain": [
        "An actionable boundary identifies the situation, a personal limit and a follow-up action under your own control. It is different from a threat or a command that another person change their beliefs or emotions. Keep the wording specific and proportionate.",
        "Evaluate whether your stated response is safe, practical and consistent with other obligations. A boundary may disappoint someone, but that does not remove their autonomy. Where intimidation or threats occur, trusted protective support may matter more than another negotiation."
      ],
      "task": "A colleague calls after 9 p.m. about routine work. Draft a respectful two-sentence boundary with contact hours, an alternative channel and a genuine urgent-issue exception. Then write how you would follow it when the colleague objects without controlling their reaction."
    },
    "conflict": {
      "explain": [
        "Repair is stronger when the speaker names their own observable action and its impact instead of describing the other person's personality. A meaningful apology can explain the behavior without using the explanation to escape responsibility.",
        "Offer a practical change that the other person can observe and give them room to respond, disagree or decline reconciliation. Do not demand immediate forgiveness. In an unsafe situation, ordinary relationship scripts should not displace safety planning and appropriate help."
      ],
      "task": "In a fictional meeting, a developer interrupts a designer twice and dismisses a concern. Write a specific apology, acknowledge the effect, propose a measurable meeting change and respond respectfully if the designer does not forgive the incident immediately."
    }
  },
  "thinking": {
    "evidence": {
      "explain": [
        "A strong argument names a claim and the observation or source that could support it. Check whether the quoted material measured what the headline asserts, including sample, population and time period. An appealing anecdote can be true without proving a general rule.",
        "Before searching, define the result that would count against your conclusion and identify a credible competing explanation. Separating source quality from personal agreement helps keep a discussion evidence-led even when the topic has emotional importance."
      ],
      "task": "A fictional article says all new phone batteries fail after one year. Draft an evidence log naming the claim, sample, definition of failure, data source, comparison group and a result that could disprove the generalization. Explain why one friend's experience is not enough."
    },
    "causation": {
      "explain": [
        "Two variables can move together because one influences the other, because causation runs in reverse, or because a third factor affects both. State the observed association accurately and sketch at least two explanations without assuming that one must be true.",
        "Consider a comparison that could distinguish explanations and note confounders, selection effects and measurement errors. A randomized experiment may be inappropriate or impossible; a thoughtful observational design still needs limits and cautious conclusions."
      ],
      "task": "A town has more iced-drink sales and sunburn reports on hot days. Draw two possible causal diagrams, identify weather and outdoor time as confounders, and propose a simple measurement plan. Write a cautious conclusion distinguishing the observed link from a proven cause."
    },
    "arguments": {
      "explain": [
        "Represent an opposing view in a form that a reasonable supporter would recognize before criticizing it. Identify the strongest evidence and the values at stake; do not replace the actual claim with an exaggerated or weak version just because it is easier to rebut.",
        "Separate disagreements over measurable facts from differences over tradeoffs or priorities. State what evidence would change your factual position and where respectful value disagreements may remain. Avoid manufacturing false balance when reliable evidence is highly unequal."
      ],
      "task": "Create a fictional debate about allowing flexible work hours. Write the strongest credible case for and against, distinguish two factual questions from two value judgments, and state one measurable result that could change your recommendation without misrepresenting either side."
    }
  },
  "career": {
    "skills": {
      "explain": [
        "Turn a job title into observable work rather than an unsupported skill label. Review several genuine role descriptions, note repeated technical tasks and choose one small project that proves a relevant ability. A demo and reproducible tests are more informative than a long adjectives list.",
        "Be precise about what you built yourself and what a framework or collaborator supplied. The result can still be useful if limited in scope; documenting constraints and missing production checks makes the case study more trustworthy."
      ],
      "task": "For a fictional junior Laravel/React role, identify three required skills and build a compact evidence map tying each to a project artifact or automated test. Include your specific contribution, one genuine limitation and a next learning step instead of claiming expert status."
    },
    "portfolio": {
      "explain": [
        "A strong case study shows the user problem, constraints, alternatives, decisions and tested results in a sequence a reviewer can inspect. Screenshots communicate design but do not alone establish performance, security or usability. Mark whether results were measured or estimated.",
        "Distinguish individual work from team contributions and avoid disclosing client secrets, proprietary code or live credentials. Explain how you verified an improvement, including what remains untested. This protects both professional credibility and other people's privacy."
      ],
      "task": "Draft a six-section fictional portfolio case study for an inventory app: problem, audience, role, alternatives, implementation and verification. Include one true-to-scenario test result, one constraint and one open limitation. Do not invent deployment metrics or reveal confidential data."
    },
    "negotiate-work": {
      "explain": [
        "An offer's headline salary does not describe all working conditions. Compare hours, benefits, scope, on-call expectations, location, contract length and practical alternatives. Ask for written clarity on material conditions before making a consequential commitment.",
        "Prepare a counterproposal from verifiable role requirements and a genuine personal limit, not a made-up competing offer. If the employer cannot adjust compensation, a smaller scope or clearer support schedule might still be discussable; refusal can be a reasonable outcome."
      ],
      "task": "Compare hypothetical offers of ₱30,000 monthly with undefined weekend support and ₱28,000 with bounded hours. Create a total-terms comparison, write three clarification questions and draft an ethical counteroffer that states a realistic alternative and walk-away condition."
    }
  },
  "science": {
    "method": {
      "explain": [
        "Begin with a question that specifies what changes, what you will observe and how the outcome will be measured. A clear hypothesis must be vulnerable to a result that would challenge it. Identify comparison conditions and keep safety and consent central to any experiment.",
        "Record possible confounders before interpreting results. Measurements can be affected by instruments, sampling and environmental variation. A small classroom exercise helps practice method, but it does not establish a universal law or clinical recommendation."
      ],
      "task": "Plan a safe fictional experiment testing how varying light exposure affects seedling growth. Define the independent variable, growth measure, comparison, seven-day recording method, two confounders and one result that would contradict the prediction."
    },
    "probability": {
      "explain": [
        "A percentage is incomplete without a population, time span, sample method and denominator. Distinguish an absolute change in percentage points from a relative increase; both can be mathematically valid while leaving very different impressions.",
        "Check how uncertain the estimate is and whether the original sample represents people or situations to which it is being applied. Avoid converting group statistics into certainties about an individual or presenting one small study as a guarantee."
      ],
      "task": "A fictional event rate changes from 2 in 1,000 to 3 in 1,000. Calculate the absolute increase per thousand and the relative percentage change, then name the denominator, a potential sampling bias and a missing uncertainty measure needed to interpret the result."
    },
    "systems": {
      "explain": [
        "Systems thinking distinguishes stocks, flows, bottlenecks and feedback. Before drawing arrows, explain how a change in one measurable part could affect another and whether the effect is delayed. Not all correlations in a system are causal links.",
        "Test a proposed intervention for side effects. Increasing intake without improving processing capacity can grow a queue rather than reduce waiting. Use a reversible pilot and specify the metric, comparison period and scenario that would change the model."
      ],
      "task": "A fictional clinic adds appointment slots while staffing remains unchanged. Build a simple flow model with arrivals, processing rate, waiting queue and a feedback effect. Predict a possible unintended consequence and design a safe measurement pilot with a rollback rule."
    }
  },
  "relationships": {
    "trust": {
      "explain": [
        "Trust is built through repeated voluntary reliability, not by a secret loyalty test or unrestricted account access. Describe a promise in observable terms and identify what each person can do if circumstances change. A single grand gesture rarely replaces consistent behavior.",
        "Repair requires responsibility without entitlement to forgiveness. Listen when another person describes the effect of a broken commitment, propose a realistic adjustment and respect their choice about continued contact. Autonomy applies to both people."
      ],
      "task": "Two fictional friends repeatedly miss plans because one has changing shifts. Write three observable commitments they could mutually choose, a courteous cancellation message and an accountable repair after a missed plan. Explain why demanding passwords would not build trust."
    },
    "conflict-care": {
      "explain": [
        "Ordinary disagreement can involve hurt feelings without meaning a relationship is coercive. Look at observable patterns, the freedom to decline and whether threats, isolation or pressure are present rather than assigning a diagnosis from one incident.",
        "When intimidation or forced access to accounts appears, direct confrontation may raise risk. A safety-first response can include an appropriate support person, a verified service or a plan to leave the unsafe setting. Avoid presuming that communication tricks can resolve every threat."
      ],
      "task": "Compare two fictional disagreements: a couple debates chores and resolves a schedule, while a partner threatens to expose private photos unless given account access. List the observable differences, consent concerns and safer support options without requiring confrontation."
    },
    "wellbeing": {
      "explain": [
        "Sleep, movement and social contact can support wellbeing, but no single routine guarantees relief from medical or psychological symptoms. Choose a low-risk behavior that fits real constraints and observe whether it is sustainable, rather than attempting a sudden total lifestyle overhaul.",
        "Keep reflection separate from diagnosis. If difficulties persist, intensify or affect safety, appropriate qualified support matters. Work shifts, caregiving and health conditions can change what is possible, so a flexible plan is more useful than judging a missed day."
      ],
      "task": "Create a fictional seven-day plan for someone with changing work shifts. Include a small sleep-friendly routine, movement option and supportive contact, plus a backup on difficult days. Record two observations but do not claim that the routine treats a specific illness."
    }
  },
  "negotiation": {
    "persuasion": {
      "explain": [
        "Transparent persuasion helps another person evaluate a real benefit, complete cost and meaningful alternative. Withholding cancellation fees, inventing scarcity or applying shame can undermine informed choice even if a transaction results.",
        "Ask what the person needs and which constraints matter, then let them decline. A smaller package may meet their needs without pressure. Document accurate terms and avoid presenting an unverified outcome or fabricated testimonial as proof."
      ],
      "task": "Write a fictional pitch for a low-cost online portfolio service including scope, fee, exclusions and cancellation. Add a genuine comparison option and a respectful reply to a customer who declines. Identify two phrases that would become manipulative if used to manufacture urgency."
    },
    "anchors": {
      "explain": [
        "An opening number can shape expectations without establishing the fair value of the work. Gather independent pricing evidence, define deliverables and estimate actual hours before reacting. Compare complete terms rather than assuming the first offer is accurate.",
        "Make a truthful alternative package when the proposed budget is too small and define a limit that protects your capacity. Do not invent a competing bidder. A clear scope is more sustainable than accepting vague unlimited revisions and hoping to renegotiate later."
      ],
      "task": "A client offers ₱2,000 for a job expected to take twenty hours plus several revisions. Calculate the implied hourly revenue before expenses, propose a smaller fixed-scope option and write a documented counteroffer with revision limits and a truthful reason for your price."
    },
    "hard-talks": {
      "explain": [
        "Before a difficult negotiation, distinguish the position being demanded from the underlying need. Ask which parts of the proposed agreement must be true for each side and what alternatives genuinely exist if a deal is not reached.",
        "Use transparent packages and written confirmation rather than emotional leverage or hidden penalties. Another person's refusal does not justify intimidation. When power differences or safety concerns are serious, seek appropriate independent advice before proceeding."
      ],
      "task": "Role-play a fictional client requesting unlimited website revisions for a fixed fee. List both sides' interests, a feasible alternative package, your honest walk-away condition and a final written summary. Explain why invented competing offers would damage trust."
    }
  }
};
export const APPLIED_FOUNDATION=Object.freeze(Object.fromEntries(Object.entries(CONTENT).map(([courseId,lessons])=>[
 courseId,Object.freeze(Object.fromEntries(Object.entries(lessons).map(([id,value])=>[id,Object.freeze({
  explain:Object.freeze([...value.explain]),task:value.task
 })])))
])));
export const APPLIED_FOUNDATION_COUNT=Object.values(APPLIED_FOUNDATION).reduce((n,v)=>n+Object.keys(v).length,0);
export function deepenAppliedFoundation(courses){
 let changed=0;
 for(const course of Array.isArray(courses)?courses:[]){
  const records=APPLIED_FOUNDATION[course.id];
  if(!records)continue;
  for(const lesson of course.lessons||[]){
   const record=records[lesson.id];
   if(!record)continue;
   if(!Object.isExtensible(lesson)||!Array.isArray(lesson.sections)||lesson.sections.length<2)
    throw Error('Cannot deepen unknown or frozen original: '+course.id+':'+lesson.id);
   for(let i=0;i<2;i++)lesson.sections[i].body+=' '+record.explain[i];
   lesson.task+=' '+record.task;
   changed++;
  }
 }
 return changed;
}
