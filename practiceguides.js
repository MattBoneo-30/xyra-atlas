/** Xyra Atlas 1.49 • subject-specific layered practice guides.
 * Each practice guide is reflective exercise guidance, not an automatically
 * assessed skill demonstration, credential or personalized professional advice.
 * No prompts, responses or credentials are sent to a server.
 */
const RAW={
  "psychology": {
    "Beginner": [
      "State exactly what a person did or said, separate what you inferred, and identify one missing observation that could change the interpretation.",
      "Revisit your first interpretation in a new ordinary situation; list a less certain explanation and a respectful question you could ask."
    ],
    "Intermediate": [
      "Record one prediction before responding, the later observable outcome, and one reason the outcome might not prove your preferred hypothesis.",
      "Compare a short-term emotional response with a longer-term choice; describe what changed after you deliberately checked your evidence."
    ],
    "Advanced": [
      "Create a compact evidence table with two competing interpretations, a possible disconfirmation for each, and an ethical plan to learn more.",
      "Transfer the method to a fictional high-stakes interpersonal dilemma without diagnosing, labeling or pretending to know another person's thoughts."
    ]
  },
  "laws": {
    "Beginner": [
      "Identify the jurisdiction, kind of legal instrument, official publisher and applicable version before deciding what the text might require.",
      "Use a fictional consumer or contract question and write three facts still needed before any rule can responsibly be applied."
    ],
    "Intermediate": [
      "Create a dated fact timeline that distinguishes documents you possess from claims you have not yet independently verified.",
      "Draft a fictional first-level inquiry to a verified institution and identify one reason that another regulator or procedure could be relevant."
    ],
    "Advanced": [
      "Compare a primary Philippine agency source against a secondary explanation; note the issue, authority, exceptions and any unresolved legal interpretation.",
      "Draft a scenario-based request or complaint with evidence, a limited remedy, a safe identity-verification channel and a qualified-advice trigger."
    ]
  },
  "business": {
    "Beginner": [
      "Name the customer's actual current workaround, the cost of that workaround and one observable behavior that could validate demand.",
      "Write a hypothetical interview with neutral questions and explain what result would make you abandon rather than defend your idea."
    ],
    "Intermediate": [
      "Calculate a small example's price, variable cost, contribution, fixed expenses and break-even threshold, keeping assumptions explicit.",
      "Create a low-risk sales pilot that discloses full terms and includes success criteria and a reason to stop the offer if it harms customers."
    ],
    "Advanced": [
      "Draw the workflow from demand to delivery and name the slowest handoff, its measured delay and a reversible intervention.",
      "Stress-test the expansion with lower demand, additional support costs and a quality failure; specify the evidence you would need before scaling."
    ]
  },
  "savings": {
    "Beginner": [
      "Use fictitious amounts to separate essential spending, variable spending, irregular obligations and accessible cash reserves.",
      "Compare your initial budget with an unexpected repair or illness expense and describe which commitments can change without missing essentials."
    ],
    "Intermediate": [
      "For two fictional loan choices, calculate total repayments including stated fees instead of comparing only monthly installments.",
      "Explain how the choice would change if income fell for three months, and identify actual terms that would need verification."
    ],
    "Advanced": [
      "Model a conservative downside, optimistic case, time horizon and liquidity requirement without assuming a promised return is guaranteed.",
      "Design a due-diligence checklist for a fictional investment claim, including regulator checks, fees, exit restrictions and loss exposure."
    ]
  },
  "time": {
    "Beginner": [
      "Turn a vague goal into one observable deliverable, a start action and a realistic stop point during an ordinary day.",
      "Compare that action with one urgent interruption; show explicitly what you would reschedule and who should be informed."
    ],
    "Intermediate": [
      "Record expected versus actual effort in a fictional workweek and distinguish estimates, external blockers and avoidable distractions.",
      "Revise the next week with buffers, recovery time and a smaller number of achievable commitments rather than adding hours indefinitely."
    ],
    "Advanced": [
      "Sketch a capacity bottleneck using demand, available hours, dependencies and the queue of incomplete work.",
      "Design a one-week experiment with a success measure, a possible unintended consequence and a condition to reverse the change."
    ]
  },
  "languages": {
    "Beginner": [
      "Record a phrase's intended meaning, situation, level of formality and one pronunciation uncertainty you cannot verify from spelling.",
      "Test recognition and recall separately using a practical scenario; write down what you still cannot understand when hearing spontaneous speech."
    ],
    "Intermediate": [
      "Build a three-turn role-play that includes an unexpected reply and a polite request for clarification without pretending fluency.",
      "Check a variation of the phrase with a qualified reference when possible, noting regional and speaker-dependent differences."
    ],
    "Advanced": [
      "Create a skill profile separating listening, speaking, reading, writing and interaction, with direct evidence for each claim.",
      "Plan independent feedback for one real conversational task; define measurable progress and avoid equating a synthetic voice with native review."
    ]
  },
  "communication": {
    "Beginner": [
      "Write the other person's exact stated concern, then paraphrase it and ask what your summary may have missed.",
      "Rephrase a fictional disagreement using a curious follow-up instead of assigning a hidden motive to the speaker."
    ],
    "Intermediate": [
      "Draft a boundary using a specific situation, your own limit and an action you can safely perform without ordering someone's emotions.",
      "Test the boundary in a fictional context where the other person disagrees; keep your response proportionate and respectful."
    ],
    "Advanced": [
      "Build a repair plan naming your observable behavior, impact, accountability and a specific non-coercive follow-up.",
      "Explain how the plan changes if the other person does not forgive you or if continuing the interaction would be unsafe."
    ]
  },
  "thinking": {
    "Beginner": [
      "State a claim, one source, the observation actually measured and what additional observation would undermine the claim.",
      "Compare a vivid anecdote with representative evidence and write what cannot be concluded from either alone."
    ],
    "Intermediate": [
      "Draw at least two competing causal diagrams and name a plausible confounder for an observed association.",
      "Invent a reasonable comparison group and identify a flaw that would still remain even if the result looks statistically striking."
    ],
    "Advanced": [
      "Write an argument with explicit assumptions, strongest credible rebuttal and evidence that could reverse your recommendation.",
      "Translate a dramatic percentage into absolute numbers and explain how uncertainty and study design affect the decision."
    ]
  },
  "digital": {
    "Beginner": [
      "List the account assets worth protecting, likely entry points and independently stored recovery options without writing any real credentials.",
      "Walk through a fictional lost-phone scenario and verify which recovery steps remain available when the primary device is inaccessible."
    ],
    "Intermediate": [
      "Analyze the exact pressure cues in a fictional suspicious message and find the claim's legitimate verification route.",
      "Design a post-exposure response that protects the affected account, reports to a verified service and avoids sharing recovery codes."
    ],
    "Advanced": [
      "Identify the trust boundary around an AI-generated answer or automated workflow and choose checks before using it.",
      "Create adversarial test cases for inaccurate sources, malicious inputs and leaked secrets while keeping real personal data out of the exercise."
    ]
  },
  "career": {
    "Beginner": [
      "Find a specific skill deliverable from a real role description and define how a reviewer could verify your work.",
      "Write a one-paragraph case study stating your own role, constraints, tests and one limitation rather than claiming unsupported expertise."
    ],
    "Intermediate": [
      "Compare two portfolio explanations and identify which claims have actual baseline measurements or reproducible evidence.",
      "Edit an example resume bullet to describe a verifiable action and outcome, naming what remains unknown or unmeasured."
    ],
    "Advanced": [
      "Compare hypothetical offers using pay, scope, hours, benefits, risks, exit terms and a truthful alternative.",
      "Draft a respectful counterproposal with requested adjustments, a reason tied to the work and a clear walk-away condition."
    ]
  },
  "science": {
    "Beginner": [
      "Write a testable prediction, variable definition, measurable outcome and a plausible result that would disconfirm it.",
      "Identify a measurement error or ethical limitation in a classroom experiment and describe how you would document it."
    ],
    "Intermediate": [
      "Recalculate a fictional relative change as an absolute difference with the denominator and sampling context visible.",
      "List a confounder, a selection bias and one uncertainty that prevents the classroom result from proving universal causation."
    ],
    "Advanced": [
      "Map a feedback loop with measurable stocks, flows, delays and a possible unintended consequence.",
      "Design a small, safe observational test and explain which new data would make you change the proposed system model."
    ]
  },
  "relationships": {
    "Beginner": [
      "Name a specific trustworthy behavior and an honest commitment that both people can choose without sharing private accounts.",
      "Describe a realistic repair after a missed commitment, including accountability and room for the other person's refusal."
    ],
    "Intermediate": [
      "Contrast a nonthreatening disagreement with a pattern involving intimidation, isolation or account-access coercion.",
      "Outline protective support options for the risky fictional scenario without prescribing confrontation or diagnosing a person."
    ],
    "Advanced": [
      "Identify overlapping needs, consent boundaries and possible power differences in a fictional difficult relationship decision.",
      "Write a safe decision tree with a noncoercive request, an exit option and a point at which trusted outside support may be needed."
    ]
  },
  "negotiation": {
    "Beginner": [
      "List both sides' stated positions and underlying interests without claiming to know motives that were never disclosed.",
      "Write an offer with complete terms and a genuine ability for the other party to decline without deception or pressure."
    ],
    "Intermediate": [
      "Calculate a realistic full package cost, separating the opening anchor from independent evidence of value.",
      "Propose a scope adjustment when the initial price is inadequate, and explain why an invented competing offer would be unethical."
    ],
    "Advanced": [
      "State the truthful alternative to agreement, your non-negotiable limit and what credible evidence supports each.",
      "Role-play a difficult counteroffer while preserving clear consent, complete conditions and a written record of what was actually agreed."
    ]
  },
  "shadow": {
    "Beginner": [
      "Identify the exact observable pressure behavior in a fictional scenario without assigning a clinical label to a person.",
      "List safe recognition cues and independent support options that protect autonomy instead of teaching the pressure tactic."
    ],
    "Intermediate": [
      "Separate uncertainty or conflict from repeated coercive demands, including secrecy, threats and forced personal disclosure.",
      "Draft a protective exit or help-seeking plan that avoids retaliatory deception and does not put the targeted person in greater danger."
    ],
    "Advanced": [
      "Audit an exploitative fictional interface or social interaction from the target's point of view, documenting consent and disclosure failures.",
      "Write a redesign or protective checklist that restores informed choice without making manipulation more effective or easier to deploy."
    ]
  }
};
const STAGES=Object.freeze(['Beginner','Intermediate','Advanced']);
export const PRACTICE_GUIDES=Object.freeze(Object.fromEntries(Object.entries(RAW).map(([courseId,levels])=>
 [courseId,Object.freeze(Object.fromEntries(STAGES.map(stage=>[stage,Object.freeze([...levels[stage]])])))])));
export function practiceGuide(courseId,stage){
 const result=typeof courseId==='string'&&typeof stage==='string'?PRACTICE_GUIDES[courseId]?.[stage]:null;
 return result||null;
}
export function practiceGuideCoverage(courses){
 let lessons=0,guided=0;
 for(const course of Array.isArray(courses)?courses:[]){
  for(const lesson of Array.isArray(course?.lessons)?course.lessons:[]){
   lessons++;
   if(practiceGuide(course.id,lesson.stage)?.length===2)guided++;
  }
 }
 return {lessons,guided};
}
