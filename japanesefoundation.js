/**
 * Japanese zero-to-kana foundation: authored, beginner-first instruction.
 * Japanese kana sequence cross-checked against the Japan Foundation Irodori kana chart:
 * https://www2.jpfbj.cn/irodori/resources/pdf/X_Hiragana_All.pdf
 * Sound associations are approximations, not transcriptions or native audio.
 */
import {JAPANESE_NEXT_UNITS} from './japanesepath2.js';
import {createJapaneseRowLessons} from './japaneserows.js';

const row=(label,spec)=>({
 label,items:spec.split(' ').map(token=>{
  const [kana,roman]=token.split(':');
  return {kana,roman};
 })
});
const H={
 vowels:row('Five vowels','あ:a い:i う:u え:e お:o'),
 k:row('K row','か:ka き:ki く:ku け:ke こ:ko'),
 s:row('S row','さ:sa し:shi す:su せ:se そ:so'),
 t:row('T row','た:ta ち:chi つ:tsu て:te と:to'),
 n:row('N row','な:na に:ni ぬ:nu ね:ne の:no'),
 h:row('H row','は:ha ひ:hi ふ:fu へ:he ほ:ho'),
 m:row('M row','ま:ma み:mi む:mu め:me も:mo'),
 y:row('Y row','や:ya ゆ:yu よ:yo'),
 r:row('R row','ら:ra り:ri る:ru れ:re ろ:ro'),
 w:row('W and final N','わ:wa を:o ん:n'),
 voiced:row('Marks change consonants','か:ka が:ga は:ha ば:ba ぱ:pa さ:sa ざ:za'),
 small:row('Small characters change rhythm','きや:kiya きゃ:kya きゆ:kiyu きゅ:kyu きよ:kiyo きょ:kyo つ:tsu っ:small-tsu'),
};
const K={
 vowels:row('Five vowels','ア:a イ:i ウ:u エ:e オ:o'),
 k:row('K row','カ:ka キ:ki ク:ku ケ:ke コ:ko'),
 s:row('S row','サ:sa シ:shi ス:su セ:se ソ:so'),
 t:row('T row','タ:ta チ:chi ツ:tsu テ:te ト:to'),
 n:row('N row','ナ:na ニ:ni ヌ:nu ネ:ne ノ:no'),
 h:row('H row','ハ:ha ヒ:hi フ:fu ヘ:he ホ:ho'),
 m:row('M row','マ:ma ミ:mi ム:mu メ:me モ:mo'),
 y:row('Y row','ヤ:ya ユ:yu ヨ:yo'),
 r:row('R row','ラ:ra リ:ri ル:ru レ:re ロ:ro'),
 w:row('W and final N','ワ:wa ヲ:o ン:n')
};
const MEMORY_HOOKS={
 'あ':'A sound: like “ah!”; start with the familiar vowel, then remember this new shape.',
 'い':'The sound ee as in “see”; two simple strokes can help you identify い.',
 'う':'The sound is close to oo, with relaxed, less-rounded lips.',
 'え':'A steady e, close to the vowel in Filipino “mesa”.',
 'お':'A pure o; avoid adding an English-style “w” sound at the end.',
 'き':'“Key” sounds like ki. The shape can be a personal reminder of a key.',
 'し':'This curved character resembles a fishing hook. Remember shi.',
 'く':'A small angled beak: imagine a cuckoo calling “ku”.',
 'つ':'The curve can suggest a tsunami wave: tsu, not simply su.',
 'ぬ':'Watch the loop and stroke carefully; later compare ぬ with め.',
 'め':'The loop can resemble an eye; compare its first stroke with ぬ.',
 'シ':'Three strokes angled differently from ツ; learn them side by side.',
 'ツ':'Three strokes: check their direction against シ.',
 'ソ':'Compare with ン; the direction and placement of strokes matter.',
 'ン':'Compare with ソ; look at how the final long stroke rises.'
};
const ex=(text,roman,meaning,breakdown)=>({text,roman,meaning,breakdown});
const check=(prompt,answer,hint,others=[])=>({prompt,answer,hint,others});

