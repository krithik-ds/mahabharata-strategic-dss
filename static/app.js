// Mahabharata DSS V8 - Multilingual & Simple UI Controller

let allCases = [];
let corpusStats = null;
let currentTab = 'advisor';
let currentLang = 'en';

// Sanskrit Terms with Simple Meanings
const sanskritGlossary = {
  'Parva': 'Book / Major Chapter of Mahabharata',
  'Adhyaya': 'Section / Sub-chapter',
  'Jatugriha': 'House of Lac (A palace made of flammable wax/lac to trap Pandavas)',
  'Agnatavasa': 'Incognito Living (Living in secret disguise for 1 year)',
  'Dyuta': 'Rigged Dice Gambling Game',
  'Chakravyuha': 'Circular Maze Battle Formation (Complex 7-layer trap)',
  'Swayamvara': 'Public Open Competition to win alliance',
  'Rajadharma': 'Duty and Ethics of Leadership / Governance',
  'Dharma': 'Moral Duty, Ethics, and Righteous Action',
  'Pashupatastra': 'Supreme Capability / Ultimate Weapon',
  'Duta': 'Diplomatic Ambassador / Envoy',
  'Mlechchha': 'Secret coded language used by Vidura',
  'Kshatriya': 'Warrior Leader / Strategic Executive',
  'Vyasa Sarovara': 'Hidden Lake / Crisis Bunker where Duryodhana hid'
};

