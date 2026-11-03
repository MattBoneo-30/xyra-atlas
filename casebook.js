/** Xyra Atlas branching Case Files. All stories are fictional and educational. */
export const CASE_FILES=[
  {
    "id": "bank-phishing",
    "title": "The Midnight Bank Alert",
    "subject": "Digital Safety",
    "art": "course-digital",
    "intro": "A text claims your bank account will be locked in ten minutes. The link looks official, but you were not expecting this alert.",
    "scene": "The message demands that you sign in immediately and provide a one-time code.",
    "prompt": "What do you do first?",
    "branches": [
      {
        "label": "Open the bank's familiar app independently.",
        "insight": "A trusted route helps you check claims without following an unknown link.",
        "scene": "Your normal banking app shows no account warning. A stranger in the group offers to investigate if you send your password.",
        "prompt": "What do you do next?",
        "options": [
          {
            "label": "Decline and report the suspicious message through official channels.",
            "title": "You interrupted the pressure",
            "outcome": "You verified the situation independently and did not share sensitive credentials.",
            "takeaway": "Urgency, polished branding and a helpful stranger do not prove a request is safe."
          },
          {
            "label": "Send the stranger your password and one-time code.",
            "title": "A new vulnerability appears",
            "outcome": "The stranger now has information that could be used against your account, regardless of the original message.",
            "takeaway": "Never share passwords or one-time codes with unsolicited helpers. Secure exposed accounts promptly."
          }
        ]
      },
      {
        "label": "Follow the message link and enter your login.",
        "insight": "Lookalike websites can steal credentials even when their appearance seems authentic.",
        "scene": "The site asks for a one-time code. You notice that its address differs from your bank's official domain.",
        "prompt": "What now?",
        "options": [
          {
            "label": "Stop and use genuine bank recovery and support channels.",
            "title": "You began recovery",
            "outcome": "You recognize possible disclosure and take steps to secure the account and review activity.",
            "takeaway": "Act promptly after suspected exposure. Use independently verified contact details, not the suspicious page."
          },
          {
            "label": "Ignore the warning and do nothing.",
            "title": "The risk remains open",
            "outcome": "A malicious actor could still have useful information. Delay makes it harder to contain an active account compromise.",
            "takeaway": "When credentials may be exposed, independent verification and account recovery matter."
          }
        ]
      }
    ],
    "sourceLabel": "FTC — Recognize and Avoid Phishing Scams",
    "sourceUrl": "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams"
  },
  {
    "id": "work-boundary",
    "title": "An Unexpected Late-Night Task",
    "subject": "Communication",
    "art": "course-communication",
    "intro": "A colleague messages at 11 PM requesting a routine report that is not due until next week. You are not on call.",
    "scene": "You want to contribute without turning every evening into extra work.",
    "prompt": "How do you respond?",
    "branches": [
      {
        "label": "Discuss the request during your normal working hours.",
        "insight": "A clear boundary describes availability without accusing someone of bad intent.",
        "scene": "Your colleague admits they assumed you were always available after you helped once last month.",
        "prompt": "How do you address the assumption?",
        "options": [
          {
            "label": "Clarify ownership, deadlines and genuine emergency channels.",
            "title": "A shared expectation",
            "outcome": "The team has a practical agreement, and your availability is clear.",
            "takeaway": "Specific expectations are more sustainable than guessing what others need."
          },
          {
            "label": "Publicly insult the colleague for asking.",
            "title": "The disagreement escalates",
            "outcome": "Personal criticism damages cooperation while the task itself remains unassigned.",
            "takeaway": "Address behavior and expectations rather than attacking character."
          }
        ]
      },
      {
        "label": "Promise to finish it tonight, although you cannot.",
        "insight": "Unrealistic commitments often produce stress and unclear expectations.",
        "scene": "You work past midnight and still cannot complete the report. Your colleague asks for a progress update.",
        "prompt": "What is your next move?",
        "options": [
          {
            "label": "Explain the status honestly and propose a realistic plan.",
            "title": "A repair through clarity",
            "outcome": "You correct the timeline and clarify what the work requires.",
            "takeaway": "Honest updates help teams recover from unrealistic promises."
          },
          {
            "label": "Claim another team member destroyed your work.",
            "title": "Trust becomes another problem",
            "outcome": "The fabricated explanation creates new conflict and does not solve the delay.",
            "takeaway": "Do not invent blame to avoid a difficult conversation."
          }
        ]
      }
    ],
    "sourceLabel": "WHO — Mental Health at Work",
    "sourceUrl": "https://www.who.int/news-room/fact-sheets/detail/mental-health-at-work"
  },
  {
    "id": "damaged-order",
    "title": "The Broken Delivery",
    "subject": "Consumer Literacy",
    "art": "course-laws",
    "intro": "An electronic device arrives cracked. The seller says opening the shipping box means you cannot complain.",
    "scene": "You have the order confirmation and can photograph the visible damage.",
    "prompt": "What do you do first?",
    "branches": [
      {
        "label": "Save the evidence and request a remedy in writing.",
        "insight": "Records and a precise request make complaints easier to evaluate.",
        "scene": "The seller replies with an unexplained refusal. Your delivery platform has an established dispute channel.",
        "prompt": "What do you try next?",
        "options": [
          {
            "label": "Review platform remedies and the appropriate consumer guidance.",
            "title": "A documented route forward",
            "outcome": "The dispute can be assessed using records rather than assumptions.",
            "takeaway": "Available remedies depend on the facts, policy and applicable local law."
          },
          {
            "label": "Delete the receipts and photographs.",
            "title": "Helpful evidence is lost",
            "outcome": "The damage may still be real, but the claim is harder to demonstrate.",
            "takeaway": "Preserve transaction records until a dispute is resolved."
          }
        ]
      },
      {
        "label": "Publish the seller's private details and threaten them.",
        "insight": "Escalation and personal exposure can cause harm without solving the transaction.",
        "scene": "The public post attracts responses, but the product problem remains unresolved.",
        "prompt": "How do you proceed?",
        "options": [
          {
            "label": "Stop sharing private information and submit a factual complaint.",
            "title": "You returned to a fair process",
            "outcome": "Documented facts and appropriate channels can now be used to review the purchase.",
            "takeaway": "Keep allegations factual and respect privacy while seeking remedies."
          },
          {
            "label": "Spread more unverified accusations.",
            "title": "The dispute escalates",
            "outcome": "More accusations may create additional problems and do not determine an appropriate remedy.",
            "takeaway": "Evidence and legitimate complaint channels are better than rumors."
          }
        ]
      }
    ],
    "sourceLabel": "DTI Philippines — Consumer Education",
    "sourceUrl": "https://www.dti.gov.ph/konsyumer/consumer-education/"
  }
];
const index=new Map(CASE_FILES.map(x=>[x.id,x]));
export function getCaseFile(id){return index.get(id)||null;}
export function evaluateCase(file,steps=[]){
 if(!file||!Array.isArray(steps)||steps.length>2)return null;
 if(steps.some(n=>!Number.isInteger(n)||n<0||n>1))return null;
 if(steps.length===0)return {complete:false,scene:file.scene,prompt:file.prompt,options:file.branches,history:[]};
 const branch=file.branches[steps[0]];
 if(steps.length===1)return {complete:false,scene:branch.scene,prompt:branch.prompt,options:branch.options,history:[{label:branch.label,insight:branch.insight}]};
 const ending=branch.options[steps[1]];
 return {complete:true,ending,history:[{label:branch.label,insight:branch.insight},{label:ending.label,insight:ending.takeaway}]};
}
export function normalizeCasebook(value){
 const out={};if(!value||typeof value!=='object'||Array.isArray(value))return out;
 for(const [id,steps] of Object.entries(value)){const file=index.get(id);if(file&&Array.isArray(steps)&&steps.length>0&&evaluateCase(file,steps))out[id]=steps.slice();}
 return out;
}
export function advanceCase(value,id,choice){
 const clean=normalizeCasebook(value),file=index.get(id);if(!file||!Number.isInteger(choice)||choice<0||choice>1)return clean;
 const existing=clean[id]||[];if(existing.length>=2)return clean;
 clean[id]=[...existing,choice];return clean;
}
export function resetCase(value,id){const clean=normalizeCasebook(value);delete clean[id];return clean;}
export function casebookStats(value){
 const progress=normalizeCasebook(value);return {total:CASE_FILES.length,started:Object.keys(progress).length,finished:CASE_FILES.filter(f=>progress[f.id]?.length===2).length};
}
