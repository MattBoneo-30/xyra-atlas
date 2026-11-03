/** Subject-level, self-directed objectives: learning guidance, not professional certification. */
export const CURRICULUM_STAGES=Object.freeze(['Beginner','Intermediate','Advanced']);
const objectives={
  "psychology": {
    "Beginner": {
      "goal": "Separate observations from interpretations",
      "evidence": "List observable evidence and two plausible alternative explanations."
    },
    "Intermediate": {
      "goal": "Test a thought without self-diagnosing",
      "evidence": "Compare a prediction with later evidence and adjust confidence."
    },
    "Advanced": {
      "goal": "Audit competing claims responsibly",
      "evidence": "Build hypotheses, disconfirming tests and a clear uncertainty statement."
    }
  },
  "laws": {
    "Beginner": {
      "goal": "Identify legal jurisdiction and sources",
      "evidence": "Find the Philippine regulator and applicable primary source."
    },
    "Intermediate": {
      "goal": "Document a factual rights request",
      "evidence": "Write a timeline and the relevant first-level contact."
    },
    "Advanced": {
      "goal": "Evaluate a Philippine regulatory escalation",
      "evidence": "Distinguish first-level complaints, regulators and limits using official guidance."
    }
  },
  "business": {
    "Beginner": {
      "goal": "Understand customer needs",
      "evidence": "Ask about current behavior before proposing a product."
    },
    "Intermediate": {
      "goal": "Compare unit economics and risks",
      "evidence": "Calculate contribution margin and identify hidden costs."
    },
    "Advanced": {
      "goal": "Design an ethical market pilot",
      "evidence": "Write a test, an honest offer, a stop condition and evidence threshold."
    }
  },
  "savings": {
    "Beginner": {
      "goal": "Read a basic cashflow statement",
      "evidence": "Track essentials, flexible spending and savings."
    },
    "Intermediate": {
      "goal": "Compare financial alternatives fairly",
      "evidence": "Calculate total costs and emergency coverage."
    },
    "Advanced": {
      "goal": "Stress-test a household decision",
      "evidence": "Model liquidity, uncertainty and realistic downside scenarios."
    }
  },
  "time": {
    "Beginner": {
      "goal": "Choose a specific next action",
      "evidence": "Define one outcome achievable within a focused session."
    },
    "Intermediate": {
      "goal": "Review priorities against reality",
      "evidence": "Compare planned time with actual time and adapt."
    },
    "Advanced": {
      "goal": "Build a resilient time system",
      "evidence": "Document bottlenecks, buffers and tradeoffs that protect sustainability."
    }
  },
  "languages": {
    "Beginner": {
      "goal": "Practice practical survival phrases",
      "evidence": "Recall greetings, polite requests and clarification from memory."
    },
    "Intermediate": {
      "goal": "Rehearse repair language in context",
      "evidence": "Use clarification, listening and a short role-play."
    },
    "Advanced": {
      "goal": "Evaluate meaningful proficiency evidence",
      "evidence": "Assess speaking, comprehension, grammar and uncertainty separately."
    }
  },
  "communication": {
    "Beginner": {
      "goal": "Listen before proposing solutions",
      "evidence": "Reflect a statement and ask a respectful follow-up."
    },
    "Intermediate": {
      "goal": "Express a clear, safe boundary",
      "evidence": "State a request and an action under your control."
    },
    "Advanced": {
      "goal": "Plan accountable communication repair",
      "evidence": "Describe impact, responsibility, repair and the other person's autonomy."
    }
  },
  "thinking": {
    "Beginner": {
      "goal": "Differentiate a claim and its evidence",
      "evidence": "Find an original source and an observable test."
    },
    "Intermediate": {
      "goal": "Compare hypotheses and base rates",
      "evidence": "Record sample, denominator and alternative causes."
    },
    "Advanced": {
      "goal": "Write an evidence-weighted argument",
      "evidence": "Identify uncertainty, counterarguments and what would reverse a conclusion."
    }
  },
  "digital": {
    "Beginner": {
      "goal": "Recognize common security warnings",
      "evidence": "Inspect suspicious requests without using their links."
    },
    "Intermediate": {
      "goal": "Plan safe authentication recovery",
      "evidence": "Document unique credentials, MFA and trusted recovery."
    },
    "Advanced": {
      "goal": "Prepare an incident response sequence",
      "evidence": "Prioritize containment, evidence, genuine support and privacy."
    }
  },
  "career": {
    "Beginner": {
      "goal": "Identify a relevant skill deliverable",
      "evidence": "Select a small portfolio task with a checkable result."
    },
    "Intermediate": {
      "goal": "Write a candid portfolio case study",
      "evidence": "Document your role, decisions and actual tested result."
    },
    "Advanced": {
      "goal": "Evaluate work terms and career options",
      "evidence": "Compare scope, real alternatives, compensation and uncertainty."
    }
  },
  "science": {
    "Beginner": {
      "goal": "Frame a measurable question",
      "evidence": "Separate observation, hypothesis and prediction."
    },
    "Intermediate": {
      "goal": "Check experiments for confounding",
      "evidence": "Describe the comparison group and alternatives."
    },
    "Advanced": {
      "goal": "Critically evaluate scientific evidence",
      "evidence": "Audit design, uncertainty, limitations and independent replication."
    }
  },
  "relationships": {
    "Beginner": {
      "goal": "Recognize mutual agency and trust",
      "evidence": "Identify one achievable consistent trust-building action."
    },
    "Intermediate": {
      "goal": "Practice respectful conflict repair",
      "evidence": "Write a boundary, request and accountable follow-up."
    },
    "Advanced": {
      "goal": "Recognize coercive relational patterns",
      "evidence": "Distinguish conflict from threats and prioritize safe sources of support."
    }
  },
  "negotiation": {
    "Beginner": {
      "goal": "Differentiate positions and interests",
      "evidence": "Identify needs beneath each stated proposal."
    },
    "Intermediate": {
      "goal": "Compare complete packages and alternatives",
      "evidence": "Document realistic options and total terms."
    },
    "Advanced": {
      "goal": "Plan an ethical negotiation",
      "evidence": "Set truthful alternatives, clear limits and documented agreements."
    }
  },
  "shadow": {
    "Beginner": {
      "goal": "Notice coercive and deceptive pressure",
      "evidence": "Identify isolation, secrecy demands and threats in a fictional case."
    },
    "Intermediate": {
      "goal": "Seek protective choices and support",
      "evidence": "List non-escalating responses and trusted help options."
    },
    "Advanced": {
      "goal": "Analyze exploitation to recognize and resist it",
      "evidence": "Explain harmful mechanisms, consent limits and protective exits only."
    }
  }
};
export const CURRICULUM_OBJECTIVES=Object.freeze(Object.fromEntries(
 Object.entries(objectives).map(([id,record])=>[id,Object.freeze(Object.fromEntries(
  Object.entries(record).map(([stage,value])=>[stage,Object.freeze({...value})])
 ))])
));
export function learningLadder(course,completed=[]){
 if(!course||typeof course.id!=='string'||!Array.isArray(course.lessons))return null;
 const cfg=CURRICULUM_OBJECTIVES[course.id];
 if(!cfg)return null;
 const doneIds=new Set(Array.isArray(completed)?completed.filter(x=>typeof x==='string'):[]);
 const levels=CURRICULUM_STAGES.map(stage=>{
  const lessons=course.lessons.filter(l=>l&&l.stage===stage&&typeof l.id==='string');
  const done=lessons.filter(l=>doneIds.has(course.id+':'+l.id)).length;
  const next=lessons.find(l=>!doneIds.has(course.id+':'+l.id));
  const total=lessons.length;
  return {stage,goal:cfg[stage].goal,evidence:cfg[stage].evidence,done,total,
   percent:total?Math.round(100*done/total):0,
   state:total===0?'missing':done===total?'complete':done===0?'not-started':'in-progress',
   nextLesson:next?{id:next.id,title:next.title}:null};
 });
 return {courseId:course.id,levels,next:levels.find(level=>level.nextLesson)?.nextLesson||null,
  complete:levels.every(level=>level.total>0&&level.done===level.total)};
}