// Regional Language UI Translations
const i18nTranslations = {
  en: {
    app_title: "Mahabharata Strategic Advisor",
    version_tag: "V8 Decision Engine",
    app_subtitle: "Ancient Epic Wisdom for Modern Business & Leadership Decisions",
    lang_label: "Language:",
    glossary_btn: "Sanskrit Word Meanings",
    tab_advisor: "Ask Advisor",
    tab_archive: "All 50 Stories",
    tab_playbooks: "Playbooks",
    tab_how_it_works: "How It Works",
    ticker_cases: "<strong class=\"text-white\">50</strong> Verified Source Cases",
    ticker_parvas: "<strong class=\"text-white\">18</strong> Parvas (Chapters)",
    ticker_dimensions: "<strong class=\"text-white\">23</strong> Strategic Dimensions",
    ticker_strategists: "<strong class=\"text-white\">52</strong> Epic Strategists",
    ticker_neural_search: "Multi-View Neural Embedding Vector Search Active",
    backdrop_label: "Live Action Backdrop:",
    scene_chariot: "Kurukshetra Moving Chariot",
    scene_council: "Hastinapura Strategic Council",
    pipeline_title: "Live Decision Pipeline",
    pipeline_status_ready: "Status: Ready for query",
    stage_label_1: "STAGE 1",
    stage_label_2: "STAGE 2",
    stage_label_3: "STAGE 3",
    stage_label_4: "STAGE 4",
    stage_label_5: "STAGE 5",
    pipeline_stage_1: "1. PROBLEM",
    pipeline_stage_2: "2. EMBEDDINGS",
    pipeline_stage_3: "3. RETRIEVAL",
    pipeline_stage_4: "4. RERANKING",
    pipeline_stage_5: "5. STRATEGY",
    voice_btn: "Voice Mode (Speak Problem)",
    voice_listening: "Listening... Speak your problem in selected language",
    voice_done: "Done Speaking →",
    hero_badge: "Timeless Kshatriya (Warrior Leader) Strategy System",
    hero_title_1: "Solve Modern Challenges with",
    hero_title_2: "Mahabharata Decision Wisdom",
    hero_desc: "Type your current business, team, or leadership problem. Our system searches through 50 verified Mahabharata strategic stories to give you the exact ancient tactics, outcomes, and simple action steps for today.",
    input_label: "Type your problem in simple words:",
    show_label: "Show:",
    clear_btn: "Clear",
    presets_title: "Click any example situation to test:",
    preset_1: "Secret Enemy Sabotage (House of Lac)",
    preset_2: "Beating a Giant Competitor (Jarasandha)",
    preset_3: "Avoiding Rigged Game Traps (Dice Game)",
    preset_4: "Working in Secret Disguise (Agnatavasa)",
    preset_5: "Peace Talks & Deterrence (Krishna's Embassy)",
    btn_submit: "Find Mahabharata Lessons",
    loading_title: "Finding the Closest Mahabharata Stories...",
    loading_subtitle: "Matching problem details and ranking practical actions...",
    archive_title: "All 50 Mahabharata Strategic Stories",
    archive_subtitle: "Browse every historical episode, character, decision, and its simple modern business meaning.",
    playbook_title: "4 Master Playbooks of Strategy",
    playbook_desc: "All 50 stories group into 4 easy-to-understand leadership guides: Emergency Defense, Team Partnerships, Avoiding Rigged Traps, and Good Governance.",
    pillar_1_title: "1. Crisis Management & Secret Survival",
    pillar_1_sub: "How to survive dangerous attacks and backstabbing",
    pillar_1_desc: "Learn how Vidura and the Pandavas kept a calm outside appearance while secretly building an underground escape tunnel (House of Lac), and how to protect your team during surprise attacks.",
    pillar_2_title: "2. Partnerships & Power Alliances",
    pillar_2_sub: "Win strong allies with top skills and smart diplomacy",
    pillar_2_desc: "Showing pure skill makes powerful partners come to you (Arjuna winning Panchala alliance), acquiring unbeatable tools, and sending wise ambassadors before entering conflict.",
    pillar_3_title: "3. Avoiding Rigged Systems & Bad Gambles",
    pillar_3_sub: "Don't play games where the opponent controls the rules",
    pillar_3_desc: "Yudhishthira lost his whole kingdom by playing Shakuni's loaded dice game. Never gamble inside a system controlled by rivals, and avoid throwing good money after bad (sunk cost fallacy).",
    pillar_4_title: "4. Fair Governance & Clean Handover",
    pillar_4_sub: "Rebuilding organizations and stepping down honorably",
    pillar_4_desc: "Bhishma teaching Rajadharma (Duty of Leaders) on his bed of arrows, fixing broken company culture after a crisis, and planning smooth leadership handovers.",
    how_it_works_title: "How the V8 Multi-View Matching Engine Works in Simple Words",
    how_it_works_desc: "When you enter a problem, the AI acts as an intelligent librarian in two quick steps.",
    step_1_title: "Step 1: Broad Search (Top 10 Candidates)",
    step_1_desc: "The AI turns your sentence into a numerical meaning vector. It instantly scans all 50 Mahabharata stories and picks the 10 closest candidate stories.",
    step_2_title: "Step 2: Deep Field Reranker (Top 3 Finalists)",
    step_2_desc: "The AI compares your query across modern problem match, ancient challenge match, core insight, category, and overall story to pick the best lessons."
  },
  hi: {
    app_title: "महाभारत रणनीतिक सलाहकार",
    version_tag: "V8 निर्णय प्रणाली",
    app_subtitle: "आधुनिक व्यापार और नेतृत्व समस्याओं के लिए महाभारत की अमर सीख",
    lang_label: "भाषा:",
    glossary_btn: "संस्कृत शब्दों के सरल अर्थ",
    tab_advisor: "सलाहकार से पूछें",
    tab_archive: "सभी 50 प्रसंग",
    tab_playbooks: "रणनीति मार्गदर्शिका",
    tab_how_it_works: "यह कैसे काम करता है",
    ticker_cases: "<strong class=\"text-white\">50</strong> प्रमाणित ऐतिहासिक प्रसंग",
    ticker_parvas: "<strong class=\"text-white\">18</strong> पर्व (अध्याय)",
    ticker_dimensions: "<strong class=\"text-white\">23</strong> रणनीतिक आयाम",
    ticker_strategists: "<strong class=\"text-white\">52</strong> प्रमुख रणनीतिकार",
    ticker_neural_search: "मल्टी-व्यू न्यूरल वेक्टर सर्च सक्रिय",
    backdrop_label: "लाइव एक्शन दृश्य पृष्ठभूमि:",
    scene_chariot: "कुरुक्षेत्र का गतिमान रथ",
    scene_council: "हस्तिनापुर की रणनीतिक सभा",
    pipeline_title: "लाइव निर्णय प्रक्रिया पाइपलाइन",
    pipeline_status_ready: "स्थिति: प्रश्न के लिए तैयार",
    stage_label_1: "चरण 1",
    stage_label_2: "चरण 2",
    stage_label_3: "चरण 3",
    stage_label_4: "चरण 4",
    stage_label_5: "चरण 5",
    pipeline_stage_1: "1. समस्या",
    pipeline_stage_2: "2. एम्बेडिंग्स",
    pipeline_stage_3: "3. पुनःप्राप्ति",
    pipeline_stage_4: "4. पुनर्रैंकिंग",
    pipeline_stage_5: "5. अंतिम सीख",
    voice_btn: "वॉइस मोड (बोलकर बताएं)",
    voice_listening: "सुन रहे हैं... अपनी भाषा में समस्या बोलें",
    voice_done: "बोलना पूरा हुआ →",
    hero_badge: "कालजयी क्षत्रिय रणनीति प्रणाली",
    hero_title_1: "अपनी आधुनिक समस्याओं का हल पाएं",
    hero_title_2: "महाभारत के सटीक निर्णयों से",
    hero_desc: "अपनी व्यापार, टीम या नेतृत्व की समस्या सरल शब्दों में लिखें। यह प्रणाली महाभारत की 50 प्रमाणित घटनाओं में से सबसे उपयुक्त प्राचीन रणनीति और आज के व्यावहारिक कदम सुझाती है।",
    input_label: "अपनी समस्या सरल शब्दों में लिखें:",
    show_label: "दिखाएं:",
    clear_btn: "हटाएं",
    presets_title: "परीक्षण के लिए किसी भी उदाहरण पर क्लिक करें:",
    preset_1: "गुप्त शत्रु षड्यंत्र (लाक्षागृह प्रसंग)",
    preset_2: "विशाल प्रतिद्वंद्वी को हराना (जरासंध वध)",
    preset_3: "छलकपट वाले खेल से बचना (द्यूत सभा)",
    preset_4: "गुप्त भेष में कार्य करना (अज्ञातवास)",
    preset_5: "शांति वार्ता और कूटनीति (कृष्ण दूत)",
    btn_submit: "महाभारत की सीख खोजें",
    loading_title: "महाभारत के सबसे नजदीकी प्रसंग खोजे जा रहे हैं...",
    loading_subtitle: "समस्या का मिलान और व्यावहारिक कदम तैयार किए जा रहे हैं...",
    archive_title: "महाभारत के सभी 50 रणनीतिक प्रसंग",
    archive_subtitle: "सभी ऐतिहासिक घटनाओं, पात्रों, निर्णयों और उनके आधुनिक अर्थों को देखें।",
    playbook_title: "रणनीति के 4 मुख्य स्तंभ",
    playbook_desc: "सभी 50 कहानियां 4 सरल नेतृत्व पुस्तिकाओं में विभाजित हैं: संकट बचाव, गठबंधन, छलकपट से बचाव, और सुशासन।",
    pillar_1_title: "1. संकट प्रबंधन और गुप्त बचाव",
    pillar_1_sub: "खतरनाक हमलों और धोखे से कैसे बचें",
    pillar_1_desc: "विदुर और पांडवों ने लाक्षागृह में बाहर से शांति दिखाते हुए गुप्त सुरंग बनाई। जानें संकट में टीम को कैसे बचाएं।",
    pillar_2_title: "2. साझेदारी और शक्तिशाली गठबंधन",
    pillar_2_sub: "उत्कृष्ट कौशल से मजबूत सहयोगी बनाएं",
    pillar_2_desc: "अपनी क्षमता साबित करने से बड़े सहयोगी खुद जुड़ते हैं (द्रौपदी स्वयंवर), अजेय अस्त्र जुटाएं और युद्ध से पहले दूत भेजें।",
    pillar_3_title: "3. पक्षपाती प्रणाली और जुए से बचाव",
    pillar_3_sub: "उस खेल में न उतरें जिसके नियम शत्रु तय करता है",
    pillar_3_desc: "शकुनि के कपटी पांसों से युधिष्ठिर सब हार गए। कभी भी प्रतिद्वंद्वी के नियंत्रण वाले खेल में बड़ा दांव न लगाएं।",
    pillar_4_title: "4. निष्पक्ष शासन और सुगम नेतृत्व हस्तांतरण",
    pillar_4_sub: "संस्थान का पुनर्निर्माण और गरिमापूर्ण उत्तराधिकार",
    pillar_4_desc: "भीष्म द्वारा शरशय्या पर राजधर्म का उपदेश, संकट के बाद संगठन को खड़ा करना और सम्मानपूर्वक पद छोड़ना।",
    how_it_works_title: "यह प्रणाली सरल शब्दों में कैसे काम करती है",
    how_it_works_desc: "जब आप अपनी समस्या दर्ज करते हैं, तो AI दो त्वरित चरणों में सर्वोत्तम सीख निकालता है।",
    step_1_title: "चरण 1: व्यापक खोज (शीर्ष 10 प्रसंग)",
    step_1_desc: "AI आपके वाक्य के अर्थ को समझकर सभी 50 महाभारत प्रसंगों में से 10 सबसे मिलते-जुलते प्रसंग चुनता है।",
    step_2_title: "चरण 2: सूक्ष्म मिलान (शीर्ष 3 सटीक सीखें)",
    step_2_desc: "AI चुनौती, आधुनिक समस्या, मुख्य सीख और श्रेणी का गहन विश्लेषण करके सर्वोत्तम 3 उपाय प्रस्तुत करता है।"
  },
  ta: {
    app_title: "மகாபாரத வியூக ஆலோசகர்",
    version_tag: "V8 முடிவு இயந்திரம்",
    app_subtitle: "நவீன வணிக மற்றும் தலைமை முடிவுகளுக்கான பண்டைய இதிகாச ஞானம்",
    lang_label: "மொழி:",
    glossary_btn: "சமஸ்கிருத சொற்களின் எளிய பொருள்",
    tab_advisor: "ஆலோசனை கேட்க",
    tab_archive: "50 கதைகளும்",
    tab_playbooks: "வியூக கையேடு",
    tab_how_it_works: "செயல்படும் முறை",
    ticker_cases: "<strong class=\"text-white\">50</strong> சரிபார்க்கப்பட்ட மூலக் கதைகள்",
    ticker_parvas: "<strong class=\"text-white\">18</strong> பர்வங்கள் (அத்தியாயங்கள்)",
    ticker_dimensions: "<strong class=\"text-white\">23</strong> வியூகப் பரிமாணங்கள்",
    ticker_strategists: "<strong class=\"text-white\">52</strong> இதிகாச வியூகவாதிகள்",
    ticker_neural_search: "மல்டி-வியூ நியூரல் வெக்டர் தேடல் செயலில் உள்ளது",
    backdrop_label: "நேரடி காட்சி பின்னணி:",
    scene_chariot: "குருக்ஷேத்திர ஓடும் தேர்",
    scene_council: "ஹஸ்தினாபுர வியூக சபை",
    pipeline_title: "நேரடி முடிவெடுக்கும் கட்டமைப்பு",
    pipeline_status_ready: "நிலை: உங்கள் கேள்விக்கு தயார்",
    stage_label_1: "நிலை 1",
    stage_label_2: "நிலை 2",
    stage_label_3: "நிலை 3",
    stage_label_4: "நிலை 4",
    stage_label_5: "நிலை 5",
    pipeline_stage_1: "1. பிரச்சனை",
    pipeline_stage_2: "2. எம்பெடிங்",
    pipeline_stage_3: "3. மீட்டெடுத்தல்",
    pipeline_stage_4: "4. மறுவரிசை",
    pipeline_stage_5: "5. வியூகம்",
    voice_btn: "குரல் வழி (பேசி உள்ளிடவும்)",
    voice_listening: "கேட்கிறது... உங்கள் பிரச்சனையை பேசவும்",
    voice_done: "பேசி முடிந்தது →",
    hero_badge: "காலத்தால் அழியாத க்ஷத்ரிய வியூக அமைப்பு",
    hero_title_1: "நவீன சவால்களுக்கு தீர்வு காணுங்கள்",
    hero_title_2: "மகாபாரத முடிவெடுக்கும் ஞானத்துடன்",
    hero_desc: "உங்கள் வணிகம், குழு அல்லது தலைமைப் பிரச்சனையை எளிய சொற்களில் தட்டச்சு செய்யவும். 50 சரிபார்க்கப்பட்ட மகாபாரத வியூகக் கதைகளில் இருந்து சிறந்த பண்டைய தந்திரங்களையும் இன்றைய நடைமுறை வழிகளையும் வழங்குகிறது.",
    input_label: "உங்கள் பிரச்சனையை எளிய சொற்களில் எழுதவும்:",
    show_label: "காட்டவும்:",
    clear_btn: "அழிக்க",
    presets_title: "சோதிக்க ஏதேனும் உதாரணத்தை கிளிக் செய்யவும்:",
    preset_1: "ரகசிய எதிரி சதி (அரக்கு மாளிகை தப்பல்)",
    preset_2: "பெரிய போட்டியாளரை வீழ்த்துதல் (ஜராசந்தன்)",
    preset_3: "சூதாட்ட பொறியை தவிர்த்தல் (சூதாட்ட சபை)",
    preset_4: "ரகசிய மாறுவேடத்தில் பணிபுரிதல் (அஞ்ஞாதவாசம்)",
    preset_5: "அமைதிப் பேச்சுவார்த்தை & ராஜதந்திரம் (கிருஷ்ண தூது)",
    btn_submit: "மகாபாரத பாடங்களை காண்க",
    loading_title: "பொருத்தமான மகாபாரத கதைகளை தேடுகிறது...",
    loading_subtitle: "பிரச்சனையை ஒப்பிட்டு நடைமுறை படிகளை வரிசைப்படுத்துகிறது...",
    archive_title: "அனைத்து 50 மகாபாரத வியூக கதைகள்",
    archive_subtitle: "வரலாற்று நிகழ்வுகள், கதாபாத்திரங்கள், முடிவுகள் மற்றும் நவீன வணிக விளக்கங்கள்.",
    playbook_title: "4 முக்கிய வியூக வழிகாட்டிகள்",
    playbook_desc: "அனைத்து 50 கதைகளும் 4 எளிய தலைமை கையேடுகளாக தொகுக்கப்பட்டுள்ளன: அவசர கால தற்காப்பு, கூட்டணி, சூழ்ச்சியிலிருந்து தப்புதல், மற்றும் சிறந்த ஆட்சி.",
    pillar_1_title: "1. நெருக்கடி மேலாண்மை & ரகசிய தற்காப்பு",
    pillar_1_sub: "துரோகம் மற்றும் ஆபத்தான தாக்குதல்களில் இருந்து தப்பிப்பது எப்படி",
    pillar_1_desc: "விதுரரும் பாண்டவர்களும் அரக்கு மாளிகையில் அமைதியாக இருந்து ரகசிய சுரங்கப் பாதை அமைத்த வியூகம்.",
    pillar_2_title: "2. கூட்டணிகள் & பலமான கூட்டாண்மை",
    pillar_2_sub: "திறமையால் பலமான கூட்டாளிகளை ஈர்க்கவும்",
    pillar_2_desc: "திறமையை வெளிப்படுத்துவதன் மூலம் வலிமையான கூட்டாளிகள் வருவார்கள் (திரௌபதி சுயம்வரம்).",
    pillar_3_title: "3. முறைகேடான பொறிகளை தவிர்த்தல்",
    pillar_3_sub: "எதிரி விதிகளை கட்டுப்படுத்தும் விளையாட்டில் இறங்காதீர்கள்",
    pillar_3_desc: "சகுனியின் சூதாட்டத்தில் யுதிஷ்டிரன் நாட்டை இழந்தார். ஒருபோதும் ஏமாற்று தளங்களில் பெரிய ஆபத்து எடுக்காதீர்கள்.",
    pillar_4_title: "4. நேர்மையான நிர்வாகம் & தலைமை மாற்றம்",
    pillar_4_sub: "நிறுவனத்தை புனரமைத்தல் மற்றும் தலைமைப் பொறுப்பை ஒப்படைத்தல்",
    pillar_4_desc: "பீஷ்மரின் ராஜதர்ம உபதேசம், நெருக்கடிக்கு பின் நிறுவனத்தை சரிசெய்தல்.",
    how_it_works_title: "இது எவ்வாறு எளிய முறையில் செயல்படுகிறது",
    how_it_works_desc: "உங்கள் கேள்வியை உள்ளிடும்போது, AI இரண்டு நிலைகளில் சிறந்த பாடங்களைத் தேர்ந்தெடுக்கிறது.",
    step_1_title: "நிலை 1: பரந்த தேடல் (முதல் 10 கதைகள்)",
    step_1_desc: "AI உங்கள் வாக்கியத்தின் பொருளைப் புரிந்து கொண்டு 50 கதைகளில் 10 பொருத்தமானவற்றை தேர்ந்தெடுக்கிறது.",
    step_2_title: "நிலை 2: ஆழமான மதிப்பீடு (சிறந்த 3 முடிவுகள்)",
    step_2_desc: "சவால், தற்காலப் பிரச்சனை, முக்கிய நுண்ணறிவு ஆகியவற்றின் அடிப்படையில் முதல் 3 ஆலோசனைகளை வழங்குகிறது."
  },
  te: {
    app_title: "మహాభారత వ్యూహాత్మక సలహాదారు",
    version_tag: "V8 నిర్ణయ వ్యవస్థ",
    app_subtitle: "ఆధునిక వ్యాపార మరియు నాయకత్వ నిర్ణయాలకు పురాతన మహాభారత వివేకం",
    lang_label: "భాష:",
    glossary_btn: "సంస్కృత పదాల సరళ అర్థాలు",
    tab_advisor: "సలహా అడగండి",
    tab_archive: "అన్ని 50 కథలు",
    tab_playbooks: "వ్యూహాలు",
    tab_how_it_works: "ఇది ఎలా పనిచేస్తుంది",
    hero_badge: "కాలాతీత క్షత్రియ వ్యూహ వ్యవస్థ",
    hero_title_1: "ఆధునిక సమస్యలకు పరిష్కారాలు",
    hero_title_2: "మహాభారత నిర్ణయ వివేకంతో",
    hero_desc: "మీ వ్యాపార లేదా నాయకత్వ సమస్యను సులభమైన మాటల్లో రాయండి. 50 మహాభారత వ్యూహాత్మక కథల నుండి సరైన పురాతన వ్యూహం మరియు ఆధునిక ఆచరణాత్మక పరిష్కారాలు లభిస్తాయి.",
    input_label: "మీ సమస్యను సులభమైన పదాలలో రాయండి:",
    show_label: "చూపించు:",
    clear_btn: "క్లియర్",
    presets_title: "పరీక్షించడానికి ఏదైనా ఉదాహరణపై క్లిక్ చేయండి:",
    preset_1: "రహస్య శత్రు కుట్ర (లాక్షాగృహం నుండి తప్పించుకోవడం)",
    preset_2: "పెద్ద పోటీదారుని ఓడించడం (జరాసంధ వధ)",
    preset_3: "మోసపూరిత జూదం నుండి రక్షణ (ద్యూత సభ)",
    preset_4: "రహస్య వేషంలో పనిచేయడం (అజ్ఞాతవాసం)",
    preset_5: "శాంతి చర్చలు & రాయబారం (కృష్ణ రాయబారం)",
    btn_submit: "మహాభారత పాఠాలు వెతకండి",
    loading_title: "సరిపోయే మహాభారత కథలను వెతుకుతోంది...",
    loading_subtitle: "సమస్య వివరాలను పోల్చి ఉత్తమ వ్యూహాలను సిద్ధం చేస్తోంది...",
    archive_title: "అన్ని 50 మహాభారత వ్యూహాత్మక కథలు",
    archive_subtitle: "చారిత్రక సంఘటనలు, పాత్రలు, నిర్ణయాలు మరియు వాటి ఆధునిక వ్యాపార అర్థాలు.",
    playbook_title: "4 ప్రధాన వ్యూహాత్మక మార్గదర్శకాలు",
    playbook_desc: "అన్ని 50 కథలు 4 నాయకత్వ మార్గదర్శకాలుగా విభజించబడ్డాయి: సంక్షోభ రక్షణ, కూటములు, మోసాల నుండి రక్షణ, మరియు మంచి పాలన.",
    pillar_1_title: "1. సంక్షోభ నిర్వహణ & రహస్య రక్షణ",
    pillar_1_sub: "ప్రమాదకరమైన దాడుల నుండి ఎలా బయటపడాలి",
    pillar_1_desc: "విదురుడు మరియు పాండవులు లాక్షాగృహంలో రహస్య సొరంగం ద్వారా తప్పించుకున్న వ్యూహం.",
    pillar_2_title: "2. భాగస్వామ్యాలు & బలమైన కూటములు",
    pillar_2_sub: "నైపుణ్యంతో బలమైన మిత్రులను ఆకర్షించండి",
    pillar_2_desc: "సామర్థ్యాన్ని ప్రదర్శించడం ద్వారా బలమైన మిత్రులు లభిస్తారు (ద్రౌపది స్వయంవరం).",
    pillar_3_title: "3. పక్షపాత వ్యవస్థలు & జూదం నివారణ",
    pillar_3_sub: "శత్రువు నియంత్రించే ఆటలో దిగవద్దు",
    pillar_3_desc: "శకుని కపట పాచికలతో యుధిష్ఠిరుడు సర్వం కోల్పోయాడు. నియమాలు మోసపూరితంగా ఉన్నప్పుడు పెద్ద పందెం వేయవద్దు.",
    pillar_4_title: "4. న్యాయమైన పాలన & నాయకత్వ మార్పు",
    pillar_4_sub: "సంస్థల పునర్నిర్మాణం మరియు గౌరవప్రదమైన పదవీ విరమణ",
    pillar_4_desc: "భీష్ముడి రాజధర్మ ఉపదేశం, సంక్షోభం తర్వాత సంస్థను నిలబెట్టడం.",
    how_it_works_title: "ఇది సరళంగా ఎలా పనిచేస్తుంది",
    how_it_works_desc: "మీ సమస్యను ఇచ్చినప్పుడు AI రెండు శీఘ్ర దశల్లో ఉత్తమ పరిష్కారాన్ని అందిస్తుంది.",
    step_1_title: "దశ 1: విస్తృత శోధన (టాప్ 10 కథలు)",
    step_1_desc: "AI మీ వాక్య అర్థాన్ని విశ్లేషించి 50 కథలలో 10 దగ్గరి కథలను ఎంచుకుంటుంది.",
    step_2_title: "దశ 2: లోతైన విశ్లేషణ (టాప్ 3 ఉత్తమ నిర్ణయాలు)",
    step_2_desc: "ఆధునిక సమస్య, పురాతన సవాలు మరియు కీలక సూత్రాల ఆధారంగా ఉత్తమ 3 పరిష్కారాలను ఇస్తుంది."
  },
  kn: {
    app_title: "ಮಹಾಭಾರತ ವ್ಯೂಹಾತ್ಮಕ ಸಲಹೆಗಾರ",
    version_tag: "V8 ನಿರ್ಧಾರ ಎಂಜಿನ್",
    app_subtitle: "ಆಧುನಿಕ ವ್ಯಾಪಾರ ಮತ್ತು ನಾಯಕತ್ವ ನಿರ್ಧಾರಗಳಿಗೆ ಮಹಾಭಾರತದ ಕಾಲಾತೀತ ಜ್ಞಾನ",
    lang_label: "ಭಾಷೆ:",
    glossary_btn: "ಸಂಸ್ಕೃತ ಪದಗಳ ಸರಳ ಅರ್ಥಗಳು",
    tab_advisor: "ಸಲಹೆ ಕೇಳಿ",
    tab_archive: "ಎಲ್ಲಾ 50 ಕಥೆಗಳು",
    tab_playbooks: "ವ್ಯೂಹಗಳು",
    tab_how_it_works: "ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    hero_badge: "ಕ್ಷತ್ರಿಯ ವ್ಯೂಹ ತತ್ವಗಳು",
    hero_title_1: "ಆಧುನಿಕ ಸವಾಲುಗಳಿಗೆ ಪರಿಹಾರ ಕಂಡುಕೊಳ್ಳಿ",
    hero_title_2: "ಮಹಾಭಾರತದ ನಿರ್ಧಾರ ಜ್ಞಾನದೊಂದಿಗೆ",
    hero_desc: "ನಿಮ್ಮ ವ್ಯಾಪಾರ ಅಥವಾ ನಾಯಕತ್ವದ ಸಮಸ್ಯೆಯನ್ನು ಸರಳ ಪದಗಳಲ್ಲಿ ಬರೆಯಿರಿ. 50 ಮಹಾಭಾರತ ಕಥೆಗಳಿಂದ ಸೂಕ್ತವಾದ ಪುರಾತನ ತಂತ್ರ ಮತ್ತು ಇಂದಿನ ಪ್ರಾಯೋಗಿಕ ಕ್ರಮಗಳನ್ನು ಪಡೆಯಿರಿ.",
    input_label: "ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಸರಳ ಪದಗಳಲ್ಲಿ ಬರೆಯಿರಿ:",
    show_label: "ತೋರಿಸಿ:",
    clear_btn: "ಅಳಿಸಿ",
    presets_title: "ಪರೀಕ್ಷಿಸಲು ಯಾವುದೇ ಉದಾಹರಣೆ ಕ್ಲಿಕ್ ಮಾಡಿ:",
    preset_1: "ಗುಪ್ತ ಶತ್ರು ಸಂಚು (ಅರಗಿನ ಮನೆ ಪಾರು)",
    preset_2: "ದೊಡ್ಡ ಪ್ರತಿಸ್ಪರ್ಧಿಯನ್ನು ಸೋಲಿಸುವುದು (ಜರಾಸಂಧ)",
    preset_3: "ಮೋಸದ ಜೂಜಿನಿಂದ ಪಾರಾಗುವುದು (ದ್ಯೂತ ಸಭೆ)",
    preset_4: "ಗುಪ್ತ ವೇಷದಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವುದು (ಅಜ್ಞಾತವಾಸ)",
    preset_5: "ಶಾಂತಿ ಮಾತುಕತೆ & ರಾಯಭಾರ (ಕೃಷ್ಣ ರಾಯಭಾರ)",
    btn_submit: "ಮಹಾಭಾರತ ಪಾಠಗಳನ್ನು ಹುಡುಕಿ",
    loading_title: "ಹತ್ತಿರದ ಮಹಾಭಾರತ ಕಥೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    loading_subtitle: "ಸಮಸ್ಯೆಯನ್ನು ಹೋಲಿಸಿ ಪ್ರಾಯೋಗಿಕ ಕ್ರಮಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
    archive_title: "ಎಲ್ಲಾ 50 ಮಹಾಭಾರತ ವ್ಯೂಹಾತ್ಮಕ ಕಥೆಗಳು",
    archive_subtitle: "ಐತಿಹಾಸಿಕ ಘಟನೆಗಳು, ಪಾತ್ರಗಳು ಮತ್ತು ಅವುಗಳ ಆಧುನಿಕ ವ್ಯಾಪಾರ ಅರ್ಥಗಳು.",
    playbook_title: "4 ಮುಖ್ಯ ವ್ಯೂಹ ಮಾರ್ಗದರ್ಶಿಗಳು",
    playbook_desc: "ಎಲ್ಲಾ 50 ಕಥೆಗಳು 4 ಸುಲಭ ನಾಯಕತ್ವ ಮಾರ್ಗದರ್ಶಿಗಳಾಗಿವೆ: ಬಿಕ್ಕಟ್ಟು ರಕ್ಷಣೆ, ಒಕ್ಕೂಟಗಳು, ಮೋಸದಿಂದ ಪಾರು, ಮತ್ತು ಉತ್ತಮ ಆಡಳಿತ.",
    pillar_1_title: "1. ಬಿಕ್ಕಟ್ಟು ನಿರ್ವಹಣೆ & ರಹಸ್ಯ ರಕ್ಷಣೆ",
    pillar_1_sub: "ಅಪಾಯಕಾರಿ ಆಕ್ರಮಣ ಮತ್ತು ದ್ರೋಹದಿಂದ ಪಾರಾಗುವುದು ಹೇಗೆ",
    pillar_1_desc: "ವಿದುರ ಮತ್ತು ಪಾಂಡವರು ಅರಗಿನ ಮನೆಯಲ್ಲಿ ರಹಸ್ಯ ಸುರಂಗ ನಿರ್ಮಿಸಿ ಪಾರಾದ ಕಥೆ.",
    pillar_2_title: "2. ಪಾಲುದಾರಿಕೆಗಳು & ಬಲವಾದ ಒಕ್ಕೂಟಗಳು",
    pillar_2_sub: "ಕೌಶಲ್ಯದಿಂದ ಬಲಿಷ್ಠ ಮಿತ್ರರನ್ನು ಸೆಳೆಯಿರಿ",
    pillar_2_desc: "ಸಾಮರ್ಥ್ಯ ಪ್ರದರ್ಶನದಿಂದ ಶಕ್ತಿಶಾಲಿ ಮಿತ್ರರು ದೊರೆಯುತ್ತಾರೆ (ದ್ರೌಪದಿ ಸ್ವಯಂವರ).",
    pillar_3_title: "3. ಮೋಸದ ನಿಯಮಗಳ ಆಟಗಳಿಂದ ದೂರವಿರಿ",
    pillar_3_sub: "ಶತ್ರು ನಿಯಂತ್ರಿಸುವ ಆಟದಲ್ಲಿ ಇಳಿಯಬೇಡಿ",
    pillar_3_desc: "ಶಕುನಿಯ ಕಪಟ ದಾಳಗಳಿಂದ ಯುಧಿಷ್ಠಿರ ಎಲ್ಲವನ್ನೂ ಕಳೆದುಕೊಂಡ. ನಿಯಮಗಳು ಮೋಸವಾಗಿದ್ದಾಗ ದೊಡ್ಡ ರಿಸ್ಕ್ ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ.",
    pillar_4_title: "4. ನ್ಯಾಯಯುತ ಆಡಳಿತ & ನಾಯಕತ್ವ ವರ್ಗಾವಣೆ",
    pillar_4_sub: "ಸಂಸ್ಥೆಯ ಪುನರ್ನಿರ್ಮಾಣ ಮತ್ತು ಸುಗಮ ನಾಯಕತ್ವ ಹಸ್ತಾಂತರ",
    pillar_4_desc: "ಭೀಷ್ಮರ ರಾಜಧರ್ಮ ಉಪದೇಶ ಮತ್ತು ನಾಯಕತ್ವ ನಿವೃತ್ತಿ ಯೋಜನೆ.",
    how_it_works_title: "ಇದು ಸರಳವಾಗಿ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    how_it_works_desc: "ನೀವು ಪ್ರಶ್ನೆ ನಮೂದಿಸಿದಾಗ AI ಎರಡು ಹಂತಗಳಲ್ಲಿ ಉತ್ತಮ ಪರಿಹಾರಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡುತ್ತದೆ.",
    step_1_title: "ಹಂತ 1: ಸಾಮಾನ್ಯ ಶೋಧನೆ (ಟಾಪ್ 10 ಕಥೆಗಳು)",
    step_1_desc: "AI ನಿಮ್ಮ ವಾಕ್ಯದ ಅರ್ಥವನ್ನು ಗ್ರಹಿಸಿ 50 ಕಥೆಗಳಲ್ಲಿ 10 ಸಮೀಪದ ಕಥೆಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡುತ್ತದೆ.",
    step_2_title: "ಹಂತ 2: ಆಳವಾದ ಮೌಲ್ಯಮಾಪನ (ಟಾಪ್ 3 ಅತ್ಯುತ್ತಮ ಪಾಠಗಳು)",
    step_2_desc: "ಸಮಸ್ಯೆ ಮತ್ತು ಸೂತ್ರಗಳ ಆಧಾರದ ಮೇಲೆ ಅತ್ಯುತ್ತಮ 3 ಕಾರ್ಯತಂತ್ರಗಳನ್ನು ನೀಡುತ್ತದೆ."
  },
  ml: {
    app_title: "മഹാഭാരത തന്ത്രോപദേശകൻ",
    version_tag: "V8 ഡിസിഷൻ എഞ്ചിൻ",
    app_subtitle: "ആധുനിക ബിസിനസ്സ്, നേതൃത്വ തീരുമാനങ്ങൾക്കുള്ള മഹാഭാരത വിവേകം",
    lang_label: "ഭാഷ:",
    glossary_btn: "സംസ്കൃത പദങ്ങളുടെ ലളിതമായ അർത്ഥം",
    tab_advisor: "ഉപദേശം ചോദിക്കുക",
    tab_archive: "എല്ലാ 50 കഥകളും",
    tab_playbooks: "തന്ത്രങ്ങൾ",
    tab_how_it_works: "പ്രവർത്തന രീതി",
    hero_badge: "ക്ഷത്രിയ യുദ്ധതന്ത്ര തത്ത്വങ്ങൾ",
    hero_title_1: "ആധുനിക പ്രതിസന്ധികൾക്ക് പരിഹാരം കാണുക",
    hero_title_2: "മഹാഭാരത തീരുമാന വിവേകത്തിലൂടെ",
    hero_desc: "നിങ്ങളുടെ ബിസിനസ്സ് അല്ലെങ്കിൽ നേതൃത്വ പ്രശ്നം ലളിതമായ വാക്കുകളിൽ എഴുതുക. 50 മഹാഭാരത കഥകളിൽ നിന്ന് കൃത്യമായ പുരാതന തന്ത്രങ്ങളും ഇന്നത്തെ പ്രായോഗിക പരിഹാരങ്ങളും ലഭിക്കുന്നു.",
    input_label: "നിങ്ങളുടെ പ്രശ്നം ലളിതമായി എഴുതുക:",
    show_label: "കാണിക്കുക:",
    clear_btn: "മായ്ക്കുക",
    presets_title: "പരിശോധിക്കാൻ ഒരു ഉദാഹരണം ക്ലിക്ക് ചെയ്യുക:",
    preset_1: "ശത്രുവിന്റെ രഹസ്യ ചതി (അരക്കില്ലത്തിൽ നിന്നുള്ള രക്ഷപ്പെടൽ)",
    preset_2: "വൻകിട എതിരാളിയെ പരാജയപ്പെടുത്തൽ (ജരാസന്ധ വധം)",
    preset_3: "ചതി നിറഞ്ഞ ചൂതാട്ടം ഒഴിവാക്കൽ (ദ്യൂത സഭ)",
    preset_4: "രഹസ്യ വേഷത്തിൽ പ്രവർത്തിക്കൽ (അജ്ഞാതവാസം)",
    preset_5: "സമാധാന ചർച്ചകളും നയതന്ത്രവും (കൃഷ്ണ ദൂത്)",
    btn_submit: "മഹാഭാരത പാഠങ്ങൾ കണ്ടെത്തുക",
    loading_title: "അനുയോജ്യമായ മഹാഭാരത കഥകൾ തിരയുന്നു...",
    loading_subtitle: "വിശകലനം ചെയ്ത് പ്രായോഗിക തന്ത്രങ്ങൾ തയ്യാറാക്കുന്നു...",
    archive_title: "എല്ലാ 50 മഹാഭാരത തന്ത്രപ്രധാന കഥകൾ",
    archive_subtitle: "ചരിത്ര സംഭവങ്ങൾ, കഥാപാത്രങ്ങൾ, തീരുമാനങ്ങൾ, ആധുനിക ബിസിനസ്സ് അർത്ഥങ്ങൾ.",
    playbook_title: "4 പ്രധാന തന്ത്ര ഗൈഡുകൾ",
    playbook_desc: "എല്ലാ 50 കഥകളും 4 നേതൃത്വ ഗൈഡുകളായി തിരിച്ചിരിക്കുന്നു: പ്രതിസന്ധി പ്രതിരോധം, സഖ്യങ്ങൾ, ചതി ഒഴിവാക്കൽ, സദ്ഭരണം.",
    pillar_1_title: "1. പ്രതിസന്ധി പരിപാലനം & രഹസ്യ അതിജീവനം",
    pillar_1_sub: "അപകടകരമായ ആക്രമണങ്ങളിൽ നിന്നും ചതിയിൽ നിന്നും എങ്ങനെ രക്ഷപ്പെടാം",
    pillar_1_desc: "വിദുരരും പാണ്ഡവരും അരക്കില്ലത്തിൽ രഹസ്യ തുരങ്കം വഴി രക്ഷപ്പെട്ട തന്ത്രം.",
    pillar_2_title: "2. പങ്കാളിത്തങ്ങളും ശക്തമായ സഖ്യങ്ങളും",
    pillar_2_sub: "മികച്ച കഴിവുകളാൽ ശക്തരായ പങ്കാളികളെ നേടുക",
    pillar_2_desc: "കഴിവ് പ്രകടിപ്പിക്കുന്നതിലൂടെ ശക്തരായ സഖ്യകക്ഷികൾ ലഭിക്കുന്നു (ദ്രൗപദി സ്വയംവരം).",
    pillar_3_title: "3. ചതി നിറഞ്ഞ ഗെയിമുകൾ ഒഴിവാക്കുക",
    pillar_3_sub: "എതിരാളി നിയന്ത്രിക്കുന്ന കളിയിൽ ഏർപ്പെടരുത്",
    pillar_3_desc: "ശകുനിയുടെ കള്ളച്ചൂതിൽ യുധിഷ്ഠിരന് എല്ലാം നഷ്ടപ്പെട്ടു. നിയമങ്ങൾ ചതിയാണെങ്കിൽ വലിയ റിസ്ക് എടുക്കരുത്.",
    pillar_4_title: "4. നീതിപൂർവ്വമായ ഭരണവും നേതൃത്വ കൈമാറ്റവും",
    pillar_4_sub: "സ്ഥാപനങ്ങളുടെ പുനർനിർമ്മാണവും അന്തസ്സോടെയുള്ള സ്ഥാനമൊഴിയലും",
    pillar_4_desc: "ഭീഷ്മരുടെ രാജധർമ്മ ഉപദേശം, പ്രതിസന്ധിക്ക് ശേഷം സംഘടനയെ പുനർനിർമ്മിക്കൽ.",
    how_it_works_title: "ഇത് ലളിതമായി എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    how_it_works_desc: "നിങ്ങൾ പ്രശ്നം നൽകുമ്പോൾ AI രണ്ട് ലളിതമായ ഘട്ടങ്ങളിലൂടെ മികച്ച പാഠങ്ങൾ തിരഞ്ഞെടുക്കുന്നു.",
    step_1_title: "ഘട്ടം 1: വിപുലമായ തിരച്ചിൽ (ആദ്യ 10 കഥകൾ)",
    step_1_desc: "AI നിങ്ങളുടെ വാക്യത്തിന്റെ അർത്ഥം മനസ്സിലാക്കി 50 കഥകളിൽ നിന്ന് 10 എണ്ണം തിരഞ്ഞെടുക്കുന്നു.",
    step_2_title: "ഘട്ടം 2: ആഴത്തിലുള്ള വിശകലനം (മികച്ച 3 ഉപദേശങ്ങൾ)",
    step_2_desc: "പ്രശ്നത്തിന്റെ വിവിധ വശങ്ങൾ വിലയിരുത്തി മികച്ച 3 തന്ത്രങ്ങൾ നൽകുന്നു."
  },
  bn: {
    app_title: "মহাভারত কৌশলগত উপদেষ্টা",
    version_tag: "V8 সিদ্ধান্ত ইঞ্জিন",
    app_subtitle: "আধুনিক ব্যবসা এবং নেতৃত্ব সিদ্ধান্তের জন্য মহাভারতের কালজয়ী জ্ঞান",
    lang_label: "ভাষা:",
    glossary_btn: "সংস্কৃত শব্দের সহজ অর্থ",
    tab_advisor: "পরামর্শ নিন",
    tab_archive: "সব ৫০টি গল্প",
    tab_playbooks: "কৌশল নির্দেশিকা",
    tab_how_it_works: "কীভাবে কাজ করে",
    hero_badge: "কালজয়ী ক্ষত্রিয় রণকৌশল ব্যবস্থা",
    hero_title_1: "আধুনিক সমস্যার সমাধান খুঁজুন",
    hero_title_2: "মহাভারতের সিদ্ধান্ত জ্ঞানের মাধ্যমে",
    hero_desc: "আপনার ব্যবসা বা নেতৃত্বের সমস্যা সহজ কথায় লিখুন। ৫০টি মহাভারতের কৌশলগত ঘটনার থেকে সেরা প্রাচীন কৌশল এবং আধুনিক বাস্তবসম্মত পদক্ষেপ জেনে নিন।",
    input_label: "আপনার সমস্যা সহজ কথায় লিখুন:",
    show_label: "দেখান:",
    clear_btn: "মুছুন",
    presets_title: "পরীক্ষার জন্য যেকোনো উদাহরণে ক্লিক করুন:",
    preset_1: "গোপন শত্রুর ষড়যন্ত্র (জতুগৃহ থেকে পলায়ন)",
    preset_2: "বড় প্রতিপক্ষকে পরাস্ত করা (জরাসন্ধ বধ)",
    preset_3: "প্রতারণামূলক খেলা এড়ানো (দ্যূত সভা)",
    preset_4: "গোপন ছদ্মবেশে কাজ করা (অজ্ঞাতবাস)",
    preset_5: "শান্তি আলোচনা ও কূটনীতি (কৃষ্ণ দূত)",
    btn_submit: "মহাভারতের শিক্ষা খুঁজুন",
    loading_title: "নিকটতম মহাভারতের ঘটনা খোঁজা হচ্ছে...",
    loading_subtitle: "সমস্যার বিশ্লেষণ করে বাস্তব পদক্ষেপ সাজানো হচ্ছে...",
    archive_title: "মহাভারতের সব ৫০টি কৌশলগত গল্প",
    archive_subtitle: "ঐতিহাসিক ঘটনা, চরিত্র, সিদ্ধান্ত এবং তাদের আধুনিক বাণিজ্যিক অর্থ।",
    playbook_title: "কৌশলের ৪টি মূল নির্দেশিকা",
    playbook_desc: "সব ৫০টি গল্প ৪টি সহজ ভাগে বিভক্ত: সংকট থেকে আত্মরক্ষা, মিত্রজোট, প্রতারণা এড়ানো, এবং সুশাসন।",
    pillar_1_title: "১. সংকট ব্যবস্থাপনা ও গোপন আত্মরক্ষা",
    pillar_1_sub: "বিপজ্জনক আক্রমণ এবং বিশ্বাসঘাতকতা থেকে বাঁচার উপায়",
    pillar_1_desc: "বিদুর ও পাণ্ডবদের জতুগৃহে বাইরে শান্ত থেকে গোপনে সুড়ঙ্গ তৈরির কৌশল।",
    pillar_2_title: "২. অংশীদারিত্ব এবং শক্তিশালী জোট",
    pillar_2_sub: "দক্ষতার মাধ্যমে শক্তিশালী সহযোগী তৈরি করুন",
    pillar_2_desc: "উচ্চ দক্ষতা দেখালে শক্তিশালী মিত্ররা যুক্ত হয় (দ্রৌপদী স্বয়ংবর)।",
    pillar_3_title: "৩. পক্ষপাতদুষ্ট জালিয়াতি থেকে বাঁচা",
    pillar_3_sub: "যে খেলার নিয়ম শত্রু নিয়ন্ত্রণ করে তাতে নামবেন না",
    pillar_3_desc: "শকুনির কপট পাশা খেলায় যুধিষ্ঠির সব হারান। নিয়ন্ত্রিত প্লাটফর্মে অন্ধ ঝুঁকি নেবেন না।",
    pillar_4_title: "৪. সুশাসন এবং নেতৃত্ব হস্তান্তর",
    pillar_4_sub: "সংগঠনের পুনর্গঠন এবং মর্যাদাপূর্ণ নেতৃত্ব বদল",
    pillar_4_desc: "ভীষ্মের রাজধর্ম উপদেশ এবং সংকটের পর সংগঠন পুনর্নির্মাণ।",
    how_it_works_title: "এটি সহজ কথায় কীভাবে কাজ করে",
    how_it_works_desc: "আপনি প্রশ্ন লিখলে AI দুটি দ্রুত ধাপে সেরা শিক্ষা বেছে নেয়।",
    step_1_title: "ধাপ ১: সাধারণ অনুসন্ধান (শীর্ষ ১০টি গল্প)",
    step_1_desc: "AI আপনার বাক্যের অর্থ বুঝে ৫০টি গল্পের মধ্যে ১০টি সম্ভাব্য গল্প বেছে নেয়।",
    step_2_title: "ধাপ ২: গভীর মূল্যায়ন (সেরা ৩টি সমাধান)",
    step_2_desc: "সমস্যা এবং সূত্রের ভিত্তিতে সেরা ৩টি বাস্তব পদক্ষেপ প্রদান করে।"
  },
  mr: {
    app_title: "महाभारत रणनीतिक सल्लागार",
    version_tag: "V8 निर्णय प्रणाली",
    app_subtitle: "आधुनिक व्यवसाय आणि नेतृत्वाच्या निर्णयांसाठी महाभारताचे शाश्वत ज्ञान",
    lang_label: "भाषा:",
    glossary_btn: "संस्कृत शब्दांचे सोपे अर्थ",
    tab_advisor: "सल्ला विचारा",
    tab_archive: "सर्व ५० प्रसंग",
    tab_playbooks: "रणनीती",
    tab_how_it_works: "हे कसे कार्य करते",
    hero_badge: "कालजयी क्षत्रिय रणनीती प्रणाली",
    hero_title_1: "आधुनिक आव्हानांवर मात करा",
    hero_title_2: "महाभारताच्या निर्णय ज्ञानाने",
    hero_desc: "आपली व्यवसाय किंवा नेतृत्वाची समस्या सोप्या शब्दांत लिहा. ५० प्रमाणित महाभारत प्रसंगांतून अचूक प्राचीन डावपेच आणि आजचे व्यावहारिक उपाय मिळवा.",
    input_label: "आपली समस्या सोप्या शब्दांत लिहा:",
    show_label: "दाखवा:",
    clear_btn: "साफ करा",
    presets_title: "चाचणीसाठी कोणत्याही उदाहरणावर क्लिक करा:",
    preset_1: "गुप्त शत्रूचे कारस्थान (लाक्षागृह प्रसंग)",
    preset_2: "मोठ्या प्रतिस्पर्ध्याचा पराभव (जरासंध वध)",
    preset_3: "कपटी जुगारापासून सावध राहणे (द्यूत सभा)",
    preset_4: "गुप्त वेशात काम करणे (अज्ञातवास)",
    preset_5: "शांतता चर्चा आणि मुत्सद्देगिरी (कृष्ण शिष्टाई)",
    btn_submit: "महाभारताचे धडे शोधा",
    loading_title: "सर्वात जवळचे महाभारत प्रसंग शोधत आहे...",
    loading_subtitle: "समस्येची तुलना करून व्यावहारिक पावले तयार केली जात आहेत...",
    archive_title: "महाभारतातील सर्व ५० रणनीतिक प्रसंग",
    archive_subtitle: "ऐतिहासिक घटना, पात्रे, निर्णय आणि त्यांचे आधुनिक व्यावसायिक अर्थ.",
    playbook_title: "रणनीतीचे ४ मुख्य मार्गदर्शक",
    playbook_desc: "सर्व ५० प्रसंग ४ भागांत विभागले आहेत: संकट निवारण, युती, कपटापासून सावधगिरी आणि सुशासन.",
    pillar_1_title: "१. संकट व्यवस्थापन आणि गुप्त बचाव",
    pillar_1_sub: "धोकादायक हल्ल्यांमधून आणि फसवणुकीतून कसे बचाव करावे",
    pillar_1_desc: "विदुर आणि पांडवांनी लाक्षागृहात शांत राहून गुप्त भुयार तयार केले.",
    pillar_2_title: "२. भागीदारी आणि सामर्थ्यवान आघाड्या",
    pillar_2_sub: "कौशल्याने मजबूत मित्र आकर्षित करा",
    pillar_2_desc: "क्षमता दाखवल्याने मोठे भागीदार जोडले जातात (द्रौपदी स्वयंवर).",
    pillar_3_title: "३. कपटी खेळापासून लांब राहणे",
    pillar_3_sub: "ज्या खेळाचे नियम प्रतिस्पर्धी ठरवतो तिथे उतरू नका",
    pillar_3_desc: "शकुनीच्या कपटी पाश्यांमध्ये युधिष्ठिर सर्व हरले. फसव्या व्यवस्थेत मोठा धोका पत्करू नका.",
    pillar_4_title: "४. सुशासन आणि सन्माननीय पदमुक्ती",
    pillar_4_sub: "संस्थेची पुनर्बांधणी आणि नेतृत्व हस्तांतरण",
    pillar_4_desc: "भीष्मांचा राजधर्म उपदेश आणि संकटांनंतर संस्थेला पुन्हा उभे करणे.",
    how_it_works_title: "हे सोप्या भाषेत कसे कार्य करते",
    how_it_works_desc: "तुम्ही प्रश्न विचारल्यावर AI दोन टप्प्यांत सर्वोत्तम निर्णय सुचवते.",
    step_1_title: "टप्पा १: विस्तृत शोध (पहिले १० प्रसंग)",
    step_1_desc: "AI तुमच्या वाक्याचा अर्थ समजून ५० प्रसंगांपैकी १० जवळचे प्रसंग निवडते.",
    step_2_title: "टप्पा २: सखोल विश्लेषण (शीर्ष ३ अचूक उपाय)",
    step_2_desc: "समस्या, प्राचीन आव्हान आणि मुख्य शिकवण यावर आधारित ३ उत्तम उपाय देते."
  },
  gu: {
    app_title: "મહાભારત વ્યુહાત્મક સલાહકાર",
    version_tag: "V8 નિર્ણય પ્રણાલી",
    app_subtitle: "આધુનિક વ્યવસાય અને નેતૃત્વ નિર્ણયો માટે મહાભારતનું સનાતન જ્ઞાન",
    lang_label: "ભાષા:",
    glossary_btn: "સંસ્કૃત શબ્દોના સરળ અર્થ",
    tab_advisor: "સલાહ પૂછો",
    tab_archive: "તમામ ૫૦ પ્રસંગો",
    tab_playbooks: "વ્યૂહરચના",
    tab_how_it_works: "આ કેવી રીતે કાર્ય કરે છે",
    hero_badge: "સનાતન ક્ષત્રિય વ્યુહરચના સિસ્ટમ",
    hero_title_1: "આધુનિક પડકારોનો ઉકેલ મેળવો",
    hero_title_2: "મહાભારતના નિર્ણય જ્ઞાન સાથે",
    hero_desc: "તમારી વ્યવસાય અથવા નેતૃત્વની સમસ્યા સરળ શબ્દોમાં લખો. ૫૦ મહાભારત પ્રસંગોમાંથી શ્રેષ્ઠ પ્રાચીન વ્યૂહ અને આજના વ્યવહારુ પગલાં મેળવો.",
    input_label: "તમારી સમસ્યા સરળ શબ્દોમાં લખો:",
    show_label: "બતાવો:",
    clear_btn: "સાફ કરો",
    presets_title: "પરીક્ષણ માટે કોઈપણ ઉદાહરણ પર ક્લિક કરો:",
    preset_1: "ગુપ્ત શત્રુ ષડયંત્ર (લાક્ષાગૃહમાંથી બચાવ)",
    preset_2: "મોટા હરીફને હરાવવો (જરાસંધ વધ)",
    preset_3: "કપટી રમતથી બચવું (દ્યુત સભા)",
    preset_4: "ગુપ્ત વેશમાં કામ કરવું (અજ્ઞાતવાસ)",
    preset_5: "શાંતિ વાર્તા અને મુત્સદ્દીગીરી (કૃષ્ણ દૂત)",
    btn_submit: "મહાભારતના પાઠ શોધો",
    loading_title: "સૌથી નજીકના મહાભારત પ્રસંગો શોધાઈ રહ્યા છે...",
    loading_subtitle: "સમસ્યાની તુલના કરીને વ્યવહારુ પગલાં તૈયાર થઈ રહ્યા છે...",
    archive_title: "મહાભારતના તમામ ૫૦ વ્યુહાત્મક પ્રસંગો",
    archive_subtitle: "ઐતિહાસિક ઘટનાઓ, પાત્રો, નિર્ણયો અને તેમના આધુનિક વ્યવસાયિક અર્થો.",
    playbook_title: "વ્યૂહરચનાના ૪ મુખ્ય માર્ગદર્શક",
    playbook_desc: "તમામ ૫૦ વાર્તાઓ ૪ સરળ ભાગોમાં વહેંચાયેલી છે: સંકટ નિવારણ, જોડાણ, કપટથી બચાવ અને સુશાસન.",
    pillar_1_title: "૧. સંકટ સંચાલન અને ગુપ્ત બચાવ",
    pillar_1_sub: "જોખમી હુમલા અને છેતરપિંડીથી કેવી રીતે બચવું",
    pillar_1_desc: "વિદુર અને પાંડવોએ લાક્ષાગૃહમાં શાંત રહીને ગુપ્ત સુરંગ બનાવીને જીવ બચાવ્યો.",
    pillar_2_title: "૨. ભાગીદારી અને મજબૂત જોડાણ",
    pillar_2_sub: "કુશળતાથી શક્તિશાળી સાથીદારો આકર્ષિત કરો",
    pillar_2_desc: "ક્ષમતા દર્શાવવાથી મોટા ભાગીદારો જોડાય છે (દ્રૌપદી સ્વયંવર).",
    pillar_3_title: "૩. કપટી રમતો અને જુગારથી બચવું",
    pillar_3_sub: "જે રમતના નિયમો હરીફ નક્કી કરે તેમાં ન ઉતરો",
    pillar_3_desc: "શકુનિના કપટી પાસાઓથી યુધિષ્ઠિર સર્વસ્વ હારી ગયા. છેતરપિંડી વાળી વ્યવસ્થામાં મોટો દાવ ન લગાવો.",
    pillar_4_title: "૪. ન્યાયી શાસન અને નેતૃત્વ હસ્તાંતરણ",
    pillar_4_sub: "સંસ્થાનું પુનર્નિર્માણ અને ગૌરવપૂર્ણ પદત્યાગ",
    pillar_4_desc: "ભીષ્મનો રાજધર્મ ઉપદેશ અને સંકટ બાદ સંસ્થાને ફરી ઉભી કરવી.",
    how_it_works_title: "આ સરળ શબ્દોમાં કેવી રીતે કાર્ય કરે છે",
    how_it_works_desc: "તમે પ્રશ્ન દાખલ કરો ત્યારે AI બે ઝડપી પગલાંમાં શ્રેષ્ઠ શીખ પસંદ કરે છે.",
    step_1_title: "પગલું ૧: સામાન્ય શોધ (ટોચના ૧૦ પ્રસંગો)",
    step_1_desc: "AI તમારા વાક્યનો અર્થ સમજીને ૫૦ પ્રસંગોમાંથી ૧૦ નજીકના પ્રસંગો પસંદ કરે છે.",
    step_2_title: "પગલું ૨: ઊંડાણપૂર્વક વિશ્લેષણ (ટોચના ૩ શ્રેષ્ઠ ઉપાયો)",
    step_2_desc: "સમસ્યા અને પ્રાચીન પડકારના આધારે શ્રેષ્ઠ ૩ પગલાં સૂચવે છે."
  },
  sa: {
    app_title: "महाभारत-रणनीति-सल्लापकारः",
    version_tag: "V8 निर्णय-तन्त्रम्",
    app_subtitle: "आधुनिक-समस्यानां कृते महाभारतस्य शाश्वत-मार्गदर्शनम्",
    lang_label: "भाषा:",
    glossary_btn: "संस्कृत-शब्दानां सरलार्थाः",
    tab_advisor: "परामर्शं पृच्छतु",
    tab_archive: "पञ्चाशत् प्रकरणाणि",
    tab_playbooks: "नीति-ग्रन्थाः",
    tab_how_it_works: "कार्यविधिः",
    hero_badge: "कालजयी क्षत्रिय-व्यूहरचना-पद्धतिः",
    hero_title_1: "आधुनिक-आह्वानानां परिहारं लभध्वम्",
    hero_title_2: "महाभारतस्य निर्णय-प्रज्ञया",
    hero_desc: "भवतां व्यापार-नेतृत्व-समस्याः सरल-शब्देषु लिखन्तु। ५० प्रामाणिक-प्रकरणेभ्यः सर्वोत्तम-प्राचीन-रणनीतिं व्यावहारिक-पदानि च प्राप्नुवन्तु।",
    input_label: "भवतां समस्यां सरल-शब्देषु लिखन्तु:",
    show_label: "दृश्यताम्:",
    clear_btn: "मार्जतु",
    presets_title: "परीक्षणार्थम् उदाहरणं चिनुत:",
    preset_1: "गुप्त-शत्रु-षड्यन्त्रम् (लाक्षागृह-रक्षणम्)",
    preset_2: "महाप्रतिद्वन्द्वि-पराजयः (जरासन्ध-वधः)",
    preset_3: "कपट-द्यूत-परिहारः (द्यूत-सभा)",
    preset_4: "गुप्त-वेषेण कार्यसम्पादनम् (अज्ञातवासः)",
    preset_5: "शान्ति-सन्धानं कूटनीतिश्च (कृष्ण-दौत्यम्)",
    btn_submit: "महाभारत-शिक्षां अन्विष्यतु",
    loading_title: "महाभारत-प्रकरणानां अन्वेषणं क्रियते...",
    loading_subtitle: "समस्यायाः विश्लेषणं कृत्वा व्यावहारिक-उपायः सज्जीक्रियते...",
    archive_title: "महाभारतस्य सर्वाणि ५० रणनीतिक-प्रकरणाणि",
    archive_subtitle: "ऐतिहासिक-घटनाः, पात्राणि, निर्णयाः, तेषां आधुनिक-व्यापारार्थाश्च।",
    playbook_title: "रणनीतेः ४ मुख्य-स्तम्भाः",
    playbook_desc: "सर्वाणि ५० प्रकरणाणि ४ नेतृत्व-पुस्तिकासु विभक्तानि: आपद्धर्मः, सन्धिः, कपट-रक्षणम्, राजधर्मश्च।",
    pillar_1_title: "१. आपत्-प्रबन्धनं गुप्त-जीवन-रक्षा च",
    pillar_1_sub: "घातक-आक्रमणेभ्यः प्रतारणायाश्च रक्षणम्",
    pillar_1_desc: "विदुर-पाण्डवैः लाक्षागृहे शान्तिं प्रदर्श्य गुप्त-सुरङ्गा-निर्माणेनात्मरक्षा कृता।",
    pillar_2_title: "२. सहभागिता सामर्थ्यशाली-सन्धयश्च",
    pillar_2_sub: "कौशलेन शक्तिमन्तः मित्राणि सम्पादयन्तु",
    pillar_2_desc: "उत्कृष्ट-कौशल-प्रदर्शनेन शक्तिमन्तः मित्राणि आगच्छन्ति (द्रौपदी-स्वयंवरः)।",
    pillar_3_title: "३. कपट-क्रीडायाः पाश-निराकरणम्",
    pillar_3_sub: "यस्य नियमं शत्रुः नियन्त्रयति तत्र मा क्रीडतु",
    pillar_3_desc: "शकुनेः कपट-पाशकैः युधिष्ठिरः सर्वं हारितवान्। कपट-व्यूहे साहसं मा कुरुत।",
    pillar_4_title: "४. न्याय्य-शासनं नेतृत्व-हस्तान्तरणं च",
    pillar_4_sub: "संस्था-पुनर्निर्माणं गौरवेण पदत्यागश्च",
    pillar_4_desc: "भीष्मस्य शरतल्पे राजधर्मोपदेशः, सङ्कटानन्तरं संस्थायाः पुनर्निर्माणम्।",
    how_it_works_title: "एषा प्रणाली कथं कार्यं करोति",
    how_it_works_desc: "यदा भवान् प्रश्नं प्रविशति तदा AI द्वि-स्तरीय-पद्धत्या सर्वोत्तम-शिक्षां चिनोति।",
    step_1_title: "प्रथम-चरणम्: व्यापक-अन्वेषणम् (दश-प्रकरणाणि)",
    step_1_desc: "AI वाक्यस्य तात्पर्यं ज्ञात्वा ५० प्रकरणानां मध्ये १० समीपोपायं चिनोति।",
    step_2_title: "द्वितीय-चरणम्: सूक्ष्म-परीक्षणम् (शीर्ष-३ उपायाः)",
    step_2_desc: "समस्यायाः प्राचीन-आह्वानस्य च गभीर-विश्लेषणेन श्रेष्ठ-३ निर्णयान् ददाति।"
  },
  or: {
    app_title: "ମହାଭାରତ ରଣନୀତିକ ପରାମର୍ଶଦାତା",
    version_tag: "V8 ନିର୍ଣ୍ଣୟ ପ୍ରଣାଳୀ",
    app_subtitle: "ଆଧୁନିକ ବ୍ୟବସାୟ ଓ ନେତୃତ୍ୱ ସମସ୍ୟା ପାଇଁ ମହାଭାରତର ଅମୃତ ଜ୍ଞାନ",
    lang_label: "ଭାଷା:",
    glossary_btn: "ସଂସ୍କୃତ ଶବ୍ଦର ସରଳ ଅର୍ଥ",
    tab_advisor: "ପରାମର୍ଶ ମାଗନ୍ତୁ",
    tab_archive: "ସମସ୍ତ ୫୦ ଘଟଣା",
    tab_playbooks: "ରଣନୀତି ଗାଇଡ୍",
    tab_how_it_works: "ଏହା କିପରି କାମ କରେ",
    hero_badge: "କ୍ଷତ୍ରିୟ ରଣକୌଶଳ ପଦ୍ଧତି",
    hero_title_1: "ଆଧୁନିକ ସମସ୍ୟାର ସମାଧାନ ପାଆନ୍ତୁ",
    hero_title_2: "ମହାଭାରତ ନିର୍ଣ୍ଣୟ ଜ୍ଞାନ ସହିତ",
    hero_desc: "ଆପଣଙ୍କର ବ୍ୟବସାୟ ବା ନେତୃତ୍ୱ ସମସ୍ୟା ସରଳ ଭାଷାରେ ଲେଖନ୍ତୁ। ୫୦ଟି ପ୍ରମାଣିତ ମହାଭାରତ କାହାଣୀରୁ ଉପଯୁକ୍ତ ପ୍ରାଚୀନ ରଣନୀତି ଓ ଆଜିର ବ୍ୟାବହାରିକ ପଦକ୍ଷେପ ପାଆନ୍ତୁ।",
    input_label: "ଆପଣଙ୍କ ସମସ୍ୟା ସରଳ ଶବ୍ଦରେ ଲେଖନ୍ତୁ:",
    show_label: "ଦେଖାନ୍ତୁ:",
    clear_btn: "ଲିଭାନ୍ତୁ",
    presets_title: "ପରୀକ୍ଷା ପାଇଁ ଯେକୌଣସି ଉଦାହରଣ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ:",
    preset_1: "ଗୁପ୍ତ ଶତ୍ରୁ ଷଡ଼ଯନ୍ତ୍ର (ଜତୁଗୃହରୁ ମୁକ୍ତି)",
    preset_2: "ବଡ଼ ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱୀଙ୍କୁ ହରାଇବା (ଜରାସନ୍ଧ ବଧ)",
    preset_3: "କପଟ ଖେଳରୁ ରକ୍ଷା (ଦ୍ୟୂତ ସଭା)",
    preset_4: "ଗୁପ୍ତ ବେଶରେ କାର୍ଯ୍ୟ କରିବା (ଅଜ୍ଞାତବାସ)",
    preset_5: "ଶାନ୍ତି ଆଲୋଚନା ଓ କୂଟନୀତି (ଶ୍ରୀକୃଷ୍ଣ ଦୂତ)",
    btn_submit: "ମହାଭାରତ ଶିକ୍ଷା ଖୋଜନ୍ତୁ",
    loading_title: "ସବୁଠାରୁ ନିକଟତର ମହାଭାରତ ପ୍ରସଙ୍ଗ ଖୋଜାଯାଉଛି...",
    loading_subtitle: "ସମସ୍ୟା ବିଶ୍ଳେଷଣ କରି ବ୍ୟାବହାରିକ ଉପାୟ ପ୍ରସ୍ତୁତ କରାଯାଉଛି...",
    archive_title: "ମହାଭାରତର ସମସ୍ତ ୫୦ଟି ରଣନୀତିକ ପ୍ରସଙ୍ଗ",
    archive_subtitle: "ଐତିହାସିକ ଘଟଣା, ଚରିତ୍ର, ନିର୍ଣ୍ଣୟ ଏବଂ ଆଧୁନିକ ବ୍ୟବସାୟିକ ଅର୍ଥ।",
    playbook_title: "ରଣନୀତିର ୪ଟି ମୁଖ୍ୟ ସ୍ତମ୍ଭ",
    playbook_desc: "ସମସ୍ତ ୫୦ କାହାଣୀ ୪ଟି ସରଳ ନେତୃତ୍ୱ ଗାଇଡରେ ବିଭକ୍ତ: ସଙ୍କଟ ପ୍ରତିରକ୍ଷା, ମେଣ୍ଟ, କପଟରୁ ମୁକ୍ତି ଓ ସୁଶାସନ।",
    pillar_1_title: "୧. ସଙ୍କଟ ପରିଚାଳନା ଓ ଗୁପ୍ତ ରକ୍ଷା",
    pillar_1_sub: "ବିପଦଜନକ ଆକ୍ରମଣ ଓ ପ୍ରତାରଣାରୁ କିପରି ବର୍ତ୍ତିବେ",
    pillar_1_desc: "ବିଦୁର ଓ ପାଣ୍ଡବମାନେ ଜତୁଗୃହରେ ଶାନ୍ତ ରହି ଗୁପ୍ତ ସୁଡଙ୍ଗ ନିର୍ମାଣ କରି ଆତ୍ମରକ୍ଷା କରିଥିଲେ।",
    pillar_2_title: "୨. ଭାଗୀଦାରୀ ଓ ଶକ୍ତିଶାଳୀ ମେଣ୍ଟ",
    pillar_2_sub: "ଦକ୍ଷତା ଦ୍ୱାରା ଶକ୍ତିଶାଳୀ ସହଯୋଗୀ ଆକର୍ଷିତ କରନ୍ତୁ",
    pillar_2_desc: "ଉଚ୍ଚ ଦକ୍ଷତା ପ୍ରଦର୍ଶନ କଲେ ବଡ଼ ସହଯୋଗୀ ଯୋଡ଼ି ହୁଅନ୍ତି (ଦ୍ରୌପଦୀ ସ୍ୱୟଂବର)।",
    pillar_3_title: "୩. କପଟ ଖେଳ ଓ ଜୁଆରୁ ଦୂରେଇ ରୁହନ୍ତୁ",
    pillar_3_sub: "ଯେଉଁ ଖେଳର ନିୟମ ଶତ୍ରୁ ନିୟନ୍ତ୍ରଣ କରେ ସେଥିରେ ପଶନ୍ତୁ ନାହିଁ",
    pillar_3_desc: "ଶକୁନିଙ୍କ କପଟ ପଶାରେ ଯୁଧିଷ୍ଠିର ସବୁକିଛି ହରାଇଲେ। ନିୟନ୍ତ୍ରିତ ଜାଲରେ ବଡ଼ ବିପଦ ନିଅନ୍ତୁ ନାହିଁ।",
    pillar_4_title: "୪. ନ୍ୟାୟପୂର୍ଣ୍ଣ ଶାସନ ଓ ନେତୃତ୍ୱ ହସ୍ତାନ୍ତର",
    pillar_4_sub: "ଅନୁଷ୍ଠାନର ପୁନର୍ଗଠନ ଏବଂ ସମ୍ମାନଜନକ ପଦତ୍ୟାଗ",
    pillar_4_desc: "ଭୀଷ୍ମଙ୍କ ରାଜଧର୍ମ ଉପଦେଶ ଓ ସଙ୍କଟ ପରେ ସଂଗଠନ ପୁନଃ ନିର୍ମାଣ।",
    how_it_works_title: "ଏହା ସରଳ ଶବ୍ଦରେ କିପରି କାମ କରେ",
    how_it_works_desc: "ଆପଣ ପ୍ରଶ୍ନ ଲେଖିଲେ AI ଦୁଇଟି ସହଜ ପଦକ୍ଷେପରେ ଶ୍ରେଷ୍ଠ ଶିକ୍ଷା ବାଛେ।",
    step_1_title: "ପଦକ୍ଷେପ ୧: ବ୍ୟାପକ ସନ୍ଧାନ (ଶୀର୍ଷ ୧୦ କାହାଣୀ)",
    step_1_desc: "AI ଆପଣଙ୍କ ବାକ୍ୟର ଅର୍ଥ ବୁଝି ୫୦ କାହାଣୀରୁ ୧୦ଟି ନିକଟତର କାହାଣୀ ଚୟନ କରେ।",
    step_2_title: "ପଦକ୍ଷେପ ୨: ଗଭୀର ମୂଲ୍ୟାୟନ (ଶ୍ରେଷ୍ଠ ୩ ସମାଧାନ)",
    step_2_desc: "ସମସ୍ୟା ଓ ନୀତି ଆଧାରରେ ଶ୍ରେଷ୍ଠ ୩ଟି ବ୍ୟାବହାରିକ ପଦକ୍ଷେପ ପ୍ରଦାନ କରେ।"
  },
  pa: {
    app_title: "ਮਹਾਭਾਰਤ ਰਣਨੀਤਕ ਸਲਾਹਕਾਰ",
    version_tag: "V8 ਫੈਸਲਾ ਪ੍ਰਣਾਲੀ",
    app_subtitle: "ਆਧੁਨਿਕ ਕਾਰੋਬਾਰ ਅਤੇ ਲੀਡਰਸ਼ਿਪ ਫੈਸਲਿਆਂ ਲਈ ਮਹਾਭਾਰਤ ਦਾ ਅਮਰ ਗਿਆਨ",
    lang_label: "ਭਾਸ਼ਾ:",
    glossary_btn: "ਸੰਸਕ੍ਰਿਤ ਸ਼ਬਦਾਂ ਦੇ ਸਰਲ ਅਰਥ",
    tab_advisor: "ਸਲਾਹ ਲਵੋ",
    tab_archive: "ਸਾਰੇ 50 ਪ੍ਰਸੰਗ",
    tab_playbooks: "ਰਣਨੀਤੀ ਗਾਈਡ",
    tab_how_it_works: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    hero_badge: "ਕਾਲਜਈ ਕਸ਼ੱਤਰੀਆ ਰਣਨੀਤੀ ਪ੍ਰਣਾਲੀ",
    hero_title_1: "ਆਧੁਨਿਕ ਚੁਣੌਤੀਆਂ ਦਾ ਹੱਲ ਲੱਭੋ",
    hero_title_2: "ਮਹਾਭਾਰਤ ਦੇ ਫੈਸਲਾ ਗਿਆਨ ਨਾਲ",
    hero_desc: "ਆਪਣੀ ਕਾਰੋਬਾਰ ਜਾਂ ਲੀਡਰਸ਼ਿਪ ਦੀ ਸਮੱਸਿਆ ਸਰਲ ਸ਼ਬਦਾਂ ਵਿੱਚ ਲਿਖੋ। 50 ਪ੍ਰਮਾਣਿਤ ਮਹਾਭਾਰਤ ਕਹਾਣੀਆਂ ਵਿੱਚੋਂ ਸਭ ਤੋਂ ਢੁਕਵੀਂ ਪ੍ਰਾਚੀਨ ਰਣਨੀਤੀ ਅਤੇ ਅੱਜ ਦੇ ਅਮਲੀ ਕਦਮ ਜਾਣੋ।",
    input_label: "ਆਪਣੀ ਸਮੱਸਿਆ ਸਰਲ ਸ਼ਬਦਾਂ ਵਿੱਚ ਲਿਖੋ:",
    show_label: "ਦਿਖਾਓ:",
    clear_btn: "ਸਾਫ਼ ਕਰੋ",
    presets_title: "ਟੈਸਟ ਕਰਨ ਲਈ ਕਿਸੇ ਵੀ ਉਦਾਹਰਣ 'ਤੇ ਕਲਿੱਕ ਕਰੋ:",
    preset_1: "ਗੁਪਤ ਦੁਸ਼ਮਣ ਸਾਜ਼ਿਸ਼ (ਲਾਖ ਦੇ ਮਹਿਲ 'ਚੋਂ ਬਚਾਓ)",
    preset_2: "ਵੱਡੇ ਵਿਰੋਧੀ ਨੂੰ ਹਰਾਉਣਾ (ਜਰਾਸੰਧ ਵਧ)",
    preset_3: "ਧੋਖੇਬਾਜ਼ ਜੂਏ ਤੋਂ ਬਚਣਾ (ਦਿਊਤ ਸਭਾ)",
    preset_4: "ਗੁਪਤ ਭੇਸ ਵਿੱਚ ਕੰਮ ਕਰਨਾ (ਅਗਿਆਤਵਾਸ)",
    preset_5: "ਸ਼ਾਂਤੀ ਵਾਰਤਾ ਅਤੇ ਕੂਟਨੀਤੀ (ਕ੍ਰਿਸ਼ਨ ਦੂਤ)",
    btn_submit: "ਮਹਾਭਾਰਤ ਦੇ ਸਬਕ ਲੱਭੋ",
    loading_title: "ਸਭ ਤੋਂ ਨਜ਼ਦੀਕੀ ਮਹਾਭਾਰਤ ਪ੍ਰਸੰਗ ਲੱਭੇ ਜਾ ਰਹੇ ਹਨ...",
    loading_subtitle: "ਸਮੱਸਿਆ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਅਮਲੀ ਕਦਮ ਤਿਆਰ ਕੀਤੇ ਜਾ ਰਹੇ ਹਨ...",
    archive_title: "ਮਹਾਭਾਰਤ ਦੇ ਸਾਰੇ 50 ਰਣਨੀਤਕ ਪ੍ਰਸੰਗ",
    archive_subtitle: "ਇਤਿਹਾਸਕ ਘਟਨਾਵਾਂ, ਪਾਤਰ, ਫੈਸਲੇ ਅਤੇ ਉਹਨਾਂ ਦੇ ਆਧੁਨਿਕ ਵਪਾਰਕ ਅਰਥ।",
    playbook_title: "ਰਣਨੀਤੀ ਦੇ 4 ਮੁੱਖ ਥੰਮ੍ਹ",
    playbook_desc: "ਸਾਰੀਆਂ 50 ਕਹਾਣੀਆਂ 4 ਸਰਲ ਲੀਡਰਸ਼ਿਪ ਗਾਈਡਾਂ ਵਿੱਚ ਵੰਡੀਆਂ ਗਈਆਂ ਹਨ: ਸੰਕਟ ਬਚਾਓ, ਗੱਠਜੋੜ, ਧੋਖੇ ਤੋਂ ਬਚਾਓ, ਅਤੇ ਚੰਗਾ ਸ਼ਾਸਨ।",
    pillar_1_title: "1. ਸੰਕਟ ਪ੍ਰਬੰਧਨ ਅਤੇ ਗੁਪਤ ਬਚਾਓ",
    pillar_1_sub: "ਖ਼ਤਰਨਾਕ ਹਮਲਿਆਂ ਅਤੇ ਧੋਖੇ ਤੋਂ ਕਿਵੇਂ ਬਚਣਾ ਹੈ",
    pillar_1_desc: "ਵਿਦੁਰ ਅਤੇ ਪਾਂਡਵਾਂ ਨੇ ਲਾਖ ਦੇ ਮਹਿਲ ਵਿੱਚ ਸ਼ਾਂਤ ਰਹਿ ਕੇ ਗੁਪਤ ਸੁਰੰਗ ਬਣਾ ਕੇ ਬਚਾਅ ਕੀਤਾ।",
    pillar_2_title: "2. ਸਾਂਝੇਦਾਰੀ ਅਤੇ ਸ਼ਕਤੀਸ਼ਾਲੀ ਗੱਠਜੋੜ",
    pillar_2_sub: "ਹੁਨਰ ਨਾਲ ਮਜ਼ਬੂਤ ​​ਸਹਿਯੋਗੀ ਆਕਰਸ਼ਿਤ ਕਰੋ",
    pillar_2_desc: "ਉੱਚ ਯੋਗਤਾ ਦਿਖਾਉਣ ਨਾਲ ਵੱਡੇ ਭਾਈਵਾਲ ਜੁੜਦੇ ਹਨ (ਦ੍ਰੌਪਦੀ ਸਵਯੰਵਰ)।",
    pillar_3_title: "3. ਪੱਖਪਾਤੀ ਖੇਡਾਂ ਅਤੇ ਜੂਏ ਤੋਂ ਬਚਣਾ",
    pillar_3_sub: "ਜਿਸ ਖੇਡ ਦੇ ਨਿਯਮ ਦੁਸ਼ਮਣ ਤੈਅ ਕਰੇ ਉਸ ਵਿੱਚ ਨਾ ਉਤਰੋ",
    pillar_3_desc: "ਸ਼ਕੁਨੀ ਦੇ ਕਪਟੀ ਪਾਸਿਆਂ ਨਾਲ ਯੁਧਿਸ਼ਠਰ ਸਭ ਕੁਝ ਹਾਰ ਗਿਆ। ਧੋਖੇ ਵਾਲੀ ਪ੍ਰਣਾਲੀ ਵਿੱਚ ਵੱਡਾ ਜੋਖਮ ਨਾ ਲਵੋ।",
    pillar_4_title: "4. ਨਿਰਪੱਖ ਸ਼ਾਸਨ ਅਤੇ ਲੀਡਰਸ਼ਿਪ ਤਬਦੀਲੀ",
    pillar_4_sub: "ਸੰਸਥਾ ਦਾ ਪੁਨਰ ਨਿਰਮਾਣ ਅਤੇ ਸਤਿਕਾਰਯੋਗ ਅਸਤੀਫਾ",
    pillar_4_desc: "ਭੀਸ਼ਮ ਦਾ ਰਾਜਧਰਮ ਉਪਦੇਸ਼ ਅਤੇ ਸੰਕਟ ਤੋਂ ਬਾਅਦ ਸੰਗਠਨ ਨੂੰ ਦੁਬਾਰਾ ਖੜ੍ਹਾ ਕਰਨਾ।",
    how_it_works_title: "ਇਹ ਸਰਲ ਸ਼ਬਦਾਂ ਵਿੱਚ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    how_it_works_desc: "ਜਦੋਂ ਤੁਸੀਂ ਪ੍ਰਸ਼ਨ ਦਾਖਲ ਕਰਦੇ ਹੋ ਤਾਂ AI ਦੋ ਤੇਜ਼ ਕਦਮਾਂ ਵਿੱਚ ਵਧੀਆ ਸਬਕ ਚੁਣਦਾ ਹੈ।",
    step_1_title: "ਕਦਮ 1: ਵਿਆਪਕ ਖੋਜ (ਸਿਖਰਲੇ 10 ਪ੍ਰਸੰਗ)",
    step_1_desc: "AI ਤੁਹਾਡੇ ਵਾਕ ਦੇ ਅਰਥ ਨੂੰ ਸਮਝ ਕੇ 50 ਪ੍ਰਸੰਗਾਂ ਵਿੱਚੋਂ 10 ਨੇੜਲੇ ਪ੍ਰਸੰਗ ਚੁਣਦਾ ਹੈ।",
    step_2_title: "ਕਦਮ 2: ਡੂੰਘਾ ਵਿਸ਼ਲੇਸ਼ਣ (ਸਿਖਰਲੇ 3 ਸਟੀਕ ਹੱਲ)",
    step_2_desc: "ਸਮੱਸਿਆ ਅਤੇ ਪ੍ਰਾਚੀਨ ਚੁਣੌਤੀ ਦੇ ਆਧਾਰ 'ਤੇ ਵਧੀਆ 3 ਕਦਮ ਸੁਝਾਉਂਦਾ ਹੈ।"
  }
};

