import type { LanguageCode } from './courses';

export type LessonSentence = { target: string; rom: string; en: string };

const LESSON_SENTENCES: Record<LanguageCode, Record<number, LessonSentence[]>> = {
  zh: {
    101: [
      { target: '你好', rom: 'nǐ hǎo', en: 'hello' },
      { target: '你好吗', rom: 'nǐ hǎo ma', en: 'how are you' },
      { target: '早上好', rom: 'zǎoshang hǎo', en: 'good morning' },
    ],
    102: [
      { target: '我是学生', rom: 'wǒ shì xuéshēng', en: 'I am a student' },
      { target: '他是老师', rom: 'tā shì lǎoshī', en: 'he is a teacher' },
      { target: '你叫什么名字', rom: 'nǐ jiào shénme míngzi', en: 'what is your name' },
    ],
    103: [
      { target: '谢谢你', rom: 'xièxie nǐ', en: 'thank you' },
      { target: '再见朋友', rom: 'zàijiàn péngyou', en: 'goodbye friend' },
      { target: '不客气', rom: 'bú kèqi', en: 'you are welcome' },
    ],
    201: [
      { target: '一二三', rom: 'yī èr sān', en: 'one two three' },
      { target: '我有五个苹果', rom: 'wǒ yǒu wǔ ge píngguǒ', en: 'I have five apples' },
    ],
    202: [
      { target: '今天是星期一', rom: 'jīntiān shì xīngqīyī', en: 'today is Monday' },
      { target: '明天是星期二', rom: 'míngtiān shì xīngqī' + 'èr', en: 'tomorrow is Tuesday' },
    ],
    203: [
      { target: '现在几点', rom: 'xiànzài jǐ diǎn', en: 'what time is it now' },
      { target: '早上八点', rom: 'zǎoshang bā diǎn', en: 'eight o\'clock in the morning' },
    ],
    301: [
      { target: '这是我爸爸', rom: 'zhè shì wǒ bàba', en: 'this is my father' },
      { target: '我爱我妈妈', rom: 'wǒ ài wǒ māma', en: 'I love my mother' },
    ],
    302: [
      { target: '她很漂亮', rom: 'tā hěn piàoliang', en: 'she is very beautiful' },
      { target: '我们很高兴', rom: 'wǒmen hěn gāoxìng', en: 'we are very happy' },
    ],
    401: [
      { target: '我喝水', rom: 'wǒ hē shuǐ', en: 'I drink water' },
      { target: '他吃面条', rom: 'tā chī miàntiáo', en: 'he eats noodles' },
    ],
    402: [
      { target: '我要饭', rom: 'wǒ yào fàn', en: 'I want rice' },
      { target: '这个多少钱', rom: 'zhè ge duōshao qián', en: 'how much is this' },
    ],
    901: [
      { target: '我们明天需要谈判合同合作项目', rom: 'wǒmen míngtiān xūyào tánpàn hétong hézuò xiàngmù', en: 'We need to negotiate the contract for the partnership project tomorrow' },
      { target: '这是这次商务会议的主要议程', rom: 'zhè shì zhè cì shāngwù huìyì de zhǔyào yìchéng', en: 'This is the main agenda for this business meeting' }
    ],
    902: [
      { target: '分析市场收入和客户活动非常重要', rom: 'fēnxī shìchǎng shōurù hé kèhù huódòng fēicháng zhòngyào', en: 'Analyzing market revenue and customer campaigns is very important' }
    ],
    1001: [
      { target: '公民通过投票参与民主选举', rom: 'gōngmín tōngguò tóupiào cānyù mínzhǔ xuǎnjǔ', en: 'Citizens participate in democratic elections by voting' }
    ],
    1002: [
      { target: '消除贫困是实现平等和正义的关键政策', rom: 'xiāochú pínkùn shì shíxiàn píngdeltng hé zhèngyì de guānjiàn zhèngcè', en: 'Eradicating poverty is a crucial policy for achieving equality and justice' }
    ],
    1101: [
      { target: '人工智能算法实现了生产自动化', rom: 'réngōng zhìnéng suànfǎ shíxiàn le shēngchǎn zìdònghuà', en: 'Artificial intelligence algorithms have enabled production automation' }
    ],
    1102: [
      { target: '火箭将进入星系轨道探索新的行星', rom: 'huǒjiàn jiāng jìnrù xīngxì guǐdào tànsuò xīn de xíngxīng', en: 'The rocket will enter a galaxy orbit to explore new planets' }
    ],
    1201: [
      { target: '画廊里展示了许多古代的绘画和雕塑杰作', rom: 'huàláng lǐ zhǎnshì le xǔduō gǔdài de huìhuà hé diāosù jiézuò', en: 'The gallery displays many classical painting and sculpture masterpieces' }
    ],
    1202: [
      { target: '作者在这本小说中使用了生动的诗歌隐喻', rom: 'zuòzhě zài zhè běn xiǎoshuō zhōng shǐyòng le shēngdòng de shīgē yǐnyù', en: 'The author used vivid poetic metaphors in this novel' }
    ],
    1301: [
      { target: '儒家和道家思想是中国古代哲学的核心', rom: 'Rújiā hé Dàojiā sīxiǎng shì Zhōngguó gǔdài zhéxué de héxīn', en: 'Confucianism and Taoism are the core of ancient Chinese philosophy.' }
    ],
    1302: [
      { target: '我们在叙事分析中探讨主要象征的意义', rom: 'wǒmen zài xùshì fēnxī zhōng tàntǎo zhǔyào xiàngzhēng de yìyì', en: 'We explore the meaning of main symbols in narrative analysis.' }
    ],
    1401: [
      { target: '宪法是法律诉讼中最重要的辩护依据', rom: 'xiànfǎ shì fǎlǜ sùsòng zhōng zuì zhòngyào de biànhù yījù', en: 'The constitution is the most important defense basis in legal litigation.' }
    ],
    1402: [
      { target: '保护人权和自由是维护平等与尊严的根本', rom: 'bǎohù rénquán hé zìyóu shì wéihù píngděng yǔ zūnyán de gēnběn', en: 'Protecting human rights and freedom is fundamental to maintaining equality and dignity.' }
    ],
    1501: [
      { target: '通胀和贸易对全球经济有重大金融影响', rom: 'tōngzhàng hé màoyì duì quánqiú jīngjì yǒu zhòngdà jīnróng yǐngxiǎng', en: 'Inflation and trade have significant financial impacts on the global economy.' }
    ],
    1502: [
      { target: '股票和债券投资都存在一定的市场风险', rom: 'gǔpiào hé zhàiquàn tóuzī dōu cúnzài yīdìng de shìchǎng fēngxiǎn', en: 'Both stock and bond investments carry certain market risks.' }
    ],
    1601: [
      { target: '为了应对气候变化，我们需要减少排放并重视生态保护', rom: 'wèile yìngduì qìhòu biànhuà, wǒmen xūyào jiǎnshǎo páifàng bìng zhòngshì shēngtài bǎohù', en: 'To cope with climate change, we need to reduce emissions and value ecological protection.' }
    ],
    1602: [
      { target: '基因克隆技术引发了复杂的生物伦理和道德争论', rom: 'jīyīn kèlóng jìshù yǐnfā le fùzá de shēngwù lúnlǐ hé dàodé zhēnglùn', en: 'Gene cloning technology has triggered complex bioethical and moral debates.' }
    ]
  },
  es: {
    101: [
      { target: 'hola', rom: 'OH-lah', en: 'hello' },
      { target: 'buenos días amigo', rom: 'BWEH-nos DEE-as ah-MEE-goh', en: 'good morning friend' },
      { target: 'buenas noches', rom: 'BWEH-nas NOH-ches', en: 'good night' },
    ],
    102: [
      { target: 'soy estudiante', rom: 'soy es-too-DYAHN-teh', en: 'I am a student' },
      { target: 'él es maestro', rom: 'el es mah-ES-troh', en: 'he is a teacher' },
      { target: 'cómo te llamas', rom: 'KOH-moh teh YAH-mas', en: 'what is your name' },
    ],
    103: [
      { target: 'muchas gracias', rom: 'MOO-chas GRAH-syas', en: 'thank you very much' },
      { target: 'adiós amigo', rom: 'ah-DYOS ah-MEE-goh', en: 'goodbye friend' },
      { target: 'por favor', rom: 'por fah-VOR', en: 'please' },
    ],
    201: [
      { target: 'uno dos tres', rom: 'OO-noh dos tres', en: 'one two three' },
      { target: 'tengo cinco manzanas', rom: 'TEN-goh SEEN-coh mahn-ZAH-nas', en: 'I have five apples' },
    ],
    202: [
      { target: 'hoy es lunes', rom: 'oy es LOO-nes', en: 'today is Monday' },
      { target: 'mañana es martes', rom: 'mah-NYAH-nah es MAR-tes', en: 'tomorrow is Tuesday' },
    ],
    203: [
      { target: 'qué hora es', rom: 'keh OH-rah es', en: 'what time is it' },
      { target: 'son las ocho', rom: 'son las OH-choh', en: 'it is eight o\'clock' },
    ],
    301: [
      { target: 'mi padre', rom: 'mee PAH-dreh', en: 'my father' },
      { target: 'amo a mi madre', rom: 'AH-moh ah mee MAH-dreh', en: 'I love my mother' },
    ],
    302: [
      { target: 'ella es muy simpática', rom: 'EH-yah es moy seem-PAH-tee-cah', en: 'she is very friendly' },
      { target: 'estamos muy alegres', rom: 'es-TAH-mos moy ah-LEH-gres', en: 'we are very happy' },
    ],
    401: [
      { target: 'yo bebo agua', rom: 'yoh BEH-boh AH-gwah', en: 'I drink water' },
      { target: 'él come pan', rom: 'el COH-meh pan', en: 'he eats bread' },
    ],
    402: [
      { target: 'quiero la cuenta', rom: 'KYEH-roh lah CWEN-tah', en: 'I want the bill' },
      { target: 'cuánto cuesta esto', rom: 'CWAHN-toh CWES-tah ES-toh', en: 'how much does this cost' }
    ],
    901: [
      { target: 'Necesitamos negociar el contrato de colaboración mañana.', rom: 'Ne-ce-si-ta-mos ne-goh-syar el con-trah-toh deh coh-lah-boh-rah-syon mah-nyah-nah.', en: 'We need to negotiate the partnership contract tomorrow.' },
      { target: 'Esta es la agenda principal de la reunión de negocios.', rom: 'Es-tah es lah ah-hen-dah preen-cee-pal deh lah rew-nyon deh neh-goh-syos.', en: 'This is the main agenda of the business meeting.' }
    ],
    902: [
      { target: 'Analizar el mercado y la campaña mejora los ingresos.', rom: 'Ah-nah-lee-thar el mehr-cah-doh ee lah cam-pah-nyah meh-ho-rah los een-greh-sos.', en: 'Analyzing the market and the campaign improves the revenue.' }
    ],
    1001: [
      { target: 'Los ciudadanos participan en la democracia al votar en la elección.', rom: 'Los thyoo-dah-dah-nos par-tee-cee-pan en lah deh-moh-crah-thyah al boh-tar en lah eh-lec-syon.', en: 'Citizens participate in democracy by voting in the election.' }
    ],
    1002: [
      { target: 'Reducir la pobreza es una política clave para la justicia y la igualdad.', rom: 'Reh-doo-theer lah poh-breh-thah es oo-nah poh-lee-tee-cah clah-beh pah-rah lah hoos-tee-thyah ee lah ee-gwal-dad.', en: 'Reducing poverty is a key policy for justice and equality.' }
    ],
    1101: [
      { target: 'El algoritmo de inteligencia artificial permite la automatización industrial.', rom: 'El al-goh-reet-moh deh een-teh-lee-hen-thyah ar-tee-fee-thyall pehr-mee-teh lah ow-toh-mah-tee-thah-syon een-doos-tryall.', en: 'The artificial intelligence algorithm enables industrial automation.' }
    ],
    1102: [
      { target: 'El cohete viaja en órbita para explorar planetas en la galaxia.', rom: 'El coh-eh-teh byah-hah en or-bee-tah pah-rah ex-ploh-rar plah-neh-tas en lah gah-lax-yah.', en: 'The rocket travels in orbit to explore planets in the galaxy.' }
    ],
    1201: [
      { target: 'La galería exhibe pinturas clásicas y esculturas maestras.', rom: 'La gah-leh-ree-ah ex-ee-beh peen-too-ras clah-see-cas ee es-cool-too-ras mah-es-tras.', en: 'The gallery exhibits classical paintings and masterpiece sculptures.' }
    ],
    1202: [
      { target: 'El autor utiliza metáforas de poesía en su nueva novela.', rom: 'El ow-tor oo-tee-lee-thah meh-tah-foh-ras deh poh-eh-see-ah en soo nweh-bah noh-beh-lah.', en: 'The author uses poetry metaphors in his new novel.' }
    ],
    1301: [
      { target: 'La filosofía clásica estudia el confucianismo y el taoísmo.', rom: 'Lah fee-loh-soh-fee-ah clah-see-cah es-too-dyah el con-foo-thyah-nees-moh ee el tah-o-ees-moh.', en: 'Classical philosophy studies Confucianism and Taoism.' }
    ],
    1302: [
      { target: 'El análisis literario revela el símbolo y la narrativa.', rom: 'El ah-nah-lee-sees lee-teh-rah-ryoh reh-beh-lah el seem-boh-loh ee lah nah-rah-tee-bah.', en: 'Literary analysis reveals the symbol and the narrative.' }
    ],
    1401: [
      { target: 'La constitución establece la defensa en el litigio de la ley.', rom: 'Lah con-stee-too-thyon es-tah-bleh-theh lah deh-fen-sah en el lee-tee-hyoh deh lah lay.', en: 'The constitution establishes the defense in the litigation of the law.' }
    ],
    1402: [
      { target: 'Defender la libertad y la igualdad protege la dignidad y los derechos humanos.', rom: 'Deh-fen-der lah lee-behr-tad ee lah ee-gwal-dad proh-teh-heh lah deeg-nee-dad ee los deh-reh-chos oo-mah-nos.', en: 'Defending freedom and equality protects human dignity and rights.' }
    ],
    1501: [
      { target: 'La inflación mundial y el comercio determinan la economía y las finanzas.', rom: 'Lah een-flah-thyon moon-dyall ee el coh-mehr-thyoh deh-tehr-mee-nan lah eh-coh-noh-mee-ah ee las fee-nahn-thas.', en: 'Global inflation and trade shape the economy and finance.' }
    ],
    1502: [
      { target: 'La inversión en acciones y bonos siempre conlleva riesgo.', rom: 'Lah een-behr-syon en ac-thyoh-nes ee boh-nos syem-preh cohn-yeh-bah ryes-goh.', en: 'Investing in stocks and bonds always carries risk.' }
    ],
    1601: [
      { target: 'La reducción de emisiones es vital para la ecología y la protección del clima.', rom: 'Lah reh-dooc-thyon deh eh-mee-syoh-nes es bee-tall pah-rah lah eh-coh-loh-hee-ah ee lah proh-tec-thyon del clee-mah.', en: 'Reducing emissions is vital for ecology and climate protection.' }
    ],
    1602: [
      { target: 'La clonación de genes plantea dilemas morales y de bioética.', rom: 'Lah cloh-nah-thyon deh heh-nes plan-teh-ah dee-leh-mas moh-rah-les ee deh byoh-eh-tee-cah.', en: 'Gene cloning poses moral and bioethical dilemmas.' }
    ]
  },
  fr: {
    101: [
      { target: 'bonjour', rom: 'bon-zhoor', en: 'hello / good morning' },
      { target: 'bonjour mon ami', rom: 'bon-zhoor mon ah-mee', en: 'hello my friend' },
      { target: 'bonne nuit', rom: 'bon nwee', en: 'good night' },
    ],
    102: [
      { target: 'je suis étudiant', rom: 'zhuh swee zeh-tyoo-dyahn', en: 'I am a student' },
      { target: 'il est professeur', rom: 'eel eh pro-feh-sur', en: 'he is a teacher' },
      { target: 'comment vous appelez vous', rom: 'ko-mahn voo zah-pleh voo', en: 'what is your name' },
    ],
    103: [
      { target: 'merci beaucoup', rom: 'mair-see boh-koo', en: 'thank you very much' },
      { target: 'au revoir ami', rom: 'oh ruh-vwar ah-mee', en: 'goodbye friend' },
      { target: 's\'il vous plaît', rom: 'seel voo pleh', en: 'please' },
    ],
    201: [
      { target: 'un deux trois', rom: 'un duh trwah', en: 'one two three' },
      { target: 'j\'ai cinq pommes', rom: 'zhay sank pum', en: 'I have five apples' },
    ],
    202: [
      { target: 'aujourd\'hui c\'est lundi', rom: 'oh-zhoor-dwee seh lun-dee', en: 'today is Monday' },
      { target: 'demain c\'est mardi', rom: 'duh-man seh mar-dee', en: 'tomorrow is Tuesday' },
    ],
    203: [
      { target: 'quelle heure est il', rom: 'kel ur eh-teel', en: 'what time is it' },
      { target: 'il est huit heures', rom: 'eel eh weet ur', en: 'it is eight o\'clock' },
    ],
    301: [
      { target: 'mon père', rom: 'mon pair', en: 'my father' },
      { target: 'j\'aime ma mère', rom: 'zhem mah mair', en: 'I love my mother' },
    ],
    302: [
      { target: 'elle est très intelligente', rom: 'el eh tray zahn-teh-lee-zhahnt', en: 'she is very intelligent' },
      { target: 'nous sommes très heureux', rom: 'noo sum tray zuh-ruh', en: 'we are very happy' },
    ],
    401: [
      { target: 'je bois de l\'eau', rom: 'zhuh bwah duh loh', en: 'I drink water' },
      { target: 'il mange du pain', rom: 'eel mahnzh dyoo pan', en: 'he eats bread' },
    ],
    402: [
      { target: 'je voudrais l\'addition', rom: 'zhuh voo-dray lah-dee-syohn', en: 'I would like the bill' },
      { target: 'c\'est combien', rom: 'seh kohm-byan', en: 'how much is it' }
    ],
    901: [
      { target: 'Nous devons négocier le contrat de partenariat demain.', rom: 'Noo duh-vohn nay-go-syay luh kon-trah duh par-tuh-nah-ryah duh-man.', en: 'We need to negotiate the partnership contract tomorrow.' },
      { target: "Voici l'ordre du jour de notre réunion d'affaires.", rom: 'Vwah-see lordr dyoo zhoor duh no-truh ray-yoo-nyohn dah-fair.', en: 'Here is the agenda for our business meeting.' }
    ],
    902: [
      { target: "Analyser le marché permet d'augmenter le revenu.", rom: 'Ah-nah-lee-zay luh mar-shay pair-meh dog-mahn-tay luh ruh-vnoo.', en: 'Analyzing the market helps increase revenue.' }
    ],
    1001: [
      { target: 'Les citoyens participent à la démocratie en votant aux élections.', rom: 'Les see-twah-yan par-tee-seep ah la day-mo-krah-see an vo-tahn o zay-lek-syohn.', en: 'Citizens participate in democracy by voting in elections.' }
    ],
    1002: [
      { target: "L'égalité et la justice sont importantes pour combattre la pauvreté.", rom: 'Lay-gah-lee-tay ay lah zhoo-steess sohn tan-por-tahnt poor cohn-bahtr lah poh-vruh-tay.', en: 'Equality and justice are important for fighting poverty.' }
    ],
    1101: [
      { target: "L'algorithme d'intelligence artificielle gère l'automatisation.", rom: 'Lal-go-reetm dan-teh-lee-zhahns ar-tee-fee-syel zhair lo-to-mah-tee-zah-syohn.', en: 'The artificial intelligence algorithm manages the automation.' }
    ],
    1102: [
      { target: "La fusée est en orbite autour d'une planète de notre galaxie.", rom: 'La fy-zay eh tahn or-beet oh-toor dyn plah-net duh no-truh gah-lahk-see.', en: 'The rocket is in orbit around a planet in our galaxy.' }
    ],
    1201: [
      { target: "Cette galerie présente des peintures et des sculptures classiques.", rom: 'Set gah-luh-ree pray-zahnt day pan-tyur ay day skyl-tyur clah-seek.', en: 'This gallery presents classical paintings and sculptures.' }
    ],
    1202: [
      { target: "L'auteur utilise des métaphores poétiques dans son roman.", rom: 'Loh-tur oo-tee-leez day may-tah-for po-ay-teek dahn sohn ro-mahn.', en: 'The author uses poetic metaphors in his novel.' }
    ],
    1301: [
      { target: 'La philosophie classique examine le confucianisme et le taoïsme.', rom: 'La fee-lo-zo-fee clah-seek eg-zah-meen luh kon-fy-syah-neesm ay luh tah-o-eesm.', en: 'Classical philosophy examines Confucianism and Taoism.' }
    ],
    1302: [
      { target: "L'analyse littéraire identifie le symbole et la critique dans le récit.", rom: 'Lah-nah-leez lee-tay-rair ee-dahn-tee-fee luh san-bol ay lah kree-teek dahn luh ray-see.', en: 'Literary analysis identifies the symbol and criticism in the narrative.' }
    ],
    1401: [
      { target: 'La constitution encadre la défense et le litige selon la loi.', rom: 'Lah kon-stee-tyoo-syohn ahn-cahdr lah day-fahns ay luh lee-teezh suh-lohn lah lwah.', en: 'The constitution frames the defense and litigation under the law.' }
    ],
    1402: [
      { target: "La liberté et l'égalité garantissent la dignité et les droits de l'homme.", rom: 'Lah lee-bair-tay ay lay-gah-lee-tay gah-rahn-teess lah deen-yee-tay ay lay drwah duh lom.', en: 'Freedom and equality guarantee human dignity and rights.' }
    ],
    1501: [
      { target: "L'inflation et le commerce global influencent l'économie et la finance.", rom: 'Lan-flah-syohn ay luh co-mairss glo-bal an-fly-ahns lay-co-no-mee ay lah fee-nahns.', en: 'Inflation and global trade influence the economy and finance.' }
    ],
    1502: [
      { target: "L'investissement en actions et en obligations comporte un risque.", rom: 'Lan-veh-stees-mahn ahn nahk-syohn ay ahn no-blee-gah-syohn cohn-port uh reesk.', en: 'Investing in stocks and bonds carries a risk.' }
    ],
    1601: [
      { target: "La protection du climat nécessite de réduire les émissions pour l'écologie.", rom: 'La pro-tek-syohn dyoo clee-mah nay-seh-seet duh ray-dweer lay-ay-mee-syohn poor lay-co-lo-zhee.', en: 'Climate protection requires reducing emissions for ecology.' }
    ],
    1602: [
      { target: 'Le clonage des gènes soulève des questions de morale et de bioéthique.', rom: 'Luh clo-nahzh day zhen soo-lev day kes-tyohn duh mo-rahl ay duh byo-ay-teek.', en: 'Gene cloning raises moral and bioethical questions.' }
    ]
  },
  de: {
    101: [
      { target: 'Hallo', rom: 'HAH-loh', en: 'hello' },
      { target: 'Guten Morgen mein Freund', rom: 'GOO-ten MOR-gen mayn froynt', en: 'good morning my friend' },
      { target: 'Gute Nacht', rom: 'GOO-teh nakht', en: 'good night' },
    ],
    102: [
      { target: 'Ich bin Student', rom: 'ikh bin shtoo-DENT', en: 'I am a student' },
      { target: 'Er ist Lehrer', rom: 'ehr ist LAY-rer', en: 'he is a teacher' },
      { target: 'Wie heißen Sie', rom: 'vee HAY-sen zee', en: 'what is your name' },
    ],
    103: [
      { target: 'Vielen Dank', rom: 'FEE-len dank', en: 'thank you very much' },
      { target: 'Tschüss mein Freund', rom: 'tshuess mayn froynt', en: 'goodbye my friend' },
      { target: 'Bitte schön', rom: 'BIT-teh shoen', en: 'you are welcome / please' },
    ],
    201: [
      { target: 'eins zwei drei', rom: 'ayns tsvay dray', en: 'one two three' },
      { target: 'Ich habe fünf Äpfel', rom: 'ikh HAH-beh fuenf AEP-fel', en: 'I have five apples' },
    ],
    202: [
      { target: 'Heute ist Montag', rom: 'HOY-teh ist MOHN-tahk', en: 'today is Monday' },
      { target: 'Morgen ist Dienstag', rom: 'MOR-gen ist DEENS-tahk', en: 'tomorrow is Tuesday' },
    ],
    203: [
      { target: 'Wie spät ist es', rom: 'vee shpaet ist es', en: 'what time is it' },
      { target: 'Es ist acht Uhr', rom: 'es ist akht oor', en: 'it is eight o\'clock' },
    ],
    301: [
      { target: 'Mein Vater', rom: 'mayn FAH-ter', en: 'my father' },
      { target: 'Ich liebe meine Mutter', rom: 'ikh LEE-beh MAY-neh MOOT-ter', en: 'I love my mother' },
    ],
    302: [
      { target: 'Sie ist sehr nett', rom: 'zee ist zair net', en: 'she is very nice' },
      { target: 'Wir sind sehr glücklich', rom: 'veer zint zair GLOEK-likh', en: 'we are very happy' },
    ],
    401: [
      { target: 'Ich trinke Wasser', rom: 'ikh TRIN-keh VAS-er', en: 'I drink water' },
      { target: 'Er isst Brot', rom: 'ehr ist broht', en: 'he eats bread' },
    ],
    402: [
      { target: 'Ich möchte die Rechnung', rom: 'ikh MOEKH-teh dee REKH-nung', en: 'I would like the bill' },
      { target: 'Wie viel kostet das', rom: 'vee feel KOS-tet das', en: 'how much does that cost' }
    ],
    901: [
      { target: 'Wir müssen morgen den Vertrag für die Partnerschaft verhandeln.', rom: 'Veer muessen mor-gen den fer-trahk fuer dee part-ner-shaft fer-han-deln.', en: 'We have to negotiate the contract for the partnership tomorrow.' }
    ],
    902: [
      { target: 'Die neue Kampagne wird unsere Einnahmen auf dem Markt steigern.', rom: 'Die noy-eh kam-pahn-yuh virt oon-zuh-reh ayn-nah-men owf dem markt shtay-gern.', en: 'The new campaign will increase our revenue in the market.' }
    ],
    1001: [
      { target: 'Bürger stärken die Demokratie, wenn sie bei der Wahl wählen.', rom: 'Buer-ger shtaer-ken dee deh-moh-krah-tee, ven zee bay dehr vahl vae-len.', en: 'Citizens strengthen democracy when they vote in the election.' }
    ],
    1002: [
      { target: 'Gleichheit und Gerechtigkeit lindern die Armut in der Gesellschaft.', rom: 'Glaykh-hyt oont geh-rekh-tikh-kyt lin-dern dee ar-moot in dehr geh-zel-shaft.', en: 'Equality and justice alleviate poverty in society.' }
    ],
    1101: [
      { target: 'Ein intelligenter Algorithmus steuert die Automatisierung.', rom: 'Ayn in-tel-ee-gen-ter al-goh-rit-moos shtoy-ert dee ow-toh-mah-tee-zee-roong.', en: 'An intelligent algorithm controls the automation.' }
    ],
    1102: [
      { target: 'Die Rakete fliegt in eine Umlaufbahn zu einem fernen Planeten.', rom: 'Die rah-kay-teh flieekt in ay-neh oom-lowf-bahn tsoo ay-nem fer-nen plah-nee-ten.', en: 'The rocket flies into an orbit to a distant planet.' }
    ],
    1201: [
      { target: 'In der Galerie gibt es klassische Gemälde und Skulpturen.', rom: 'In dehr gah-luh-ree geept es klas-i-sheh geh-mael-deh oont skoolp-too-ren.', en: 'In the gallery there are classical paintings and sculptures.' }
    ],
    1202: [
      { target: 'Der Autor verwendet in seinem Roman viele Metaphern.', rom: 'Dehr ow-tor fer-ven-det in zay-nem roh-mahn fee-leh meh-tah-fern.', en: 'The author uses many metaphors in his novel.' }
    ],
    1301: [
      { target: 'Die klassische Philosophie befasst sich mit Konfuzianismus und Taoismus.', rom: 'Dee klas-i-sheh fee-lo-zo-fee beh-fast zikh mit kon-foo-tsyah-nis-moos oont tow-is-moos.', en: 'Classical philosophy deals with Confucianism and Taoism.' }
    ],
    1302: [
      { target: 'Die literarische Analyse untersucht Symbole in der Erzählung.', rom: 'Dee lee-teh-rah-ri-sheh ah-nah-lue-zeh oon-ter-zookht zuem-boh-leh in dehr er-tsae-loong.', en: 'Literary analysis examines symbols in the narrative.' }
    ],
    1401: [
      { target: 'Die Verfassung sichert die Verteidigung im Rechtsstreit nach dem Gesetz.', rom: 'Dee fer-fas-soong zee-khert dee fer-ty-dee-goong im rekhts-shtryt nakh dem geh-zets.', en: 'The constitution secures the defense in litigation under the law.' }
    ],
    1402: [
      { target: 'Freiheit und Gleichheit wahren die Würde und die Menschenrechte.', rom: 'Fry-hyt oont glaykh-hyt vah-ren dee wuer-deh oont dee men-shen-rekh-teh.', en: 'Freedom and equality preserve dignity and human rights.' }
    ],
    1501: [
      { target: 'Inflation und globaler Handel beeinflussen Wirtschaft und Finanzen.', rom: 'In-flah-tsyohn oont glo-bah-ler han-del beh-yn-floos-en virt-shaft oont fee-nant-sen.', en: 'Inflation and global trade affect the economy and finance.' }
    ],
    1502: [
      { target: 'Investitionen in Aktien und Anleihen bergen immer ein Risiko.', rom: 'In-ves-tee-tsyoh-nen in ak-tsyen oont an-ly-en behr-gen im-er ayn ree-zee-koh.', en: 'Investments in stocks and bonds always carry a risk.' }
    ],
    1601: [
      { target: 'Der Umweltschutz verlangt geringere Emissionen für unser Klima.', rom: 'Dehr oom-velt-shuts fer-langt geh-ring-uh-reh eh-mee-syoh-nen fuer oon-zer klee-mah.', en: 'Environmental protection demands lower emissions for our climate.' }
    ],
    1602: [
      { target: 'Genklonen wirft schwierige Fragen der Moral und Bioethik auf.', rom: 'Gehn-kloh-nen veerft shvee-ri-geh frah-gen dehr moh-rahl oont bee-oh-ay-tik owf.', en: 'Gene cloning raises difficult questions of morality and bioethics.' }
    ]
  },
  ja: {
    101: [
      { target: 'こんにちは', rom: 'kon-nee-chee-wah', en: 'hello' },
      { target: 'おはようございます', rom: 'oh-hah-yoh go-zah-ee-mas', en: 'good morning' },
      { target: 'おやすみなさい', rom: 'oh-yah-soo-mee-nah-sah-ee', en: 'good night' },
    ],
    102: [
      { target: 'わたしはがくせいです', rom: 'wah-tah-shee wah gahk-seh-ee des', en: 'I am a student' },
      { target: 'かれはせんせいです', rom: 'kah-reh wah sen-seh-ee des', en: 'he is a teacher' },
      { target: 'おなまえはなんですか', rom: 'oh-nah-mah-eh wah nahn des kah', en: 'what is your name' },
    ],
    103: [
      { target: 'どうもありがとう', rom: 'doh-moh ah-ree-gah-toh', en: 'thank you very much' },
      { target: 'さようならともだち', rom: 'sah-yoh-nah-rah toh-moh-dah-chee', en: 'goodbye friend' },
      { target: 'すみません', rom: 'soo-mee-mah-sen', en: 'excuse me / please' },
    ],
    201: [
      { target: 'いちにさん', rom: 'ee-chee nee sahn', en: 'one two three' },
      { target: 'りんごを五つ持っています', rom: 'reen-go oh ee-tsu-tsu mot-te ee-mas', en: 'I have five apples' },
    ],
    202: [
      { target: 'きょうは月曜日です', rom: 'kyoh wa geh-tsu-yoh-bee des', en: 'today is Monday' },
      { target: 'あしたは火曜日です', rom: 'ah-shee-tah wa kah-yoh-bee des', en: 'tomorrow is Tuesday' },
    ],
    203: [
      { target: 'いま何時ですか', rom: 'ee-mah nahn-jee des kah', en: 'what time is it now' },
      { target: 'あさの八時です', rom: 'ah-sah no hah-chee-jee des', en: 'it is eight o\'clock in the morning' },
    ],
    301: [
      { target: 'わたしのちち', rom: 'wah-tah-shee no chee-chee', en: 'my father' },
      { target: 'ははが大好きです', rom: 'hah-hah ga dah-ee-soo-kee des', en: 'I love my mother' },
    ],
    302: [
      { target: '彼女はとても優しいです', rom: 'kah-noh-joh wa toh-teh-moh yah-sah-shee des', en: 'she is very kind' },
      { target: 'わたしたちはとても嬉しいです', rom: 'wah-tah-shee-tah-chee wa toh-teh-moh oo-reh-shee des', en: 'we are very happy' },
    ],
    401: [
      { target: 'わたしは水を飲みます', rom: 'wah-tah-shee wa mee-zoo oh noh-mee-mas', en: 'I drink water' },
      { target: '彼はごはんを食べます', rom: 'kah-reh wa go-hahn oh tah-beh-mas', en: 'he eats rice' },
    ],
    402: [
      { target: 'おかいけいをお願いします', rom: 'oh-kah-ee-keh-ee oh oh-neh-gah-ee shee-mas', en: 'the bill please' },
      { target: 'これはいくらですか', rom: 'ko-reh wa ee-koo-rah des kah', en: 'how much is this' }
    ],
    901: [
      { target: '私たちは明日、提携の契約を交渉する必要があります。', rom: 'Watashitachi wa ashita, teikei no keiyaku o kōshō suru hitsuyō ga arimasu.', en: 'We need to negotiate the partnership contract tomorrow.' }
    ],
    902: [
      { target: '顧客のキャンペーンを分析して収益を増やします。', rom: 'Kokyaku no kyanpēn o bunseki shite shūeki o fuyashimasu.', en: 'We analyze customer campaigns to increase revenue.' }
    ],
    1001: [
      { target: '市民は選挙で投票して民主主義に参加します。', rom: 'Shimin wa senkyo de tōhyō shite minshushugi ni sankashimasu.', en: 'Citizens participate in democracy by voting in elections.' }
    ],
    1002: [
      { target: '貧คงをなくすことは、平等と正義のための重要な政策です。', rom: 'Hinkon o nakusu koto wa, byōdō to seigi no tame no jūyōna seisaku desu.', en: 'Eradicating poverty is an important policy for equality and justice.' }
    ],
    1101: [
      { target: '人工知能のアルゴリズムが自動化を実現します。', rom: 'Jinkō chinō no arugorizumu ga jidōka o jitsugen shimasu.', en: 'Artificial intelligence algorithms make automation possible.' }
    ],
    1102: [
      { target: 'ロケットは軌道に乗って宇宙の惑星を探索します。', rom: 'Roketto wa kidō ni notte uchū no wakusei o tansaku shimasu.', en: 'The rocket goes into orbit to explore planets in space.' }
    ],
    1201: [
      { target: '画廊には古典的な絵画や彫刻の傑作が飾られています。', rom: 'Garō ni wa kotentekina kaiga ya chōkoku no kessaku ga kazararete imasu.', en: 'The gallery is decorated with classical paintings and masterpiece sculptures.' }
    ],
    1202: [
      { target: '著者は小説の中で詩的な比喩表現を使っています。', rom: 'Chosha wa shōsetsu no naka de shitena hiyu hyōgen o tsukatte imasu.', en: 'The author uses poetic metaphor expressions in the novel.' }
    ],
    1301: [
      { target: '古典哲学は儒教と道教の思想を研究します。', rom: 'Koten tetsugaku wa jukyō to dōkyō no shisō o kenkyū shimasu.', en: 'Classical philosophy studies the thoughts of Confucianism and Taoism.' }
    ],
    1302: [
      { target: '文学分析は物語における象徴の意味を明らかにします。', rom: 'Bungaku bunseki wa monogatari ni okeru shōchō no imi o akiraka ni shimasu.', en: 'Literary analysis clarifies the meaning of symbols in the narrative.' }
    ],
    1401: [
      { target: '憲法は法律の訴訟において弁護の基礎となります。', rom: 'Kenpō wa hōritsu no soshō ni oite bengo no kiso to narimasu.', en: 'The constitution is the foundation of defense in legal litigation.' }
    ],
    1402: [
      { target: '自由と平等の精神は人間の尊厳と人権を守ります。', rom: 'Jiyū to byōdō no seishin wa ningen no songen to jinken o mamorimasu.', en: 'The spirit of freedom and equality protects human dignity and rights.' }
    ],
    1501: [
      { target: 'インフレと世界貿易は経済や金融に影響を与えます。', rom: 'Infure to sekai bōeki wa keizai ya kin\'yū ni eikyō o ataemasu.', en: 'Inflation and world trade influence the economy and finance.' }
    ],
    1502: [
      { target: '株式や債券への投資には常に市場リスクが伴います。', rom: 'Kabushiki ya saiken he no tōshi ni wa tsuneni shijō risuku ga tomanaimasu.', en: 'Investing in stocks or bonds always involves market risks.' }
    ],
    1601: [
      { target: '気候変動に対処するため、排出量の削減と環境保護が必要です。', rom: 'Kikō hendō ni taisho suru tame, haishutsuryō no sakugen to kankyōhogo ga hitsuyō desu.', en: 'To address climate change, emissions reduction and environmental protection are necessary.' }
    ],
    1602: [
      { target: '遺伝子クローン技術は倫理的・道徳的な議論を巻き起こしています。', rom: 'Idenshi kurōn gijutsu wa rinriteki dōtokuteki na giron o makiokoshite imasu.', en: 'Gene cloning technology is stirring ethical and moral debates.' }
    ]
  },
  ko: {
    101: [
      { target: '안녕하세요', rom: 'an-nyeong-ha-se-yo', en: 'hello' },
      { target: '좋은 아침입니다', rom: 'jo-eun a-chim-im-ni-da', en: 'good morning' },
      { target: '안녕히 주무세요', rom: 'an-nyeong-hi ju-mu-se-yo', en: 'good night' },
    ],
    102: [
      { target: '저는 학생입니다', rom: 'jeo-neun hak-saeng-im-ni-da', en: 'I am a student' },
      { target: '그는 선생님입니다', rom: 'geu-neun seon-saeng-nim-im-ni-da', en: 'he is a teacher' },
      { target: '이름이 무엇입니까', rom: 'i-reum-i mu-eot-im-ni-kka', en: 'what is your name' },
    ],
    103: [
      { target: '대단히 감사합니다', rom: 'dae-dan-hi gam-sa-ham-ni-da', en: 'thank you very much' },
      { target: '안녕히 가세요 친구', rom: 'an-nyeong-hi ga-se-yo chin-gu', en: 'goodbye friend' },
      { target: '죄송합니다', rom: 'joe-song-ham-ni-da', en: 'sorry' },
    ],
    201: [
      { target: '하나 둘 셋', rom: 'ha-na dul set', en: 'one two three' },
      { target: '사과 다섯 개 있습니다', rom: 'sa-gwa da-seot gae it-seum-ni-da', en: 'I have five apples' },
    ],
    202: [
      { target: '오늘은 월요일입니다', rom: 'o-neul-eun wol-yo-il-im-ni-da', en: 'today is Monday' },
      { target: '내일은 화요일입니다', rom: 'nae-il-eun hwa-yo-il-im-ni-da', en: 'tomorrow is Tuesday' },
    ],
    203: [
      { target: '지금 몇 시입니까', rom: 'ji-geum myeot si-im-ni-kka', en: 'what time is it now' },
      { target: '아침 여덟 시입니다', rom: 'a-chim yeo-deolp si-im-ni-da', en: 'it is eight o\'clock in the morning' },
    ],
    301: [
      { target: '나의 아버지', rom: 'na-ui a-beo-ji', en: 'my father' },
      { target: '어머니를 사랑합니다', rom: 'eo-meo-ni-reul sa-rang-ham-ni-da', en: 'I love my mother' },
    ],
    302: [
      { target: '그녀는 매우 친절합니다', rom: 'geu-nyeo-neun mae-u chin-jeol-ham-ni-da', en: 'she is very kind' },
      { target: '우리는 매우 기쁩니다', rom: 'u-ri-neun mae-u gi-ppeum-ni-da', en: 'we are very happy' },
    ],
    401: [
      { target: '저는 물을 마십니다', rom: 'jeo-neun mul-eul ma-sim-ni-da', en: 'I drink water' },
      { target: '그는 밥을 먹습니다', rom: 'geu-neun bap-eul meok-seum-ni-da', en: 'he eats rice' },
    ],
    402: [
      { target: '계산서 주세요', rom: 'gye-san-seo ju-se-yo', en: 'the bill please' },
      { target: '이것은 얼마입니까', rom: 'i-geot-eun eol-ma-im-ni-kka', en: 'how much is this' }
    ],
    901: [
      { target: '우리는 내일 파트너십 계약을 협상해야 합니다.', rom: 'Urineun naeil pateuneosip gyeyageul hyeopsanghaeya hamnida.', en: 'We need to negotiate the partnership contract tomorrow.' }
    ],
    902: [
      { target: '마케팅 캠페인을 통해 시장 수익을 올립니다.', rom: 'Maketing kaempeineul tonghae sijang suigeul ollimnida.', en: 'We raise market revenue through marketing campaigns.' }
    ],
    1001: [
      { target: '국민은 선거 투표를 통해 민주주의를 실천합니다.', rom: 'Gungmineun seongeo tupyo-reul tonghae minjujuui-reul silcheonhamnida.', en: 'Citizens practice democracy by voting in elections.' }
    ],
    1002: [
      { target: '빈곤 퇴치는 평등과 정의를 실현하는 중요한 정책입니다.', rom: 'Bingon toechineun pyeongdeung-gwa jeongui-reul silhyeonhaneun jungyohan jeongchaegimnida.', en: 'Eradicating poverty is an important policy to realize equality and justice.' }
    ],
    1101: [
      { target: '인공지능 알고리즘이 생산 자동화를 가능하게 합니다.', rom: 'Ingongjineung algorijeumi saengsan jadonghwa-reul ganeunghage hamnida.', en: 'Artificial intelligence algorithms make production automation possible.' }
    ],
    1102: [
      { target: '로켓이 은하 궤도에 진입하여 행성을 탐사합니다.', rom: 'Rokesi eunha gwedoe jiniphayeo haengseongeul tamsahamnida.', en: 'The rocket enters galaxy orbit to explore planets.' }
    ],
    1201: [
      { target: '화랑에 전시된 고전 회화와 조각 걸작품을 감상했습니다.', rom: 'Hwarange jeonsidoen gojeon hoehwawa jogak geoljakpumeul gamsanghaesseumnida.', en: 'I appreciated the classical paintings and masterpiece sculptures exhibited in the gallery.' }
    ],
    1202: [
      { target: '저자는 이 소설에서 시적인 비유를 자주 사용합니다.', rom: 'Jeojaneun i soseleoseo sijeogin biyureul jaju sayonghamnida.', en: 'The author often uses poetic metaphors in this novel.' }
    ],
    1301: [
      { target: '고전 철학은 유교와 도교 사상을 연구합니다.', rom: 'Gojeon cheolhag-eun yugyo-wa dogyo sasang-eul yeongu-hamnida.', en: 'Classical philosophy studies Confucian and Taoist thoughts.' }
    ],
    1302: [
      { target: '문학 분석은 서사 속 상징을 해석합니다.', rom: 'Munhak bunseog-eun seosa sok sangjing-eul haeseok-hamnida.', en: 'Literary analysis interprets symbols in the narrative.' }
    ],
    1401: [
      { target: '헌법은 법률 소송에서 변호의 중요한 근거입니다.', rom: 'Heonbeob-eun beobryul sosong-eseo byeonho-ui jungyo-han geungeo-imnida.', en: 'The constitution is an important basis for defense in lawsuits.' }
    ],
    1402: [
      { target: '자유와 평등을 수호하는 것은 인간의 존엄과 인권을 지키는 길입니다.', rom: 'Jayu-wa pyeongdeung-eul suho-haneun geos-eun ingan-ui joneom-gwa inkwon-eul jikineun gil-imnida.', en: 'Defending freedom and equality is the way to protect human dignity and rights.' }
    ],
    1501: [
      { target: '인플레이션과 세계 무역은 경제와 금융을 움직입니다.', rom: 'Inpleisyeon-gwa segae muyeog-eun gyeongje-wa geumnyung-eul umjig-imnida.', en: 'Inflation and global trade drive the economy and finance.' }
    ],
    1502: [
      { target: '주식과 채권 투자는 언제나 위험 요소를 가지고 있습니다.', rom: 'Jusik-gwa chaegwon tuja-neun eonjena wiheom yoso-reul gajigo isseumnida.', en: 'Investing in stocks and bonds always has risk elements.' }
    ],
    1601: [
      { target: '기후 변화에 맞서기 위해 배출량 감소와 환경 보호에 힘써야 합니다.', rom: 'Gihu byeonhwa-e matseogi wihae baechulryang gamso-wa hwangyeong boho-e himssoya hamnida.', en: 'To combat climate change, we must strive for emission reduction and environmental protection.' }
    ],
    1602: [
      { target: '유전자 복제 연구는 생명윤리와 도덕적 가치에 대한 논란을 불러일으킵니다.', rom: 'Yujeonja bokje yeongu-neun saengmyeong-yunri-wa dodeok-jeok gachi-e daehan nonran-eul bulleo-ireukimnida.', en: 'Gene cloning research triggers controversies regarding bioethics and moral values.' }
    ]
  },
  it: {
    101: [
      { target: 'ciao', rom: 'chow', en: 'hello' },
      { target: 'buongiorno amico mio', rom: 'bwon-JOR-no ah-MEE-co MEE-o', en: 'good morning my friend' },
      { target: 'buonanotte', rom: 'bwo-nah-NOT-teh', en: 'good night' },
    ],
    102: [
      { target: 'sono studente', rom: 'SOH-no stoo-DEN-teh', en: 'I am a student' },
      { target: 'lui è maestro', rom: 'loo-ee eh mah-ES-troh', en: 'he is a teacher' },
      { target: 'come ti chiami', rom: 'KOH-meh tee KYAH-mee', en: 'what is your name' },
    ],
    103: [
      { target: 'grazie mille', rom: 'GRAHT-tsyeh MEEL-leh', en: 'thank you very much' },
      { target: 'arrivederci amico', rom: 'ahr-ree-veh-DEHR-chee ah-MEE-co', en: 'goodbye friend' },
      { target: 'per favore', rom: 'pehr fah-VOH-reh', en: 'please' },
    ],
    201: [
      { target: 'uno due tre', rom: 'OO-no DOO-eh treh', en: 'one two three' },
      { target: 'ho cinque mele', rom: 'oh CHEEN-kweh MEH-leh', en: 'I have five apples' },
    ],
    202: [
      { target: 'oggi è lunedì', rom: 'OD-jee eh loo-neh-DEE', en: 'today is Monday' },
      { target: 'domani è martedì', rom: 'doh-MAH-nee eh mar-teh-DEE', en: 'tomorrow is Tuesday' },
    ],
    203: [
      { target: 'che ora è', rom: 'keh OH-rah eh', en: 'what time is it' },
      { target: 'sono le otto', rom: 'SOH-no leh OT-toh', en: 'it is eight o\'clock' },
    ],
    301: [
      { target: 'mio padre', rom: 'MEE-o PAH-dreh', en: 'my father' },
      { target: 'amo mia madre', rom: 'AH-mo MEE-ah MAH-dreh', en: 'I love my mother' },
    ],
    302: [
      { target: 'lei è molto simpatica', rom: 'lay eh MOL-toh seem-PAH-tee-cah', en: 'she is very friendly' },
      { target: 'siamo molto felici', rom: 'SYAH-mo MOL-toh feh-LEE-chee', en: 'we are very happy' },
    ],
    401: [
      { target: 'io bevo acqua', rom: 'EE-o BEH-vo AHK-wah', en: 'I drink water' },
      { target: 'lui mangia pane', rom: 'loo-ee MAN-jah PAH-neh', en: 'he eats bread' },
    ],
    402: [
      { target: 'vorrei il conto', rom: 'vor-RAY eel CON-toh', en: 'I would like the bill' },
      { target: 'quanto costa questo', rom: 'KWAN-to COS-ta KWEH-sto', en: 'how much is this' }
    ],
    901: [
      { target: "Dobbiamo negoziare il contratto di collaborazione domani.", rom: 'Dobbiamo negoziare il contratto di collaborazione domani.', en: 'We need to negotiate the partnership contract tomorrow.' }
    ],
    902: [
      { target: 'Analizzare la campagna aiuta ad aumentare le entrate.', rom: 'Analizzare la campagna aiuta ad aumentare le entrate.', en: 'Analyzing the campaign helps increase revenue.' }
    ],
    1001: [
      { target: 'I cittadini partecipano alla democrazia votando nelle elezioni.', rom: 'I cittadini partecipano alla democrazia votando nelle elezioni.', en: 'Citizens participate in democracy by voting in elections.' }
    ],
    1002: [
      { target: 'Combattere la povertà è una politica chiave per la giustizia.', rom: 'Combattere la povertà è una politica chiave per la giustizia.', en: 'Fighting poverty is a key policy for justice.' }
    ],
    1101: [
      { target: "L'algoritmo di intelligenza artificiale gestisce l'automazione.", rom: "L'algoritmo di intelligenza artificiale gestisce l'automazione.", en: 'The artificial intelligence algorithm manages the automation.' }
    ],
    1102: [
      { target: 'Il razzo entra in orbita per esplorare nuovi pianeti.', rom: 'Il razzo entra in orbita per esplorare nuovi pianeti.', en: 'The rocket enters orbit to explore new planets.' }
    ],
    1201: [
      { target: "La galleria ospita dipinti classici e sculture d'autore.", rom: "La galleria ospita dipinti classici e sculture d'autore.", en: 'The gallery houses classical paintings and sculptures.' }
    ],
    1202: [
      { target: "L'autore esprime sentimenti usando metafore poetiche nel suo romanzo.", rom: "L'autore esprime sentimenti usando metafore poetiche nel suo romanzo.", en: 'The author expresses feelings using poetic metaphors in his novel.' }
    ],
    1301: [
      { target: 'La filosofia classica indaga il confucianesimo e il taoismo.', rom: 'Lah fee-loh-soh-fee-ah clah-see-cah een-dah-gah eel con-foo-chah-nees-moh ee eel tah-o-ees-moh.', en: 'Classical philosophy investigates Confucianism and Taoism.' }
    ],
    1302: [
      { target: "L'analisi letteraria svela il simbolo nella narrativa.", rom: 'Lah-nah-lee-see lee-teh-rah-ryah sveh-lah eel seem-boh-loh nel-lah nah-rah-tee-vah.', en: 'Literary analysis reveals the symbol in the narrative.' }
    ],
    1401: [
      { target: 'La costituzione regola la difesa nel contenzioso della legge.', rom: 'Lah cos-tee-too-tsyoh-neh ray-goh-lah lah dee-fay-sah nel con-ten-tsyoh-soh del-lah lej-jeh.', en: 'The constitution regulates the defense in litigation under the law.' }
    ],
    1402: [
      { target: 'Garantire la libertà e l’uguaglianza tutela la dignità e i diritti umani.', rom: 'Gah-rahn-tee-reh lah lee-behr-tah ee loo-gwahl-yahn-tsah too-teh-lah lah deen-yee-tah ee ee dee-reet-tee oo-mah-nee.', en: 'Guaranteeing freedom and equality guards dignity and human rights.' }
    ],
    1501: [
      { target: "L'inflazione e il commercio globale colpiscono l'economia e la finanza.", rom: 'Leen-flah-tsyoh-neh ee eel com-mehr-choh gloh-bah-leh col-PEES-coh-noh leh-coh-noh-mee-ah ee lah fee-nahn-tsah.', en: 'Inflation and global commerce affect the economy and finance.' }
    ],
    1502: [
      { target: "L'investimento in azioni e obbligazioni comporta sempre un rischio.", rom: 'Leen-bes-tee-men-toh een ah-tsyoh-nee ee ob-blee-gah-tsyoh-nee com-por-tah sem-preh oon REES-kyoh.', en: 'Investing in stocks and bonds always carries a risk.' }
    ],
    1601: [
      { target: 'La tutela del clima richiede di limitare le emissioni per la salvaguardia dell’ecologia.', rom: 'Lah too-teh-lah del clee-mah ree-kyay-deh dee lee-mee-tah-reh leh eh-mees-syoh-nee pah-rah lah sal-vah-gwahr-dyah del-leh-coh-loh-jee-ah.', en: 'Climate protection requires limiting emissions to preserve ecology.' }
    ],
    1602: [
      { target: 'La clonazione del gene apre dibattiti su morale e bioetica.', rom: 'Lah clo-nah-tsyoh-neh del jay-neh ah-preh dee-bat-tee-tee soo moh-rah-leh ee byoh-eh-tee-cah.', en: 'Gene cloning opens debates on morality and bioethics.' }
    ]
  },
  en: {
    101: [
      { target: 'hello', rom: 'huh-LOH', en: 'hello' },
      { target: 'good morning friend', rom: 'gud MOR-ning frend', en: 'good morning friend' },
      { target: 'good night', rom: 'gud nyt', en: 'good night' },
    ],
    102: [
      { target: 'I am a student', rom: 'ay am uh STOO-dent', en: 'I am a student' },
      { target: 'he is a teacher', rom: 'hee iz uh TEE-cher', en: 'he is a teacher' },
      { target: 'what is your name', rom: 'wot iz yor neym', en: 'what is your name' },
    ],
    103: [
      { target: 'thank you very much', rom: 'thangk yoo vehr-ee much', en: 'thank you very much' },
      { target: 'goodbye friend', rom: 'gud-by frend', en: 'goodbye friend' },
      { target: 'please', rom: 'pleez', en: 'please' },
    ],
    201: [
      { target: 'one two three', rom: 'wun too three', en: 'one two three' },
      { target: 'I have five apples', rom: 'ay hav fyv ap-ulz', en: 'I have five apples' },
    ],
    202: [
      { target: 'today is Monday', rom: 'tuh-dey iz MUN-dey', en: 'today is Monday' },
      { target: 'tomorrow is Tuesday', rom: 'tuh-mor-oh iz TOOZ-dey', en: 'tomorrow is Tuesday' },
    ],
    203: [
      { target: 'what time is it', rom: 'wot tym iz it', en: 'what time is it' },
      { target: 'it is eight o\'clock', rom: 'it iz eyt uh-klok', en: 'it is eight o\'clock' },
    ],
    301: [
      { target: 'my father', rom: 'my FAH-ther', en: 'my father' },
      { target: 'I love my mother', rom: 'ay luv my MUTH-er', en: 'I love my mother' },
    ],
    302: [
      { target: 'she is very friendly', rom: 'shee iz vehr-ee FREND-lee', en: 'she is very friendly' },
      { target: 'we are very happy', rom: 'wee ar vehr-ee HAP-ee', en: 'we are very happy' },
    ],
    401: [
      { target: 'I drink water', rom: 'ay dringk WAH-ter', en: 'I drink water' },
      { target: 'he eats bread', rom: 'hee eets bred', en: 'he eats bread' },
    ],
    402: [
      { target: 'I would like the bill', rom: 'ay wud lyk the bil', en: 'I would like the bill' },
      { target: 'how much is this', rom: 'how much iz this', en: 'how much is this' }
    ],
    901: [
      { target: 'We need to negotiate the contract for the partnership project tomorrow.', rom: 'Wee need too nih-goh-shee-eyt the kon-trakt for the part-ner-ship proj-ekt tuh-mor-oh.', en: 'We need to negotiate the contract for the partnership project tomorrow.' },
      { target: 'This is the main agenda of our business meeting.', rom: 'This iz the meyn uh-jen-duh of ow-er biz-nis mee-ting.', en: 'This is the main agenda of our business meeting.' }
    ],
    902: [
      { target: 'Analyzing market revenue and customer campaigns is very important.', rom: 'An-uh-ly-zing mahr-kit rev-uh-nyoo and kus-tuh-mer kam-peyns iz vehr-ee im-pawr-tuhnt.', en: 'Analyzing market revenue and customer campaigns is very important.' }
    ],
    1001: [
      { target: 'Citizens participate in democracy by voting in the election.', rom: 'Sit-i-zuhnz pahr-tis-uh-peyt in dih-mok-ruh-see by voh-ting in the ih-lek-shuhn.', en: 'Citizens participate in democracy by voting in the election.' }
    ],
    1002: [
      { target: 'Eradicating poverty is a crucial policy for justice and equality.', rom: 'Ih-rad-i-key-ting pov-er-tee iz uh kroo-shuhl pol-uh-see for jus-tis and ih-kwol-i-tee.', en: 'Eradicating poverty is a crucial policy for justice and equality.' }
    ],
    1101: [
      { target: 'The artificial intelligence algorithm enables industrial automation.', rom: 'The ahr-tuh-fish-uhl in-tel-i-juhns al-guh-rith-uhm en-ey-buhls in-dus-tree-uhl aw-tuh-mey-shuhn.', en: 'The artificial intelligence algorithm enables industrial automation.' }
    ],
    1102: [
      { target: 'The rocket travels in orbit to explore planets in the galaxy.', rom: 'The rok-it trav-uhls in awr-bit too ik-splawr plan-its in the gal-uhk-see.', en: 'The rocket travels in orbit to explore planets in the galaxy.' }
    ],
    1201: [
      { target: 'The gallery displays classical paintings and masterpiece sculptures.', rom: 'The gal-uh-ree dih-spleyz klas-i-kuhl peyn-tings and mas-ter-pees skulp-cherz.', en: 'The gallery displays classical paintings and masterpiece sculptures.' }
    ],
    1202: [
      { target: 'The author uses poetic metaphors in this novel.', rom: 'The aw-ther yoo-ziz poh-it-ik met-uh-fawrz in this nov-uhl.', en: 'The author uses poetic metaphors in this novel.' }
    ],
    1301: [
      { target: 'Classical philosophy examines the tenets of Confucianism and Taoism.', rom: 'Klas-i-kuhl fi-los-uh-fee ig-zam-inz thuh ten-its ov kuhn-fyoo-shuh-niz-uhm and tow-iz-uhm.', en: 'Classical philosophy examines the tenets of Confucianism and Taoism.' }
    ],
    1302: [
      { target: 'Literary analysis reveals the hidden symbols within the narrative.', rom: 'Lit-uh-rer-ee uh-nal-i-sis ri-veelz thuh hid-uhn sim-buhls wi-thin thuh nar-uh-tiv.', en: 'Literary analysis reveals the hidden symbols within the narrative.' }
    ],
    1401: [
      { target: 'The constitution defines the defense guidelines in legal litigation.', rom: 'Thuh kon-sti-too-shuhn dih-faynz thuh dih-fens gayd-lynz in lee-guhl lit-i-gey-shuhn.', en: 'The constitution defines the defense guidelines in legal litigation.' }
    ],
    1402: [
      { target: 'Upholding freedom and equality is essential to secure human rights and dignity.', rom: 'Up-hohl-ding free-duhm and ih-kwol-i-tee iz ih-sen-shuhl too si-kyoor hyoo-muhn rayts and dig-ni-tee.', en: 'Upholding freedom and equality is essential to secure human rights and dignity.' }
    ],
    1501: [
      { target: 'Inflation and global trade directly affect the international economy and finance.', rom: 'In-fley-shuhn and gloh-buhl treyd dih-rekt-lee uh-fekt thuh in-ter-nash-uh-nuhl ih-kon-uh-mee and fay-nans.', en: 'Inflation and global trade directly affect the international economy and finance.' }
    ],
    1502: [
      { target: 'Any investment in stocks or bonds carries some degree of market risk.', rom: 'En-ee in-vest-muhnt in stoks or bondz kar-eez sum dih-gree ov mahr-kit risk.', en: 'Any investment in stocks or bonds carries some degree of market risk.' }
    ],
    1601: [
      { target: 'To fight climate change, we must reduce greenhouse gas emissions and safeguard our ecology.', rom: 'Too fayt klay-mit cheynj, wee must ri-dyoos green-hows gas ih-mish-uhnz and seyf-gahrd owr ih-kol-uh-jee.', en: 'To fight climate change, we must reduce greenhouse gas emissions and safeguard our ecology.' }
    ],
    1602: [
      { target: 'Gene cloning technology raises fundamental bioethics and morality questions.', rom: 'Jeen kloh-ning tek-nol-uh-jee rey-ziz fuhn-duh-men-tuhl bahy-oh-eth-iks and muh-ral-i-tee kwest-chuhnz.', en: 'Gene cloning technology raises fundamental bioethics and morality questions.' }
    ]
  },
  ar: {
    101: [
      { target: 'مرحبا', rom: 'marhaban', en: 'hello' },
      { target: 'كيف حالك', rom: 'kayfa haluk', en: 'how are you' },
    ],
    102: [
      { target: 'أنا طالب', rom: 'ana talib', en: 'I am a student' },
      { target: 'ما اسمك', rom: 'ma ismuk', en: 'what is your name' },
    ],
    103: [
      { target: 'شكرا لك', rom: 'shukran lak', en: 'thank you' },
      { target: 'وداعا صديقي', rom: 'wada\'an sadiqi', en: 'goodbye friend' },
    ]
  }
};

import i18n from '../services/i18n';

export function getLessonSentences(lessonId: number, lang: LanguageCode = 'zh'): LessonSentence[] {
  const langGroup = LESSON_SENTENCES[lang] ?? LESSON_SENTENCES.zh;
  const sentences = langGroup[lessonId] ?? langGroup[101] ?? [];
  return sentences.map(s => ({
    ...s,
    en: i18n.t(s.en, s.en)
  }));
}
