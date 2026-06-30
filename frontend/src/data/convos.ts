import type { LanguageCode } from './courses';

type Turn = { s: string; target: string; rom: string; en: string };
type Convo = { id: number; title: string; emoji: string; turns: Turn[] };

const ALL_CONVOS: Record<LanguageCode, Convo[]> = {
  zh: [
    { id:1, title:'Meeting Someone New', emoji:'🤝', turns:[
      { s:'A', target:'你好！我叫李明。', rom:'Nǐ hǎo! Wǒ jiào Lǐ Míng.', en:'Hello! My name is Li Ming.' },
      { s:'B', target:'你好！很高兴认识你。', rom:'Nǐ hǎo! Hěn gāoxìng rènshi nǐ.', en:'Hello! Nice to meet you.' },
      { s:'A', target:'你是学生吗？', rom:'Nǐ shì xuéshēng ma?', en:'Are you a student?' },
      { s:'B', target:'是的，我是大学生。你呢？', rom:'Shì de, wǒ ...', en:"Yes, I'm a university student. And you?" },
    ]},
    { id:2, title:'At a Restaurant', emoji:'🍽️', turns:[
      { s:'A', target:'请问，你们有什么菜？', rom:'Qǐngwèn, nǐmen yǒu shénme cài?', en:'Excuse me, what dishes do you have?' },
      { s:'B', target:'我们有炒饭、面条和饺子。', rom:'Wǒmen yǒu chǎofàn, miàntiáo hé jiǎozi.', en:'We have fried rice, noodles, and dumplings.' },
      { s:'A', target:'我要一碗炒饭。多少钱？', rom:'Wǒ yào yī wǎn chǎofàn. Duōshǎo qián?', en:'I want a bowl of fried rice. How much?' },
      { s:'B', target:'二十块钱。', rom:'Èrshí kuài qián.', en:'Twenty yuan.' },
    ]},
    { id:3, title:'Asking for Directions', emoji:'🗺️', turns:[
      { s:'A', target:'请问，地铁站在哪里？', rom:'Qǐngwèn, dìtiě zhàn zài nǎlǐ?', en:'Where is the subway station?' },
      { s:'B', target:'在前面，走五分钟。', rom:'Zài qiánmiàn, zǒu wǔ fēnzhōng.', en:"It's ahead, a five-minute walk." },
      { s:'A', target:'谢谢你！', rom:'Xièxie nǐ!', en:'Thank you!' },
    ]},
    { id:4, title:'Talking About Weather', emoji:'☀️', turns:[
      { s:'A', target:'今天天气怎么样？', rom:'Jīntiān tiānqì zěnmeyàng?', en:"How's the weather today?" },
      { s:'B', target:'今天天气很好，阳光明媚。', rom:'Jīntiān tiānqì hěn hǎo.', en:"Today's weather is great!" },
      { s:'A', target:'我们去公园吧。', rom:'Wǒmen qù gōngyuán ba.', en:"Let's go to the park." },
    ]},
    { id:5, title:'Shopping at the Market', emoji:'🛍️', turns:[
      { s:'A', target:'这个苹果多少钱？', rom:'Zhège píngguǒ duōshǎo qián?', en:'How much is this apple?' },
      { s:'B', target:'三块钱一个。', rom:'Sān kuài qián yī gè.', en:'Three yuan each.' },
      { s:'A', target:'我买三个。', rom:'Wǒ mǎi sān gè.', en:'I will buy three.' },
      { s:'B', target:'好的，一共九块钱。', rom:'Hǎo de, yīgòng jiǔ kuài qián.', en:'Okay, nine yuan in total.' },
    ]},
  ],
  es: [
    { id:1, title:'Meeting Someone New', emoji:'🤝', turns:[
      { s:'A', target:'¡Hola! Me llamo Carlos.', rom:'Oh-lah! Meh yah-moh Kar-los.', en:'Hello! My name is Carlos.' },
      { s:'B', target:'¡Hola! Mucho gusto. Yo soy Ana.', rom:'Oh-lah! Moo-choh goos-toh. Yoh soy Ah-nah.', en:'Hello! Nice to meet you. I am Ana.' },
      { s:'A', target:'¿Eres estudiante?', rom:'Eh-res es-too-dee-ahn-teh?', en:'Are you a student?' },
      { s:'B', target:'Sí, soy universitaria. ¿Y tú?', rom:'See, soy oo-nee-vehr-see-tah-ree-ah. Ee too?', en:'Yes, I am a university student. And you?' },
    ]},
    { id:2, title:'At a Restaurant', emoji:'🍽️', turns:[
      { s:'A', target:'¿Qué tiene el menú hoy?', rom:'Keh tee-eh-neh el meh-noo oy?', en:"What's on the menu today?" },
      { s:'B', target:'Tenemos paella, ensalada y tapas.', rom:'Teh-neh-mos pah-eh-yah, en-sah-lah-dah ee tah-pas.', en:'We have paella, salad, and tapas.' },
      { s:'A', target:'Quiero la paella. ¿Cuánto cuesta?', rom:'Kee-eh-roh lah pah-eh-yah. Kwahn-toh kwes-tah?', en:'I want the paella. How much is it?' },
      { s:'B', target:'Cuesta doce euros.', rom:'Kwes-tah doh-seh eh-oo-ros.', en:'It costs twelve euros.' },
    ]},
    { id:3, title:'Asking for Directions', emoji:'🗺️', turns:[
      { s:'A', target:'Perdón, ¿dónde está la estación?', rom:'Pehr-don, don-deh es-tah lah es-tah-see-on?', en:'Excuse me, where is the station?' },
      { s:'B', target:'Está a cinco minutos caminando.', rom:'Es-tah ah seen-koh mee-noo-tos kah-mee-nahn-doh.', en:"It's a five-minute walk." },
      { s:'A', target:'¡Muchas gracias!', rom:'Moo-chas grah-see-as!', en:'Thank you very much!' },
    ]},
    { id:4, title:'Talking About Weather', emoji:'☀️', turns:[
      { s:'A', target:'¿Qué tiempo hace hoy?', rom:'Keh tee-em-poh ah-seh oy?', en:"What's the weather like today?" },
      { s:'B', target:'Hace mucho sol hoy.', rom:'Ah-seh moo-choh sol oy.', en:"It's very sunny today." },
      { s:'A', target:'¡Perfecto! Vamos al parque.', rom:'Pehr-fek-toh! Vah-mos al par-keh.', en:'Perfect! Let\'s go to the park.' },
    ]},
    { id:5, title:'Shopping at the Market', emoji:'🛍️', turns:[
      { s:'A', target:'¿Cuánto cuesta esta manzana?', rom:'Kwan-to kwes-ta es-ta man-za-na?', en:'How much is this apple?' },
      { s:'B', target:'Tres euros cada una.', rom:'Tres eh-oo-ros kah-da oo-na.', en:'Three euros each.' },
      { s:'A', target:'Compro tres.', rom:'Kom-pro tres.', en:'I buy three.' },
      { s:'B', target:'Muy bien, son nueve euros en total.', rom:'Mwee byen, son nweh-veh eh-oo-ros en toh-tal.', en:'Very well, that is nine euros in total.' },
    ]},
  ],
  fr: [
    { id:1, title:'Meeting Someone New', emoji:'🤝', turns:[
      { s:'A', target:'Bonjour ! Je m\'appelle Pierre.', rom:'Bon-zhoor! Zhuh mah-pel Pee-air.', en:'Hello! My name is Pierre.' },
      { s:'B', target:'Bonjour ! Enchanté. Je suis Marie.', rom:'Bon-zhoor! Ahn-shahn-teh. Zhuh swee Mah-ree.', en:'Hello! Nice to meet you. I am Marie.' },
      { s:'A', target:'Vous êtes étudiante ?', rom:'Voo zet eh-tyoo-dee-ahnt?', en:'Are you a student?' },
      { s:'B', target:'Oui, je suis à l\'université. Et vous ?', rom:'Wee, zhuh swee ah luh-nee-vehr-see-teh. Eh voo?', en:'Yes, I am at university. And you?' },
    ]},
    { id:2, title:'At a Restaurant', emoji:'🍽️', turns:[
      { s:'A', target:'Qu\'avez-vous au menu aujourd\'hui ?', rom:'Kah-veh-voo oh muh-nyoo oh-zhoor-dwee?', en:"What do you have on the menu today?" },
      { s:'B', target:'Nous avons du coq au vin et du fromage.', rom:'Noo zah-von dyoo kok oh van eh dyoo froh-mazh.', en:'We have coq au vin and cheese.' },
      { s:'A', target:'Je voudrais le coq au vin. C\'est combien ?', rom:'Zhuh voo-dreh luh kok oh van. Seh kom-bee-an?', en:'I would like the coq au vin. How much?' },
      { s:'B', target:'C\'est quinze euros.', rom:'Seh kanz uh-ro.', en:'It is fifteen euros.' },
    ]},
    { id:3, title:'Asking for Directions', emoji:'🗺️', turns:[
      { s:'A', target:'Excusez-moi, où est la gare ?', rom:'Ek-skyoo-zeh-mwah, oo eh lah gar?', en:'Excuse me, where is the station?' },
      { s:'B', target:'C\'est à quint minutes à pied.', rom:'Seh tah sank mee-nyoot ah pee-yeh.', en:"It's a five-minute walk." },
      { s:'A', target:'Merci beaucoup !', rom:'Mehr-see boh-koo!', en:'Thank you very much!' },
    ]},
    { id:4, title:'Talking About Weather', emoji:'☀️', turns:[
      { s:'A', target:'Quel temps fait-il aujourd\'hui ?', rom:'Kel tahn feh-teel oh-zhoor-dwee?', en:"What's the weather like today?" },
      { s:'B', target:'Il fait très beau aujourd\'hui.', rom:'Eel feh treh boh oh-zhoor-dwee.', en:"It's very nice today." },
      { s:'A', target:'Super ! Allons au parc.', rom:'Syoo-pehr! Ah-lon oh park.', en:"Super! Let's go to the park." },
    ]},
    { id:5, title:'Shopping at the Market', emoji:'🛍️', turns:[
      { s:'A', target:'Combien coûte cette pomme ?', rom:'Kom-byan koot set pom?', en:'How much is this apple?' },
      { s:'B', target:'Trois euros pièce.', rom:'Trwah zuh-ro pyes.', en:'Three euros each.' },
      { s:'A', target:"J'en achète trois.", rom:'Zhan ah-shet trwah.', en:'I buy three.' },
      { s:'B', target:'D\'accord, cela fait neuf euros en tout.', rom:'Dah-kor, suh-la feh nuhf uh-ro ahn too.', en:'Okay, that is nine euros in total.' },
    ]},
  ],
  de: [
    { id:1, title:'Meeting Someone New', emoji:'🤝', turns:[
      { s:'A', target:'Hallo! Ich heiße Max.', rom:'Hah-loh! Ikh hay-suh Maks.', en:'Hello! My name is Max.' },
      { s:'B', target:'Hallo! Freut mich. Ich bin Anna.', rom:'Hah-loh! Froyt mikh. Ikh bin Ah-nah.', en:'Hello! Nice to meet you. I am Anna.' },
      { s:'A', target:'Bist du Student?', rom:'Bist doo Shtoo-dent?', en:'Are you a student?' },
      { s:'B', target:'Ja, ich studiere an der Uni. Und du?', rom:'Yah, ikh shtoo-dee-ruh an dehr Oo-nee. Oont doo?', en:'Yes, I study at university. And you?' },
    ]},
    { id:2, title:'At a Restaurant', emoji:'🍽️', turns:[
      { s:'A', target:'Was haben Sie heute auf der Karte?', rom:'Vas hah-ben Zee hoy-tuh owf dehr Kar-tuh?', en:"What do you have on the menu today?" },
      { s:'B', target:'Wir haben Schnitzel, Suppe und Salat.', rom:'Veer hah-ben Shnit-sel, Zup-uh oont Zah-lat.', en:'We have schnitzel, soup, and salad.' },
      { s:'A', target:'Ich nehme das Schnitzel. Was kostet es?', rom:'Ikh neh-muh das Shnit-sel. Vas kos-tet es?', en:"I'll have the schnitzel. How much is it?" },
      { s:'B', target:'Das kostet zwölf Euro.', rom:'Das kos-tet tsverlf Oy-roh.', en:'It costs twelve euros.' },
    ]},
    { id:3, title:'Asking for Directions', emoji:'🗺️', turns:[
      { s:'A', target:'Entschuldigung, wo ist der Bahnhof?', rom:'Ent-shool-dee-goong, voh ist dehr Ban-hof?', en:'Excuse me, where is the train station?' },
      { s:'B', target:'Er ist fünf Minuten zu Fuß entfernt.', rom:'Ehr ist fyoonf Mee-noo-ten tsoo Foos ent-fehrnt.', en:"It's a five-minute walk." },
      { s:'A', target:'Vielen Dank!', rom:'Fee-len Dahnk!', en:'Many thanks!' },
    ]},
    { id:4, title:'Talking About Weather', emoji:'☀️', turns:[
      { s:'A', target:'Wie ist das Wetter heute?', rom:'Vee ist das Vet-er hoy-tuh?', en:"What's the weather like today?" },
      { s:'B', target:'Es ist sehr sonnig heute.', rom:'Es ist zehr zo-nikh hoy-tuh.', en:"It's very sunny today." },
      { s:'A', target:'Super! Lass uns in den Park gehen.', rom:'Zoo-pehr! Las oons in den Park geh-en.', en:"Super! Let's go to the park." },
    ]},
    { id:5, title:'Shopping at the Market', emoji:'🛍️', turns:[
      { s:'A', target:'Wie viel kostet dieser Apfel?', rom:'Vee feel kos-tet dee-zer Ap-fel?', en:'How much is this apple?' },
      { s:'B', target:'Drei Euro pro Stück.', rom:'Dray Oy-ro pro Shtyook.', en:'Three euros each.' },
      { s:'A', target:'Ich kaufe drei.', rom:'Ikh kow-fuh dray.', en:'I buy three.' },
      { s:'B', target:'In Ordnung, das macht insgesamt neun Euro.', rom:'In Ord-noong, das makht in-ges-amt noyn Oy-ro.', en:'All right, that is nine euros in total.' },
    ]},
  ],
  ja: [
    { id:1, title:'Meeting Someone New', emoji:'🤝', turns:[
      { s:'A', target:'こんにちは！田中と申します。', rom:'Konnichiwa! Tanaka to mōshimasu.', en:'Hello! My name is Tanaka.' },
      { s:'B', target:'こんにちは！はじめまして。佐藤です。', rom:'Konnichiwa! Hajimemashite. Satō desu.', en:'Hello! Nice to meet you. I am Sato.' },
      { s:'A', target:'学生ですか？', rom:'Gakusei desu ka?', en:'Are you a student?' },
      { s:'B', target:'はい、大学生です。あなたは？', rom:'Hai, daigakusei desu. Anata wa?', en:'Yes, I am a university student. And you?' },
    ]},
    { id:2, title:'At a Restaurant', emoji:'🍽️', turns:[
      { s:'A', target:'すみません、メニューを見せてください。', rom:'Sumimasen, menyū o misete kudasai.', en:'Excuse me, please show me the menu.' },
      { s:'B', target:'ラーメン、寿司、天ぷらがあります。', rom:'Rāmen, sushi, tenpura ga arimasu.', en:'We have ramen, sushi, and tempura.' },
      { s:'A', target:'ラーメンをください。いくらですか？', rom:'Rāmen o kudasai. Ikura desu ka?', en:"I'll have ramen. How much is it?" },
      { s:'B', target:'八百円です。', rom:'Happyaku-en desu.', en:'It is 800 yen.' },
    ]},
    { id:3, title:'Asking for Directions', emoji:'🗺️', turns:[
      { s:'A', target:'すみません、駅はどこですか？', rom:'Sumimasen, eki wa doko desu ka?', en:'Excuse me, where is the station?' },
      { s:'B', target:'歩いて五分です。', rom:'Aruite gofun desu.', en:"It's a five-minute walk." },
      { s:'A', target:'ありがとうございます！', rom:'Arigatō gozaimasu!', en:'Thank you very much!' },
    ]},
    { id:4, title:'Talking About Weather', emoji:'☀️', turns:[
      { s:'A', target:'今日の天气はどうですか？', rom:'Kyō no tenki wa dō desu ka?', en:"What's the weather like today?" },
      { s:'B', target:'今日はとても晴れています。', rom:'Kyō wa totemo harete imasu.', en:"It's very sunny today." },
      { s:'A', target:'公園に行きましょう！', rom:'Kōen ni ikimashō!', en:"Let's go to the park!" },
    ]},
    { id:5, title:'Shopping at the Market', emoji:'🛍️', turns:[
      { s:'A', target:'このりんごはいくらですか？', rom:'Kono ringo wa ikura desu ka?', en:'How much is this apple?' },
      { s:'B', target:'一個三百円です。', rom:'Ikko sanbyaku en desu.', en:'It is 300 yen each.' },
      { s:'A', target:'三個買います。', rom:'Sanko kaimasu.', en:'I buy three.' },
      { s:'B', target:'はい、全部で九百円です。', rom:'Hai, zenbu de kyūbyaku en desu.', en:'Yes, 900 yen in total.' },
    ]},
  ],
  ko: [
    { id:1, title:'Meeting Someone New', emoji:'🤝', turns:[
      { s:'A', target:'안녕하세요! 저는 민준이에요.', rom:'Annyeonghaseyo! Jeoneun Minjun-ieyo.', en:'Hello! I am Minjun.' },
      { s:'B', target:'안녕하세요! 반갑습니다. 저는 지수예요.', rom:'Annyeonghaseyo! Bangapseumnida. Jeoneun Jisu-yeyo.', en:'Hello! Nice to meet you. I am Jisu.' },
      { s:'A', target:'학생이에요?', rom:'Haksaeng-ieyo?', en:'Are you a student?' },
      { s:'B', target:'네, 대학생이에요. 당신은요?', rom:'Ne, daehaksaeng-ieyo. Dangsin-eunyo?', en:'Yes, I am a university student. And you?' },
    ]},
    { id:2, title:'At a Restaurant', emoji:'🍽️', turns:[
      { s:'A', target:'메뉴 좀 보여주세요.', rom:'Menyu jom boyeojuseyo.', en:'Please show me the menu.' },
      { s:'B', target:'비빔밥, 불고기, 김치찌개가 있어요.', rom:'Bibimbap, bulgogi, kimchijjigae-ga isseoyo.', en:'We have bibimbap, bulgogi, and kimchi stew.' },
      { s:'A', target:'비빔밥 주세요. 얼마예요?', rom:'Bibimbap juseyo. Eolma-yeyo?', en:"I'll have bibimbap. How much is it?" },
      { s:'B', target:'만 원이에요.', rom:'Man won-ieyo.', en:'It is 10,000 won.' },
    ]},
    { id:3, title:'Asking for Directions', emoji:'🗺️', turns:[
      { s:'A', target:'저기요, 지하철역이 어디에요?', rom:'Jeogiyo, jihacheol-yeogeun eodi-eyo?', en:'Excuse me, where is the subway station?' },
      { s:'B', target:'걸어서 오 분이에요.', rom:'Georeoseo o bun-ieyo.', en:"It's a five-minute walk." },
      { s:'A', target:'감사합니다!', rom:'Gamsahamnida!', en:'Thank you!' },
    ]},
    { id:4, title:'Talking About Weather', emoji:'☀️', turns:[
      { s:'A', target:'오늘 날씨 어때요?', rom:'Oneul nalsi eottaeyo?', en:"What's the weather like today?" },
      { s:'B', target:'오늘 날씨가 정말 좋아요.', rom:'Oneul nalssiga jeongmal johayo.', en:"Today's weather is really nice." },
      { s:'A', target:'공원에 가요!', rom:'Gongwon-e gayo!', en:"Let's go to the park!" },
    ]},
    { id:5, title:'Shopping at the Market', emoji:'🛍️', turns:[
      { s:'A', target:'이 사과는 얼마예요?', rom:'I sagwa-neun eolma-yeyo?', en:'How much is this apple?' },
      { s:'B', target:'한 개에 삼천 원이에요.', rom:'Han gae-e samcheon won-ieyo.', en:'It is 3,000 won each.' },
      { s:'A', target:'세 개 살게요.', rom:'Se gae salgeyo.', en:'I will buy three.' },
      { s:'B', target:'네, 전부 구천 원이에요.', rom:'Ne, jeonbu gucheon won-ieyo.', en:'Yes, 9,000 won in total.' },
    ]},
  ],
  it: [
    { id:1, title:'Meeting Someone New', emoji:'🤝', turns:[
      { s:'A', target:'Ciao! Mi chiamo Marco.', rom:'Chah-oh! Mee kyah-moh Mar-koh.', en:'Hello! My name is Marco.' },
      { s:'B', target:'Ciao! Piacere. Sono Laura.', rom:'Chah-oh! Pyah-cheh-reh. Soh-noh Lah-oo-rah.', en:'Hello! Pleased to meet you. I am Laura.' },
      { s:'A', target:'Sei studentessa?', rom:'Seh-ee stoo-den-tes-sah?', en:'Are you a student?' },
      { s:'B', target:'Sì, sono all\'università. E tu?', rom:'See, soh-noh al-loo-nee-vehr-see-tah. Eh too?', en:'Yes, I am at university. And you?' },
    ]},
    { id:2, title:'At a Restaurant', emoji:'🍽️', turns:[
      { s:'A', target:'Cosa avete oggi nel menù?', rom:'Koh-zah ah-veh-teh od-jee nel meh-nyoo?', en:"What do you have on the menu today?" },
      { s:'B', target:'Abbiamo pasta, pizza e risotto.', rom:'Ah-byah-moh pas-tah, pee-tsah eh ree-zot-toh.', en:'We have pasta, pizza, and risotto.' },
      { s:'A', target:'Vorrei la pasta. Quanto costa?', rom:'Vor-reh-ee lah pas-tah. Kwahn-toh kos-tah?', en:'I would like pasta. How much is it?' },
      { s:'B', target:'Costa dieci euro.', rom:'Kos-tah dee-eh-chee eh-oo-roh.', en:'It costs ten euros.' },
    ]},
    { id:3, title:'Asking for Directions', emoji:'🗺️', turns:[
      { s:'A', target:'Scusi, dov\'è la stazione?', rom:'Skoo-zee, doh-veh lah stah-tsyoh-neh?', en:'Excuse me, where is the station?' },
      { s:'B', target:'È a cinque minuti a piedi.', rom:'Eh ah cheen-kweh mee-noo-tee ah pyeh-dee.', en:"It's a five-minute walk." },
      { s:'A', target:'Grazie mille!', rom:'Grah-tsyeh meel-leh!', en:'Thank you very much!' },
    ]},
    { id:4, title:'Talking About Weather', emoji:'☀️', turns:[
      { s:'A', target:'Com\'è il tempo oggi?', rom:'Koh-meh eel tem-poh od-jee?', en:"What's the weather like today?" },
      { s:'B', target:'Oggi c\'è molto sole.', rom:'Od-jee cheh mol-toh soh-leh.', en:"Today it's very sunny." },
      { s:'A', target:'Perfetto! Andiamo al parco.', rom:'Pehr-fet-toh! Ahn-dyah-moh al par-koh.', en:"Perfect! Let's go to the park." },
    ]},
    { id:5, title:'Shopping at the Market', emoji:'🛍️', turns:[
      { s:'A', target:'Quanto costa questa mela?', rom:'Kwanto kosta kwesta mela?', en:'How much is this apple?' },
      { s:'B', target:'Tre euro l\'una.', rom:'Tre eh-oo-ro loona.', en:'Three euros each.' },
      { s:'A', target:'Ne compro tre.', rom:'Ne kom-pro tre.', en:'I buy three.' },
      { s:'B', target:'Va bene, sono nove euro in totale.', rom:'Va bene, sono nweh-veh eh-oo-ro in toh-tale.', en:'Okay, that\'s nine euros in total.' },
    ]},
  ],
  en: [
    { id:1, title:'Meeting Someone New', emoji:'🤝', turns:[
      { s:'A', target:'Hello! My name is James.', rom:'HEH-loh! My NAYM iz Jaymz.', en:'Hello! My name is James.' },
      { s:'B', target:'Hi! Nice to meet you. I\'m Sophie.', rom:'HY! NYS tuh MEET yoo. Aym SOH-fee.', en:"Hi! Nice to meet you. I'm Sophie." },
      { s:'A', target:'Are you a student?', rom:'Ar yoo uh STOO-dent?', en:'Are you a student?' },
      { s:'B', target:'Yes, I\'m studying at university. And you?', rom:'Yes, Aym STU-dee-ing at yoo-nih-VUR-sih-tee. And yoo?', en:"Yes, I'm studying at university. And you?" },
    ]},
    { id:2, title:'At a Restaurant', emoji:'🍽️', turns:[
      { s:'A', target:'What do you recommend today?', rom:'Wut duh yoo REK-uh-mend tuh-DAY?', en:'What do you recommend today?' },
      { s:'B', target:'Our fish and chips is very popular.', rom:'OW-er Fish and Chips iz VEH-ree POP-yuh-ler.', en:'Our fish and chips is very popular.' },
      { s:'A', target:'I\'ll have that, please. How much is it?', rom:'Ayl HAV that, pleez. How Much IZ it?', en:"I'll have that, please. How much is it?" },
      { s:'B', target:'It\'s twelve pounds.', rom:'Its TWELVF POWNDZ.', en:"It's twelve pounds." },
    ]},
    { id:3, title:'Asking for Directions', emoji:'🗺️', turns:[
      { s:'A', target:'Excuse me, where is the train station?', rom:'Ek-SKYOOZ mee, WAIR iz thuh TRAYN STAY-shun?', en:'Excuse me, where is the train station?' },
      { s:'B', target:'It\'s a five-minute walk straight ahead.', rom:'Its uh FYV-MIN-it WOK strayt uh-HED.', en:"It's a five-minute walk straight ahead." },
      { s:'A', target:'Thank you so much!', rom:'THANGK yoo soh MUCH!', en:'Thank you so much!' },
    ]},
    { id:4, title:'Talking About Weather', emoji:'☀️', turns:[
      { s:'A', target:'What\'s the weather like today?', rom:'Wuts thuh WEH-ther lyk tuh-DAY?', en:"What's the weather like today?" },
      { s:'B', target:'It\'s lovely and sunny!', rom:'Its LUV-lee and SUN-ee!', en:"It's lovely and sunny!" },
      { s:'A', target:'Great! Let\'s go to the park.', rom:'GRAYT! Lets GOH tuh thuh PARK.', en:"Great! Let's go to the park." },
    ]},
    { id:5, title:'Shopping at the Market', emoji:'🛍️', turns:[
      { s:'A', target:'How much is this apple?', rom:'How much iz this ap-pul?', en:'How much is this apple?' },
      { s:'B', target:'Three dollars each.', rom:'Three dol-lerz eech.', en:'Three dollars each.' },
      { s:'A', target:'I will buy three.', rom:'Ay wil by three.', en:'I will buy three.' },
      { s:'B', target:'Okay, that is nine dollars in total.', rom:'Oh-kay, that iz nyn dol-lerz in toh-tul.', en:'Okay, that is nine dollars in total.' },
    ]},
  ],
  ar: [
    { id:1, title:'Meeting Someone New', emoji:'🤝', turns:[
      { s:'A', target:'مرحباً! اسمي يوسف.', rom:'Marhaban! Ismi Youssef.', en:'Hello! My name is Youssef.' },
      { s:'B', target:'مرحباً! تشرفت بمعرفتك. أنا سارة.', rom:'Marhaban! Tasharraftu bi-ma\'rifatik. Ana Sarah.', en:'Hello! Nice to meet you. I am Sarah.' },
      { s:'A', target:'هل أنت طالب؟', rom:'Hal anta talib?', en:'Are you a student?' },
      { s:'B', target:'نعم، أنا طالبة جامعية. وأنت؟', rom:'Na\'am, ana talibah jami\'iyyah. Wa anta?', en:'Yes, I am a university student. And you?' },
    ]},
    { id:2, title:'At a Restaurant', emoji:'🍽️', turns:[
      { s:'A', target:'من فضلك، ماذا يوجد في القائمة اليوم؟', rom:'Min fadlik, mada yujad fi al-qa\'imah al-yawm?', en:"Excuse me, what is on the menu today?" },
      { s:'B', target:'لدينا كبسة، سلطة ومقبلات.', rom:'Ladayna kabsa, salatah wa muqabbilat.', en:'We have kabsa, salad, and appetizers.' },
      { s:'A', target:'أريد الكبسة. كم سعرها؟', rom:'Urid al-kabsa. Kam si\'ruha?', en:'I want the kabsa. How much is it?' },
      { s:'B', target:'سعرها خمسة عشر ريالاً.', rom:'Si\'ruha khamsata \'ashar riyalan.', en:'It costs fifteen riyals.' },
    ]},
    { id:3, title:'Asking for Directions', emoji:'🗺️', turns:[
      { s:'A', target:'عذراً، أين المحطة؟', rom:'\'Udran, ayna al-mahattah?', en:'Excuse me, where is the station?' },
      { s:'B', target:'إنها على بعد خمس دقائق سيراً.', rom:'Innaha \'ala bu\'di khams daqa\'iq sayran.', en:"It's a five-minute walk." },
      { s:'A', target:'شكراً جزيلاً!', rom:'Shukran jazilan!', en:'Thank you very much!' },
    ]},
    { id:4, title:'Talking About Weather', emoji:'☀️', turns:[
      { s:'A', target:'كيف حال الطقس اليوم؟', rom:'Kayfa hal al-taqs al-yawm?', en:"How's the weather today?" },
      { s:'B', target:'الطقس مشمس جداً اليوم.', rom:'Al-taqs mushmis jiddan al-yawm.', en:"It's very sunny today." },
      { s:'A', target:'رائع! لنذهب إلى الحديقة.', rom:'Ra\'i\'! Linadhab ila al-hadiqah.', en:"Great! Let's go to the park." },
    ]},
    { id:5, title:'Shopping at the Market', emoji:'🛍️', turns:[
      { s:'A', target:'كم سعر هذه التفاحة؟', rom:'Kam si\'ru hadihi al-tuffahah?', en:'How much is this apple?' },
      { s:'B', target:'ثلاثة ريالات للواحدة.', rom:'Thalathatu riyalatin lil-wahidah.', en:'Three riyals each.' },
      { s:'A', target:'سأشتري ثلاثة.', rom:'Sa-ashtari thalathah.', en:'I will buy three.' },
      { s:'B', target:'حسناً، المجموع تسعة ريالات.', rom:'Hasanan, al-majmu\' tis\'atu riyalatin.', en:'Okay, nine riyals in total.' },
    ]},
  ],
};

export function getConvos(lang: LanguageCode = 'zh'): Convo[] {
  return ALL_CONVOS[lang] ?? ALL_CONVOS.zh;
}

export const CONVOS = ALL_CONVOS.zh;