// Character avatar/color helper
const characterStyles = {
  'Krishna': { bg: 'bg-blue-500/20', text: 'text-blue-500', border: 'border-blue-500/50', icon: 'fa-peacock' },
  'Arjuna': { bg: 'bg-emerald-500/20', text: 'text-emerald-500', border: 'border-emerald-500/50', icon: 'fa-bullseye' },
  'Yudhishthira': { bg: 'bg-amber-500/20', text: 'text-amber-500', border: 'border-amber-500/50', icon: 'fa-scale-balanced' },
  'Bhima': { bg: 'bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-500/50', icon: 'fa-mace' },
  'Vidura': { bg: 'bg-purple-500/20', text: 'text-purple-500', border: 'border-purple-500/50', icon: 'fa-lightbulb' },
  'Duryodhana': { bg: 'bg-rose-500/20', text: 'text-rose-500', border: 'border-rose-500/50', icon: 'fa-crown' },
  'Shakuni': { bg: 'bg-red-500/20', text: 'text-red-500', border: 'border-red-500/50', icon: 'fa-dice' },
  'Bhishma': { bg: 'bg-slate-500/20', text: 'text-slate-500', border: 'border-slate-500/50', icon: 'fa-shield' },
  'Drona': { bg: 'bg-indigo-500/20', text: 'text-indigo-500', border: 'border-indigo-500/50', icon: 'fa-chalkboard-user' },
  'Karna': { bg: 'bg-yellow-500/20', text: 'text-yellow-500', border: 'border-yellow-500/50', icon: 'fa-sun' },
  'Draupadi': { bg: 'bg-pink-500/20', text: 'text-pink-500', border: 'border-pink-500/50', icon: 'fa-fire' }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchAllCases();
  fetchStats();
  setupEventListeners();
  applyTranslations('en');
  initHeroEmberCanvas();
  initAmbientBackgroundCanvas();
});