const INTRO_JAPANESE_UNITS=[
 {
  id:'vowels',title:'Five sounds you already nearly know',stage:'01 · Start here',
  goal:'Recognize and read あ・い・う・え・お without guessing.',
  intro:'Japanese is built around five stable vowel qualities. If you know Filipino vowels, you already have a useful starting point. English examples are only memory bridges: actual vowel sounds vary by accent.',
  teaching:[
   ['Connect known sounds to new ones','あ (a) sounds close to the a in Filipino ama; い (i) to the i in isip; う (u) to the u in puso; え (e) to the e in mesa; お (o) to the o in oras. Say each as a single steady sound.'],
   ['Notice the difference','Japanese う is often pronounced with less lip rounding than English “oo”. Japanese え and お generally stay pure sounds rather than sliding into two-vowel English diphthongs. Native examples matter more than spelling.'],
   ['Read before memorizing','Look at each hiragana character, say its sound, look away, and write it or trace it with your finger. Repeat in different orders. Five small recognitions are better than memorizing an entire chart at once.']
  ],
  rows:[H.vowels],
  examples:[
   ex('あい','ai','love (noun)','あ = a + い = i. Two vowel units; do not blend into the English word “eye”.'),
   ex('いえ','ie','house','い = i + え = e. Keep both vowel sounds recognizable.'),
   ex('あお','ao','blue','あ = a + お = o. Say each vowel clearly.')
  ],
  practice:[
   check('Read あ in romaji.','a','Think of a single “ah” sound.'),
   check('Read い in romaji.','i','Think of “ee” as in see.'),
   check('Read え in romaji.','e','Think of the vowel in mesa.')
  ]
 },
 {
  id:'hiragana-ks',title:'Build words with K and S',stage:'02 · Hiragana patterns',
  goal:'Read the first two consonant rows and recognize why し is special.',
  intro:'Instead of memorizing ten disconnected characters, combine a consonant with the five vowels you already know: k + a becomes ka, k + i becomes ki. This pattern is the organizing idea of the kana chart.',
  teaching:[
   ['The K pattern','か・き・く・け・こ read ka, ki, ku, ke, ko. Your earlier vowel knowledge does most of the pronunciation work; only the initial consonant changes.'],
   ['The S pattern has a twist','さ・し・す・せ・そ read sa, shi, su, se, so. The written romaji し is shi (not si in the common Hepburn system). Listen to how it differs from a plain English “see”.'],
   ['Choose memorable visual hooks','Some learners picture き as a key or し as a fishing hook. These are optional associations, not literal descriptions of the characters. Test whether each hook actually helps you recall its sound.']
  ],
  rows:[H.k,H.s],
  examples:[ex('かさ','kasa','umbrella','か = ka + さ = sa.'),ex('すし','sushi','sushi','す = su + し = shi.'),ex('あさ','asa','morning','あ = a + さ = sa.')],
  practice:[check('Read き in romaji.','ki','K + i gives ki.'),check('Read し in romaji.','shi','This is the exception in the S row.',['si']),check('Read かさ in romaji.','kasa','Combine か (ka) and さ (sa).')]
 },
 {
  id:'hiragana-tn',title:'T and N: learn the exceptions',stage:'03 · Hiragana patterns',
  goal:'Read T and N rows and distinguish ち and つ from regular T sounds.',
  intro:'Most of the system is predictable once you know the vowels. Some common sound changes deserve extra time, especially the T row. Learn those patterns deliberately rather than guessing.',
  teaching:[
   ['T changes in two places','た・ち・つ・て・と read ta, chi, tsu, te, to. ち is chi, and つ is tsu. You cannot derive these two readings by simply adding t to the romanized vowel.'],
   ['N follows the expected pattern','な・に・ぬ・ね・の read na, ni, nu, ne, no. Try alternating: た / な; ち / に; つ / ぬ. Contrast practice helps the characters stick.'],
   ['See similar shapes carefully','The hiragana ぬ and め can look similar; め comes in the next unit. Learn the distinctive loop and strokes rather than only the sound-based mnemonic. Japanese writing also requires stroke order, which this first-stage text chart does not grade.']
  ],
  rows:[H.t,H.n],
  examples:[ex('なつ','natsu','summer','な = na + つ = tsu.'),ex('たこ','tako','octopus','た = ta + こ = ko.'),ex('ねこ','neko','cat','ね = ne + こ = ko.')],
  practice:[check('Read ち in romaji.','chi','The first T-row exception.'),check('Read つ in romaji.','tsu','Think of a curling tsunami wave.'),check('Read ねこ in romaji.','neko','ね (ne) + こ (ko).')]
 },
 {
  id:'hiragana-hm',title:'H and M: from syllables to words',stage:'04 · Hiragana patterns',
  goal:'Read H and M rows and recognize the soft Japanese ふ.',
  intro:'Every new row increases the number of words you can decode. Reading is a separate skill from knowing a word’s meaning: first identify the sound, then learn the meaning.',
  teaching:[
   ['H mostly follows the pattern','は・ひ・ふ・へ・ほ read ha, hi, fu, he, ho. The ふ sound is often romanized fu, but it is made with a softer lip configuration than a forceful English f.'],
   ['M is regular','ま・み・む・め・も read ma, mi, mu, me, mo. Use the five-vowel chant, then mix these characters with the previous rows.'],
   ['Avoid misleading shortcuts','Visual hooks are optional tools. Confirm the shape itself, especially ぬ versus め, and keep checking sound recordings when available. An invented story should never replace accurate reading.']
  ],
  rows:[H.h,H.m],
  examples:[ex('はな','hana','flower / nose (depending on context)','は = ha + な = na.'),ex('ふね','fune','boat','ふ = fu + ね = ne.'),ex('みみ','mimi','ear','み = mi + み = mi.')],
  practice:[check('Read ふ in romaji.','fu','This is the H-row exception.'),check('Read め in romaji.','me','M + e gives me.'),check('Read みみ in romaji.','mimi','The same kana is repeated twice.')]
 },
 {
  id:'hiragana-rest',title:'Finish the 46 basic hiragana',stage:'05 · Hiragana chart',
  goal:'Recognize Y, R, W, を and the standalone nasal ん.',
  intro:'You already know most of the basic hiragana. Complete the remaining rows, then return to the complete chart in the review section. Forty-six characters does not mean forty-six isolated facts: most are sound patterns.',
  teaching:[
   ['Some chart positions are intentionally empty','The Y row has や (ya), ゆ (yu), よ (yo). The W row has わ (wa) and を, usually pronounced o in modern Japanese when used as an object particle. Do not invent missing syllables to fill the chart.'],
   ['The R sound is not a strong English R','ら・り・る・れ・ろ read ra, ri, ru, re, ro, but the consonant is typically a brief tap unlike typical English r. Audio from a reliable speaker is essential for precise imitation.'],
   ['One character stands alone','ん represents a nasal sound with pronunciation influenced by surrounding sounds. Its romaji is often n, but simply pronouncing an English “en” adds a vowel that is not there.']
  ],
  rows:[H.y,H.r,H.w],
  examples:[ex('やま','yama','mountain','や = ya + ま = ma.'),ex('そら','sora','sky','そ = so + ら = ra.'),ex('ほん','hon','book','ほ = ho + ん = nasal n; no extra vowel after ん.')],
  practice:[check('Read や in romaji.','ya','Y + a gives ya.'),check('Read ら in romaji.','ra','The R row begins with ra.'),check('Read ほん in romaji.','hon','ほ (ho) + ん (n).')]
 },
 {
  id:'sound-changes',title:'Marks, little kana and rhythm',stage:'06 · Sound changes',
  goal:'Understand basic voiced marks, contracted sounds, small っ and long vowels.',
  intro:'Real words involve more than the basic 46 characters. Small marks can change a consonant, and small characters can change sound timing. These differences can change word meaning.',
  teaching:[
   ['Two marks, different consonants','Dakuten (゛) turns か → が (ka → ga), さ → ざ (sa → za), は → ば (ha → ba). Handakuten (゜) turns は → ぱ (ha → pa). Compare the same base character before learning an entirely new form.'],
   ['Small ゃ・ゅ・ょ combine sounds','きや is typically ki-ya, while きゃ is kya, with a small ゃ. Similarly, きゅ (kyu) and きょ (kyo) are combined sounds. Size matters.'],
   ['Small っ and vowel length affect timing','きて (kite, “come” as a request) differs from きって (kitte, “stamp”). A small っ marks a brief consonant closure. Long vowels also matter; e.g. おばさん (aunt) versus おばあさん (grandmother). Kana exercises here do not assess timing or pitch accent.']
  ],
  rows:[H.voiced,H.small],
  examples:[ex('がくせい','gakusei','student','が = ga; く = ku; せ = se; い = i.'),ex('きって','kitte','postage stamp','き + small っ + て; stop briefly before t.'),ex('きゃく','kyaku','guest / customer','き + small ゃ = kya; く = ku.')],
  practice:[check('Read が in romaji.','ga','Dakuten changes the K sound to G.'),check('Read きゃ in romaji.','kya','The ゃ is small, so combine the sounds.'),check('Read きって in romaji.','kitte','Represent the consonant closure with doubled t.')],
 },
 {
  id:'katakana-first',title:'Katakana: familiar sounds, new shapes',stage:'07 · Katakana basics',
  goal:'Read the first 25 katakana using the same sound system as hiragana.',
  intro:'Katakana is another Japanese script. Its characters represent the same basic sound units as hiragana, but it is commonly used for loanwords, foreign names, and other purposes. You are learning new symbols, not a new set of vowels.',
  teaching:[
   ['Reuse the five vowel sounds','ア・イ・ウ・エ・オ are a, i, u, e, o—exactly the same vowel sequence you already studied in hiragana. Write あ next to ア, い next to イ, and so on to build bridges between scripts.'],
   ['Keep the familiar consonant rows','カキクケコ correspond to the K sounds; サシスセソ to the S sounds. タチツテト and ナニヌネノ follow the same rules you learned earlier.'],
   ['Compare confusable characters','シ (shi) and ツ (tsu) are particularly easy to confuse. Observe stroke orientation; they are different forms, not interchangeable. Take time to identify them visually before testing speed.']
  ],
  rows:[K.vowels,K.k,K.s,K.t,K.n],
  examples:[ex('アニメ','anime','animation / anime','ア = a, ニ = ni, メ = me.'),ex('カメラ','kamera','camera','カ = ka, メ = me, ラ = ra (the R row comes next).'),ex('テスト','tesuto','test','テ = te, ス = su, ト = to.')],
  practice:[check('Read ア in romaji.','a','The katakana version of vowel a.'),check('Read シ in romaji.','shi','Compare with ツ (tsu).',['si']),check('Read テスト in romaji.','tesuto','テ = te, ス = su, ト = to.')],
 },
 {
  id:'katakana-rest',title:'Finish katakana and read loanwords',stage:'08 · Katakana chart',
  goal:'Read the rest of the 46 basic katakana and identify long-vowel marks.',
  intro:'Complete the katakana chart and put the symbols to use. You will now have the tools to decode many beginner words, even when you have not memorized their meanings.',
  teaching:[
   ['Finish the remaining rows','ハ・ヒ・フ・ヘ・ホ, マ・ミ・ム・メ・モ, ヤ・ユ・ヨ, ラ・リ・ル・レ・ロ, ワ・ヲ and ン correspond to the same basic sounds as their hiragana equivalents.'],
   ['Look carefully at ソ and ン','Katakana ソ (so) and ン (n) can resemble one another. Compare the placement and direction of strokes in a reliable stroke-order chart, not just a visual shortcut.'],
   ['Recognize long-vowel ー','Loanwords often use ー to extend a vowel: コーヒー (kōhī, coffee). Length matters. English loanwords often change to fit Japanese sound patterns; do not expect their spelling to match English letters.']
  ],
  rows:[K.h,K.m,K.y,K.r,K.w],
  examples:[ex('カメラ','kamera','camera','カ = ka + メ = me + ラ = ra.'),ex('ホテル','hoteru','hotel','ホ = ho + テ = te + ル = ru.'),ex('コーヒー','kōhī','coffee','コ = ko + ー = long o + ヒ = hi + ー = long i.')],
  practice:[check('Read ラ in romaji.','ra','Same R-row sound as hiragana ら.'),check('Read ン in romaji.','n','Standalone nasal; do not add a vowel.'),check('What does ー change in コーヒー?','vowel length','It stretches the preceding vowel.',['long vowel','long vowels','makes vowel longer','lengthens the vowel'])],
 },
 {
  id:'first-sentences',title:'Read words, then build sentences',stage:'09 · Reading and grammar',
  goal:'Combine kana into useful words and analyze two simple Japanese sentences.',
  intro:'Recognizing characters is the beginning. You also need vocabulary, meaning and grammar to understand what you read. Japanese word order and particles are not word-for-word English.',
  teaching:[
   ['Read, then understand','ねこ (neko) is a cat, いぬ (inu) a dog, みず (mizu) water, and ほん (hon) a book. Practice decoding first; then recall what the word means without a translation prompt.'],
   ['は marks a topic in these sentences','In わたしは がくせいです (watashi wa gakusei desu), は is written ha but pronounced wa as a topic particle. The sentence means “I am a student” in a neutral, polite style.'],
   ['Build a demonstrative sentence','これは ほんです (kore wa hon desu) means “This is a book.” これ = this, は = topic marker, ほん = book, です = polite copula. Japanese commonly omits spaces in normal writing; spaces here are teaching aids.'],
   ['What comes next','These first nine steps introduce kana reading, not fluency. Continue into the next units for vocabulary, sentence particles, location expressions and common verbs. Spoken interaction, listening to native materials and writing still need much more practice.']
  ],
  rows:[],
  examples:[ex('ねこ','neko','cat','ね + こ = neko.'),ex('いぬ','inu','dog','い + ぬ = inu.'),ex('わたしは がくせいです','watashi wa gakusei desu','I am a student.','は is pronounced wa here; がくせい = student; です expresses politeness.'),ex('これは ほんです','kore wa hon desu','This is a book.','これ = this; は = topic marker; ほん = book; です = polite ending.')],
  practice:[check('What does ねこ mean in English?','cat','It is an animal that meows.',['a cat']),check('How is the topic particle は pronounced in これは?','wa','It is not pronounced ha in this grammatical role.'),check('What does これは ほんです mean?','this is a book','これは = this (topic), ほん = book, です = polite ending.',['this is a book.'])],
 }
];

