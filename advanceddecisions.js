/** Third original advanced case in each subject. Educational, not a credential. */
const RAW={
  "psychology": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A team's productivity declines after a new schedule, but several people also change projects. What study design best addresses confounding?",
    "options": [
      "Compare similar teams, track pre/post performance and project changes, and avoid assigning one cause before those differences are tested.",
      "Interview the two unhappiest employees and treat the repeated complaints as proof that the schedule alone caused the decline.",
      "Compare only the team's performance after the schedule change because the earlier workload and conditions are no longer directly relevant."
    ],
    "correct": 0,
    "explanation": "Multiple factors changed simultaneously. Defined measurements and credible comparisons help evaluate the schedule's possible effect, whereas retrospective impressions or post-only data do not isolate causation."
  },
  "laws": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A Philippine online service refuses to correct a user's address, claiming the Data Privacy Act always requires deleting the whole account instead. What should be done?",
    "options": [
      "Demand deletion of every record immediately and assume the staff member's broad legal explanation applies to every case.",
      "Ask the verified privacy office about the inaccurate field, applicable conditions and rectification procedure, retaining a dated response.",
      "Request copies of other customers' private account records to compare how the organization handles requests."
    ],
    "correct": 1,
    "explanation": "Rectification and erasure are different rights with legal conditions. The actual processing context and current NPC guidance must inform next steps; one employee's broad claim does not prove a universal rule."
  },
  "business": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "An app receives 100 free signups, but 70 leave when a compulsory charge appears at checkout. Which experiment provides reliable demand evidence?",
    "options": [
      "Use a shorter countdown and disclose the fee at the end to reduce users' opportunities to compare alternatives.",
      "Declare all 100 signups as paying conversions because account registration indicates intent to subscribe.",
      "Display the full fee early, test a transparent purchase flow and measure completed paid orders alongside refund complaints."
    ],
    "correct": 2,
    "explanation": "Free signups are not completed transactions. A transparent experiment measures willingness to purchase without deceptive scarcity or hidden costs, including downstream dissatisfaction."
  },
  "savings": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A family has ₱18,000 in monthly essentials, ₱12,000 liquid savings and a planned ₱15,000 bill due in two months. How should it plan?",
    "options": [
      "Separate the planned bill from emergency savings, estimate the shortfall and assess feasible cashflow adjustments before committing funds.",
      "Treat all ₱12,000 as investment surplus because the planned bill is not due until a later month.",
      "Move the full balance into a speculative product promising weekly gains to meet the deadline."
    ],
    "correct": 0,
    "explanation": "A known bill requires planned cashflow; an emergency reserve is a different purpose. The savings already cover less than one month of essentials even before the upcoming obligation."
  },
  "time": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A software release keeps slipping although coding ends on time; integration tests wait on an unreliable shared API. Which response best addresses this?",
    "options": [
      "Increase every employee's hours by the same amount since the team's collective effort will offset the API problem.",
      "Track the dependency, use verified API contracts or mocks where appropriate, and establish a credible fallback plan.",
      "Move the deadline silently without recording the cause because tracking risk can discourage the team."
    ],
    "correct": 1,
    "explanation": "A shared dependency can determine the entire critical path. Clear interfaces, visible handoffs and contingency scope are more effective than generalized overwork."
  },
  "languages": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A learner reads Japanese travel phrases correctly but struggles to follow unscripted spoken replies. Which assessment most directly tests the gap?",
    "options": [
      "Repeat the written phrase multiple-choice quiz and assume listening improves by the same proportion.",
      "Ask the browser's text-to-speech system to award an accuracy certificate after one attempt.",
      "Use varied unfamiliar but suitable audio and real replies, log understanding and clarification, and seek qualified speech feedback."
    ],
    "correct": 2,
    "explanation": "Reading, listening and speaking are distinct abilities. Direct listening tasks and separate pronunciation review are stronger evidence than a text score or unverified synthetic voice."
  },
  "communication": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A team lead apologizes for interrupting a colleague, but the colleague declines another meeting. Which action best supports accountable repair?",
    "options": [
      "Respect the refusal, make an observable change in future meetings, and leave further conversation voluntary.",
      "Insist the colleague listen to the apology so the issue can be considered resolved immediately.",
      "Ask mutual coworkers to convince the colleague to accept the apology before new work begins."
    ],
    "correct": 0,
    "explanation": "Repair includes changed conduct and respect for another person's choice. An apology does not entitle the speaker to a meeting, forgiveness or pressure through third parties."
  },
  "thinking": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A report says an outcome 'doubled' from 2 in 1,000 to 4 in 1,000 in an observational study. Which summary is most accurate?",
    "options": [
      "The intervention is proven to cause twice as many successes, and every comparable person benefits equally.",
      "The relative increase is 100%, the absolute increase is 2 per 1,000, and observational design leaves causality uncertain.",
      "The absolute change is too small to mention and therefore both the data and the headline must be false."
    ],
    "correct": 1,
    "explanation": "The two effect descriptions can be mathematically true. Denominator, uncertainty and design matter: confounding may explain some or all of the observed association."
  },
  "digital": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "An AI-generated migration deletes a database column consumed by older clients and claims that rollback will be easy. How should it be reviewed?",
    "options": [
      "Deploy immediately because a confident tool response usually means the proposed code was tested on matching infrastructure.",
      "Run it in production first and request a safer script only after customers experience broken features.",
      "Inspect affected clients and migration SQL, test backup and rollback in staging, and plan compatibility before approval."
    ],
    "correct": 2,
    "explanation": "Destructive migrations can cause data loss or compatibility failures. A staging rehearsal, verified backups and dependency inventory provide evidence the generated explanation cannot supply."
  },
  "career": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A portfolio claims a redesign boosted task completion 60%, but it only includes screenshots and comments from two friends. What is strongest?",
    "options": [
      "Remove the unsupported statistic, describe actual work and observations, and define the future test required to measure task completion.",
      "Preserve the 60% figure and add a footnote calling it an estimate because a visual comparison establishes task improvement.",
      "Relabel 60% as an anonymous industry benchmark so reviewers cannot examine a specific original source."
    ],
    "correct": 0,
    "explanation": "Task-completion improvement requires a measurable baseline, method and outcomes. Honest scope and reproducible work can be strong evidence without invented results."
  },
  "science": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "Hospital queues fall after management simultaneously adds appointment slots and new staff. Which conclusion fits an observational comparison?",
    "options": [
      "New appointment slots alone caused the fall, since they were introduced before the observed shorter queue.",
      "More staff alone must have caused the fall, because staffing is always the strongest determinant of wait time.",
      "Queue length declined during the combined changes; isolating either cause needs additional comparisons and confounder checks."
    ],
    "correct": 2,
    "explanation": "Two interventions occurred together. The observation suggests a change in the period, but attributing it to one cause requires stronger study design."
  },
  "relationships": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A friend says a partner threatens to publish private messages unless given password access. They worry direct confrontation could increase risk. What helps?",
    "options": [
      "Tell the friend to confront the partner immediately so the seriousness of the threat can be assessed in person.",
      "Respect their agency, explore safe trusted support, and consider preserving relevant evidence only when lawful and safe.",
      "Recommend complying temporarily and then silently reclaiming the passwords once the immediate threat seems over."
    ],
    "correct": 1,
    "explanation": "Password demands tied to threats are coercive warning signs. Safety, confidentiality and freely chosen support matter more than forcing a confrontation or compliance."
  },
  "negotiation": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A freelance offer has higher initial pay but unlimited revisions and permanent exclusive rights. How should the counteroffer be prepared?",
    "options": [
      "Estimate realistic workload and rights value, specify revision and licensing limits, and offer a truthful alternative scope.",
      "Compare the first payment only and treat future edits and rights as cost-free because the requirements are uncertain.",
      "Invent another client's larger offer to pressure the buyer into agreeing to favorable terms."
    ],
    "correct": 0,
    "explanation": "Complete scope, rights and honest alternatives determine the value of a deal. Clear terms and feasible limits support an informed agreement."
  },
  "shadow": {
    "id": "decision-3",
    "stage": "Advanced",
    "prompt": "A subscription interface puts 'accept all tracking' in a prominent button while hiding refusal behind several screens. What is the protective learning response?",
    "options": [
      "Reproduce the design to find which wording maximizes accidental acceptance in paying customers.",
      "Recognize the uneven choice architecture, document disclosure issues and propose equally clear consent and refusal.",
      "Ignore the layout because reaching checkout automatically means the buyer knowingly agreed to every optional permission."
    ],
    "correct": 1,
    "explanation": "The educational purpose is recognizing and resisting manipulative interface patterns and restoring voluntary informed choice, not optimizing coercion."
  }
};
export const ADVANCED_DECISIONS=Object.freeze(Object.fromEntries(Object.entries(RAW).map(([courseId,q])=>
 [courseId,Object.freeze({...q,options:Object.freeze([...q.options])})])));