function setupEventListeners() {
  const queryInput = document.getElementById('query-input');
  const clearBtn = document.getElementById('clear-query-btn');

  queryInput.addEventListener('input', () => {
    if (queryInput.value.trim().length > 0) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  });

  queryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      executePrediction();
    }
  });
}

// Change UI Language
function changeLanguage(langCode) {
  currentLang = langCode;
  applyTranslations(langCode);
}

const sampleQueriesByLang = {
  en: {
    1: "How can an organization handle an asymmetric death trap and hostile insider sabotage without triggering early public alarm?",
    2: "How can a market challenger disrupt an entrenched monopoly without initiating an expensive, resource-draining direct price war?",
    3: "How to manage risk and avoid sunk cost fallacy when competitors rig platform rules and proprietary algorithms?",
    4: "How can a brand under regulatory fire operate stealth product development in an incognito disguise inside a host system?",
    5: "How can a leadership coalition handle high-stakes diplomatic deterrence and negotiate with hostile rivals prior to confrontation?"
  },
  ta: {
    1: "பொதுமக்களுக்கு அச்சம் ஏற்படுத்தாமல் நிறுவனத்திற்குள் நடக்கும் ரகசிய உள் துரோகத்தையும் பெரும் ஆபத்தையும் அமைதியாக இருந்து எப்படி சமாளிப்பது?",
    2: "நேரடி விலைப்போரில் இறங்காமல் பெரிய ஏகபோக நிறுவனத்தை ஒரு புதிய போட்டியாளர் எவ்வாறு திறம்பட வீழ்த்துவது?",
    3: "போட்டியாளர்கள் தங்களுக்கு சாதகமாக விதிமுறைகளை மாற்றும்போது இழப்பிலிருந்து தப்பித்து ஆபத்தை எவ்வாறு நிர்வகிப்பது?",
    4: "ஒழுங்குமுறை அழுத்தத்தில் இருக்கும் ஒரு நிறுவனம் தனது புதிய தயாரிப்பை ரகசிய மாறுவேடத்தில் எவ்வாறு உருவாக்குவது?",
    5: "மோதலுக்கு முன்பாக கடுமையான எதிரிகளுடன் உயர்நிலை ராஜதந்திர பேச்சுவார்த்தையையும் அமைதியையும் எவ்வாறு கையாள்வது?"
  },
  hi: {
    1: "सार्वजनिक घबराहट पैदा किए बिना संगठन के भीतर गुप्त आंतरिक विश्वासघात और जानलेवा जाल से कैसे निपटें?",
    2: "सीधे मूल्य युद्ध में उतरे बिना एक उभरती कंपनी बड़े एकाधिकार वाले प्रतिद्वंद्वी को कैसे हरा सकती है?",
    3: "जब प्रतिद्वंद्वी प्लेटफ़ॉर्म के नियमों में हेरफेर करें तो डूबी हुई लागत से बचते हुए जोखिम का प्रबंधन कैसे करें?",
    4: "कड़े नियमों के बीच कोई कंपनी किसी अन्य प्रणाली में गुप्त भेष में अपने नए उत्पाद का विकास कैसे कर सकती है?",
    5: "टकराव से पहले कट्टर प्रतिद्वंद्वियों के साथ उच्च स्तरीय कूटनीतिक वार्ता और प्रतिरोध का प्रबंधन कैसे करें?"
  },
  te: {
    1: "ప్రజల్లో ఆందోళన కలిగించకుండా సంస్థలోని అంతర్గత కుట్రలను, తీవ్రమైన ప్రమాదాలను ఎలా ఎదుర్కోవాలి?",
    2: "నేరుగా ధరల యుద్ధానికి దిగకుండా బలమైన గుత్తాధిపత్య సంస్థను ఒక సవాలుదారుడు ఎలా ఓడించగలడు?",
    3: "పోటీదారులు ప్లాట్‌ఫారమ్ నియమాలను తారుమారు చేసినప్పుడు మోసపూరిత ఉచ్చు నుండి ఎలా రక్షించుకోవాలి?",
    4: "నిబంధనల ఒత్తిడిలో ఉన్న సంస్థ తన కొత్త ఉత్పత్తులను రహస్య మారువేషంలో ఎలా అభివృద్ధి చేయాలి?",
    5: "యుద్ధానికి ముందు కఠినమైన శత్రువులతో ఉన్నత స్థాయి దౌత్య చర్చలు మరియు శాంతిని ఎలా నిర్వహించాలి?"
  }
};

