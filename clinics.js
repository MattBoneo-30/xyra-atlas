import {ADVANCED_DECISIONS} from './advanceddecisions.js';
/** Subject-specific applied decision clinics: 42 original questions across 14 learning subjects.
 * All answers remain on the learner's device; these short checks are neither
 * a credential nor proof of professional judgment. Legal examples use PH jurisdiction.
 */
const RAW={
  "psychology": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "NIH — Social Wellness Toolkit",
        "url": "https://www.nih.gov/health-information/your-healthiest-self-wellness-toolkits/social-wellness-toolkit"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "A friend reads your message but does not reply until the next evening. What should you conclude?",
        "options": [
          "The delay proves the friend intends to reject you.",
          "The reply time is observable; the reason remains uncertain until checked respectfully.",
          "A delayed response proves the friend has an avoidant personality."
        ],
        "correct": 1,
        "explanation": "Separate the observable timing from imagined intent. A respectful question can supply new evidence; do not diagnose someone's motives from a single interaction."
      },
      {
        "id": "decision-2",
        "prompt": "You forecast that eight of ten difficult conversations will go badly. What would best test this expectation?",
        "options": [
          "Record the prediction criteria and compare them to the outcomes of actual conversations.",
          "Remember only the worst conversation because it felt the most vivid.",
          "Assign every conversation a 100% failure probability after one awkward exchange."
        ],
        "correct": 0,
        "explanation": "A prediction log with defined outcomes makes personal impressions more testable, though small samples do not establish a psychological diagnosis."
      }
    ]
  },
  "laws": {
    "title": "Philippine evidence clinic",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "National Privacy Commission — Right to Access",
        "url": "https://privacy.gov.ph/right-to-access/"
      },
      {
        "label": "BSP — Consumer Assistance Mechanism",
        "url": "https://www.bsp.gov.ph/Pages/InclusiveFinance/ConsumerAssistanceManagement.aspx"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "A staff member claims that the Philippine Data Privacy Act lets them see anyone's private file. Which response fits NPC guidance?",
        "options": [
          "Access is unlimited because the organization stores the files.",
          "Ask a colleague to provide their password so you can inspect them.",
          "Access to your own data is a right subject to limits; another person's records need separate lawful authorization."
        ],
        "correct": 2,
        "explanation": "NPC's Right to Access explains that data subjects seek their own information, not an unrelated person's records. Official guidance describes qualifications and limits."
      },
      {
        "id": "decision-2",
        "prompt": "A complaint about a transfer at a BSP-supervised bank remains unresolved. What is the evidence-based escalation route?",
        "options": [
          "Report through the bank's verified consumer-assistance mechanism first, then check BSP-CAM eligibility and instructions.",
          "Send your OTP to a self-described BSP agent on social media.",
          "Skip documenting the issue and assume a guaranteed refund."
        ],
        "correct": 0,
        "explanation": "BSP-CAM is second-level recourse after the institution's mechanism for qualifying disputes; a complaint does not guarantee reimbursement."
      }
    ]
  },
  "business": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "US SBA — Plan Your Business",
        "url": "https://www.sba.gov/business-guide/plan-your-business"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "A founder has ten interviewees who say an app idea sounds exciting but no one has tried to solve the problem before. What is the better discovery move?",
        "options": [
          "Treat polite compliments as ten confirmed paying customers.",
          "Ask about actual recent behavior, costs and current workarounds before forecasting demand.",
          "Buy advertising immediately because a survey response guarantees a sale."
        ],
        "correct": 1,
        "explanation": "Past behavior and concrete alternatives provide more informative discovery evidence than leading questions or encouragement."
      },
      {
        "id": "decision-2",
        "prompt": "A service sells for ₱600 and incurs ₱250 in variable costs per sale. Which statement is supported before fixed costs?",
        "options": [
          "The business makes ₱600 net profit per customer.",
          "Its contribution is exactly zero because taxes always equal the selling price.",
          "Contribution before fixed costs is ₱350 per sale, but profitability also depends on fixed costs."
        ],
        "correct": 2,
        "explanation": "Contribution is price minus variable cost: ₱600 − ₱250 = ₱350. Rent, labor, tax obligations and other costs can still change net profit."
      }
    ]
  },
  "savings": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "CFPB — Building an Emergency Fund",
        "url": "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "A person has irregular income and needs a reserve for essential expenses. What is a sound first step?",
        "options": [
          "Estimate essential monthly outgoings and choose a feasible, accessible reserve target.",
          "Invest all emergency cash in a highly volatile asset because returns may be higher.",
          "Ignore unpredictable expenses because they occur irregularly."
        ],
        "correct": 0,
        "explanation": "An emergency fund should reflect actual needs, liquidity and financial constraints. Targets and suitable accounts vary."
      },
      {
        "id": "decision-2",
        "prompt": "Two loan offers have different rates, fees and repayment schedules. What comparison supports a safer decision?",
        "options": [
          "Compare only which monthly advertisement looks smaller.",
          "Compute total repayments, fees, penalties, affordability and other conditions before choosing.",
          "Choose the offer promising approval regardless of the contract."
        ],
        "correct": 1,
        "explanation": "Total cost and affordability matter more than a headline rate or single monthly payment; confirm actual contractual terms."
      }
    ]
  },
  "time": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "CDC — About Sleep",
        "url": "https://www.cdc.gov/sleep/about/index.html"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "An overloaded week has twelve urgent items but only two affect a real deadline. What helps most?",
        "options": [
          "Call every item top priority and work on all simultaneously.",
          "Promise more hours than are realistically available.",
          "Rank commitments by impact and deadline, choose next actions and renegotiate lower-priority work."
        ],
        "correct": 2,
        "explanation": "Time planning requires explicit tradeoffs, dependency checking and honest capacity rather than labeling everything equally urgent."
      },
      {
        "id": "decision-2",
        "prompt": "A schedule repeatedly fails after interruptions. What is the most useful experiment?",
        "options": [
          "Measure actual time and disruption patterns, add buffers, and reassess after a trial week.",
          "Assume the interruptions will permanently disappear without changing anything.",
          "Skip breaks and sleep until the original schedule fits."
        ],
        "correct": 0,
        "explanation": "Review realistic effort and build recovery time. A plan should survive normal variability rather than depend on ideal days."
      }
    ]
  },
  "languages": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "British Council — LearnEnglish",
        "url": "https://learnenglish.britishcouncil.org/"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "While practicing a new language, you cannot follow the other person's sentence. What best maintains understanding?",
        "options": [
          "Pretend to understand and agree to every request.",
          "Use a learned polite clarification phrase, request slower repetition, and confirm meaning.",
          "Repeat a memorized answer unrelated to what was said."
        ],
        "correct": 1,
        "explanation": "Repair phrases are a practical conversational skill; understanding and respectful clarification matter more than appearing fluent."
      },
      {
        "id": "decision-2",
        "prompt": "An offline app has eight translated phrases and synthetic speech. What claim is justified?",
        "options": [
          "Completion proves native-like fluency and pronunciation.",
          "Every device speech voice has been approved by a native-speaker panel.",
          "The learner has practiced a starter phrase set, not demonstrated listening or speaking competence."
        ],
        "correct": 2,
        "explanation": "Recall, recognition, comprehension and pronunciation are distinct skills. Device voices require separate quality and device-specific checks."
      }
    ]
  },
  "communication": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "NIH — Social Wellness Toolkit",
        "url": "https://www.nih.gov/health-information/your-healthiest-self-wellness-toolkits/social-wellness-toolkit"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "A colleague says the project handoff was confusing. Which opening best helps repair the conversation?",
        "options": [
          "Ask what was unclear, reflect their point, and check whether your summary is accurate.",
          "Explain at length that their feelings are wrong.",
          "Tell the colleague to communicate only in your preferred style."
        ],
        "correct": 0,
        "explanation": "Accurate listening and clarification reduce avoidable misunderstanding before proposing a fix."
      },
      {
        "id": "decision-2",
        "prompt": "A boundary needs to be clear without trying to control another person. Which wording follows that principle?",
        "options": [
          "You are never allowed to disagree with me.",
          "If the conversation becomes insulting, I will leave and resume when we can speak respectfully.",
          "You must feel exactly what I feel about this subject."
        ],
        "correct": 1,
        "explanation": "A boundary describes your own actions and limits rather than demanding control over another person's emotions."
      }
    ]
  },
  "thinking": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "NIH — Communicating Health Research",
        "url": "https://www.nih.gov/about-nih/science-health-public-trust/tools/checklist-communicating-science-health-research-public"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "A headline says an intervention doubled an outcome from 1 in 1,000 to 2 in 1,000. What should you ask first?",
        "options": [
          "Whether the colors of the chart were persuasive.",
          "Whether the author has many social-media followers.",
          "What the baseline, absolute change, measurement method and uncertainty were."
        ],
        "correct": 2,
        "explanation": "Relative changes can obscure small absolute effects. Denominators, study design and uncertainty are essential."
      },
      {
        "id": "decision-2",
        "prompt": "You are reviewing a surprising claim supported by one small study. What approach is strongest?",
        "options": [
          "Look for independent replication, methods, confounders and credible counterevidence.",
          "Treat it as final proof because the result is surprising.",
          "Reject all evidence automatically because studies can disagree."
        ],
        "correct": 0,
        "explanation": "A careful conclusion weighs source quality, alternative explanations and repeatability rather than certainty from a single result."
      }
    ]
  },
  "digital": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "NIST SP 800-63B — Authentication",
        "url": "https://pages.nist.gov/800-63-4/sp800-63b.html"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "You receive a bank-themed message asking for your recovery code through an urgent link. What is the safest first action?",
        "options": [
          "Enter the code before the deadline.",
          "Open the bank's previously known app or official channel independently and verify the claim.",
          "Forward the code to a friend who says they can investigate."
        ],
        "correct": 1,
        "explanation": "Urgency and familiar branding do not authenticate a message. Use independently known contacts and never disclose recovery codes."
      },
      {
        "id": "decision-2",
        "prompt": "You manage an account containing important files. Which recovery design better reduces risk?",
        "options": [
          "Reuse your email password everywhere for convenience.",
          "Keep the only recovery copy inside the same locked account.",
          "Use unique credentials, strong sign-in methods and independently stored recovery options."
        ],
        "correct": 2,
        "explanation": "Phishing-resistant methods and separated recovery help reduce account-takeover risk; none guarantee perfect security."
      }
    ]
  },
  "career": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "CareerOneStop — Resume Guide",
        "url": "https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/top-portion-of-resume.aspx"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "A portfolio project description says you 'optimized performance' but supplies no proof. What improves its credibility?",
        "options": [
          "Explain your own role, baseline, measurement and verified result, including limits.",
          "Add a larger invented percentage to look more impressive.",
          "Hide implementation details and ask reviewers to trust the claim."
        ],
        "correct": 0,
        "explanation": "A candid case study distinguishes your contribution, measurements and uncertainty."
      },
      {
        "id": "decision-2",
        "prompt": "Two offers have different pay, benefits, travel and work scope. What is the strongest comparison?",
        "options": [
          "Choose whichever recruiter writes the longer message.",
          "List total compensation, role expectations, risks, verifiable terms and personal constraints.",
          "Accept an offer before reading its scope because the title sounds prestigious."
        ],
        "correct": 1,
        "explanation": "Total work conditions and verifiable contracts matter, not only headline salary or title."
      }
    ]
  },
  "science": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "NIH — Clinical Research Glossary",
        "url": "https://www.nih.gov/health-information/nih-clinical-research-trials-you/glossary-common-terms"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "An observational study finds that people who sleep longer report a particular outcome. What cannot be assumed from correlation alone?",
        "options": [
          "Both factors were measured within the study.",
          "The results may be affected by confounding variables.",
          "Increasing sleep must have caused every observed outcome."
        ],
        "correct": 2,
        "explanation": "Observational associations alone do not establish causality. Consider comparison groups, bias and other explanations."
      },
      {
        "id": "decision-2",
        "prompt": "A medical headline says a pilot with twelve volunteers proves universal effectiveness. How should you evaluate it?",
        "options": [
          "Examine sample size, control group, outcomes, uncertainty and independent replication.",
          "Treat a small pilot as conclusive for all populations.",
          "Rely solely on an anecdote that agrees with the headline."
        ],
        "correct": 0,
        "explanation": "Early or small studies can suggest questions but rarely establish general clinical effectiveness without stronger evidence."
      }
    ]
  },
  "relationships": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "CDC — Intimate Partner Violence",
        "url": "https://www.cdc.gov/intimate-partner-violence/about/index.html"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "A friend declines an invitation and asks for space. What respects the person's agency?",
        "options": [
          "Continue pressuring them until they explain their private reasons.",
          "Acknowledge the boundary without punishment and suggest reconnecting only if welcomed.",
          "Demand access to their messages to confirm why they declined."
        ],
        "correct": 1,
        "explanation": "Respectful connection supports voluntary choices and boundaries rather than coercion."
      },
      {
        "id": "decision-2",
        "prompt": "A partner threatens retaliation unless you share your passwords. What is a safer interpretation?",
        "options": [
          "The demand proves devotion and should be obeyed.",
          "Sharing secrets is required whenever a relationship is serious.",
          "Threats and demanded access are warning signs; prioritize safety and trusted help."
        ],
        "correct": 2,
        "explanation": "Password coercion and threats are not evidence of healthy consent. A safe response may involve support and avoiding escalation."
      }
    ]
  },
  "negotiation": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "Harvard PON — Preparation Checklist",
        "url": "https://www.pon.harvard.edu/daily/negotiation-skills-daily/negotiation-preparation-checklist/"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "You may accept a freelance offer, but scope and revision limits are vague. What prepares an ethical counterproposal?",
        "options": [
          "Clarify deliverables, timeline, fees, revision limits and realistic alternatives in writing.",
          "Invent a competing offer to create urgency.",
          "Agree first, then secretly change the work."
        ],
        "correct": 0,
        "explanation": "A transparent scope and genuine alternatives improve a negotiated agreement and reduce later conflict."
      },
      {
        "id": "decision-2",
        "prompt": "A proposed deal pays more but adds hidden recurring obligations. What should you compare?",
        "options": [
          "Only the headline payment.",
          "Total value, workload, risks, alternatives and exit terms.",
          "How confident the other side sounds during a call."
        ],
        "correct": 1,
        "explanation": "A meaningful negotiation considers complete terms and a truthful, feasible alternative, not gross price alone."
      }
    ]
  },
  "shadow": {
    "title": "Applied decisions",
    "intro": "Two case decisions to test the judgment behind this subject. Work offline, review explanations, and retry without affecting lesson completion.",
    "references": [
      {
        "label": "CDC — Intimate Partner Violence",
        "url": "https://www.cdc.gov/intimate-partner-violence/about/index.html"
      }
    ],
    "questions": [
      {
        "id": "decision-1",
        "prompt": "A stranger urges someone to keep a risky relationship secret and threatens to expose private messages. What is the educational safety focus?",
        "options": [
          "Find ways to make the threat more convincing.",
          "Practice counter-manipulation by inventing false evidence.",
          "Recognize coercive pressure, preserve safety options and seek trusted support."
        ],
        "correct": 2,
        "explanation": "Threats, secrecy and leveraged private material are warning signs. The learning goal is protection, not tactics for exploitation."
      },
      {
        "id": "decision-2",
        "prompt": "An adult asks whether guilt or threats can make consent valid. Which principle applies?",
        "options": [
          "Consent should be voluntary and informed; pressure or threats undermine it.",
          "Consent can be safely assumed when someone stops resisting.",
          "A partner owns unlimited access to someone else's body or accounts."
        ],
        "correct": 0,
        "explanation": "Coercion is incompatible with freely given consent; people retain autonomy and rights to seek help."
      }
    ]
  }
};
export const CLINICS=Object.freeze(Object.fromEntries(Object.entries(RAW).map(([id,clinic])=>[id,Object.freeze({
 ...clinic,intro:clinic.intro.replace('Two case decisions','Three case decisions, including one advanced scenario'),
 references:Object.freeze(clinic.references.map(r=>Object.freeze({...r}))),
 questions:Object.freeze([...clinic.questions,ADVANCED_DECISIONS[id]].map(q=>Object.freeze({...q,options:Object.freeze([...q.options])})))
})])));
const isRecord=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const questionMap=new Map(Object.entries(CLINICS).flatMap(([courseId,clinic])=>clinic.questions.map(q=>[courseId+':'+q.id,q])));
export function getClinic(courseId){return typeof courseId==='string'?CLINICS[courseId]||null:null;}
export function normalizeClinicAnswers(raw){
 if(!isRecord(raw))return {};
 const clean={};
 for(const [key,value] of Object.entries(raw).slice(0,100)){
  const question=questionMap.get(key);
  if(!question||!Number.isInteger(value)||value<0||value>=question.options.length)continue;
  Object.defineProperty(clean,key,{value,enumerable:true,writable:true,configurable:true});
 }
 return clean;
}
export function answerClinic(raw,courseId,questionId,choice){
 const key=courseId+':'+questionId,question=questionMap.get(key);
 const clean=normalizeClinicAnswers(raw);
 if(!question||!Number.isInteger(choice)||choice<0||choice>=question.options.length||
  Object.hasOwn(clean,key))return clean;
 Object.defineProperty(clean,key,{value:choice,enumerable:true,writable:true,configurable:true});
 return clean;
}
export function clinicStats(raw,courseId){
 const clinic=getClinic(courseId);
 if(!clinic)return null;
 const answers=normalizeClinicAnswers(raw);
 let answered=0,correct=0;
 for(const question of clinic.questions){
  const key=courseId+':'+question.id;
  if(Object.hasOwn(answers,key)){answered++;if(answers[key]===question.correct)correct++;}
 }
 return {answered,correct,total:clinic.questions.length,done:answered===clinic.questions.length};
}
export function resetClinic(raw,courseId){
 const answers=normalizeClinicAnswers(raw);
 if(!getClinic(courseId))return answers;
 for(const question of CLINICS[courseId].questions)delete answers[courseId+':'+question.id];
 return answers;
}