const ROW_LESSONS=createJapaneseRowLessons(H,K);
export const JAPANESE_UNITS=[
 INTRO_JAPANESE_UNITS[0],
 ...ROW_LESSONS.hiragana,
 INTRO_JAPANESE_UNITS.find(x=>x.id==='sound-changes'),
 ...ROW_LESSONS.katakana,
 INTRO_JAPANESE_UNITS.find(x=>x.id==='first-sentences'),
 ...JAPANESE_NEXT_UNITS
];

export const JAPANESE_BASIC_HIRAGANA=[H.vowels,H.k,H.s,H.t,H.n,H.h,H.m,H.y,H.r,H.w]
 .flatMap(r=>r.items.map(x=>x.kana));
export const JAPANESE_BASIC_KATAKANA=[K.vowels,K.k,K.s,K.t,K.n,K.h,K.m,K.y,K.r,K.w]
 .flatMap(r=>r.items.map(x=>x.kana));
export const JAPANESE_SPEAKABLE=new Set(JAPANESE_UNITS.flatMap(unit=>[
 ...unit.rows.flatMap(r=>r.items.map(x=>x.kana)),
 ...unit.examples.map(e=>e.text)
]).filter(x=>!x.includes('small-tsu')));
const LEGACY_JAPANESE_COMPLETIONS={
 'hiragana-k':'hiragana-ks','hiragana-s':'hiragana-ks',
 'hiragana-t':'hiragana-tn','hiragana-n':'hiragana-tn',
 'hiragana-h':'hiragana-hm','hiragana-m':'hiragana-hm',
 'hiragana-y':'hiragana-rest','hiragana-r':'hiragana-rest','hiragana-w':'hiragana-rest',
 'katakana-vowels':'katakana-first','katakana-k':'katakana-first',
 'katakana-s':'katakana-first','katakana-t':'katakana-first','katakana-n':'katakana-first',
 'katakana-h':'katakana-rest','katakana-m':'katakana-rest',
 'katakana-y':'katakana-rest','katakana-r':'katakana-rest','katakana-w':'katakana-rest'
};
export function normalizeJapaneseFoundationDone(value){
 if(!Array.isArray(value))return [];
 const completed=new Set(value.filter(x=>typeof x==='string'));
 const clean=[];
 for(const unit of JAPANESE_UNITS){
  if(!completed.has(unit.id)&&!completed.has(LEGACY_JAPANESE_COMPLETIONS[unit.id]))break;
  clean.push(unit.id);
 }
 return clean;
}
export function evaluateJapaneseAnswer(unitId,questionIndex,response){
 const unit=JAPANESE_UNITS.find(x=>x.id===unitId),item=unit?.practice[questionIndex];
 if(!item)return {valid:false,correct:false};
 const normal=value=>String(value||'').normalize('NFKC').trim().toLowerCase()
  .replace(/\s+/g,' ').replace(/[.!?]+$/,'');
 const text=normal(response);
 const choices=[item.answer,...(item.others||[])];
 return {valid:true,correct:choices.some(ans=>normal(ans)===text),expected:item.answer,hint:item.hint};
}
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function action(text,act,attr='',className='secondary-button'){
 return '<button type="button" class="'+className+'" data-action="'+act+'" '+attr+'>'+text+'</button>';
}
export function japaneseFoundationPanel({done=[],activeId='vowels',practiceIndex=-1,feedback=''}={}){
 const completed=normalizeJapaneseFoundationDone(done);
 const unit=JAPANESE_UNITS.find(x=>x.id===activeId)||JAPANESE_UNITS[0];
 const index=JAPANESE_UNITS.indexOf(unit);
 const next=JAPANESE_UNITS[index+1];
 const finished=completed.includes(unit.id);
 const unlocked=i=>i===0||completed.includes(JAPANESE_UNITS[i-1].id);
 const menu=JAPANESE_UNITS.map((entry,i)=>
  action('<span class="japanese-unit-number">'+String(i+1).padStart(2,'0')+'</span><span>'+escapeHTML(entry.title)+'</span><span aria-hidden="true">'+(completed.includes(entry.id)?'✓':unlocked(i)?'→':'·')+'</span>',
    'japanese-open','data-id="'+entry.id+'" aria-current="'+(unit.id===entry.id?'step':'false')+'"'+(!unlocked(i)?' disabled':''),'japanese-unit-select'+(entry.id===unit.id?' selected':'')+(completed.includes(entry.id)?' completed':''))
 ).join('');
 const guidance=unit.teaching.map(([heading,body],i)=>
  '<article class="japanese-teaching"><span class="japanese-step">'+String(i+1).padStart(2,'0')+'</span><div><h4>'+escapeHTML(heading)+'</h4><p>'+escapeHTML(body)+'</p></div></article>'
 ).join('');
 const chart=unit.rows.map(r=>{
  const hints=r.items.filter(item=>MEMORY_HOOKS[item.kana]);
  return '<div class="japanese-kana-row"><h4>'+escapeHTML(r.label)+'</h4><div class="japanese-kana-grid">'+r.items.map(item=>
   '<div class="japanese-kana-tile"><span lang="ja">'+escapeHTML(item.kana)+'</span><strong>'+escapeHTML(item.roman)+'</strong>'+
    action('Hear','japanese-speak','data-kana="'+escapeHTML(item.kana)+'" aria-label="Hear '+escapeHTML(item.roman)+'"','japanese-hear')+
   '</div>').join('')+'</div>'+
   (hints.length?'<div class="japanese-memory-notes">'+hints.map(item=>
     '<p><strong lang="ja">'+escapeHTML(item.kana)+'</strong> '+escapeHTML(MEMORY_HOOKS[item.kana])+'</p>'
   ).join('')+'</div>':'')+'</div>';
 }).join('');
 const examples=unit.examples.map(e=>
  '<article class="japanese-word"><div><strong lang="ja">'+escapeHTML(e.text)+'</strong><span>'+escapeHTML(e.roman)+' · '+escapeHTML(e.meaning)+'</span></div><p>'+escapeHTML(e.breakdown)+'</p>'+
  action('Hear example','japanese-speak','data-kana="'+escapeHTML(e.text)+'"','japanese-hear')+'</article>'
 ).join('');
 const q=practiceIndex>=0?unit.practice[practiceIndex]:null;
 const practice=finished?
  '<div class="japanese-practice-done" role="status"><strong>Foundation checkpoint completed ✓</strong><p>You can revisit this material anytime. This records guided written recall, not pronunciation or fluency.</p>'+
  (next? action('Continue to the next foundation','japanese-next','','primary-button'):'<p>You have completed Atlas’s introductory kana, vocabulary and early grammar path. Further grammar, kanji, authentic listening and conversation still require sustained study.</p>')+'</div>':
  q?'<div class="japanese-practice" id="japanese-practice"><span class="overline">GUIDED RECALL · '+(practiceIndex+1)+' / '+unit.practice.length+'</span><h4>'+escapeHTML(q.prompt)+'</h4>'+
   '<label class="field-label" for="japanese-answer">Type the answer without looking at the chart</label><input id="japanese-answer" type="text" maxlength="60" autocomplete="off" spellcheck="false" autocapitalize="off" placeholder="Your answer (romaji or English)" />'+
   (feedback?'<p class="japanese-feedback" role="status">'+escapeHTML(feedback)+'</p>':'')+
   action('Check my answer','japanese-check','','primary-button')+
   '<p class="fineprint">If unsure, revisit the explanation above. Wrong answers can be retried without penalty.</p></div>':
   '<div class="japanese-practice"><h4>Now try a short recall check</h4><p>First read the explanations and examples above. Only then try three typed questions. You do not need a Japanese keyboard.</p>'+
   action('Start guided recall','japanese-start','','primary-button')+'</div>';
 return '<section class="japanese-foundation" aria-label="Step-by-step Japanese beginner learning pathway" id="japanese-foundation">'+
  '<div class="japanese-foundation-head"><span class="overline">JAPANESE · START WITH UNDERSTANDING</span><h2>Learn sounds before guessing words.</h2>'+
  '<p>Start with the five vowels, then learn the K, S, T, N, H, M, Y, R and W rows one at a time. After hiragana come sound changes, katakana, everyday words and basic grammar. No phrase guessing before you can read.</p>'+
  '<span class="japanese-count">'+completed.length+' / '+JAPANESE_UNITS.length+' foundation checkpoints</span></div>'+
  '<div class="japanese-foundation-layout"><nav class="japanese-unit-menu" aria-label="Japanese foundations">'+menu+'</nav>'+
  '<div class="japanese-lesson"><span class="overline">'+escapeHTML(unit.stage)+'</span><h3>'+escapeHTML(unit.title)+'</h3><p class="japanese-goal">'+escapeHTML(unit.goal)+'</p>'+
  '<p>'+escapeHTML(unit.intro)+'</p>'+guidance+chart+
  '<div class="japanese-word-list"><h4>Decode real examples</h4>'+examples+'</div>'+
  '<p class="japanese-audio-note" id="japanese-audio-note" role="status">Listen buttons use only a compatible installed local Japanese voice. If none is available, study the written clues and check native audio elsewhere; synthetic speech is not pronunciation assessment.</p>'+
  practice+'</div></div>'+
  '<p class="fineprint">This introductory path is not a proficiency certificate. The approximations, visual associations and local synthetic audio are study aids. Compare real speech and writing with qualified teaching resources such as the Japan Foundation’s Irodori materials.</p></section>';
}