function applyTranslations(langCode) {
  const dict = i18nTranslations[langCode] || i18nTranslations['en'];
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Top-k select options localized
  const topKSelect = document.getElementById('top-k-select');
  if (topKSelect) {
    const kOptions = {
      en: ["1 Best Story", "2 Stories", "3 Stories (Recommended)", "5 Stories", "10 Stories"],
      ta: ["1 சிறந்த கதை", "2 கதைகள்", "3 கதைகள் (பரிந்துரைக்கப்பட்டது)", "5 கதைகள்", "10 கதைகள்"],
      hi: ["1 सर्वश्रेष्ठ प्रसंग", "2 प्रसंग", "3 प्रसंग (अनुशंसित)", "5 प्रसंग", "10 प्रसंग"],
      te: ["1 ఉత్తమ కథ", "2 కథలు", "3 కథలు (సిఫార్సు చేయబడింది)", "5 కథలు", "10 కథలు"],
      kn: ["1 ಅತ್ಯುತ್ತಮ ಕಥೆ", "2 ಕಥೆಗಳು", "3 ಕಥೆಗಳು (ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ)", "5 ಕಥೆಗಳು", "10 ಕಥೆಗಳು"],
      ml: ["1 മികച്ച കഥ", "2 കഥകൾ", "3 കഥകൾ (ശുപാർശ ചെയ്യുന്നത്)", "5 കഥകൾ", "10 കഥകൾ"],
      bn: ["১টি সেরা কাহিনী", "২টি কাহিনী", "৩টি কাহিনী (সুপারিশকৃত)", "৫টি কাহিনী", "১০টি কাহিনী"],
      mr: ["१ सर्वोत्तम प्रसंग", "२ प्रसंग", "३ प्रसंग (शिफारस केलेले)", "५ प्रसंग", "१० प्रसंग"],
      gu: ["૧ શ્રેષ્ઠ પ્રસંગ", "૨ પ્રસંગો", "૩ પ્રસંગો (ભલામણ કરેલ)", "૫ પ્રસંગો", "૧૦ પ્રસંગો"],
      or: ["୧ଟି ଶ୍ରେଷ୍ଠ ପ୍ରସଙ୍ଗ", "୨ଟି ପ୍ରସଙ୍ଗ", "୩ଟି ପ୍ରସଙ୍ଗ (ସୁପାରିଶ)", "୫ଟି ପ୍ରସଙ୍ଗ", "୧୦ଟି ପ୍ରସଙ୍ଗ"],
      pa: ["1 ਸਭ ਤੋਂ ਵਧੀਆ ਪ੍ਰਸੰਗ", "2 ਪ੍ਰਸੰਗ", "3 ਪ੍ਰਸੰਗ (ਸਿਫਾਰਸ਼ੀ)", "5 ਪ੍ਰਸੰਗ", "10 ਪ੍ਰਸੰਗ"],
      sa: ["१ सर्वोत्तम-प्रकरणम्", "२ प्रकरणे", "३ प्रकरणानि (अनुशंसितम्)", "५ प्रकरणानि", "१० प्रकरणानि"]
    };
    const opts = kOptions[langCode] || kOptions['en'];
    Array.from(topKSelect.options).forEach((opt, idx) => {
      if (opts[idx]) opt.textContent = opts[idx];
    });
  }

  // Update input placeholder
  const inputEl = document.getElementById('query-input');
  if (inputEl) {
    if (langCode === 'hi') {
      inputEl.placeholder = "उदा. कोई आंतरिक विरोधी गुप्त रूप से हमारे प्रोजेक्ट को नुकसान पहुंचाने की कोशिश कर रहा है और हमें शांति से बाहर निकलने की योजना बनानी है...";
    } else if (langCode === 'ta') {
      inputEl.placeholder = "எ.கா. நிறுவனத்திற்குள் இருக்கும் ஒருவர் ரகசியமாக திட்டத்தை அழிக்க முயற்சிக்கிறார், நாம் அமைதியாக இருந்து தப்பும் திட்டத்தை உருவாக்க வேண்டும்...";
    } else if (langCode === 'te') {
      inputEl.placeholder = "ఉదా. సంస్థలోని అంతర్గత శత్రువు ప్రాజెక్టును నాశనం చేయడానికి ప్రయత్నిస్తున్నప్పుడు మనం శాంతియుతంగా ఉంటూ తప్పించుకునే వ్యూహం...";
    } else {
      inputEl.placeholder = "e.g. Someone on our team or a competitor is secretly trying to harm our project while we must stay calm and make an escape plan...";
    }
  }

  // Update archive search placeholder
  const archiveSearch = document.getElementById('archive-search');
  if (archiveSearch) {
    if (langCode === 'ta') {
      archiveSearch.placeholder = "கதை, கதாபாத்திரம் (எ.கா. கிருஷ்ணர், விதுரர்) அல்லது தலைப்பைத் தேடவும்...";
    } else if (langCode === 'hi') {
      archiveSearch.placeholder = "प्रसंग, पात्र (उदा. कृष्ण, विदुर) या विषय खोजें...";
    } else {
      archiveSearch.placeholder = "Search story, character (e.g. Krishna, Vidura), or topic...";
    }
  }
}

