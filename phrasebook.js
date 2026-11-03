/** Offline language starters. Romanization is approximate. Audio depends on device voices. */
const data={"ja":{"locale":"ja-JP","t":["こんにちは","ありがとうございます","すみません","もう一度言ってください","駅はどこですか？","わかりません","これはいくらですか？","はじめまして"],"r":["Konnichiwa","Arigatō gozaimasu","Sumimasen","Mō ichido itte kudasai","Eki wa doko desu ka?","Wakarimasen","Kore wa ikura desu ka?","Hajimemashite"]},"ko":{"locale":"ko-KR","t":["안녕하세요","감사합니다","죄송합니다","다시 말씀해 주세요","역이 어디예요?","이해하지 못했어요","이거 얼마예요?","만나서 반갑습니다"],"r":["Annyeonghaseyo","Gamsahamnida","Joesonghamnida","Dasi malsseumhae juseyo","Yeogi eodiyeyo?","Ihaehaji mothaesseoyo","Igeo eolmayeyo?","Mannaseo bangapseumnida"]},"es":{"locale":"es-ES","t":["Hola","Gracias","Disculpe","Repítalo, por favor","¿Dónde está la estación?","No entiendo","¿Cuánto cuesta esto?","Mucho gusto"]},"fr":{"locale":"fr-FR","t":["Bonjour","Merci","Excusez-moi","Répétez, s’il vous plaît","Où est la gare ?","Je ne comprends pas","Combien ça coûte ?","Enchanté(e)"]},"zh":{"locale":"zh-CN","t":["你好","谢谢","对不起","请再说一遍","车站在哪里？","我听不懂","这个多少钱？","很高兴认识你"],"r":["Nǐ hǎo","Xièxie","Duìbuqǐ","Qǐng zài shuō yí biàn","Chēzhàn zài nǎlǐ?","Wǒ tīng bù dǒng","Zhège duōshao qián?","Hěn gāoxìng rènshi nǐ"]},"de":{"locale":"de-DE","t":["Guten Tag","Danke","Entschuldigung","Können Sie das bitte wiederholen?","Wo ist der Bahnhof?","Ich verstehe nicht","Wie viel kostet das?","Freut mich, Sie kennenzulernen"]},"fil":{"locale":"fil-PH","t":["Kumusta?","Salamat","Paumanhin","Pakiulit po","Saan po ang istasyon?","Hindi ko maintindihan","Magkano po ito?","Ikinagagalak kitang makilala"]},"it":{"locale":"it-IT","t":["Buongiorno","Grazie","Mi scusi","Può ripetere, per favore?","Dov’è la stazione?","Non capisco","Quanto costa questo?","Piacere di conoscerla"]},"en":{"locale":"en-US","t":["Hello, how are you?","Thank you very much","Excuse me","Could you say that again, please?","Where is the train station?","I do not understand","How much does this cost?","Nice to meet you"]}};

/** Eleven additional authored starter packs. Regional forms and native-speaker review remain future work.
 * Every pack uses the same eight meanings, so existing recall, challenges and quests work without a migration.
 */
