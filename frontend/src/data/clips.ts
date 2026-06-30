export interface Clip {
  id: string;
  title: string;
  topic: 'daily life' | 'news' | 'travel' | 'humor' | 'drama';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl?: string;
  youtubeId: string;
  phrases: { phrase: string; pinyin?: string; meaning: string; }[];
  explanation: string;
}

export const CLIPS_BY_LANG: Record<string, Clip[]> = {
  "zh": [
    {
      "id": "zh-1",
      "title": "Learn Chinese for Beginners | Beginner Chinese Lesson 1: Self-Introduction in Chinese Mandarin 1.1",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "McZW0iDsZns",
      "explanation": "Master the 4 tones in Mandarin Chinese. This video explains the pitch contours and provides clear examples.",
      "phrases": [
        {
          "phrase": "妈",
          "pinyin": "mā",
          "meaning": "Mother (First tone: high and level)"
        },
        {
          "phrase": "麻",
          "pinyin": "má",
          "meaning": "Hemp (Second tone: rising)"
        },
        {
          "phrase": "马",
          "pinyin": "mǎ",
          "meaning": "Horse (Third tone: falling-rising)"
        },
        {
          "phrase": "骂",
          "pinyin": "mà",
          "meaning": "Scold (Fourth tone: falling)"
        },
        {
          "phrase": "妈妈骑马",
          "pinyin": "mā ma qí mǎ",
          "meaning": "Mother rides a horse."
        },
        {
          "phrase": "马慢妈妈骂马",
          "pinyin": "mǎ màn mā ma mà mǎ",
          "meaning": "The horse is slow, mother scolds the horse."
        },
        {
          "phrase": "第一声是高平调",
          "pinyin": "dì yī shēng shì gāo píng diào",
          "meaning": "The first tone is high and flat."
        },
        {
          "phrase": "第二声是中升调",
          "pinyin": "dì èr shēng shì zhōng shēng diào",
          "meaning": "The second tone is mid-rising."
        },
        {
          "phrase": "第三声是降升调",
          "pinyin": "dì sān shēng shì jiàng shēng diào",
          "meaning": "The third tone is falling-rising."
        },
        {
          "phrase": "第四声是高降调",
          "pinyin": "dì sì shēng shì gāo jiàng diào",
          "meaning": "The fourth tone is high-falling."
        }
      ]
    },
    {
      "id": "zh-2",
      "title": "100 Chinese Phrases for Beginners | Chinese Lessons",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "oqSof_8euUg",
      "explanation": "Learn the standard and casual ways to greet people in China.",
      "phrases": [
        {
          "phrase": "你好",
          "pinyin": "nǐ hǎo",
          "meaning": "Hello."
        },
        {
          "phrase": "您好",
          "pinyin": "nín hǎo",
          "meaning": "Hello (polite)."
        },
        {
          "phrase": "大家好",
          "pinyin": "dà jiā hǎo",
          "meaning": "Hello everyone."
        },
        {
          "phrase": "早上好",
          "pinyin": "zǎo shang hǎo",
          "meaning": "Good morning."
        },
        {
          "phrase": "下午好",
          "pinyin": "xià wǔ hǎo",
          "meaning": "Good afternoon."
        },
        {
          "phrase": "晚上好",
          "pinyin": "wǎn shang hǎo",
          "meaning": "Good evening."
        },
        {
          "phrase": "最近怎么样？",
          "pinyin": "zuì jìn zěn me yàng?",
          "meaning": "How have you been lately?"
        },
        {
          "phrase": "我很好，谢谢！",
          "pinyin": "wǒ hěn hǎo, xiè xie!",
          "meaning": "I'm very well, thank you!"
        },
        {
          "phrase": "喂，你到了吗？",
          "pinyin": "wèi, nǐ dào le ma?",
          "meaning": "Hey, have you arrived?"
        },
        {
          "phrase": "好久不见！",
          "pinyin": "hǎo jiǔ bú jiàn!",
          "meaning": "Long time no see!"
        }
      ]
    },
    {
      "id": "zh-3",
      "title": "Learn Chinese in 5 Hours (for Beginners) - HSK Level 1 | Learn Chinese for Beginners | Conversations",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "Gql5mU0OKB8",
      "explanation": "Navigate a Chinese bubble tea shop like a pro. Learn how to specify sugar and ice levels.",
      "phrases": [
        {
          "phrase": "我想买一杯奶茶。",
          "pinyin": "wǒ xiǎng mǎi yì bēi nǎi chá.",
          "meaning": "I want to buy a cup of milk tea."
        },
        {
          "phrase": "你要大杯还是中杯？",
          "pinyin": "nǐ yào dà bēi hái shì zhōng bēi?",
          "meaning": "Do you want a large cup or a medium cup?"
        },
        {
          "phrase": "我要大杯的珍珠奶茶。",
          "pinyin": "wǒ yào dà bēi de zhēn zhū nǎi chá.",
          "meaning": "I want a large pearl milk tea."
        },
        {
          "phrase": "甜度需要调整吗？",
          "pinyin": "tián dù xū yào tiáo zhěng ma?",
          "meaning": "Do you need to adjust the sweetness level?"
        },
        {
          "phrase": "我要微糖，三分甜。",
          "pinyin": "wǒ yào wēi táng, sān fēn tián.",
          "meaning": "I want micro-sweetness, 30% sugar."
        },
        {
          "phrase": "冰量需要调整吗？",
          "pinyin": "bīng liàng xū yào tiáo zhěng ma?",
          "meaning": "Do you need to adjust the ice level?"
        },
        {
          "phrase": "请去冰。",
          "pinyin": "qǐng qù bīng.",
          "meaning": "No ice, please."
        },
        {
          "phrase": "还需要加别的配料吗？",
          "pinyin": "hái xū yào jiā bié de pèi liào ma?",
          "meaning": "Do you need to add any other toppings?"
        },
        {
          "phrase": "再加一份椰果。",
          "pinyin": "zài jiā yí fèn yē guǒ.",
          "meaning": "Add a serving of coconut jelly."
        },
        {
          "phrase": "在这里喝还是打包？",
          "pinyin": "zài zhè lǐ hē hái shì dǎ bāo?",
          "meaning": "Drink here or take away?"
        }
      ]
    },
    {
      "id": "zh-4",
      "title": "How to learn Mandarin Chinese from 0-fluency ? (Resources, Methods and Study Plans)",
      "topic": "humor",
      "level": "Advanced",
      "youtubeId": "v_VUa80gMf0",
      "explanation": "Modern internet slang used by Chinese netizens on Weibo and TikTok.",
      "phrases": [
        {
          "phrase": "这太给力了！",
          "pinyin": "zhè tài gěi lì le!",
          "meaning": "This is awesome / cool!"
        },
        {
          "phrase": "我们在微信上尬聊。",
          "pinyin": "wǒ men zài wēi xìn shàng gà liáo.",
          "meaning": "We had an awkward chat on WeChat."
        },
        {
          "phrase": "他的操作真溜，666！",
          "pinyin": "tā de cāo zuò zhēn liù, liù liù liù!",
          "meaning": "His moves are so slick, brilliant!"
        },
        {
          "phrase": "我最近只想躺平。",
          "pinyin": "wǒ zuì jìn zhǐ xiǎng tǎng píng.",
          "meaning": "I just want to lie flat / do nothing lately."
        },
        {
          "phrase": "别再凡尔赛了。",
          "pinyin": "bié zài fán ěr sài le.",
          "meaning": "Stop humblebragging."
        },
        {
          "phrase": "我只是个吃瓜群众。",
          "pinyin": "wǒ zhǐ shì gè chī guā qún zhòng.",
          "meaning": "I'm just a bystander eating watermelon (watching drama)."
        },
        {
          "phrase": "这个设计真是绝绝子！",
          "pinyin": "zhè ge shè jì zhēn shì jué jué zǐ!",
          "meaning": "This design is absolutely amazing!"
        },
        {
          "phrase": "看到他们秀恩爱，我变柠檬精了。",
          "pinyin": "kàn dào tā men xiù ēn ài, wǒ biàn níng méng jīng le.",
          "meaning": "Seeing them show affection makes me a lemon spirit (jealous)."
        },
        {
          "phrase": "这句话让我破防了。",
          "pinyin": "jù huà ràng wǒ pò fáng le.",
          "meaning": "This sentence broke my emotional defense."
        },
        {
          "phrase": "他们在公开撒狗粮。",
          "pinyin": "tā men zài gōng kāi sā gǒu liáng.",
          "meaning": "They are publicly scattering dog food (showing romantic affection)."
        }
      ]
    },
    {
      "id": "zh-5",
      "title": "Introduce Yourself in Chinese  | Beginner Lesson 1 | HSK 1",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "K94mY0cUH_U",
      "explanation": "Essential vocabulary for navigating the massive subway networks in Chinese megacities.",
      "phrases": [
        {
          "phrase": "地铁站入口在哪里？",
          "pinyin": "dì tiě zhàn rù kǒu zài nǎ lǐ?",
          "meaning": "Where is the subway station entrance?"
        },
        {
          "phrase": "我怎么买地铁票？",
          "pinyin": "wǒ zěn me mǎi dì tiě piào?",
          "meaning": "How do I buy a subway ticket?"
        },
        {
          "phrase": "你可以下载北京地铁APP刷码。",
          "pinyin": "nǐ kě yǐ xià zài běi jīng dì tiě APP shuā mǎ.",
          "meaning": "You can download the Beijing Subway App to scan the code."
        },
        {
          "phrase": "这条线去王府井吗？",
          "pinyin": "zhè tiáo xiàn qù wáng fǔ jǐng?",
          "meaning": "Does this line go to Wangfujing?"
        },
        {
          "phrase": "不去，你需要在建国门站换乘一号线。",
          "pinyin": "bú qù, nǐ xū yào zài jiàn guó mén zhàn huàn chéng yī hào xiàn.",
          "meaning": "No, you need to transfer to Line 1 at Jianguomen station."
        },
        {
          "phrase": "自动售票机只收现金吗？",
          "pinyin": "zì dòng shòu piào jī zhǐ shōu xiàn jīn ma?",
          "meaning": "Does the ticket vending machine only take cash?"
        },
        {
          "phrase": "也可以用微信或支付宝付款。",
          "pinyin": "yě kě yǐ yòng wēi xìn huò zhī fù bǎo fù kuǎn.",
          "meaning": "You can also pay with WeChat or Alipay."
        },
        {
          "phrase": "请在一米线外排队等候。",
          "pinyin": "qǐng zài yī mǐ xiàn wài pái duì děng hòu.",
          "meaning": "Please line up behind the one-meter safety line."
        },
        {
          "phrase": "下一站是天安门东。",
          "pinyin": "xià yí zhàn shì tiān ān mén dōng.",
          "meaning": "The next station is Tiananmen East."
        },
        {
          "phrase": "列车进站，请注意安全。",
          "pinyin": "liè chē jìn zhàn, qǐng zhù yì ān quán.",
          "meaning": "The train is arriving, please be safe."
        }
      ]
    },
    {
      "id": "zh-6",
      "title": "The Tones in Mandarin Chinese | Beginner Lesson 2 | HSK 1",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "qgL7NrduGJc",
      "explanation": "Counting in Chinese is extremely logical. Once you know 1-10, you can count to 99.",
      "phrases": [
        {
          "phrase": "一二三四五",
          "pinyin": "yī èr sān sì wǔ",
          "meaning": "One two three four five."
        },
        {
          "phrase": "六七八九十",
          "pinyin": "liù qī bā jiǔ shí",
          "meaning": "Six seven eight nine ten."
        },
        {
          "phrase": "十一",
          "pinyin": "shí yī",
          "meaning": "Eleven."
        },
        {
          "phrase": "二十",
          "pinyin": "èr shí",
          "meaning": "Twenty."
        },
        {
          "phrase": "三十五",
          "pinyin": "sān shí wǔ",
          "meaning": "Thirty-five."
        },
        {
          "phrase": "五十",
          "pinyin": "wǔ shí",
          "meaning": "Fifty."
        },
        {
          "phrase": "八十八",
          "pinyin": "bā shí bā",
          "meaning": "Eighty-eight (very lucky number)."
        },
        {
          "phrase": "九十九",
          "pinyin": "jiǔ shí jiǔ",
          "meaning": "Ninety-nine."
        },
        {
          "phrase": "一百",
          "pinyin": "yì bǎi",
          "meaning": "One hundred."
        },
        {
          "phrase": "你的电话号码是多少？",
          "pinyin": "nǐ de diàn huà hào mǎ shì duō shǎo?",
          "meaning": "What is your phone number?"
        }
      ]
    },
    {
      "id": "zh-7",
      "title": "How to Say \"Hello\" in Chinese #Day 1 Nǐ hǎo/Ni hao/Nin hao (Free Chinese Lesson)",
      "topic": "drama",
      "level": "Advanced",
      "youtubeId": "LrNkgDVrKEw",
      "explanation": "Formal vocabulary for meetings and negotiations in a Chinese corporate environment.",
      "phrases": [
        {
          "phrase": "我们的项目进展非常顺利。",
          "pinyin": "wǒ men de xiàng mù jìn zhǎn fēi cháng shùn lì.",
          "meaning": "Our project is progressing very smoothly."
        },
        {
          "phrase": "董事长同意了我们的提议。",
          "pinyin": "dǒng shì zhǎng tóng yì le wǒ men de tí yì.",
          "meaning": "The chairman agreed to our proposal."
        },
        {
          "phrase": "我们需要在这个季度提高业绩。",
          "pinyin": "wǒ men xū yào zài zhè ge jì dù tí gāo yè jì.",
          "meaning": "We need to improve performance in this quarter."
        },
        {
          "phrase": "双方签署了长期战略合作协议。",
          "pinyin": "shuāng fāng qiān shǔ le cháng qī zhàn lüè hé zuò xié yì.",
          "meaning": "Both parties signed a long-term strategic cooperation agreement."
        },
        {
          "phrase": "这是一个双赢的商业模式。",
          "pinyin": "zhè shì yí gè shuāng yíng de shāng yè mó shì.",
          "meaning": "This is a win-win business model."
        },
        {
          "phrase": "市场竞争变得越来越激烈。",
          "pinyin": "shì chǎng jìng zhēng biàn de yuè lái yuè jī liè.",
          "meaning": "Market competition is becoming increasingly fierce."
        },
        {
          "phrase": "我们的主要优势是技术创新。",
          "pinyin": "wǒ men de zhǔ yào yōu ...",
          "meaning": "Our main advantage is technological innovation."
        },
        {
          "phrase": "请您过目这份财务预算报告。",
          "pinyin": "qǐng nín guò mù zhè fèn cái wù yù suàn bào gào.",
          "meaning": "Please review this financial budget report."
        },
        {
          "phrase": "我们需要开会讨论一下这个紧急方案。",
          "pinyin": "wǒ men xū yào kāi huì tǎo lùn yí xià zhè ge jǐn jí fāng àn.",
          "meaning": "We need to meet and discuss this urgent plan."
        },
        {
          "phrase": "感谢您百忙之中抽空来访。",
          "pinyin": "gǎn xiè nín bǎi máng zhī zhōng chōu kòng lái fǎng.",
          "meaning": "Thank you for taking time out of your busy schedule to visit."
        }
      ]
    },
    {
      "id": "zh-8",
      "title": "Say \"How are you?\"  in Chinese #Day 2 Ni hao ma(Free Chinese Lesson)",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "gWJndk4ANbE",
      "explanation": "How to get a waiter's attention and order food politely in a Chinese restaurant.",
      "phrases": [
        {
          "phrase": "服务员，请给我们菜单。",
          "pinyin": "fú wù yuán, qǐng gěi wǒ men cài dān.",
          "meaning": "Waiter, menu please."
        },
        {
          "phrase": "你们有什么招牌菜吗？",
          "pinyin": "nǐ men yǒu shén me zhāo pái cài ma?",
          "meaning": "Do you have any signature dishes?"
        },
        {
          "phrase": "我要一份宫保鸡丁。",
          "pinyin": "wǒ yào yí fèn gōng bǎo jī dīng.",
          "meaning": "I want a serving of Kung Pao chicken."
        },
        {
          "phrase": "这个菜辣不辣？",
          "pinyin": "zhè ge cài là bú là?",
          "meaning": "Is this dish spicy?"
        },
        {
          "phrase": "我不吃肉，我是素食主义者。",
          "pinyin": "wǒ bù chī ròu, wǒ shì sù shí zhǔ yì zhě.",
          "meaning": "I don't eat meat, I am a vegetarian."
        },
        {
          "phrase": "请给我拿一双筷子。",
          "pinyin": "qǐng gěi wǒ ná yì shuāng kuài zi.",
          "meaning": "Please bring me a pair of chopsticks."
        },
        {
          "phrase": "可以给我一杯冰水吗？",
          "pinyin": "kě yǐ gěi wǒ yì bēi bīng shuǐ ma?",
          "meaning": "Can I have a glass of ice water?"
        },
        {
          "phrase": "这些菜已经上齐了吗？",
          "pinyin": "zhè xiē cài yǐ jīng shàng qí le ma?",
          "meaning": "Have all these dishes been served?"
        },
        {
          "phrase": "味道真不错，非常好吃！",
          "pinyin": "wèi dào zhēn bú cuò, fēi cháng hǎo chī!",
          "meaning": "The taste is really good, delicious!"
        },
        {
          "phrase": "服务员，买单！",
          "pinyin": "fú wù yuán, mǎi dān!",
          "meaning": "Waiter, the bill please!"
        }
      ]
    },
    {
      "id": "zh-9",
      "title": "Learn Chinese Characters for Beginners 1.2 | Beginner Chinese Characters Course | HSK 1 Characters",
      "topic": "drama",
      "level": "Intermediate",
      "youtubeId": "kzYmiZueNjs",
      "explanation": "Romantic phrases and how Chinese people subtly express affection.",
      "phrases": [
        {
          "phrase": "我喜欢你，你愿意做我女朋友吗？",
          "pinyin": "wǒ xǐ huan nǐ, nǐ yuàn yì zuò wǒ nǚ péng you ma?",
          "meaning": "I like you, would you be my girlfriend?"
        },
        {
          "phrase": "我对你一见钟情。",
          "pinyin": "wǒ duì nǐ yí jiàn zhōng qíng.",
          "meaning": "I fell in love with you at first sight."
        },
        {
          "phrase": "你是我生命中最重要的人。",
          "pinyin": "nǐ shì wǒ shēng mìng zhōng zuì zhòng yào de rén.",
          "meaning": "You are the most important person in my life."
        },
        {
          "phrase": "我会永远陪着你。",
          "pinyin": "wǒ huì yǒng yuǎn péi zhe nǐ.",
          "meaning": "I will stay with you forever."
        },
        {
          "phrase": "执子之手，与子偕老。",
          "pinyin": "zhí zǐ zhī shǒu, yǔ zǐ xié lǎo.",
          "meaning": "Hold hands, grow old together (ancient idiom)."
        },
        {
          "phrase": "我好想你，今天见个面吧。",
          "pinyin": "wǒ hǎo xiǎng nǐ, jīn tiān jiàn gè miàn ba.",
          "meaning": "I miss you so much, let's meet up today."
        },
        {
          "phrase": "无论发生什么，我都支持你。",
          "pinyin": "wú lùn fā shēng shén me, wǒ dōu zhī chí nǐ.",
          "meaning": "No matter what happens, I support you."
        },
        {
          "phrase": "在我眼里，你是最完美的。",
          "pinyin": "zài wǒ yǎn lǐ, nǐ shì zuì wán měi de.",
          "meaning": "In my eyes, you are the most perfect."
        },
        {
          "phrase": "谢谢你一直以来对我的照顾。",
          "pinyin": "xiè xie nǐ yì zhí yǐ lái duì wǒ de zhào gu.",
          "meaning": "Thank you for taking care of me all this time."
        },
        {
          "phrase": "我爱你。",
          "pinyin": "wǒ ài nǐ.",
          "meaning": "I love you."
        }
      ]
    },
    {
      "id": "zh-10",
      "title": "Learn Chinese Alphabet Pinyin | Chinese Pronunciation for Beginners | Mandarin Pinyin Lessons",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "nHDQm4NXq7Q",
      "explanation": "Talk about your daily schedule, waking up, going to work, and sleeping.",
      "phrases": [
        {
          "phrase": "我每天早上七点起床。",
          "pinyin": "wǒ měi tiān zǎo shang qī diǎn qǐ chuáng.",
          "meaning": "I wake up at 7 o'clock every morning."
        },
        {
          "phrase": "起床后，我先刷牙洗脸。",
          "pinyin": "qǐ chuáng hòu, wǒ xiān shuā yá xǐ liǎn.",
          "meaning": "After waking up, I brush my teeth and wash my face first."
        },
        {
          "phrase": "我一边吃早餐，一边看新闻。",
          "pinyin": "wǒ yì biān chī zǎo cān, yì biān kàn xīn wén.",
          "meaning": "I eat breakfast while reading the news."
        },
        {
          "phrase": "八点，我准时出门去上班。",
          "pinyin": "bā diǎn, wǒ zhǔn shí chū mén qù shàng bān.",
          "meaning": "At 8 o'clock, I leave for work on time."
        },
        {
          "phrase": "我坐地铁去公司，大约花半小时。",
          "pinyin": "wǒ zuò dì tiě qù gōng sī, dà yuē huā bàn xiǎo shí.",
          "meaning": "I take the subway to the office, taking about half an hour."
        },
        {
          "phrase": "我们中午十二点吃午饭。",
          "pinyin": "wǒ men zhōng wǔ shí èr diǎn chī wǔ fàn.",
          "meaning": "We have lunch at 12 o'clock noon."
        },
        {
          "phrase": "下午六点下班，坐公交车回家。",
          "pinyin": "xià wǔ liù diǎn xià bān, zuò gōng jiāo chē huí jiā.",
          "meaning": "Get off work at 6 PM, take the bus home."
        },
        {
          "phrase": "吃完晚饭，我喜欢去公园散步。",
          "pinyin": "chī wán wǎn fàn, wǒ xǐ huan qù gōng yuán sàn bù.",
          "meaning": "After dinner, I like to go for a walk in the park."
        },
        {
          "phrase": "我习惯在睡前看半小时书。",
          "pinyin": "wǒ xí guàn zài shuì qián kàn bàn xiǎo shí shū.",
          "meaning": "I am used to reading for half an hour before sleeping."
        },
        {
          "phrase": "我通常在晚上十一点睡觉。",
          "pinyin": "wǒ tōng cháng zài wǎn shang shí yī diǎn shuì jiào.",
          "meaning": "I usually go to sleep at 11 PM."
        }
      ]
    }
  ],
  "es": [
    {
      "id": "es-1",
      "title": "LEARN SPANISH with Easy and Short Story – Autostop al océano (A1-A2) Spanish Shadowing Practice",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "FQO_YsAdpiA",
      "explanation": "Learn the sounds of the Spanish alphabet, including the famous rolled R.",
      "phrases": [
        {
          "phrase": "Hola, bienvenido a nuestra clase de español.",
          "meaning": "Hello, welcome to our Spanish class."
        },
        {
          "phrase": "La letra 'A' siempre suena igual en español.",
          "meaning": "The letter 'A' always sounds the same in Spanish."
        },
        {
          "phrase": "La 'C' suena como 'S' antes de 'E' e 'I'.",
          "meaning": "The 'C' sounds like 'S' before 'E' and 'I'."
        },
        {
          "phrase": "La letra 'H' es completamente silenciosa.",
          "meaning": "The letter 'H' is completely silent."
        },
        {
          "phrase": "La 'J' tiene un sonido fuerte y raspado.",
          "meaning": "The 'J' has a strong, raspy sound."
        },
        {
          "phrase": "La letra 'Ñ' es única de nuestro idioma.",
          "meaning": "The letter 'Ñ' is unique to our language."
        },
        {
          "phrase": "Para pronunciar la 'R', debes vibrar la lengua.",
          "meaning": "To pronounce the 'R', you must vibrate your tongue."
        },
        {
          "phrase": "La 'V' y la 'B' suenan casi idénticas.",
          "meaning": "The 'V' and the 'B' sound almost identical."
        },
        {
          "phrase": "La letra 'Z' suena diferente en España y América.",
          "meaning": "The letter 'Z' sounds different in Spain and America."
        },
        {
          "phrase": "¡Buen trabajo! Ya conoces todo el abecedario.",
          "meaning": "Good job! You now know the entire alphabet."
        }
      ]
    },
    {
      "id": "es-2",
      "title": "START LEARNING SPANISH with Short Story for beginners (A1-A2) – Un momento valiente",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "ZaUGrYafx_o",
      "explanation": "Learn how to order small plates and drinks in a busy Spanish tapas bar.",
      "phrases": [
        {
          "phrase": "¡Buenas noches! ¿Tienen mesa libre en la terraza?",
          "meaning": "Good evening! Do you have a free table on the terrace?"
        },
        {
          "phrase": "Para beber, quiero una caña de cerveza bien fría.",
          "meaning": "To drink, I want a very cold small draft beer."
        },
        {
          "phrase": "¿Qué tapas nos recomienda pedir hoy?",
          "meaning": "What tapas do you recommend we order today?"
        },
        {
          "phrase": "Queremos una ración de patatas bravas picantes.",
          "meaning": "We want a portion of spicy patatas bravas."
        },
        {
          "phrase": "Tráiganos también un plato de jamón ibérico, por favor.",
          "meaning": "Bring us also a plate of Iberian ham, please."
        },
        {
          "phrase": "¿Las croquetas son de jamón o de bacalao?",
          "meaning": "Are the croquettes ham or cod?"
        },
        {
          "phrase": "A mí me gustaría probar los calamares a la romana.",
          "meaning": "I would like to try the fried calamari rings."
        },
        {
          "phrase": "¿Esta tapa lleva algún tipo de carne o es vegetariana?",
          "meaning": "Does this tapa contain any kind of meat or is it vegetarian?"
        },
        {
          "phrase": "Todo está riquísimo, felicitaciones al cocinero.",
          "meaning": "Everything is delicious, congratulations to the chef."
        },
        {
          "phrase": "Camarero, ¿nos trae la cuenta cuando pueda?",
          "meaning": "Waiter, could you bring us the bill when you can?"
        }
      ]
    },
    {
      "id": "es-3",
      "title": "How To Learn Spanish Quickly For Beginners | Free Class | Lesson 1 Start Here!",
      "topic": "humor",
      "level": "Advanced",
      "youtubeId": "Fkoansd4Ni0",
      "explanation": "Vibrant slang used on the streets of Mexico City.",
      "phrases": [
        {
          "phrase": "¿Qué onda, güey? ¿Cómo va todo?",
          "meaning": "What's up, dude? How is everything going?"
        },
        {
          "phrase": "Esta fiesta está muy chida, me encanta la música.",
          "meaning": "This party is very cool, I love the music."
        },
        {
          "phrase": "No manches, ¡no puedo creer lo que me estás contando!",
          "meaning": "No way, I can't believe what you're telling me!"
        },
        {
          "phrase": "Tengo que chambear todo el fin de semana.",
          "meaning": "I have to work all weekend."
        },
        {
          "phrase": "¡Eso que hiciste estuvo bien padre!",
          "meaning": "That thing you did was really cool/awesome!"
        },
        {
          "phrase": "Ya nos cayó el chahuistle con este examen sorpresa.",
          "meaning": "We are in trouble now with this surprise exam."
        },
        {
          "phrase": "Fui a cenar unos tacos y me costaron un ojo de la cara.",
          "meaning": "I went to eat some tacos and they cost me an arm and a leg."
        },
        {
          "phrase": "Ándale, apúrate que se nos va a hacer bien tarde.",
          "meaning": "Come on, hurry up or it will get really late."
        },
        {
          "phrase": "Ese chavo siempre está buscando problemas.",
          "meaning": "That guy is always looking for trouble."
        },
        {
          "phrase": "¡Qué chido que pudiste venir hoy!",
          "meaning": "How cool that you were able to come today!"
        }
      ]
    },
    {
      "id": "es-4",
      "title": "Master Spanish Introductions in 20 Minutes (Free Lesson 2 with book Aula Internacional)",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "4DoK7K9g7mE",
      "explanation": "Learn essential daily expressions used by native Spanish speakers everywhere.",
      "phrases": [
        {
          "phrase": "Mucho gusto, mi nombre es Alejandro.",
          "meaning": "Nice to meet you, my name is Alejandro."
        },
        {
          "phrase": "¿De dónde eres? Yo soy de Colombia.",
          "meaning": "Where are you from? I am from Colombia."
        },
        {
          "phrase": "Muchas gracias por tu valiosa ayuda.",
          "meaning": "Thank you very much for your valuable help."
        },
        {
          "phrase": "De nada, siempre es un placer ayudar.",
          "meaning": "You're welcome, it's always a pleasure to help."
        },
        {
          "phrase": "Disculpa, ¿me puedes repetir eso despacio?",
          "meaning": "Excuse me, can you repeat that slowly for me?"
        },
        {
          "phrase": "No entiendo muy bien lo que quieres decir.",
          "meaning": "I don't understand very well what you mean."
        },
        {
          "phrase": "¡Que tengas un excelente fin de semana!",
          "meaning": "Have a great weekend!"
        },
        {
          "phrase": "Nos vemos más tarde, ¡cuídate mucho!",
          "meaning": "See you later, take good care of yourself!"
        },
        {
          "phrase": "Lo siento mucho, fue un error mío.",
          "meaning": "I am very sorry, it was a mistake of mine."
        },
        {
          "phrase": "No te preocupes, no pasa nada.",
          "meaning": "Don't worry, it's nothing / it's fine."
        }
      ]
    },
    {
      "id": "es-5",
      "title": "Spanish Conversation for Beginners | 70 Basic Spanish Phrases To Know",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "DAp_v7EH9AA",
      "explanation": "Asking for and understanding directions in a Spanish-speaking city.",
      "phrases": [
        {
          "phrase": "Perdone, ¿me puede decir dónde está la Plaza Mayor?",
          "meaning": "Excuse me, can you tell me where Plaza Mayor is?"
        },
        {
          "phrase": "Tienes que seguir todo recto por esta calle principal.",
          "meaning": "You have to go straight down this main street."
        },
        {
          "phrase": "En el segundo semáforo, gira a la derecha.",
          "meaning": "At the second traffic light, turn right."
        },
        {
          "phrase": "¿Está muy lejos de aquí para ir caminando?",
          "meaning": "Is it very far from here to go walking?"
        },
        {
          "phrase": "Está a unos diez minutos a pie cruzando el parque.",
          "meaning": "It's about ten minutes on foot crossing the park."
        },
        {
          "phrase": "Cruza la avenida y verás la parada de autobús enfrente.",
          "meaning": "Cross the avenue and you will see the bus stop opposite."
        },
        {
          "phrase": "La boca de metro más cercana está a la vuelta de la esquina.",
          "meaning": "The nearest metro entrance is around the corner."
        },
        {
          "phrase": "Tenga cuidado al cruzar esta rotonda tan concurrida.",
          "meaning": "Be careful when crossing this busy roundabout."
        },
        {
          "phrase": "Camine dos manzanas y llegará al museo de arte.",
          "meaning": "Walk two blocks and you will arrive at the art museum."
        },
        {
          "phrase": "Muchas gracias por su ayuda, que tenga un buen día.",
          "meaning": "Thank you very much for your help, have a nice day."
        }
      ]
    },
    {
      "id": "es-6",
      "title": "100 Spanish Words & Phrases All Beginners Should Know | Super Easy Spanish 86",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "CFmfVQx6kP4",
      "explanation": "How to ask for the time and schedule appointments.",
      "phrases": [
        {
          "phrase": "Disculpe, ¿qué hora es en este momento?",
          "meaning": "Excuse me, what time is it right now?"
        },
        {
          "phrase": "Es la una y media de la tarde.",
          "meaning": "It is one thirty in the afternoon."
        },
        {
          "phrase": "Son las cuatro en punto, debemos irnos ya.",
          "meaning": "It is four o'clock sharp, we must leave now."
        },
        {
          "phrase": "La película empieza a las ocho y cuarto de la noche.",
          "meaning": "The movie starts at quarter past eight in the evening."
        },
        {
          "phrase": "Mi tren sale a las diez menos diez de la mañana.",
          "meaning": "My train leaves at ten to ten in the morning."
        },
        {
          "phrase": "¿A qué hora nos encontramos en la cafetería?",
          "meaning": "What time do we meet at the coffee shop?"
        },
        {
          "phrase": "Nos vemos a las doce del mediodía.",
          "meaning": "See you at twelve noon."
        },
        {
          "phrase": "Es temprano, apenas son las seis de la mañana.",
          "meaning": "It is early, it is barely six in the morning."
        },
        {
          "phrase": "Ya es casi medianoche, tengo que ir a dormir.",
          "meaning": "It is almost midnight, I have to go to sleep."
        },
        {
          "phrase": "Mi clase de español es de las cinco a las siete.",
          "meaning": "My Spanish class is from five to seven."
        }
      ]
    },
    {
      "id": "es-7",
      "title": "Introduce Yourself in Slow Spanish | Super Easy Spanish 120",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "JsGQizTuPSo",
      "explanation": "Vocabulary for describing your extended family.",
      "phrases": [
        {
          "phrase": "Mi familia es bastante grande y ruidosa.",
          "meaning": "My family is quite big and noisy."
        },
        {
          "phrase": "Mi padre trabaja como ingeniero en una empresa local.",
          "meaning": "My father works as an engineer in a local company."
        },
        {
          "phrase": "Mi madre es profesora de literatura de secundaria.",
          "meaning": "My mother is a high school literature teacher."
        },
        {
          "phrase": "Tengo dos hermanos mayores y una hermana menor.",
          "meaning": "I have two older brothers and one younger sister."
        },
        {
          "phrase": "Mis abuelos viven en una casa hermosa en el campo.",
          "meaning": "My grandparents live in a beautiful house in the country."
        },
        {
          "phrase": "Mis tíos y primos nos visitan cada Navidad.",
          "meaning": "My uncles, aunts, and cousins visit us every Christmas."
        },
        {
          "phrase": "La hija de mi hermana es mi sobrina favorita.",
          "meaning": "My sister's daughter is my favorite niece."
        },
        {
          "phrase": "El hijo de mi tío es mi primo hermano.",
          "meaning": "My uncle's son is my first cousin."
        },
        {
          "phrase": "Mis padres celebran su trigésimo aniversario de bodas.",
          "meaning": "My parents celebrate their thirtieth wedding anniversary."
        },
        {
          "phrase": "Amo mucho a mi familia, siempre nos apoyamos.",
          "meaning": "I love my family very much, we always support each other."
        }
      ]
    },
    {
      "id": "es-8",
      "title": "FREE Spanish Course - Full Complete Spanish Course for Beginners - 200 Lessons - Introduction",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "D0DOn3Gfww0",
      "explanation": "Conjugate standard AR, ER, and IR verbs in the Spanish present tense.",
      "phrases": [
        {
          "phrase": "Yo hablo español todos los días con mis amigos.",
          "meaning": "I speak Spanish every day with my friends."
        },
        {
          "phrase": "Tú comes una manzana roja por la mañana.",
          "meaning": "You eat a red apple in the morning."
        },
        {
          "phrase": "Él vive en un apartamento cerca del centro.",
          "meaning": "He lives in an apartment near downtown."
        },
        {
          "phrase": "Nosotros estudiamos mucho para el examen final.",
          "meaning": "We study hard for the final exam."
        },
        {
          "phrase": "Ellos escriben cartas interesantes a sus familias.",
          "meaning": "They write interesting letters to their families."
        },
        {
          "phrase": "Vosotros cantáis una canción muy bonita hoy.",
          "meaning": "You all (Spain) sing a very pretty song today."
        },
        {
          "phrase": "Ella compra pan fresco en la panadería local.",
          "meaning": "She buys fresh bread at the local bakery."
        },
        {
          "phrase": "Ustedes corren por el parque todos los domingos.",
          "meaning": "You all run in the park every Sunday."
        },
        {
          "phrase": "Nosotras leemos libros interesantes en la biblioteca.",
          "meaning": "We (fem.) read interesting books in the library."
        },
        {
          "phrase": "Él abre la puerta principal para sus invitados.",
          "meaning": "He opens the main door for his guests."
        }
      ]
    },
    {
      "id": "es-9",
      "title": "Lesson 1: The Basics - FREE Complete Spanish Course for Beginners #spanishlessons #duolingo",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "Jni1jFR3lao",
      "explanation": "Listen to locals in Barcelona responding to random questions about life.",
      "phrases": [
        {
          "phrase": "¿Cuál es tu lugar favorito en toda Barcelona?",
          "meaning": "What is your favorite place in all of Barcelona?"
        },
        {
          "phrase": "Me encanta pasear por las calles del barrio Gótico.",
          "meaning": "I love strolling through the streets of the Gothic quarter."
        },
        {
          "phrase": "La playa de la Barceloneta está siempre muy llena.",
          "meaning": "Barceloneta beach is always very crowded."
        },
        {
          "phrase": "¿Prefieres la comida tradicional o la moderna?",
          "meaning": "Do you prefer traditional or modern food?"
        },
        {
          "phrase": "Para mí, no hay nada mejor que una buena paella.",
          "meaning": "For me, there's nothing better than a good paella."
        },
        {
          "phrase": "El transporte público aquí funciona de maravilla.",
          "meaning": "Public transport here works wonderfully."
        },
        {
          "phrase": "Lo que menos me gusta es el exceso de turismo.",
          "meaning": "What I like least is the excess of tourism."
        },
        {
          "phrase": "Recomiendo visitar los parques menos conocidos de la ciudad.",
          "meaning": "I recommend visiting the lesser-known parks in the city."
        },
        {
          "phrase": "Hay muchas actividades culturales gratis los fines de semana.",
          "meaning": "There are many free cultural activities on weekends."
        },
        {
          "phrase": "La gente de aquí suele ser muy abierta y amable.",
          "meaning": "People from here are usually very open and friendly."
        }
      ]
    },
    {
      "id": "es-10",
      "title": "Learn Spanish: 12 sentences to introduce yourself in Spanish",
      "topic": "humor",
      "level": "Advanced",
      "youtubeId": "5fJm-0XI1FQ",
      "explanation": "Foreigners discuss the biggest surprises they experienced when moving to Spain.",
      "phrases": [
        {
          "phrase": "El horario de las comidas fue mi mayor choque cultural.",
          "meaning": "The meal schedule was my biggest culture shock."
        },
        {
          "phrase": "Aquí la gente cena muy tarde, a las diez de la noche.",
          "meaning": "Here people eat dinner very late, at ten in the evening."
        },
        {
          "phrase": "Me sorprendió que las tiendas cierren durante la siesta.",
          "meaning": "I was surprised that stores close during the siesta."
        },
        {
          "phrase": "Es muy común saludar dando dos besos en las mejillas.",
          "meaning": "It is very common to greet by giving two kisses on the cheeks."
        },
        {
          "phrase": "La vida social se hace casi siempre en la calle.",
          "meaning": "Social life is almost always done in the street."
        },
        {
          "phrase": "Los domingos todo está cerrado, las calles están vacías.",
          "meaning": "On Sundays everything is closed, the streets are empty."
        },
        {
          "phrase": "Tardan mucho tiempo en traer la cuenta en los restaurantes.",
          "meaning": "They take a long time to bring the bill in restaurants."
        },
        {
          "phrase": "La gente habla muy alto y todos a la vez.",
          "meaning": "People speak very loudly and all at the same time."
        },
        {
          "phrase": "Me encanta la costumbre de salir a tomar tapas.",
          "meaning": "I love the custom of going out to have tapas."
        },
        {
          "phrase": "Te acostumbras rápido a este estilo de vida relajado.",
          "meaning": "You quickly get used to this relaxed lifestyle."
        }
      ]
    }
  ],
  "fr": [
    {
      "id": "fr-1",
      "title": "French Course 2026 : Road to A1 !",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "-QwG3VmS_wY",
      "explanation": "French pronunciation is famous for silent letters at the end of words.",
      "phrases": [
        {
          "phrase": "Bonjour, la prononciation française peut sembler difficile.",
          "meaning": "Hello, French pronunciation can seem difficult."
        },
        {
          "phrase": "La lettre 'e' sans accent a un son sourd.",
          "meaning": "The letter 'e' without accent has a muffled sound."
        },
        {
          "phrase": "En français, les consonnes finales sont souvent muettes.",
          "meaning": "In French, final consonants are often silent."
        },
        {
          "phrase": "La liaison fait sonner une consonne finale muette avant une voyelle.",
          "meaning": "Liaison makes a silent final consonant sound before a vowel."
        },
        {
          "phrase": "Le 'h' aspiré empêche la liaison avec le mot précédent.",
          "meaning": "The aspirated 'h' prevents liaison with the preceding word."
        },
        {
          "phrase": "Le 'h' muet nécessite une élision, comme dans 'l'homme'.",
          "meaning": "The silent 'h' requires an elision, like in 'l'homme'."
        },
        {
          "phrase": "Les voyelles nasales font passer l'air par le nez.",
          "meaning": "Nasal vowels make air pass through the nose."
        },
        {
          "phrase": "La combinaison 'ou' se prononce comme dans le mot 'loup'.",
          "meaning": "The combination 'ou' is pronounced like in the word 'loup'."
        },
        {
          "phrase": "La lettre 'r' se prononce au fond de la gorge.",
          "meaning": "The letter 'r' is pronounced at the back of the throat."
        },
        {
          "phrase": "Pratiquez régulièrement pour habituer vos muscles.",
          "meaning": "Practice regularly to get your muscles used to it."
        }
      ]
    },
    {
      "id": "fr-2",
      "title": "Learning French for Beginners - Unité 0 - Introduction",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "ef_-6iUP3BQ",
      "explanation": "When approached by a shop assistant, a simple 'Je regarde juste' is polite and effective.",
      "phrases": [
        {
          "phrase": "Bonjour, je cherche un magasin de vêtements.",
          "meaning": "Hello, I'm looking for a clothing store."
        },
        {
          "phrase": "Est-ce que je peux essayer cette veste en cuir ?",
          "meaning": "Can I try on this leather jacket?"
        },
        {
          "phrase": "Où se trouvent les cabines d'essayage, s'il vous plaît ?",
          "meaning": "Where are the fitting rooms, please?"
        },
        {
          "phrase": "Cette taille est trop petite, en avez-vous une plus grande ?",
          "meaning": "This size is too small, do you have a larger one?"
        },
        {
          "phrase": "Je regarde juste pour l'instant, merci.",
          "meaning": "I'm just looking for now, thank you."
        },
        {
          "phrase": "Combien coûte cette écharpe en soie ?",
          "meaning": "How much does this silk scarf cost?"
        },
        {
          "phrase": "Est-ce qu'il y a des soldes sur ces articles ?",
          "meaning": "Are there sales on these items?"
        },
        {
          "phrase": "Je vais prendre ce sac, s'il vous plaît.",
          "meaning": "I will take this bag, please."
        },
        {
          "phrase": "Acceptez-vous les paiements par carte de crédit ?",
          "meaning": "Do you accept credit card payments?"
        },
        {
          "phrase": "Pouvez-vous me donner un sac en papier, s'il vous plaît ?",
          "meaning": "Can you give me a paper bag, please?"
        }
      ]
    },
    {
      "id": "fr-3",
      "title": "Basic french to english",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "UWiGRO2k1_0",
      "explanation": "Learn the difference between un café (espresso) and un café au lait.",
      "phrases": [
        {
          "phrase": "Bonjour, je voudrais commander un café.",
          "meaning": "Hello, I would like to order a coffee."
        },
        {
          "phrase": "Un espresso bien serré, s'il vous plaît.",
          "meaning": "A strong espresso, please."
        },
        {
          "phrase": "Je préfère un café au lait avec un croissant.",
          "meaning": "I prefer a latte with a croissant."
        },
        {
          "phrase": "Est-ce que vous avez du lait d'avoine ?",
          "meaning": "Do you have oat milk?"
        },
        {
          "phrase": "Pour moi, ce sera un grand cappuccino à emporter.",
          "meaning": "For me, it will be a large cappuccino to go."
        },
        {
          "phrase": "Je vais prendre une carafe d'eau aussi.",
          "meaning": "I'll take a pitcher of water too."
        },
        {
          "phrase": "Combien est-ce que je vous dois ?",
          "meaning": "How much do I owe you?"
        },
        {
          "phrase": "Puis-je payer sans contact avec mon téléphone ?",
          "meaning": "Can I pay contactless with my phone?"
        },
        {
          "phrase": "Gardez la monnaie, c'est pour vous.",
          "meaning": "Keep the change, it's for you."
        },
        {
          "phrase": "Merci beaucoup, bonne journée à vous !",
          "meaning": "Thank you very much, have a good day!"
        }
      ]
    },
    {
      "id": "fr-4",
      "title": "French listening a1 level",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "dlScj-E1Qgs",
      "explanation": "Mastering the basic numbers in French.",
      "phrases": [
        {
          "phrase": "Un, deux, trois, quatre, cinq, six.",
          "meaning": "One, two, three, four, five, six."
        },
        {
          "phrase": "Sept, huit, neuf, dix.",
          "meaning": "Seven, eight, nine, ten."
        },
        {
          "phrase": "Onze, douze, treize, quatorze.",
          "meaning": "Eleven, twelve, thirteen, fourteen."
        },
        {
          "phrase": "Quinze, seize, dix-sept.",
          "meaning": "Fifteen, sixteen, seventeen."
        },
        {
          "phrase": "Dix-huit, dix-neuf, vingt.",
          "meaning": "Eighteen, nineteen, twenty."
        },
        {
          "phrase": "J'ai vingt ans et j'habite à Lyon.",
          "meaning": "I am twenty years old and I live in Lyon."
        },
        {
          "phrase": "Il y a douze mois dans une année.",
          "meaning": "There are twelve months in a year."
        },
        {
          "phrase": "Le numéro de ma chambre est le dix-sept.",
          "meaning": "My room number is seventeen."
        },
        {
          "phrase": "J'ai acheté sept pommes au marché.",
          "meaning": "I bought seven apples at the market."
        },
        {
          "phrase": "Nous sommes une famille de cinq personnes.",
          "meaning": "We are a family of five people."
        }
      ]
    },
    {
      "id": "fr-5",
      "title": "French for beginners|| What you need to learn at French Level A1?",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "Py7mK0uOsKU",
      "explanation": "How to find the Louvre or the Metro without getting lost.",
      "phrases": [
        {
          "phrase": "Excusez-moi, je suis perdu. Où est la Tour Eiffel ?",
          "meaning": "Excuse me, I'm lost. Where is the Eiffel Tower?"
        },
        {
          "phrase": "Pour aller au Louvre, s'il vous plaît ?",
          "meaning": "To go to the Louvre, please?"
        },
        {
          "phrase": "Prenez la première rue à droite après la banque.",
          "meaning": "Take the first street on the right after the bank."
        },
        {
          "phrase": "Continuez tout droit jusqu'au feu tricolore.",
          "meaning": "Go straight until the traffic light."
        },
        {
          "phrase": "Où se trouve la station de métro la plus proche ?",
          "meaning": "Where is the nearest metro station?"
        },
        {
          "phrase": "C'est à environ dix minutes à pied d'ici.",
          "meaning": "It's about ten minutes on foot from here."
        },
        {
          "phrase": "Devez-vous prendre le bus numéro quarante ?",
          "meaning": "Do you have to take bus number forty?"
        },
        {
          "phrase": "Traversez le pont et le musée sera sur votre gauche.",
          "meaning": "Cross the bridge and the museum will be on your left."
        },
        {
          "phrase": "Est-ce que c'est loin ou puis-je y aller à pied ?",
          "meaning": "Is it far or can I walk there?"
        },
        {
          "phrase": "Merci infiniment pour vos indications précieuses !",
          "meaning": "Thank you so much for your valuable directions!"
        }
      ]
    },
    {
      "id": "fr-6",
      "title": "useful phrases in French 🇫🇷 most common | Basic vocabulary",
      "topic": "humor",
      "level": "Advanced",
      "youtubeId": "5MMcahfcp_0",
      "explanation": "Verlan is a type of French slang that involves reversing the syllables of a word.",
      "phrases": [
        {
          "phrase": "Le Verlan consiste à inverser les syllabes des mots.",
          "meaning": "Verlan consists of reversing the syllables of words."
        },
        {
          "phrase": "Ce film est trop zarbi, je ne comprends rien.",
          "meaning": "This movie is too weird (bizarre -> zarbi), I don't understand anything."
        },
        {
          "phrase": "Il y a beaucoup de keufs dans le quartier aujourd'hui.",
          "meaning": "There are a lot of cops (flic -> keuf) in the neighborhood today."
        },
        {
          "phrase": "Je suis crevé, je vais aller pioncer un peu.",
          "meaning": "I'm exhausted, I'm going to sleep a bit."
        },
        {
          "phrase": "Laisse béton, ça n'en vaut pas la peine.",
          "meaning": "Let it go (laisse tomber -> laisse béton), it's not worth it."
        },
        {
          "phrase": "Ce mec est vraiment chelou, méfie-toi.",
          "meaning": "This guy is really sketchy (louche -> chelou), be careful."
        },
        {
          "phrase": "J'ai vu une meuf trop sympa à la bibliothèque.",
          "meaning": "I saw a really nice girl (femme -> meuf) at the library."
        },
        {
          "phrase": "Viens chez oim ce soir, on va écouter de la musique.",
          "meaning": "Come to my place (moi -> oim) tonight, we're going to listen to music."
        },
        {
          "phrase": "Ce concert était de la balle, c'était génial !",
          "meaning": "This concert was awesome, it was great!"
        },
        {
          "phrase": "Il fait trop chaud, je n'ai pas de teille d'eau.",
          "meaning": "It's too hot, I don't have a bottle (bouteille -> teille) of water."
        }
      ]
    },
    {
      "id": "fr-7",
      "title": "Learn French alphabet #frenchforbeginner #frenchlessons #frenchlanguagelearner",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "2gojNLDr6ds",
      "explanation": "How to introduce yourself formally and informally in French.",
      "phrases": [
        {
          "phrase": "Bonjour, je me présente, je m'appelle Thomas.",
          "meaning": "Hello, let me introduce myself, my name is Thomas."
        },
        {
          "phrase": "Enchanté de faire votre connaissance.",
          "meaning": "Delighted to make your acquaintance."
        },
        {
          "phrase": "Quel est votre nom, s'il vous plaît ?",
          "meaning": "What is your name, please?"
        },
        {
          "phrase": "Je viens du Canada et j'étudie à Paris.",
          "meaning": "I come from Canada and I study in Paris."
        },
        {
          "phrase": "J'ai vingt-cinq ans et je travaille dans le design.",
          "meaning": "I'm twenty-five and I work in design."
        },
        {
          "phrase": "Voici mon collègue, il est ingénieur logiciel.",
          "meaning": "This is my colleague, he is a software engineer."
        },
        {
          "phrase": "Comment allez-vous aujourd'hui ?",
          "meaning": "How are you doing today?"
        },
        {
          "phrase": "Je vais très bien, merci, et vous ?",
          "meaning": "I am doing very well, thank you, and you?"
        },
        {
          "phrase": "J'apprends le français depuis six mois.",
          "meaning": "I've been learning French for six months."
        },
        {
          "phrase": "J'espère que nous deviendrons de bons amis.",
          "meaning": "I hope we will become good friends."
        }
      ]
    },
    {
      "id": "fr-8",
      "title": "Having Breakfast in Slow French | Super Easy French 152",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "40IAXVvjSDA",
      "explanation": "French counting gets unique after 70 (soixante-dix) and 80 (quatre-vingts).",
      "phrases": [
        {
          "phrase": "Trente, quarante, cinquante, soixante.",
          "meaning": "Thirty, forty, fifty, sixty."
        },
        {
          "phrase": "Soixante-dix signifie soixante et dix.",
          "meaning": "Seventy literally means sixty and ten."
        },
        {
          "phrase": "Quatre-vingts signifie quatre fois vingt.",
          "meaning": "Eighty literally means four twenties."
        },
        {
          "phrase": "Quatre-vingt-dix-neuf est quatre-vingts plus dix-neuf.",
          "meaning": "Ninety-nine is eighty plus nineteen (99)."
        },
        {
          "phrase": "Le prix total est de quatre-vingt-cinq euros.",
          "meaning": "The total price is eighty-five euros."
        },
        {
          "phrase": "Ma grand-mère a quatre-vingt-deux ans.",
          "meaning": "My grandmother is eighty-two years old."
        },
        {
          "phrase": "Il y a soixante-quinze personnes dans le bus.",
          "meaning": "There are seventy-five people on the bus."
        },
        {
          "phrase": "J'habite au numéro quatre-vingt-douze.",
          "meaning": "I live at number ninety-two."
        },
        {
          "phrase": "Le train part dans soixante-dix minutes.",
          "meaning": "The train leaves in seventy minutes."
        },
        {
          "phrase": "Cent pour cent des étudiants ont réussi.",
          "meaning": "One hundred percent of the students passed."
        }
      ]
    },
    {
      "id": "fr-9",
      "title": "100 French Words, Expressions & Sentences Every Beginner Should Know | Super Easy French 151",
      "topic": "news",
      "level": "Advanced",
      "youtubeId": "__Cu2nwgAjA",
      "explanation": "Learn professional French questions and answers for a business interview.",
      "phrases": [
        {
          "phrase": "Parlez-moi de votre parcours professionnel.",
          "meaning": "Tell me about your professional background."
        },
        {
          "phrase": "J'ai travaillé pendant trois ans comme chef de projet.",
          "meaning": "I worked for three years as a project manager."
        },
        {
          "phrase": "Pourquoi souhaitez-vous rejoindre notre entreprise ?",
          "meaning": "Why do you wish to join our company?"
        },
        {
          "phrase": "Je suis impressionné par votre innovation technologique.",
          "meaning": "I am impressed by your technological innovation."
        },
        {
          "phrase": "Quelles sont vos principales forces et faiblesses ?",
          "meaning": "What are your main strengths and weaknesses?"
        },
        {
          "phrase": "Je suis très organisé, mais parfois un peu perfectionniste.",
          "meaning": "I am very organized, but sometimes a bit perfectionist."
        },
        {
          "phrase": "Comment gérez-vous le stress et la pression ?",
          "meaning": "How do you manage stress and pressure?"
        },
        {
          "phrase": "Je priorise les tâches importantes et je reste calme.",
          "meaning": "I prioritize important tasks and I stay calm."
        },
        {
          "phrase": "Avez-vous des questions à me poser ?",
          "meaning": "Do you have any questions to ask me?"
        },
        {
          "phrase": "Quelles sont les opportunités d'évolution dans ce poste ?",
          "meaning": "What are the growth opportunities in this position?"
        }
      ]
    },
    {
      "id": "fr-10",
      "title": "Learn 15 French Words and Expressions for ABSOLUTE BEGINNERS - A1 [with Alicia]",
      "topic": "daily life",
      "level": "Intermediate",
      "youtubeId": "91lIllsNR6c",
      "explanation": "Listen to real Parisians sharing highlights and stories from their lives.",
      "phrases": [
        {
          "phrase": "Chacun a une histoire de vie unique à raconter.",
          "meaning": "Everyone has a unique life story to tell."
        },
        {
          "phrase": "Je suis né à Marseille mais j'ai grandi ici.",
          "meaning": "I was born in Marseille but I grew up here."
        },
        {
          "phrase": "Le moment le plus marquant fut mon voyage en Asie.",
          "meaning": "The most memorable moment was my trip to Asia."
        },
        {
          "phrase": "J'ai changé de carrière professionnelle à trente ans.",
          "meaning": "I changed my professional career at thirty."
        },
        {
          "phrase": "Mon rêve de gosse était de devenir artiste peintre.",
          "meaning": "My childhood dream was to become a painter."
        },
        {
          "phrase": "J'aime la liberté d'expression qu'on a ici.",
          "meaning": "I like the freedom of expression we have here."
        },
        {
          "phrase": "La plus grande leçon que j'ai apprise est la patience.",
          "meaning": "The biggest lesson I learned is patience."
        },
        {
          "phrase": "Je passe beaucoup de temps avec mes enfants maintenant.",
          "meaning": "I spend a lot of time with my children now."
        },
        {
          "phrase": "Mon objectif est de créer ma propre entreprise créative.",
          "meaning": "My goal is to start my own creative business."
        },
        {
          "phrase": "La vie est faite de choix et de rencontres.",
          "meaning": "Life is made of choices and encounters."
        }
      ]
    }
  ],
  "ja": [
    {
      "id": "ja-1",
      "title": "Learn ALL Hiragana in 1 Hour - How to Write and Read Japanese",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "6p9Il_j0zjc",
      "explanation": "Hiragana is the foundation of the Japanese writing system. Singing the alphabet is the fastest way to memorize!",
      "phrases": [
        {
          "phrase": "「あいうえお」から始めましょう。",
          "pinyin": "aiueo kara hajimemashou.",
          "meaning": "Let's start with 'aiueo'."
        },
        {
          "phrase": "ひらがなは日本語の基本です。",
          "pinyin": "hiragana wa nihongo no kihon desu.",
          "meaning": "Hiragana is the basic foundation of Japanese."
        },
        {
          "phrase": "毎日歌って文字を覚えましょう。",
          "pinyin": "mainichi utatte moji o oboemashou.",
          "meaning": "Let's sing every day and memorize the letters."
        },
        {
          "phrase": "「かきくけこ」の発音は簡単です。",
          "pinyin": "kakikukeko no hatsuon wa kantan desu.",
          "meaning": "The pronunciation of 'kakikukeko' is easy."
        },
        {
          "phrase": "「さしすせそ」をゆっくり発音します。",
          "pinyin": "sashisuseso o yukkuri hatsuon shimasu.",
          "meaning": "Pronounce 'sashisuseso' slowly."
        },
        {
          "phrase": "文字の書き順も重要です。",
          "pinyin": "moji no kakijun mo juuyou desu.",
          "meaning": "The stroke order of letters is also important."
        },
        {
          "phrase": "「たちつてと」の「つ」に注意してください。",
          "pinyin": "tachitsuteto no tsu ni chuui shite kudasai.",
          "meaning": "Please be careful with 'tsu' in 'tachitsuteto'."
        },
        {
          "phrase": "「なにぬねの」を優しく歌います。",
          "pinyin": "naninuneno o yasashiku utaimasu.",
          "meaning": "Sing 'naninuneno' gently."
        },
        {
          "phrase": "全部で四十六文字あります。",
          "pinyin": "zenbu de yonjuuroku moji arimasu.",
          "meaning": "There are 46 characters in total."
        },
        {
          "phrase": "よくできました！その調子です。",
          "pinyin": "yoku dekimashita! sono choushi desu.",
          "meaning": "Well done! Keep it up."
        }
      ]
    },
    {
      "id": "ja-2",
      "title": "How to Write and Read All Hiragana | 30 minutes | Learn Japanese",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "z4qh8BVrb3w",
      "explanation": "Japanese has levels of politeness. Adding 'gozaimasu' elevates your speech to a polite level.",
      "phrases": [
        {
          "phrase": "おはようございます。",
          "pinyin": "ohayou gozaimasu.",
          "meaning": "Good morning (polite)."
        },
        {
          "phrase": "こんにちは、はじめまして。",
          "pinyin": "konnichiwa, hajimemashite.",
          "meaning": "Hello, nice to meet you."
        },
        {
          "phrase": "こんばんは、お元気ですか？",
          "pinyin": "konbanwa, ogenki desu ka?",
          "meaning": "Good evening, how are you?"
        },
        {
          "phrase": "ありがとうございます。",
          "pinyin": "arigatou gozaimasu.",
          "meaning": "Thank you very much."
        },
        {
          "phrase": "すみません、お会計をお願いします。",
          "pinyin": "sumimasen, okaikei o ogaishimasu.",
          "meaning": "Excuse me, the bill please."
        },
        {
          "phrase": "よろしくお願いします。",
          "pinyin": "yoroshiku onegai shimasu.",
          "meaning": "Pleased to work with you / please treat me well."
        },
        {
          "phrase": "お疲れ様でした。",
          "pinyin": "otsukaresama deshita.",
          "meaning": "Thank you for your hard work."
        },
        {
          "phrase": "行ってきます！",
          "pinyin": "ittekimasu!",
          "meaning": "I'm leaving! (said when leaving home)."
        },
        {
          "phrase": "ただいま戻りました。",
          "pinyin": "tadaima modorimashita.",
          "meaning": "I've just returned."
        },
        {
          "phrase": "おやすみなさい。",
          "pinyin": "oyasuminasai.",
          "meaning": "Good night (polite)."
        }
      ]
    },
    {
      "id": "ja-3",
      "title": "All Katakana Reading and Writing Practice | Learn Japanese",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "fXmhAR1rIJk",
      "explanation": "Essential greetings and travel expressions for sightseeing in Japan.",
      "phrases": [
        {
          "phrase": "すみません、英語が話せますか？",
          "pinyin": "sumimasen, eigo ga hanasemasu ka?",
          "meaning": "Excuse me, can you speak English?"
        },
        {
          "phrase": "切符売り場はどこですか？",
          "pinyin": "kippu uriba wa doko desu ka?",
          "meaning": "Where is the ticket office?"
        },
        {
          "phrase": "これを一つください。",
          "pinyin": "kore o hitotsu kudasai.",
          "meaning": "Please give me one of this."
        },
        {
          "phrase": "クレジットカードは使えますか？",
          "pinyin": "kurejitto kaado wa tsukaemasu ka?",
          "meaning": "Can I use a credit card?"
        },
        {
          "phrase": "写真を撮ってもいいですか？",
          "pinyin": "shashin o tottemo ii desu ka?",
          "meaning": "Is it okay to take a photo?"
        },
        {
          "phrase": "お水をお願いします。",
          "pinyin": "omizu o onegai shimasu.",
          "meaning": "Water, please."
        },
        {
          "phrase": "英語のメニューはありますか？",
          "pinyin": "eigo no menyuu wa arimasu ka?",
          "meaning": "Do you have an English menu?"
        },
        {
          "phrase": "トイレはどこですか？",
          "pinyin": "toire wa doko desu ka?",
          "meaning": "Where is the restroom?"
        },
        {
          "phrase": "いくらですか？",
          "pinyin": "ikura desu ka?",
          "meaning": "How much is it?"
        },
        {
          "phrase": "ありがとうございました。",
          "pinyin": "arigatou gozaimashita.",
          "meaning": "Thank you very much (for what you did)."
        }
      ]
    },
    {
      "id": "ja-4",
      "title": "HIRAGANA TEST 01 - Japanese Words Quiz: Hiragana Reading Practice for Beginners",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "EwJgubX_J4k",
      "explanation": "Practice singing along to internalize Japanese characters and their correct sounds.",
      "phrases": [
        {
          "phrase": "「はにほへと」を一緒に歌いましょう。",
          "pinyin": "hanihoheto o issho ni utaimashou.",
          "meaning": "Let's sing 'hanihoheto' together."
        },
        {
          "phrase": "正しい発音を意識してください。",
          "pinyin": "tadashii hatsuon o ishiki shite kudasai.",
          "meaning": "Please be mindful of the correct pronunciation."
        },
        {
          "phrase": "リズムに合わせて発声します。",
          "pinyin": "rizumu ni awasete hassei shimasu.",
          "meaning": "Vocalize in time with the rhythm."
        },
        {
          "phrase": "「まみむめも」の口の形に注目します。",
          "pinyin": "mamimumemo no kuchi no katachi ni chuumoku shimasu.",
          "meaning": "Pay attention to the shape of the mouth for 'mamimumemo'."
        },
        {
          "phrase": "「やゆよ」は少し短く発音します。",
          "pinyin": "yayuyo wa sukoshi mijikaku hatsuon shimasu.",
          "meaning": "Pronounce 'yayuyo' slightly shorter."
        },
        {
          "phrase": "「らりるれろ」は舌を軽く弾きます。",
          "pinyin": "rarirurero wa shita o karuku hajiki masu.",
          "meaning": "Lightly tap your tongue for 'rarirurero'."
        },
        {
          "phrase": "「わをん」で歌は終わりです。",
          "pinyin": "wawon de uta wa owari desu.",
          "meaning": "The song ends with 'wawon'."
        },
        {
          "phrase": "もう一度最初から歌ってみましょう。",
          "pinyin": "mou ichido saisho kara utatte mimashou.",
          "meaning": "Let's try singing from the beginning once more."
        },
        {
          "phrase": "声がだんだん大きくなります。",
          "pinyin": "koe ga dandan ookiku narimasu.",
          "meaning": "The voice gradually gets louder."
        },
        {
          "phrase": "素晴らしい歌声でした！",
          "pinyin": "subarashii utagoe deshita!",
          "meaning": "That was a wonderful singing voice!"
        }
      ]
    },
    {
      "id": "ja-5",
      "title": "Japanese Alphabet Song (Hiragana) 🇯🇵🎶 #shorts #learnjapanese",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "dFRJJgAeUB4",
      "explanation": "Learn the phonetic combinations and writing rules of the Japanese Hiragana script.",
      "phrases": [
        {
          "phrase": "濁音は右上に点を二つ書きます。",
          "pinyin": "dakuon wa migiue ni ten o futatsu kakimasu.",
          "meaning": "For voiced sounds, write two dots on the top right (e.g. が)."
        },
        {
          "phrase": "「か」に点をつけると「が」になります。",
          "pinyin": "ka ni ten o tsukeru to ga ni narimasu.",
          "meaning": "Adding dots to 'ka' makes it 'ga'."
        },
        {
          "phrase": "半濁音は右上に小さな丸を書きます。",
          "pinyin": "handakuon wa migiue ni chiisana maru o kakimasu.",
          "meaning": "For semi-voiced sounds, write a small circle on the top right (e.g. ぱ)."
        },
        {
          "phrase": "「は」に丸をつけると「ぱ」になります。",
          "pinyin": "ha ni maru o tsukeru to pa ni narimasu.",
          "meaning": "Adding a circle to 'ha' makes it 'pa'."
        },
        {
          "phrase": "拗音は小さな「ゃ・ゅ・ょ」を使います。",
          "pinyin": "youon wa chiisana ya yu yo o tsukaimasu.",
          "meaning": "Contracted sounds use small 'ya', 'yu', 'yo'."
        },
        {
          "phrase": "「き」と小さな「ゃ」で「きゃ」です。",
          "pinyin": "ki to chiisana ya de kya desu.",
          "meaning": "'ki' and small 'ya' makes 'kya'."
        },
        {
          "phrase": "促音は小さな「っ」で表します。",
          "pinyin": "sokuon wa chiisana tsu de arawashimasu.",
          "meaning": "Double consonants are represented by a small 'tsu'."
        },
        {
          "phrase": "「切符」は「きっぷ」と書きます。",
          "pinyin": "kippu wa kippu to kakimasu.",
          "meaning": "'Ticket' is written as 'ki-p-pu'."
        },
        {
          "phrase": "長音は母音を伸ばして発音します。",
          "pinyin": "chouon wa boin o nobashite hatsuon shimasu.",
          "meaning": "Long vowels are pronounced by extending the vowel sound."
        },
        {
          "phrase": "たくさん練習してマスターしましょう。",
          "pinyin": "takusan renshuushite masutaa shimashou.",
          "meaning": "Let's practice a lot and master it."
        }
      ]
    },
    {
      "id": "ja-6",
      "title": "Learn ALL Kana: Hiragana + Katakana in 2 Hours - How to Write and Read Japanese",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "_wZHqOghvSs",
      "explanation": "Learn the absolute basic sentence structure of Japanese: SOV (Subject-Object-Verb).",
      "phrases": [
        {
          "phrase": "私は学生です。",
          "pinyin": "watashi wa gakusei desu.",
          "meaning": "I am a student."
        },
        {
          "phrase": "これは本です。",
          "pinyin": "kore wa hon desu.",
          "meaning": "This is a book."
        },
        {
          "phrase": "それは何ですか？",
          "pinyin": "sore wa nan desu ka?",
          "meaning": "What is that?"
        },
        {
          "phrase": "日本語は面白いです。",
          "pinyin": "nihongo wa omoshiroi desu.",
          "meaning": "Japanese is interesting."
        },
        {
          "phrase": "今日はお出かけですか？",
          "pinyin": "kyou wa odekake desu ka?",
          "meaning": "Are you going out today?"
        },
        {
          "phrase": "私はリンゴを食べます。",
          "pinyin": "watashi wa ringo o tabemasu.",
          "meaning": "I eat an apple."
        },
        {
          "phrase": "お茶を飲みますか？",
          "pinyin": "ocha o nomimasu ka?",
          "meaning": "Would you drink tea?"
        },
        {
          "phrase": "ここは教室です。",
          "pinyin": "koko wa kyoushitsu desu.",
          "meaning": "This place is a classroom."
        },
        {
          "phrase": "郵便局はどこにありますか？",
          "pinyin": "yuubinkyoku wa doko ni arimasu ka?",
          "meaning": "Where is the post office located?"
        },
        {
          "phrase": "どうぞ座ってください。",
          "pinyin": "douzo sutatte kudasai.",
          "meaning": "Please have a seat."
        }
      ]
    },
    {
      "id": "ja-7",
      "title": "Japanese Hiragana letters Song | Japanese Corner #hiragana #japanese #japaneselanguage",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "vpG6uxWUweU",
      "explanation": "Learn verb conjugations for daily actions and movement in Japanese.",
      "phrases": [
        {
          "phrase": "明日、京都に行きます。",
          "pinyin": "ashita, kyouto ni ikimasu.",
          "meaning": "Tomorrow, I will go to Kyoto."
        },
        {
          "phrase": "駅で友達に会います。",
          "pinyin": "eki de tomodachi ni aimasu.",
          "meaning": "I will meet a friend at the station."
        },
        {
          "phrase": "一緒に映画を見ませんか？",
          "pinyin": "issho ni eiga o mimasen ka?",
          "meaning": "Would you like to watch a movie together?"
        },
        {
          "phrase": "デパートで買い物をしました。",
          "pinyin": "depaato de kaimono o shimashita.",
          "meaning": "I did some shopping at the department store."
        },
        {
          "phrase": "日本語で手紙を書きました。",
          "pinyin": "nihongo de tegami o kakimashita.",
          "meaning": "I wrote a letter in Japanese."
        },
        {
          "phrase": "写真を撮ってもいいですか？",
          "pinyin": "shashin o tottemo ii desu ka?",
          "meaning": "Is it okay to take a photo?"
        },
        {
          "phrase": "ここでタバコを吸わないでください。",
          "pinyin": "koko de tabako o suwanai de kudasai.",
          "meaning": "Please do not smoke here."
        },
        {
          "phrase": "英語の辞書を借りてもいいですか？",
          "pinyin": "eigo no jisho o karitemo ii desu ka?",
          "meaning": "May I borrow an English dictionary?"
        },
        {
          "phrase": "毎朝、コーヒーを飲みます。",
          "pinyin": "maiasa, koohii o nomimasu.",
          "meaning": "Every morning, I drink coffee."
        },
        {
          "phrase": "昨日は家で勉強しました。",
          "pinyin": "kinou wa ie de benkyou shimashita.",
          "meaning": "Yesterday, I studied at home."
        }
      ]
    },
    {
      "id": "ja-8",
      "title": "Review ALL Hiragana in 20 minutes - Write and Read Japanese",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "SZK7scuchbE",
      "explanation": "Asking about schedules, operations, and times for transport in Japan.",
      "phrases": [
        {
          "phrase": "新幹線は何時に出発しますか？",
          "pinyin": "shinkansen wa nanji ni shuppatsu shimasu ka?",
          "meaning": "What time does the bullet train depart?"
        },
        {
          "phrase": "東京駅から京都駅まで行きます。",
          "pinyin": "toukyou eki kara kyouto eki made ikimasu.",
          "meaning": "Go from Tokyo Station to Kyoto Station."
        },
        {
          "phrase": "切符はどこで買えますか？",
          "pinyin": "kippu wa doko de kaemasu ka?",
          "meaning": "Where can I buy tickets?"
        },
        {
          "phrase": "窓側の席を予約したいです。",
          "pinyin": "madogawa no seki o yoyaku shitai desu.",
          "meaning": "I want to reserve a window seat."
        },
        {
          "phrase": "次の電車は急行ですか？",
          "pinyin": "tsugi no densha wa kyuukou desu ka?",
          "meaning": "Is the next train an express?"
        },
        {
          "phrase": "このバスは金閣寺を通りますか？",
          "pinyin": "kono basu wa kinkakuji o toorimasu ka?",
          "meaning": "Does this bus pass by Kinkaku-ji?"
        },
        {
          "phrase": "運賃はいくらかかりますか？",
          "pinyin": "unchin wa ikura kakarimasu ka?",
          "meaning": "How much does the fare cost?"
        },
        {
          "phrase": "タクシーを一台呼んでください。",
          "pinyin": "takushii o ichidai yonde kudasai.",
          "meaning": "Please call a taxi for me."
        },
        {
          "phrase": "ここで降りてもいいですか？",
          "pinyin": "koko de oritemo ii desu ka?",
          "meaning": "Is it okay to get off here?"
        },
        {
          "phrase": "目的地まであとどのくらいですか？",
          "pinyin": "mokutekichi made ato dono kurai desu ka?",
          "meaning": "How much longer until the destination?"
        }
      ]
    },
    {
      "id": "ja-9",
      "title": "🇯🇵 What is Hiragana, Katakana, Kanji? (JAPANESE LESSON #1)",
      "topic": "daily life",
      "level": "Intermediate",
      "youtubeId": "R9QI-2cZa6A",
      "explanation": "Talking about hobbies, preferences, and describing items using adjectives.",
      "phrases": [
        {
          "phrase": "私の趣味は音楽を聴くことです。",
          "pinyin": "watashi no shumi wa ongaku o kiku koto desu.",
          "meaning": "My hobby is listening to music."
        },
        {
          "phrase": "辛い料理がとても好きです。",
          "pinyin": "karai ryouri ga totemo suki desu.",
          "meaning": "I like spicy food very much."
        },
        {
          "phrase": "スポーツの中ではテニスが一番得意です。",
          "pinyin": "supootsu no naka dewa tenisu ga ichiban tokui desu.",
          "meaning": "Out of all sports, I am best at tennis."
        },
        {
          "phrase": "週末はいつも映画を見に行きます。",
          "pinyin": "shuumatsu wa itsumo eiga o mi ni ikimasu.",
          "meaning": "I always go to watch movies on weekends."
        },
        {
          "phrase": "日本語の小説を読むのは難しいです。",
          "pinyin": "nihongo no shousetsu o yomu no wa muzukashii desu.",
          "meaning": "Reading Japanese novels is difficult."
        },
        {
          "phrase": "このカメラは軽くて使いやすいです。",
          "pinyin": "kono kamera wa karukute tsukai yasui desu.",
          "meaning": "This camera is light and easy to use."
        },
        {
          "phrase": "美味しい寿司を食べに行きましょう。",
          "pinyin": "oishii sushi o tabe ni ikimashou.",
          "meaning": "Let's go eat delicious sushi."
        },
        {
          "phrase": "日本の夏はとても蒸し暑いです。",
          "pinyin": "nihon no natsu wa totemo mushiatsui desu.",
          "meaning": "Summer in Japan is very hot and humid."
        },
        {
          "phrase": "私の部屋は静かで快適です。",
          "pinyin": "watashi no heya wa shizuka de kaiteki desu.",
          "meaning": "My room is quiet and comfortable."
        },
        {
          "phrase": "将来、日本で働きたいと思っています。",
          "pinyin": "shourai, nihon de hatarakitai to omotte imasu.",
          "meaning": "I am thinking that I want to work in Japan in the future."
        }
      ]
    },
    {
      "id": "ja-10",
      "title": "Learn Hiragana fast in 3 minutes | あいうえおのうた",
      "topic": "daily life",
      "level": "Advanced",
      "youtubeId": "2qk4gCZuSjk",
      "explanation": "Learn Keigo (polite honorary speech) for professional corporate environments in Japan.",
      "phrases": [
        {
          "phrase": "少々お待ちいただけますでしょうか？",
          "pinyin": "shouhou omachi itadakemasu deshou ka?",
          "meaning": "Would you mind waiting for a brief moment?"
        },
        {
          "phrase": "資料をご一読いただけますと幸いです。",
          "pinyin": "shiryou o goichidoku itadakemasu to saiwai desu.",
          "meaning": "I would appreciate it if you could read through the materials."
        },
        {
          "phrase": "本日はお忙しい中、ありがとうございます。",
          "pinyin": "honjitsu wa oisogashii naka, arigatou gozaimasu.",
          "meaning": "Thank you for taking time out of your busy schedule today."
        },
        {
          "phrase": "承知いたしました。ただいま手配いたします。",
          "pinyin": "shouchi itashimashita. tadaima tehai itashimasu.",
          "meaning": "Understood. I will arrange it right away."
        },
        {
          "phrase": "おっしゃる通りでございます。",
          "pinyin": "ossharu toori de gozaimasu.",
          "meaning": "It is exactly as you say."
        },
        {
          "phrase": "お手数をおかけしますが、よろしくお願いいたします。",
          "pinyin": "otesuu o okakeshimasu ga, yoroshiku onegai itashimasu.",
          "meaning": "I apologize for the trouble, but thank you for your cooperation."
        },
        {
          "phrase": "鈴木様はいらっしゃいますでしょうか？",
          "pinyin": "suzuki sama wa irasshaimasu deshou ka?",
          "meaning": "Is Mr./Ms. Suzuki here, by any chance?"
        },
        {
          "phrase": "ご都合のよろしい日時をお知らせください。",
          "pinyin": "gotsugou no yoroshii nichiji o oshirase kudasai.",
          "meaning": "Please let us know a date and time that is convenient for you."
        },
        {
          "phrase": "よろしくご検討のほどお願い申し上げます。",
          "pinyin": "yoroshiku gokentou no hodo onegai moushiage masu.",
          "meaning": "Thank you in advance for your consideration."
        },
        {
          "phrase": "山田はただいま席を外しております。",
          "pinyin": "yamada wa tadaima seki o hazushite orimasu.",
          "meaning": "Yamada is away from their desk at the moment."
        }
      ]
    }
  ],
  "ko": [
    {
      "id": "ko-1",
      "title": "How to Learn and Read the Korean Alphabet (Hangul) in 10 Minutes🇰🇷 | Learn Korean for Beginners",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "rBDrM1VPJX0",
      "explanation": "Hangul was designed so that the shape of the letters mimics the shape your mouth makes!",
      "phrases": [
        {
          "phrase": "한글은 세종대왕이 창제했습니다.",
          "pinyin": "hangeureun sejongdaewangi changjehaessseumnida.",
          "meaning": "Hangul was created by King Sejong the Great."
        },
        {
          "phrase": "한글은 자음과 모음으로 이루어져 있습니다.",
          "pinyin": "hangeureun jaeumgwa moeumeuro irueojyeo isseumnida.",
          "meaning": "Hangul consists of consonants and vowels."
        },
        {
          "phrase": "기본 자음은 모두 십사 자입니다.",
          "pinyin": "gibon jaeumeun modu sipsa ja-imnida.",
          "meaning": "There are 14 basic consonants in total."
        },
        {
          "phrase": "기본 모음은 모두 십 자입니다.",
          "pinyin": "gibon moeumeun modu sip ja-imnida.",
          "meaning": "There are 10 basic vowels in total."
        },
        {
          "phrase": "글자의 모양은 발음 기관을 본떴습니다.",
          "pinyin": "geuljaui moyangeun bareum gigwaneul bontteossseumnida.",
          "meaning": "The shape of the letters mimics the vocal organs."
        },
        {
          "phrase": "한글은 배우기 아주 쉬운 문자입니다.",
          "pinyin": "hangeureun baeugi aju swiun munja-imnida.",
          "meaning": "Hangul is a very easy script to learn."
        },
        {
          "phrase": "오늘부터 한글 쓰기를 연습해 봅시다.",
          "pinyin": "oneulbuteo hangeul sseugireul yeonseupae bopsida.",
          "meaning": "Let's practice writing Hangul starting today."
        },
        {
          "phrase": "받침의 발음에 주의해야 합니다.",
          "pinyin": "batchimui bareume juuihaeya hamnida.",
          "meaning": "You need to be careful with the pronunciation of batchim (final consonants)."
        },
        {
          "phrase": "자음과 모음을 합쳐서 글자를 만듭니다.",
          "pinyin": "jaeumgwa moeumeul hapchyeoseo geulzareul mandeumnida.",
          "meaning": "You combine consonants and vowels to make letters."
        },
        {
          "phrase": "참 잘하셨어요! 계속 연습하세요.",
          "pinyin": "cham jalhasyeosseoyo! gyesok yeonseuphaseyo.",
          "meaning": "Very well done! Keep practicing."
        }
      ]
    },
    {
      "id": "ko-2",
      "title": "Korean Alphabet - Learn to Read and Write Korean #1 - Hangul Basic Vowels: ㅇ,ㅏ,ㅣ",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "KN4mysljHYc",
      "explanation": "It is normal to loudly call the waiter by shouting 'Yeogiyo!'.",
      "phrases": [
        {
          "phrase": "안녕하세요, 네 명 자리가 있을까요?",
          "pinyin": "annyeonghaseyo, ne myeong jariga isseulkkayo?",
          "meaning": "Hello, would there be a table for four?"
        },
        {
          "phrase": "삼겹살 삼 인분 먼저 주세요.",
          "pinyin": "samgyeopsal sam inbun meonjeo juseyo.",
          "meaning": "Please give us three servings of pork belly first."
        },
        {
          "phrase": "여기 불판 좀 갈아주실 수 있나요?",
          "pinyin": "yeogi bulpan jom garajusil su innayo?",
          "meaning": "Could you change the grill plate here?"
        },
        {
          "phrase": "고기는 저희가 직접 구워야 하나요?",
          "pinyin": "gogineun jeohuiga jikjeop guwoya hanayo?",
          "meaning": "Do we have to grill the meat ourselves?"
        },
        {
          "phrase": "상추랑 깻잎 좀 더 갖다 주세요.",
          "pinyin": "sangchurang kkaen-ip jom deo gatda juseyo.",
          "meaning": "Please bring us some more lettuce and perilla leaves."
        },
        {
          "phrase": "찌개는 김치찌개랑 된장찌개 중 선택해 주세요.",
          "pinyin": "jjigaeneun gimchijjigaerang doenjangjjigae jung seontaeghae juseyo.",
          "meaning": "For the stew, please choose between kimchi stew and soybean paste stew."
        },
        {
          "phrase": "고기 소스로 쌈장을 찍어 드셔보세요.",
          "pinyin": "gogi soseuro ssamjangeul jjigeo deusyeoboseyo.",
          "meaning": "Try dipping the meat in ssamjang sauce."
        },
        {
          "phrase": "여기 물냉면 하나 추가해 주세요.",
          "pinyin": "yeogi mulnaengmyeon hana chugahae juseyo.",
          "meaning": "Please add one cold noodle soup here."
        },
        {
          "phrase": "진짜 맛있네요, 고기가 아주 부드러워요.",
          "pinyin": "jinjja masinneyo, gogiga aju budeureowoyo.",
          "meaning": "It's really delicious, the meat is very tender."
        },
        {
          "phrase": "이모님, 계산은 어디서 하나요?",
          "pinyin": "imonim, gyesaneun eodiseo hanayo?",
          "meaning": "Ma'am, where do we pay the bill?"
        }
      ]
    },
    {
      "id": "ko-3",
      "title": "Korean Alphabet - Learn to Read and Write Korean #2 - Hangul Basic Vowels 2 ㅑ, ㅓ, ㅕ",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "3QbAKAEKpLs",
      "explanation": "A quick-start introduction to identifying and sounding out simple Hangul letters.",
      "phrases": [
        {
          "phrase": "한글은 과학적인 문자입니다.",
          "pinyin": "hangeureun gwahakjeogin munja-imnida.",
          "meaning": "Hangul is a scientific script."
        },
        {
          "phrase": "기본 모음 아, 야, 어, 여를 배워봅시다.",
          "pinyin": "gibon moeum a, ya, eo, yeoreul baewobopsida.",
          "meaning": "Let's learn the basic vowels: a, ya, eo, yeo."
        },
        {
          "phrase": "기본 자음 그, 느, 드, 르를 씁니다.",
          "pinyin": "gibon jaeum geu, neu, deu, reureul sseumnida.",
          "meaning": "Write the basic consonants: g, n, d, r."
        },
        {
          "phrase": "자음과 모음이 만나 글자가 됩니다.",
          "pinyin": "jaeumgwa moeumi manna geuljaga doemnida.",
          "meaning": "Consonants and vowels meet to become letters."
        },
        {
          "phrase": "소리 내어 읽으면 훨씬 쉽습니다.",
          "pinyin": "sori naeeo ilgeumyeon hwolssin swipsumnida.",
          "meaning": "It is much easier if you read it out loud."
        },
        {
          "phrase": "매일 십 분씩 연습해 보세요.",
          "pinyin": "maeil sip bunssik yeonseuphae boseyo.",
          "meaning": "Try practicing for 10 minutes every day."
        },
        {
          "phrase": "이름을 한글로 써 볼까요?",
          "pinyin": "ireumeul hangeullo sseo bolkkayo?",
          "meaning": "Shall we write your name in Hangul?"
        },
        {
          "phrase": "글자의 순서대로 따라 써 보세요.",
          "pinyin": "geuljaui sunseodaero ttara sseo boseyo.",
          "meaning": "Try writing it along the order of characters."
        },
        {
          "phrase": "듣고 따라 하는 것이 중요합니다.",
          "pinyin": "deutgo ttara haneun geosi jung-yohamnida.",
          "meaning": "Listening and repeating is important."
        },
        {
          "phrase": "한글 쓰기가 정말 재미있어요.",
          "pinyin": "hangeul sseugiga jeongmal jaemiisseoyo.",
          "meaning": "Writing Hangul is really fun."
        }
      ]
    },
    {
      "id": "ko-4",
      "title": "[1 hour] Learn to Read Korean | Full Hangeul Course",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "uNDf0V06m0w",
      "explanation": "Accelerated course to master double consonants and composite vowels in Korean.",
      "phrases": [
        {
          "phrase": "쌍자음의 발음은 훨씬 강합니다.",
          "pinyin": "ssangjaeumui bareumeun hwolssin ganghamnida.",
          "meaning": "The pronunciation of double consonants is much stronger."
        },
        {
          "phrase": "이중 모음의 조합을 이해해 봅시다.",
          "pinyin": "ijung moeumui johabeul ihaehae bopsida.",
          "meaning": "Let's understand the combination of double vowels."
        },
        {
          "phrase": "글자가 결합하는 규칙이 있습니다.",
          "pinyin": "geuljaga gyeolhabhaneun gyuchigi isseumnida.",
          "meaning": "There are rules for combining characters."
        },
        {
          "phrase": "받침이 뒤로 이어져 소리 납니다.",
          "pinyin": "batchimi dwiro ieojyeo sori namnida.",
          "meaning": "The final consonant carries over to sound next."
        },
        {
          "phrase": "이 단어는 어떻게 발음하나요?",
          "pinyin": "i daneoneun eotteoke bareumhanayo?",
          "meaning": "How do you pronounce this word?"
        },
        {
          "phrase": "천천히 발음해 드릴게요, 잘 들으세요.",
          "pinyin": "cheoncheonhi bareumhae deurilgeyo, jal deureuseyo.",
          "meaning": "I'll pronounce it slowly, listen carefully."
        },
        {
          "phrase": "대표적인 예시 단어들을 공부합시다.",
          "pinyin": "daepyojeogin yesi daneodeureul gongbuhapsida.",
          "meaning": "Let's study representative example words."
        },
        {
          "phrase": "연음 법칙에 주의해서 읽으세요.",
          "pinyin": "yeoneum beopchige juuihaeseo ilgeuseyo.",
          "meaning": "Read carefully, paying attention to liaison rules."
        },
        {
          "phrase": "이제 간단한 단어는 다 읽을 수 있어요.",
          "pinyin": "ije gandanhaan daneoneun da ilgeul su isseoyo.",
          "meaning": "Now you can read all simple words."
        },
        {
          "phrase": "포기하지 말고 끝까지 파이팅하세요!",
          "pinyin": "pogihaji malgo kkeutkkaji paitinghaseyo!",
          "meaning": "Don't give up and fight to the end!"
        }
      ]
    },
    {
      "id": "ko-5",
      "title": "Learn Hangul in 90 Minutes - Start to Finish [Complete Series]",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "s5aobqyEaMQ",
      "explanation": "Mastering the must-know grammar structures and greetings in Korean.",
      "phrases": [
        {
          "phrase": "안녕하세요, 만나서 반갑습니다.",
          "pinyin": "annyeonghaseyo, mannaseo bangapsumnida.",
          "meaning": "Hello, nice to meet you."
        },
        {
          "phrase": "제 이름은 지우입니다. 영국 사람이에요.",
          "pinyin": "je ireumeun jiuimnida. yeongguk saram-ieyo.",
          "meaning": "My name is Ji-woo. I am British."
        },
        {
          "phrase": "이것은 한국어로 뭐라고 하나요?",
          "pinyin": "igeoseun hangugeoro mworageo hanayo?",
          "meaning": "What do you call this in Korean?"
        },
        {
          "phrase": "화장실이 어디에 있는지 아세요?",
          "pinyin": "hwajangsiri eodie inneunji aseyo?",
          "meaning": "Do you know where the restroom is?"
        },
        {
          "phrase": "도와주셔서 정말 감사합니다.",
          "pinyin": "dowajusyeoseo jeongmal gamsahamnida.",
          "meaning": "Thank you so much for helping me."
        },
        {
          "phrase": "미안합니다, 아직 한국어를 잘 못해요.",
          "pinyin": "mianhamnida, ajik hangugeoreul jal mothaeyo.",
          "meaning": "Sorry, I cannot speak Korean well yet."
        },
        {
          "phrase": "얼마예요? 할인해 주실 수 있나요?",
          "pinyin": "eolmayeyo? harinhae jusil su innayo?",
          "meaning": "How much is it? Can you give me a discount?"
        },
        {
          "phrase": "김치찌개 맵지 않게 해 주세요.",
          "pinyin": "gimchijjigae maepji ange hae juseyo.",
          "meaning": "Please make the Kimchi stew not spicy."
        },
        {
          "phrase": "맛있게 드세요, 식사 후에 봐요.",
          "pinyin": "masitge deuseyo, siksa hue bwayo.",
          "meaning": "Enjoy your meal, see you after eating."
        },
        {
          "phrase": "다음에 또 만나요! 안녕히 가세요.",
          "pinyin": "daeume tto mannayo! annyeonghi gaseyo.",
          "meaning": "See you next time! Goodbye."
        }
      ]
    },
    {
      "id": "ko-6",
      "title": "How to Memorize Korean Hangul 14 Consonants EASILY! (Hangul Lesson #1)",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "62_RhIsdqhw",
      "explanation": "Billy Go introduces Korean sentence endings like -euyo and -sumnida.",
      "phrases": [
        {
          "phrase": "한국어 문장의 서술어는 항상 맨 뒤에 옵니다.",
          "pinyin": "hangugeo munjangui seosuroreun hangsang maen dwie omnida.",
          "meaning": "The predicate in a Korean sentence always comes at the very end."
        },
        {
          "phrase": "저는 매일 아침 사과를 먹어요.",
          "pinyin": "jeoneun maeil achim sagwareul meogeoyo.",
          "meaning": "I eat an apple every morning."
        },
        {
          "phrase": "그 책은 정말 재미있습니다.",
          "pinyin": "geu chaegeun jeongmal jaemiisseumnida.",
          "meaning": "That book is really interesting."
        },
        {
          "phrase": "어제는 친구와 함께 쇼핑을 했어요.",
          "pinyin": "eojeneun chinguwa hamkke syopingeul haesseoyo.",
          "meaning": "Yesterday I went shopping with a friend."
        },
        {
          "phrase": "내일은 날씨가 아주 따뜻할 거예요.",
          "pinyin": "naeireun nalssiga aju ttatteushal geoyeyo.",
          "meaning": "Tomorrow the weather will be very warm."
        },
        {
          "phrase": "이 펜을 사용해도 괜찮을까요?",
          "pinyin": "i peneul sayonghaedo gwaenchanheulkkayo?",
          "meaning": "Is it okay if I use this pen?"
        },
        {
          "phrase": "지금 가고 있으니까 잠시만 기다려 주세요.",
          "pinyin": "jigeum gago isseunikka jamsiman gidaryeo juseyo.",
          "meaning": "I am on my way now, so please wait a moment."
        },
        {
          "phrase": "주말에는 주로 집에서 쉽니다.",
          "pinyin": "jumareneun juro jibeseo swimnida.",
          "meaning": "On weekends, I usually rest at home."
        },
        {
          "phrase": "여기서 제일 인기 있는 메뉴가 뭐예요?",
          "pinyin": "yeogiseo jeil ingi inneun menyuga mwoyeyo?",
          "meaning": "What is the most popular menu item here?"
        },
        {
          "phrase": "공항까지 가는데 한 시간 정도 걸립니다.",
          "pinyin": "gonghangkkaji ganeunde han sigan jeongdo geollimnida.",
          "meaning": "It takes about an hour to get to the airport."
        }
      ]
    },
    {
      "id": "ko-7",
      "title": "Learn Hangeul 한글 (Korean Alphabet) in 30 minutes",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "85qJXvyFrIc",
      "explanation": "Practical resources and strategies to build vocabulary fast.",
      "phrases": [
        {
          "phrase": "한국어 공부를 시작하는 가장 좋은 방법은 무엇일까요?",
          "pinyin": "hangugo gongbureul sijakhaneun gajang joeun bangbobeun mueosilkkayo?",
          "meaning": "What is the best way to start studying Korean?"
        },
        {
          "phrase": "가장 자주 쓰이는 단어부터 외워보세요.",
          "pinyin": "gajang jaju sseuyineun daneobuteo oewoboseyo.",
          "meaning": "Try memorizing the most frequently used words first."
        },
        {
          "phrase": "매일 꾸준히 학습하는 습관을 기르세요.",
          "pinyin": "maeil kkujunhi hakseuphaneun seupgwaneul gireuseyo.",
          "meaning": "Develop the habit of studying consistently every day."
        },
        {
          "phrase": "좋아하는 한국 노래의 가사를 분석해 보세요.",
          "pinyin": "joahaneun hanguk noraeui gasareul bunseokhae boseyo.",
          "meaning": "Try analyzing the lyrics of your favorite Korean songs."
        },
        {
          "phrase": "드라마를 볼 때 자막 없이 듣기를 시도하세요.",
          "pinyin": "deuramareul bol ttae jamak eopsi deutgireul sidohaseyo.",
          "meaning": "Try listening without subtitles when watching K-dramas."
        },
        {
          "phrase": "틀리는 것을 두려워하지 말고 많이 말해 보세요.",
          "pinyin": "teullineun geoseul duryeowohaji malgo mani marhae boseyo.",
          "meaning": "Don't be afraid of making mistakes, and try to speak a lot."
        },
        {
          "phrase": "언어 교환 파트너를 찾는 것도 좋은 생각입니다.",
          "pinyin": "eoneo gyohwan pateuneoreul chatneun geosdo joeun saenggagimnida.",
          "meaning": "Finding a language exchange partner is also a good idea."
        },
        {
          "phrase": "단어장에 새로운 표현들을 정리하세요.",
          "pinyin": "daneojange saeroun pyohyeondeureul jeongrihaseyo.",
          "meaning": "Organize new expressions in a vocabulary book."
        },
        {
          "phrase": "쉬운 동화책부터 읽기 시작하면 좋습니다.",
          "pinyin": "swiun donghwachaekbuteo ilgi sijakhamyeon johtsumnida.",
          "meaning": "It is good to start reading from easy children's storybooks."
        },
        {
          "phrase": "당신의 한국어 학습을 응원합니다!",
          "pinyin": "dangsinui hangugo hakseubeul eungwonhamnida!",
          "meaning": "I'm cheering on your Korean learning!"
        }
      ]
    },
    {
      "id": "ko-8",
      "title": "#1) Learn Korean Alphabets Hangul 한글 - 10 Basic Vowels🇰🇷 #koreanlanguage #learnkorean #hangeul",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "RKPrsg58QnQ",
      "explanation": "A foreigner shares helpful mnemonics and structures to learn Korean vocabulary.",
      "phrases": [
        {
          "phrase": "한국어 발음은 생각보다 아주 직관적입니다.",
          "pinyin": "hangugeo bareumeun saenggakboda aju jikgwanjeogimnida.",
          "meaning": "Korean pronunciation is much more intuitive than you think."
        },
        {
          "phrase": "연상 기법을 사용해서 단어를 외워보세요.",
          "pinyin": "yeonsang gibobeul sayonghaeseo daneoreul oewoboseyo.",
          "meaning": "Try memorizing words using association techniques."
        },
        {
          "phrase": "비슷하게 들리는 단어들의 차이를 비교해 보세요.",
          "pinyin": "biseuthage deullineun daneodeurui chaireul bigyohae boseyo.",
          "meaning": "Compare the differences between words that sound similar."
        },
        {
          "phrase": "조사의 쓰임새를 정확하게 공부하는 것이 좋습니다.",
          "pinyin": "josaui sseimsaereul jeonghwakhage gongbuhaneun geosi johtsumnida.",
          "meaning": "It is good to study the usage of particles accurately."
        },
        {
          "phrase": "문장의 뼈대를 먼저 잡고 살을 붙여가세요.",
          "pinyin": "munjangui ppyadaereul meonjeo jabgo sareul buthyeogaseyo.",
          "meaning": "Get the frame of the sentence first and add more detail."
        },
        {
          "phrase": "스스로 예문을 만들어 보면 기억에 더 오래 남습니다.",
          "pinyin": "seuseuro yemuneul mandeoreo bomyeon gieoge deo orae namsumnida.",
          "meaning": "If you make example sentences yourself, it stays in memory longer."
        },
        {
          "phrase": "발음 규칙을 완전히 무시하면 알아듣기 어렵습니다.",
          "pinyin": "bareum gyuchigeul wanjeonhi musihamyeon aradeutgi eoryeopsumnida.",
          "meaning": "If you ignore pronunciation rules completely, it is hard to understand."
        },
        {
          "phrase": "단어가 문맥 속에서 어떻게 쓰이는지 관찰하세요.",
          "pinyin": "daneoga munmaek sogeseo eotteoke sseuyineunji gwanchalhaseyo.",
          "meaning": "Observe how words are used within the context."
        },
        {
          "phrase": "유용한 실생활 문장들을 통째로 암기하세요.",
          "pinyin": "yuyonghan silsaenghwal munjangdeureul tongjjaero amgihaseyo.",
          "meaning": "Memorize useful real-life sentences as a whole."
        },
        {
          "phrase": "배운 것을 바로 실전에 사용해 보세요.",
          "pinyin": "baeun geoseul baro siljeone sayonghae boseyo.",
          "meaning": "Try using what you learned in practice right away."
        }
      ]
    },
    {
      "id": "ko-9",
      "title": "#2) Learn Korean Alphabets Hangul 한글 - 14 Basic Consonants🇰🇷 #koreanlanguage #learnkorean",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "r7R62t1o_t0",
      "explanation": "Practice listening with structured simple short stories matching beginner and intermediate vocab.",
      "phrases": [
        {
          "phrase": "옛날 옛적에 작은 마을에 한 소년이 살았습니다.",
          "pinyin": "yetnal yetjeoge jageun maeure han sonyeoni sarassnida.",
          "meaning": "Once upon a time, a boy lived in a small village."
        },
        {
          "phrase": "소년은 매일 아침 숲속을 산책하는 것을 좋아했습니다.",
          "pinyin": "sonyeoneun maeil achim supsogeul sanchaeghaneun geosel joahassnida.",
          "meaning": "The boy liked to take a walk in the forest every morning."
        },
        {
          "phrase": "어느 날, 소년은 다친 파랑새 한 마리를 발견했습니다.",
          "pinyin": "eoneu nal, sonyeoneun dachin parangsae han marireul balgyeonhaessnida.",
          "meaning": "One day, the boy discovered a wounded blue bird."
        },
        {
          "phrase": "그는 파랑새를 집으로 데려와서 정성껏 보살폈습니다.",
          "pinyin": "geuneun parangsaereul jibeuro deryeowaseo jeongseongkkeot bosalpyeossnida.",
          "meaning": "He brought the blue bird home and cared for it with sincerity."
        },
        {
          "phrase": "며칠 후, 새는 다시 건강해져서 하늘로 날아갔습니다.",
          "pinyin": "myeochil hu, saeneun dasi geonganghaejyeoseo haneullo nalagassnida.",
          "meaning": "A few days later, the bird became healthy again and flew into the sky."
        },
        {
          "phrase": "소년은 새가 떠나서 조금 슬펐지만 기뻤습니다.",
          "pinyin": "sonyeoneun saega tteonaseo jogeum seulpeossjiman gippeossnida.",
          "meaning": "The boy was a little sad that the bird left, but he was happy."
        },
        {
          "phrase": "다음 날 아침, 창문 너머로 파랑새의 노랫소리가 들렸습니다.",
          "pinyin": "daum nal achim, changmun neomeoro parangsaeui noraessorigga deullyeossnida.",
          "meaning": "The next morning, the song of the blue bird was heard beyond the window."
        },
        {
          "phrase": "새는 친구들과 함께 소년에게 고마움을 표시하러 왔습니다.",
          "pinyin": "saeneun chingudeulwa hamkke sonyeonege gomaumeul pyosihareo wassnida.",
          "meaning": "The bird came with its friends to express gratitude to the boy."
        },
        {
          "phrase": "소년은 동물들과 진정한 친구가 될 수 있음을 배웠습니다.",
          "pinyin": "sonyeoneun dongmuldeulwa jinjeonghan chinguga doel su isseumel baewossnida.",
          "meaning": "The boy learned that he could become true friends with animals."
        },
        {
          "phrase": "이 이야기는 우리에게 친절함의 가치를 가르쳐 줍니다.",
          "pinyin": "i iyagineun uriege chinjeolhamui gachireul gareuchyeo jumnida.",
          "meaning": "This story teaches us the value of kindness."
        }
      ]
    },
    {
      "id": "ko-10",
      "title": "Learn the Korean Hanguel",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "opw_tSJzJ7A",
      "explanation": "Advanced pronunciation tips to make you sound like a native Korean.",
      "phrases": [
        {
          "phrase": "한국어의 억양은 평평한 편입니다.",
          "pinyin": "hangugeoui eogyangeun pyeongpyeonghan pyeonimnida.",
          "meaning": "The intonation of Korean is relatively flat."
        },
        {
          "phrase": "의문문을 말할 때는 끝을 올려서 읽습니다.",
          "pinyin": "uimunmuneul malhal taeneun kkeuteul ollyeoseo ilgsumnida.",
          "meaning": "Raise the ending of the sentence when asking questions."
        },
        {
          "phrase": "자연스러운 한국어 속도를 연습합시다.",
          "pinyin": "jayeonseureoun hangugeo sokdoreul yeonseuphapsida.",
          "meaning": "Let's practice speaking at a natural Korean speed."
        },
        {
          "phrase": "단어의 강세는 특별히 주지 않습니다.",
          "pinyin": "daneoui gangseneun teukbyeolhi juji ansumnida.",
          "meaning": "Words do not have any special emphasis or stress."
        },
        {
          "phrase": "조사와 명사를 붙여서 부드럽게 발음하세요.",
          "pinyin": "josawa myeongsareul buthyeoseo budeureopge bareumhaseyo.",
          "meaning": "Pronounce particles and nouns together smoothly."
        },
        {
          "phrase": "격음과 경음의 차이를 명확하게 발음해야 합니다.",
          "pinyin": "gyeogeumgwa gyeongeumui chaireul myeonghwakhage bareumhaeya hamnida.",
          "meaning": "You must clearly pronounce aspirated and tense consonants."
        },
        {
          "phrase": "현지인들의 대화 영상을 자주 보세요.",
          "pinyin": "hyeonjiindeului daehwa yeongsangeul jaju boseyo.",
          "meaning": "Watch conversation videos of native speakers frequently."
        },
        {
          "phrase": "자신의 목소리를 녹음해서 들어보세요.",
          "pinyin": "jasinui moksorireul nokeumhaeseo deureoboseyo.",
          "meaning": "Record your own voice and listen to it."
        },
        {
          "phrase": "원어민의 억양을 섀도잉하는 것이 큰 도움이 됩니다.",
          "pinyin": "woneominui eogyangeul saedoinghaneun geosi keun doumi doemnida.",
          "meaning": "Shadowing the intonation of native speakers is of great help."
        },
        {
          "phrase": "점점 더 발음이 자연스러워지고 있어요.",
          "pinyin": "jeomjeom deo bareumi jayeonseureowojigo isseoyo.",
          "meaning": "Your pronunciation is becoming more and more natural."
        }
      ]
    }
  ],
  "de": [
    {
      "id": "de-1",
      "title": "A1 - Lesson 1 | Begrüßungen | Greetings | Revised | German for beginners | Learn German",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "RuGmc662HDg",
      "explanation": "Master the German alphabet and its unique pronunciation rules, including umlauts and special characters.",
      "phrases": [
        {
          "phrase": "Guten Tag! Willkommen beim Deutschlernen.",
          "meaning": "Good day! Welcome to learning German."
        },
        {
          "phrase": "Das deutsche Alphabet hat sechsundzwanzig Buchstaben.",
          "meaning": "The German alphabet has 26 letters."
        },
        {
          "phrase": "Es gibt vier Sonderzeichen: Ä, Ö, Ü und das Eszett.",
          "meaning": "There are four special characters: Ä, Ö, Ü and the double S (ß)."
        },
        {
          "phrase": "Der Buchstabe 'Ä' klingt wie das englische 'E' in 'bed'.",
          "meaning": "The letter 'Ä' sounds like the English 'E' in 'bed'."
        },
        {
          "phrase": "Für das 'Ö' runden Sie die Lippen und sagen Sie 'E'.",
          "meaning": "For the 'Ö', round your lips and say 'E'."
        },
        {
          "phrase": "Das 'Ü' wird gesprochen, indem Sie die Lippen wie beim Pfeifen runden.",
          "meaning": "The 'Ü' is spoken by rounding your lips as if whistling."
        },
        {
          "phrase": "Das Eszett 'ß' wird wie ein stimmloses 'S' ausgesprochen.",
          "meaning": "The 'ß' (Eszett) is pronounced like a voiceless 'S'."
        },
        {
          "phrase": "Bitte buchstabieren Sie Ihren Nachnamen.",
          "meaning": "Please spell your last name."
        },
        {
          "phrase": "Mein Name wird mit einem Umlaut geschrieben.",
          "meaning": "My name is written with an umlaut."
        },
        {
          "phrase": "Übung macht den Meister, also sprechen Sie mir nach!",
          "meaning": "Practice makes perfect, so repeat after me!"
        }
      ]
    },
    {
      "id": "de-2",
      "title": "A1 - Lesson 2 | Common Phrases | Revised | German for beginners | Learn German",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "S8ukFF6SdGk",
      "explanation": "Quick reference guide to spell names and understand spelling letters in German.",
      "phrases": [
        {
          "phrase": "Buchstabieren Sie Ihren Namen bitte.",
          "meaning": "Please spell your name."
        },
        {
          "phrase": "Ich heiße Michael, das schreibt man mit M-I-C-H-A-E-L.",
          "meaning": "My name is Michael, that is written with M-I-C-H-A-E-L."
        },
        {
          "phrase": "Wie schreibt man das Wort 'Straße'?",
          "meaning": "How do you write the word 'Straße'?"
        },
        {
          "phrase": "Man schreibt es mit einem scharfen S am Ende.",
          "meaning": "It is written with a sharp S at the end."
        },
        {
          "phrase": "Können Sie das bitte aufschreiben?",
          "meaning": "Could you please write that down?"
        },
        {
          "phrase": "Das Alphabet ist die Grundlage jeder Sprache.",
          "meaning": "The alphabet is the basis of every language."
        },
        {
          "phrase": "Vokale und Konsonanten klingen im Deutschen sehr klar.",
          "meaning": "Vowels and consonants sound very clear in German."
        },
        {
          "phrase": "Das 'W' wird im Deutschen wie ein englisches 'V' ausgesprochen.",
          "meaning": "The 'W' is pronounced like an English 'V' in German."
        },
        {
          "phrase": "Und das 'V' klingt meistens wie ein 'F'.",
          "meaning": "And the 'V' usually sounds like an 'F'."
        },
        {
          "phrase": "Das ist sehr wichtig für die richtige Aussprache.",
          "meaning": "That is very important for the correct pronunciation."
        }
      ]
    },
    {
      "id": "de-3",
      "title": "Learn German A1 in 25 Minutes Step by Step (Crash Course For Beginners)",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "mNX1wpIQ4Uk",
      "explanation": "Introduce vowels, consonants and basic spellings in German.",
      "phrases": [
        {
          "phrase": "Hallo! Ich heiße Sarah und das ist mein Kollege.",
          "meaning": "Hello! My name is Sarah and this is my colleague."
        },
        {
          "phrase": "Woher kommen Sie? Ich komme aus Österreich.",
          "meaning": "Where do you come from? I come from Austria."
        },
        {
          "phrase": "Wir lernen heute die Grundlagen der deutschen Sprache.",
          "meaning": "Today we are learning the basics of the German language."
        },
        {
          "phrase": "Wie ist Ihre Telefonnummer für Rückfragen?",
          "meaning": "What is your telephone number for inquiries?"
        },
        {
          "phrase": "Meine Nummer ist null-eins-sieben-zwei.",
          "meaning": "My number is zero-one-seven-two."
        },
        {
          "phrase": "Es freut mich sehr, Sie kennenzulernen.",
          "meaning": "I am very pleased to meet you."
        },
        {
          "phrase": "Wo wohnen Sie in Berlin? Ich wohne in Mitte.",
          "meaning": "Where do you live in Berlin? I live in Mitte."
        },
        {
          "phrase": "Ich spreche Englisch, Spanisch und ein bisschen Deutsch.",
          "meaning": "I speak English, Spanish and a little bit of German."
        },
        {
          "phrase": "Können Sie das bitte noch einmal wiederholen?",
          "meaning": "Could you please repeat that one more time?"
        },
        {
          "phrase": "Vielen Dank für Ihre Aufmerksamkeit und Geduld.",
          "meaning": "Thank you very much for your attention and patience."
        }
      ]
    },
    {
      "id": "de-4",
      "title": "Introduce Yourself in Slow German | Super Easy German 258",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "huwi-cjPPXU",
      "explanation": "Learn essential phrases for ordering food and drinks in a German restaurant.",
      "phrases": [
        {
          "phrase": "Guten Abend, haben Sie einen Tisch für zwei Personen?",
          "meaning": "Good evening, do you have a table for two people?"
        },
        {
          "phrase": "Ich möchte bitte die Speisekarte sehen.",
          "meaning": "Ich möchte bitte die Speisekarte sehen."
        },
        {
          "phrase": "Was können Sie heute empfehlen?",
          "meaning": "What can you recommend today?"
        },
        {
          "phrase": "Ich nehme ein Schnitzel mit Pommes und einen Salat.",
          "meaning": "I will have a schnitzel with fries and a salad."
        },
        {
          "phrase": "Und zu trinken ein großes Mineralwasser, bitte.",
          "meaning": "And to drink a large sparkling water, please."
        },
        {
          "phrase": "Guten Appetit! Das Essen sieht lecker aus.",
          "meaning": "Enjoy your meal! The food looks delicious."
        },
        {
          "phrase": "Entschuldigung, bringen Sie uns noch etwas Brot?",
          "meaning": "Excuse me, can you bring us some more bread?"
        },
        {
          "phrase": "Wir möchten gerne bezahlen, bitte.",
          "meaning": "We would like to pay, please."
        },
        {
          "phrase": "Zahlen Sie zusammen oder getrennt?",
          "meaning": "Are you paying together or separately?"
        },
        {
          "phrase": "Das macht fünfunddreißig Euro. Stimmt so!",
          "meaning": "That makes thirty-five euros. Keep the change!"
        }
      ]
    },
    {
      "id": "de-5",
      "title": "Introduce yourself in German (for absolute beginners) | Super Easy German (76)",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "Yaelm87PTvg",
      "explanation": "Essential vocabulary for greetings, saying goodbye, and simple small talk.",
      "phrases": [
        {
          "phrase": "Hallo, wie geht es dir heute?",
          "meaning": "Hello, how are you today?"
        },
        {
          "phrase": "Mir geht es sehr gut, danke! Und dir?",
          "meaning": "I'm doing very well, thank you! And you?"
        },
        {
          "phrase": "Es geht so, ich bin heute ein bisschen müde.",
          "meaning": "So-so, I'm a bit tired today."
        },
        {
          "phrase": "Schönes Wetter heute, nicht wahr?",
          "meaning": "Nice weather today, isn't it?"
        },
        {
          "phrase": "Ja, die Sonne scheint und es ist warm.",
          "meaning": "Yes, the sun is shining and it is warm."
        },
        {
          "phrase": "Was machst du am Wochenende?",
          "meaning": "What are you doing on the weekend?"
        },
        {
          "phrase": "Ich gehe mit meinen Freunden im Park spazieren.",
          "meaning": "I am going for a walk in the park with my friends."
        },
        {
          "phrase": "Viel Spaß dabei! Bis bald.",
          "meaning": "Have fun with that! See you soon."
        },
        {
          "phrase": "Tschüss! Einen schönen Tag noch.",
          "meaning": "Bye! Have a nice day."
        },
        {
          "phrase": "Auf Wiedersehen! Wir hören uns.",
          "meaning": "Goodbye! Talk to you soon."
        }
      ]
    },
    {
      "id": "de-6",
      "title": "LEARN GERMAN FOR BEGINNERS LESSONS 1-50 for FREE 😃😃😃",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "MOtqMNKs0Jw",
      "explanation": "Introduce yourself, your hobbies, profession, and origin in German.",
      "phrases": [
        {
          "phrase": "Darf ich mich vorstellen? Mein Name ist Thomas.",
          "meaning": "May I introduce myself? My name is Thomas."
        },
        {
          "phrase": "Ich bin dreißig Jahre alt und wohne in Hamburg.",
          "meaning": "I am thirty years old and live in Hamburg."
        },
        {
          "phrase": "Ich arbeite als Softwareentwickler bei einer IT-Firma.",
          "meaning": "I work as a software developer at an IT company."
        },
        {
          "phrase": "In meiner Freizeit spiele ich gerne Fußball.",
          "meaning": "In my free time, I like playing soccer."
        },
        {
          "phrase": "Ich lerne Deutsch, weil ich in Deutschland leben möchte.",
          "meaning": "I am learning German because I want to live in Germany."
        },
        {
          "phrase": "Meine Muttersprache ist Englisch, aber ich lerne schnell.",
          "meaning": "My mother tongue is English, but I learn quickly."
        },
        {
          "phrase": "Haben Sie Kinder? Nein, ich bin ledig.",
          "meaning": "Do you have children? No, I am single."
        },
        {
          "phrase": "Ich habe einen Hund und eine Katze zu Hause.",
          "meaning": "I have a dog and a cat at home."
        },
        {
          "phrase": "Das ist eine sehr schöne Stadt zum Leben.",
          "meaning": "This is a very beautiful city to live in."
        },
        {
          "phrase": "Freut mich sehr, Ihre Bekanntschaft zu machen.",
          "meaning": "Very pleased to make your acquaintance."
        }
      ]
    },
    {
      "id": "de-7",
      "title": "GERMAN LESSON 1: Learn German for Beginners - German Greetings 🤗",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "iB_sassbnOw",
      "explanation": "Learn standard present tense verb conjugations and pronouns.",
      "phrases": [
        {
          "phrase": "Ich lerne, du lernst, er lernt Deutsch.",
          "meaning": "I learn, you learn, he learns German."
        },
        {
          "phrase": "Wir sprechen über unsere täglichen Hobbys.",
          "meaning": "We talk about our daily hobbies."
        },
        {
          "phrase": "Ich habe einen Bruder und zwei Schwestern.",
          "meaning": "I have one brother and two sisters."
        },
        {
          "phrase": "Wo ist der Bahnhof? Ich habe mich verlaufen.",
          "meaning": "Where is the train station? I am lost."
        },
        {
          "phrase": "Gehen Sie geradeaus und dann die erste Straße links.",
          "meaning": "Go straight ahead and then the first street on the left."
        },
        {
          "phrase": "Gibt es hier in der Nähe eine Bank?",
          "meaning": "Is there a bank nearby?"
        },
        {
          "phrase": "Ich muss eine Fahrkarte am Automaten kaufen.",
          "meaning": "I have to buy a ticket at the ticket machine."
        },
        {
          "phrase": "Wie viel kostet ein Ticket nach Frankfurt?",
          "meaning": "How much does a ticket to Frankfurt cost?"
        },
        {
          "phrase": "Der Zug fährt um neun Uhr ab.",
          "meaning": "The train departs at nine o'clock."
        },
        {
          "phrase": "Gute Reise und kommen Sie gut an!",
          "meaning": "Have a good trip and arrive safely!"
        }
      ]
    },
    {
      "id": "de-8",
      "title": "\"Learn German A1 Fast! 🇩🇪 Easy Words & Fun Practice 🎯\"#germanforbeginners#learngermanfast #germana1",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "PZ14H_6unnc",
      "explanation": "Learn to describe your daily schedule from morning until night.",
      "phrases": [
        {
          "phrase": "Ich stehe jeden Morgen um sieben Uhr auf.",
          "meaning": "I get up every morning at seven o'clock."
        },
        {
          "phrase": "Zuerst trinke ich eine Tasse heißen Kaffee.",
          "meaning": "First, I drink a cup of hot coffee."
        },
        {
          "phrase": "Dann putze ich meine Zähne und dusche mich.",
          "meaning": "Then I brush my teeth and take a shower."
        },
        {
          "phrase": "Um acht Uhr fahre ich mit der U-Bahn zur Arbeit.",
          "meaning": "At eight o'clock, I take the subway to work."
        },
        {
          "phrase": "Ich arbeite von neun bis siebzehn Uhr.",
          "meaning": "I work from nine to five."
        },
        {
          "phrase": "In der Mittagspause esse ich meistens ein Sandwich.",
          "meaning": "During the lunch break, I usually eat a sandwich."
        },
        {
          "phrase": "Nach der Arbeit gehe ich im Supermarkt einkaufen.",
          "meaning": "After work, I go shopping at the supermarket."
        },
        {
          "phrase": "Ich koche das Abendessen für meine Familie.",
          "meaning": "I cook dinner for my family."
        },
        {
          "phrase": "Am Abend sehe ich ein bisschen fern oder lese.",
          "meaning": "In the evening, I watch a bit of TV or read."
        },
        {
          "phrase": "Normalerweise gehe ich um elf Uhr ins Bett.",
          "meaning": "Normally I go to bed at eleven o'clock."
        }
      ]
    },
    {
      "id": "de-9",
      "title": "Learn German Vocabulary - A1 Beginner German",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "l32T6xhuOug",
      "explanation": "Practical vocabulary for shopping at local fresh markets in Germany.",
      "phrases": [
        {
          "phrase": "Guten Morgen! Was kosten diese frischen Erdbeeren?",
          "meaning": "Good morning! How much are these fresh strawberries?"
        },
        {
          "phrase": "Die Erdbeeren kosten drei Euro pro Schale.",
          "meaning": "The strawberries cost three euros per bowl."
        },
        {
          "phrase": "Ich hätte gerne ein Kilo Äpfel und Bananen.",
          "meaning": "I would like a kilo of apples and bananas."
        },
        {
          "phrase": "Sind diese Tomaten aus biologischem Anbau?",
          "meaning": "Are these tomatoes organic?"
        },
        {
          "phrase": "Ja, das Gemüse kommt direkt aus der Region.",
          "meaning": "Yes, the vegetables come directly from the region."
        },
        {
          "phrase": "Geben Sie mir bitte auch ein halbes Pfund Käse.",
          "meaning": "Please also give me half a pound of cheese."
        },
        {
          "phrase": "Darf es sonst noch etwas sein? Nein, danke.",
          "meaning": "Would you like anything else? No, thank you."
        },
        {
          "phrase": "Das macht zusammen zwölf Euro fünfzig.",
          "meaning": "That makes twelve euros fifty in total."
        },
        {
          "phrase": "Kann ich mit Karte bezahlen? Ja, natürlich.",
          "meaning": "Can I pay by card? Yes, of course."
        },
        {
          "phrase": "Hier ist Ihr Kassenzettel. Schönen Tag noch!",
          "meaning": "Here is your receipt. Have a nice day!"
        }
      ]
    },
    {
      "id": "de-10",
      "title": "Learn German By Speaking - A1-A2 Sentences",
      "topic": "daily life",
      "level": "Intermediate",
      "youtubeId": "3-J47YNO4I0",
      "explanation": "Learn how compound words work in German and how to pronounce them easily.",
      "phrases": [
        {
          "phrase": "Die deutsche Sprache ist bekannt für lange Wörter.",
          "meaning": "The German language is known for long words."
        },
        {
          "phrase": "Ein Beispiel ist das Wort 'Fahrzeugvermietung'.",
          "meaning": "An example is the word 'vehicle rental'."
        },
        {
          "phrase": "Wir teilen lange Wörter in kleinere Teile auf.",
          "meaning": "We split long words into smaller parts."
        },
        {
          "phrase": "Sprechen Sie mir nach: 'Rechtsanwaltsfachangestellte'.",
          "meaning": "Repeat after me: 'legal assistant'."
        },
        {
          "phrase": "Die Betonung liegt meistens auf der ersten Silbe.",
          "meaning": "The accent is usually on the first syllable."
        },
        {
          "phrase": "Üben Sie die Aussprache langsam und deutlich.",
          "meaning": "Practice the pronunciation slowly and clearly."
        },
        {
          "phrase": "Das hilft Ihnen, Missverständnisse zu vermeiden.",
          "meaning": "That helps you avoid misunderstandings."
        },
        {
          "phrase": "Hören Sie aufmerksam auf den Rhythmus der Sätze.",
          "meaning": "Listen carefully to the rhythm of the sentences."
        },
        {
          "phrase": "Sie machen jeden Tag sichtbare Fortschritte beim Lernen.",
          "meaning": "You make visible progress in learning every day."
        },
        {
          "phrase": "Bleiben Sie motiviert, Deutsch lernen macht Spaß!",
          "meaning": "Stay motivated, learning German is fun!"
        }
      ]
    }
  ],
  "it": [
    {
      "id": "it-1",
      "title": "0. Learn Italian Beginners (A1): Top 20 Italian phrases for beginners",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "EN3BLMPVAT4",
      "explanation": "Master common greetings, polite phrases, and daily introductory vocabulary in Italian.",
      "phrases": [
        {
          "phrase": "Buongiorno! Come sta? Io sto molto bene.",
          "meaning": "Good morning! How are you? I am very well."
        },
        {
          "phrase": "Mi chiamo Alessandro e sono italiano.",
          "meaning": "My name is Alessandro and I am Italian."
        },
        {
          "phrase": "Piacere di conoscerti! Di dove sei?",
          "meaning": "Nice to meet you! Where are you from?"
        },
        {
          "phrase": "Sono di Boston, negli Stati Uniti.",
          "meaning": "I am from Boston, in the United States."
        },
        {
          "phrase": "Parli italiano? Sì, ma solo un po'.",
          "meaning": "Do you speak Italian? Yes, but only a little."
        },
        {
          "phrase": "Grazie mille per l'aiuto. Prego!",
          "meaning": "Thank you very much for the help. You're welcome!"
        },
        {
          "phrase": "Scusa, dov'è il bagno per favore?",
          "meaning": "Excuse me, where is the bathroom please?"
        },
        {
          "phrase": "Ci vediamo presto! Buona giornata!",
          "meaning": "See you soon! Have a nice day!"
        },
        {
          "phrase": "Arrivederci! A domani mattina!",
          "meaning": "Goodbye! See you tomorrow morning!"
        },
        {
          "phrase": "Ciao! Come ti chiami?",
          "meaning": "Hi! What is your name?"
        }
      ]
    },
    {
      "id": "it-2",
      "title": "1. Learn Italian Beginners (A1): Masculine and feminine",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "b1ATPvE00N8",
      "explanation": "Learn standard greetings and how to introduce yourself to locals in Italy.",
      "phrases": [
        {
          "phrase": "Salve! Vorrei introdurre la mia amica Sofia.",
          "meaning": "Hello! I would like to introduce my friend Sofia."
        },
        {
          "phrase": "Quanti anni hai? Io ho venticinque anni.",
          "meaning": "How old are you? I am twenty-five years old."
        },
        {
          "phrase": "Che lavoro fai? Sono uno studente.",
          "meaning": "What job do you do? I am a student."
        },
        {
          "phrase": "Lavoro in un ufficio nel centro della città.",
          "meaning": "I work in an office in the city center."
        },
        {
          "phrase": "Abito in un piccolo appartamento a Roma.",
          "meaning": "I live in a small apartment in Rome."
        },
        {
          "phrase": "Questo è il mio primo viaggio in Italia.",
          "meaning": "This is my first trip to Italy."
        },
        {
          "phrase": "L'Italia è un paese bellissimo e affascinante.",
          "meaning": "Italy is a beautiful and fascinating country."
        },
        {
          "phrase": "Mi piace molto la cultura e l'arte italiana.",
          "meaning": "I really like Italian culture and art."
        },
        {
          "phrase": "Stasera vado a cena con i miei amici.",
          "meaning": "Tonight I am going to dinner with my friends."
        },
        {
          "phrase": "Buon divertimento e buon appetito!",
          "meaning": "Have fun and enjoy your meal!"
        }
      ]
    },
    {
      "id": "it-3",
      "title": "Italian for beginners A1.How to greet and goodbye in italian",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "PufgM-u8_pU",
      "explanation": "Master spelling, double consonants, and the unique sounds of Italian vowels.",
      "phrases": [
        {
          "phrase": "L'alfabeto italiano ha ventuno lettere.",
          "meaning": "The Italian alphabet has twenty-one letters."
        },
        {
          "phrase": "Ci sono cinque vocali: A, E, I, O, U.",
          "meaning": "There are five vowels: A, E, I, O, U."
        },
        {
          "phrase": "Le lettere straniere come K, W, Y sono usate poco.",
          "meaning": "Foreign letters like K, W, Y are rarely used."
        },
        {
          "phrase": "La lettera 'C' si pronuncia dolce o dura.",
          "meaning": "The letter 'C' is pronounced soft or hard."
        },
        {
          "phrase": "Davanti a 'E' e 'I', la 'C' suona come 'ciao'.",
          "meaning": "Before 'E' and 'I', the 'C' sounds like 'ciao'."
        },
        {
          "phrase": "Come si scrive la parola 'famiglia'?",
          "meaning": "How do you spell the word 'famiglia'?"
        },
        {
          "phrase": "Si scrive con il gruppo di lettere G-L-I.",
          "meaning": "It is written with the letter group G-L-I."
        },
        {
          "phrase": "Le doppie consonanti si pronunciano con forza.",
          "meaning": "Double consonants are pronounced with force."
        },
        {
          "phrase": "Ascolta bene e ripeti dopo di me.",
          "meaning": "Listen carefully and repeat after me."
        },
        {
          "phrase": "La pratica quotidiana è la chiave del successo.",
          "meaning": "Daily practice is the key to success."
        }
      ]
    },
    {
      "id": "it-4",
      "title": "Italian for beginners A1: Lesson 2:  How are you? Come stai?",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "eJgTlh7aPx0",
      "explanation": "Navigate through Italian streets with confidence using these direction-oriented phrases.",
      "phrases": [
        {
          "phrase": "Scusi signore, per andare alla stazione centrale?",
          "meaning": "Excuse me sir, to go to the central station?"
        },
        {
          "phrase": "Deve andare dritto e poi girare a destra.",
          "meaning": "You must go straight and then turn right."
        },
        {
          "phrase": "Il Colosseo è lontano da qui?",
          "meaning": "Is the Colosseum far from here?"
        },
        {
          "phrase": "No, sono solo dieci minuti a piedi.",
          "meaning": "No, it's only ten minutes on foot."
        },
        {
          "phrase": "Dov'è la fermata dell'autobus più vicina?",
          "meaning": "Where is the nearest bus stop?"
        },
        {
          "phrase": "La fermata è proprio dietro l'angolo.",
          "meaning": "The stop is just around the corner."
        },
        {
          "phrase": "Posso comprare i biglietti a bordo?",
          "meaning": "Can I buy the tickets on board?"
        },
        {
          "phrase": "No, deve comprarli in tabaccheria.",
          "meaning": "No, you must buy them in a tobacco shop."
        },
        {
          "phrase": "Grazie mille per la sua gentilezza.",
          "meaning": "Thank you very much for your kindness."
        },
        {
          "phrase": "Prego, buon viaggio e buona permanenza!",
          "meaning": "You're welcome, have a good trip and a good stay!"
        }
      ]
    },
    {
      "id": "it-5",
      "title": "Learn Italian | Useful Beginner Phrases (A1-A2)📚🇮🇹",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "Ei4c8UX6zDE",
      "explanation": "Comprehensive overview of essential Italian verbs, conjugations and pronoun use.",
      "phrases": [
        {
          "phrase": "Io ho, tu hai, lui ha una bella casa.",
          "meaning": "I have, you have, he has a beautiful house."
        },
        {
          "phrase": "Io sono, tu sei, noi siamo pronti.",
          "meaning": "I am, you are, we are ready."
        },
        {
          "phrase": "Oggi facciamo una lezione di grammatica.",
          "meaning": "Today we are doing a grammar lesson."
        },
        {
          "phrase": "Mi piace molto studiare le lingue straniere.",
          "meaning": "I really like studying foreign languages."
        },
        {
          "phrase": "Vuoi bere qualcosa al bar con me?",
          "meaning": "Do you want to drink something at the bar with me?"
        },
        {
          "phrase": "Prendo un cappuccino e un cornetto.",
          "meaning": "I will have a cappuccino and a croissant."
        },
        {
          "phrase": "Quanto costa questo gelato alla fragola?",
          "meaning": "How much does this strawberry ice cream cost?"
        },
        {
          "phrase": "Costa tre euro e cinquanta centesimi.",
          "meaning": "It costs three euros and fifty cents."
        },
        {
          "phrase": "Posso pagare con la carta di credito?",
          "meaning": "Can I pay by credit card?"
        },
        {
          "phrase": "Sì, accettiamo tutte le carte principali.",
          "meaning": "Yes, we accept all major cards."
        }
      ]
    },
    {
      "id": "it-6",
      "title": "Basic Italian Words | Simple way of Learning Italian | Learn Italian Easy Way  #learningitalian",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "enq0mNB9cfU",
      "explanation": "Learn useful expressions for check-in at hotels and booking rooms.",
      "phrases": [
        {
          "phrase": "Ho una prenotazione a nome di Smith.",
          "meaning": "I have a reservation under the name of Smith."
        },
        {
          "phrase": "Può mostrarmi il suo passaporto, per favore?",
          "meaning": "Can you show me your passport, please?"
        },
        {
          "phrase": "La colazione è inclusa nel prezzo della camera?",
          "meaning": "Is breakfast included in the room price?"
        },
        {
          "phrase": "Sì, la colazione viene servita dalle sette alle dieci.",
          "meaning": "Yes, breakfast is served from seven to ten."
        },
        {
          "phrase": "A che ora dobbiamo fare il check-out?",
          "meaning": "What time do we have to check out?"
        },
        {
          "phrase": "Il check-out deve essere fatto entro mezzogiorno.",
          "meaning": "Check-out must be done by noon."
        },
        {
          "phrase": "La chiave della mia camera non funziona.",
          "meaning": "My room key is not working."
        },
        {
          "phrase": "Ci scusi, provvediamo subito a cambiarla.",
          "meaning": "Excuse us, we will change it immediately."
        },
        {
          "phrase": "Potete custodire i miei bagagli per oggi?",
          "meaning": "Can you watch my luggage for today?"
        },
        {
          "phrase": "Certamente, può lasciarli nella nostra reception.",
          "meaning": "Certainly, you can leave them at our reception."
        }
      ]
    },
    {
      "id": "it-7",
      "title": "Learn Italian Easily",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "NNl1Wbyvj10",
      "explanation": "Absolute beginner vocabulary for common household items, foods, and colors.",
      "phrases": [
        {
          "phrase": "Questo tavolo è fatto di legno scuro.",
          "meaning": "This table is made of dark wood."
        },
        {
          "phrase": "La mela rossa è sul tavolo in cucina.",
          "meaning": "The red apple is on the table in the kitchen."
        },
        {
          "phrase": "Mi piacciono molto i colori caldi dell'autunno.",
          "meaning": "I really like the warm colors of autumn."
        },
        {
          "phrase": "La mia camicia preferita è azzurra.",
          "meaning": "My favorite shirt is light blue."
        },
        {
          "phrase": "Hai una penna per scrivere questo indirizzo?",
          "meaning": "Do you have a pen to write this address?"
        },
        {
          "phrase": "Sì, ecco una penna nera sul quaderno.",
          "meaning": "Yes, here is a black pen on the notebook."
        },
        {
          "phrase": "La sedia è accanto alla finestra aperta.",
          "meaning": "The chair is next to the open window."
        },
        {
          "phrase": "Fa freddo stasera, chiudi la porta per favore.",
          "meaning": "It is cold tonight, close the door please."
        },
        {
          "phrase": "Hai visto le mie chiavi di casa?",
          "meaning": "Have you seen my house keys?"
        },
        {
          "phrase": "Sono sopra la credenza in corridoio.",
          "meaning": "They are on top of the sideboard in the hallway."
        }
      ]
    },
    {
      "id": "it-8",
      "title": "Learn Italian  Through Story  (A1) #languages #italianlanguage#italia #learnitalian #italy",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "lkz9lL2Lf2I",
      "explanation": "Fast-paced conversation and phrases for ordering food at a traditional trattoria.",
      "phrases": [
        {
          "phrase": "Cosa desidera ordinare come primo piatto?",
          "meaning": "What would you like to order as a first course?"
        },
        {
          "phrase": "Prendo gli spaghetti alla carbonara, grazie.",
          "meaning": "I'll have the spaghetti carbonara, thank you."
        },
        {
          "phrase": "E per secondo piatto cosa mi consiglia?",
          "meaning": "And for the second course, what do you recommend?"
        },
        {
          "phrase": "La bistecca alla fiorentina è ottima oggi.",
          "meaning": "The Florentine steak is excellent today."
        },
        {
          "phrase": "Va bene, allora prendo quella con le patate.",
          "meaning": "Alright, then I will have that with potatoes."
        },
        {
          "phrase": "Cosa volete da bere? Una bottiglia di vino rosso.",
          "meaning": "What would you like to drink? A bottle of red wine."
        },
        {
          "phrase": "Acqua frizzante o naturale? Frizzante, grazie.",
          "meaning": "Sparkling or still water? Sparkling, thank you."
        },
        {
          "phrase": "Cameriere, il conto per favore quando ha tempo.",
          "meaning": "Waiter, the bill please when you have time."
        },
        {
          "phrase": "Ecco il conto. Il servizio è incluso.",
          "meaning": "Here is the bill. Service is included."
        },
        {
          "phrase": "La cena era deliziosa, complimenti allo chef!",
          "meaning": "La cena era deliziosa, complimenti allo chef!"
        }
      ]
    },
    {
      "id": "it-9",
      "title": "LEARN ITALIAN PT.1",
      "topic": "humor",
      "level": "Intermediate",
      "youtubeId": "QYQcWq9qWdk",
      "explanation": "Fun and common idiomatic expressions used by native Italian speakers.",
      "phrases": [
        {
          "phrase": "In bocca al lupo per l'esame domani! Crepi!",
          "meaning": "Good luck for the exam tomorrow! Thanks (literally: may the wolf die)!"
        },
        {
          "phrase": "Quella persona parla sempre a vanvera.",
          "meaning": "That person always talks nonsense."
        },
        {
          "phrase": "Non vedo l'ora di andare in vacanza!",
          "meaning": "I can't wait to go on vacation!"
        },
        {
          "phrase": "Prendere due piccioni con una fava.",
          "meaning": "Kill two birds with one stone (literally: catch two pigeons with one broad bean)."
        },
        {
          "phrase": "Acqua in bocca! Non dirlo a nessuno.",
          "meaning": "Keep it a secret! Don't tell anyone (literally: water in the mouth)."
        },
        {
          "phrase": "Non avere peli sulla lingua.",
          "meaning": "Speak your mind directly (literally: to have no hairs on the tongue)."
        },
        {
          "phrase": "Costare un occhio della testa.",
          "meaning": "Cost an arm and a leg (literally: cost an eye of the head)."
        },
        {
          "phrase": "Avere le mani in pasta.",
          "meaning": "Be involved in everything (literally: to have hands in the dough)."
        },
        {
          "phrase": "Tutto fa brodo! Ogni aiuto è utile.",
          "meaning": "Everything helps! Every bit of help is useful (literally: everything makes broth)."
        },
        {
          "phrase": "Essere al settimo cielo per la felicità.",
          "meaning": "Be in seventh heaven with happiness."
        }
      ]
    },
    {
      "id": "it-10",
      "title": "Beginner Italian Course Lesson 1 - The basics of learning Italian the right way",
      "topic": "news",
      "level": "Advanced",
      "youtubeId": "EG9x0eevbV4",
      "explanation": "Learn about regional variations, dialects, and the history of modern Italian.",
      "phrases": [
        {
          "phrase": "L'italiano moderno deriva dal dialetto toscano letterario.",
          "meaning": "Modern Italian derives from the literary Tuscan dialect."
        },
        {
          "phrase": "Ogni regione d'Italia ha il proprio dialetto locale.",
          "meaning": "Every region of Italy has its own local dialect."
        },
        {
          "phrase": "L'accento romano è molto diverso da quello milanese.",
          "meaning": "The Roman accent is very different from the Milanese one."
        },
        {
          "phrase": "Molte persone anziane parlano ancora il dialetto a casa.",
          "meaning": "Many elderly people still speak dialect at home."
        },
        {
          "phrase": "Il napoletano è riconosciuto come lingua a tutti gli effetti.",
          "meaning": "Neapolitan is recognized as a language in its own right."
        },
        {
          "phrase": "La pronuncia cambia molto tra nord e sud Italia.",
          "meaning": "The pronunciation changes a lot between northern and southern Italy."
        },
        {
          "phrase": "Questo rende lo studio dell'italiano ancora più interessante.",
          "meaning": "This makes the study of Italian even more interesting."
        },
        {
          "phrase": "Riesci a capire la differenza tra gli accenti?",
          "meaning": "Can you understand the difference between the accents?"
        },
        {
          "phrase": "Sì, ma richiede molto esercizio di ascolto.",
          "meaning": "Yes, but it requires a lot of listening practice."
        },
        {
          "phrase": "La diversità linguistica è una grande ricchezza culturale.",
          "meaning": "Linguistic diversity is a great cultural wealth."
        }
      ]
    }
  ],
  "en": [
    {
      "id": "en-1",
      "title": "Learn English Conversation for Beginners - Basic English Conversation Practice",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "oWjmNy9pmf8",
      "explanation": "Master daily greetings, introductions, and how to start a conversation in English.",
      "phrases": [
        {
          "phrase": "Hello, how are you doing today? I am fine, thanks.",
          "meaning": "Hello, how are you doing today? I am fine, thanks."
        },
        {
          "phrase": "What is your name? My name is David.",
          "meaning": "What is your name? My name is David."
        },
        {
          "phrase": "Where do you live? I live in New York City.",
          "meaning": "Where do you live? I live in New York City."
        },
        {
          "phrase": "Nice to meet you! Nice to meet you too.",
          "meaning": "Nice to meet you! Nice to meet you too."
        },
        {
          "phrase": "Do you work or study? I work at a bank.",
          "meaning": "Do you work or study? I work at a bank."
        },
        {
          "phrase": "What do you like to do in your free time?",
          "meaning": "What do you like to do in your free time?"
        },
        {
          "phrase": "I enjoy reading books and playing tennis on weekends.",
          "meaning": "I enjoy reading books and playing tennis on weekends."
        },
        {
          "phrase": "Could you help me with this task, please?",
          "meaning": "Could you help me with this task, please?"
        },
        {
          "phrase": "Thank you so much. You are welcome!",
          "meaning": "Thank you so much. You are welcome!"
        },
        {
          "phrase": "Have a great day! Goodbye!",
          "meaning": "Have a great day! Goodbye!"
        }
      ]
    },
    {
      "id": "en-2",
      "title": "How to introduce yourself: Easy English Conversations 💬 Episode 1",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "I_tRSrPru94",
      "explanation": "Basic English grammar covering standard present simple tense, pronouns, and verb configurations.",
      "phrases": [
        {
          "phrase": "I write, you write, he writes an email daily.",
          "meaning": "I write, you write, he writes an email daily."
        },
        {
          "phrase": "We are studying English grammar in the classroom.",
          "meaning": "We are studying English grammar in the classroom."
        },
        {
          "phrase": "She has a dog, but he has a cat.",
          "meaning": "She has a dog, but he has a cat."
        },
        {
          "phrase": "They do not know the answer to this question.",
          "meaning": "They do not know the answer to this question."
        },
        {
          "phrase": "Does she speak English fluently? Yes, she does.",
          "meaning": "Does she speak English fluently? Yes, she does."
        },
        {
          "phrase": "Where did you go for your last summer vacation?",
          "meaning": "Where did you go for your last summer vacation?"
        },
        {
          "phrase": "We went to Paris and saw the Eiffel Tower.",
          "meaning": "We went to Paris and saw the Eiffel Tower."
        },
        {
          "phrase": "I will call you as soon as I arrive home.",
          "meaning": "I will call you as soon as I arrive home."
        },
        {
          "phrase": "This book belongs to me, but that one is yours.",
          "meaning": "This book belongs to me, but that one is yours."
        },
        {
          "phrase": "Please pay attention to the grammar rules.",
          "meaning": "Please pay attention to the grammar rules."
        }
      ]
    },
    {
      "id": "en-3",
      "title": "THE BEST ENGLISH CONVERSATION FOR BEGINNERS || ENGLISH FOR BEGINNERS",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "FwdrPXQf4nI",
      "explanation": "Improve your listening skills with these slow and clear everyday phrases.",
      "phrases": [
        {
          "phrase": "It is a beautiful morning, let's go for a walk.",
          "meaning": "It is a beautiful morning, let's go for a walk."
        },
        {
          "phrase": "What would you like to have for breakfast?",
          "meaning": "What would you like to have for breakfast?"
        },
        {
          "phrase": "I would like to have eggs and toast, please.",
          "meaning": "I would like to have eggs and toast, please."
        },
        {
          "phrase": "Are you ready to leave for the train station?",
          "meaning": "Are you ready to leave for the train station?"
        },
        {
          "phrase": "Yes, let me grab my keys and my wallet first.",
          "meaning": "Yes, let me grab my keys and my wallet first."
        },
        {
          "phrase": "The traffic is very heavy this morning.",
          "meaning": "The traffic is very heavy this morning."
        },
        {
          "phrase": "We might arrive a few minutes late to work.",
          "meaning": "We might arrive a few minutes late to work."
        },
        {
          "phrase": "Don't worry, the meeting doesn't start until ten.",
          "meaning": "Don't worry, the meeting doesn't start until ten."
        },
        {
          "phrase": "That is a relief, thank you for letting me know.",
          "meaning": "That is a relief, thank you for letting me know."
        },
        {
          "phrase": "You're welcome! Let's get going now.",
          "meaning": "You're welcome! Let's get going now."
        }
      ]
    },
    {
      "id": "en-4",
      "title": "Everyday English Conversation Practice | 30 Minutes English Listening",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "henIVlCPVIY",
      "explanation": "Essential phrases for dining out, ordering food, and paying the bill in English.",
      "phrases": [
        {
          "phrase": "Could we get a table for four, please?",
          "meaning": "Could we get a table for four, please?"
        },
        {
          "phrase": "Are you ready to order, or do you need time?",
          "meaning": "Are you ready to order, or do you need time?"
        },
        {
          "phrase": "We need a few more minutes to decide, thank you.",
          "meaning": "We need a few more minutes to decide, thank you."
        },
        {
          "phrase": "I would like to order the grilled chicken sandwich.",
          "meaning": "I would like to order the grilled chicken sandwich."
        },
        {
          "phrase": "What side dishes come with this main course?",
          "meaning": "What side dishes come with this main course?"
        },
        {
          "phrase": "It comes with a choice of soup or fries.",
          "meaning": "It comes with a choice of soup or fries."
        },
        {
          "phrase": "I will go with the soup, please.",
          "meaning": "I will go with the soup, please."
        },
        {
          "phrase": "Could you bring us some water for the table?",
          "meaning": "Could you bring us some water for the table?"
        },
        {
          "phrase": "Can we have the bill when you have a moment?",
          "meaning": "Can we have the bill when you have a moment?"
        },
        {
          "phrase": "We would like to pay with card, please.",
          "meaning": "We would like to pay with card, please."
        }
      ]
    },
    {
      "id": "en-5",
      "title": "50 Simple English Conversations for Beginners: Real English Dialogues (A1-A2)",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "XSxZGrBn0Vo",
      "explanation": "Learn how to ask directions, locate landmarks, and navigate cities in English.",
      "phrases": [
        {
          "phrase": "Excuse me, do you know where the nearest subway is?",
          "meaning": "Excuse me, do you know where the nearest subway is?"
        },
        {
          "phrase": "Go down this street and turn right at the corner.",
          "meaning": "Go down this street and turn right at the corner."
        },
        {
          "phrase": "How long does it take to walk to the museum?",
          "meaning": "How long does it take to walk to the museum?"
        },
        {
          "phrase": "It is about a fifteen-minute walk from here.",
          "meaning": "It is about a fifteen-minute walk from here."
        },
        {
          "phrase": "Is there a grocery store around here?",
          "meaning": "Is there a grocery store around here?"
        },
        {
          "phrase": "Yes, there is one just across the street.",
          "meaning": "Yes, there is one just across the street."
        },
        {
          "phrase": "Can you show me where it is on this map?",
          "meaning": "Can you show me where it is on this map?"
        },
        {
          "phrase": "Sure, it is located right next to the park.",
          "meaning": "Sure, it is located right next to the park."
        },
        {
          "phrase": "Thank you so much for your help! No problem.",
          "meaning": "Thank you so much for your help! No problem."
        },
        {
          "phrase": "Have a safe trip and enjoy your day!",
          "meaning": "Have a safe trip and enjoy your day!"
        }
      ]
    },
    {
      "id": "en-6",
      "title": "Learning English Podcast for Beginners | A1 English Listening Practice",
      "topic": "travel",
      "level": "Intermediate",
      "youtubeId": "s2EYIDY8wSM",
      "explanation": "Learn vocabulary for bargaining, shopping, and asking for prices in English markets.",
      "phrases": [
        {
          "phrase": "How much is this handmade leather bag?",
          "meaning": "How much is this handmade leather bag?"
        },
        {
          "phrase": "It is fifty dollars, but I can do forty-five.",
          "meaning": "It is fifty dollars, but I can do forty-five."
        },
        {
          "phrase": "Do you have this t-shirt in a larger size?",
          "meaning": "Do you have this t-shirt in a larger size?"
        },
        {
          "phrase": "Let me check in the back room for you.",
          "meaning": "Let me check in the back room for you."
        },
        {
          "phrase": "I am sorry, we only have it in small and medium.",
          "meaning": "I am sorry, we only have it in small and medium."
        },
        {
          "phrase": "That's fine, I will buy the medium one then.",
          "meaning": "That's fine, I will buy the medium one then."
        },
        {
          "phrase": "Do you offer any discounts if I buy two?",
          "meaning": "Do you offer any discounts if I buy two?"
        },
        {
          "phrase": "Yes, I can give you a ten percent discount.",
          "meaning": "Yes, I can give you a ten percent discount."
        },
        {
          "phrase": "Great, I will take both of them, thank you.",
          "meaning": "Great, I will take both of them, thank you."
        },
        {
          "phrase": "Here is your receipt and your change. Have fun!",
          "meaning": "Here is your receipt and your change. Have fun!"
        }
      ]
    },
    {
      "id": "en-7",
      "title": "👉English Speaking Practice | Daily Conversation for Beginners",
      "topic": "news",
      "level": "Intermediate",
      "youtubeId": "Xzoz_mCrVAU",
      "explanation": "Master common business jargon, expressions, and phrases for office meetings in English.",
      "phrases": [
        {
          "phrase": "Let's kick off the meeting by reviewing the agenda.",
          "meaning": "Let's kick off the meeting by reviewing the agenda."
        },
        {
          "phrase": "We need to focus on increasing our monthly sales.",
          "meaning": "We need to focus on increasing our monthly sales."
        },
        {
          "phrase": "Could you give us an update on the project status?",
          "meaning": "Could you give us an update on the project status?"
        },
        {
          "phrase": "The design is complete and testing begins next week.",
          "meaning": "The design is complete and testing begins next week."
        },
        {
          "phrase": "We need to stay within the budget for this launch.",
          "meaning": "We need to stay within the budget for this launch."
        },
        {
          "phrase": "Who is responsible for coordinating the marketing campaign?",
          "meaning": "Who is responsible for coordinating the marketing campaign?"
        },
        {
          "phrase": "Sarah will handle the advertising and social media promotion.",
          "meaning": "Sarah will handle the advertising and social media promotion."
        },
        {
          "phrase": "Let's wrap up this discussion and schedule a follow-up.",
          "meaning": "Let's wrap up this discussion and schedule a follow-up."
        },
        {
          "phrase": "Thank you all for your valuable input today.",
          "meaning": "Thank you all for your valuable input today."
        },
        {
          "phrase": "I will send out the meeting minutes shortly.",
          "meaning": "I will send out the meeting minutes shortly."
        }
      ]
    },
    {
      "id": "en-8",
      "title": "Describing your home: Easy English Conversations Episode 20",
      "topic": "humor",
      "level": "Intermediate",
      "youtubeId": "Te-UyphkKRk",
      "explanation": "Learn standard American slang terms, idioms, and expressions used in casual conversations.",
      "phrases": [
        {
          "phrase": "Hey guys, what's up? Not much, just hanging out.",
          "meaning": "Hey guys, what's up? Not much, just hanging out."
        },
        {
          "phrase": "That movie last night was so cool!",
          "meaning": "That movie last night was so cool!"
        },
        {
          "phrase": "I have to hit the books tonight for my exam.",
          "meaning": "I have to hit the books tonight for my exam."
        },
        {
          "phrase": "Can you lend me a hand with these heavy boxes?",
          "meaning": "Can you lend me a hand with these heavy boxes?"
        },
        {
          "phrase": "Sure thing, I'll be there in a second.",
          "meaning": "Sure thing, I'll be there in a second."
        },
        {
          "phrase": "I am feeling a bit under the weather today.",
          "meaning": "I am feeling a bit under the weather today."
        },
        {
          "phrase": "You should get some rest and take it easy.",
          "meaning": "You should get some rest and take it easy."
        },
        {
          "phrase": "This project is a piece of cake, don't worry.",
          "meaning": "This project is a piece of cake, don't worry."
        },
        {
          "phrase": "That dinner was great, but it cost an arm and a leg.",
          "meaning": "That dinner was great, but it cost an arm and a leg."
        },
        {
          "phrase": "Let's call it a day and go home now.",
          "meaning": "Let's call it a day and go home now."
        }
      ]
    },
    {
      "id": "en-9",
      "title": "Talking about clothes shopping: Easy English Conversations Episode 19",
      "topic": "drama",
      "level": "Advanced",
      "youtubeId": "2mnL9jPVzsk",
      "explanation": "Learn how to express complex thoughts, opinions, and emotions in conversational English.",
      "phrases": [
        {
          "phrase": "I am absolutely thrilled about the new job offer.",
          "meaning": "I am absolutely thrilled about the new job offer."
        },
        {
          "phrase": "It is completely normal to feel nervous before a speech.",
          "meaning": "It is completely normal to feel nervous before a speech."
        },
        {
          "phrase": "I was quite disappointed by the final results.",
          "meaning": "I was quite disappointed by the final results."
        },
        {
          "phrase": "What is your honest opinion on this controversial matter?",
          "meaning": "What is your honest opinion on this controversial matter?"
        },
        {
          "phrase": "To be honest, I think we need more information.",
          "meaning": "To be honest, I think we need more information."
        },
        {
          "phrase": "I strongly disagree with the proposed decision.",
          "meaning": "I strongly disagree with the proposed decision."
        },
        {
          "phrase": "We must find a common ground to move forward.",
          "meaning": "We must find a common ground to move forward."
        },
        {
          "phrase": "I really appreciate your support during this difficult time.",
          "meaning": "I really appreciate your support during this difficult time."
        },
        {
          "phrase": "It means a lot to me that you came today.",
          "meaning": "It means a lot to me that you came today."
        },
        {
          "phrase": "Let's stay positive and hope for the best outcome.",
          "meaning": "Let's stay positive and hope for the best outcome."
        }
      ]
    },
    {
      "id": "en-10",
      "title": "Learn English Conversation through Oxford English video - Beginner Levels",
      "topic": "daily life",
      "level": "Intermediate",
      "youtubeId": "Uat46hipx48",
      "explanation": "Master sentence stress, intonation, and linking words together in American English.",
      "phrases": [
        {
          "phrase": "English is a stress-timed language with a distinct rhythm.",
          "meaning": "English is a stress-timed language with a distinct rhythm."
        },
        {
          "phrase": "Content words are stressed while function words are unstressed.",
          "meaning": "Content words are stressed while function words are unstressed."
        },
        {
          "phrase": "Link words together to sound more natural when speaking.",
          "meaning": "Link words together to sound more natural when speaking."
        },
        {
          "phrase": "The sound of 'T' often changes in fast speech.",
          "meaning": "The sound of 'T' often changes in fast speech."
        },
        {
          "phrase": "Listen to how the voice rises and falls at endings.",
          "meaning": "Listen to how the voice rises and falls at endings."
        },
        {
          "phrase": "Repeat after me: 'What do you want to do?'",
          "meaning": "Repeat after me: 'What do you want to do?'"
        },
        {
          "phrase": "It sounds like 'Whaddya wanna do?' in casual speech.",
          "meaning": "It sounds like 'Whaddya wanna do?' in casual speech."
        },
        {
          "phrase": "Practice shadowing native speakers to improve your flow.",
          "meaning": "Practice shadowing native speakers to improve your flow."
        },
        {
          "phrase": "Record your voice and compare it to the native clip.",
          "meaning": "Record your voice and compare it to the native clip."
        },
        {
          "phrase": "With consistent practice, you will speak English fluently.",
          "meaning": "With consistent practice, you will speak English fluently."
        }
      ]
    }
  ],
  "ar": [
    {
      "id": "ar-1",
      "title": "Memorize the ARABIC ALPHABET in 7 Minutes (Really)",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "NYQU0_KgWD8",
      "explanation": "Learn basic greetings and simple responses in Modern Standard Arabic.",
      "phrases": [
        {
          "phrase": "مرحباً! كيف حالك؟",
          "pinyin": "Marhaban! Kayfa haluka?",
          "meaning": "Hello! How are you?"
        },
        {
          "phrase": "أنا بخير، شكراً لك.",
          "pinyin": "Ana bikhayr, shukran laka.",
          "meaning": "I am fine, thank you."
        },
        {
          "phrase": "ما اسمك؟ اسمي أحمد.",
          "pinyin": "Ma ismuka? Ismee Ahmad.",
          "meaning": "What is your name? My name is Ahmad."
        },
        {
          "phrase": "من أين أنت؟",
          "pinyin": "Min ayna anta?",
          "meaning": "Where are you from?"
        },
        {
          "phrase": "أنا من كندا.",
          "pinyin": "Ana min Canada.",
          "meaning": "I am from Canada."
        },
        {
          "phrase": "تشرفنا بمعرفتك!",
          "pinyin": "Tasharrafna bi-ma'rifatika!",
          "meaning": "Nice to meet you!"
        },
        {
          "phrase": "أهلاً وسهلاً بك في دبي.",
          "pinyin": "Ahlan wa sahlan bika fee Dubai.",
          "meaning": "Welcome to Dubai."
        },
        {
          "phrase": "هل تتحدث اللغة العربية؟",
          "pinyin": "Hal tatahaddathu al-lugha al-Arabiyya?",
          "meaning": "Do you speak Arabic?"
        },
        {
          "phrase": "نعم، قليلاً فقط.",
          "pinyin": "Na'am, qaleelan faqat.",
          "meaning": "Yes, only a little."
        },
        {
          "phrase": "مع السلامة! أراك لاحقاً.",
          "pinyin": "Ma'a as-salama! Araka lahiqan.",
          "meaning": "Goodbye! See you later."
        }
      ]
    },
    {
      "id": "ar-2",
      "title": "Arabic Alphabet: Listen and Repeat.",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "fJ9_79bg5H4",
      "explanation": "Polite expressions, thanking others, and making simple requests in Arabic.",
      "phrases": [
        {
          "phrase": "من فضلك، أين المحطة؟",
          "pinyin": "Min fadlika, ayna al-mahatta?",
          "meaning": "Excuse me, where is the station?"
        },
        {
          "phrase": "شكراً جزيلاً على المساعدة.",
          "pinyin": "Shukran jazeelan 'ala al-musa'ada.",
          "meaning": "Thank you very much for the help."
        },
        {
          "phrase": "لا شكر على واجب.",
          "pinyin": "La shukra 'ala wajib.",
          "meaning": "You're welcome (no thanks for duty)."
        },
        {
          "phrase": "صباح الخير! صباح النور.",
          "pinyin": "Sabah al-khayr! Sabah an-noor.",
          "meaning": "Good morning! (Response: Morning of light)."
        },
        {
          "phrase": "مساء الخير! مساء النور.",
          "pinyin": "Masa' al-khayr! Masa' an-noor.",
          "meaning": "Good evening! (Response: Evening of light)."
        },
        {
          "phrase": "تصبح على خير.",
          "pinyin": "Tusbih 'ala khayr.",
          "meaning": "Good night (may you wake up in goodness)."
        },
        {
          "phrase": "أنا آسف جداً على التأخير.",
          "pinyin": "Ana aasif jiddan 'ala at-ta'kheer.",
          "meaning": "I am very sorry for the delay."
        },
        {
          "phrase": "لا مشكلة، كل شيء بخير.",
          "pinyin": "La mushkila, kullu shay' bikhayr.",
          "meaning": "No problem, everything is fine."
        },
        {
          "phrase": "أتمنى لك يوماً سعيداً!",
          "pinyin": "Atamanna laka yawman sa'eedan!",
          "meaning": "Have a nice day!"
        },
        {
          "phrase": "شكراً، ولك أيضاً.",
          "pinyin": "Shukran, wa laka aydan.",
          "meaning": "Thank you, and to you too."
        }
      ]
    },
    {
      "id": "ar-3",
      "title": "Learn Arabic - Arabic Alphabet Made Easy - Alef and Nun",
      "topic": "daily life",
      "level": "Beginner",
      "youtubeId": "QSLtNmRflBU",
      "explanation": "Master the Arabic alphabet, short and long vowels, and the pronunciation of difficult letters.",
      "phrases": [
        {
          "phrase": "تتكون اللغة العربية من ثمانية وعشرين حرفاً.",
          "pinyin": "Tatakawwan al-lugha al-Arabiyya min thamaniya wa 'ashreen harfan.",
          "meaning": "The Arabic language consists of twenty-eight letters."
        },
        {
          "phrase": "الحروف العربية تكتب من اليمين إلى اليسار.",
          "pinyin": "Al-huroof al-Arabiyya tuktab min al-yameen ila al-yasar.",
          "meaning": "Arabic letters are written from right to left."
        },
        {
          "phrase": "هناك ثلاثة حروف علة: الألف، الواو، والياء.",
          "pinyin": "Hunaka thalathat huroof 'illah: al-alif, al-waw, wa al-ya'.",
          "meaning": "There are three vowels: al-alif, al-waw, and al-ya'."
        },
        {
          "phrase": "الحركات القصيرة هي الفتحة والضمة والكسرة.",
          "pinyin": "Al-harakat al-qaseera hiya al-fatha wa ad-damma wa al-kasra.",
          "meaning": "Short vowels are fatha, damma, and kasra."
        },
        {
          "phrase": "كيف تنطق حرف الضاد بشكل صحيح؟",
          "pinyin": "Kayfa tantiqu harf ad-dad bishaklin saheeh?",
          "meaning": "How do you pronounce the letter Dad correctly?"
        },
        {
          "phrase": "اللغة العربية تسمى لغة الضاد.",
          "pinyin": "Al-lugha al-Arabiyya tusamma lughat ad-dad.",
          "meaning": "Arabic is called the language of the letter Dad."
        },
        {
          "phrase": "استمع جيداً إلى الفرق بين القاف والكاف.",
          "pinyin": "Istami' jiddan ila al-farq bayna al-qaf wa al-kaf.",
          "meaning": "Listen carefully to the difference between Qaf and Kaf."
        },
        {
          "phrase": "اكتب هذه الكلمات في دفترك.",
          "pinyin": "Uktub hadihi al-kalimat fee daftarika.",
          "meaning": "Write these words in your notebook."
        },
        {
          "phrase": "كرر الحروف بصوت مرتفع.",
          "pinyin": "Karrir al-huroof bisawtin murtafi'.",
          "meaning": "Repeat the letters in a loud voice."
        },
        {
          "phrase": "أحسنت! استمر في التدريب والتعلم.",
          "pinyin": "Ahsanta! Istamir fee at-tadreeb wa at-ta'allum.",
          "meaning": "Well done! Continue practicing and learning."
        }
      ]
    },
    {
      "id": "ar-4",
      "title": "Practice The Arabic Alphabets with Me!",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "nZIQet-h4ss",
      "explanation": "Practical expressions for ordering meals, asking prices, and paying at an Arabic restaurant.",
      "phrases": [
        {
          "phrase": "أريد طاولة لشخصين من فضلك.",
          "pinyin": "Ureed tawila li-shakhsayn min fadlik.",
          "meaning": "I want a table for two, please."
        },
        {
          "phrase": "هل يمكنني رؤية قائمة الطعام؟",
          "pinyin": "Hal yumkinunee ru'yat qa'imat at-ta'am?",
          "meaning": "Can I see the food menu?"
        },
        {
          "phrase": "ما هو الطبق المميز اليوم؟",
          "pinyin": "Ma huwa al-tabaq al-mumayyaz al-yawm?",
          "meaning": "What is the special dish today?"
        },
        {
          "phrase": "أريد أن أطلب كباباً وحمصاً.",
          "pinyin": "Ureed an atlub kababan wa hummusan.",
          "meaning": "I want to order kebab and hummus."
        },
        {
          "phrase": "ومن فضلك، أحضر لي ماءً بارداً.",
          "pinyin": "Wa min fadlik, ahdir lee ma'an baridan.",
          "meaning": "And please, bring me cold water."
        },
        {
          "phrase": "بالهناء والشفاء! الطعام لذيذ جداً.",
          "pinyin": "Bil-hana' wa ash-shifa'! At-ta'am ladheedh jiddan.",
          "meaning": "Bon appétit! The food is very delicious."
        },
        {
          "phrase": "هل الطعام حار جداً؟ لا، إنه معتدل.",
          "pinyin": "Hal at-ta'am harr jiddan? La, innahu mu'tadil.",
          "meaning": "Is the food very spicy? No, it is mild."
        },
        {
          "phrase": "الحساب لو سمحت عندما تفرغ.",
          "pinyin": "Al-hisab law samahat 'indama tafrugh.",
          "meaning": "The bill please when you are free."
        },
        {
          "phrase": "هل يمكنني الدفع بطاقة الائتمان؟",
          "pinyin": "Hal yumkinunee ad-daf' bi-bitaqat al-i'timan?",
          "meaning": "Can I pay by credit card?"
        },
        {
          "phrase": "نعم، الدفع بالبطاقة مقبول هنا.",
          "pinyin": "Na'am, ad-daf' bil-bitaqa maqbool huna.",
          "meaning": "Yes, payment by card is accepted here."
        }
      ]
    },
    {
      "id": "ar-5",
      "title": "Learn The Arabic Alphabet!  #arabic #arabicalphabet #arabicalphabets #arabicletters #learnarabic",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "zz8y3VUAQSI",
      "explanation": "Find your way around Arab cities, ask for directions, and use public transport.",
      "phrases": [
        {
          "phrase": "معذرة، أين محطة القطار؟",
          "pinyin": "Ma'dhiratan, ayna mahattat al-qitar?",
          "meaning": "Excuse me, where is the train station?"
        },
        {
          "phrase": "اذهب مباشرة ثم اتجه يميناً.",
          "pinyin": "Idhhab mubasharatan thumma ittajih yameenan.",
          "meaning": "Go straight, then turn right."
        },
        {
          "phrase": "هل السوق بعيد من هنا؟",
          "pinyin": "Hal as-sooq ba'eed min huna?",
          "meaning": "Is the market far from here?"
        },
        {
          "phrase": "لا، هو على بعد خمس دقائق.",
          "pinyin": "La, huwa 'ala bu'di khams daqa'iq.",
          "meaning": "No, it is five minutes away."
        },
        {
          "phrase": "أين يمكنني شراء تذكرة الحافلة؟",
          "pinyin": "Ayna yumkinunee shira' tadhkirat al-hafilah?",
          "meaning": "Where can I buy a bus ticket?"
        },
        {
          "phrase": "يمكنك شراؤها من هذا الكشك.",
          "pinyin": "Yumkinuka shira'uha min hadha al-kushk.",
          "meaning": "You can buy it from this kiosk."
        },
        {
          "phrase": "كم سعر التذكرة إلى وسط المدينة؟",
          "pinyin": "Kam si'r at-tadhkira ila wast al-madeenah?",
          "meaning": "How much is the ticket to the city center?"
        },
        {
          "phrase": "سعر التذكرة هو درهمان فقط.",
          "pinyin": "Si'r at-tadhkira huwa dirhaman faqat.",
          "meaning": "The ticket price is only two dirhams."
        },
        {
          "phrase": "أين يجب أن أنزل للحصول على المتحف؟",
          "pinyin": "Ayna yajib an anzil lil-husool 'ala al-mathaf?",
          "meaning": "Where should I get off to reach the museum?"
        },
        {
          "phrase": "انزل في المحطة القادمة مباشرة.",
          "pinyin": "Anzil fee al-mahattat al-qadimah mubasharatan.",
          "meaning": "Get off at the very next stop."
        }
      ]
    },
    {
      "id": "ar-6",
      "title": "Learn Arabic letters in under 60 secs",
      "topic": "travel",
      "level": "Beginner",
      "youtubeId": "KJS6JzrSdpI",
      "explanation": "Essential vocabulary for shopping, bargaining, and buying souvenirs in Arab souks.",
      "phrases": [
        {
          "phrase": "بكم هذا الوشاح الحريري الجميل؟",
          "pinyin": "Bikam hadha al-wishah al-hareeri al-jameel?",
          "meaning": "How much is this beautiful silk scarf?"
        },
        {
          "phrase": "هذا بمئة ريال يا سيدي.",
          "pinyin": "Hadha bi-mi'at riyal ya sayyidi.",
          "meaning": "This is one hundred riyals, sir."
        },
        {
          "phrase": "هذا السعر مرتفع جداً، هل هناك خصم؟",
          "pinyin": "Hadha as-si'r murtafi' jiddan, hal hunaka khasm?",
          "meaning": "This price is too high, is there a discount?"
        },
        {
          "phrase": "حسناً، يمكنك أخذه بثمانين ريالاً.",
          "pinyin": "Hasanan, yumkinuka akhdhuhu bi-thamaneen riyalan.",
          "meaning": "Alright, you can take it for eighty riyals."
        },
        {
          "phrase": "هل لديكم هذا القميص بلون آخر؟",
          "pinyin": "Hal ladaykum hadha al-qamees bilawnin aakhar?",
          "meaning": "Do you have this shirt in another color?"
        },
        {
          "phrase": "نعم، لدينا باللون الأزرق والأسود.",
          "pinyin": "Na'am, ladayna bil-lawn al-azraq wal-aswad.",
          "meaning": "Yes, we have it in blue and black."
        },
        {
          "phrase": "أريد شراء بعض التمور والتوابل.",
          "pinyin": "Ureed shira' ba'd at-timoor wat-tawabil.",
          "meaning": "I want to buy some dates and spices."
        },
        {
          "phrase": "هذه التمور طازجة ولذيذة جداً.",
          "pinyin": "Hadihi at-timoor tazija wa ladheedha jiddan.",
          "meaning": "These dates are fresh and very delicious."
        },
        {
          "phrase": "سآخذ كيلو واحداً من التمر، شكراً.",
          "pinyin": "Sa'akhudh kilo wahidan min at-tamr, shukran.",
          "meaning": "I will take one kilo of dates, thank you."
        },
        {
          "phrase": "تفضل المشتريات، شكراً لزيارتك.",
          "pinyin": "Tafaddal al-mushtariyat, shukran li-ziyaratik.",
          "meaning": "Here are your purchases, thank you for your visit."
        }
      ]
    },
    {
      "id": "ar-7",
      "title": "COMMON ARABIC Words for Everyday Life ||| Basic Vocabulary ||| Learn Arabic or Learn English",
      "topic": "daily life",
      "level": "Intermediate",
      "youtubeId": "eu5xH65NLlE",
      "explanation": "Describe your daily schedule, when you wake up, and what you do in Arabic.",
      "phrases": [
        {
          "phrase": "أستيقظ من النوم في الساعة السادسة صباحاً.",
          "pinyin": "Astayqidu min an-nawm fee as-sa'at as-sadisah sabahan.",
          "meaning": "I wake up at six o'clock in the morning."
        },
        {
          "phrase": "أغسل وجهي وأغسل أسناني بالفرشاة.",
          "pinyin": "Aghsilu wajhee wa aghsilu asnanee bil-furshah.",
          "meaning": "I wash my face and brush my teeth."
        },
        {
          "phrase": "أتناول الفطور مع عائلتي في السابعة.",
          "pinyin": "Atanawalu al-fatoor ma'a 'a'ilatee fee as-sabi'ah.",
          "meaning": "I eat breakfast with my family at seven."
        },
        {
          "phrase": "أذهب إلى العمل بالسيارة في الثامنة.",
          "pinyin": "Adhhabu ila al-'amal bis-sayyara fee ath-thaminah.",
          "meaning": "I go to work by car at eight o'clock."
        },
        {
          "phrase": "يبدأ عملي في الساعة التاسعة صباحاً.",
          "pinyin": "Yabda'u 'amalee fee as-sa'at at-tasi'ah sabahan.",
          "meaning": "My work starts at nine o'clock in the morning."
        },
        {
          "phrase": "أعود إلى البيت في الساعة الخامسة مساءً.",
          "pinyin": "A'oodu ila al-bayt fee as-sa'at al-khamisah masa'an.",
          "meaning": "I return home at five o'clock in the evening."
        },
        {
          "phrase": "أتناول العشاء وأتحدث مع زوجتي.",
          "pinyin": "Atanawalu al-'asha' wa atahaddathu ma'a zawjatee.",
          "meaning": "I eat dinner and talk to my wife."
        },
        {
          "phrase": "أشاهد التلفاز قليلاً قبل النوم.",
          "pinyin": "Oshahidu at-tilfaz qaleelan qabla an-nawm.",
          "meaning": "I watch TV for a bit before sleeping."
        },
        {
          "phrase": "أنام عادة في الساعة العاشرة مساءً.",
          "pinyin": "Anamu 'adatan fee as-sa'at al-'ashirah masa'an.",
          "meaning": "I usually sleep at ten o'clock in the evening."
        },
        {
          "phrase": "هذا روتين يومي معتاد ومريح.",
          "pinyin": "Hadha rooteen yawmee mu'tad wa mureeh.",
          "meaning": "This is a normal and comfortable daily routine."
        }
      ]
    },
    {
      "id": "ar-8",
      "title": "Arabic writing practice #6 | Writing \"morning\" in Arabic",
      "topic": "daily life",
      "level": "Intermediate",
      "youtubeId": "U4h3L_-s7n0",
      "explanation": "Describe seasons, temperature, and current weather conditions in Arabic.",
      "phrases": [
        {
          "phrase": "كيف يبدو الطقس في الخارج اليوم؟",
          "pinyin": "Kayfa yabdoo at-taqs fee al-kharij al-yawm?",
          "meaning": "How does the weather look outside today?"
        },
        {
          "phrase": "الطقس مشمس وحار جداً في الصيف.",
          "pinyin": "At-taqs mushmis wa harr jiddan fee as-sayf.",
          "meaning": "The weather is sunny and very hot in summer."
        },
        {
          "phrase": "درجة الحرارة اليوم تبلغ أربعين درجة.",
          "pinyin": "Darajat al-hararah al-yawm tablughu arba'een darajah.",
          "meaning": "The temperature today reaches forty degrees."
        },
        {
          "phrase": "أفضل فصل الشتاء لأن الجو بارد.",
          "pinyin": "Ufaddilu fasl ash-shita' li'anna al-jaw barid.",
          "meaning": "I prefer the winter season because it is cold."
        },
        {
          "phrase": "هل تهطل الأمطار بكثرة في الخريف؟",
          "pinyin": "Hal tahtulu al-amtar bikathratin fee al-khareef?",
          "meaning": "Does it rain heavily in autumn?"
        },
        {
          "phrase": "نعم، وتتساقط أوراق الأشجار أيضاً.",
          "pinyin": "Na'am, wa tatasaqatu awraq al-ashjar aydan.",
          "meaning": "Yes, and the leaves of the trees fall too."
        },
        {
          "phrase": "الربيع هو أفضل وقت لزيارة البلاد.",
          "pinyin": "Ar-rabee' huwa afdal waqt li-ziyarat al-bilad.",
          "meaning": "Spring is the best time to visit the country."
        },
        {
          "phrase": "الزهور تتفتح والجو معتدل وجميل.",
          "pinyin": "Al-zuhoor tatafattahu wal-jaw mu'tadil wa jameel.",
          "meaning": "The flowers bloom and the weather is mild and beautiful."
        },
        {
          "phrase": "هناك رياح قوية وغبار في الجو اليوم.",
          "pinyin": "Hunaka riyah qawiyyah wa ghubar fee al-jaw al-yawm.",
          "meaning": "There are strong winds and dust in the air today."
        },
        {
          "phrase": "يجب أن نأخذ مظلة معنا قبل الخروج.",
          "pinyin": "Yajib an na'khudh mizallatun ma'ana qabla al-khurooj.",
          "meaning": "We must take an umbrella with us before going out."
        }
      ]
    },
    {
      "id": "ar-9",
      "title": "Arabic lesson for beginners #learn Arabic 12 days #common words in Arabic #english & Arabic learning",
      "topic": "drama",
      "level": "Intermediate",
      "youtubeId": "HUXnp3jecrc",
      "explanation": "Learn standard Arabic expressions with religious and cultural origins used in daily interactions.",
      "phrases": [
        {
          "phrase": "إن شاء الله، سأنتهي من المشروع غداً.",
          "pinyin": "In sha' Allah, sa-antahi min al-mashroo' ghadan.",
          "meaning": "God willing, I will finish the project tomorrow."
        },
        {
          "phrase": "الحمد لله على كل شيء.",
          "pinyin": "Al-hamdu lillah 'ala kulli shay'.",
          "meaning": "Praise be to God for everything."
        },
        {
          "phrase": "ما شاء الله! هذا الطفل جميل جداً.",
          "pinyin": "Ma sha' Allah! Hadha at-tifl jameel jiddan.",
          "meaning": "What God has willed! This child is very beautiful."
        },
        {
          "phrase": "بسم الله الرحمن الرحيم.",
          "pinyin": "Bismillah ar-Rahman ar-Raheem.",
          "meaning": "In the name of God, the Most Gracious, the Most Merciful."
        },
        {
          "phrase": "السلام عليكم ورحمة الله وبركاته.",
          "pinyin": "As-salamu 'alaykum wa rahmatullahi wa barakatuh.",
          "meaning": "Peace be upon you and the mercy of God and His blessings."
        },
        {
          "phrase": "وعليكم السلام ورحمة الله وبركاته.",
          "pinyin": "Wa 'alaykum as-salam wa rahmatullahi wa barakatuh.",
          "meaning": "And upon you be peace and the mercy of God and His blessings."
        },
        {
          "phrase": "كل عام وأنت بخير بمناسبة العيد.",
          "pinyin": "Kullu 'am wa anta bikhayr bi-munasabat al-'eed.",
          "meaning": "May you be well every year on the occasion of Eid."
        },
        {
          "phrase": "شكراً لك، عيد مبارك سعيد.",
          "pinyin": "Shukran laka, 'eed mubarak sa'eed.",
          "meaning": "Thank you, happy and blessed Eid."
        },
        {
          "phrase": "شفاك الله وعافاك من هذا المرض.",
          "pinyin": "Shafaka Allah wa 'afaka min hadha al-marad.",
          "meaning": "May God heal you and cure you from this illness."
        },
        {
          "phrase": "آمين، شكراً جزيلاً لزيارتك الكريمة.",
          "pinyin": "Ameen, shukran jazeelan li-ziyaratika al-kareemah.",
          "meaning": "Amen, thank you very much for your kind visit."
        }
      ]
    },
    {
      "id": "ar-10",
      "title": "Teaching my brother Arabic alphabet😭 #brother #alphabet",
      "topic": "news",
      "level": "Advanced",
      "youtubeId": "65JwdyC3ndo",
      "explanation": "Learn about the diglossia in the Arabic speaking world, the differences between dialects (Fusha vs Ammiya).",
      "phrases": [
        {
          "phrase": "الفصحى هي لغة الكتابة والتعليم والإعلام.",
          "pinyin": "Al-fusha hiya lughat al-kitabah wat-ta'leem wal-i'lam.",
          "meaning": "Modern Standard Arabic is the language of writing, education, and media."
        },
        {
          "phrase": "العامية هي اللهجات المستخدمة في الحياة اليومية.",
          "pinyin": "Al-'ammiya hiya al-lahajat al-mustakhdamah fee al-hayat al-yawmiyyah.",
          "meaning": "Colloquial Arabic refers to the dialects used in daily life."
        },
        {
          "phrase": "تختلف اللهجة المصرية كثيراً عن اللهجة الخليجية.",
          "pinyin": "Takhtalifu al-lahja al-Misriyya katheeran 'an al-lahja al-Khaleejiyya.",
          "meaning": "The Egyptian dialect differs a lot from the Gulf dialect."
        },
        {
          "phrase": "السينما المصرية ساعدت في نشر اللهجة المصرية.",
          "pinyin": "As-seenima al-Misriyya saa'adat fee nashr al-lahja al-Misriyya.",
          "meaning": "Egyptian cinema helped spread the Egyptian dialect."
        },
        {
          "phrase": "هل تفهم اللهجة المغاربية بسهولة؟",
          "pinyin": "Hal tafhamu al-lahja al-Magharibiyya bisuhoolah?",
          "meaning": "Do you understand the North African dialect easily?"
        },
        {
          "phrase": "لا، هي تحتوي على الكثير من الكلمات الفرنسية.",
          "pinyin": "La, hiya tahtavee 'ala al-katheer min al-kalimat al-Faransiyyah.",
          "meaning": "No, it contains a lot of French words."
        },
        {
          "phrase": "أفضل تعلم الفصحى أولاً لفهم جميع العرب.",
          "pinyin": "Ufaddilu ta'allum al-fusha awwalan lifahm jamee' al-Arab.",
          "meaning": "I prefer learning Modern Standard Arabic first to understand all Arabs."
        },
        {
          "phrase": "هذا قرار صائب ومفيد جداً للدراسة.",
          "pinyin": "Hadha qarar sa'ib wa mufeed jiddan lid-dirasah.",
          "meaning": "This is a correct and very useful decision for studying."
        },
        {
          "phrase": "اللغة العربية بحر واسع من المفردات والمعاني.",
          "pinyin": "Al-lugha al-Arabiyya bahrun wasi' min al-mufradat wal-ma'ani.",
          "meaning": "The Arabic language is a vast ocean of vocabulary and meanings."
        },
        {
          "phrase": "أتمنى لك التوفيق في رحلتك لتعلمها!",
          "pinyin": "Atamanna laka at-tawfeeq fee rihlatika li-ta'allumiha!",
          "meaning": "I wish you success in your journey of learning it!"
        }
      ]
    }
  ]
};