// Tab switcher
function switchTab(tab) {
  currentTab = tab;
  const tabs = ['advisor', 'archive', 'analytics', 'architecture'];
  
  tabs.forEach(t => {
    const el = document.getElementById(`tab-${t}`);
    const btn = document.getElementById(`tab-${t}-btn`);
    if (t === tab) {
      el.classList.remove('hidden');
      el.classList.add('block');
      btn.classList.add('tab-active');
      btn.classList.remove('text-slate-400');
    } else {
      el.classList.add('hidden');
      el.classList.remove('block');
      btn.classList.remove('tab-active');
      btn.classList.add('text-slate-400');
    }
  });
}

function setSampleQuery(presetIdx) {
  let queryText = '';
  if (typeof presetIdx === 'number') {
    const langQueries = sampleQueriesByLang[currentLang] || sampleQueriesByLang['en'];
    queryText = langQueries[presetIdx] || sampleQueriesByLang['en'][presetIdx] || '';
  } else {
    queryText = presetIdx;
  }
  const queryInput = document.getElementById('query-input');
  queryInput.value = queryText;
  document.getElementById('clear-query-btn').classList.remove('hidden');
  queryInput.focus();
  executePrediction();
}

function clearQuery() {
  const queryInput = document.getElementById('query-input');
  queryInput.value = '';
  document.getElementById('clear-query-btn').classList.add('hidden');
  document.getElementById('results-container').innerHTML = '';
  queryInput.focus();
}

// Live Pipeline Animation Helper
function updatePipeline(stage, text) {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`pipe-${i}`);
    if (!el) continue;
    if (i <= stage) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }
  const statusEl = document.getElementById('pipeline-status-text');
  if (statusEl && text) {
    statusEl.textContent = `${currentLang === 'ta' ? 'நிலை:' : (currentLang === 'hi' ? 'स्थिति:' : 'Status:')} ${text}`;
  }
}

// Fetch Master Cases for Archive
async function fetchAllCases() {
  try {
    const res = await fetch('/api/cases');
    const data = await res.json();
    allCases = data.cases || [];
    populateFilters(allCases);
    renderArchiveGrid(allCases);
  } catch (err) {
    console.error("Error fetching cases:", err);
  }
}

// Fetch Stats
async function fetchStats() {
  try {
    const res = await fetch('/api/stats');
    corpusStats = await res.json();
    renderStatsPanel(corpusStats);
  } catch (err) {
    console.error("Error fetching stats:", err);
  }
}

function populateFilters(cases) {
  const parvaSelect = document.getElementById('archive-parva-filter');
  const catSelect = document.getElementById('archive-category-filter');

  const parvas = [...new Set(cases.map(c => c.parva).filter(Boolean))].sort();
  const categories = [...new Set(cases.map(c => c.problem_category).filter(Boolean))].sort();

  parvas.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    parvaSelect.appendChild(opt);
  });

  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    catSelect.appendChild(opt);
  });
}

// Helper: Highlight Sanskrit words with tooltip
function enrichSanskritText(text) {
  if (!text) return '';
  let enriched = text;
  Object.keys(sanskritGlossary).forEach(term => {
    const regex = new RegExp(`\\b(${term})\\b`, 'gi');
    enriched = enriched.replace(regex, `<span class="sanskrit-word" title="${sanskritGlossary[term]}">$1</span>`);
  });
  return enriched;
}

// Render Stats in Domain Tab
function renderStatsPanel(stats) {
  const container = document.getElementById('stats-panel');
  if (!container || !stats) return;

  container.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
      <h3 class="text-base sm:text-lg font-bold font-cinzel text-white flex items-center gap-2">
        <i class="fa-solid fa-chart-pie text-amber-400"></i>
        System Knowledge Telemetry
      </h3>
      <span class="text-xs text-amber-500 font-mono bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
        AI Model: ${stats.model_name || 'all-MiniLM-L6-v2'}
      </span>
    </div>
    
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
        <div class="text-2xl font-black text-amber-400 font-cinzel">${stats.total_cases}</div>
        <div class="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Epic Case Studies</div>
      </div>
      <div class="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
        <div class="text-2xl font-black text-cyan-400 font-cinzel">${stats.total_parvas}</div>
        <div class="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Parvas (Chapters)</div>
      </div>
      <div class="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
        <div class="text-2xl font-black text-emerald-400 font-cinzel">${stats.total_categories}</div>
        <div class="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Problem Categories</div>
      </div>
      <div class="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
        <div class="text-2xl font-black text-purple-400 font-cinzel">${stats.total_characters}</div>
        <div class="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Key Strategists</div>
      </div>
    </div>
  `;
}

// Live Pipeline Animation Helper
function updatePipeline(stage, text) {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`pipe-${i}`);
    if (!el) continue;
    if (i <= stage) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }
  const statusEl = document.getElementById('pipeline-status-text');
  if (statusEl && text) {
    statusEl.textContent = `Status: ${text}`;
  }
}

// Toast Notification
function showToast(msg) {
  const toast = document.getElementById('toast-notification');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Copy Case Strategy to Clipboard
function copyStrategicMatrix(caseId) {
  const c = allCases.find(item => item.id === caseId);
  if (!c) return;

  const text = `=====================================================
MAHABHARATA STRATEGIC DECISION SUPPORT MATRIX
=====================================================
Episode: ${c.episode} (${c.parva})
Category: ${c.problem_category || c.strategic_dimension}

⚔️ ANCIENT SITUATION & CHALLENGE:
${c.strategic_challenge || c.situation_description}

🏹 TACTICAL STRATEGY EXECUTED:
${c.strategy_or_action}

🏆 OUTCOME & POWER SHIFT:
${c.outcome}

🏢 CONTEMPORARY BUSINESS APPLICATION:
${c.contemporary_problem}

💡 CORE STRATEGIC INSIGHT:
${c.strategic_insight}

🚀 PRACTICAL ACTION ROADMAP:
${c.contemporary_application}

Source: Kisari Mohan Ganguli Sacred Texts Archive
=====================================================`;

  navigator.clipboard.writeText(text).then(() => {
    showToast(`Case #${c.id} Strategy Copied to Clipboard!`);
  }).catch(() => {
    showToast("Strategy copied!");
  });
}

// Free Client-Side Translation Bridge with Caching
const translationCache = new Map();