const additionalPacks={
  "ar": {
    "locale": "ar-SA",
    "t": [
      "مرحبًا",
      "شكرًا",
      "عذرًا",
      "من فضلك، أعد ذلك",
      "أين محطة القطار؟",
      "لا أفهم",
      "بكم هذا؟",
      "سررت بلقائك"
    ]
  },
  "pt": {
    "locale": "pt-PT",
    "t": [
      "Olá",
      "Obrigado",
      "Com licença",
      "Pode repetir, por favor?",
      "Onde fica a estação de comboios?",
      "Não compreendo",
      "Quanto custa isto?",
      "Muito prazer"
    ]
  },
  "hi": {
    "locale": "hi-IN",
    "t": [
      "नमस्ते",
      "धन्यवाद",
      "माफ़ कीजिए",
      "कृपया दोहराइए",
      "रेलवे स्टेशन कहाँ है?",
      "मुझे समझ नहीं आया",
      "यह कितने का है?",
      "आपसे मिलकर खुशी हुई"
    ],
    "r": [
      "Namaste",
      "Dhanyavaad",
      "Maaf kijiye",
      "Kripya dohraiye",
      "Railway station kahaan hai?",
      "Mujhe samajh nahin aaya",
      "Yeh kitne ka hai?",
      "Aapse milkar khushi hui"
    ]
  },
  "th": {
    "locale": "th-TH",
    "t": [
      "สวัสดี",
      "ขอบคุณ",
      "ขอโทษ",
      "กรุณาพูดอีกครั้ง",
      "สถานีรถไฟอยู่ที่ไหน?",
      "ฉันไม่เข้าใจ",
      "อันนี้ราคาเท่าไหร่?",
      "ยินดีที่ได้รู้จัก"
    ]
  },
  "vi": {
    "locale": "vi-VN",
    "t": [
      "Xin chào",
      "Cảm ơn",
      "Xin lỗi",
      "Xin hãy nói lại",
      "Ga tàu ở đâu?",
      "Tôi không hiểu",
      "Cái này giá bao nhiêu?",
      "Rất vui được gặp bạn"
    ]
  },
  "id": {
    "locale": "id-ID",
    "t": [
      "Halo",
      "Terima kasih",
      "Permisi",
      "Tolong ulangi",
      "Di mana stasiun kereta?",
      "Saya tidak mengerti",
      "Berapa harga ini?",
      "Senang bertemu dengan Anda"
    ]
  },
  "ru": {
    "locale": "ru-RU",
    "t": [
      "Здравствуйте",
      "Спасибо",
      "Извините",
      "Повторите, пожалуйста",
      "Где находится вокзал?",
      "Я не понимаю",
      "Сколько это стоит?",
      "Приятно познакомиться"
    ],
    "r": [
      "Zdravstvuyte",
      "Spasibo",
      "Izvinite",
      "Povtorite, pozhaluysta",
      "Gde nakhoditsya vokzal?",
      "Ya ne ponimayu",
      "Skol'ko eto stoit?",
      "Priyatno poznakomit'sya"
    ]
  },
  "tr": {
    "locale": "tr-TR",
    "t": [
      "Merhaba",
      "Teşekkür ederim",
      "Affedersiniz",
      "Lütfen tekrar eder misiniz?",
      "Tren istasyonu nerede?",
      "Anlamıyorum",
      "Bu ne kadar?",
      "Tanıştığımıza memnun oldum"
    ]
  },
  "nl": {
    "locale": "nl-NL",
    "t": [
      "Hallo",
      "Dank u wel",
      "Pardon",
      "Kunt u dat herhalen, alstublieft?",
      "Waar is het station?",
      "Ik begrijp het niet",
      "Hoeveel kost dit?",
      "Aangenaam kennis te maken"
    ]
  },
  "sv": {
    "locale": "sv-SE",
    "t": [
      "Hej",
      "Tack",
      "Ursäkta",
      "Kan du upprepa det?",
      "Var ligger stationen?",
      "Jag förstår inte",
      "Vad kostar det här?",
      "Trevligt att träffas"
    ]
  },
  "el": {
    "locale": "el-GR",
    "t": [
      "Γεια σας",
      "Ευχαριστώ",
      "Συγγνώμη",
      "Μπορείτε να το επαναλάβετε;",
      "Πού είναι ο σταθμός;",
      "Δεν καταλαβαίνω",
      "Πόσο κοστίζει αυτό;",
      "Χάρηκα για τη γνωριμία"
    ],
    "r": [
      "Yia sas",
      "Efharistó",
      "Signómi",
      "Boríte na to epanalávete?",
      "Poú eínai o stathmós?",
      "Den katalavaíno",
      "Póso kostízei aftó?",
      "Hárika gia ti gnorimía"
    ]
  }
};
Object.assign(data,additionalPacks);
const regionalNotes={
  "ar": "Uses Modern Standard Arabic; everyday speech and pronunciation vary across Arabic-speaking regions.",
  "pt": "Uses European Portuguese. For 'thank you,' speakers commonly say obrigado (masculine) or obrigada (feminine).",
  "th": "Thai greetings, thanks and apologies often add politeness particles that depend on the speaker and situation.",
  "vi": "Uses Vietnamese wording familiar in broad contexts; pronouns and levels of formality depend on relationship and age.",
  "hi": "Uses polite Hindi phrasing; spelling-to-sound guides are approximate.",
  "ru": "Uses polite Russian forms; transliterations are approximate.",
  "el": "Uses polite Modern Greek forms; transliterations are approximate."
};
export const PHRASEBOOK=Object.freeze(Object.fromEntries(Object.entries(data).map(([code,p])=>[code,{locale:p.locale,note:regionalNotes[code]||'',phrases:p.t.map((target,i)=>({id:String(i+1),english:["Hello / Good day","Thank you","Excuse me","Please repeat","Where is the station?","I don't understand","How much is this?","Nice to meet you"][i],target,pronunciation:p.r?.[i]||''}))}])));
export function getPhrasePack(code){return Object.hasOwn(PHRASEBOOK,code)?PHRASEBOOK[code]:null;}
export function sanitizePhraseProgress(value){const out={};if(!value||typeof value!=='object'||Array.isArray(value))return out;for(const [code,items] of Object.entries(value)){const p=getPhrasePack(code);if(!p||!Array.isArray(items))continue;const allowed=new Set(p.phrases.map(x=>x.id));out[code]=[...new Set(items.filter(v=>typeof v==='string'&&allowed.has(v)))];}return out;}
