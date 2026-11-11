/** Xyra Atlas | Expedition Studio: 14 subjects, 42 applied missions, 42 contextual choices.
 * Educational, offline, non-graded and review-pending. No storage, requests or synthetic progress.
 */
export const ATLAS_EXPEDITIONS=Object.freeze({
  "psychology": {
    "title": "The story you tell yourself",
    "setup": "A teammate reads a message about a deadline but does not reply for two days. You assume they are angry with you. Another teammate says the silence proves disrespect, yet you have no direct explanation for it.",
    "question": "How can you act without treating an assumption as an established fact?",
    "evidence": "Look for observable behavior, at least two plausible alternatives, a respectful check-in and a decision rule for when a follow-up is appropriate.",
    "boundary": "This is general educational reflection, not diagnosis, counselling or a substitute for professional mental-health support.",
    "choices": [
      {
        "label": "Confront the teammate publicly",
        "consequence": "This may turn an unverified interpretation into public conflict and give the teammate little chance to explain."
      },
      {
        "label": "Ask a neutral clarifying question",
        "consequence": "This separates the known delay from your theory about intent and creates a clearer basis for your next action."
      },
      {
        "label": "Ignore every deadline",
        "consequence": "Avoiding discomfort may protect the assumption while leaving the practical task unresolved."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Notice the inference",
        "task": "Write a two-column list of what was observed and what was inferred. Include two alternate explanations for the silence.",
        "artifact": "One evidence-versus-interpretation table",
        "check": "Every factual sentence must be directly observable, rather than a guess about motives."
      },
      {
        "stage": "Intermediate",
        "focus": "Design a respectful response",
        "task": "Draft a concise message that asks about availability, states the deadline and provides an easy way to respond.",
        "artifact": "A neutral follow-up script with an escalation time",
        "check": "The wording must not accuse or pressure; the deadline and next step should be clear."
      },
      {
        "stage": "Advanced",
        "focus": "Audit the judgment",
        "task": "Compare how you would act if the colleague were overwhelmed, disengaged or facing an urgent personal issue.",
        "artifact": "A conditional decision tree with uncertainty noted",
        "check": "The same initial evidence should not become a certain diagnosis in any branch."
      }
    ]
  },
  "laws": {
    "title": "A receipt and a disputed promise",
    "setup": "A customer paid a small shop for a repair. The receipt describes the product but not the delivery date. The seller remembers making a verbal estimate; the customer remembers being promised a firm date.",
    "question": "Which facts must be verified before either side can make a responsible claim?",
    "evidence": "Separate transaction facts, competing recollections and missing documents; identify which current local rules and qualified resources would need verification.",
    "boundary": "Legal requirements vary by location and change over time. This example does not determine anyone's legal rights or replace licensed advice.",
    "choices": [
      {
        "label": "Announce that the customer automatically wins",
        "consequence": "A sympathetic story is not the same as verifying the agreement and applicable rules."
      },
      {
        "label": "Collect records and check current official guidance",
        "consequence": "This narrows factual disagreements and avoids inventing legal entitlements."
      },
      {
        "label": "Destroy the unclear receipt",
        "consequence": "Discarding records makes the dispute harder to resolve and can obstruct a fair review."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Build a fact record",
        "task": "List the payment date, receipt wording, relevant messages, delivery events and unknown terms without deciding liability.",
        "artifact": "A dated evidence timeline",
        "check": "Each claim has a source or is marked as unconfirmed."
      },
      {
        "stage": "Intermediate",
        "focus": "Compare possible obligations",
        "task": "Research a relevant official consumer-information page for the applicable jurisdiction and record its publication date and scope.",
        "artifact": "A source log distinguishing rule from example",
        "check": "Do not generalize a rule to a different product, date or locality."
      },
      {
        "stage": "Advanced",
        "focus": "Draft a fair resolution pathway",
        "task": "Offer a neutral dispute summary, a documentation request and appropriate referral if facts or law remain contested.",
        "artifact": "A factual resolution letter and referral checklist",
        "check": "Avoid threatening a remedy that has not been verified by a qualified source."
      }
    ]
  },
  "business": {
    "title": "The busy café with no margin",
    "setup": "A small café sells more drinks every week, yet the owner has less cash. Cups, ingredients, delivery fees, wastage, rent and labor have increased. Revenue looks healthy in social-media posts, but the owner has not reconciled costs.",
    "question": "How do you test whether growth is actually sustainable?",
    "evidence": "Calculate contribution margin, fixed costs, waste and cash timing with transparent assumptions; test price and volume sensitivity.",
    "boundary": "The examples teach business reasoning, not guaranteed profit or customized financial advice.",
    "choices": [
      {
        "label": "Buy more inventory to celebrate sales",
        "consequence": "Higher sales without unit economics can increase waste and make the cash shortage worse."
      },
      {
        "label": "Rebuild costs per product and test scenarios",
        "consequence": "Unit economics and a short cash forecast help reveal what sales volume really contributes."
      },
      {
        "label": "Stop recording small expenses",
        "consequence": "Unrecorded expenses make performance appear better without fixing the business."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Calculate one product's economics",
        "task": "Choose a fictional drink and list ingredient, packaging, platform fee and wastage costs alongside selling price.",
        "artifact": "A transparent unit contribution worksheet",
        "check": "Every cost has a unit and the margin is sales price minus relevant variable costs."
      },
      {
        "stage": "Intermediate",
        "focus": "Model the operating week",
        "task": "Use realistic fictional weekday and weekend volume, fixed expenses and ingredient lead times.",
        "artifact": "A seven-day cash and stock forecast",
        "check": "A profitable day must not be assumed to guarantee positive cash throughout the week."
      },
      {
        "stage": "Advanced",
        "focus": "Pressure-test expansion",
        "task": "Compare a new menu item, a modest price change and one extra staff shift under best, middle and weak demand.",
        "artifact": "A three-scenario decision memo",
        "check": "Explicitly state break-even assumptions, downside risk and a stopping condition."
      }
    ]
  },
  "savings": {
    "title": "The emergency fund dilemma",
    "setup": "A worker has regular bills, an irregular side-income stream and a phone that may require replacement soon. They want to save quickly but keep using the same money for predictable expenses and emergencies.",
    "question": "How can separate money purposes reduce avoidable shocks?",
    "evidence": "Distinguish recurring bills, sinking funds, emergency liquidity and discretionary spending; show assumptions and uncertainty.",
    "boundary": "Financial examples are educational; savings products and personal risk needs require current local verification.",
    "choices": [
      {
        "label": "Lock every peso away indefinitely",
        "consequence": "Cash may be unavailable when essential bills or urgent costs arise."
      },
      {
        "label": "Give predictable expenses and emergencies separate plans",
        "consequence": "Clear categories help prevent planned purchases from consuming an emergency reserve."
      },
      {
        "label": "Count expected freelance work as guaranteed cash",
        "consequence": "Uncertain income should not be treated like money already received."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Map the real obligations",
        "task": "Create a fictional monthly budget with bill dates, minimum necessities and variable income.",
        "artifact": "A dated cash calendar",
        "check": "All monthly totals and due dates should reconcile without double-counting income."
      },
      {
        "stage": "Intermediate",
        "focus": "Design separate buffers",
        "task": "Assign future phone repair, insurance or annual costs to sinking funds and unexpected needs to an emergency buffer.",
        "artifact": "A savings-purpose table with withdrawal rules",
        "check": "Each fund should explain what does and does not qualify for use."
      },
      {
        "stage": "Advanced",
        "focus": "Stress-test an income interruption",
        "task": "Simulate a month with 30 percent less income and one urgent necessary expense.",
        "artifact": "A fallback action plan",
        "check": "Protect essentials first and identify risks rather than promising a fixed universally correct savings target."
      }
    ]
  },
  "time": {
    "title": "The calendar that cannot fit",
    "setup": "A learner schedules six hours of coursework, a client deadline, chores, a commute and enough sleep inside one afternoon. Every task has been labelled urgent. The plan looks elegant but is mathematically impossible.",
    "question": "What must change when the schedule exceeds the time actually available?",
    "evidence": "Account for fixed commitments, task estimates, rest, buffers and dependencies; compare what happens when priorities compete.",
    "boundary": "Time-management tools cannot eliminate external constraints, disability-related needs or unavoidable responsibilities.",
    "choices": [
      {
        "label": "Cut every break and keep all tasks",
        "consequence": "Removing recovery can make performance and estimates less reliable."
      },
      {
        "label": "Recalculate capacity and negotiate scope",
        "consequence": "A feasible plan combines honest estimates with clear decisions about deferral and delegation."
      },
      {
        "label": "Hide missed tasks from the calendar",
        "consequence": "This creates a neat dashboard but removes the feedback needed to improve estimates."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Audit available minutes",
        "task": "Draw a 24-hour map including sleep, work, commute and essential care before allocating focus time.",
        "artifact": "A realistic time-budget sheet",
        "check": "Allocated minutes must never exceed the available minutes."
      },
      {
        "stage": "Intermediate",
        "focus": "Build a priority sequence",
        "task": "Rank three competing tasks by consequences, deadlines and dependencies and add a visible contingency block.",
        "artifact": "A revised day plan with one buffer",
        "check": "Tradeoffs and deferred commitments should be explicit."
      },
      {
        "stage": "Advanced",
        "focus": "Inspect forecast error",
        "task": "Compare a fictional planned week with actual durations and identify which estimates failed repeatedly.",
        "artifact": "A weekly estimate-error review",
        "check": "Use the observations to revise future plans, not to label a person as lazy."
      }
    ]
  },
  "languages": {
    "title": "The sentence with two meanings",
    "setup": "A traveler memorizes a literal translation of a short English request and assumes it will always sound polite. A local speaker explains that formality, relationships and context change the preferred wording.",
    "question": "How do you learn natural usage without pretending that one translation fits all settings?",
    "evidence": "Check register, audience, pronunciation and meaning with trusted examples; keep uncertainty and dialect differences visible.",
    "boundary": "Translations and pronunciation examples require review by qualified native or regional speakers; automated speech is not that review.",
    "choices": [
      {
        "label": "Use the literal translation everywhere",
        "consequence": "Grammatical resemblance does not guarantee appropriate tone or local usage."
      },
      {
        "label": "Compare context-rich examples with a fluent reviewer",
        "consequence": "A verified example with audience and situation teaches more than an isolated phrase."
      },
      {
        "label": "Claim fluency after memorizing ten phrases",
        "consequence": "Recall is valuable, but it does not establish broad comprehension or interaction ability."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Contrast two contexts",
        "task": "Choose a request and write how its meaning and politeness may change between a friend and a formal service interaction.",
        "artifact": "A two-context phrase card with uncertainty labels",
        "check": "Distinguish meanings from guesses; do not invent culturally specific wording."
      },
      {
        "stage": "Intermediate",
        "focus": "Practice repair language",
        "task": "Plan how to ask a speaker to repeat, slow down or correct a misunderstood phrase.",
        "artifact": "A short repair conversation script",
        "check": "The learner can politely ask for clarification without assuming their first wording is correct."
      },
      {
        "stage": "Advanced",
        "focus": "Verify authentic usage",
        "task": "Compare a phrasebook example, a reputable learner dictionary and feedback from a qualified speaker when available.",
        "artifact": "A small source-and-feedback record",
        "check": "Record differences in dialect and register instead of declaring one universal form."
      }
    ]
  },
  "communication": {
    "title": "The project meeting that went silent",
    "setup": "A group discussion ends with everyone nodding. Two members think the feature ships Friday; two think only the design ships Friday. Nobody wrote down responsibilities or a definition of complete.",
    "question": "How do you turn apparent agreement into shared, verifiable understanding?",
    "evidence": "Use observable commitments, ownership, acceptance criteria and a chance to correct the recap; account for unequal speaking power.",
    "boundary": "Communication techniques should never be used to override consent or manipulate a vulnerable person.",
    "choices": [
      {
        "label": "Assume silence means agreement",
        "consequence": "Silence can reflect confusion, pressure, distraction or a different interpretation."
      },
      {
        "label": "Send a clear recap and ask for corrections",
        "consequence": "Documented deliverables and a correction window expose mismatched expectations."
      },
      {
        "label": "Blame the quietest team member",
        "consequence": "Assigning fault does not clarify the disputed scope or agreement."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Capture the disagreement",
        "task": "Write what each of four fictional members believes is due and what evidence supports it.",
        "artifact": "An assumption map",
        "check": "Do not smooth over differences by claiming consensus."
      },
      {
        "stage": "Intermediate",
        "focus": "Draft a shared contract of work",
        "task": "Write an action recap with owner, deliverable, deadline, acceptance test and explicit correction request.",
        "artifact": "A one-page meeting recap",
        "check": "Each deliverable has one accountable owner and observable finish criteria."
      },
      {
        "stage": "Advanced",
        "focus": "Prepare for conflicting priorities",
        "task": "Role-play a change request that adds scope while leaving the delivery date unchanged.",
        "artifact": "An escalation and negotiation script",
        "check": "Separate a clear request from a commitment that has not been accepted."
      }
    ]
  },
  "thinking": {
    "title": "The viral chart with a missing axis",
    "setup": "A post claims that a new habit doubled success rates. The chart hides the starting value, the study sample and the definition of success. Comments repeat the headline without checking the data.",
    "question": "What would make the claim credible enough to act on?",
    "evidence": "Inspect denominators, definitions, selection effects, alternative explanations and evidence quality before assigning confidence.",
    "boundary": "Critical thinking is a method of evaluating claims, not a promise of certainty.",
    "choices": [
      {
        "label": "Share it because the chart looks scientific",
        "consequence": "Visual polish does not establish that measurements are meaningful or representative."
      },
      {
        "label": "Find the original measurements and missing context",
        "consequence": "The denominator, design and alternative causes determine how much the chart can support."
      },
      {
        "label": "Reject all research forever",
        "consequence": "Healthy skepticism distinguishes weak evidence from stronger evidence rather than treating everything as equally unreliable."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Reconstruct the claim",
        "task": "Create two numerical examples that both show a 100 percent relative increase but have different absolute effects.",
        "artifact": "A relative-versus-absolute comparison",
        "check": "Each rate includes a denominator and a defined outcome."
      },
      {
        "stage": "Intermediate",
        "focus": "Find three alternative causes",
        "task": "List plausible confounders, selection effects and measurement changes in the fictional study.",
        "artifact": "An alternative-hypothesis matrix",
        "check": "Each alternative describes a fact that could distinguish it from the headline explanation."
      },
      {
        "stage": "Advanced",
        "focus": "Write a calibrated conclusion",
        "task": "State what is supported, what is uncertain and what further evidence would change your mind.",
        "artifact": "An evidence-strength memo",
        "check": "Use confidence language proportionate to the design, not to popularity."
      }
    ]
  },
  "digital": {
    "title": "The permission nobody expected",
    "setup": "A simple note-taking app asks to access contacts, microphone and location immediately. Its core feature appears to work without them. The permission screen frames refusing as an irresponsible choice.",
    "question": "How can you assess permissions and design an honest user choice?",
    "evidence": "Review data necessity, timing, retention, revocation and secure defaults; test actual behavior after denial.",
    "boundary": "This is defensive privacy literacy, not a guide to surveillance or bypassing protections.",
    "choices": [
      {
        "label": "Grant everything to avoid friction",
        "consequence": "Unnecessary permissions can expand data exposure without improving the requested task."
      },
      {
        "label": "Grant only justified permissions when needed",
        "consequence": "Contextual, revocable consent supports useful features while minimizing access."
      },
      {
        "label": "Assume the permission label guarantees good handling",
        "consequence": "A permission prompt alone does not establish how the app stores or shares data."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Inventory access needs",
        "task": "List all requested capabilities and their relationship to a specific app function.",
        "artifact": "A permission-necessity matrix",
        "check": "Each permission has a concrete reason, or is marked unnecessary."
      },
      {
        "stage": "Intermediate",
        "focus": "Design a respectful prompt",
        "task": "Draw a permission request that appears when the feature needs it and offers a usable decline path.",
        "artifact": "A low-fidelity consent flow",
        "check": "The core note-taking experience remains usable without unrelated permissions."
      },
      {
        "stage": "Advanced",
        "focus": "Test denial and withdrawal",
        "task": "Describe offline test steps to deny, revoke and retry each permission.",
        "artifact": "A permission acceptance checklist",
        "check": "Every rejected request has predictable, safe behavior and does not covertly collect equivalent data."
      }
    ]
  },
  "career": {
    "title": "The portfolio with big promises",
    "setup": "A junior developer advertises an app as production-ready with thousands of users, but the project is a personal prototype. Employers appreciate initiative, yet overstated claims may damage credibility.",
    "question": "How can a portfolio communicate real ability without inventing impact?",
    "evidence": "Show scope, role, decisions, evidence, constraints and honest results; distinguish prototypes from deployed systems.",
    "boundary": "Career examples are not employer-specific hiring or legal guidance.",
    "choices": [
      {
        "label": "Keep impressive but unsupported metrics",
        "consequence": "Unverified numbers can make good work seem misleading if questioned."
      },
      {
        "label": "Show a reproducible project story",
        "consequence": "A clear problem, technical choices, screenshots and limits provides evidence a reviewer can inspect."
      },
      {
        "label": "Hide all unfinished projects",
        "consequence": "The right prototype can still show learning if its state and scope are disclosed."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Write the project case study",
        "task": "Describe a fictional app's user problem, your contribution, stack, constraints and current status.",
        "artifact": "A concise, evidence-based portfolio entry",
        "check": "Replace superlatives with verifiable details."
      },
      {
        "stage": "Intermediate",
        "focus": "Document an engineering tradeoff",
        "task": "Compare two possible architectures with costs, failure modes and why one was selected.",
        "artifact": "A decision record and test evidence list",
        "check": "Do not present hypothetical benchmarks as measured results."
      },
      {
        "stage": "Advanced",
        "focus": "Prepare a live critique",
        "task": "Write three difficult reviewer questions on security, accessibility and scale, then answer with known limits.",
        "artifact": "A transparent interview defense",
        "check": "Say what you have and have not tested instead of claiming full production readiness."
      }
    ]
  },
  "science": {
    "title": "The experiment with an easy conclusion",
    "setup": "A class tests one plant under a lamp and one near a window. Growth differs after a week, so the group says that lamp light always produces better plants.",
    "question": "What experimental design could separate a real effect from chance and confounding?",
    "evidence": "Use replication, controls, operational definitions, measurement reliability and uncertainty before generalization.",
    "boundary": "Examples teach scientific reasoning; do not use them as advice for hazardous laboratory experiments.",
    "choices": [
      {
        "label": "Publish a universal claim from two plants",
        "consequence": "With one sample per condition, uncontrolled differences can dominate the result."
      },
      {
        "label": "Replicate with controlled conditions and clear measures",
        "consequence": "Repeated observations and a defined outcome give a stronger basis for comparison."
      },
      {
        "label": "Change several conditions at once",
        "consequence": "Changing water, soil and light together makes causal interpretation difficult."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Define a testable question",
        "task": "State an outcome, comparison group, time period and at least three potential confounders.",
        "artifact": "A testable hypothesis and variable table",
        "check": "Measurements must be concrete and repeatable."
      },
      {
        "stage": "Intermediate",
        "focus": "Design a safer small study",
        "task": "Describe non-hazardous conditions, repeated specimens and a consistent measurement schedule.",
        "artifact": "A replication and data-collection plan",
        "check": "Specify random allocation or explain the limitations if it is unavailable."
      },
      {
        "stage": "Advanced",
        "focus": "Interpret ambiguous results",
        "task": "Write a result narrative that includes variation, small samples and an alternative explanation.",
        "artifact": "A cautious scientific conclusion",
        "check": "Do not convert correlation or an uncertain difference into universal causality."
      }
    ]
  },
  "relationships": {
    "title": "A boundary after repeated cancellations",
    "setup": "One friend repeatedly cancels plans at the last moment. The other feels unimportant but knows that caring about someone does not require unlimited availability or immediate blame.",
    "question": "How can someone state a boundary while allowing for context and preserving choice?",
    "evidence": "Separate impact from intent, make a specific request, state what you can control and identify safety concerns when present.",
    "boundary": "Relationship learning is general, not therapy. Coercion, abuse or threats call for appropriate safeguarding and support.",
    "choices": [
      {
        "label": "Publicly shame the friend",
        "consequence": "Humiliation can escalate conflict without changing a practical pattern."
      },
      {
        "label": "Explain the impact and set a workable limit",
        "consequence": "A clear request and self-directed boundary permit honesty without controlling the other person."
      },
      {
        "label": "Promise never to feel disappointed again",
        "consequence": "Suppressing a recurring concern avoids a needed decision about mutual expectations."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Distinguish need from demand",
        "task": "Write what changed, what you felt and what you can ask without controlling the other person.",
        "artifact": "An impact-and-request statement",
        "check": "Avoid labeling motive as fact."
      },
      {
        "stage": "Intermediate",
        "focus": "Practice a real boundary",
        "task": "Draft a specific agreement on confirmation times and what you will do if a plan is cancelled again.",
        "artifact": "A boundary with a controllable follow-through",
        "check": "A boundary specifies your own actions, not punishment."
      },
      {
        "stage": "Advanced",
        "focus": "Review the pattern fairly",
        "task": "Compare one emergency cancellation with a repeated pattern and explain why the response might differ.",
        "artifact": "A context-sensitive decision matrix",
        "check": "Account for empathy, consent and personal safety without excusing harm."
      }
    ]
  },
  "negotiation": {
    "title": "The contract that keeps growing",
    "setup": "A freelance designer agrees to deliver three pages. The client requests animations, analytics and unlimited revisions without moving the deadline or paying more.",
    "question": "What terms make an agreement fair and workable as the scope changes?",
    "evidence": "Compare scope, acceptance tests, cost, deadlines, dependencies, revision limits and a defensible walk-away point.",
    "boundary": "This is education about negotiation, not a determination of binding legal terms.",
    "choices": [
      {
        "label": "Accept every extra feature silently",
        "consequence": "Unmanaged changes can harm delivery quality and conceal unsustainable work."
      },
      {
        "label": "Document options for scope, budget and timeline",
        "consequence": "Offering explicit tradeoffs makes the next commitment clearer to both sides."
      },
      {
        "label": "Threaten the client immediately",
        "consequence": "An ultimatum before documenting facts can destroy a workable resolution."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Map original scope",
        "task": "Write the promised outputs, delivery date, fee and assumptions for a fictional contract.",
        "artifact": "A baseline scope checklist",
        "check": "Keep original and newly requested work separate."
      },
      {
        "stage": "Intermediate",
        "focus": "Prepare a change proposal",
        "task": "Offer three choices: preserve scope, extend the date or revise the fee with an acceptance test.",
        "artifact": "A change-request table",
        "check": "Each option must show which constraint changes."
      },
      {
        "stage": "Advanced",
        "focus": "Define a negotiation exit",
        "task": "Write a respectful refusal, a handoff plan and a note on what terms require qualified review.",
        "artifact": "A fair walk-away script",
        "check": "Do not misrepresent legal enforceability or ignore prior obligations."
      }
    ]
  },
  "shadow": {
    "title": "The consent screen that will not take no",
    "setup": "An adult user wants to disable tracking in a fictional service. The acceptance button is large and clear, while refusal is hidden behind confusing labels and repeated warnings. The interface calls declining irresponsible.",
    "question": "What does a genuinely voluntary and understandable choice require?",
    "evidence": "Inspect parity of choices, actual technical behavior, withdrawal, records and potential harms through defensive usability testing.",
    "boundary": "Adults-only educational awareness. Never use the findings to implement coercive persuasion, covert tracking or retaliation.",
    "choices": [
      {
        "label": "Copy the pressure pattern into another app",
        "consequence": "Replicating coercion would extend the harm rather than correct it."
      },
      {
        "label": "Offer equally understandable choices and verify code behavior",
        "consequence": "Real consent depends on an accessible refusal path and actual enforcement of the choice."
      },
      {
        "label": "Treat a click as proof of informed consent",
        "consequence": "Interaction counts do not show that a user understood or freely accepted the consequence."
      }
    ],
    "missions": [
      {
        "stage": "Beginner",
        "focus": "Audit visible choices",
        "task": "Record the words, placement and number of steps required to accept versus decline.",
        "artifact": "A consent-parity worksheet",
        "check": "Refusal is described without shame or hidden consequences."
      },
      {
        "stage": "Intermediate",
        "focus": "Redesign for clarity",
        "task": "Sketch a safe hypothetical consent screen with a meaningful no, clear explanation and easily found controls.",
        "artifact": "A low-fidelity accessible consent flow",
        "check": "Declining does not block unrelated core services without a justified reason."
      },
      {
        "stage": "Advanced",
        "focus": "Verify technical enforcement",
        "task": "Describe defensive tests for tracking disabled by default, decline, later withdrawal and data minimization.",
        "artifact": "A privacy acceptance-test plan",
        "check": "The system should follow the choice; a pleasing screen alone is insufficient."
      }
    ]
  }
});
export const EXPEDITION_WORLD_COUNT=Object.keys(ATLAS_EXPEDITIONS).length;
export const EXPEDITION_MISSION_COUNT=Object.values(ATLAS_EXPEDITIONS).reduce((n,item)=>n+item.missions.length,0);
const IDS=Object.freeze(["psychology","laws","business","savings","time","languages","communication","thinking","digital","career","science","relationships","negotiation","shadow"]);
const LEVELS=Object.freeze(['Beginner','Intermediate','Advanced']);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const asset=value=>/^\/assets\/[a-z0-9-]+\.svg$/.test(String(value||''))?value:'/assets/atlas-mark.svg';
const href=(id,lesson)=>'#/lesson/'+encodeURIComponent(String(id))+'/'+encodeURIComponent(String(lesson));
export function validateAtlasExpeditions(ids=IDS){
 if(!Array.isArray(ids)||ids.length!==14||new Set(ids).size!==14||EXPEDITION_WORLD_COUNT!==14||EXPEDITION_MISSION_COUNT!==42)throw Error('Incomplete expeditions');
 for(const id of ids){
  const item=ATLAS_EXPEDITIONS[id];
  if(!item||!['title','setup','question','evidence','boundary'].every(k=>typeof item[k]==='string'&&item[k].length>35))throw Error('Missing expedition editorial content: '+id);
  if(!Array.isArray(item.choices)||item.choices.length!==3||item.choices.some(x=>x.label.length<12||x.consequence.length<60))throw Error('Incomplete decision alternatives '+id);
  if(!Array.isArray(item.missions)||item.missions.length!==3||item.missions.some((x,i)=>x.stage!==LEVELS[i]||!['focus','task','artifact','check'].every(k=>typeof x[k]==='string'&&x[k].length>20)))throw Error('Incomplete field missions '+id);
 }
 return true;
}
validateAtlasExpeditions();
export function expeditionLessonRoutes(course){
 if(!course?.id||!Array.isArray(course.lessons))return [];
 return LEVELS.map(stage=>{
  const lessons=course.lessons.filter(lesson=>lesson.stage===stage);
  return {stage,lessons,next:lessons[0]||null};
 });
}
export function expeditionDecisionFeedback(courseId,index){
 const item=ATLAS_EXPEDITIONS[courseId];
 if(!item||!Number.isInteger(index)||index<0||index>=item.choices.length)return null;
 return {label:item.choices[index].label,consequence:item.choices[index].consequence,evidence:item.evidence};
}
export function renderAtlasExpedition(course,{completed=[],getStageArt=()=>null}={}){
 const item=ATLAS_EXPEDITIONS[course?.id];
 const routes=expeditionLessonRoutes(course);
 if(!item||routes.length!==3||routes.some(route=>!route.next))return '';
 const done=new Set(Array.isArray(completed)?completed:[]);
 const scene=asset(getStageArt(course.id,'Advanced')?.src);
 const cards=item.missions.map((mission,i)=>{
  const route=routes[i];
  const finished=route.lessons.filter(lesson=>done.has(course.id+':'+lesson.id)).length;
  const illustration=asset(getStageArt(course.id,mission.stage)?.src);
  return '<li class="atlas-expedition-stage">'+
   '<div class="atlas-expedition-stage-art"><img src="'+esc(illustration)+'" loading="lazy" decoding="async" alt=""/><span class="atlas-expedition-stage-number">0'+(i+1)+'</span></div>'+
   '<div class="atlas-expedition-stage-body"><span class="overline">'+esc(mission.stage)+' · '+finished+'/'+route.lessons.length+' lessons read</span>'+
   '<h4>'+esc(mission.focus)+'</h4><p>'+esc(mission.task)+'</p>'+
   '<dl><div><dt>Create</dt><dd>'+esc(mission.artifact)+'</dd></div><div><dt>Check</dt><dd>'+esc(mission.check)+'</dd></div></dl>'+
   '<a href="'+esc(href(course.id,route.next.id))+'" class="atlas-expedition-lesson">Read a linked '+esc(mission.stage.toLowerCase())+' lesson <span aria-hidden="true">↗</span></a></div></li>';
 }).join('');
 const choices=item.choices.map((choice,i)=>'<button type="button" class="atlas-expedition-choice" data-atlas-expedition-choice="'+i+'" aria-pressed="false">'+
  '<span class="atlas-expedition-choice-index">0'+(i+1)+'</span><span>'+esc(choice.label)+'</span><span aria-hidden="true">↗</span></button>').join('');
 return '<section class="atlas-expedition" id="atlas-expedition" data-atlas-expedition-world="'+esc(course.id)+'" aria-label="Applied expedition for '+esc(course.title)+'">'+
  '<details class="atlas-expedition-disclosure"><summary class="atlas-expedition-summary">'+
   '<span class="atlas-expedition-poster"><img src="'+esc(scene)+'" alt="" loading="lazy" decoding="async"/><span class="atlas-expedition-poster-shade"></span></span>'+
   '<span class="atlas-expedition-summary-content"><span class="overline">THE EXPEDITION STUDIO · THREE FIELD MISSIONS</span><strong>'+esc(item.title)+'</strong>'+
   '<span>Practice a real-world judgment, then build evidence from beginner to advanced.</span><em>Open the Expedition Studio <span aria-hidden="true">↗</span></em></span></summary>'+
   '<div class="atlas-expedition-interior"><div class="atlas-expedition-intro"><span class="overline">01 / THE SITUATION</span>'+
    '<h2>'+esc(item.question)+'</h2><p>'+esc(item.setup)+'</p></div>'+
    '<div class="atlas-expedition-decision"><div class="atlas-expedition-section-heading"><span class="overline">02 / COMPARE THE CHOICES</span><h3>Choose a response to examine.</h3><p>There is no grade. Compare the likely tradeoff, then reconsider your choice.</p></div>'+
    '<div class="atlas-expedition-choices" role="group" aria-label="Possible responses">'+choices+'</div>'+
    '<div class="atlas-expedition-feedback" aria-live="polite" aria-atomic="true" hidden><span class="overline">CONSEQUENCE TO CONSIDER</span><h4 class="atlas-expedition-feedback-title"></h4><p class="atlas-expedition-feedback-text"></p><p class="atlas-expedition-feedback-evidence"></p></div></div>'+
    '<div class="atlas-expedition-section-heading"><span class="overline">03 / THE FIELDWORK ROUTE</span><h3>Turn an answer into a demonstrable skill.</h3><p>Three independent missions, aligned with existing published levels. Lesson completion is shown for navigation only.</p></div>'+
    '<ol class="atlas-expedition-stages">'+cards+'</ol>'+
    '<div class="atlas-expedition-final"><span class="overline">04 / TEST THE CLAIM</span><h3>What would persuade a careful reviewer?</h3><p>'+esc(item.evidence)+'</p>'+
     '<p class="fineprint">'+esc(item.boundary)+' Educational missions are optional, ungraded, and pending independent editorial review. Nothing here generates a score, credential or new stored learner record.</p></div>'+
   '</div></details></section>';
}
const installedDocs=new WeakSet();
export function installAtlasExpedition(doc=typeof document==='undefined'?null:document){
 if(!doc||typeof doc.addEventListener!=='function'||installedDocs.has(doc))return false;
 installedDocs.add(doc);
 doc.addEventListener('click',event=>{
  const button=event.target?.closest?.('[data-atlas-expedition-choice]');
  const root=button?.closest?.('.atlas-expedition');
  if(!root)return;
  const choice=Number(button.getAttribute('data-atlas-expedition-choice'));
  const info=expeditionDecisionFeedback(root.getAttribute('data-atlas-expedition-world'),choice);
  if(!info)return;
  root.querySelectorAll('[data-atlas-expedition-choice]').forEach(element=>element.setAttribute('aria-pressed',String(element===button)));
  const feedback=root.querySelector('.atlas-expedition-feedback');
  if(!feedback)return;
  feedback.querySelector('.atlas-expedition-feedback-title').textContent=info.label;
  feedback.querySelector('.atlas-expedition-feedback-text').textContent=info.consequence;
  feedback.querySelector('.atlas-expedition-feedback-evidence').textContent='Evidence to look for: '+info.evidence;
  feedback.hidden=false;
 });
 return true;
}
if(typeof document!=='undefined')installAtlasExpedition();