async function translateText(text, fromLang = 'auto', toLang = 'en') {
  if (!text || fromLang === toLang) return text;
  const cacheKey = `${fromLang}->${toLang}:${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return text;
    const data = await res.json();
    if (data && data[0]) {
      const translated = data[0].map(s => s[0]).join('');
      translationCache.set(cacheKey, translated);
      return translated;
    }
    return text;
  } catch (err) {
    console.warn('Translation bridge fallback:', err);
    return text;
  }
}

// Translate all fields of a case item for localized display
async function translateCaseObject(caseItem, targetLang) {
  if (!caseItem || targetLang === 'en') return caseItem;
  
  const translatedItem = { ...caseItem };
  const fieldsToTranslate = [
    'episode',
    'strategic_challenge',
    'situation_description',
    'strategy_or_action',
    'outcome',
    'problem_category',
    'contemporary_problem',
    'strategic_insight',
    'contemporary_application'
  ];

  await Promise.all(
    fieldsToTranslate.map(async (f) => {
      if (caseItem[f]) {
        translatedItem[f] = await translateText(caseItem[f], 'en', targetLang);
      }
    })
  );

  return translatedItem;
}

// Execute Prediction Request with Cross-Lingual Query Normalization & Result Localization
async function executePrediction() {
  const query = document.getElementById('query-input').value.trim();
  const topK = parseInt(document.getElementById('top-k-select').value) || 3;
  const loading = document.getElementById('loading-state');
  const resultsContainer = document.getElementById('results-container');
  const analyzeBtn = document.getElementById('analyze-btn');

  if (!query) {
    alert("Please enter a problem or click one of the preset scenarios.");
    return;
  }

  const pipelineMsgs = {
    en: {
      s1_enc: "1. Encoding Problem into Semantic Vector Space...",
      s1_trans: "1. Translating & Normalizing Query for Neural Engine...",
      s2: "2. Computing Multi-View Semantic Embeddings...",
      s3: "3. Retrieving Top Candidate Pools...",
      s4: "4. Applying 5-Field Weighted Scoring Reranker...",
      s5_trans: "5. Translating Strategy Cards into Local Language...",
      s5_done: "5. Strategy Matrix Generated!"
    },
    ta: {
      s1_enc: "1. பிரச்சனையை அர்த்த வெக்டராக மாற்றுகிறது...",
      s1_trans: "1. கேள்வியை மொழிபெயர்த்து AI எஞ்சினுக்கு தயார் செய்கிறது...",
      s2: "2. பல பரிமாண நியூரல் எம்பெடிங் கணக்கிடப்படுகிறது...",
      s3: "3. சிறந்த 10 வேட்பாளர் கதைகள் தேர்ந்தெடுக்கப்படுகின்றன...",
      s4: "4. 5-பரிமாண ஆழமான மறுவரிசை செய்யப்படுகிறது...",
      s5_trans: "5. வியூக அட்டைகள் தமிழில் மொழிபெயர்க்கப்படுகின்றன...",
      s5_done: "5. வியூக தீர்வு அட்டவணை தயார்!"
    },
    hi: {
      s1_enc: "1. समस्या को अर्थपूर्ण वेक्टर स्पेस में एन्कोड किया जा रहा है...",
      s1_trans: "1. प्रश्न का अनुवाद और सामान्यीकरण किया जा रहा है...",
      s2: "2. मल्टी-व्यू न्यूरल एम्बेडिंग्स की गणना हो रही है...",
      s3: "3. शीर्ष 10 संभावित प्रसंग निकाले जा रहे हैं...",
      s4: "4. 5-क्षेत्रीय भारित रीरैंकिंग लागू की जा रही है...",
      s5_trans: "5. प्रसंगों का हिन्दी में अनुवाद हो रहा है...",
      s5_done: "5. रणनीतिक निर्णय मैट्रिक्स तैयार है!"
    }
  };
  const pmsg = pipelineMsgs[currentLang] || pipelineMsgs['en'];

  updatePipeline(1, pmsg.s1_enc);
  loading.classList.remove('hidden');
  resultsContainer.innerHTML = '';
  analyzeBtn.disabled = true;
  analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');

  try {
    // Detect if input is in non-English (Tamil, Hindi, Telugu, etc.)
    const isNonAscii = /[^\u0000-\u007F]/.test(query);
    let searchEnglishQuery = query;

    if (isNonAscii || currentLang !== 'en') {
      updatePipeline(1, pmsg.s1_trans);
      searchEnglishQuery = await translateText(query, currentLang || 'auto', 'en');
    }

    setTimeout(() => { updatePipeline(2, pmsg.s2); }, 200);
    setTimeout(() => { updatePipeline(3, pmsg.s3); }, 450);

    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: searchEnglishQuery, top_k: topK })
    });

    updatePipeline(4, pmsg.s4);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Inference failed");
    }

    const data = await res.json();
    
    // If user's UI is in a non-English language (e.g. Tamil), translate the result cards into that language!
    if (currentLang !== 'en' && data.results && data.results.length > 0) {
      updatePipeline(5, pmsg.s5_trans);
      data.results = await Promise.all(data.results.map(c => translateCaseObject(c, currentLang)));
    }

    updatePipeline(5, pmsg.s5_done);
    renderPredictionResults(data);
  } catch (err) {
    updatePipeline(1, currentLang === 'ta' ? "பைப்லைனில் பிழை ஏற்பட்டது" : "Error in inference pipeline");
    resultsContainer.innerHTML = `
      <div class="glass-panel border-red-500/40 rounded-2xl p-6 text-center text-red-300">
        <i class="fa-solid fa-triangle-exclamation text-2xl mb-2"></i>
        <p class="font-semibold text-sm">Failed to retrieve lessons: ${err.message}</p>
      </div>
    `;
  } finally {
    loading.classList.add('hidden');
    analyzeBtn.disabled = false;
    analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }
}

// Localized Card Text Labels for all 12 Languages
const cardLabels = {
  en: {
    best_match: "Best Match",
    match_score: "Match Score",
    key_people: "Key People Involved:",
    unspecified: "Unspecified",
    story_heading: "What Happened in the Mahabharata Story",
    threat_label: "The Difficult Situation & Threat",
    action_label: "Action / Strategy Taken",
    outcome_label: "Result & Outcome",
    modern_heading: "What This Means for You Today",
    dilemma_label: "Similar Modern Business Dilemma",
    lesson_label: "Key Takeaway / Lesson",
    action_now_label: "Practical Action to Take Now",
    listen_btn: "Listen",
    copy_btn: "Copy",
    inspect_btn: "Inspect"
  },
  ta: {
    best_match: "சிறந்த பொருத்தம்",
    match_score: "பொருத்த மதிப்பெண்",
    key_people: "தொடர்புடைய முக்கிய நபர்கள்:",
    unspecified: "குறிப்பிடப்படவில்லை",
    story_heading: "மகாபாரத கதையில் என்ன நடந்தது",
    threat_label: "கடினமான சூழல் & அச்சுறுத்தல்",
    action_label: "மேற்கொள்ளப்பட்ட உத்தி & நடவடிக்கை",
    outcome_label: "முடிவு & பலன்",
    modern_heading: "இன்று உங்களுக்கு இதன் பொருள் என்ன",
    dilemma_label: "இன்றைய நவீன வணிகச் சிக்கல்",
    lesson_label: "முக்கிய பாடம் / வியூகம்",
    action_now_label: "இப்போது எடுக்க வேண்டிய நடைமுறை நடவடிக்கை",
    listen_btn: "கேளுங்கள்",
    copy_btn: "நகலெடு",
    inspect_btn: "ஆராய்க"
  },
  hi: {
    best_match: "सर्वोत्तम मिलान",
    match_score: "मिलान स्कोर",
    key_people: "प्रमुख पात्र:",
    unspecified: "अनिर्दिष्ट",
    story_heading: "महाभारत प्रसंग में क्या हुआ",
    threat_label: "कठिन परिस्थिति व संकट",
    action_label: "की गई कार्रवाई व रणनीति",
    outcome_label: "परिणाम व निष्कर्ष",
    modern_heading: "आज आपके लिए इसका क्या अर्थ है",
    dilemma_label: "समान आधुनिक व्यावसायिक दुविधा",
    lesson_label: "मुख्य सीख / रणनीतिक बोध",
    action_now_label: "आज करने योग्य व्यावहारिक कदम",
    listen_btn: "सुनें",
    copy_btn: "कॉपी करें",
    inspect_btn: "विस्तार से देखें"
  },
  te: {
    best_match: "ఉత్తమ పోలిక",
    match_score: "పోలిక స్కోరు",
    key_people: "సంబంధిత ముఖ్య వ్యక్తులు:",
    unspecified: "పేర్కొనబడలేదు",
    story_heading: "మహాభారత కథలో ఏమి జరిగింది",
    threat_label: "క్లిష్ట పరిస్థితి & ముప్పు",
    action_label: "తీసుకున్న వ్యూహం & చర్య",
    outcome_label: "ఫలితం & పరిణామం",
    modern_heading: "నేడు మీకు దీని అర్థం ఏమిటి",
    dilemma_label: "సారూప్య ఆధునిక వ్యాపార సందిగ్ధత",
    lesson_label: "ముఖ్యమైన పాఠం / సూత్రం",
    action_now_label: "ఇప్పుడు తీసుకోవలసిన ఆచరణాత్మక చర్య",
    listen_btn: "వినండి",
    copy_btn: "కాపీ చేయండి",
    inspect_btn: "పరిశీలించండి"
  },
  kn: {
    best_match: "ಅತ್ಯುತ್ತಮ ಹೊಂದಾಣಿಕೆ",
    match_score: "ಹೊಂದಾಣಿಕೆ ಅಂಕ",
    key_people: "ಸಂಬಂಧಿತ ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳು:",
    unspecified: "ನಿರ್ದಿಷ್ಟಪಡಿಸಿಲ್ಲ",
    story_heading: "ಮಹಾಭಾರತ ಕಥೆಯಲ್ಲಿ ಏನಾಯಿತು",
    threat_label: "ಕಷ್ಟಕರ ಪರಿಸ್ಥಿತಿ & ಸವಾಲು",
    action_label: "ಕೈಗೊಂಡ ಕಾರ್ಯತಂತ್ರ & ಕ್ರಮ",
    outcome_label: "ಫಲಿತಾಂಶ & ನಿರ್ಧಾರ",
    modern_heading: "ಇಂದು ನಿಮಗೆ ಇದರ ಅರ್ಥವೇನು",
    dilemma_label: "ಇಂದಿನ ಸಮಾನ ವ್ಯವಹಾರ ಸವಾಲು",
    lesson_label: "ಪ್ರಮುಖ ಪಾಠ / ಸೂತ್ರ",
    action_now_label: "ಈಗ ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ಪ್ರಾಯೋಗಿಕ ಕ್ರಮ",
    listen_btn: "ಕೇಳಿ",
    copy_btn: "ಕಾಪಿ ಮಾಡಿ",
    inspect_btn: "ಪರಿಶೀಲಿಸಿ"
  },
  ml: {
    best_match: "മികച്ച അനുയോജ്യത",
    match_score: "സ്കോർ",
    key_people: "പ്രധാന വ്യക്തികൾ:",
    unspecified: "വ്യക്തമല്ല",
    story_heading: "മഹാഭാരത കഥയിൽ സംഭവിച്ചത്",
    threat_label: "പ്രതിസന്ധിയും വെല്ലുവിളിയും",
    action_label: "സ്വീകരിച്ച തന്ത്രവും നടപടിയും",
    outcome_label: "ഫലവും നിഗമനവും",
    modern_heading: "ഇന്ന് ഇതിന്റെ അർത്ഥമെന്ത്",
    dilemma_label: "ആധുനിക ബിസിനസ്സ് പ്രശ്നം",
    lesson_label: "പ്രധാന തത്വം / പാഠം",
    action_now_label: "ഇപ്പോൾ ചെയ്യേണ്ട പ്രായോഗിക നടപടി",
    listen_btn: "കേൾക്കുക",
    copy_btn: "പകർത്തുക",
    inspect_btn: "പരിശോധിക്കുക"
  },
  bn: {
    best_match: "সেরা মিল",
    match_score: "স্কোর",
    key_people: "মূল চরিত্রসমূহ:",
    unspecified: "অনির্দিষ্ট",
    story_heading: "মহাভারতের কাহিনীতে কী ঘটেছিল",
    threat_label: "কঠিন পরিস্থিতি ও সংকট",
    action_label: "গৃহীত কৌশল ও পদক্ষেপ",
    outcome_label: "ফলাফল ও উপসংহার",
    modern_heading: "আজ আপনার জন্য এর অর্থ কী",
    dilemma_label: "অনুরূপ আধুনিক ব্যবসায়িক সংকট",
    lesson_label: "মূল শিক্ষা / কৌশল",
    action_now_label: "এখন নেওয়ার মতো বাস্তব পদক্ষেপ",
    listen_btn: "শুনুন",
    copy_btn: "কপি করুন",
    inspect_btn: "বিস্তারিত দেখুন"
  },
  mr: {
    best_match: "सर्वोत्तम जुळणी",
    match_score: "स्कोअर",
    key_people: "संबंधित प्रमुख व्यक्ती:",
    unspecified: "अनिर्दिष्ट",
    story_heading: "महाभारत प्रसंगात काय घडले",
    threat_label: "कठीण परिस्थिती आणि संकट",
    action_label: "घेतलेली कारवाई आणि रणनीती",
    outcome_label: "निकाल आणि परिणाम",
    modern_heading: "आज तुमच्यासाठी याचा काय अर्थ आहे",
    dilemma_label: "समान आधुनिक व्यावसायिक आव्हान",
    lesson_label: "मुख्य शिकवण / रणनीतिक धडा",
    action_now_label: "आता करावयाची व्यावहारिक कृती",
    listen_btn: "ऐका",
    copy_btn: "कॉपी करा",
    inspect_btn: "तपासा"
  },
  gu: {
    best_match: "શ્રેષ્ઠ મેળ",
    match_score: "સ્કોર",
    key_people: "સંબંધિત મુખ્ય વ્યક્તિઓ:",
    unspecified: "અનિર્દિષ્ટ",
    story_heading: "મહાભારત પ્રસંગમાં શું બન્યું",
    threat_label: "મુશ્કેલ પરિસ્થિતિ અને પડકાર",
    action_label: "લેવાયેલી વ્યૂહરચના અને પગલાં",
    outcome_label: "પરિણામ અને તારણ",
    modern_heading: "આજે તમારા માટે આનો શું અર્થ છે",
    dilemma_label: "સમાન આધુનિક વ્યાપારી પડકાર",
    lesson_label: "મુખ્ય બોધપાઠ / વ્યુહ",
    action_now_label: "હવે લેવાના વ્યવહારુ પગલાં",
    listen_btn: "સાંભળો",
    copy_btn: "કોપી કરો",
    inspect_btn: "તપાસો"
  },
  or: {
    best_match: "ଶ୍ରେଷ୍ଠ ମେଳ",
    match_score: "ସ୍କୋର",
    key_people: "ସମ୍ପୃକ୍ତ ମୁଖ୍ୟ ବ୍ୟକ୍ତିବିଶେଷ:",
    unspecified: "ଅନିର୍ଦ୍ଦିଷ୍ଟ",
    story_heading: "ମହାଭାରତ ପ୍ରସଙ୍ଗରେ କଣ ଘଟିଥିଲା",
    threat_label: "କଠିନ ପରିସ୍ଥିତି ଓ ସଙ୍କଟ",
    action_label: "ଗ୍ରହଣ କରାଯାଇଥିବା ରଣନୀତି",
    outcome_label: "ଫଳାଫଳ ଓ ନିଷ୍କର୍ଷ",
    modern_heading: "ଆଜି ଆପଣଙ୍କ ପାଇଁ ଏହାର ଅର୍ଥ କଣ",
    dilemma_label: "ସମାନ ଆଧୁନିକ ବ୍ୟବସାୟିକ ଦ୍ୱନ୍ଦ୍ୱ",
    lesson_label: "ମୁଖ୍ୟ ଶିକ୍ଷା",
    action_now_label: "ବର୍ତ୍ତମାନର ବ୍ୟାବହାରିକ ପଦକ୍ଷେପ",
    listen_btn: "ଶୁଣନ୍ତୁ",
    copy_btn: "କପି କରନ୍ତୁ",
    inspect_btn: "ଦେଖନ୍ତୁ"
  },
  pa: {
    best_match: "ਸਭ ਤੋਂ ਵਧੀਆ ਮੇਲ",
    match_score: "ਮੇਲ ਸਕੋਰ",
    key_people: "ਮੁੱਖ ਸ਼ਾਮਲ ਵਿਅਕਤੀ:",
    unspecified: "ਅਣ-ਨਿਰਧਾਰਤ",
    story_heading: "ਮਹਾਭਾਰਤ ਪ੍ਰਸੰਗ ਵਿੱਚ ਕੀ ਹੋਇਆ",
    threat_label: "ਮੁਸ਼ਕਲ ਸਥਿਤੀ ਅਤੇ ਚੁਣੌਤੀ",
    action_label: "ਲਈ ਗਈ ਕਾਰਵਾਈ ਅਤੇ ਰਣਨੀਤੀ",
    outcome_label: "ਨਤੀਜਾ ਅਤੇ ਸਿੱਟਾ",
    modern_heading: "ਅੱਜ ਤੁਹਾਡੇ ਲਈ ਇਸਦਾ ਕੀ ਅਰਥ ਹੈ",
    dilemma_label: "ਸਮਾਨ ਆਧੁਨਿਕ ਵਪਾਰਕ ਦੁਵਿਧਾ",
    lesson_label: "ਮੁੱਖ ਸਬਕ / ਰਣਨੀਤੀ",
    action_now_label: "ਹੁਣ ਚੁੱਕਣ ਯੋਗ ਅਮਲੀ ਕਦਮ",
    listen_btn: "ਸੁਣੋ",
    copy_btn: "ਕਾਪੀ ਕਰੋ",
    inspect_btn: "ਜਾਂਚੋ"
  },
  sa: {
    best_match: "सर्वोत्तम-मेलनम्",
    match_score: "अङ्कः",
    key_people: "सम्बद्धाः मुख्याः पात्राः:",
    unspecified: "अनिर्दिष्टम्",
    story_heading: "महाभारत-प्रकरणे किं जातम्",
    threat_label: "कठिन-परिस्थितिः सङ्कटं च",
    action_label: "स्वीकृता नीतिः कार्यं च",
    outcome_label: "परिणामः निष्कर्षश्च",
    modern_heading: "अद्य भवतः कृते अस्य कः अर्थः",
    dilemma_label: "समान-आधुनिक-व्यापार-दुविधा",
    lesson_label: "मुख्य-शिक्षा / नीतिः",
    action_now_label: "अद्य करणीयः व्यावहारिक-उपायः",
    listen_btn: "शृण्वन्तु",
    copy_btn: "प्रतिलिपिं कुर्वन्तु",
    inspect_btn: "पश्यन्तु"
  }
};

// Render Results Cards
function renderPredictionResults(data) {
  const container = document.getElementById('results-container');
  const results = data.results || [];
  const lbl = cardLabels[currentLang] || cardLabels['en'];

  if (results.length === 0) {
    container.innerHTML = `
      <div class="glass-panel rounded-2xl p-8 text-center text-slate-400 space-y-2">
        <i class="fa-solid fa-inbox text-3xl text-amber-500/50"></i>
        <h4 class="text-white font-cinzel text-lg">No Matching Story Found</h4>
        <p class="text-xs">Try rephrasing your challenge with a few more words.</p>
      </div>
    `;
    return;
  }

  let html = '';

  // Low relevance warning banner if query was out-of-domain
  if (data.is_low_relevance) {
    html += `
      <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 flex items-start gap-3 text-xs">
        <i class="fa-solid fa-triangle-exclamation text-amber-400 text-base mt-0.5"></i>
        <div>
          <strong class="font-bold text-amber-500">Moderate Relevance Match (${data.highest_score.toFixed(3)})</strong>:
          This problem has some similarity, but might fall slightly outside our current 50 core epic case studies.
        </div>
      </div>
    `;
  }

  // Header summary banner
  html += `
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
      <div>
        <h3 class="font-cinzel text-lg font-bold text-white flex items-center gap-2">
          <i class="fa-solid fa-star text-amber-400"></i>
          ${currentLang === 'ta' ? 'உங்கள் பிரச்சினைக்கு உகந்த மகாபாரத பாடங்கள்' : (currentLang === 'hi' ? 'आपकी समस्या के लिए सर्वोत्तम महाभारत सीख' : 'Best Matching Mahabharata Lessons for Your Problem')}
        </h3>
        <p class="text-xs text-slate-400">Hover over dotted Sanskrit words for simple explanations</p>
      </div>
      <div class="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
        ${results.length} Strategic Stories Recommended
      </div>
    </div>
  `;

  // Render each result card
  results.forEach((caseItem, idx) => {
    const rank = idx + 1;
    const scorePct = caseItem.match_percentage || (caseItem.final_score * 100).toFixed(1);
    
    // Character pill badges
    const characterBadges = (caseItem.characters || []).map(char => {
      const style = characterStyles[char] || { bg: 'bg-slate-800', text: 'text-slate-500', border: 'border-slate-700', icon: 'fa-user' };
      return `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium ${style.bg} ${style.text} border ${style.border}">
          <i class="fa-solid ${style.icon} text-[10px]"></i>
          ${char}
        </span>
      `;
    }).join('');

    html += `
      <article class="glass-panel rounded-2xl border border-amber-500/25 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden transition-all hover:border-amber-500/50">
        
        <!-- Top Metadata & Score Row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          
          <div class="space-y-1.5">
            <div class="flex items-center gap-2.5 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase bg-amber-500 text-slate-950">
                #${rank} ${lbl.best_match}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-500 border border-slate-700">
                ${enrichSanskritText(caseItem.parva)} • ${caseItem.adhyaya_or_section || 'Section'}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-500 border border-cyan-500/50">
                ${caseItem.problem_category}
              </span>
            </div>
            
            <h4 class="text-xl sm:text-2xl font-bold font-cinzel text-white flex items-center gap-2 pt-1">
              ${enrichSanskritText(caseItem.episode)}
            </h4>
          </div>

          <!-- Score Gauge Badge -->
          <div class="flex items-center gap-3 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-amber-500/50">
            <div class="text-right">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${lbl.match_score}</div>
              <div class="text-lg font-black font-cinzel text-amber-400 leading-none">${scorePct}%</div>
            </div>
            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-amber-500/15 border border-amber-500/40 text-amber-500 font-bold text-xs">
              <i class="fa-solid fa-bullseye"></i>
            </div>
          </div>

        </div>

        <!-- Character Roster -->
        <div class="flex items-center gap-2 flex-wrap text-xs">
          <span class="text-slate-400 font-semibold text-[11px] uppercase tracking-wider mr-1">${lbl.key_people}</span>
          ${characterBadges || `<span class="text-slate-500">${lbl.unspecified}</span>`}
        </div>

        <!-- 2-Column Comparative Matrix -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
          
          <!-- Column 1: Epic Historical Precedent -->
          <div class="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-4">
            <div class="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
              <i class="fa-solid fa-shield-halved"></i>
              ${lbl.story_heading}
            </div>

            <!-- Situation & Challenge -->
            <div>
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                ${lbl.threat_label}
              </span>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                ${enrichSanskritText(caseItem.strategic_challenge || caseItem.situation_description)}
              </p>
            </div>

            <!-- Tactical Strategy -->
            <div class="bg-amber-950/20 p-3.5 rounded-lg border border-amber-500/20">
              <span class="text-[11px] font-bold text-amber-500 uppercase tracking-wide block mb-1 flex items-center gap-1.5">
                <i class="fa-solid fa-arrow-turn-down"></i> ${lbl.action_label}
              </span>
              <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                ${enrichSanskritText(caseItem.strategy_or_action)}
              </p>
            </div>

            <!-- Outcome -->
            <div>
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">${lbl.outcome_label}</span>
              <p class="text-xs text-slate-500 leading-relaxed">
                ${enrichSanskritText(caseItem.outcome)}
              </p>
            </div>

          </div>

          <!-- Column 2: Modern Enterprise Application -->
          <div class="p-5 rounded-xl bg-slate-900/70 border border-cyan-500/20 space-y-4">
            <div class="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
              <i class="fa-solid fa-briefcase"></i>
              ${lbl.modern_heading}
            </div>

            <!-- Modern Problem Match -->
            <div>
              <span class="text-[11px] font-bold text-cyan-400/90 uppercase tracking-wide block mb-1">
                ${lbl.dilemma_label}
              </span>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                ${enrichSanskritText(caseItem.contemporary_problem)}
              </p>
            </div>

            <!-- Core Insight -->
            <div class="bg-cyan-950/20 p-3.5 rounded-lg border border-cyan-500/20">
              <span class="text-[11px] font-bold text-cyan-500 uppercase tracking-wide block mb-1 flex items-center gap-1.5">
                <i class="fa-solid fa-lightbulb"></i> ${lbl.lesson_label}
              </span>
              <p class="text-xs sm:text-sm text-cyan-100/90 leading-relaxed font-medium">
                ${enrichSanskritText(caseItem.strategic_insight)}
              </p>
            </div>

            <!-- Contemporary Application -->
            <div>
              <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-wide block mb-1 flex items-center gap-1.5">
                <i class="fa-solid fa-rocket"></i> ${lbl.action_now_label}
              </span>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                ${enrichSanskritText(caseItem.contemporary_application)}
              </p>
            </div>

          </div>

        </div>

        <!-- Footer Verification, Action Toolbar & Citation -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 pt-3 border-t border-slate-800/60">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-circle-check text-emerald-400"></i>
            <span class="truncate max-w-[340px]">${caseItem.source_verification_status || 'Source checked against Ganguli translation; Sacred Texts Archive'}</span>
          </div>
          
          <div class="flex items-center gap-2 flex-wrap">
            <button onclick="readStoryAloud(${caseItem.id})" class="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95" title="Listen to this lesson via speech">
              <i class="fa-solid fa-volume-high text-[11px]"></i>
              <span>${lbl.listen_btn}</span>
            </button>
            <button onclick="copyStrategicMatrix(${caseItem.id})" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95">
              <i class="fa-regular fa-copy text-[11px]"></i>
              <span>${lbl.copy_btn}</span>
            </button>
            <button onclick="openCaseModal(${caseItem.id})" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition-all active:scale-95">
              <i class="fa-solid fa-expand text-[10px]"></i>
              <span>${lbl.inspect_btn}</span>
            </button>
            ${caseItem.source_url ? `
              <a href="${caseItem.source_url}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 font-bold flex items-center gap-1.5 transition-all">
                <span>Sacred Texts</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            ` : ''}
          </div>
        </div>

      </article>
    `;
  });

  container.innerHTML = html;
}

// Render Epic Case Archive Cards
function renderArchiveGrid(cases) {
  const grid = document.getElementById('archive-grid');
  const countBadge = document.getElementById('archive-count-badge');
  countBadge.textContent = `${cases.length} Stories Available`;

  if (cases.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500">
        <i class="fa-solid fa-filter-circle-xmark text-3xl mb-2"></i>
        <p>No stories match your search criteria.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = cases.map(c => {
    return `
      <div onclick="openCaseModal(${c.id})" class="glass-card rounded-2xl p-5 cursor-pointer flex flex-col justify-between space-y-4">
        <div class="space-y-2">
          <div class="flex items-center justify-between text-[11px]">
            <span class="px-2 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-500 border border-amber-500/25">
              Story #${c.id} • ${enrichSanskritText(c.parva)}
            </span>
            <span class="text-slate-400 font-mono text-[10px]">
              ${c.adhyaya_or_section || ''}
            </span>
          </div>
          
          <h4 class="font-cinzel font-bold text-white text-base leading-snug line-clamp-2 hover:text-amber-500 transition-colors">
            ${enrichSanskritText(c.episode)}
          </h4>
          
          <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">
            ${enrichSanskritText(c.strategic_challenge || c.situation_description)}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span class="text-[11px] text-cyan-400 font-medium truncate max-w-[180px]">
            ${c.problem_category}
          </span>
          <span class="text-amber-400 font-semibold text-xs flex items-center gap-1">
            Read Lesson <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </span>
        </div>
      </div>
    `;
  }).join('');
}

// Archive search/filter logic
function filterArchiveCases() {
  const query = document.getElementById('archive-search').value.toLowerCase();
  const selectedParva = document.getElementById('archive-parva-filter').value;
  const selectedCat = document.getElementById('archive-category-filter').value;

  const filtered = allCases.filter(c => {
    const matchesSearch = !query || 
      c.episode.toLowerCase().includes(query) ||
      c.situation_description.toLowerCase().includes(query) ||
      c.strategic_insight.toLowerCase().includes(query) ||
      c.contemporary_problem.toLowerCase().includes(query) ||
      (c.characters || []).some(char => char.toLowerCase().includes(query));

    const matchesParva = !selectedParva || c.parva === selectedParva;
    const matchesCat = !selectedCat || c.problem_category === selectedCat;

    return matchesSearch && matchesParva && matchesCat;
  });

  renderArchiveGrid(filtered);
}

// Open Detailed Modal
function openCaseModal(caseId) {
  const caseItem = allCases.find(c => c.id === caseId);
  if (!caseItem) return;

  document.getElementById('modal-parva-badge').innerHTML = `${enrichSanskritText(caseItem.parva)} • Story #${caseItem.id}`;
  document.getElementById('modal-title').innerHTML = enrichSanskritText(caseItem.episode);
  document.getElementById('modal-section').textContent = `${caseItem.adhyaya_or_section || ''} | Category: ${caseItem.problem_category}`;

  const charPills = (caseItem.characters || []).map(char => {
    const style = characterStyles[char] || { bg: 'bg-slate-800', text: 'text-slate-500', border: 'border-slate-700', icon: 'fa-user' };
    return `<span class="px-2.5 py-1 rounded-lg text-xs font-medium ${style.bg} ${style.text} border ${style.border}"><i class="fa-solid ${style.icon} mr-1 text-[10px]"></i>${char}</span>`;
  }).join(' ');

  document.getElementById('modal-body').innerHTML = `
    <div>
      <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1.5">Key People</span>
      <div class="flex flex-wrap gap-2">${charPills || '<span class="text-slate-500">None listed</span>'}</div>
    </div>

    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
      <span class="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
        <i class="fa-solid fa-scroll"></i> What Happened in the Story
      </span>
      <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${enrichSanskritText(caseItem.situation_description)}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
        <span class="text-xs font-bold text-amber-500 uppercase tracking-wide">⚔️ The Core Problem</span>
        <p class="text-xs text-slate-500 leading-relaxed">${enrichSanskritText(caseItem.strategic_challenge)}</p>
      </div>

      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
        <span class="text-xs font-bold text-amber-500 uppercase tracking-wide">🏹 Action Taken</span>
        <p class="text-xs text-slate-500 leading-relaxed">${enrichSanskritText(caseItem.strategy_or_action)}</p>
      </div>
    </div>

    <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2">
      <span class="text-xs font-bold text-amber-400 uppercase tracking-wide">🏆 Result / Outcome</span>
      <p class="text-xs text-slate-200 leading-relaxed">${enrichSanskritText(caseItem.outcome)}</p>
    </div>

    <div class="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
      <span class="text-xs font-bold text-cyan-500 uppercase tracking-wide">💡 Key Lesson</span>
      <p class="text-xs text-cyan-100 font-medium leading-relaxed">${enrichSanskritText(caseItem.strategic_insight)}</p>
    </div>

    <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-wide">🚀 Practical Action Today</span>
      <p class="text-xs text-emerald-100 leading-relaxed">${enrichSanskritText(caseItem.contemporary_application)}</p>
    </div>

    <div class="text-xs text-slate-400 border-t border-slate-800 pt-3 flex flex-wrap justify-between items-center gap-3">
      <div class="flex items-center gap-2">
        <button onclick="readStoryAloud(${caseItem.id})" class="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1.5 transition-all text-xs active:scale-95 shadow-sm">
          <i class="fa-solid fa-volume-high"></i>
          <span>Listen in ${langFriendlyNames[currentLang] || 'Voice'}</span>
        </button>
        <span class="text-slate-500">|</span>
        <span>${caseItem.source_verification_status || 'Verified BORI Critical Edition'}</span>
      </div>
      ${caseItem.source_url ? `<a href="${caseItem.source_url}" target="_blank" class="text-amber-400 hover:underline flex items-center gap-1">Read Sanskrit Translation <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></a>` : ''}
    </div>
  `;

  document.getElementById('case-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('case-modal').classList.add('hidden');
}

function openGlossaryModal() {
  document.getElementById('glossary-modal').classList.remove('hidden');
}

function closeGlossaryModal() {
  document.getElementById('glossary-modal').classList.add('hidden');
}

// Live Battlefield Embers and Floating Spark Canvas Animation
function initHeroEmberCanvas() {
  const canvas = document.getElementById('hero-ember-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth || 800;
    height = canvas.height = canvas.parentElement.offsetHeight || 300;
  }
  resize();
  window.addEventListener('resize', resize);

  const particleCount = 45;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 0.8,
      speedX: (Math.random() - 0.5) * 1.2 - 0.4,
      speedY: -(Math.random() * 1.5 + 0.6),
      alpha: Math.random() * 0.7 + 0.3,
      alphaChange: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      hue: Math.random() > 0.3 ? (Math.random() * 20 + 35) : (Math.random() * 25 + 10) // Golden amber to fiery orange
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha += p.alphaChange;

      if (p.alpha <= 0.1 || p.alpha >= 0.9) {
        p.alphaChange = -p.alphaChange;
      }

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
      ctx.shadowBlur = p.size * 4;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 55%, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }
  render();
}

