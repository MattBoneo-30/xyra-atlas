/** Offline scenario practice. These simplified examples are educational, not personal advice. */
export const SCENARIOS=[
  {
    "id": "investment-pressure",
    "category": "Money",
    "title": "The guaranteed investment",
    "setup": "A group chat promises 20% returns each month and demands a transfer before midnight. Members claim that everyone is making money.",
    "question": "What is the strongest first response?",
    "choices": [
      {
        "label": "Send a small amount to test it",
        "result": "A small amount can still be lost, and early payments do not prove legitimacy.",
        "preferred": false
      },
      {
        "label": "Independently verify the provider without sending money",
        "result": "Independent official checks reduce risk and let you resist manufactured urgency.",
        "preferred": true
      },
      {
        "label": "Trust the testimonials",
        "result": "Testimonials can be fake or misleading.",
        "preferred": false
      }
    ],
    "takeaway": "High guaranteed returns and urgency are warning signs; check official investor alerts.",
    "source": "https://www.sec.gov.ph/investors-education-and-information/"
  },
  {
    "id": "work-boundary",
    "category": "Communication",
    "title": "An after-hours request",
    "setup": "A coworker texts at 11 PM for help with a routine task that can wait until tomorrow. There is no on-call arrangement.",
    "question": "How do you respond with a healthy boundary?",
    "choices": [
      {
        "label": "Ignore them permanently",
        "result": "A silent cutoff makes expectations harder to coordinate.",
        "preferred": false
      },
      {
        "label": "Reply during working hours and clarify availability",
        "result": "Clear respectful expectations protect time and cooperation.",
        "preferred": true
      },
      {
        "label": "Agree immediately while resenting them",
        "result": "Silent resentment does not solve an availability mismatch.",
        "preferred": false
      }
    ],
    "takeaway": "Boundaries describe your own availability; emergencies may have separate rules.",
    "source": "https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work"
  },
  {
    "id": "delivery-rights",
    "category": "Law",
    "title": "Your delivery arrived damaged",
    "setup": "A package arrives with a broken item. The seller claims you have no right to complain because you already opened it.",
    "question": "What is the most constructive next step?",
    "choices": [
      {
        "label": "Publish the seller's personal number",
        "result": "Sharing private details creates new risks without fixing the transaction.",
        "preferred": false
      },
      {
        "label": "Keep evidence and request a specific remedy in writing",
        "result": "Receipts, photos, and a dated request help document what happened.",
        "preferred": true
      },
      {
        "label": "Assume an unconditional instant refund is guaranteed",
        "result": "Remedies depend on relevant laws and transaction facts.",
        "preferred": false
      }
    ],
    "takeaway": "Document the facts, seek a suitable remedy, and use an appropriate complaint channel.",
    "source": "https://www.dti.gov.ph/konsyumer/consumer-education/"
  },
  {
    "id": "sale-pressure",
    "category": "Critical Thinking",
    "title": "Only one left at this price",
    "setup": "You are comparing computers. A store banner shows only one left, with the sale ending tonight, though you did not plan to buy today.",
    "question": "How can you avoid a pressured choice?",
    "choices": [
      {
        "label": "Buy because scarcity proves value",
        "result": "Scarcity is not evidence that the product suits your needs.",
        "preferred": false
      },
      {
        "label": "Check specifications, budget and independent comparisons",
        "result": "Comparison grounds the decision in needs rather than artificial urgency.",
        "preferred": true
      },
      {
        "label": "Assume every sale is a scam",
        "result": "Some discounts are legitimate; assess evidence instead.",
        "preferred": false
      }
    ],
    "takeaway": "Urgency can shape decisions without improving the underlying offer.",
    "source": "https://consumer.ftc.gov/shopping-and-donating"
  },
  {
    "id": "business-price",
    "category": "Business",
    "title": "Matching a competitor's low price",
    "setup": "You sell something for ₱150 with variable costs of ₱130. A competitor offers a similar item at ₱120.",
    "question": "What should you calculate first?",
    "choices": [
      {
        "label": "Match the price immediately",
        "result": "Selling at ₱120 loses ₱10 per unit before any fixed expenses.",
        "preferred": false
      },
      {
        "label": "Check contribution margin, demand and cost structure",
        "result": "Unit economics show whether matching is sustainable.",
        "preferred": true
      },
      {
        "label": "Ignore the competitor entirely",
        "result": "Competitors provide market information even when you choose a different price.",
        "preferred": false
      }
    ],
    "takeaway": "Contribution margin is price minus variable cost; positive margin alone does not guarantee profit.",
    "source": "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis"
  },
  {
    "id": "time-budget",
    "category": "Productivity",
    "title": "Four goals and just one free hour",
    "setup": "Four large projects are all marked urgent, but you have only one free hour tonight and need rest afterwards.",
    "question": "Which plan is most realistic?",
    "choices": [
      {
        "label": "Switch between all tasks every few minutes",
        "result": "Switching rapidly can create activity without meaningful progress.",
        "preferred": false
      },
      {
        "label": "Timebox one useful next action and reschedule others",
        "result": "A smaller defined action helps make honest progress within your capacity.",
        "preferred": true
      },
      {
        "label": "Skip sleep to complete everything",
        "result": "Repeated sleep restriction can damage health and decision-making.",
        "preferred": false
      }
    ],
    "takeaway": "Effective prioritization includes intentionally postponing some tasks.",
    "source": "https://www.cdc.gov/sleep/about/index.html"
  }
];
const byId=new Map(SCENARIOS.map(s=>[s.id,s]));
export function normalizeScenarioAnswers(value){const out={};if(!value||typeof value!=='object'||Array.isArray(value))return out;for(const [id,choice] of Object.entries(value)){const s=byId.get(id);if(s&&Number.isInteger(choice)&&choice>=0&&choice<s.choices.length)out[id]=choice;}return out;}
export function recordScenarioAnswer(value,id,choice){const out=normalizeScenarioAnswers(value),s=byId.get(id);if(s&&Number.isInteger(choice)&&choice>=0&&choice<s.choices.length)out[id]=choice;return out;}
export function scenarioProgress(value){const valid=normalizeScenarioAnswers(value);return {done:Object.keys(valid).length,total:SCENARIOS.length,thoughtful:SCENARIOS.filter(s=>valid[s.id]!==undefined&&s.choices[valid[s.id]].preferred).length};}
