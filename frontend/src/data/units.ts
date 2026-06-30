import type { LanguageCode } from './courses';

type Lesson = { id: number; title: string; words: string[] };
type Unit = { id: number; title: string; emoji: string; lessons: Lesson[] };

const ALL_UNITS: Record<LanguageCode, Unit[]> = {
  zh: [
    { id: 1, title: 'Greetings & Basics', emoji: '👋', lessons: [
      { id: 101, title: 'Say Hello', words: ['你好', '你', '好', '你好吗'] },
      { id: 102, title: 'Introductions', words: ['我', '是', '学生', '老师', '名字'] },
      { id: 103, title: 'Thank You & Goodbye', words: ['谢谢', '再见', '不客气', '对不起'] },
      { id: 109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 2, title: 'Numbers & Time', emoji: '🔢', lessons: [
      { id: 201, title: 'Numbers 1–10', words: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'] },
      { id: 202, title: 'Days & Months', words: ['今天', '明天', '昨天', '星期', '月'] },
      { id: 203, title: 'Telling Time', words: ['几点', '小时', '分钟', '早上', '晚上'] },
      { id: 209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 3, title: 'Family & People', emoji: '👨‍👩‍👧', lessons: [
      { id: 301, title: 'Family Members', words: ['爸爸', '妈妈', '哥哥', '姐姐', '弟弟', '妹妹'] },
      { id: 302, title: 'Describing People', words: ['漂亮', '高兴', '大', '小', '高', '矮'] },
      { id: 309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 4, title: 'Food & Drink', emoji: '🍜', lessons: [
      { id: 401, title: 'Common Foods', words: ['饭', '水', '茶', '面条', '鸡肉', '菜'] },
      { id: 402, title: 'Ordering Food', words: ['我要', '多少钱', '好吃', '不好吃', '一碗'] },
      { id: 409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 5, title: 'Travel & Directions', emoji: '✈️', lessons: [
      { id: 501, title: 'Asking for Directions', words: ['地铁', '酒店', '哪里', '在', '左', '右'] },
      { id: 502, title: 'Transports', words: ['飞机', '火车', '出租车', '票', '站'] },
      { id: 509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 6, title: 'Shopping & Fashion', emoji: '🛍️', lessons: [
      { id: 601, title: 'Clothing', words: ['衣服', '鞋子', '裤子', '裙子', '红色'] },
      { id: 602, title: 'Bargaining & Buying', words: ['买', '卖', '太贵了', '便宜', '试一下'] },
      { id: 609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 7, title: 'Hobbies & Leisure', emoji: '⚽', lessons: [
      { id: 701, title: 'Sports', words: ['踢足球', '游泳', '跑步', '篮球', '运动'] },
      { id: 702, title: 'Entertainment', words: ['看电影', '听音乐', '看书', '游戏', '唱歌'] },
      { id: 709, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 8, title: 'Health & Weather', emoji: '🌦️', lessons: [
      { id: 801, title: 'Weather', words: ['下雨', '下雪', '晴天', '冷', '热', '刮风'] },
      { id: 802, title: 'Health', words: ['不舒服', '生病', '医生', '疼', '药', '感冒'] },
      { id: 809, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 9, title: 'Business & Negotiation', emoji: '💼', lessons: [
      { id: 901, title: 'Business Meeting', words: ['谈判', '合同', '合作', '议程'] },
      { id: 902, title: 'Marketing Strategy', words: ['市场', '客户', '活动', '收入'] },
      { id: 909, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 10, title: 'Politics & Society', emoji: '🏛️', lessons: [
      { id: 1001, title: 'Government & Election', words: ['投票', '民主', '选举', '政策'] },
      { id: 1002, title: 'Social Issues', words: ['贫困', '平等', '正义', '公民'] },
      { id: 1009, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 11, title: 'Science & Technology', emoji: '🔬', lessons: [
      { id: 1101, title: 'Artificial Intelligence', words: ['算法', '机器人', '自动化', '智能'] },
      { id: 1102, title: 'Space Exploration', words: ['星系', '轨道', '行星', '火箭'] },
      { id: 1109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 12, title: 'Art & Literature', emoji: '🎨', lessons: [
      { id: 1201, title: 'Classical Art', words: ['绘画', '杰作', '画廊', '雕塑'] },
      { id: 1202, title: 'Literature & Poetry', words: ['小说', '诗歌', '作者', '隐喻'] },
      { id: 1209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 13, title: 'Literature & Philosophy', emoji: '📚', lessons: [
      { id: 1301, title: 'Classical Philosophy', words: ['哲学', '儒家', '道家', '仁爱'] },
      { id: 1302, title: 'Literary Analysis', words: ['分析', '叙事', '象征', '批判'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: 'Law & Justice', emoji: '⚖️', lessons: [
      { id: 1401, title: 'Legal System', words: ['法律', '宪法', '诉讼', '辩护'] },
      { id: 1402, title: 'Human Rights', words: ['人权', '自由', '平等', '尊严'] },
      { id: 1409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 15, title: 'Finance & Economics', emoji: '📈', lessons: [
      { id: 1501, title: 'Global Economy', words: ['经济', '通胀', '贸易', '金融'] },
      { id: 1502, title: 'Investment & Markets', words: ['投资', '股票', '债券', '风险'] },
      { id: 1509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 16, title: 'Environment & Ethics', emoji: '🌍', lessons: [
      { id: 1601, title: 'Climate Change', words: ['气候', '排放', '环保', '生态'] },
      { id: 1602, title: 'Bioethics & Tech', words: ['伦理', '基因', '克隆', '道德'] },
      { id: 1609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]}
  ],
  es: [
    { id: 1, title: 'Greetings & Basics', emoji: '👋', lessons: [
      { id: 101, title: 'Say Hello', words: ['hola', 'buenos días', 'buenas tardes', 'buenas noches'] },
      { id: 102, title: 'Introductions', words: ['me llamo', 'soy', 'mucho gusto', '¿cómo te llamas?'] },
      { id: 103, title: 'Thank You & Goodbye', words: ['gracias', 'de nada', 'adiós', 'hasta luego', 'por favor'] },
      { id: 109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 2, title: 'Numbers & Time', emoji: '🔢', lessons: [
      { id: 201, title: 'Numbers 1–10', words: ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'] },
      { id: 202, title: 'Days of the Week', words: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'] },
      { id: 203, title: 'Telling Time', words: ['¿qué hora es?', 'son las', 'la mañana', 'la tarde', 'la noche'] },
      { id: 209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 3, title: 'Family & People', emoji: '👨‍👩‍👧', lessons: [
      { id: 301, title: 'Family Members', words: ['padre', 'madre', 'hermano', 'hermana', 'hijo', 'hija'] },
      { id: 302, title: 'Describing People', words: ['alto', 'bajo', 'joven', 'mayor', 'simpático', 'inteligente'] },
      { id: 309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 4, title: 'Food & Drink', emoji: '🍽️', lessons: [
      { id: 401, title: 'Common Foods', words: ['pan', 'agua', 'leche', 'arroz', 'pollo', 'fruta'] },
      { id: 402, title: 'At the Restaurant', words: ['quiero', 'la cuenta', '¿cuánto cuesta?', 'delicioso', 'la carta'] },
      { id: 409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 5, title: 'Travel & Directions', emoji: '✈️', lessons: [
      { id: 501, title: 'Asking for Directions', words: ['dónde está', 'a la derecha', 'a la izquierda', 'derecho', 'hotel', 'calle'] },
      { id: 502, title: 'Transport', words: ['avión', 'tren', 'taxi', 'billete', 'estación'] },
      { id: 509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 6, title: 'Shopping', emoji: '🛍️', lessons: [
      { id: 601, title: 'Clothing', words: ['ropa', 'zapatos', 'pantalones', 'camisa', 'vestido'] },
      { id: 602, title: 'Buying', words: ['comprar', 'barato', 'caro', 'demasiado', 'probar'] },
      { id: 609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 7, title: 'Hobbies', emoji: '⚽', lessons: [
      { id: 701, title: 'Sports', words: ['fútbol', 'nadar', 'correr', 'baloncesto', 'deporte'] },
      { id: 702, title: 'Leisure', words: ['película', 'música', 'libro', 'videojuego', 'cantar'] },
      { id: 709, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 8, title: 'Health & Weather', emoji: '🌦️', lessons: [
      { id: 801, title: 'Weather', words: ['lluvia', 'nieve', 'sol', 'frío', 'calor', 'viento'] },
      { id: 802, title: 'Health', words: ['enfermo', 'médico', 'dolor', 'medicina', 'resfriado'] },
      { id: 809, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 9, title: 'Negocios y Negociación', emoji: '💼', lessons: [
      { id: 901, title: 'Reunión de negocios', words: ['negociar', 'contrato', 'colaboración', 'agenda'] },
      { id: 902, title: 'Estrategia de mercadeo', words: ['mercado', 'cliente', 'campaña', 'ingresos'] },
      { id: 909, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 10, title: 'Política y Sociedad', emoji: '🏛️', lessons: [
      { id: 1001, title: 'Gobierno y Elecciones', words: ['votar', 'democracia', 'elección', 'política'] },
      { id: 1002, title: 'Problemas sociales', words: ['pobreza', 'igualdad', 'justicia', 'ciudadanía'] },
      { id: 1009, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 11, title: 'Ciencia y Tecnología', emoji: '🔬', lessons: [
      { id: 1101, title: 'Inteligencia Artificial', words: ['algoritmo', 'robot', 'automatización', 'inteligencia'] },
      { id: 1102, title: 'Exploración Espacial', words: ['galaxia', 'órbita', 'planeta', 'cohete'] },
      { id: 1109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 12, title: 'Arte y Literatura', emoji: '🎨', lessons: [
      { id: 1201, title: 'Arte Clásico', words: ['pintura', 'obra maestra', 'galería', 'escultura'] },
      { id: 1202, title: 'Literatura y Poesía', words: ['novela', 'poesía', 'autor', 'metáfora'] },
      { id: 1209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 13, title: 'Literatura y Filosofía', emoji: '📚', lessons: [
      { id: 1301, title: 'Filosofía Clásica', words: ['filosofía', 'confucianismo', 'taoísmo', 'benevolencia'] },
      { id: 1302, title: 'Análisis Literario', words: ['análisis', 'narrativa', 'símbolo', 'crítica'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: 'Derecho y Justicia', emoji: '⚖️', lessons: [
      { id: 1401, title: 'Sistema Legal', words: ['ley', 'constitución', 'litigio', 'defensa'] },
      { id: 1402, title: 'Derechos Humanos', words: ['derechos', 'libertad', 'igualdad', 'dignidad'] },
      { id: 1409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 15, title: 'Finanzas y Economía', emoji: '📈', lessons: [
      { id: 1501, title: 'Economía Global', words: ['economía', 'inflación', 'comercio', 'finanzas'] },
      { id: 1502, title: 'Inversión y Mercados', words: ['inversión', 'acciones', 'bonos', 'riesgo'] },
      { id: 1509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 16, title: 'Medio Ambiente y Ética', emoji: '🌍', lessons: [
      { id: 1601, title: 'Cambio Climático', words: ['clima', 'emisiones', 'ecología', 'protección'] },
      { id: 1602, title: 'Bioética y Tecnología', words: ['ética', 'genes', 'clonación', 'moral'] },
      { id: 1609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]}
  ],
  fr: [
    { id: 1, title: 'Greetings & Basics', emoji: '👋', lessons: [
      { id: 101, title: 'Say Hello', words: ['bonjour', 'bonsoir', 'salut', 'bonne nuit'] },
      { id: 102, title: 'Introductions', words: ['je m\'appelle', 'je suis', 'enchanté', 'comment vous appelez-vous?'] },
      { id: 103, title: 'Thank You & Goodbye', words: ['merci', 'de rien', 'au revoir', 's\'il vous plaît', 'excusez-moi'] },
      { id: 109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 2, title: 'Numbers & Time', emoji: '🔢', lessons: [
      { id: 201, title: 'Numbers 1–10', words: ['un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'] },
      { id: 202, title: 'Days of the Week', words: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] },
      { id: 203, title: 'Telling Time', words: ['quelle heure est-il?', 'il est', 'le matin', 'l\'après-midi', 'le soir'] },
      { id: 209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 3, title: 'Family & People', emoji: '👨‍👩‍👧', lessons: [
      { id: 301, title: 'Family Members', words: ['père', 'mère', 'frère', 'sœur', 'fils', 'fille'] },
      { id: 302, title: 'Describing People', words: ['grand', 'petit', 'jeune', 'vieux', 'sympa', 'intelligent'] },
      { id: 309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 4, title: 'Food & Drink', emoji: '🍽️', lessons: [
      { id: 401, title: 'Common Foods', words: ['pain', 'eau', 'lait', 'riz', 'poulet', 'fromage'] },
      { id: 402, title: 'At the Restaurant', words: ['je voudrais', 'l\'addition', 'c\'est combien?', 'délicieux', 'la carte'] },
      { id: 409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 5, title: 'Travel & Directions', emoji: '✈️', lessons: [
      { id: 501, title: 'Directions', words: ['où est', 'à droite', 'à gauche', 'tout droit', 'hôtel', 'rue'] },
      { id: 502, title: 'Transport', words: ['avion', 'train', 'taxi', 'billet', 'gare'] },
      { id: 509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 6, title: 'Shopping', emoji: '🛍️', lessons: [
      { id: 601, title: 'Clothing', words: ['vêtement', 'chaussures', 'pantalon', 'chemise', 'robe'] },
      { id: 602, title: 'Buying', words: ['acheter', 'pas cher', 'cher', 'trop', 'essayer'] },
      { id: 609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 7, title: 'Hobbies', emoji: '⚽', lessons: [
      { id: 701, title: 'Sports', words: ['football', 'nager', 'courir', 'basket-ball', 'sport'] },
      { id: 702, title: 'Leisure', words: ['film', 'musique', 'livre', 'jeu vidéo', 'chanter'] },
      { id: 709, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 8, title: 'Health & Weather', emoji: '🌦️', lessons: [
      { id: 801, title: 'Weather', words: ['pluie', 'neige', 'soleil', 'froid', 'chaud', 'vent'] },
      { id: 802, title: 'Health', words: ['malade', 'médecin', 'douleur', 'médicament', 'rhume'] },
      { id: 809, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 9, title: "Affaires et Négociation", emoji: '💼', lessons: [
      { id: 901, title: "Réunion d'affaires", words: ['négocier', 'contrat', 'partenariat', 'ordre du jour'] },
      { id: 902, title: 'Stratégie marketing', words: ['marché', 'client', 'campagne', 'revenu'] },
      { id: 909, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 10, title: 'Politique et Société', emoji: '🏛️', lessons: [
      { id: 1001, title: 'Gouvernement et Élection', words: ['voter', 'démocratie', 'élection', 'politique'] },
      { id: 1002, title: 'Problèmes sociaux', words: ['pauvreté', 'égalité', 'justice', 'citoyenneté'] },
      { id: 1009, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 11, title: 'Science et Technologie', emoji: '🔬', lessons: [
      { id: 1101, title: 'Intelligence Artificielle', words: ['algorithme', 'robot', 'automatisation', 'intelligence'] },
      { id: 1102, title: 'Exploration spatiale', words: ['galaxie', 'orbite', 'planète', 'fusée'] },
      { id: 1109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 12, title: 'Art et Littérature', emoji: '🎨', lessons: [
      { id: 1201, title: 'Art Classique', words: ['peinture', "chef-d'œuvre", 'galerie', 'sculpture'] },
      { id: 1202, title: 'Littérature et Poésie', words: ['roman', 'poésie', 'auteur', 'métaphore'] },
      { id: 1209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 13, title: 'Littérature et Philosophie', emoji: '📚', lessons: [
      { id: 1301, title: 'Philosophie Classique', words: ['philosophie', 'confucianisme', 'taoïsme', 'bienveillance'] },
      { id: 1302, title: 'Analyse Littéraire', words: ['analyse', 'récit', 'symbole', 'critique'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: 'Droit et Justice', emoji: '⚖️', lessons: [
      { id: 1401, title: 'Système Juridique', words: ['loi', 'constitution', 'litige', 'défense'] },
      { id: 1402, title: 'Droits de l\'Homme', words: ['droits', 'liberté', 'égalité', 'dignité'] },
      { id: 1409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 15, title: 'Finance et Économie', emoji: '📈', lessons: [
      { id: 1501, title: 'Économie Globale', words: ['économie', 'inflation', 'commerce', 'finance'] },
      { id: 1502, title: 'Investissement et Marchés', words: ['investissement', 'actions', 'obligations', 'risque'] },
      { id: 1509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 16, title: 'Environnement et Éthique', emoji: '🌍', lessons: [
      { id: 1601, title: 'Changement Climatique', words: ['climat', 'émissions', 'écologie', 'protection'] },
      { id: 1602, title: 'Bioéthique et Technologie', words: ['éthique', 'gène', 'clonage', 'morale'] },
      { id: 1609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]}
  ],
  de: [
    { id: 1, title: 'Greetings & Basics', emoji: '👋', lessons: [
      { id: 101, title: 'Say Hello', words: ['Hallo', 'Guten Morgen', 'Guten Abend', 'Gute Nacht'] },
      { id: 102, title: 'Introductions', words: ['Ich heiße', 'Ich bin', 'Freut mich', 'Wie heißen Sie?'] },
      { id: 103, title: 'Thank You & Goodbye', words: ['Danke', 'Bitte', 'Auf Wiedersehen', 'Tschüss', 'Entschuldigung'] },
      { id: 109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 2, title: 'Numbers & Time', emoji: '🔢', lessons: [
      { id: 201, title: 'Numbers 1–10', words: ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn'] },
      { id: 202, title: 'Days of the Week', words: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'] },
      { id: 203, title: 'Telling Time', words: ['Wie spät ist es?', 'Es ist', 'morgens', 'nachmittags', 'abends'] },
      { id: 209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 3, title: 'Family & People', emoji: '👨‍👩‍👧', lessons: [
      { id: 301, title: 'Family Members', words: ['Vater', 'Mutter', 'Bruder', 'Schwester', 'Sohn', 'Tochter'] },
      { id: 302, title: 'Describing People', words: ['groß', 'klein', 'jung', 'alt', 'nett', 'klug'] },
      { id: 309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 4, title: 'Food & Drink', emoji: '🍽️', lessons: [
      { id: 401, title: 'Common Foods', words: ['Brot', 'Wasser', 'Milch', 'Reis', 'Hähnchen', 'Käse'] },
      { id: 402, title: 'At the Restaurant', words: ['Ich möchte', 'Die Rechnung', 'Wie viel kostet?', 'lecker', 'die Speisekarte'] },
      { id: 409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 5, title: 'Travel & Directions', emoji: '✈️', lessons: [
      { id: 501, title: 'Directions', words: ['wo ist', 'rechts', 'links', 'geradeaus', 'Hotel', 'Straße'] },
      { id: 502, title: 'Transport', words: ['Flugzeug', 'Zug', 'Taxi', 'Fahrkarte', 'Bahnhof'] },
      { id: 509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 6, title: 'Shopping', emoji: '🛍️', lessons: [
      { id: 601, title: 'Clothing', words: ['Kleidung', 'Schuhe', 'Hose', 'Hemd', 'Kleid'] },
      { id: 602, title: 'Buying', words: ['kaufen', 'billig', 'teuer', 'zu viel', 'anprobieren'] },
      { id: 609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 7, title: 'Hobbies', emoji: '⚽', lessons: [
      { id: 701, title: 'Sports', words: ['Fußball', 'schwimmen', 'laufen', 'Basketball', 'Sport'] },
      { id: 702, title: 'Leisure', words: ['Film', 'Musik', 'Buch', 'Videospiel', 'singen'] },
      { id: 709, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 8, title: 'Health & Weather', emoji: '🌦️', lessons: [
      { id: 801, title: 'Weather', words: ['Regen', 'Schnee', 'Sonne', 'kalt', 'heiß', 'Wind'] },
      { id: 802, title: 'Health', words: ['krank', 'Arzt', 'Schmerz', 'Medizin', 'Erkältung'] },
      { id: 809, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 9, title: 'Geschäft & Verhandlung', emoji: '💼', lessons: [
      { id: 901, title: 'Geschäftstreffen', words: ['verhandeln', 'Vertrag', 'Partnerschaft', 'Agenda'] },
      { id: 902, title: 'Marketingstrategie', words: ['Markt', 'Kunde', 'Kampagne', 'Einnahmen'] },
      { id: 909, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 10, title: 'Politik & Gesellschaft', emoji: '🏛️', lessons: [
      { id: 1001, title: 'Regierung & Wahl', words: ['wählen', 'Demokratie', 'Wahl', 'Politik'] },
      { id: 1002, title: 'Soziale Probleme', words: ['Armut', 'Gleichheit', 'Gerechtigkeit', 'Staatsbürgerschaft'] },
      { id: 1009, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 11, title: 'Wissenschaft & Technologie', emoji: '🔬', lessons: [
      { id: 1101, title: 'Künstliche Intelligenz', words: ['Algorithmus', 'Roboter', 'Automatisierung', 'Intelligenz'] },
      { id: 1102, title: 'Weltraumforschung', words: ['Galaxie', 'Umlaufbahn', 'Planet', 'Rakete'] },
      { id: 1109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 12, title: 'Kunst & Literatur', emoji: '🎨', lessons: [
      { id: 1201, title: 'Klassische Kunst', words: ['Gemälde', 'Meisterwerk', 'Galerie', 'Skulptur'] },
      { id: 1202, title: 'Literatur & Poesie', words: ['Roman', 'Poesie', 'Autor', 'Metapher'] },
      { id: 1209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 13, title: 'Literatur & Philosophie', emoji: '📚', lessons: [
      { id: 1301, title: 'Klassische Philosophie', words: ['Philosophie', 'Konfuzianismus', 'Taoismus', 'Barmherzigkeit'] },
      { id: 1302, title: 'Literarische Analyse', words: ['Analyse', 'Erzählung', 'Symbol', 'Kritik'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: 'Recht & Gerechtigkeit', emoji: '⚖️', lessons: [
      { id: 1401, title: 'Rechtssystem', words: ['Gesetz', 'Verfassung', 'Rechtsstreit', 'Verteidigung'] },
      { id: 1402, title: 'Menschenrechte', words: ['Rechte', 'Freiheit', 'Gleichheit', 'Würde'] },
      { id: 1409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 15, title: 'Finanzen & Wirtschaft', emoji: '📈', lessons: [
      { id: 1501, title: 'Weltwirtschaft', words: ['Wirtschaft', 'Inflation', 'Handel', 'Finanzen'] },
      { id: 1502, title: 'Investition & Märkte', words: ['Investition', 'Aktien', 'Anleihen', 'Risiko'] },
      { id: 1509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 16, title: 'Umwelt & Ethik', emoji: '🌍', lessons: [
      { id: 1601, title: 'Klimawandel', words: ['Klima', 'Emissionen', 'Ökologie', 'Umweltschutz'] },
      { id: 1602, title: 'Bioethik & Tech', words: ['Ethik', 'Gen', 'Klonen', 'Moral'] },
      { id: 1609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]}
  ],
  ja: [
    { id: 1, title: 'Greetings & Basics', emoji: '👋', lessons: [
      { id: 101, title: 'Say Hello', words: ['こんにちは', 'おはようございます', 'こんばんは', 'おやすみなさい'] },
      { id: 102, title: 'Introductions', words: ['わたしは', 'はじめまして', 'よろしくおねがいします', 'なまえはなんですか'] },
      { id: 103, title: 'Thank You & Goodbye', words: ['ありがとう', 'どういたしまして', 'さようなら', 'すみません'] },
      { id: 109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 2, title: 'Numbers & Time', emoji: '🔢', lessons: [
      { id: 201, title: 'Numbers 1–10', words: ['いち', 'に', 'さん', 'し', 'ご', 'ろく', 'しち', 'はち', 'く', 'じゅう'] },
      { id: 202, title: 'Days of the Week', words: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'] },
      { id: 203, title: 'Telling Time', words: ['なんじですか', '～時', 'あさ', 'ひる', 'よる'] },
      { id: 209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 3, title: 'Family & People', emoji: '👨‍👩‍👧', lessons: [
      { id: 301, title: 'Family Members', words: ['ちち', 'はは', 'あに', 'あね', 'おとうと', 'いもうと'] },
      { id: 302, title: 'Describing People', words: ['たかい', 'ひくい', 'わかい', 'としより', 'やさしい', 'かしこい'] },
      { id: 309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 4, title: 'Food & Drink', emoji: '🍽️', lessons: [
      { id: 401, title: 'Common Foods', words: ['ごはん', 'みず', 'おちゃ', 'ラーメン', 'とりにく', 'やさい'] },
      { id: 402, title: 'At the Restaurant', words: ['～をください', 'おかいけい', 'いくらですか', 'おいしい', 'メニュー'] },
      { id: 409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 5, title: 'Travel & Directions', emoji: '✈️', lessons: [
      { id: 501, title: 'Directions', words: ['どこですか', '右', '左', 'まっすぐ', 'ホテル', '駅'] },
      { id: 502, title: 'Transport', words: ['ひこうき', 'でんしゃ', 'タクシー', 'きっぷ', 'のりば'] },
      { id: 509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 6, title: 'Shopping', emoji: '🛍️', lessons: [
      { id: 601, title: 'Clothing', words: ['ふく', 'くつ', 'ズボン', 'シャツ', 'ドレス'] },
      { id: 602, title: 'Buying', words: ['かう', 'やすい', 'たかい', 'こんで', 'しちゃくする'] },
      { id: 609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 7, title: 'Hobbies', emoji: '⚽', lessons: [
      { id: 701, title: 'Sports', words: ['サッカー', 'およぐ', 'はしる', 'バスケットボール', 'スポーツ'] },
      { id: 702, title: 'Leisure', words: ['えいが', 'おんがく', 'ほん', 'ゲーム', 'うたう'] },
      { id: 709, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 8, title: 'Health & Weather', emoji: '🌦️', lessons: [
      { id: 801, title: 'Weather', words: ['あめ', 'ゆき', 'はれ', 'さむい', 'あつい', 'かぜ'] },
      { id: 802, title: 'Health', words: ['びょうき', 'いしゃ', 'いたい', 'くすり', 'かぜをひく'] },
      { id: 809, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 9, title: 'ビジネスと交渉', emoji: '💼', lessons: [
      { id: 901, title: 'ビジネス会議', words: ['交渉する', '契約', '提携', '議題'] },
      { id: 902, title: 'マーケティング戦略', words: ['市場', '顧客', 'キャンペーン', '収益'] },
      { id: 909, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 10, title: '政治と社会', emoji: '🏛️', lessons: [
      { id: 1001, title: '政府と選挙', words: ['投票', '民主主義', '選挙', '政策'] },
      { id: 1002, title: '社会問題', words: ['貧困', '平等', '正義', '市民権'] },
      { id: 1009, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 11, title: '科学と技術', emoji: '🔬', lessons: [
      { id: 1101, title: '人工知能', words: ['アルゴリズム', 'ロボット', '自動化', '知能'] },
      { id: 1102, title: '宇宙開発', words: ['銀河', '軌道', '惑星', 'ロケット'] },
      { id: 1109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 12, title: '芸術と文学', emoji: '🎨', lessons: [
      { id: 1201, title: '古典美術', words: ['絵画', '傑作', '画廊', '彫刻'] },
      { id: 1202, title: '文学と诗', words: ['小説', '詩', '著者', '比喩'] },
      { id: 1209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 13, title: '文学と哲学', emoji: '📚', lessons: [
      { id: 1301, title: '古典哲学', words: ['哲学', '儒教', '道教', '仁愛'] },
      { id: 1302, title: '文学分析', words: ['分析', '叙事', '象徴', '批判'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: '法律と正義', emoji: '⚖️', lessons: [
      { id: 1401, title: '法制度', words: ['法律', '憲法', '訴訟', '弁護'] },
      { id: 1402, title: '人権', words: ['人権', '自由', '平等', '尊厳'] },
      { id: 1409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 15, title: '金融と経済', emoji: '📈', lessons: [
      { id: 1501, title: '世界経済', words: ['経済', 'インフレ', '貿易', '金融'] },
      { id: 1502, title: '投資と市場', words: ['投資', '株式', '債券', 'リスク'] },
      { id: 1509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 16, title: '環境と倫理', emoji: '🌍', lessons: [
      { id: 1601, title: '気候変動', words: ['気候', '排出量', '環境保護', '生態系'] },
      { id: 1602, title: 'バイオエシックスと技術', words: ['倫理', '遺伝子', 'クローン', '道徳'] },
      { id: 1609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]}
  ],
  ko: [
    { id: 1, title: 'Greetings & Basics', emoji: '👋', lessons: [
      { id: 101, title: 'Say Hello', words: ['안녕하세요', '좋은 아침', '좋은 저녁', '안녕히 주무세요'] },
      { id: 102, title: 'Introductions', words: ['제 이름은', '저는', '반갑습니다', '이름이 뭐예요?'] },
      { id: 103, title: 'Thank You & Goodbye', words: ['감사합니다', '천만에요', '안녕히 가세요', '죄송합니다'] },
      { id: 109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 2, title: 'Numbers & Time', emoji: '🔢', lessons: [
      { id: 201, title: 'Numbers 1–10 (Native)', words: ['하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉', '열'] },
      { id: 202, title: 'Days of the Week', words: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'] },
      { id: 203, title: 'Telling Time', words: ['몇 시예요?', '～시', '아침', '오후', '저녁'] },
      { id: 209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 3, title: 'Family & People', emoji: '👨‍👩‍👧', lessons: [
      { id: 301, title: 'Family Members', words: ['아버지', '어머니', '오빠/형', '언니/누나', '남동생', '여동생'] },
      { id: 302, title: 'Describing People', words: ['키가 커요', '키가 작아요', '젊어요', '나이가 많아요', '친절해요', '똑똑해요'] },
      { id: 309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 4, title: 'Food & Drink', emoji: '🍽️', lessons: [
      { id: 401, title: 'Common Foods', words: ['밥', '물', '차', '라면', '닭고기', '채소'] },
      { id: 402, title: 'At the Restaurant', words: ['～주세요', '계산서', '얼마예요?', '맛있어요', '메뉴'] },
      { id: 409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 5, title: 'Travel & Directions', emoji: '✈️', lessons: [
      { id: 501, title: 'Directions', words: ['어디예요', '오른쪽', '왼쪽', '똑바로', '호텔', '길'] },
      { id: 502, title: 'Transport', words: ['비행기', '기차', '택시', '표', '역'] },
      { id: 509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 6, title: 'Shopping', emoji: '🛍️', lessons: [
      { id: 601, title: 'Clothing', words: ['옷', '신발', '바지', '셔츠', '원피스'] },
      { id: 602, title: 'Buying', words: ['사다', '싸다', '비싸다', '너무', '입어보다'] },
      { id: 609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 7, title: 'Hobbies', emoji: '⚽', lessons: [
      { id: 701, title: 'Sports', words: ['축구', '수영', '달리다', '농구', '스포츠'] },
      { id: 702, title: 'Leisure', words: ['영화', '음악', '책', '게임', '노래하다'] },
      { id: 709, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 8, title: 'Health & Weather', emoji: '🌦️', lessons: [
      { id: 801, title: 'Weather', words: ['비', '눈', '맑음', '춥다', '덥다', '바람'] },
      { id: 802, title: 'Health', words: ['아프다', '의사', '고통', '약', '감기'] },
      { id: 809, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 9, title: '비즈니스와 협상', emoji: '💼', lessons: [
      { id: 901, title: '비즈니스 회의', words: ['협상하다', '계약', '파트너십', '의제'] },
      { id: 902, title: '마케팅 전략', words: ['시장', '고객', '캠페인', '수익'] },
      { id: 909, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 10, title: '정치와 사회', emoji: '🏛️', lessons: [
      { id: 1001, title: '정부와 선거', words: ['투표', '민주주의', '선거', '정책'] },
      { id: 1002, title: '사회 문제', words: ['빈곤', '평등', '정의', '시민권'] },
      { id: 1009, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 11, title: '과학과 기술', emoji: '🔬', lessons: [
      { id: 1101, title: '인공지능', words: ['알고리즘', '로봇', '자동화', '지능'] },
      { id: 1102, title: '우주 탐사', words: ['은하', '궤도', '행성', '로켓'] },
      { id: 1109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 12, title: '예술과 문학', emoji: '🎨', lessons: [
      { id: 1201, title: '고전 예술', words: ['회화', '걸작', '화랑', '조각'] },
      { id: 1202, title: '문학과 시', words: ['소설', '시', '저자', '비유'] },
      { id: 1209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 13, title: '문학과 철학', emoji: '📚', lessons: [
      { id: 1301, title: '고전 철학', words: ['철학', '유교', '도교', '인애'] },
      { id: 1302, title: '문학 분석', words: ['분석', '서사', '상징', '비판'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: '법과 정의', emoji: '⚖️', lessons: [
      { id: 1401, title: '법률 제도', words: ['법률', '헌법', '소송', '변호'] },
      { id: 1402, title: '인권', words: ['인권', '자유', '평등', '존엄'] },
      { id: 1409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 15, title: '금융과 경제', emoji: '📈', lessons: [
      { id: 1501, title: '세계 경제', words: ['경제', '인플레이션', '무역', '금융'] },
      { id: 1502, title: '투자 & 시장', words: ['투자', '주식', '채권', '위험'] },
      { id: 1509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 16, title: '환경과 윤리', emoji: '🌍', lessons: [
      { id: 1601, title: '기후 변화', words: ['기후', '배출', '환경 보호', '생태'] },
      { id: 1602, title: '생명윤리 & 기술', words: ['윤리', '유전자', '복제', '도덕'] },
      { id: 1609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]}
  ],
  it: [
    { id: 1, title: 'Greetings & Basics', emoji: '👋', lessons: [
      { id: 101, title: 'Say Hello', words: ['ciao', 'buongiorno', 'buonasera', 'buonanotte'] },
      { id: 102, title: 'Introductions', words: ['mi chiamo', 'sono', 'piacere', 'come ti chiami?'] },
      { id: 103, title: 'Thank You & Goodbye', words: ['grazie', 'prego', 'arrivederci', 'per favore', 'scusi'] },
      { id: 109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 2, title: 'Numbers & Time', emoji: '🔢', lessons: [
      { id: 201, title: 'Numbers 1–10', words: ['uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci'] },
      { id: 202, title: 'Days of the Week', words: ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'] },
      { id: 203, title: 'Telling Time', words: ['che ora è?', 'sono le', 'la mattina', 'il pomeriggio', 'la sera'] },
      { id: 209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 3, title: 'Family & People', emoji: '👨‍👩‍👧', lessons: [
      { id: 301, title: 'Family Members', words: ['padre', 'madre', 'fratello', 'sorella', 'figlio', 'figlia'] },
      { id: 302, title: 'Describing People', words: ['alto', 'basso', 'giovane', 'vecchio', 'simpatico', 'intelligente'] },
      { id: 309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 4, title: 'Food & Drink', emoji: '🍽️', lessons: [
      { id: 401, title: 'Common Foods', words: ['pane', 'acqua', 'latte', 'riso', 'pollo', 'formaggio'] },
      { id: 402, title: 'At the Restaurant', words: ['vorrei', 'il conto', 'quanto costa?', 'delizioso', 'il menù'] },
      { id: 409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 5, title: 'Travel & Directions', emoji: '✈️', lessons: [
      { id: 501, title: 'Directions', words: ['dov\'è', 'a destra', 'a sinistra', 'dritto', 'hotel', 'via'] },
      { id: 502, title: 'Transport', words: ['aereo', 'treno', 'taxi', 'biglietto', 'stazione'] },
      { id: 509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 6, title: 'Shopping', emoji: '🛍️', lessons: [
      { id: 601, title: 'Clothing', words: ['vestito', 'scarpe', 'pantaloni', 'camicia', 'gonna'] },
      { id: 602, title: 'Buying', words: ['comprare', 'economico', 'caro', 'troppo', 'provare'] },
      { id: 609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 7, title: 'Hobbies', emoji: '⚽', lessons: [
      { id: 701, title: 'Sports', words: ['calcio', 'nuotare', 'correre', 'pallacanestro', 'sport'] },
      { id: 702, title: 'Leisure', words: ['film', 'musica', 'libro', 'videogioco', 'cantare'] },
      { id: 709, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 8, title: 'Health & Weather', emoji: '🌦️', lessons: [
      { id: 801, title: 'Weather', words: ['pioggia', 'neve', 'sole', 'freddo', 'caldo', 'vento'] },
      { id: 802, title: 'Health', words: ['malato', 'medico', 'dolore', 'medicina', 'raffreddore'] },
      { id: 809, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 9, title: 'Affari e Negoziazione', emoji: '💼', lessons: [
      { id: 901, title: "Riunione d'affari", words: ['negoziare', 'contratto', 'collaborazione', 'agenda'] },
      { id: 902, title: 'Strategia di marketing', words: ['mercato', 'cliente', 'campagna', 'entrate'] },
      { id: 909, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 10, title: 'Politica e Società', emoji: '🏛️', lessons: [
      { id: 1001, title: 'Governo ed Elezioni', words: ['votare', 'democrazia', 'elezione', 'politica'] },
      { id: 1002, title: 'Questioni sociali', words: ['povertà', 'uguaglianza', 'giustizia', 'cittadinanza'] },
      { id: 1009, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 11, title: 'Scienza e Tecnologia', emoji: '🔬', lessons: [
      { id: 1101, title: 'Intelligenza Artificiale', words: ['algoritmo', 'robot', 'automazione', 'intelligenza'] },
      { id: 1102, title: 'Esplorazione Spaziale', words: ['galassia', 'orbita', 'pianeta', 'razzo'] },
      { id: 1109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 12, title: 'Arte e Letteratura', emoji: '🎨', lessons: [
      { id: 1201, title: 'Arte Classica', words: ['pittura', 'capolavoro', 'galleria', 'scultura'] },
      { id: 1202, title: 'Letteratura e Poesia', words: ['romanzo', 'poesia', 'autore', 'metafora'] },
      { id: 1209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 13, title: 'Letteratura e Filosofia', emoji: '📚', lessons: [
      { id: 1301, title: 'Filosofia Classica', words: ['filosofia', 'confucianesimo', 'taoismo', 'benevolenza'] },
      { id: 1302, title: 'Analisi Letteraria', words: ['analisi', 'narrativa', 'simbolo', 'critica'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: 'Diritto e Giustizia', emoji: '⚖️', lessons: [
      { id: 1401, title: 'Sistema Legale', words: ['legge', 'costituzione', 'contenzioso', 'difesa'] },
      { id: 1402, title: 'Diritti Umani', words: ['diritti', 'libertà', 'uguaglianza', 'dignità'] },
      { id: 1409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 15, title: 'Finanza ed Economia', emoji: '📈', lessons: [
      { id: 1501, title: 'Economia Globale', words: ['economia', 'inflazione', 'commercio', 'finanza'] },
      { id: 1502, title: 'Investimenti e Mercati', words: ['investimento', 'azioni', 'obbligazioni', 'rischio'] },
      { id: 1509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 16, title: 'Ambiente ed Etica', emoji: '🌍', lessons: [
      { id: 1601, title: 'Cambiamento Climatico', words: ['clima', 'emissioni', 'ecologia', 'tutela'] },
      { id: 1602, title: 'Bioetica e Tecnologia', words: ['etica', 'gene', 'clonazione', 'morale'] },
      { id: 1609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]}
  ],
  en: [
    { id: 1, title: 'Greetings & Basics', emoji: '👋', lessons: [
      { id: 101, title: 'Say Hello', words: ['hello', 'good morning', 'good evening', 'good night'] },
      { id: 102, title: 'Introductions', words: ['my name is', 'I am', 'nice to meet you', 'what is your name?'] },
      { id: 103, title: 'Thank You & Goodbye', words: ['thank you', 'you\'re welcome', 'goodbye', 'see you later', 'excuse me'] },
      { id: 109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 2, title: 'Numbers & Time', emoji: '🔢', lessons: [
      { id: 201, title: 'Numbers 1–10', words: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'] },
      { id: 202, title: 'Days of the Week', words: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      { id: 203, title: 'Telling Time', words: ['What time is it?', 'It\'s … o\'clock', 'in the morning', 'in the afternoon', 'at night'] },
      { id: 209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 3, title: 'Family & People', emoji: '👨‍👩‍👧', lessons: [
      { id: 301, title: 'Family Members', words: ['father', 'mother', 'brother', 'sister', 'son', 'daughter'] },
      { id: 302, title: 'Describing People', words: ['tall', 'short', 'young', 'old', 'friendly', 'clever'] },
      { id: 309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 4, title: 'Food & Drink', emoji: '🍽️', lessons: [
      { id: 401, title: 'Common Foods', words: ['bread', 'water', 'milk', 'rice', 'chicken', 'vegetables'] },
      { id: 402, title: 'At the Restaurant', words: ['I would like', 'the bill', 'how much is it?', 'delicious', 'the menu'] },
      { id: 409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 5, title: 'Travel & Directions', emoji: '✈️', lessons: [
      { id: 501, title: 'Directions', words: ['where is', 'right', 'left', 'straight', 'hotel', 'street'] },
      { id: 502, title: 'Transport', words: ['plane', 'train', 'taxi', 'ticket', 'station'] },
      { id: 509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 6, title: 'Shopping', emoji: '🛍️', lessons: [
      { id: 601, title: 'Clothing', words: ['clothes', 'shoes', 'pants', 'shirt', 'dress'] },
      { id: 602, title: 'Buying', words: ['buy', 'cheap', 'expensive', 'too much', 'try on'] },
      { id: 609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 7, title: 'Hobbies', emoji: '⚽', lessons: [
      { id: 701, title: 'Sports', words: ['football', 'swim', 'run', 'basketball', 'sport'] },
      { id: 702, title: 'Leisure', words: ['movie', 'music', 'book', 'video game', 'sing'] },
      { id: 709, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 8, title: 'Health & Weather', emoji: '🌦️', lessons: [
      { id: 801, title: 'Weather', words: ['rain', 'snow', 'sun', 'cold', 'hot', 'wind'] },
      { id: 802, title: 'Health', words: ['sick', 'doctor', 'pain', 'medicine', 'cold'] },
      { id: 809, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 9, title: 'Business & Negotiation', emoji: '💼', lessons: [
      { id: 901, title: 'Business Meeting', words: ['negotiate', 'contract', 'partnership', 'agenda'] },
      { id: 902, title: 'Marketing Strategy', words: ['market', 'customer', 'campaign', 'revenue'] },
      { id: 909, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 10, title: 'Politics & Society', emoji: '🏛️', lessons: [
      { id: 1001, title: 'Government & Election', words: ['vote', 'democracy', 'election', 'policy'] },
      { id: 1002, title: 'Social Issues', words: ['poverty', 'equality', 'justice', 'citizenship'] },
      { id: 1009, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 11, title: 'Science & Technology', emoji: '🔬', lessons: [
      { id: 1101, title: 'Artificial Intelligence', words: ['algorithm', 'robot', 'automation', 'intelligence'] },
      { id: 1102, title: 'Space Exploration', words: ['galaxy', 'orbit', 'planet', 'rocket'] },
      { id: 1109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 12, title: 'Art & Literature', emoji: '🎨', lessons: [
      { id: 1201, title: 'Classical Art', words: ['painting', 'masterpiece', 'gallery', 'sculpture'] },
      { id: 1202, title: 'Literature & Poetry', words: ['novel', 'poetry', 'author', 'metaphor'] },
      { id: 1209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 13, title: 'Literature & Philosophy', emoji: '📚', lessons: [
      { id: 1301, title: 'Classical Philosophy', words: ['philosophy', 'confucianism', 'taoism', 'benevolence'] },
      { id: 1302, title: 'Literary Analysis', words: ['analysis', 'narrative', 'symbol', 'criticism'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: 'Law & Justice', emoji: '⚖️', lessons: [
      { id: 1401, title: 'Legal System', words: ['law', 'constitution', 'litigation', 'defense'] },
      { id: 1402, title: 'Human Rights', words: ['rights', 'freedom', 'equality', 'dignity'] },
      { id: 1409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 15, title: 'Finance & Economics', emoji: '📈', lessons: [
      { id: 1501, title: 'Global Economy', words: ['economy', 'inflation', 'trade', 'finance'] },
      { id: 1502, title: 'Investment & Markets', words: ['investment', 'stocks', 'bonds', 'risk'] },
      { id: 1509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 16, title: 'Environment & Ethics', emoji: '🌍', lessons: [
      { id: 1601, title: 'Climate Change', words: ['climate', 'emissions', 'ecology', 'protection'] },
      { id: 1602, title: 'Bioethics & Tech', words: ['ethics', 'gene', 'cloning', 'morality'] },
      { id: 1609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]}
  ],
  ar: [
    { id: 1, title: 'Greetings & Basics', emoji: '👋', lessons: [
      { id: 101, title: 'Say Hello', words: ['مرحباً', 'صباح الخير', 'مساء الخير', 'تصبح على خير'] },
      { id: 102, title: 'Introductions', words: ['اسمي', 'أنا', 'تشرفنا', 'ما اسمك؟'] },
      { id: 103, title: 'Thank You & Goodbye', words: ['شكراً', 'عفواً', 'مع السلامة', 'لو سمحت', 'آسف'] },
      { id: 109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 2, title: 'Numbers & Time', emoji: '🔢', lessons: [
      { id: 201, title: 'Numbers 1–10', words: ['واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة'] },
      { id: 202, title: 'Days of the Week', words: ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'] },
      { id: 203, title: 'Telling Time', words: ['كم الساعة؟', 'إنها الساعة', 'الصباح', 'بعد الظهر', 'المساء'] },
      { id: 209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 3, title: 'Family & People', emoji: '👨‍👩‍👧', lessons: [
      { id: 301, title: 'Family Members', words: ['أب', 'أم', 'أخ', 'أخت', 'ابن', 'ابنة'] },
      { id: 302, title: 'Describing People', words: ['طويل', 'قصير', 'شاب', 'عجوز', 'لطيف', 'ذكي'] },
      { id: 309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 4, title: 'Food & Drink', emoji: '🍽️', lessons: [
      { id: 401, title: 'Common Foods', words: ['خبز', 'ماء', 'حليب', 'أرز', 'دجاج', 'خضار'] },
      { id: 402, title: 'At the Restaurant', words: ['أريد', 'الحساب', 'كم السعر؟', 'لذيذ', 'قائمة الطعام'] },
      { id: 409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 5, title: 'Travel & Directions', emoji: '✈️', lessons: [
      { id: 501, title: 'Directions', words: ['أين يقع', 'على اليمين', 'على اليسار', 'مستقيم', 'فندق', 'شارع'] },
      { id: 502, title: 'Transport', words: ['طائرة', 'قطار', 'سيارة أجرة', 'تذكرة', 'محطة'] },
      { id: 509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 6, title: 'Shopping', emoji: '🛍️', lessons: [
      { id: 601, title: 'Clothing', words: ['ملابس', 'حذاء', 'بنطال', 'قميص', 'فستان'] },
      { id: 602, title: 'Buying', words: ['يشتري', 'رخيص', 'غال', 'جداً', 'يقيس'] },
      { id: 609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 7, title: 'Hobbies', emoji: '⚽', lessons: [
      { id: 701, title: 'Sports', words: ['كرة القدم', 'يسبح', 'يجري', 'كرة السلة', 'رياضة'] },
      { id: 702, title: 'Leisure', words: ['فيلم', 'موسيقى', 'كتاب', 'لعبة فيديو', 'يغني'] },
      { id: 709, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 8, title: 'Health & Weather', emoji: '🌦️', lessons: [
      { id: 801, title: 'Weather', words: ['مطر', 'ثلج', 'شمس', 'بارد', 'حار', 'رياح'] },
      { id: 802, title: 'Health', words: ['مريض', 'طبيب', 'ألم', 'دواء', 'زكام'] },
      { id: 809, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] },
    ]},
    { id: 9, title: 'الأعمال والتفاوض', emoji: '💼', lessons: [
      { id: 901, title: 'اجتماع عمل', words: ['يتفاوض', 'عقد', 'شراكة', 'جدول أعمال'] },
      { id: 902, title: 'إستراتيجية التسويق', words: ['سوق', 'عميل', 'حملة', 'إيرادات'] },
      { id: 909, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 10, title: 'السياسة والمجتمع', emoji: '🏛️', lessons: [
      { id: 1001, title: 'الحكومة والانتخابات', words: ['يصوت', 'ديمقراطية', 'انتخابات', 'سياسة'] },
      { id: 1002, title: 'قضايا اجتماعية', words: ['فقر', 'مساواة', 'عدالة', 'مواطنة'] },
      { id: 1009, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 11, title: 'العلوم والتكنولوجيا', emoji: '🔬', lessons: [
      { id: 1101, title: 'الذكاء الاصطناعي', words: ['خوارزمية', 'روبوت', 'أتمتة', 'ذكاء'] },
      { id: 1102, title: 'استكشاف الفضاء', words: ['مجرة', 'مدار', 'كوكب', 'صاروخ'] },
      { id: 1109, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 12, title: 'الفن والأدب', emoji: '🎨', lessons: [
      { id: 1201, title: 'الفن الكلاسيكي', words: ['لوحة', 'تحفة فنية', 'معرض', 'نحت'] },
      { id: 1202, title: 'الأدب والشعر', words: ['رواية', 'شعر', 'مؤلف', 'استعارة'] },
      { id: 1209, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 13, title: 'الأدب والفلسفة', emoji: '📚', lessons: [
      { id: 1301, title: 'الفلسفة الكلاسيكية', words: ['فلسفة', 'كونفوشيوسية', 'تاوية', 'حب الرعية'] },
      { id: 1302, title: 'التحليل الأدبي', words: ['تحليل', 'سرد', 'رمز', 'نقد'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: 'القانون والعدالة', emoji: '⚖️', lessons: [
      { id: 1401, title: 'النظام القانوني', words: ['قانون', 'دستور', 'تقاضي', 'دفاع'] },
      { id: 1402, title: 'حقوق الإنسان', words: ['حقوق', 'حرية', 'مساواة', 'كرامة'] },
      { id: 1409, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 15, title: 'المالية والاقتصاد', emoji: '📈', lessons: [
      { id: 1501, title: 'الاقتصاد العالمي', words: ['اقتصاد', 'تضخم', 'تجارة', 'مالية'] },
      { id: 1502, title: 'الاستثمار والأسواق', words: ['استثمار', 'أسهم', 'سندات', 'مخاطرة'] },
      { id: 1509, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 16, title: 'البيئة والأخلاقيات', emoji: '🌍', lessons: [
      { id: 1601, title: 'تغير المناخ', words: ['مناخ', 'انبعاثات', 'بيئة', 'حماية'] },
      { id: 1602, title: 'الأخلاقيات الحيوية والتقنية', words: ['أخلاقيات', 'جين', 'استنساخ', 'أخلاق'] },
      { id: 1609, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]}
  ],
};

import i18n from '../services/i18n';

export const UNITS = ALL_UNITS.zh;

export function getUnits(lang: LanguageCode = 'zh'): Unit[] {
  const units = ALL_UNITS[lang] ?? ALL_UNITS.zh;
  return units.map(u => ({
    ...u,
    title: i18n.t(u.title, u.title),
    lessons: u.lessons.map(l => ({
      ...l,
      title: i18n.t(l.title, l.title),
    }))
  }));
}
