/**
 * Source-traceable, concept-first study chapters. Original explanatory text:
 * no copied agency text. Illustrative cases, not professional advice or certification.
 * Legal applicability must be reviewed against current law and regulations.
 */
const section=(heading,body)=>({heading,body});
const sourceRef=(label,url)=>({label,url});
const flow=(title,steps,caption)=>({title,steps:steps.map(([label,detail])=>({label,detail})),caption});
export const DEEPER_FOUNDATIONS={
  science:[
   {
    id:'astronomy-sky-seasons',title:'Astronomy 01 — Read the moving sky',stage:'Beginner',minutes:32,
    intro:'Why do stars seem to cross the sky, and why do seasons change? Build a physical model of Earth before memorizing constellations or planet names.',
    sections:[
     section('First distinguish what you see from what moves',
      'On a clear night the stars seem to arc across the sky. That is an observation. A useful explanation starts from the fact that Earth rotates eastward roughly once per day, so the distant sky appears to move westward relative to an observer. The Sun’s daily motion has the same basic cause. Stars have genuine motions through space too, but their positions change far too little during one night for that to explain the apparent daily sweep. Distinguish the observer’s motion from the stars’ much slower real motion.'),
     section('Rotation, revolution and tilt do different jobs',
      'Rotation produces the regular cycle of daylight and darkness. Revolution means Earth’s roughly yearly orbit around the Sun. Earth’s rotational axis is tilted about 23.4 degrees relative to its orbital plane, and keeps roughly the same orientation in space as Earth travels around the Sun. Those three features work together: where the Sun appears in the sky and how long it remains above the horizon vary with season and latitude. A rotation is not an orbit; they are separate motions.'),
     section('Why summer is not simply being closer to the Sun',
      'During northern-hemisphere summer the north is tilted toward the Sun. Sunlight arrives at a steeper angle, spreading energy over a smaller surface area, and daylight lasts longer. Six months later the southern hemisphere receives the more direct sunlight. The planet’s varying distance from the Sun is not the main reason for the contrasting hemispheric seasons. This matters because a model must explain why Australia and Japan have opposite seasons at the same time.'),
     section('Use your location as part of the model',
      'At equatorial latitudes the Sun can be high in the sky across much of the year and seasonal day-length changes are smaller than at high latitudes. Near a pole, daylight duration can vary dramatically. Horizon, latitude and time matter when predicting which stars or planets will be visible. A star map drawn for one city at 9 p.m. need not match the same clock time elsewhere. Never assume that a northern-hemisphere diagram directly describes the southern sky.'),
     section('How astronomers test their predictions',
      'A model of Earth’s rotation and orbit predicts sunrise direction, day length and seasonal visibility. You can check those predictions against repeated observations, date-stamped sky maps and solar-angle measurements; do not observe the Sun directly without appropriate certified solar protection. The value is not a beautiful picture alone but whether the model can explain observations and anticipate new ones.')
    ],
    example:'Imagine a friend claims summer happens because Earth is closest to the Sun. Ask which hemisphere is warmer in January and what the model predicts for the other hemisphere. Since the north and south experience opposite seasons, a distance-only explanation cannot account for both. An axial-tilt model explains longer daylight and more direct sunlight for the hemisphere tilted toward the Sun.',
    flow:flow('Work backward from the observation',[
     ['Observed sky motion','Stars seem to rise, cross the sky and set.'],
     ['Earth rotates','Our viewing direction turns eastward.'],
     ['Apparent westward sweep','The distant sky seems to move in the opposite direction.'],
     ['Testable prediction','Repeated sky positions shift predictably with time and latitude.']
    ],'A causal explanation is a model you can test, not a replacement for observation.'),
    task:'Make a two-column notebook chart: observation versus physical explanation. Include sunrise, seasonal daylight, a star’s nightly arc and opposite seasons in the hemispheres. For each, name the relevant Earth motion, a prediction and one observation that could challenge your conclusion. Sketch a tilted Earth at opposite sides of its orbit and label where sunlight is more direct.',
    quiz:{question:'In June the northern hemisphere has longer days than the southern hemisphere. Which model best explains both at once?',
     options:['Earth is closer to the Sun, so everywhere has summer together','Earth’s tilted axis gives one hemisphere longer, more direct sunlight while the other gets less','The Sun circles Earth more rapidly in June'],correct:1,
     explanation:'Axial tilt predicts opposite seasons across the hemispheres; a simple distance-only model cannot.'},
    sources:[sourceRef('NASA Science — Facts About Earth','https://science.nasa.gov/earth/facts/'),
     sourceRef('NASA Science — Seasons on Earth and beyond','https://science.nasa.gov/helio-and-you-seasons-on-earth-mars-and-beyond/')]
   },
   {
    id:'astronomy-moon-eclipses',title:'Astronomy 02 — Moon phases and eclipse geometry',stage:'Intermediate',minutes:34,
    intro:'A crescent Moon and a lunar eclipse look different because of geometry, not because the Moon changes its own brightness. Explain both phenomena using light, viewpoints and orbital tilt.',
    sections:[
     section('Half of the Moon receives sunlight at a time',
      'The Moon does not ordinarily generate its own visible light: sunlight illuminates the side facing the Sun. As the Moon orbits Earth, our viewing angle changes, so we see different fractions of that sunlit half. New Moon means the illuminated side mostly faces away from us; near Full Moon we see almost the entire sunlit half. The Moon itself is not switching its lights on and off. Earth’s shadow is not the normal cause of lunar phases.'),
     section('Phase is a viewpoint, not a special object',
      'At first quarter we see about half of the near-side lunar disk illuminated; the phase name refers to progress around the orbit rather than the fraction of the visible face lit. Waxing means the sunlit fraction we see is growing; waning means it is shrinking. A lunar day and the orbit involve additional orbital details, so a simple two-dimensional drawing is a starting approximation rather than a complete ephemeris.'),
     section('Why an eclipse does not occur every month',
      'If the Moon, Earth and Sun orbited in precisely the same plane, aligned new and full Moons could produce much more frequent eclipses. The lunar orbit is tilted around five degrees relative to Earth’s orbital plane. During most new Moons the Moon passes above or below the Sun as seen from Earth, and its shadow misses us. Only when orbital alignment is close enough do we see an eclipse.'),
     section('Solar and lunar eclipses have different orders',
      'Solar eclipse: Sun → Moon → Earth, with the Moon between us and the Sun, occurring at new Moon. Lunar eclipse: Sun → Earth → Moon, with Earth’s shadow falling on the Moon, occurring at full Moon. Umbra is the central, darker shadow and penumbra is the partial shadow. During a total lunar eclipse, refracted sunlight through Earth’s atmosphere can make the Moon appear reddish.'),
     section('Observe safely and falsify misconceptions',
      'A solar eclipse is never permission to look directly at the Sun through ordinary sunglasses or unfiltered optics. Use guidance and equipment specifically rated for solar viewing, or observe indirectly with safe projection. For ordinary phase observations, record date, approximate time, illumination and relative direction of the Sun; compare to an astronomy calendar. Predict a phase before checking the answer.')
    ],
    example:'A learner says: “There is a half Moon, so half of the Moon must be in Earth’s shadow.” Draw the Sun lighting half the Moon and move an imagined observer around it. Earth can see half of the lit hemisphere simply because the viewing angle changes. An eclipse instead requires the shadow of one body to reach another under a special alignment.',
    flow:flow('Separate the two phenomena',[
     ['Sun illuminates','The Sun lights the lunar hemisphere facing it.'],
     ['Moon orbits Earth','The viewing angle changes through the month.'],
     ['Ordinary phases','We see different portions of the lit hemisphere.'],
     ['Special alignment','An eclipse occurs only if the orbital geometry lines up.']
    ],'Phase cycle ≠ Earth casting a shadow every month.'),
    task:'Draw Sun, Earth and Moon in two labeled arrangements: solar eclipse and lunar eclipse. Then make a third drawing of a quarter Moon that does not involve Earth’s shadow. Explain why most new Moons do not make solar eclipses. Record an actual Moon phase on two separate nights and compare your expectation with the observation.',
    quiz:{question:'A new Moon happens, but no solar eclipse is observed. What is the best explanation?',
     options:['Earth’s atmosphere turned the shadow off','The Moon’s orbit is tilted, so its shadow usually misses Earth','A solar eclipse can only happen at full Moon'],correct:1,
     explanation:'A new Moon is necessary but not sufficient for a solar eclipse; orbit inclination normally prevents precise alignment.'},
    sources:[sourceRef('NASA — Why eclipses happen','https://science.nasa.gov/eclipses/geometry/'),
     sourceRef('NASA — Eclipses and the Moon','https://science.nasa.gov/moon/eclipses/')]
   },
   {
    id:'astronomy-stars-lifecycle',title:'Astronomy 03 — How stars live and die',stage:'Intermediate',minutes:38,
    intro:'A star is not a fixed bright dot. Learn how gravity, pressure, temperature and nuclear fusion interact, and why the mass of a star changes its possible future.',
    sections:[
     section('Birth begins in cold clouds, not in a fireball',
      'Stars form in dense regions of large gas-and-dust clouds. Gravity draws material together, creating a protostar whose interior grows hotter as it contracts. A protostar is not yet a stable hydrogen-fusing main-sequence star. It is the formation pathway, not the fact that a cloud simply lights up, that matters. Observers can look for protostars in star-forming regions using infrared and other wavelengths that reveal objects obscured by dust.'),
     section('What keeps a main-sequence star stable',
      'In the main-sequence stage, fusion in the core converts hydrogen into helium and releases energy. The star’s gravity pulls inward while pressure linked to its hot interior pushes outward. This approximate balance is called hydrostatic equilibrium. It does not mean nothing changes; the core composition evolves as hydrogen is consumed, and the star can slowly change in size and brightness.'),
     section('Why mass is the key branching factor',
      'Very massive stars have more fuel but generally use it much faster, so their lifetimes can be much shorter than the Sun’s. Lower-mass stars burn fuel more slowly. The original mass of the star strongly influences its lifetime, luminosity and possible final stage. When discussing star color and temperature, remember that visible color is a clue, not a complete measurement by itself.'),
     section('Different endings for different masses',
      'A Sun-like star expands into a red giant as its core fuel supply changes, eventually shedding outer layers and leaving a dense white dwarf. A sufficiently massive star can develop advanced fusion stages and undergo core collapse; the remnant may be a neutron star or black hole depending on the mass and collapse physics. Not every star explodes in a supernova and not every red giant becomes a black hole.'),
     section('How do we know? Follow the light',
      'Spectra reveal absorption and emission signatures associated with matter and help astronomers estimate temperature, composition and motion. Astronomers compare star clusters, which contain stars of different masses but related ages, and use physical models of fusion and gravity. A responsible explanation distinguishes direct observations (light and spectra) from inferred internal mechanisms, while explaining why those inferences are tested.')
    ],
    example:'Two newly formed stars are observed: Star A has much more mass than Star B. A beginner might say A will live longer because it has more fuel. But a high-mass star consumes its fuel at a much higher rate and can exhaust its main-sequence supply sooner. The useful explanation connects mass → core conditions → fusion rate → lifetime, not just fuel quantity.',
    flow:flow('A branching life cycle, not one destiny',[
     ['Gas and dust cloud','Gravity gathers material; the protostar heats up.'],
     ['Hydrogen fusion','A stable main sequence follows when conditions permit.'],
     ['Mass controls evolution','Different masses burn fuel at different rates.'],
     ['Different remnants','Lower mass may leave a white dwarf; massive core collapse can leave a neutron star or black hole.']
    ],'This is a schematic summary; intermediate stages depend on mass and composition.'),
    task:'Create a branching diagram comparing a Sun-like star and a high-mass star. Include the stages: gas cloud, protostar, main sequence, giant/supergiant evolution and likely remnant. Beside every arrow write one physical mechanism or observation supporting it. Explain why “all stars turn into black holes” is false.',
    quiz:{question:'Why can a much more massive star have a shorter main-sequence lifetime than a lower-mass star?',
     options:['Its gravity switches off nuclear fusion','It tends to consume nuclear fuel at a far higher rate despite having more of it','Astronomers only observe massive stars at night'],correct:1,
     explanation:'Higher core temperatures and fusion rates generally shorten main-sequence lifetimes for high-mass stars.'},
    sources:[sourceRef('NASA — Stars and stellar evolution','https://science.nasa.gov/universe/stars/')]
   }
  ],
  laws:[
   {
    id:'ph-ra10173-reading',title:'Philippine Law 01 — RA 10173, Data Privacy Act',stage:'Beginner',minutes:37,
    intro:'Learn to read an actual Philippine statute by identifying its purpose, important sections, rights, lawful-processing criteria and limitations rather than memorizing a slogan about privacy.',
    sections:[
     section('Identify the law and its purpose',
      'Republic Act No. 10173 is the Data Privacy Act of 2012. Its declared policy includes protecting privacy in information and communications systems in government and the private sector while allowing legitimate information flow. Begin by reading Section 1 for the short title, Section 2 for policy, and Section 3 for definitions. A Republic Act number identifies the statute; the implementing rules and later official issuances also matter. Not every dispute involving data is automatically a violation.'),
     section('Separate personal from sensitive personal information',
      'Personal information generally concerns an identifiable individual. Sensitive personal information has special treatment under Section 3 and Section 13; examples include specified categories involving health, education, government-issued identification, and other legally defined matters. Do not assume any data can be processed merely because it was posted online. First ask what information is involved, who controls it and why it was obtained.'),
     section('Read Section 11: three principles plus practical duties',
      'Section 11 centers on transparency, legitimate purpose and proportionality, supported by requirements such as relevance, accuracy and retention limits. A clear privacy notice is part of transparency, but a notice alone does not make every use lawful. Proportionality asks whether a particular collection is adequate and not excessive for its stated purpose. For example, a small order-delivery feature has a stronger reason to request an address than to request unrestricted access to all phone contacts.'),
     section('Read Sections 12 and 13: consent is not the only basis',
      'Section 12 includes lawful bases for ordinary personal-information processing such as consent, contract necessity, legal obligation and other specified conditions. Sensitive personal information is subject to stricter rules and exceptions under Section 13. Do not say “no consent means unlawful” in every situation, and do not say “the user clicked accept, so everything is legal.” First identify the category of data and whether the actual purpose satisfies a lawful condition and the data-privacy principles.'),
     section('Understand a data subject’s rights and their limits',
      'Section 16 and the National Privacy Commission’s guidance cover rights such as information, access, objection, correction and forms of deletion or blocking, subject to legal conditions and exceptions. These rights are not unconditional powers to erase every record immediately. An organization may have legitimate retention duties and procedural obligations. Keep copies of your requests, use the organization’s official channel, and use the National Privacy Commission’s complaint and guidance resources when appropriate.'),
     section('Practice legal reasoning before choosing a remedy',
      'A useful reading method is issue → relevant provision → facts → application → qualified conclusion. Distinguish the statutory text from your own interpretation. Because this is a general educational exercise rather than legal advice, check the latest relevant regulations, decisions and guidance before relying on it in a live complaint or business compliance decision.')
    ],
    example:'A free delivery app asks for GPS access, contact list, birth date and home address to deliver a parcel. A privacy review should not simply answer “it has a consent checkbox.” List every requested field, what function needs it, the stated purpose, the legal basis and whether less intrusive data would suffice. GPS may support tracking; unrestricted access to contacts requires separate justification. A lawful basis and transparency must be assessed alongside proportionality.',
    flow:flow('Reason through a privacy question',[
     ['Identify the personal data','What data is collected and by which controller?'],
     ['Check purpose and principles','Is processing transparent, legitimate and proportionate?'],
     ['Find the legal basis','Review Sections 12 or 13 as appropriate.'],
     ['Assess rights and remedies','Read Section 16 and applicable procedures; record a qualified conclusion.']
    ],'A consent checkbox is evidence to examine, not a substitute for legal analysis.'),
    task:'Open the official RA 10173 text. Build a table with columns: section number, plain-language principle, a fictional app example, and one unresolved question. Cover Sections 3, 11, 12, 13 and 16. Then write a 150-word analysis of whether a fictional shopping app needs access to a customer’s entire contacts list. Flag which facts you would need before forming a legal conclusion.',
    quiz:{question:'A company relies on a privacy notice and consent checkbox. Does that alone establish that every piece of collected data is lawful under RA 10173?',
     options:['Yes, a checkbox automatically makes every purpose lawful','No, the lawful basis, nature of information, purpose, proportionality and applicable exceptions must also be examined','Yes, if the app is free to download'],correct:1,
     explanation:'Sections 11–13 require more than displaying a notice; different types of processing have distinct legal conditions.'},
    sources:[sourceRef('National Privacy Commission — Republic Act 10173','https://privacy.gov.ph/data-privacy-act-/'),
     sourceRef('NPC — Data subject rights','https://privacy.gov.ph/data-subject-rights/'),
     sourceRef('NPC — Implementing Rules and Regulations','https://privacy.gov.ph/implementing-rules%20regulations-data-privacy-act-2012/')]
   },
   {
    id:'ph-ra7394-consumer',title:'Philippine Law 02 — RA 7394, Consumer Act',stage:'Beginner',minutes:34,
    intro:'Use the Consumer Act of the Philippines to examine misleading sales, unfair pressure, product representations and evidence-based complaints; learn the relevant articles rather than assuming every disappointing purchase creates an automatic refund right.',
    sections:[
     section('Find the statute and the protections it aims to provide',
      'Republic Act No. 7394 is the Consumer Act of the Philippines (1992). Article 2 sets out policy goals such as protection from health and safety hazards, deceptive and unfair practices, better consumer information and means of redress. These are guiding objectives, not a promise of a particular remedy for every purchase. Start with the Act’s structure: general provisions, product regulation and sales practices are covered in different titles.'),
     section('Read Articles 48–50: what can make a sales claim deceptive',
      'Article 48 promotes fair consumer transactions. Article 50 addresses deceptive acts or practices before, during or after a consumer transaction. Examples include falsely stating a product is new when it is reconditioned, misrepresenting what a product can do or inventing a price advantage. The question is not simply whether the buyer regretted the purchase: identify a concrete representation, what was actually provided and whether material concealment or misrepresentation induced the transaction.'),
     section('Read Article 52: unfairness and vulnerability',
      'Article 52 addresses unfair or unconscionable sales acts or practices, considering circumstances such as exploiting the consumer’s inability to understand an agreement or lack of time. A one-sided term deserves examination, but not all hard bargaining is automatically unlawful. The relevant facts, applicable provision and enforcement interpretation matter. Distinguish deceptive statements from pressure that exploits vulnerable circumstances.'),
     section('Keep evidence and identify the right route',
      'Save receipts, product listings, chat messages, dates, promises and warranty language. Begin by contacting the seller with a factual timeline and the remedy you request. Escalation depends on the product, service, responsible agency, jurisdiction and current procedural rules; DTI handles many consumer trade matters but not every complaint against every type of service. Do not promise a refund, fine or criminal outcome without legal review.'),
     section('Practice interpreting a claim precisely',
      'Compare a label saying “brand new” with the seller’s disclosure and the item’s condition; document objective differences. Under the Act, a misleading claim about whether something is new or reconditioned may be legally relevant. The strongest complaint explains the representation, proof, impact, relevant article and requested resolution. If facts are uncertain, state the uncertainty and ask what verification is possible.')
    ],
    example:'A phone advertised as “brand new, unused” arrives with a replaced battery and signs of prior use. Note the screenshot of the listing, receipt, product identifiers, service history if available and messages from the seller. Article 50 is relevant because it addresses claims about a product’s new or reconditioned condition. Whether a violation and remedy follow depends on verified facts and applicable procedures, not only the buyer’s suspicion.',
    flow:flow('Analyze a consumer complaint',[
     ['Record the exact promise','What did the listing, receipt or seller say?'],
     ['Compare with evidence','What was delivered, and can you verify the difference?'],
     ['Identify the law and issue','Is this a possible deceptive or unconscionable practice?'],
     ['Request resolution','Write the timeline, desired remedy and appropriate official route.']
    ],'A clear evidence trail makes a legal question answerable; it does not guarantee a particular outcome.'),
    task:'Write an example complaint about a fictional product advertised as new but apparently refurbished. Include an exact claim, three pieces of verifiable evidence, why Article 50 may be relevant, one fact still unverified and the resolution requested. Then write what additional facts could change the conclusion. Compare with the actual text of RA 7394 before filing any real complaint.',
    quiz:{question:'A seller labels a reconditioned device “new and unused.” Which provision is most directly relevant to assessing that representation?',
     options:['RA 7394 Article 50 on deceptive sales representations','A rule that every used product must be refunded regardless of disclosure','RA 10173 Section 16 on data access'],correct:0,
     explanation:'Article 50 addresses deceptive representations, including whether a product is new, original, unused or reconditioned. Outcomes depend on evidence and law.'},
    sources:[sourceRef('Supreme Court E-Library — RA 7394','https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/3302'),
     sourceRef('DTI — Fair Trade enforcement laws','https://fairtrade.dti.gov.ph/services/monitoring-and-enforcement/')]
   }
  ]
};
