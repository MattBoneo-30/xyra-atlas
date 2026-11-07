/** Original applied studios, first seven subjects. The numbers and cases
 * are fictional. Expert and jurisdictional review remain outstanding.
 * Each studio teaches a sequence of artifacts, not just a multiple-choice fact.
 */
export const PRACTICAL_STUDIOS_ONE={
 psychology:{
  title:'Evidence journal: calibrate your interpretations',
  situation:'A student is convinced they always fail presentations because two talks felt uncomfortable. Their supervisor has feedback from four talks, but the student only remembers the most awkward moments. This studio tests evidence collection and decisions without making a diagnosis.',
  rounds:[
   {title:'Build a calibration ledger',
    focus:'Confidence is an estimate, not a substitute for an observable result. To learn from a prediction, define an outcome first and record both the prediction and what actually happened. Memories of embarrassing moments can make uncertain judgments feel certain.',
    evidence:'Imagine four presentations: two received “clear” ratings, one was “mixed,” and one was “needs structure.” The learner had predicted all four would be judged “poor.” The distribution and their prediction are both part of the record.',
    assignment:'Design a six-column ledger with date, situation, prediction, confidence, actual feedback, and an alternative explanation. Enter all four fictional outcomes and state what comparison would reveal inaccurate confidence. Do not reframe a rating as a clinical symptom.',
    model:'A defensible ledger keeps the four independent ratings and the original prediction instead of rewriting the prediction after receiving feedback. Only one of four was rated as needing structure. The blanket claim that all presentations fail is inconsistent with these observations; future predictions should be more specific.',
   },
   {title:'Design a small improvement experiment',
    focus:'A learning experiment needs one change and a measurable outcome. Improvement can be evaluated without turning natural discomfort into a disorder. Try a revised opening, clearer transition cues, or a deliberate rehearsal plan—one at a time.',
    evidence:'A new two-minute opening can be rehearsed before the next talk. Audience feedback should address clarity and organization using the same rubric as earlier talks, while accounting for different content and reviewers.',
    assignment:'Write a two-week plan with one intervention, baseline, consistent rubric, observation log, and stop condition if stress becomes severe. Draft a conclusion you could write if the outcome is unchanged, better, or worse.',
    model:'For two talks, rehearse a structured opening and collect the same clarity and organization ratings as the baseline. Report the actual scores without promising the intervention caused every change. If severe distress occurs, seek appropriate human support rather than self-diagnosing from the exercise.',
   }
  ],
  rubric:['Records predictions before reviewing outcomes and keeps unfavorable observations.','Separates self-reported feelings from externally defined performance measures.','Proposes a narrow, ethical test with limits and alternate explanations.','Avoids clinical diagnosis and unsupported claims about every future presentation.']
 },
 laws:{
  title:'Consumer issue casebook: source, evidence, procedure',
  situation:'A fictional buyer in the Philippines orders an advertised laptop accessory and receives a materially different item. The seller offers store credit but disputes the buyer’s description. The buyer has screenshots, a payment record, delivery details, and an email thread, but has not checked which current laws or agency procedures apply.',
  rounds:[
   {title:'Construct a chronology that another person can audit',
    focus:'A useful consumer case file distinguishes claims, dates, documents, disputed facts and desired outcomes. It avoids assuming that a social-media explanation is the controlling legal authority. The content and timing of the actual transaction must be verifiable.',
    evidence:'Available records include the dated product listing, order confirmation, payment reference, unboxing photographs, customer-service messages and a record of when the discrepancy was first reported.',
    assignment:'Build a timeline with at least five events and identify which document supports each event. Separate the purchaser’s allegation from what the seller has confirmed. Draft a neutral two-sentence summary and state which document would help resolve the central dispute.',
    model:'A reliable chronology links the purchase date to the archived listing and receipt, the delivery to courier evidence, and the product difference to contemporaneous photos. It describes the seller’s store-credit offer accurately without claiming that offer automatically meets or violates the law.',
   },
   {title:'Find the authority and prepare a proportionate request',
    focus:'Consumer protection depends on the actual facts, legal source and current agency process. Before naming remedies or deadlines, verify the current text of applicable Philippine provisions and guidance from official agencies. Do not invent a statutory deadline or regulatory ruling.',
    evidence:'The known facts are enough to formulate precise questions, but they do not establish the final remedy, complaint venue, or specific deadline under current regulations.',
    assignment:'Create a source-verification table with official law or agency source, exact issue, applicability question, last-checked date and unresolved facts. Write a complaint draft requesting clarification and an appropriate resolution without threatening publicity or exposing private contact details.',
    model:'The buyer can state the item shown, item received, supporting documents and requested resolution, asking the seller to respond through verified channels. A reviewer checks the current DTI guidance and applicable law before deciding whether a complaint may be escalated and what remedy is available.',
   }
  ],
  rubric:['Every factual claim has a corresponding record, date or explicit unknown status.','Distinguishes primary law and official guidance from informal social-media commentary.','Avoids inventing legal remedies, filing deadlines or final agency findings.','Protects personal information and uses proportionate verified channels.']
 },
 business:{
  title:'Cohort economics: separate new customers from valuable customers',
  situation:'A fictional subscription tool gains 100 paying customers through a ₱20,000 campaign. Its contribution after variable service costs is ₱180 per customer per active month, and only 60 of those customers remain active for month two. The business wants to describe the campaign as profitable immediately.',
  rounds:[
   {title:'Model the first two months without hiding attrition',
    focus:'Acquisition cost and contribution occur on different schedules. The simple initial acquisition cost is ₱20,000 divided by 100, or ₱200 per paying customer. Contribution must be calculated for each active cohort month; calling gross revenue profit hides important expenses.',
    evidence:'The stated cohort has 100 active customers in month one and 60 in month two; contribution is ₱180 per active customer-month before fixed company costs, taxes, refunds and other unknown obligations.',
    assignment:'Compute month-one contribution, month-two contribution and cumulative two-month contribution, then subtract only the specified campaign expense. Explain why the resulting difference is neither company profit nor cash in the bank. Name three missing inputs.',
    model:'Month one contributes ₱18,000; month two contributes ₱10,800; combined contribution is ₱28,800. After ₱20,000 campaign spending the simplified two-month excess is ₱8,800. It excludes fixed costs, payment timing, refunds and other costs, so the campaign cannot yet be declared fully profitable.',
   },
   {title:'Create a decision rule for the next advertising test',
    focus:'A sensible expansion decision follows observed retention and collection, not an optimistic extrapolation. A second campaign should have a target cohort, reporting dates, a budget cap, a refund measure and an exit criterion before any spending is approved.',
    evidence:'The month-two retention among the original cohort is 60/100, or 60% of the starting customers, assuming the data includes the entire initial paying cohort and defines active consistently.',
    assignment:'Write a two-month pilot protocol with cohort definition, observed retention, customer acquisition cost, collection timing and max loss. Specify how to report a worse result and a stop condition that protects working cash.',
    model:'Keep the next test small enough to absorb losses, measure actual paid acquisition and month-two active retention, and reconcile settled revenue to payouts. Do not scale if contribution after incremental costs or cash runway falls outside predetermined limits; report uncertainty and alternative explanations.',
   }
  ],
  rubric:['Computes contribution and acquisition metrics using the stated denominators.','Distinguishes cohort contribution from total profit and settled cash.','Records retention and refund assumptions without inventing lifetime value.','Uses a bounded new experiment with stop criteria and credible measurement.']
 },
 savings:{
  title:'Savings decisions under inflation, timing and uncertainty',
  situation:'A fictional worker has ₱60,000 in cash, essentials of ₱20,000 a month and an optional ₱15,000 purchase. A product advertises 4% annual simple interest paid after one year, while a hypothetical basket of essential goods is expected to increase 5% over the same year. Product safety, fees and payout terms are not yet verified.',
  rounds:[
   {title:'Calculate what money can do, not just its nominal label',
    focus:'Nominal returns and purchasing power describe different things. Under a deliberately simplified one-year example with a 4% simple return and 5% price increase, the purchasing power of the final balance is measured relative to the new price level, not the original one.',
    evidence:'If the full ₱60,000 earns 4% for one year without fees, the stated nominal ending balance would be ₱62,400. Dividing by a price index of 1.05 gives approximately ₱59,429 in starting-year purchasing-power pesos.',
    assignment:'Recalculate the year-end nominal figure and inflation-adjusted figure with explicit units. State the approximate real percentage change, and list why the example is not a forecast or a recommendation to lock up an emergency fund.',
    model:'Nominal: ₱60,000×1.04=₱62,400. Adjusted for the hypothetical 5% price increase: ₱62,400/1.05≈₱59,429 in starting-year pesos, a real change of about −0.95%. The result ignores risk, taxes, fees and product terms, all of which matter before a real decision.',
   },
   {title:'Run a three-month liquidity stress test',
    focus:'The original ₱60,000 supports three months of stated ₱20,000 essentials before any income, surprise expense, or other obligation. Choosing an optional purchase or locking savings reduces the cash accessible when bills arrive.',
    evidence:'If the worker buys the ₱15,000 item immediately, liquid cash becomes ₱45,000. After month-one and month-two essential costs with no income, balances would be ₱25,000 and ₱5,000, leaving insufficient funds for the third month.',
    assignment:'Build a monthly cash table for three cases: no optional purchase, purchase today and purchase after confirmed extra income. Include a branch for a late paycheck and a checklist of independently verified product terms.',
    model:'Without the purchase, balances after three months of essentials are ₱40,000, ₱20,000 and ₱0. With the purchase, they are ₱25,000, ₱5,000 and −₱15,000. Deferring the purchase until income is genuinely received preserves flexibility and avoids treating a future deposit as guaranteed cash.',
   }
  ],
  rubric:['Shows both nominal and inflation-adjusted arithmetic with honest assumptions.','Uses dated cash balances and does not treat unavailable funds as liquid.','Distinguishes optional purchases from essential obligations.','Avoids presenting illustrative product returns as verified safe investments.']
 },
 time:{
  title:'Work-in-progress study: measure flow before adding tasks',
  situation:'An engineering team has 12 active tasks, completed 8 tasks in the last 10 working days, and is receiving 12 new tasks every 10 working days. They try to fix the backlog by assigning everyone more tasks at once, but the review queue is consistently full.',
  rounds:[
   {title:'Compute observed throughput and identify the bottleneck',
    focus:'Throughput describes completed work per period; arrivals describe demand. In this simplified observation the team finishes 0.8 tasks per workday while demand arrives at 1.2 per workday. If these rates persist, unfinished work accumulates even when individuals appear busy.',
    evidence:'The starting work-in-progress is 12. Eight tasks were completed and twelve arrived during one 10-day interval. Without cancellations or other exits, the active count would rise to 16 at the end of the interval.',
    assignment:'Draw a flow diagram with incoming tasks, active work, review queue and completed tasks. Compute completion and arrival rates and the updated backlog. Explain which measures and assumptions must be checked before concluding a permanent trend.',
    model:'Completing 8 and adding 12 raises the active count from 12 to 16. The observed net addition is four tasks over ten days. Rates are descriptive for one interval and can change with task size, interruptions and delivery scope; investigate the review queue instead of simply instructing more parallel starts.',
   },
   {title:'Run a controlled reduction in parallel work',
    focus:'A work-in-progress limit is a hypothesis about attention and queueing, not an automatic promise of speed. The team can test starting fewer simultaneous items and finishing more work through the constrained review stage. Measure outcome and quality, not only busyness.',
    evidence:'Over the next two intervals, the team could track completed tasks, items waiting for review, age of open tasks, defects found after review and new arrivals while keeping the definition of a completed task stable.',
    assignment:'Design a two-interval comparison with a visible WIP limit and a policy for urgent incidents. Specify the metrics, an acceptance condition, a failure condition, and why one surprising week should not be treated as universal proof.',
    model:'Set a plausible trial limit, make the review queue and its capacity explicit, and observe whether task age or throughput improves without worse defects. If outcomes deteriorate, revise the policy. Avoid claiming causation or a specific capacity increase from one small, uncontrolled comparison.',
   }
  ],
  rubric:['Calculates demand, throughput and backlog with consistent time units.','Names the review bottleneck and avoids equating utilization with delivery.','Defines comparable acceptance and quality measurements for a WIP experiment.','Reports limits and does not guarantee a speed improvement from a single test.']
 },
 languages:{
  title:'Four-skill evidence plan: recognition is not conversation',
  situation:'An adult learner has memorized all eight starter phrases in one language. They can identify the written translation on cards, but have never been tested with unfamiliar audio, spontaneous speaking, or a conversation partner who asks an unplanned question.',
  rounds:[
   {title:'Design separate tests for reading and listening',
    focus:'Reading recognition and listening comprehension are related but distinct. A script with translation options measures something different from identifying a spoken meaning without a transcript. Written recall should not be mislabeled as speaking or native-level pronunciation.',
    evidence:'The existing Atlas pack contains authored forms for eight common intentions such as greeting, asking to repeat and saying that something was not understood. Some packs contain approximate transliteration; none has independent native approval.',
    assignment:'Specify four tasks: visible-text recognition, hidden-text written recall, unseen human-recorded listening, and interactive repair. Name the evidence each task provides and what must remain “not assessed” if appropriate audio is unavailable.',
    model:'A defensible profile might report written recognition on authored cards, attempt to recall the written form without options, and label listening and pronunciation as unassessed until qualified audio and feedback exist. Each score remains bounded to the measured task and selected regional variety.',
   },
   {title:'Create a Can-do task without promising A1 certification',
    focus:'An observable communicative ability is more useful than claiming general fluency. A practical starter task is to get attention, ask for help, signal misunderstanding and politely request repetition. This can be rehearsed without assuming the other person will follow a memorized script.',
    evidence:'Existing phrase IDs for “Excuse me,” “Where is the station?,” “I don’t understand,” “Please repeat,” and “Thank you” support a very limited rehearsal. They do not establish correct local register, authentic comprehension, or wider grammar.',
    assignment:'Write a five-step role-play using the authored phrase IDs rather than inventing new translations. Identify one natural interruption and design a clarification strategy. Define the human-reviewed criteria needed before calling the task successful in an authentic interaction.',
    model:'A scripted attempt has the sequence attention → question → admission of uncertainty → repeat request → gratitude. It must still be assessed for naturalness and comprehension by a qualified speaker, with understanding and repair recorded separately from pronunciation. Do not issue a CEFR level based only on the simulation.',
   }
  ],
  rubric:['Separates recognition, written recall, listening comprehension and interaction.','Uses existing authored phrases without inventing unreviewed translated dialogues.','Defines an observable limited communication task with genuine repair.','Avoids unsupported language-level, pronunciation or regional-certification claims.']
 },
 communication:{
  title:'Asynchronous handoff: make decisions inspectable',
  situation:'A distributed development team exchanges messages across time zones. A production incident ticket says “fixed,” but the change has no acceptance criteria, owner, rollback note or reproducible test. Two teammates assume someone else will verify the result.',
  rounds:[
   {title:'Convert an ambiguous update into a decision record',
    focus:'Effective asynchronous communication reduces guesswork. A useful update includes the observed incident, responsible owner, impact, decision, supporting evidence, and unresolved risk. Clarity matters more than polished tone when people cannot immediately ask follow-up questions.',
    evidence:'The only confirmed event is that a code change was submitted. “Fixed” does not show which bug was reproduced, which condition passed or whether the deployed system was tested.',
    assignment:'Write an incident update with a clear title, impact, timestamps, current owner, reproduction conditions, test result, next verifier and unknowns. Label the difference between locally tested and deployed behavior.',
    model:'“A login error was reproduced on a local test build, and commit X passed the specified regression test. Production behavior is not yet verified. Owner A will check staging against acceptance conditions; rollback and monitoring details remain open.” This is more actionable than an unqualified “fixed.”',
   },
   {title:'Design a confirmation loop that survives a time-zone gap',
    focus:'A handoff requires both a recipient and a confirmable outcome. A message can be clear but ineffective if nobody is accountable for reading or verifying it. Define a bounded response window, fallback escalation and a traceable closure condition.',
    evidence:'The release requires a working login, a recoverable failure state and a validated rollback option. These conditions are independently testable and should not be replaced by a read receipt.',
    assignment:'Write a five-field handoff checklist, an acknowledgment template and a release hold rule if evidence is missing. Include a scenario when the owner is unavailable and specify who may authorize a change to the plan.',
    model:'Assign a next owner, due checkpoint, verification test, escalation contact and release criterion. A recipient acknowledges both receipt and responsibility. If verification does not arrive, release stays on hold and the issue moves through the agreed escalation route rather than being silently accepted.',
   }
  ],
  rubric:['Separates submitted changes from verified outcomes and records evidence.','Defines a responsible next owner and a practical confirmation point.','Uses measurable acceptance criteria and a fallback for unavailable collaborators.','Preserves escalation, rollback and release requirements instead of treating silence as approval.']
 }
};
