import type { LanguageCode } from './courses';

export interface StorySlide {
  target: string;
  rom?: string;
  en: string;
}

export interface StoryQuiz {
  q: string;
  opts: string[];
  a: string;
}

export interface Story {
  id: number;
  title: string;
  targetTitle: string;
  romTitle?: string;
  ill: string;
  slides: StorySlide[];
  quiz: StoryQuiz;
}

export const STORIES_BY_LANG: Record<LanguageCode, Story[]> = {
  zh: [
    {
      id: 1,
      title: 'The Little Star',
      targetTitle: '小星星',
      romTitle: 'Xiǎo Xīngxīng',
      ill: '/story_star.png',
      slides: [
        { target: '从前，有一颗小星星。', rom: 'Cóngqián, yǒu yī kē xiǎo xīngxīng.', en: 'Once upon a time, there was a little star.' },
        { target: '小星星每天晚上都在天空发光。', rom: 'Xiǎo xīngxīng měitiān wǎnshàng dōu zài tiānkōng fāguāng.', en: 'The little star shone in the sky every night.' },
        { target: '有一天，小星星想下来看看地球。', rom: 'Yǒu yī tiān, xiǎo xīngxīng xiǎng xiàlái kànkan dìqiú.', en: 'One day, the little star wanted to come down and see the Earth.' },
        { target: '它看到了山、水和很多人，非常开心。', rom: 'Tā kàn dào le shān, shuǐ hé hěn duō rén, fēicháng kāixīn.', en: 'It saw mountains, water, and many people, and was very happy.' },
      ],
      quiz: {
        q: 'What did the little star do every night?',
        opts: ['Slept in the clouds', 'Shone in the sky', 'Visited the Earth', 'Played with the moon'],
        a: 'Shone in the sky',
      },
    },
    {
      id: 2,
      title: 'The Clever Rabbit',
      targetTitle: '聪明的兔子',
      romTitle: 'Cōngmíng de Tùzi',
      ill: '/story_rabbit.png',
      slides: [
        { target: '森林里住着一只聪明的兔子。', rom: 'Sēnlín lǐ zhù zhe yī zhī cōngmíng de tùzi.', en: 'A clever rabbit lived in the forest.' },
        { target: '兔子喜欢吃胡萝卜，每天去菜园找食物。', rom: 'Tùzi xǐhuān chī húluóbo, měitiān qù càiyuán zhǎo shíwù.', en: 'The rabbit loved carrots and went to the garden every day for food.' },
        { target: '一只狐狸想骗兔子，但兔子比狐狸更聪明。', rom: 'Yī zhī húlí xiǎng piàn tùzi, dant tùzi bǐ húlí gèng cōngmíng.', en: 'A fox tried to trick the rabbit, but the rabbit was smarter.' },
      ],
      quiz: {
        q: 'What did the rabbit love to eat?',
        opts: ['Apples', 'Carrots', 'Lettuce', 'Berries'],
        a: 'Carrots',
      },
    },
    {
      id: 3,
      title: 'The Wise Owl',
      targetTitle: '聪明的猫头鹰',
      romTitle: 'Cōngmíng de Māotóuyīng',
      ill: '/story_owl.png',
      slides: [
        { target: '森林里有一只老猫头鹰。', rom: 'Sēnlín lǐ yǒu yī zhī lǎo māotóuyīng.', en: 'There was an old owl in the forest.' },
        { target: '它每天晚上都在大树上看着大家。', rom: 'Tā měitiān wǎnshàng dōu zài dàshù shàng kànzhe dàjiā.', en: 'It watched everyone from the big tree every night.' },
        { target: '小动物们有麻烦，都来问它。', rom: 'Xiǎo dòngwùmen yǒu máfan, dōu lái wèn tā.', en: 'When little animals had trouble, they all came to ask it.' },
      ],
      quiz: {
        q: 'Where did the wise owl sit?',
        opts: ['In the river', 'On a big tree', 'On the grass', 'In a cave'],
        a: 'On a big tree',
      },
    },
    {
      id: 4,
      title: 'The Lost Puppy',
      targetTitle: '迷路的小狗',
      romTitle: 'Mílù de Xiǎogǒu',
      ill: '/story_rabbit.png',
      slides: [
        { target: '有一天，一只小狗迷路了。', rom: 'Yǒu yī tiān, yī zhī xiǎogǒu mílù le.', en: 'One day, a little puppy got lost.' },
        { target: '它在路边哭，一个男孩看见了它。', rom: 'Tā zài lùbiān kū, yī gè nánhái kànjiàn le tā.', en: 'It was crying by the roadside, a boy saw it.' },
        { target: '男孩带小狗回家，给它好吃的。', rom: 'Nánhái dài xiǎogǒu huíjiā, gěi tā hǎochī de.', en: 'The boy took the puppy home and gave it delicious food.' },
      ],
      quiz: {
        q: 'What did the boy give the puppy?',
        opts: ['Water', 'Delicious food', 'A blanket', 'A toy bone'],
        a: 'Delicious food',
      },
    },
  ],
  es: [
    {
      id: 1,
      title: 'The Little Star',
      targetTitle: 'La pequeña estrella',
      ill: '/story_star.png',
      slides: [
        { target: 'Había una vez una pequeña estrella.', en: 'Once upon a time, there was a little star.' },
        { target: 'La pequeña estrella brillaba en el cielo todas las noches.', en: 'The little star shone in the sky every night.' },
        { target: 'Un día, la estrella quiso bajar a ver la Tierra.', en: 'One day, the star wanted to come down to see the Earth.' },
        { target: 'Vio montañas, agua y mucha gente, y se sintió muy feliz.', en: 'It saw mountains, water, and many people, and was very happy.' },
      ],
      quiz: {
        q: 'What did the little star do every night?',
        opts: ['Slept in the clouds', 'Shone in the sky', 'Visited the Earth', 'Played with the moon'],
        a: 'Shone in the sky',
      },
    },
    {
      id: 2,
      title: 'The Clever Rabbit',
      targetTitle: 'El conejo inteligente',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'Había una vez un conejo inteligente en el bosque.', en: 'There was once a clever rabbit in the forest.' },
        { target: 'Al conejo le gustaban las zanahorias y las buscaba todos los días.', en: 'The rabbit loved carrots and searched for them every day.' },
        { target: 'Un zorro intentó engañar al conejo, pero el conejo fue más listo.', en: 'A fox tried to trick the rabbit, but the rabbit was smarter.' },
      ],
      quiz: {
        q: 'What did the rabbit love to eat?',
        opts: ['Apples', 'Carrots', 'Lettuce', 'Berries'],
        a: 'Carrots',
      },
    },
    {
      id: 3,
      title: 'The Wise Owl',
      targetTitle: 'El búho sabio',
      ill: '/story_owl.png',
      slides: [
        { target: 'Había un viejo búho en el bosque.', en: 'There was an old owl in the forest.' },
        { target: 'Observaba a todos desde el gran árbol cada noche.', en: 'It watched everyone from the big tree every night.' },
        { target: 'Los animales pequeños iban a preguntarle cuando tenían problemas.', en: 'When little animals had trouble, they all came to ask it.' },
      ],
      quiz: {
        q: 'Where did the wise owl sit?',
        opts: ['In the river', 'On a big tree', 'On the grass', 'In a cave'],
        a: 'On a big tree',
      },
    },
    {
      id: 4,
      title: 'The Lost Puppy',
      targetTitle: 'El cachorro perdido',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'Un día, un pequeño cachorro se perdió.', en: 'One day, a little puppy got lost.' },
        { target: 'Lloraba al lado del camino, cuando un niño lo vio.', en: 'It was crying by the roadside, when a boy saw it.' },
        { target: 'El niño llevó al cachorro a casa y le dio comida deliciosa.', en: 'The boy took the puppy home and gave it delicious food.' },
      ],
      quiz: {
        q: 'What did the boy give the puppy?',
        opts: ['Water', 'Delicious food', 'A blanket', 'A toy bone'],
        a: 'Delicious food',
      },
    },
  ],
  fr: [
    {
      id: 1,
      title: 'The Little Star',
      targetTitle: 'La petite étoile',
      ill: '/story_star.png',
      slides: [
        { target: 'Il était une fois une petite étoile.', en: 'Once upon a time, there was a little star.' },
        { target: 'La petite étoile brillait dans le ciel chaque nuit.', en: 'The little star shone in the sky every night.' },
        { target: 'Un jour, l\'étoile a voulu descendre voir la Terre.', en: 'One day, the star wanted to come down to see the Earth.' },
        { target: 'Elle a vu des montagnes, de l\'eau et beaucoup de gens, et était très heureuse.', en: 'She saw mountains, water, and many people, and was very happy.' },
      ],
      quiz: {
        q: 'What did the little star do every night?',
        opts: ['Slept in the clouds', 'Shone in the sky', 'Visited the Earth', 'Played with the moon'],
        a: 'Shone in the sky',
      },
    },
    {
      id: 2,
      title: 'The Clever Rabbit',
      targetTitle: 'Le lapin intelligent',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'Il y avait un lapin intelligent dans la forêt.', en: 'There was a clever rabbit in the forest.' },
        { target: 'Le lapin adorait les carottes et en cherchait chaque jour.', en: 'The rabbit loved carrots and searched for them every day.' },
        { target: 'Un renard a essayé de tromper le lapin, mais le lapin était plus malin.', en: 'A fox tried to trick the rabbit, but the rabbit was smarter.' },
      ],
      quiz: {
        q: 'What did the rabbit love to eat?',
        opts: ['Apples', 'Carrots', 'Lettuce', 'Berries'],
        a: 'Carrots',
      },
    },
    {
      id: 3,
      title: 'The Wise Owl',
      targetTitle: 'Le hibou sage',
      ill: '/story_owl.png',
      slides: [
        { target: 'Il y avait un vieux hibou dans la forêt.', en: 'There was an old owl in the forest.' },
        { target: 'Il regardait tout le monde depuis le grand arbre chaque nuit.', en: 'It watched everyone from the big tree every night.' },
        { target: 'Les petits animaux venaient lui demander quand ils avaient des problèmes.', en: 'When little animals had trouble, they all came to ask it.' },
      ],
      quiz: {
        q: 'Where did the wise owl sit?',
        opts: ['In the river', 'On a big tree', 'On the grass', 'In a cave'],
        a: 'On a big tree',
      },
    },
    {
      id: 4,
      title: 'The Lost Puppy',
      targetTitle: 'Le chiot perdu',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'Un jour, un petit chiot s\'est perdu.', en: 'One day, a little puppy got lost.' },
        { target: 'Il pleurait sur le bord de la route, quand un garçon l\'a vu.', en: 'It was crying by the roadside, when a boy saw it.' },
        { target: 'Le garçon a ramené le chiot à la maison et lui a donné de la nourriture délicieuse.', en: 'The boy took the puppy home and gave it delicious food.' },
      ],
      quiz: {
        q: 'What did the boy give the puppy?',
        opts: ['Water', 'Delicious food', 'A blanket', 'A toy bone'],
        a: 'Delicious food',
      },
    },
  ],
  de: [
    {
      id: 1,
      title: 'The Little Star',
      targetTitle: 'Der kleine Stern',
      ill: '/story_star.png',
      slides: [
        { target: 'Es war einmal ein kleiner Stern.', en: 'Once upon a time, there was a little star.' },
        { target: 'Der kleine Stern leuchtete jede Nacht am Himmel.', en: 'The little star shone in the sky every night.' },
        { target: 'Eines Tages wollte der Stern auf die Erde hinabsehen.', en: 'One day, the star wanted to come down to see the Earth.' },
        { target: 'Er sah Berge, Wasser und viele Menschen und war sehr glücklich.', en: 'He saw mountains, water, and many people, and was very happy.' },
      ],
      quiz: {
        q: 'What did the little star do every night?',
        opts: ['Slept in the clouds', 'Shone in the sky', 'Visited the Earth', 'Played with the moon'],
        a: 'Shone in the sky',
      },
    },
    {
      id: 2,
      title: 'The Clever Rabbit',
      targetTitle: 'Das schlaue Kaninchen',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'Es gab einmal ein schlaues Kaninchen im Wald.', en: 'There was once a clever rabbit in the forest.' },
        { target: 'Das Kaninchen liebte Karotten und suchte jeden Tag danach.', en: 'The rabbit loved carrots and searched for them every day.' },
        { target: 'Ein Fuchs wollte das Kaninchen reinlegen, aber das Kaninchen war schlauer.', en: 'A fox tried to trick the rabbit, but the rabbit was smarter.' },
      ],
      quiz: {
        q: 'What did the rabbit love to eat?',
        opts: ['Apples', 'Carrots', 'Lettuce', 'Berries'],
        a: 'Carrots',
      },
    },
    {
      id: 3,
      title: 'The Wise Owl',
      targetTitle: 'Die weise Eule',
      ill: '/story_owl.png',
      slides: [
        { target: 'Es gab eine alte Eule im Wald.', en: 'There was an old owl in the forest.' },
        { target: 'Sie beobachtete jeden Abend alle von dem großen Baum aus.', en: 'It watched everyone from the big tree every night.' },
        { target: 'Kleine Tiere kamen und fragten sie, wenn sie Probleme hatten.', en: 'When little animals had trouble, they all came to ask it.' },
      ],
      quiz: {
        q: 'Where did the wise owl sit?',
        opts: ['In the river', 'On a big tree', 'On the grass', 'In a cave'],
        a: 'On a big tree',
      },
    },
    {
      id: 4,
      title: 'The Lost Puppy',
      targetTitle: 'Der verlorene Welpe',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'Eines Tages ging ein kleiner Welpe verloren.', en: 'One day, a little puppy got lost.' },
        { target: 'Er weinte am Straßenrand, als ein Junge ihn sah.', en: 'It was crying by the roadside, when a boy saw it.' },
        { target: 'Der Junge brachte den Welpen nach Hause und gab ihm leckeres Futter.', en: 'The boy took the puppy home and gave it delicious food.' },
      ],
      quiz: {
        q: 'What did the boy give the puppy?',
        opts: ['Water', 'Delicious food', 'A blanket', 'A toy bone'],
        a: 'Delicious food',
      },
    },
  ],
  ja: [
    {
      id: 1,
      title: 'The Little Star',
      targetTitle: '小さな星',
      romTitle: 'Chiisana Hoshi',
      ill: '/story_star.png',
      slides: [
        { target: '昔々、小さな星がありました。', rom: 'Mukashimukashi, chiisana hoshi ga arimashita.', en: 'Once upon a time, there was a little star.' },
        { target: '小さな星は毎晩、空で輝いていました。', rom: 'Chiisana hoshi wa maiban, sora de kagayaiteshimashita.', en: 'The little star shone in the sky every night.' },
        { target: 'ある日、星は地球を見に下りたいと思いました。', rom: 'Aru hi, hoshi wa chikyū o mi ni kudaritai to omoimashita.', en: 'One day, the star wanted to come down to see the Earth.' },
        { target: '山や水、たくさんの人々を見て、とても喜びました。', rom: 'Yama ya mizu, takusan no hitobito o mite, totemo yorokobimashita.', en: 'It saw mountains, water, and many people, and was very happy.' },
      ],
      quiz: {
        q: 'What did the little star do every night?',
        opts: ['Slept in the clouds', 'Shone in the sky', 'Visited the Earth', 'Played with the moon'],
        a: 'Shone in the sky',
      },
    },
    {
      id: 2,
      title: 'The Clever Rabbit',
      targetTitle: '賢いウサギ',
      romTitle: 'Kashikoi Usagi',
      ill: '/story_rabbit.png',
      slides: [
        { target: '森に賢いウサギが住んでいました。', rom: 'Mori ni kashikoi usagi ga sundeimashita.', en: 'A clever rabbit lived in the forest.' },
        { target: 'ウサギはニンジンが大好きで、毎日探していました。', rom: 'Usagi wa ninjin ga daisuki de, mainichi sagashiteimashita.', en: 'The rabbit loved carrots and searched for them every day.' },
        { target: 'キツネはウサギをだまそうとしましたが、ウサギの方が賢かったです。', rom: 'Kitsune wa usagi o damasō to shimashita ga, usagi no hō ga kashikokatta desu.', en: 'A fox tried to trick the rabbit, but the rabbit was smarter.' },
      ],
      quiz: {
        q: 'What did the rabbit love to eat?',
        opts: ['Apples', 'Carrots', 'Lettuce', 'Berries'],
        a: 'Carrots',
      },
    },
    {
      id: 3,
      title: 'The Wise Owl',
      targetTitle: '賢いフクロウ',
      romTitle: 'Kashikoi Fukurō',
      ill: '/story_owl.png',
      slides: [
        { target: '森に年老いたフクロウがいました。', rom: 'Mori ni toshioita fukurō ga imashita.', en: 'There was an old owl in the forest.' },
        { target: '毎晩、大きな木の上からみんなを見ていました。', rom: 'Maiban, ōkina ki no ue kara minna o miteimashita.', en: 'It watched everyone from the big tree every night.' },
        { target: '小さな動物たちは困ったとき、フクロウに聞きに来ました。', rom: 'Chiisana dōbutsutachi wa komatta toki, fukurō ni kiki ni kimashita.', en: 'When little animals had trouble, they all came to ask it.' },
      ],
      quiz: {
        q: 'Where did the wise owl sit?',
        opts: ['In the river', 'On a big tree', 'On the grass', 'In a cave'],
        a: 'On a big tree',
      },
    },
    {
      id: 4,
      title: 'The Lost Puppy',
      targetTitle: '迷子の子犬',
      romTitle: 'Maigo no Koinu',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'ある日、小さな子犬が迷子になりました。', rom: 'Aru hi, chiisana koinu ga maigo ni narimashita.', en: 'One day, a little puppy got lost.' },
        { target: '道端で泣いていると、一人の男の子がそれを見つけました。', rom: 'Michibata de naite iru to, hitori no otokonoko ga sore o mitsukemashita.', en: 'It was crying by the roadside, when a boy saw it.' },
        { target: '男の子は子犬を家に連れて帰り、美味しい食べ物を与えました。', rom: 'Otokonoko wa koinu o ie ni tsurete kaeri, oishii tabemono o ataemashita.', en: 'The boy took the puppy home and gave it delicious food.' },
      ],
      quiz: {
        q: 'What did the boy give the puppy?',
        opts: ['Water', 'Delicious food', 'A blanket', 'A toy bone'],
        a: 'Delicious food',
      },
    },
  ],
  ko: [
    {
      id: 1,
      title: 'The Little Star',
      targetTitle: '작은 별',
      romTitle: 'Jageun Byeol',
      ill: '/story_star.png',
      slides: [
        { target: '옛날 옛적에 작은 별이 있었습니다.', rom: 'Yennal yetjeoge jageun byeoli isseotseumnida.', en: 'Once upon a time, there was a little star.' },
        { target: '작은 별은 매일 밤 하늘에서 빛났습니다.', rom: 'Jageun byeoleun maeil bam haneureseo binnasseumnida.', en: 'The little star shone in the sky every night.' },
        { target: '어느 날, 별은 지구를 보러 내려가고 싶었습니다.', rom: 'Eoneu nal, byeoleun jigureul boreo naeryeogago sipeotseumnida.', en: 'One day, the star wanted to come down to see the Earth.' },
        { target: '산과 물, 그리고 많은 사람들을 보고 매우 기뻐했습니다.', rom: 'Sangwa mul, geurigo maneun saramdeureul bogo maeureul gippeohasseumnida.', en: 'It saw mountains, water, and many people, and was very happy.' },
      ],
      quiz: {
        q: 'What did the little star do every night?',
        opts: ['Slept in the clouds', 'Shone in the sky', 'Visited the Earth', 'Played with the moon'],
        a: 'Shone in the sky',
      },
    },
    {
      id: 2,
      title: 'The Clever Rabbit',
      targetTitle: '똑똑한 토끼',
      romTitle: 'Ttokttokhan Tokki',
      ill: '/story_rabbit.png',
      slides: [
        { target: '숲 속에 똑똑한 토끼가 살고 있었습니다.', rom: 'Sup soge ttokttokhan tokki ga salgo isseotseumnida.', en: 'A clever rabbit lived in the forest.' },
        { target: '토끼는 당근을 좋아해서 매일 당근을 찾았습니다.', rom: 'Tokki neun danggeun eul joahaseo maeil danggeun eul chajatseumnida.', en: 'The rabbit loved carrots and searched for them every day.' },
        { target: '여우가 토끼를 속이려 했지만, 토끼가 더 똑똑했습니다.', rom: 'Yeou ga tokki reul sogiryeo haetjiman, tokki ga deo ttokttokhaetseumnida.', en: 'A fox tried to trick the rabbit, but the rabbit was smarter.' },
      ],
      quiz: {
        q: 'What did the rabbit love to eat?',
        opts: ['Apples', 'Carrots', 'Lettuce', 'Berries'],
        a: 'Carrots',
      },
    },
    {
      id: 3,
      title: 'The Wise Owl',
      targetTitle: '지혜로운 부엉이',
      romTitle: 'Jihyeroun Bueongi',
      ill: '/story_owl.png',
      slides: [
        { target: '숲 속에 늙은 부엉이가 있었습니다.', rom: 'Sup soge neulgeun bueongi ga isseotseumnida.', en: 'There was an old owl in the forest.' },
        { target: '매일 밤 큰 나무 위에서 모두를 지켜보았습니다.', rom: 'Maeil bam keun namu wieseo modureul jikyeoboatseumnida.', en: 'It watched everyone from the big tree every night.' },
        { target: '작은 동물들은 문제가 생겼을 때 부엉이에게 물어보러 왔습니다.', rom: 'Jageun dongmuldeureun munje ga saenggyeosseul ttae bueongi ege mureoboreo watseumnida.', en: 'When little animals had trouble, they all came to ask it.' },
      ],
      quiz: {
        q: 'Where did the wise owl sit?',
        opts: ['In the river', 'On a big tree', 'On the grass', 'In a cave'],
        a: 'On a big tree',
      },
    },
    {
      id: 4,
      title: 'The Lost Puppy',
      targetTitle: '길 잃은 강아지',
      romTitle: 'Gil ireun Gangaji',
      ill: '/story_rabbit.png',
      slides: [
        { target: '어느 날, 작은 강아지 한 마리가 길을 잃었습니다.', rom: 'Eoneu nal, jageun gangaji han mari ga gil eul ireotseumnida.', en: 'One day, a little puppy got lost.' },
        { target: '길가에서 울고 있을 때, 한 소년이 그것을 발견했습니다.', rom: 'Gilga eseo ulgo isseul ttae, han sonyeon i geugeot eul balgyeonhaetseumnida.', en: 'It was crying by the roadside, when a boy saw it.' },
        { target: '소년은 강아지를 집으로 데려가 맛있는 음식을 주었습니다.', rom: 'Sonyeon eun gangaji reul jip euro deryeoga masitneun eomsik eul jueotseumnida.', en: 'The boy took the puppy home and gave it delicious food.' },
      ],
      quiz: {
        q: 'What did the boy give the puppy?',
        opts: ['Water', 'Delicious food', 'A blanket', 'A toy bone'],
        a: 'Delicious food',
      },
    },
  ],
  it: [
    {
      id: 1,
      title: 'The Little Star',
      targetTitle: 'La piccola stella',
      ill: '/story_star.png',
      slides: [
        { target: 'C\'era una volta una piccola stella.', en: 'Once upon a time, there was a little star.' },
        { target: 'La piccola stella brillava nel cielo ogni notte.', en: 'The little star shone in the sky every night.' },
        { target: 'Un giorno, la stella voleva scendere a vedere la Terra.', en: 'One day, the star wanted to come down to see the Earth.' },
        { target: 'Ha visto montagne, acqua e molte persone, ed era molto felice.', en: 'She saw mountains, water, and many people, and was very happy.' },
      ],
      quiz: {
        q: 'What did the little star do every night?',
        opts: ['Slept in the clouds', 'Shone in the sky', 'Visited the Earth', 'Played with the moon'],
        a: 'Shone in the sky',
      },
    },
    {
      id: 2,
      title: 'The Clever Rabbit',
      targetTitle: 'Il coniglio intelligente',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'C\'era una volta un coniglio intelligente nel bosco.', en: 'There was once a clever rabbit in the forest.' },
        { target: 'Al coniglio piacevano le carote e le cercava ogni giorno.', en: 'The rabbit loved carrots and searched for them every day.' },
        { target: 'Una volpe ha cercato di ingannare il coniglio, ma il coniglio è stato più furbo.', en: 'A fox tried to trick the rabbit, but the rabbit was smarter.' },
      ],
      quiz: {
        q: 'What did the rabbit love to eat?',
        opts: ['Apples', 'Carrots', 'Lettuce', 'Berries'],
        a: 'Carrots',
      },
    },
    {
      id: 3,
      title: 'The Wise Owl',
      targetTitle: 'Il gufo saggio',
      ill: '/story_owl.png',
      slides: [
        { target: 'C\'era un vecchio gufo nel bosco.', en: 'There was an old owl in the forest.' },
        { target: 'Osservava tutti dal grande albero ogni notte.', en: 'It watched everyone from the big tree every night.' },
        { target: 'I piccoli animali andavano a chiedere aiuto quando avevano problemi.', en: 'When little animals had trouble, they all came to ask it.' },
      ],
      quiz: {
        q: 'Where did the wise owl sit?',
        opts: ['In the river', 'On a big tree', 'On the grass', 'In a cave'],
        a: 'On a big tree',
      },
    },
    {
      id: 4,
      title: 'The Lost Puppy',
      targetTitle: 'Il cucciolo smarrito',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'Un giorno, un piccolo cucciolo si smarrì.', en: 'One day, a little puppy got lost.' },
        { target: 'Piangeva sul ciglio della strada, quando un ragazzo lo vide.', en: 'It was crying by the roadside, when a boy saw it.' },
        { target: 'Il ragazzo portò il cucciolo a casa e gli diede cibo delizioso.', en: 'The boy took the puppy home and gave it delicious food.' },
      ],
      quiz: {
        q: 'What did the boy give the puppy?',
        opts: ['Water', 'Delicious food', 'A blanket', 'A toy bone'],
        a: 'Delicious food',
      },
    },
  ],
  en: [
    {
      id: 1,
      title: 'The Little Star',
      targetTitle: 'The Little Star',
      ill: '/story_star.png',
      slides: [
        { target: 'Once upon a time, there was a little star.', en: 'Once upon a time, there was a little star.' },
        { target: 'The little star shone in the sky every night.', en: 'The little star shone in the sky every night.' },
        { target: 'One day, the little star wanted to come down and see the Earth.', en: 'One day, the little star wanted to come down and see the Earth.' },
        { target: 'It saw mountains, water, and many people, and was very happy.', en: 'It saw mountains, water, and many people, and was very happy.' },
      ],
      quiz: {
        q: 'What did the little star do every night?',
        opts: ['Slept in the clouds', 'Shone in the sky', 'Visited the Earth', 'Played with the moon'],
        a: 'Shone in the sky',
      },
    },
    {
      id: 2,
      title: 'The Clever Rabbit',
      targetTitle: 'The Clever Rabbit',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'A clever rabbit lived in the forest.', en: 'A clever rabbit lived in the forest.' },
        { target: 'The rabbit loved carrots and went to the garden every day for food.', en: 'The rabbit loved carrots and went to the garden every day for food.' },
        { target: 'A fox tried to trick the rabbit, but the rabbit was smarter.', en: 'A fox tried to trick the rabbit, but the rabbit was smarter.' },
      ],
      quiz: {
        q: 'What did the rabbit love to eat?',
        opts: ['Apples', 'Carrots', 'Lettuce', 'Berries'],
        a: 'Carrots',
      },
    },
    {
      id: 3,
      title: 'The Wise Owl',
      targetTitle: 'The Wise Owl',
      ill: '/story_owl.png',
      slides: [
        { target: 'There was an old owl in the forest.', en: 'There was an old owl in the forest.' },
        { target: 'It watched everyone from the big tree every night.', en: 'It watched everyone from the big tree every night.' },
        { target: 'When little animals had trouble, they all came to ask it.', en: 'When little animals had trouble, they all came to ask it.' },
      ],
      quiz: {
        q: 'Where did the wise owl sit?',
        opts: ['In the river', 'On a big tree', 'On the grass', 'In a cave'],
        a: 'On a big tree',
      },
    },
    {
      id: 4,
      title: 'The Lost Puppy',
      targetTitle: 'The Lost Puppy',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'One day, a little puppy got lost.', en: 'One day, a little puppy got lost.' },
        { target: 'It was crying by the roadside, when a boy saw it.', en: 'It was crying by the roadside, when a boy saw it.' },
        { target: 'The boy took the puppy home and gave it delicious food.', en: 'The boy took the puppy home and gave it delicious food.' },
      ],
      quiz: {
        q: 'What did the boy give the puppy?',
        opts: ['Water', 'Delicious food', 'A blanket', 'A toy bone'],
        a: 'Delicious food',
      },
    },
  ],
  ar: [
    {
      id: 1,
      title: 'The Little Star',
      targetTitle: 'النجمة الصغيرة',
      ill: '/story_star.png',
      slides: [
        { target: 'كان يا ما كان، كان هناك نجمة صغيرة.', en: 'Once upon a time, there was a little star.' },
        { target: 'كانت النجمة الصغيرة تلمع في السماء كل ليلة.', en: 'The little star shone in the sky every night.' },
        { target: 'في أحد الأيام، أرادت النجمة الصغيرة النزول لرؤية الأرض.', en: 'One day, the star wanted to come down to see the Earth.' },
        { target: 'رأت الجبال والمياه والعديد من الناس، وكانت سعيدة جداً.', en: 'She saw mountains, water, and many people, and was very happy.' },
      ],
      quiz: {
        q: 'What did the little star do every night?',
        opts: ['Slept in the clouds', 'Shone in the sky', 'Visited the Earth', 'Played with the moon'],
        a: 'Shone in the sky',
      },
    },
    {
      id: 2,
      title: 'The Clever Rabbit',
      targetTitle: 'الأرنب الذكي',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'كان هناك أرنب ذكي يعيش في الغابة.', en: 'There was a clever rabbit living in the forest.' },
        { target: 'كان الأرنب يحب الجزر ويبحث عنه كل يوم.', en: 'The rabbit loved carrots and searched for them every day.' },
        { target: 'حاول ثعلب أن يخدع الأرنب، لكن الأرنب كان أذكى.', en: 'A fox tried to trick the rabbit, but the rabbit was smarter.' },
      ],
      quiz: {
        q: 'What did the rabbit love to eat?',
        opts: ['Apples', 'Carrots', 'Lettuce', 'Berries'],
        a: 'Carrots',
      },
    },
    {
      id: 3,
      title: 'The Wise Owl',
      targetTitle: 'البومة الحكيمة',
      ill: '/story_owl.png',
      slides: [
        { target: 'كان هناك بومة عجوز في الغابة.', en: 'There was an old owl in the forest.' },
        { target: 'كانت تراقب الجميع من الشجرة الكبيرة كل ليلة.', en: 'It watched everyone from the big tree every night.' },
        { target: 'عندما كانت تواجه الحيوانات الصغيرة مشاكل، كانت تأتي لتسألها.', en: 'When little animals had trouble, they all came to ask it.' },
      ],
      quiz: {
        q: 'Where did the wise owl sit?',
        opts: ['In the river', 'On a big tree', 'On the grass', 'In a cave'],
        a: 'On a big tree',
      },
    },
    {
      id: 4,
      title: 'The Lost Puppy',
      targetTitle: 'الجرو التائه',
      ill: '/story_rabbit.png',
      slides: [
        { target: 'في أحد الأيام، ضل جرو صغير طريقه.', en: 'One day, a little puppy got lost.' },
        { target: 'كان يبكي على جانب الطريق، عندما رآه صبي صغير.', en: 'It was crying by the roadside, when a little boy saw it.' },
        { target: 'أخذ الصبي الجرو إلى المنزل وأعطاه طعاماً لذيذاً.', en: 'The boy took the puppy home and gave it delicious food.' },
      ],
      quiz: {
        q: 'What did the boy give the puppy?',
        opts: ['Water', 'Delicious food', 'A blanket', 'A toy bone'],
        a: 'Delicious food',
      },
    },
  ],
};

import i18n from '../services/i18n';

export function getStories(lang: LanguageCode = 'zh'): Story[] {
  const stories = STORIES_BY_LANG[lang] ?? STORIES_BY_LANG.zh;
  return stories.map(s => ({
    ...s,
    title: i18n.t(s.title, s.title),
    slides: s.slides.map(sl => ({ ...sl, en: i18n.t(sl.en, sl.en) })),
    quiz: {
      ...s.quiz,
      q: i18n.t(s.quiz.q, s.quiz.q),
      opts: s.quiz.opts.map(o => i18n.t(o, o))
    }
  }));
}