// Global Ambient Floating Cosmic Stars, Constellations, and Shooting Stars
function initAmbientBackgroundCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  let shootingStars = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const starCount = 70;
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      baseAlpha: Math.random() * 0.45 + 0.15,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.4 ? (Math.random() * 25 + 35) : (Math.random() * 40 + 190) // Golden amber & cyan cosmic stars
    });
  }

  function spawnShootingStar() {
    if (shootingStars.length < 2 && Math.random() < 0.018) {
      shootingStars.push({
        x: Math.random() * width * 0.8 + width * 0.1,
        y: Math.random() * height * 0.4,
        length: Math.random() * 90 + 50,
        speed: Math.random() * 6 + 7,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw Constellation Lines between nearby stars
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.12;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Render Stars
    stars.forEach(s => {
      s.x += s.speedX;
      s.y += s.speedY;
      s.twinklePhase += s.twinkleSpeed;

      if (s.x < 0) s.x = width;
      if (s.x > width) s.x = 0;
      if (s.y < 0) s.y = height;
      if (s.y > height) s.y = 0;

      const alpha = s.baseAlpha + Math.sin(s.twinklePhase) * 0.2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue}, 95%, 65%, ${Math.max(0.05, alpha)})`;
      ctx.shadowBlur = s.size * 3;
      ctx.shadowColor = `hsla(${s.hue}, 90%, 60%, ${Math.max(0.1, alpha)})`;
      ctx.fill();
    });

    // Spawn & Render Shooting Stars
    spawnShootingStar();
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      const endX = ss.x - Math.cos(ss.angle) * ss.length;
      const endY = ss.y - Math.sin(ss.angle) * ss.length;

      const grad = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
      grad.addColorStop(0, `rgba(254, 240, 138, ${ss.alpha})`);
      grad.addColorStop(0.3, `rgba(245, 158, 11, ${ss.alpha * 0.6})`);
      grad.addColorStop(1, `rgba(245, 158, 11, 0)`);

      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.alpha -= ss.decay;

      if (ss.alpha <= 0 || ss.x > width + 100 || ss.y > height + 100) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }
  render();
}

// Live Hero Backdrop Scene Switcher
function switchHeroScene(sceneNum) {
  const img = document.getElementById('hero-img');
  const sunGlow = document.getElementById('hero-sun-glow');
  const btn1 = document.getElementById('scene-btn-1');
  const btn2 = document.getElementById('scene-btn-2');

  if (!img) return;

  if (sceneNum === 1) {
    img.src = '/images/hero_chariot.jpg';
    img.className = 'animated-horses w-full h-full object-cover object-center opacity-40 filter saturate-150 transition-all duration-700';
    if (sunGlow) sunGlow.style.display = 'block';
    
    if (btn1 && btn2) {
      btn1.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500/20 border border-amber-500/40 text-amber-300 transition-all flex items-center gap-1.5 shadow-sm';
      btn2.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1.5';
    }
  } else {
    img.src = '/images/council_strategy.jpg';
    img.className = 'animated-horses w-full h-full object-cover object-center opacity-40 filter saturate-130 transition-all duration-700';
    if (sunGlow) sunGlow.style.display = 'none';

    if (btn1 && btn2) {
      btn2.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500/20 border border-amber-500/40 text-amber-300 transition-all flex items-center gap-1.5 shadow-sm';
      btn1.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1.5';
    }
  }
}

// ========================================================
// VOICE MODE: SPEECH-TO-TEXT & TEXT-TO-SPEECH CONTROLLER
// ========================================================

let recognition = null;
let isListening = false;
let isSpeaking = false;

// Language code to Web Speech Recognition BCP-47 locale mapping
const speechLangMap = {
  'sa': 'sa-IN',
  'en': 'en-IN',
  'hi': 'hi-IN',
  'ta': 'ta-IN',
  'te': 'te-IN',
  'kn': 'kn-IN',
  'ml': 'ml-IN',
  'bn': 'bn-IN',
  'mr': 'mr-IN',
  'gu': 'gu-IN',
  'or': 'or-IN',
  'pa': 'pa-IN'
};

const langFriendlyNames = {
  'sa': 'Sanskrit (संस्कृतम्)',
  'en': 'English',
  'hi': 'Hindi (हिन्दी)',
  'ta': 'Tamil (தமிழ்)',
  'te': 'Telugu (తెలుగు)',
  'kn': 'Kannada (ಕನ್ನಡ)',
  'ml': 'Malayalam (മലയാളം)',
  'bn': 'Bengali (বাংলা)',
  'mr': 'Marathi (मराठी)',
  'gu': 'Gujarati (ગુજરાતી)',
  'or': 'Odia (ଓଡ଼ିଆ)',
  'pa': 'Punjabi (ਪੰਜਾਬੀ)'
};

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return null;
  }

  const rec = new SpeechRecognition();
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 1;

  rec.onstart = () => {
    isListening = true;
    updateVoiceUIState(true);
    showToast(`🎙️ Microphone Active: Listening in ${langFriendlyNames[currentLang] || currentLang}...`);
  };

  rec.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const queryInput = document.getElementById('query-input');
    const existing = queryInput.getAttribute('data-pre-voice-text') || '';
    
    if (finalTranscript || interimTranscript) {
      queryInput.value = (existing ? existing + ' ' : '') + finalTranscript + (interimTranscript ? ' ' + interimTranscript : '');
      const clearBtn = document.getElementById('clear-query-btn');
      if (clearBtn) clearBtn.classList.remove('hidden');
    }
  };

  rec.onerror = (event) => {
    console.warn('Speech recognition error:', event.error);
    if (event.error === 'not-allowed') {
      showToast('⚠️ Microphone permission blocked. Please enable microphone access.');
    }
    stopVoiceInput();
  };

  rec.onend = () => {
    isListening = false;
    updateVoiceUIState(false);
  };

  return rec;
}

function toggleVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('⚠️ Speech recognition is not supported on this browser. Try Google Chrome, Edge, or Safari.');
    return;
  }

  if (isListening) {
    stopVoiceInput();
  } else {
    startVoiceInput();
  }
}

function startVoiceInput() {
  if (!recognition) {
    recognition = initSpeechRecognition();
  }
  if (!recognition) return;

  const queryInput = document.getElementById('query-input');
  queryInput.setAttribute('data-pre-voice-text', queryInput.value.trim());

  // Set recognition language matching dropdown
  const targetLocale = speechLangMap[currentLang] || 'en-IN';
  recognition.lang = targetLocale;

  try {
    recognition.start();
  } catch (err) {
    console.error('Error starting recognition:', err);
    recognition.stop();
    setTimeout(() => {
      try { recognition.start(); } catch(e) {}
    }, 200);
  }
}

function stopVoiceInput() {
  if (recognition) {
    try {
      recognition.stop();
    } catch (err) {}
  }
  isListening = false;
  updateVoiceUIState(false);
}

function updateVoiceUIState(listening) {
  const btn = document.getElementById('voice-input-btn');
  const btnIcon = document.getElementById('voice-btn-icon');
  const btnText = document.getElementById('voice-btn-text');
  const statusBar = document.getElementById('voice-status-bar');
  const statusLabel = document.getElementById('voice-status-label');

  if (listening) {
    if (btn) btn.classList.add('mic-recording');
    if (btnIcon) btnIcon.className = 'fa-solid fa-microphone-lines text-red-400';
    if (btnText) btnText.textContent = 'Listening... (Click to Stop)';
    if (statusBar) statusBar.classList.remove('hidden');
    if (statusLabel) {
      statusLabel.textContent = `Listening in ${langFriendlyNames[currentLang] || 'your language'}... Speak your challenge clearly`;
    }
  } else {
    if (btn) btn.classList.remove('mic-recording');
    if (btnIcon) btnIcon.className = 'fa-solid fa-microphone text-amber-400';
    if (btnText) btnText.textContent = 'Voice Mode (Speak Problem)';
    if (statusBar) statusBar.classList.add('hidden');
  }
}

// Multilingual Speech Narrator Generator
function getNarrativeTextForCase(caseItem, lang) {
  const ep = caseItem.episode;
  const insight = caseItem.strategic_insight;
  const action = caseItem.contemporary_application;

  switch (lang) {
    case 'sa':
      return `महाभारतस्य प्रसंगः: ${ep}। मुख्य-नीति-शिक्षा: ${insight}। अद्यतन-व्यावहारिक-उपायः: ${action}`;
    case 'hi':
      return `महाभारत प्रसंग: ${ep}। मुख्य रणनीतिक सीख: ${insight}। आज का व्यावहारिक कदम: ${action}`;
    case 'ta':
      return `மகாபாரத நிகழ்வு: ${ep}. முக்கிய வியூக பாடம்: ${insight}. இன்றைய நடைமுறை நடவடிக்கை: ${action}`;
    case 'te':
      return `మహాభారత కథ: ${ep}. ప్రధాన వ్యూహాత్మక పాఠం: ${insight}. నేటి ఆచరణాత్మక చర్య: ${action}`;
    case 'kn':
      return `ಮಹಾಭಾರತ ಕಥೆ: ${ep}. ಪ್ರಮುಖ ವ್ಯೂಹಾತ್ಮಕ ಪಾಠ: ${insight}. ಇಂದಿನ ಪ್ರಾಯೋಗಿಕ ಕ್ರಮ: ${action}`;
    case 'ml':
      return `മഹാഭാരത കഥ: ${ep}. പ്രധാന തന്ത്രപരമായ പാഠം: ${insight}. ഇന്നത്തെ പ്രായോഗിക നടപടി: ${action}`;
    case 'bn':
      return `মহাভারতের কাহিনী: ${ep}। মূল রণকৌশলগত শিক্ষা: ${insight}। আজকের বাস্তবসম্মত পদক্ষেপ: ${action}`;
    case 'mr':
      return `महाभारत प्रसंग: ${ep}। मुख्य रणनीतिक शिकवण: ${insight}। आजचे व्यावहारिक पाऊल: ${action}`;
    case 'gu':
      return `મહાભારત પ્રસંગ: ${ep}. મુખ્ય વ્યુહાત્મક બોધ: ${insight}. આજનું વ્યવહારુ પગલું: ${action}`;
    case 'or':
      return `ମହାଭାରତ ପ୍ରସଙ୍ଗ: ${ep}। ମୁଖ୍ୟ ରଣନୀତିକ ଶିକ୍ଷା: ${insight}। ଆଜିର ବ୍ୟାବହାରିକ ପଦକ୍ଷେପ: ${action}`;
    case 'pa':
      return `ਮਹਾਭਾਰਤ ਪ੍ਰਸੰਗ: ${ep}। ਮੁੱਖ ਰਣਨੀਤਕ ਸਬਕ: ${insight}। ਅੱਜ ਦਾ ਅਮਲੀ ਕਦਮ: ${action}`;
    default:
      return `Mahabharata Strategic Episode: ${ep}. Core Strategic Insight: ${insight}. Practical Modern Application: ${action}`;
  }
}

// Text-to-Speech: Narrate Strategic Wisdom in Active Language
function readStoryAloud(caseId) {
  if (!('speechSynthesis' in window)) {
    showToast('⚠️ Speech synthesis is not supported on this browser.');
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    showToast('⏹️ Voice narration stopped.');
    return;
  }

  const caseItem = allCases.find(c => c.id === caseId);
  if (!caseItem) return;

  const textToSpeak = getNarrativeTextForCase(caseItem, currentLang);
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.rate = 0.92;
  utterance.pitch = 1.0;

  // Pick voice locale based on active language
  const targetLocale = speechLangMap[currentLang] || 'en-IN';
  utterance.lang = targetLocale;

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang === targetLocale || v.lang.replace('_', '-').startsWith(targetLocale.split('-')[0]));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    isSpeaking = true;
    showToast(`🔊 Speaking in ${langFriendlyNames[currentLang] || currentLang} (Story #${caseItem.id})... (Click again to Stop)`);
  };

  utterance.onend = () => {
    isSpeaking = false;
  };

  utterance.onerror = () => {
    isSpeaking = false;
  };

  window.speechSynthesis.speak(utterance);
}

// Preload voices when browser loads them asynchronously
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

