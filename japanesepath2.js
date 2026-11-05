/**
 * Original Japanese A1 bridge modules following Atlas' 46-kana introduction.
 * Learning approach informed by Japan Foundation Irodori A1 grammar and Can-do progression.
 * Sources: https://yg.jpf.go.jp/what-is-irodori/
 *          https://jfmo.org.ph/for_nihongo_learners/grammar-worksheets/
 * Not reviewed by a native Japanese-language editor. Synthetic local voices are not assessment.
 */
const examples=(entries)=>entries.map(([text,roman,meaning,breakdown])=>({text,roman,meaning,breakdown}));
const checks=(entries)=>entries.map(([prompt,answer,hint,others=[]])=>({prompt,answer,hint,others}));
const vocab=(label,entries)=>({label,items:entries.map(([kana,roman])=>({kana,roman}))});

export const JAPANESE_NEXT_UNITS=[
 {
  id:'words-and-demonstratives',
  title:'From kana to useful words',
  stage:'10 · Vocabulary by meaning',
  goal:'Read everyday nouns and use これ, それ, あれ without depending on an English prompt.',
  intro:'Being able to pronounce ほん does not mean knowing that it is a book. A language learner must connect three things: written form, spoken form and meaning. This lesson introduces meaningful sets of words, then lets you build new statements from them.',
  teaching:[
   ['Build word families, not random lists','Start with people and things you see: ひと (person), ともだち (friend), ほん (book), みず (water), いえ (house), ねこ (cat). Read the kana aloud, picture the actual thing and cover the English meaning. Return to the same words in later sentences.'],
   ['Near the speaker, near the listener, far from both','これ (kore) means “this one” close to the speaker; それ (sore) means “that one” close to the listener or previously mentioned; あれ (are) means “that one over there” away from both. The relevant distance is conversational, not an exact number of meters.'],
   ['Avoid translating every pronoun','Japanese often leaves subjects or pronouns unspoken when context is clear. You do not have to begin every sentence with わたし (watashi, “I”). First practice complete teaching sentences; then notice when natural dialogues omit understood information.'],
   ['Study a word using four passes','First decode kana, then check meaning, say it aloud, and finally retrieve it in a short example. A word checked only in a multiple-choice recognition quiz may remain difficult to produce in conversation.']
  ],
  rows:[
   vocab('People and things',[['ひと','hito'],['ともだち','tomodachi'],['ほん','hon'],['みず','mizu'],['いえ','ie']]),
   vocab('Pointing to objects',[['これ','kore'],['それ','sore'],['あれ','are']])
  ],
  examples:examples([
   ['これは ほんです','kore wa hon desu','This is a book.','これ = this one; topic particle は is pronounced wa; ほん = book; です is the polite ending.'],
   ['それは みずです','sore wa mizu desu','That is water (near you / previously mentioned).','それ points to the listener’s side or a previously known thing; the rest follows the same pattern.'],
   ['あれは いえです','are wa ie desu','That over there is a house.','あれ points away from both people; いえ is house.'],
   ['これは なんですか','kore wa nan desu ka','What is this?','なん = what; か marks the question; keep the teaching spaces only as reading aids.']
  ]),
  practice:checks([
   ['What does みず mean?','water','It is something you drink.'],
   ['Which word points to an object near the listener?','sore','Contrast kore (speaker) and are (far from both).',['それ']],
   ['Type the romaji of ほん.','hon','ほ = ho and ん = the nasal sound.']
  ])
 },
 {
  id:'particles-and-polite-sentences',
  title:'Why は, の and か matter',
  stage:'11 · Sentence structure',
  goal:'Explain a Japanese topic sentence, a possession relationship, a simple question and a polite negative.',
  intro:'Japanese particles are short markers that show how pieces of a sentence relate to one another. They are not English prepositions with one-to-one translations. Learn their job by comparing minimal sentence pairs.',
  teaching:[
   ['Topic は is written ha, spoken wa','わたしは がくせいです (watashi wa gakusei desu) means “I am a student.” わたし introduces the speaker; は identifies the topic. In this grammatical role は is read wa, unlike the regular hiragana syllable は (ha). A topic is not automatically the grammatical subject in every sentence.'],
   ['の connects nouns','わたしの ほん (watashi no hon) means “my book”. せんせいの ほん (sensei no hon) may mean “the teacher’s book”. の can show possession or a broader noun relationship, so later contexts may need more than the English word “of”.'],
   ['か makes a polite question','これは ほんですか (kore wa hon desu ka) asks “Is this a book?” A written question mark is optional in Japanese; か is the important structure. The answer is not always yes: いいえ、ほんじゃありません (“No, it is not a book”) uses an introductory polite negative.'],
   ['Build a negative without inventing rules','じゃありません is one common polite negative of a noun + です construction, especially in spoken everyday style; ではありません is a more formal option. Not every Japanese verb or adjective uses this negative form. That comes in later grammar.']
  ],
  rows:[vocab('Sentence building blocks',[['わたし','watashi'],['がくせい','gakusei'],['せんせい','sensei'],['ほん','hon'],['なん','nan']])],
  examples:examples([
   ['わたしは がくせいです','watashi wa gakusei desu','I am a student.','topic わたし + は (wa) + noun がくせい + です.'],
   ['これは わたしの ほんです','kore wa watashi no hon desu','This is my book.','The noun phrase わたしの ほん identifies whose book it is.'],
   ['これは ほんですか','kore wa hon desu ka','Is this a book?','Add question particle か after the polite statement.'],
   ['いいえ、ほんじゃありません','iie, hon ja arimasen','No, it is not a book.','いいえ = no; noun + じゃありません = polite negation.']
  ]),
  practice:checks([
   ['How do you pronounce topic particle は in わたしは?','wa','The topic marker is pronounced differently from stand-alone は.'],
   ['What does の show in わたしの ほん?','possession','It connects me and book.',['my book','ownership']],
   ['Which particle turns これは ほんです into a polite question?','ka','It comes after です.',['か']]
  ])
 },
 {
  id:'places-and-existence',
  title:'Where is it? あります or います?',
  stage:'12 · Location and existence',
  goal:'Ask where something is and distinguish the common あります/います patterns.',
  intro:'We now know how to identify a book or person. Next, learn how to talk about locations. Japanese often uses に to mark the place where something exists and が to mark what exists. Learn patterns first rather than treating each particle as an isolated English word.',
  teaching:[
   ['These words identify a place','ここ (koko) = here, そこ (soko) = there near you, あそこ (asoko) = over there, and どこ (doko) = where? Compare the sounds with これ, それ and あれ, which point to objects rather than places.'],
   ['ある is used for things; いる for living beings','In simple beginner examples, あります (arimasu) is used for the existence of inanimate things, and います (imasu) for people or animals. This is a useful starting generalization, not a mechanical rule for every possible Japanese noun.'],
   ['Location に and the thing が','ここに ほんが あります (koko ni hon ga arimasu) means “There is a book here.” The location comes before に; the book before が; the existence verb comes last. Remember the structure instead of translating each word literally.'],
   ['Compare stating a location with asking about it','ねこは どこですか (neko wa doko desu ka) means “Where is the cat?” そこに います (soko ni imasu) means “It is there.” The subject can be left unsaid when it is already understood.']
  ],
  rows:[vocab('Places and question words',[['ここ','koko'],['そこ','soko'],['あそこ','asoko'],['どこ','doko']])],
  examples:examples([
   ['ここに ほんが あります','koko ni hon ga arimasu','There is a book here.','ここ = here; に marks location of existence; ほんが marks the item; あります indicates existence of a thing.'],
   ['そこに ねこが います','soko ni neko ga imasu','There is a cat there.','A cat is a living being, so the existence verb is います.'],
   ['トイレは どこですか','toire wa doko desu ka','Where is the toilet/restroom?','トイレ is a common loanword written in katakana; どこ = where.'],
   ['あそこに あります','asoko ni arimasu','It is over there.','The thing being discussed can be omitted once the context makes it clear.']
  ]),
  practice:checks([
   ['What does どこ mean?','where','It asks about a location.'],
   ['Which polite existence verb normally goes with a cat?','imasu','Use the living-being pattern.',['います']],
   ['What particle marks the location in ここに ほんが あります?','ni','It follows ここ.',['に']]
  ])
 },
 {
  id:'actions-and-time',
  title:'I drink water. Yesterday I read.',
  stage:'13 · First verbs and time',
  goal:'Describe everyday actions with polite ます forms and identify the function of を, で and に.',
  intro:'Japanese action sentences tend to place the verb at the end. You can already read the kana, so focus on why each word is present and how the verb changes meaning when its ending changes.',
  teaching:[
   ['An action often comes at the end','わたしは みずを のみます (watashi wa mizu o nomimasu) means “I drink water.” Here を, pronounced o, marks the direct object. You cannot assume that English subject–verb–object word order maps directly to Japanese.'],
   ['Polite nonpast and past','のみます (nomimasu) is a polite nonpast form that can refer to a habitual or future action depending on context. のみました (nomimashita) is polite past. のみません (nomimasen) is polite nonpast negative. Do not think ます always means “right now”.'],
   ['Action location uses で, unlike existence に','うちで べんきょうします (uchi de benkyou shimasu) means “I study at home.” で marks the place of an activity. In the earlier existence example ここに ほんが あります, に identified where the book exists. Compare the entire construction, not only the particles.'],
   ['Learn high-frequency time expressions','きょう (kyou) means today, きのう (kinou) means yesterday, and あした (ashita) means tomorrow. A time expression does not automatically require に. Specific clock times, such as 7じに (shichi-ji ni, at seven), may use に.'],
   ['Apply without claiming fluency','Try three personal statements: something you do, something you did yesterday, and something you will do tomorrow. Checking your own output against the pattern is valuable, but teacher feedback is still needed for naturalness and pronunciation.']
  ],
  rows:[
   vocab('Useful verb forms',[['のみます','nomimasu'],['のみました','nomimashita'],['のみません','nomimasen'],['べんきょうします','benkyou shimasu']]),
   vocab('Simple time words',[['きょう','kyou'],['きのう','kinou'],['あした','ashita']])
  ],
  examples:examples([
   ['みずを のみます','mizu o nomimasu','I drink water / I will drink water (by context).','みず = water; を (o) marks the object; のみます = drink (polite nonpast).'],
   ['きのう ほんを よみました','kinou hon o yomimashita','Yesterday I read a book.','きのう = yesterday; ほんを = book as the object; よみました = read (polite past).'],
   ['うちで べんきょうします','uchi de benkyou shimasu','I study at home.','うち = home; で marks where the studying happens; verb phrase comes last.'],
   ['あした にほんごを べんきょうします','ashita nihongo o benkyou shimasu','Tomorrow I will study Japanese.','あした sets the future context; にほんごを marks Japanese as what is studied; べんきょうします is nonpast.']
  ]),
  practice:checks([
   ['What particle marks the direct object in みずを のみます?','o','The character is を, commonly pronounced o.',['を']],
   ['Which polite form means drank in the past?','nomimashita','The ending ました marks polite past in this example.',['のみました']],
   ['What particle marks the place of an action in うちで べんきょうします?','de','Contrast with existence-location に.',['で']]
  ])
 }
];
