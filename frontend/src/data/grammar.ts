import type { LanguageCode } from './courses';

type Part = { h: string; target: string; r: string };
type Example = { target: string; rom: string; en: string; parts: Part[] };
type GrammarRule = { id: number; title: string; level: string; rule: string; tip: string; examples: Example[]; videoUrl?: string };

function p(h: string, r: string): Part { return { h, target: h, r }; }

const ALL_GRAMMAR: Record<LanguageCode, GrammarRule[]> = {
  zh: [
    { id: 1, title: 'Basic S + V + O', level: 'HSK 1', rule: 'Subject + Verb + Object',
      tip: 'Chinese sentences follow the same Subject-Verb-Object order as English most of the time.',
      videoUrl: 'https://www.youtube.com/embed/EKcSdYks2gE',
      examples: [
        { target: '我吃饭。', rom: 'Wǒ chī fàn.', en: 'I eat rice.', parts: [p('我', 'S'), p('吃', 'V'), p('饭', 'O')] },
        { target: '她喝水。', rom: 'Tā hē shuǐ.', en: 'She drinks water.', parts: [p('她', 'S'), p('喝', 'V'), p('水', 'O')] },
      ]
    },
    { id: 2, title: 'Negation with 不', level: 'HSK 1', rule: 'Subject + 不 + Verb + Object',
      tip: '不 (bù) is placed before the verb to negate it.',
      videoUrl: 'https://www.youtube.com/embed/IhJrP32Qdbw',
      examples: [
        { target: '我不喝茶。', rom: 'Wǒ bù hē chá.', en: "I don't drink tea.", parts: [p('我', 'S'), p('不', 'NEG'), p('喝', 'V'), p('茶', 'O')] },
      ]
    },
    { id: 3, title: 'Yes/No Question with 吗', level: 'HSK 1', rule: 'Statement + 吗？',
      tip: 'Add 吗 at the end of any statement to form a yes/no question.',
      videoUrl: 'https://www.youtube.com/embed/mFemJL9NqRs',
      examples: [
        { target: '你是学生吗？', rom: 'Nǐ shì xuéshēng ma?', en: 'Are you a student?', parts: [p('你', 'S'), p('是', 'V'), p('学生', 'O'), p('吗', 'Q')] },
      ]
    },
    { id: 4, title: 'Time Before Verb', level: 'HSK 2', rule: 'Subject + Time + Verb + Object',
      tip: 'Time expressions come before the verb in Chinese.',
      videoUrl: 'https://www.youtube.com/embed/N3NDACVNlhU',
      examples: [
        { target: '我明天去 school。', rom: 'Wǒ míngtiān qù xuéxiào.', en: 'I will go to school tomorrow.', parts: [p('我', 'S'), p('明天', 'T'), p('去', 'V'), p('学校', 'O')] },
      ]
    },
    { id: 5, title: 'Resultative Complements', level: 'HSK 3', rule: 'Verb + Result Complement',
      tip: 'A result complement follows a verb to show the result of the action.',
      videoUrl: 'https://www.youtube.com/embed/ixo1xiC-VGs',
      examples: [
        { target: '我听懂了。', rom: 'Wǒ tīng dǒng le.', en: 'I understood (what I heard).', parts: [p('我', 'S'), p('听懂', 'V'), p('了', 'T')] },
      ]
    },
    { id: 6, title: 'The 把 (bǎ) Sentence Structure', level: 'HSK 3', rule: 'Subject + 把 + Object + Verb + Other Element',
      tip: 'Use the 把 construction to focus on the result or influence on the object.',
      videoUrl: 'https://www.youtube.com/embed/ZrVvU96Q7uM',
      examples: [
        { target: '我把书看完了。', rom: 'Wǒ bǎ shū kàn wán le.', en: 'I finished reading the book.', parts: [p('我', 'S'), p('把', 'BA'), p('书', 'O'), p('看完', 'V'), p('了', 'PART')] },
      ]
    },
    { id: 7, title: 'The 被 (bèi) Passive Structure', level: 'HSK 3', rule: 'Receiver + 被 + Doer + Verb + Other Element',
      tip: '被 indicates passive voice. The doer can sometimes be omitted.',
      videoUrl: 'https://www.youtube.com/embed/qrjwyN_xaCY',
      examples: [
        { target: '杯子被妹妹打破了。', rom: 'Bēizi bèi mèimei dǎ pò le.', en: 'The cup was broken by little sister.', parts: [p('杯子', 'O'), p('被', 'BEI'), p('妹妹', 'S'), p('打破', 'V'), p('了', 'PART')] },
      ]
    },
    { id: 8, title: 'Expressing "As soon as... then..." with 一...就...', level: 'HSK 2', rule: '一 + Action 1 + 就 + Action 2',
      tip: 'Shows that Action 2 happens immediately after Action 1.',
      videoUrl: 'https://www.youtube.com/embed/CajY1Hb8pwY',
      examples: [
        { target: '我一回家就吃饭。', rom: 'Wǒ yī huí jiā jiù chī fàn.', en: 'As soon as I get home, I eat.', parts: [p('我', 'S'), p('一', 'YI'), p('回家', 'V1'), p('就', 'JIU'), p('吃饭', 'V2')] },
      ]
    },
    { id: 9, title: 'The Comparative with 比 (bǐ)', level: 'HSK 2', rule: 'A + 比 + B + Adjective',
      tip: 'Used to compare two things where A is more adjective than B.',
      videoUrl: 'https://www.youtube.com/embed/GLadv1QfkdM',
      examples: [
        { target: '他比我高。', rom: 'Tā bǐ wǒ gāo.', en: 'He is taller than me.', parts: [p('他', 'A'), p('比', 'COMP'), p('我', 'B'), p('高', 'ADJ')] },
      ]
    },
    { id: 10, title: 'Expressing "Although... but..." with 虽然...但是...', level: 'HSK 2', rule: '虽然 + Clause 1, 但是 + Clause 2',
      tip: 'Used to express a concession or contrast between two clauses.',
      videoUrl: 'https://www.youtube.com/embed/J2trCo6suvM',
      examples: [
        { target: '虽然下雨，但是我很开心。', rom: 'Suīrán xià yǔ, dànshì wǒ hěn kāixīn.', en: 'Although it is raining, I am very happy.', parts: [p('虽然', 'CONJ1'), p('下雨', 'C1'), p('但是', 'CONJ2'), p('我很开心', 'C2')] },
      ]
    },
    { id: 11, title: 'The Continuous Aspect with 着 (zhe)', level: 'HSK 2', rule: 'Verb + 着',
      tip: 'Indicates an action is in progress or a state is continuous.',
      videoUrl: 'https://www.youtube.com/embed/4KtX2EF61-M',
      examples: [
        { target: '门开着。', rom: 'Mén kāi zhe.', en: 'The door is open.', parts: [p('门', 'S'), p('开', 'V'), p('着', 'CONT')] },
      ]
    },
    { id: 12, title: 'Double Negation for Emphasis', level: 'HSK 4', rule: '不得不 + Verb / 没有...不...',
      tip: 'Two negatives make a strong positive statement.',
      videoUrl: 'https://www.youtube.com/embed/q4onlTkBTwc',
      examples: [
        { target: '我不得不去。', rom: 'Wǒ bùdébù qù.', en: 'I have no choice but to go.', parts: [p('我', 'S'), p('不得不', 'D-NEG'), p('去', 'V')] },
      ]
    },
    { id: 13, title: 'The Emphatic 是...的 (shì...de) Structure', level: 'HSK 2', rule: 'Subject + 是 + Information + Verb + 的',
      tip: 'Emphasizes a specific detail (like time, place, or manner) about a past event.',
      videoUrl: 'https://www.youtube.com/embed/9MHpcZrhicY',
      examples: [
        { target: '我是昨天来的。', rom: 'Wǒ shì zuótiān lái de.', en: 'It was yesterday that I came.', parts: [p('我', 'S'), p('是', 'SHI'), p('昨天', 'INFO'), p('来', 'V'), p('的', 'DE')] },
      ]
    },
    { id: 14, title: 'Expressing "Not only... but also..." with 不仅...而且...', level: 'HSK 3', rule: '不仅 + Clause 1, 而且 + Clause 2',
      tip: 'Links two related qualities or facts with rising intensity.',
      videoUrl: 'https://www.youtube.com/embed/CajY1Hb8pwY',
      examples: [
        { target: '她不仅聪明，而且很漂亮。', rom: 'Tā bùjǐn cōngmíng, érqiě hěn piàoliang.', en: 'She is not only smart, but also very beautiful.', parts: [p('她', 'S'), p('不仅', 'CONJ1'), p('聪明', 'ADJ1'), p('而且', 'CONJ2'), p('很漂亮', 'ADJ2')] },
      ]
    },
    { id: 15, title: 'The Rhetorical Question with 不是...吗？', level: 'HSK 3', rule: '不是 + Statement + 吗？',
      tip: 'Used to express surprise, rhetoric, or reminder (meaning "Isn\'t it...?").',
      videoUrl: 'https://www.youtube.com/embed/LFiYi7-KErU',
      examples: [
        { target: '你不是学生吗？', rom: 'Nǐ búshì xuéshēng ma?', en: 'Aren\'t you a student?', parts: [p('你', 'S'), p('不是', 'NEG'), p('学生', 'N'), p('吗', 'Q')] },
      ]
    },
    { id: 16, title: 'The Passive with 让 (ràng) or 叫 (jiào)', level: 'HSK 3', rule: 'Receiver + 让/叫 + Doer + Verb',
      tip: 'Similar to 被, but more common in informal spoken Chinese.',
      videoUrl: 'https://www.youtube.com/embed/rG3bkzTTvjs',
      examples: [
        { target: '自行车让弟弟骑走了。', rom: 'Zìxíngchē ràng dìdi qí zǒu le.', en: 'The bicycle was ridden away by little brother.', parts: [p('自行车', 'OBJ'), p('让', 'RANG'), p('弟弟', 'S'), p('骑走', 'V'), p('了', 'PART')] },
      ]
    },
  ],
  es: [
    { id: 1, title: 'Ser vs. Estar', level: 'A1', rule: 'Ser = permanent | Estar = temporary',
      tip: '"Ser" is for identity/origin; "estar" is for states, locations, and feelings.',
      videoUrl: 'https://www.youtube.com/embed/zV-XLyuyDyo',
      examples: [
        { target: 'Soy estudiante.', rom: 'Soy es-too-dee-AN-teh.', en: 'I am a student (identity).', parts: [p('Soy', 'V'), p('estudiante', 'O')] },
        { target: 'Estoy cansado.', rom: 'Es-TOY kan-SAH-doh.', en: 'I am tired (state).', parts: [p('Estoy', 'V'), p('cansado', 'ADJ')] },
      ]
    },
    { id: 2, title: 'Regular -AR Verbs', level: 'A1', rule: 'hablar → hablaro / hablas / habla',
      tip: 'Most -ar verbs follow this pattern. Drop -ar and add the ending.',
      videoUrl: 'https://www.youtube.com/embed/bePgbbhPUxI',
      examples: [
        { target: 'Yo hablo español.', rom: 'Yoh AH-bloh es-pah-NYOL.', en: 'I speak Spanish.', parts: [p('Yo', 'S'), p('hablo', 'V'), p('español', 'O')] },
      ]
    },
    { id: 3, title: 'Definite Articles', level: 'A1', rule: 'el (m.sg) / la (f.sg) / los (m.pl) / las (f.pl)',
      tip: 'Nouns in Spanish have gender. Articles must match in gender and number.',
      videoUrl: 'https://www.youtube.com/embed/YeTIwDcKwZ4',
      examples: [
        { target: 'El libro es rojo.', rom: 'El LEE-broh es ROH-hoh.', en: 'The book is red.', parts: [p('El', 'ART'), p('libro', 'S'), p('es', 'V'), p('rojo', 'ADJ')] },
      ]
    },
    { id: 4, title: 'Question Words', level: 'A1', rule: '¿Qué? ¿Quién? ¿Dónde? ¿Cuándo?',
      tip: 'Spanish question words always carry an accent mark.',
      videoUrl: 'https://www.youtube.com/embed/UmxmbFhyHFM',
      examples: [
        { target: '¿Dónde está el baño?', rom: 'DON-deh es-TAH el BAH-nyoh?', en: 'Where is the bathroom?', parts: [p('¿Dónde?', 'Q'), p('está', 'V'), p('el baño', 'O')] },
      ]
    },
    { id: 5, title: 'Reflexive Verbs', level: 'A2', rule: 'me / te / se / nos + verb',
      tip: 'Reflexive verbs show the subject acts on itself. Very common in Spanish.',
      videoUrl: 'https://www.youtube.com/embed/_uH_tosBLyo',
      examples: [
        { target: 'Me llamo Carlos.', rom: 'Meh YAH-moh KAR-los.', en: 'My name is Carlos (I call myself).', parts: [p('Me', 'REF'), p('llamo', 'V'), p('Carlos', 'O')] },
      ]
    },
    { id: 6, title: 'The Preterite vs. Imperfect', level: 'A2', rule: 'Preterite (completed action) vs. Imperfect (ongoing/description)',
      tip: 'Preterite is for specific completed events; imperfect is for descriptions, habits, and background.',
      videoUrl: 'https://www.youtube.com/embed/3rJjIpFaGOo',
      examples: [
        { target: 'Ayer comí una manzana.', rom: 'Ah-YEHR coh-MEE oo-nah mahn-ZAH-nah.', en: 'Yesterday I ate an apple.', parts: [p('Ayer', 'ADV'), p('comí', 'V-PRET'), p('una manzana', 'O')] },
      ]
    },
    { id: 7, title: 'Present Subjunctive Intro', level: 'B1', rule: 'Subject 1 + Verb (wish/doubt) + que + Subject 2 + Subjunctive Verb',
      tip: 'Used to express desires, doubts, emotions, or recommendations.',
      videoUrl: 'https://www.youtube.com/embed/-MZwa46X2C4',
      examples: [
        { target: 'Espero que vengas.', rom: 'Es-PEH-roh keh BEN-gahs.', en: 'I hope that you come.', parts: [p('Espero', 'V1'), p('que', 'CONJ'), p('vengas', 'V2-SUBJ')] },
      ]
    },
    { id: 8, title: 'The Conditional Tense', level: 'B1', rule: 'Infinitive + -ía, -ías, -ía, -íamos, -ían',
      tip: 'Expresses what would happen in hypothetical situations.',
      videoUrl: 'https://www.youtube.com/embed/nRaMf1Y1TCM',
      examples: [
        { target: 'Yo comería más.', rom: 'Yoh coh-meh-REE-ah mas.', en: 'I would eat more.', parts: [p('Yo', 'S'), p('comería', 'V-COND'), p('más', 'ADV')] },
      ]
    },
    { id: 9, title: 'The Imperfect Subjunctive', level: 'B2', rule: 'Drop -ron from Preterite 3rd pl. and add -ra, -ras, -ra...',
      tip: 'Used in hypothetical conditions (with "si") and in past desires or doubts.',
      videoUrl: 'https://www.youtube.com/embed/5VkCYZGvNlI',
      examples: [
        { target: 'Si yo fuera rico.', rom: 'See yoh FWEH-rah REE-coh.', en: 'If I were rich.', parts: [p('Si', 'CONJ'), p('yo', 'S'), p('fuera', 'V-SUBJ-PAST'), p('rico', 'ADJ')] },
      ]
    },
    { id: 10, title: 'The Future Tense (Futuro Simple)', level: 'B1', rule: 'Infinitive + -é, -ás, -á, -emos, -éis, -án',
      tip: 'Expresses actions that will happen in the future, or probability in the present.',
      videoUrl: 'https://www.youtube.com/embed/U42loE1zhdw',
      examples: [
        { target: 'Viajaré mañana.', rom: 'Byah-hah-REH mah-NYAH-nah.', en: 'I will travel tomorrow.', parts: [p('Viajaré', 'V-FUT'), p('mañana', 'ADV')] },
      ]
    },
    { id: 11, title: 'Relative Pronouns', level: 'B2', rule: 'Noun + relative pronoun + description',
      tip: 'Used to connect clauses and avoid repetition of nouns.',
      videoUrl: 'https://www.youtube.com/embed/fnD1VaLpsCA',
      examples: [
        { target: 'El hombre que canta.', rom: 'El OM-breh keh CAN-tah.', en: 'The man who sings.', parts: [p('El hombre', 'N'), p('que', 'REL'), p('canta', 'V')] },
      ]
    },
    { id: 12, title: "Passive Voice with 'se'", level: 'B1', rule: 'se + 3rd person verb + subject',
      tip: 'Used when the agent performing the action is not specified.',
      videoUrl: 'https://www.youtube.com/embed/x1sh5raIbwo',
      examples: [
        { target: 'Se habla español aquí.', rom: 'Seh AH-blah es-pah-NYOL ah-KEE.', en: 'Spanish is spoken here.', parts: [p('Se', 'PASS'), p('habla', 'V'), p('español', 'S'), p('aquí', 'ADV')] },
      ]
    },
    { id: 13, title: 'The Past Subjunctive with \'si\'', level: 'B2', rule: 'Si + Imperfect Subjunctive, Conditional',
      tip: 'Used for hypothetical situations in the present (e.g. If I won... I would...).',
      videoUrl: 'https://www.youtube.com/embed/am0YiYkTQ_E',
      examples: [
        { target: 'Si ganara la lotería, viajaría.', rom: 'See gah-NAH-rah lah loh-teh-REE-ah, byah-hah-REE-ah.', en: 'If I won the lottery, I would travel.', parts: [p('Si', 'CONJ'), p('ganara', 'V-SUBJ'), p('la lotería', 'O'), p('viajaría', 'V-COND')] },
      ]
    },
    { id: 14, title: "Relative Pronoun \'cuyo/cuya\' (Whose)", level: 'C1', rule: 'Noun 1 + cuyo/cuya/cuyos/cuyas + Noun 2',
      tip: 'Translates to "whose" and agrees in gender and number with the noun that follows it.',
      videoUrl: 'https://www.youtube.com/embed/fnD1VaLpsCA',
      examples: [
        { target: 'El autor cuyo libro leí.', rom: 'El ow-TOR COO-yoh LEE-broh leh-EE.', en: 'The author whose book I read.', parts: [p('El autor', 'N1'), p('cuyo', 'REL'), p('libro', 'N2'), p('leí', 'V')] },
      ]
    },
    { id: 15, title: 'The Future Perfect (Futuro Compuesto)', level: 'B2', rule: 'habré / habrás / habrá + past participle',
      tip: 'Expresses an action that will have been completed before a point in the future.',
      videoUrl: 'https://www.youtube.com/embed/6cgc5ENNbR4',
      examples: [
        { target: 'Para mañana habré terminado.', rom: 'PAH-rah mah-NYAH-nah ah-BREH tehr-mee-NAH-doh.', en: 'By tomorrow I will have finished.', parts: [p('Para mañana', 'ADV'), p('habré terminado', 'V-FUT-PERF')] },
      ]
    },
    { id: 16, title: 'Subjunctive with Conjunctions of Time', level: 'B2', rule: 'Conjunction of time + Subjunctive (for future actions)',
      tip: 'When referring to future events, conjunctions of time like cuando trigger the subjunctive.',
      videoUrl: 'https://www.youtube.com/embed/8fn0WeAW5Xs',
      examples: [
        { target: 'Cuando llegue, te llamaré.', rom: 'CWAHN-doh YEH-geh, teh yah-mah-REH.', en: 'When I arrive, I will call you.', parts: [p('Cuando', 'CONJ'), p('llegue', 'V-SUBJ'), p('te llamaré', 'V-FUT')] },
      ]
    },
  ],
  fr: [
    { id: 1, title: 'Être & Avoir', level: 'A1', rule: 'être = to be | avoir = to have',
      tip: '"Être" and "avoir" are the two most important French verbs — used alone and as auxiliaries.',
      videoUrl: 'https://www.youtube.com/embed/84olv0BM4oY',
      examples: [
        { target: 'Je suis étudiant.', rom: 'Zhuh swee eh-tyoo-DYAHN.', en: 'I am a student.', parts: [p('Je', 'S'), p('suis', 'V'), p('étudiant', 'O')] },
        { target: "J'ai un livre.", rom: 'Zhay uh LEEV-ruh.', en: 'I have a book.', parts: [p("J'ai", 'V'), p('un livre', 'O')] },
      ]
    },
    { id: 2, title: 'Gender of Nouns', level: 'A1', rule: 'le/un (m.) | la/une (f.)',
      tip: 'Every French noun is masculine or feminine. There is no strict rule — you must memorise gender.',
      videoUrl: 'https://www.youtube.com/embed/V7AjuIDn4oU',
      examples: [
        { target: 'le garçon / la fille', rom: 'luh gar-SON / lah FEE.', en: 'the boy / the girl', parts: [p('le', 'ART-M'), p('garçon', 'N'), p('la', 'ART-F'), p('fille', 'N')] },
      ]
    },
    { id: 3, title: 'Negation: ne…pas', level: 'A1', rule: 'ne + verb + pas',
      tip: 'French negation wraps around the verb with ne before and pas after.',
      videoUrl: 'https://www.youtube.com/embed/40ZnnWck0Zk',
      examples: [
        { target: 'Je ne parle pas anglais.', rom: 'Zhuh nuh PARL pah ahn-GLEH.', en: "I don't speak English.", parts: [p('Je', 'S'), p('ne', 'NEG1'), p('parle', 'V'), p('pas', 'NEG2'), p('anglais', 'O')] },
      ]
    },
    { id: 4, title: 'Regular -ER Verbs', level: 'A1', rule: 'parler → je parle / tu parles / il parle',
      tip: '-ER verbs are the most common. The endings are: -e, -es, -e, -ons, -ez, -ent.',
      videoUrl: 'https://www.youtube.com/embed/5WiTJJ4N2jQ',
      examples: [
        { target: 'Tu parles français.', rom: 'Tyoo PARL frahn-SEH.', en: 'You speak French.', parts: [p('Tu', 'S'), p('parles', 'V'), p('français', 'O')] },
      ]
    },
    { id: 5, title: 'Adjective Agreement', level: 'A2', rule: 'Adjectives agree in gender & number',
      tip: 'Add -e for feminine, -s for plural, -es for feminine plural.',
      videoUrl: 'https://www.youtube.com/embed/yEayMFTFI6c',
      examples: [
        { target: 'Elle est grande.', rom: 'El eh GROND.', en: 'She is tall.', parts: [p('Elle', 'S'), p('est', 'V'), p('grande', 'ADJ-F')] },
      ]
    },
    { id: 6, title: 'Passé Composé vs. Imparfait', level: 'A2', rule: 'Passé Composé (completed action) vs. Imparfait (ongoing background)',
      tip: 'Passé composé is used for one-off completed events; imparfait for descriptions and ongoing past events.',
      videoUrl: 'https://www.youtube.com/embed/JK5OMjjAc8A',
      examples: [
        { target: "J'ai mangé hier.", rom: 'Zhay mahn-zhay ee-air.', en: 'I ate yesterday.', parts: [p("J'ai mangé", 'V-PAST'), p('hier', 'ADV')] },
      ]
    },
    { id: 7, title: 'Direct & Indirect Object Pronouns', level: 'A2', rule: 'Subject + pronoun (le/la/les/lui/leur) + verb',
      tip: 'Object pronouns go before the verb in French.',
      videoUrl: 'https://www.youtube.com/embed/aIvAR6GVz48',
      examples: [
        { target: 'Je te vois.', rom: 'Zhuh tuh vwah.', en: 'I see you.', parts: [p('Je', 'S'), p('te', 'OBJ'), p('vois', 'V')] },
      ]
    },
    { id: 8, title: 'The Subjunctive Mood', level: 'B1', rule: 'il faut que + subject + subjunctive verb',
      tip: 'Expresses obligation, necessity, or doubt.',
      videoUrl: 'https://www.youtube.com/embed/eeqNMs_jzhU',
      examples: [
        { target: 'Il faut que je parte.', rom: 'Eel foh kuh zhuh part.', en: 'It is necessary that I leave.', parts: [p('Il faut que', 'EXP'), p('je', 'S'), p('parte', 'V-SUBJ')] },
      ]
    },
    { id: 9, title: 'The Plus-que-parfait (Past Perfect)', level: 'B1', rule: 'Imparfait auxiliary (avoir/être) + past participle',
      tip: 'Used to describe an action that happened before another action in the past.',
      videoUrl: 'https://www.youtube.com/embed/EuvfWro_bRo',
      examples: [
        { target: "J'avais mangé.", rom: 'Zhah-veh mahn-zhay.', en: 'I had eaten.', parts: [p("J'avais mangé", 'V-PPERF')] },
      ]
    },
    { id: 10, title: 'Relative Pronouns: qui, que, dont, où', level: 'A2/B1', rule: 'Noun + relative pronoun + relative clause',
      tip: 'Qui is the subject, que is the direct object, dont replaces objects of de, où is for place or time.',
      videoUrl: 'https://www.youtube.com/embed/gAztaclwNa4',
      examples: [
        { target: 'Le livre que je lis.', rom: 'Luh leev-ruh kuh zhuh lee.', en: 'The book that I am reading.', parts: [p('Le livre', 'N'), p('que', 'REL'), p('je', 'S'), p('lis', 'V')] },
      ]
    },
    { id: 11, title: 'The Future Simple Tense', level: 'A2', rule: 'Infinitive (drop -e for -re) + -ai, -as, -a, -ons, -ez, -ont',
      tip: 'Expresses future events (equivalent to "will" in English).',
      videoUrl: 'https://www.youtube.com/embed/2cYZfyeySVA',
      examples: [
        { target: 'Je parlerai demain.', rom: 'Zhuh parl-ray duh-man.', en: 'I will speak tomorrow.', parts: [p('Je', 'S'), p('parlerai', 'V-FUT'), p('demain', 'ADV')] },
      ]
    },
    { id: 12, title: 'Double Pronoun Construction', level: 'B1', rule: 'Subject + Pronoun 1 + Pronoun 2 + Verb',
      tip: 'When using multiple pronouns (like indirect and direct object), they follow a strict order.',
      videoUrl: 'https://www.youtube.com/embed/-4B6rYaOvSw',
      examples: [
        { target: 'Il me le donne.', rom: 'Eel muh luh dun.', en: 'He gives it to me.', parts: [p('Il', 'S'), p('me', 'PRON1'), p('le', 'PRON2'), p('donne', 'V')] },
      ]
    },
    { id: 13, title: 'The Conditional Perfect (Conditionnel Passé)', level: 'B2', rule: 'Conditionnel Present auxiliary + past participle',
      tip: 'Expresses regrets or past hypotheticals (e.g. I would have eaten).',
      videoUrl: 'https://www.youtube.com/embed/o-hxMuZwVzI',
      examples: [
        { target: "J'aurais mangé.", rom: 'Zhoh-reh mahn-zhay.', en: 'I would have eaten.', parts: [p("J'aurais mangé", 'V-COND-PAST')] },
      ]
    },
    { id: 14, title: "Relative Pronoun \'dont\' (of which/whom)", level: 'B2', rule: 'Noun + dont + subject + verb',
      tip: 'Replaces a prepositional phrase starting with "de".',
      videoUrl: 'https://www.youtube.com/embed/qDlBFrgIUKI',
      examples: [
        { target: 'Le livre dont tu parles.', rom: 'Luh leev-ruh dohn tyoo parl.', en: 'The book of which you speak.', parts: [p('Le livre', 'N'), p('dont', 'REL'), p('tu', 'S'), p('parles', 'V')] },
      ]
    },
    { id: 15, title: 'The Gerundive (Le Gérondif)', level: 'B1', rule: 'en + present participle (-ant)',
      tip: 'Expresses simultaneous action or means/manner (e.g. while eating, by studying).',
      videoUrl: 'https://www.youtube.com/embed/9drC7kPyJ_Q',
      examples: [
        { target: 'En mangeant, je lis.', rom: 'Ahn mahn-zhahn, zhuh lee.', en: 'While eating, I read.', parts: [p('En mangeant', 'GER'), p('je', 'S'), p('lis', 'V')] },
      ]
    },
    { id: 16, title: "Passive Voice with \'faire\' (Causative)", level: 'B2', rule: 'faire + infinitive',
      tip: 'Used when the subject has something done by someone else (e.g. to have/get something done).',
      videoUrl: 'https://www.youtube.com/embed/fRX5_pP8usM',
      examples: [
        { target: 'Je fais réparer ma voiture.', rom: 'Zhuh feh ray-pah-ray mah vwah-tyur.', en: 'I am getting my car repaired.', parts: [p('Je', 'S'), p('fais réparer', 'V-CAUS'), p('ma voiture', 'O')] },
      ]
    },
  ],
  de: [
    { id: 1, title: 'Nominative Case', level: 'A1', rule: 'Subject uses nominative: der/die/das',
      tip: 'German has four cases. The subject of a sentence is always in the nominative case.',
      videoUrl: 'https://www.youtube.com/embed/y-aMTFMffDA',
      examples: [
        { target: 'Der Mann trinkt Wasser.', rom: 'Dehr Mann trinkt VAS-er.', en: 'The man drinks water.', parts: [p('Der Mann', 'S'), p('trinkt', 'V'), p('Wasser', 'O')] },
      ]
    },
    { id: 2, title: 'Verb Position', level: 'A1', rule: 'Verb is always 2nd element in a statement',
      tip: 'In a German main clause, the conjugated verb must be in the second position.',
      videoUrl: 'https://www.youtube.com/embed/jR4XeQxwGHQ',
      examples: [
        { target: 'Ich lerne Deutsch.', rom: 'Ikh LEHR-nuh Doytsh.', en: 'I learn German.', parts: [p('Ich', 'S'), p('lerne', 'V'), p('Deutsch', 'O')] },
        { target: 'Heute lerne ich Deutsch.', rom: 'HOY-tuh LEHR-nuh ikh Doytsh.', en: 'Today I learn German.', parts: [p('Heute', 'T'), p('lerne', 'V'), p('ich', 'S'), p('Deutsch', 'O')] },
      ]
    },
    { id: 3, title: 'Modal Verbs', level: 'A2', rule: 'können / wollen / müssen + infinitive at end',
      tip: 'Modal verbs send the main infinitive to the end of the clause.',
      videoUrl: 'https://www.youtube.com/embed/bD4vSw6AWps',
      examples: [
        { target: 'Ich kann Deutsch sprechen.', rom: 'Ikh kan Doytsh SHPREH-khen.', en: 'I can speak German.', parts: [p('Ich', 'S'), p('kann', 'MOD'), p('Deutsch', 'O'), p('sprechen', 'V-INF')] },
      ]
    },
    { id: 4, title: 'Accusative Case', level: 'A2', rule: 'Direct object uses accusative: den/die/das',
      tip: 'The direct object (the thing being acted upon) takes the accusative case.',
      videoUrl: 'https://www.youtube.com/embed/0V8IyLsLrNk',
      examples: [
        { target: 'Ich sehe den Hund.', rom: 'Ikh ZEH-uh dehn Hoont.', en: 'I see the dog.', parts: [p('Ich', 'S'), p('sehe', 'V'), p('den Hund', 'O-ACC')] },
      ]
    },
    { id: 5, title: 'Separable Verbs', level: 'B1', rule: 'Prefix splits off to end of clause',
      tip: 'Many German verbs have separable prefixes that move to the end of the main clause.',
      videoUrl: 'https://www.youtube.com/embed/vhj8Lr4bCEA',
      examples: [
        { target: 'Ich rufe dich an.', rom: 'Ikh ROO-fuh dikh an.', en: 'I call you.', parts: [p('Ich', 'S'), p('rufe', 'V'), p('dich', 'O'), p('an', 'PREFIX')] },
      ]
    },
    { id: 6, title: 'Subordinate Clauses & Verb-End Rule (Weil, Dass)', level: 'A2', rule: 'Weil/Dass + Subject + Object + Verb (conjugated verb at end)',
      tip: 'Conjunctions like "weil" (because) and "dass" (that) push the conjugated verb to the very end of the clause.',
      videoUrl: 'https://www.youtube.com/embed/d9NvGXY2ASE',
      examples: [
        { target: 'Weil ich müde bin.', rom: 'Vyl ikh MUE-deh bin.', en: 'Because I am tired.', parts: [p('Weil', 'CONJ'), p('ich', 'S'), p('müde', 'ADJ'), p('bin', 'V')] },
      ]
    },
    { id: 7, title: 'The Dative Case', level: 'A2', rule: 'Indirect Object uses Dative: dem/der/dem/den',
      tip: 'Used for the recipient of an action, or after specific dative prepositions.',
      videoUrl: 'https://www.youtube.com/embed/G-dgLzu18EU',
      examples: [
        { target: 'Ich gebe dem Mann das Buch.', rom: 'Ikh GAY-buh dehm Mann das Bookh.', en: 'I give the man the book.', parts: [p('Ich', 'S'), p('gebe', 'V'), p('dem Mann', 'O-DAT'), p('das Buch', 'O-ACC')] },
      ]
    },
    { id: 8, title: 'Two-Way Prepositions (Wechselpräpositionen)', level: 'B1', rule: 'Accusative (movement) vs. Dative (location)',
      tip: 'Use accusative when there is movement to a new location, dative when staying in place.',
      videoUrl: 'https://www.youtube.com/embed/auWRmuw_AcY',
      examples: [
        { target: 'Ich gehe in das Kino.', rom: 'Ikh GAY-uh in das KEE-noh.', en: 'I am walking into the cinema.', parts: [p('Ich', 'S'), p('gehe', 'V'), p('in das Kino', 'O-ACC')] },
      ]
    },
    { id: 9, title: 'The Subjunctive II (Konjunktiv II)', level: 'B1', rule: 'würde + Infinitive',
      tip: 'Used for wishes, polite requests, and hypothetical conditions.',
      videoUrl: 'https://www.youtube.com/embed/FiZJe1NMccE',
      examples: [
        { target: 'Ich würde gerne reisen.', rom: 'Ikh VUER-deh GEHR-nuh RY-zen.', en: 'I would like to travel.', parts: [p('Ich', 'S'), p('würde reisen', 'V-SUBJ'), p('gerne', 'ADV')] },
      ]
    },
    { id: 10, title: 'Relative Clauses (Relativsätze)', level: 'B1', rule: 'Noun + relative pronoun (der/die/das/etc.) + verb at the end',
      tip: 'The relative pronoun matches the gender of the noun but takes the case from its role in the relative clause.',
      videoUrl: 'https://www.youtube.com/embed/sHtLxUax7Qc',
      examples: [
        { target: 'Der Mann, den ich sehe.', rom: 'Dehr Mann, dehn ikh ZEH-uh.', en: 'The man whom I see.', parts: [p('Der Mann', 'N'), p('den', 'REL-ACC'), p('ich', 'S'), p('sehe', 'V')] },
      ]
    },
    { id: 11, title: 'Passive Voice (Passiv)', level: 'B1', rule: 'werden + past participle',
      tip: 'Focuses on the action rather than the actor.',
      videoUrl: 'https://www.youtube.com/embed/43m6-wQuaGo',
      examples: [
        { target: 'Das Buch wird gelesen.', rom: 'Das Bookh virt geh-LAY-zen.', en: 'The book is being read.', parts: [p('Das Buch', 'S'), p('wird gelesen', 'V-PASS')] },
      ]
    },
    { id: 12, title: 'Infinitives with "zu"', level: 'B1', rule: 'Main clause + zu + Infinitive',
      tip: 'Used after certain verbs, adjectives, and nouns.',
      videoUrl: 'https://www.youtube.com/embed/o39BeYG8pnA',
      examples: [
        { target: 'Es ist schwer zu lernen.', rom: 'Es ist shvayr tsoo LEHR-nen.', en: 'It is difficult to learn.', parts: [p('Es ist schwer', 'CL'), p('zu lernen', 'INF-ZU')] },
      ]
    },
    { id: 13, title: 'Past Perfect (Plusquamperfekt)', level: 'B1', rule: 'hatte/war + past participle',
      tip: 'Used to show an action occurred before another past event.',
      videoUrl: 'https://www.youtube.com/embed/nkagdTprcHU',
      examples: [
        { target: 'Ich hatte gegessen.', rom: 'Ikh HAT-teh geh-GAY-sen.', en: 'I had eaten.', parts: [p('Ich', 'S'), p('hatte gegessen', 'V-PPERF')] },
      ]
    },
    { id: 14, title: 'Passive Voice in Past (Passiv Präteritum)', level: 'B1', rule: 'wurde + past participle',
      tip: 'Focuses on a past action being completed on a subject.',
      videoUrl: 'https://www.youtube.com/embed/i34ICN0PzJY',
      examples: [
        { target: 'Das Buch wurde geschrieben.', rom: 'Das Bookh VOOR-deh geh-SHREE-ben.', en: 'The book was written.', parts: [p('Das Buch', 'S'), p('wurde geschrieben', 'V-PASS-PAST')] },
      ]
    },
    { id: 15, title: 'Future Tense (Futur I)', level: 'A2', rule: 'werden + infinitive',
      tip: 'Expresses future actions, intentions, or assumptions.',
      videoUrl: 'https://www.youtube.com/embed/IGC-ciq2yso',
      examples: [
        { target: 'Ich werde morgen kommen.', rom: 'Ikh VEHR-deh mor-gen KOM-men.', en: 'I will come tomorrow.', parts: [p('Ich', 'S'), p('werde kommen', 'V-FUT'), p('morgen', 'ADV')] },
      ]
    },
    { id: 16, title: "Concessive Clauses with \'obwohl\' (Although)", level: 'A2', rule: 'obwohl + subject + conjugated verb at end',
      tip: 'Expresses a contrast or concession, sending the verb to the end.',
      videoUrl: 'https://www.youtube.com/embed/BfNkj6Xw454',
      examples: [
        { target: 'Obwohl es regnet, gehe ich.', rom: 'Op-VOHL es REG-net, GAY-uh ikh.', en: 'Although it is raining, I am going.', parts: [p('Obwohl', 'CONJ'), p('es', 'S'), p('regnet', 'V1'), p('gehe ich', 'CL')] },
      ]
    },
  ],
  ja: [
    { id: 1, title: 'Verb at End (SOV)', level: 'N5', rule: 'Subject + Object + Verb',
      tip: 'Japanese is Subject-Object-Verb. The verb always comes at the end of the sentence.',
      videoUrl: 'https://www.youtube.com/embed/6A-TITNPO_U',
      examples: [
        { target: '私はりんごを食べます。', rom: 'Watashi wa ringo o tabemasu.', en: 'I eat an apple.', parts: [p('私は', 'S'), p('りんごを', 'O'), p('食べます', 'V')] },
      ]
    },
    { id: 2, title: 'は (wa) Topic Marker', level: 'N5', rule: 'Topic + は + Comment',
      tip: 'は marks the topic of the sentence — what the sentence is about.',
      videoUrl: 'https://www.youtube.com/embed/mTws1GwXcx8',
      examples: [
        { target: 'これは本です。', rom: 'Kore wa hon desu.', en: 'This is a book.', parts: [p('これ', 'S'), p('は', 'TOP'), p('本', 'O'), p('です', 'V')] },
      ]
    },
    { id: 3, title: 'Negation with ない/ません', level: 'N5', rule: 'Verb stem + ません (polite negative)',
      tip: 'To negate a verb in polite speech, replace -ます with -ません.',
      videoUrl: 'https://www.youtube.com/embed/ZPxcBRohW4M',
      examples: [
        { target: '私は肉を食べません。', rom: 'Watashi wa niku o tabemasen.', en: "I don't eat meat.", parts: [p('私は', 'S'), p('肉を', 'O'), p('食べません', 'V-NEG')] },
      ]
    },
    { id: 4, title: 'て-form for Sequences', level: 'N4', rule: 'Verb-て + next verb',
      tip: 'The て-form connects actions in sequence, like "and then" in English.',
      videoUrl: 'https://www.youtube.com/embed/udmzxXjOIEY',
      examples: [
        { target: '起きて、食べます。', rom: 'Okite, tabemasu.', en: 'I wake up and then eat.', parts: [p('起きて', 'V1-て'), p('食べます', 'V2')] },
      ]
    },
    { id: 5, title: 'Conditional: たら', level: 'N4', rule: 'Verb-たら = "if/when" condition',
      tip: 'たら expresses a condition or sequence. Add たら to the ta-form of a verb.',
      videoUrl: 'https://www.youtube.com/embed/ocZfV_3gAM0',
      examples: [
        { target: '家に帰ったら、電話してください。', rom: 'Ie ni kaettara, denwa shite kudasai.', en: 'When you get home, please call me.', parts: [p('帰ったら', 'COND'), p('速度して', 'V'), p('ください', 'POL')] },
      ]
    },
    { id: 6, title: 'The Object Marker を (o/wo)', level: 'N5', rule: 'Noun + を + Transitive Verb',
      tip: 'を marks the direct object of a transitive verb.',
      videoUrl: 'https://www.youtube.com/embed/3b29dqY8pMY',
      examples: [
        { target: '水を飲みます。', rom: 'Mizu o nomimasu.', en: 'I drink water.', parts: [p('水', 'N'), p('を', 'OBJ'), p('飲みます', 'V')] },
      ]
    },
    { id: 7, title: 'Polite Requests: 〜てください', level: 'N5', rule: 'Verb-て + ください',
      tip: 'Used to politely ask someone to do something.',
      videoUrl: 'https://www.youtube.com/embed/N_o2oLqjET8',
      examples: [
        { target: '日本語 de 話してください。', rom: 'Nihongo de hanashite kudasai.', en: 'Please speak in Japanese.', parts: [p('日本語で', 'O'), p('話して', 'V-て'), p('ください', 'POL')] },
      ]
    },
    { id: 8, title: 'Expressing Desires: 〜たい', level: 'N5', rule: 'Verb stem + たい',
      tip: 'Replace -ます with -たい to express wanting to do an action.',
      videoUrl: 'https://www.youtube.com/embed/XBVXcrrlaDM',
      examples: [
        { target: '寿司を食べたいです。', rom: 'Sushi o tabetai desu.', en: 'I want to eat sushi.', parts: [p('寿司を', 'O'), p('食べたい', 'V-WANT'), p('です', 'POL')] },
      ]
    },
    { id: 9, title: 'The Potential Form', level: 'N4', rule: 'Group 1: u -> e + ru | Group 2: ru -> rareru',
      tip: 'Indicates ability or possibility to perform an action.',
      videoUrl: 'https://www.youtube.com/embed/Z2UITYrsCPc',
      examples: [
        { target: '日本語が话せます。', rom: 'Nihongo ga hanasemasu.', en: 'I can speak Japanese.', parts: [p('日本語が', 'O'), p('話せます', 'V-POT')] },
      ]
    },
    { id: 10, title: 'Giving and Receiving: 〜てあげる / 〜てもらう / 〜てくれる', level: 'N4', rule: 'Verb-te + ageru/morau/kureru',
      tip: 'Expresses acts of giving and receiving favors or services.',
      videoUrl: 'https://www.youtube.com/embed/bXkMdHOlvpw',
      examples: [
        { target: '本を買ってくれました。', rom: 'Hon o katte kuremashita.', en: 'They bought a book for me.', parts: [p('本を', 'O'), p('買ってくれました', 'V-FAVOR')] },
      ]
    },
    { id: 11, title: 'The Passive Form: 〜られる', level: 'N4', rule: 'Group 1: u -> a + reru | Group 2: ru -> rareru',
      tip: 'Used to express passive action, often with a nuance of annoyance.',
      videoUrl: 'https://www.youtube.com/embed/s100KM9yrT8',
      examples: [
        { target: '雨に降られました。', rom: 'Ame ni furaremashita.', en: 'I was rained on.', parts: [p('雨に', 'AGENT'), p('降られました', 'V-PASS')] },
      ]
    },
    { id: 12, title: 'The Causative Form: 〜させる', level: 'N3', rule: 'Group 1: u -> a + seru | Group 2: ru -> saseru',
      tip: 'Used to express making or letting someone do an action.',
      videoUrl: 'https://www.youtube.com/embed/z4nYkPJ-J68',
      examples: [
        { target: '子供に勉強させます。', rom: 'Kodomo ni benkyō sasemasu.', en: 'I make my child study.', parts: [p('子供に', 'AGENT'), p('勉強させます', 'V-CAUS')] },
      ]
    },
    { id: 13, title: 'Volitional Form (Let\'s do...)', level: 'N4', rule: 'Group 1: u -> o-line + u | Group 2: ru -> yō',
      tip: 'Informal way of suggesting or inviting someone to do something.',
      videoUrl: 'https://www.youtube.com/embed/F_wxB8VVg3w',
      examples: [
        { target: '食べよう！', rom: 'Tabeyō!', en: 'Let\'s eat!', parts: [p('食べよう', 'V-VOL')] },
      ]
    },
    { id: 14, title: 'Expressing Conjecture: 〜でしょう', level: 'N5/N4', rule: 'Plain form + でしょう',
      tip: 'Used to express probability, conjecture, or polite suggestion.',
      videoUrl: 'https://www.youtube.com/embed/rWd6DmRyA7s',
      examples: [
        { target: '明日は雨でしょう。', rom: 'Ashita wa ame deshō.', en: 'It will probably rain tomorrow.', parts: [p('明日は', 'T'), p('雨', 'N'), p('でしょう', 'CONJEC')] },
      ]
    },
    { id: 15, title: 'Causative-Passive Form: 〜させられる', level: 'N3', rule: 'Verb causative stem + passive ending (rareru)',
      tip: 'Indicates being made/forced to do an action by someone else.',
      videoUrl: 'https://www.youtube.com/embed/vxOJ8vM_w4M',
      examples: [
        { target: '勉強させられました。', rom: 'Benkyō saseraremashita.', en: 'I was made to study.', parts: [p('勉強', 'N'), p('させられました', 'V-CAUS-PASS')] },
      ]
    },
    { id: 16, title: 'Respectful Keigo (Honorifics): 〜お〜になる', level: 'N3', rule: 'お + Verb stem + になる',
      tip: 'Standard way to elevate the action of a respected person.',
      videoUrl: 'https://www.youtube.com/embed/PQlCPExqEFw',
      examples: [
        { target: '先生がお書きになります。', rom: 'Sensei ga okaki ni narimasu.', en: 'The teacher writes.', parts: [p('先生が', 'S'), p('お書きになります', 'V-HON')] },
      ]
    },
  ],
  ko: [
    { id: 1, title: 'SOV Word Order', level: '초급', rule: 'Subject + Object + Verb',
      tip: 'Like Japanese, Korean is Subject-Object-Verb. The verb always comes last.',
      videoUrl: 'https://www.youtube.com/embed/Xl4NkeIksOQ',
      examples: [
        { target: '저는 밥을 먹어요.', rom: 'Jeoneun bab-eul meogeoyo.', en: 'I eat rice.', parts: [p('저는', 'S'), p('밥을', 'O'), p('먹어요', 'V')] },
      ]
    },
    { id: 2, title: 'Topic Marker 은/는', level: '초급', rule: 'Noun + 은(after consonant) / 는(after vowel)',
      tip: '은/는 marks the topic. Use 은 after a consonant, 는 after a vowel.',
      videoUrl: 'https://www.youtube.com/embed/fCxLNRLntc0',
      examples: [
        { target: '저는 학생이에요.', rom: 'Jeoneun haksaeng-ieyo.', en: 'I am a student (topic: I).', parts: [p('저는', 'TOPIC'), p('학생', 'O'), p('이에요', 'V')] },
      ]
    },
    { id: 3, title: 'Object Marker 을/를', level: '초급', rule: 'Noun + 을(consonant) / 를(vowel)',
      tip: '을/를 marks the direct object of a verb.',
      videoUrl: 'https://www.youtube.com/embed/Btq5KGFxuac',
      examples: [
        { target: '저는 물을 마셔요.', rom: 'Jeoneun mul-eul mashyeoyo.', en: 'I drink water.', parts: [p('저는', 'S'), p('물을', 'O-MARKER'), p('마셔요', 'V')] },
      ]
    },
    { id: 4, title: 'Polite Ending -아요/어요', level: '초급', rule: 'Verb stem + 아요 / 어요',
      tip: 'This is the standard polite present tense. Use 아요 if last vowel is ㅏ/ㅗ, otherwise 어요.',
      videoUrl: 'https://www.youtube.com/embed/r4TNuJYeJM8',
      examples: [
        { target: '저는 공부해요.', rom: 'Jeoneun gongbu-haeyo.', en: 'I study.', parts: [p('저는', 'S'), p('공부해요', 'V')] },
      ]
    },
    { id: 5, title: 'Honorific -시-', level: '중급', rule: 'Verb stem + (으)시 + ending',
      tip: 'Insert -시- into the verb to show respect toward the subject.',
      videoUrl: 'https://www.youtube.com/embed/tFNGSlIMr74',
      examples: [
        { target: '선생님이 오세요.', rom: 'Seonsaengnim-i oseyo.', en: 'The teacher is coming (respectful).', parts: [p('선생님이', 'S'), p('오세요', 'V-HON')] },
      ]
    },
    { id: 6, title: 'Subject Marker 이/가', level: '초급', rule: 'Noun + 이(consonant) / 가(vowel)',
      tip: 'Unlike topic markers, 이/가 focuses on the subject performing the action.',
      videoUrl: 'https://www.youtube.com/embed/F8lFSt7SQMU',
      examples: [
        { target: '비가 와요.', rom: 'Bi-ga wayo.', en: 'It is raining.', parts: [p('비가', 'S-MARKER'), p('와요', 'V')] },
      ]
    },
    { id: 7, title: 'The Connective -고 (and)', level: '초급', rule: 'Verb stem + 고 + next clause',
      tip: 'Connects two verbs, adjectives, or clauses meaning "and".',
      videoUrl: 'https://www.youtube.com/embed/066-Wz5zLJc',
      examples: [
        { target: '먹고 가요.', rom: 'Meog-go gayo.', en: 'I eat and go.', parts: [p('먹고', 'V1-고'), p('가요', 'V2')] },
      ]
    },
    { id: 8, title: 'Expressing Ability: -(으)ㄹ 수 있다', level: '초급', rule: 'Verb stem + 을/ㄹ 수 있다 (can do)',
      tip: 'Means "can" or "be able to".',
      videoUrl: 'https://www.youtube.com/embed/jRXaP3JNg5Q',
      examples: [
        { target: '한국어를 할 수 있어요.', rom: 'Han-gug-eo-reul hal su isseoyo.', en: 'I can speak Korean.', parts: [p('한국어를', 'O'), p('할 수 있어요', 'V-CAN')] },
      ]
    },
    { id: 9, title: 'The Causative Ending -게 하다', level: '중급', rule: 'Verb stem + 게 하다',
      tip: 'Expresses making, letting, or causing someone to do an action.',
      videoUrl: 'https://www.youtube.com/embed/UcgkRYV_0H8',
      examples: [
        { target: '그를 웃게 했어요.', rom: 'Geu-reul ut-ge haesseoyo.', en: 'I made him laugh.', parts: [p('그를', 'O'), p('웃게 했어요', 'V-CAUS')] },
      ]
    },
    { id: 10, title: 'Hypothetical Condition: -(으)면', level: '초급', rule: 'Verb stem + 면(vowel) / 으면(consonant)',
      tip: 'Equivalent to "if" or "when" in English.',
      videoUrl: 'https://www.youtube.com/embed/r-Yd_j9yEwg',
      examples: [
        { target: '돈이 있으면 사요.', rom: 'Don-i isseumyeon sayo.', en: 'If I have money, I will buy it.', parts: [p('돈이', 'S'), p('있으면', 'V-COND'), p('사요', 'V2')] },
      ]
    },
    { id: 11, title: 'The Passive Form: -아/어지다', level: '중급', rule: 'Verb stem + 아/어지다',
      tip: 'Indicates that a subject is acted upon, or changes into a state.',
      videoUrl: 'https://www.youtube.com/embed/X-_9REIv0Wc',
      examples: [
        { target: '날씨가 따뜻해져요.', rom: 'Nalssi-ga ttatteuthae-jeoyo.', en: 'The weather is becoming warm.', parts: [p('날씨가', 'S'), p('따뜻해져요', 'V-PASS')] },
      ]
    },
    { id: 12, title: 'Expressing Intention: -(으)려고 하다', level: '초급', rule: 'Verb stem + 려고(vowel) / 으려고(consonant) 하다',
      tip: 'Expresses a plan, intention, or purpose to do something.',
      videoUrl: 'https://www.youtube.com/embed/RUdCw3OpEfc',
      examples: [
        { target: '공부하려고 해요.', rom: 'Gongbu-haryeogo haeyo.', en: 'I intend to study.', parts: [p('공부하려고 해요', 'V-INTENT')] },
      ]
    },
    { id: 13, title: 'The Past Perfect: -었었-/-았었-', level: '중급', rule: 'Verb stem + 었었/았었 + ending',
      tip: 'Used to express a past situation that is discontinued or completed far in the past.',
      videoUrl: 'https://www.youtube.com/embed/S7ht5xrk0-M',
      examples: [
        { target: '거기 갔었어요.', rom: 'Geogi gasseosseoyo.', en: 'I went there long ago.', parts: [p('거기', 'ADV'), p('갔었어요', 'V-PPERF')] },
      ]
    },
    { id: 14, title: 'Expressing Supposition: -(으)ㄹ 것 같다', level: '초급', rule: 'Verb/Adj + (으)ㄹ 것 같다',
      tip: 'Means "it seems like" or "I think it will...".',
      videoUrl: 'https://www.youtube.com/embed/jzCHqyKO0N4',
      examples: [
        { target: '비가 올 것 같아요.', rom: 'Bi-ga ol geot gat-ayo.', en: 'It seems like it will rain.', parts: [p('비가', 'S'), p('올 것 같아요', 'V-SUPPOSE')] },
      ]
    },
    { id: 15, title: 'The Retrospective Tense: -더라', level: '중급', rule: 'Verb stem + 더라',
      tip: 'Used when recalling or reporting a past experience directly observed.',
      videoUrl: 'https://www.youtube.com/embed/UhDcHOKosJI',
      examples: [
        { target: '그 영화 재미있더라.', rom: 'Geu yeonghwa jaemi-itdeora.', en: 'I recalled that movie was interesting.', parts: [p('그 영화', 'O'), p('재미있더라', 'V-RETRO')] },
      ]
    },
    { id: 16, title: 'Adverbial ending -ge', level: '초급', rule: 'Adj stem + 게',
      tip: 'Converts an adjective into an adverb (equivalent to -ly).',
      videoUrl: 'https://www.youtube.com/embed/xcgOV6leWaQ',
      examples: [
        { target: '빠르게 달리다.', rom: 'Ppa-reu-ge dallida.', en: 'To run quickly.', parts: [p('빠르게', 'ADV'), p('달리다', 'V')] },
      ]
    },
  ],
  it: [
    { id: 1, title: 'Essere & Avere', level: 'A1', rule: 'essere = to be | avere = to have',
      tip: '"Essere" and "avere" are the two core Italian verbs, used alone and as auxiliaries.',
      videoUrl: 'https://www.youtube.com/embed/rusOdHFJPfU',
      examples: [
        { target: 'Sono studente.', rom: 'SOH-noh stoo-DEN-teh.', en: 'I am a student.', parts: [p('Sono', 'V'), p('studente', 'O')] },
        { target: 'Ho un libro.', rom: 'Oh oon LEE-broh.', en: 'I have a book.', parts: [p('Ho', 'V'), p('un libro', 'O')] },
      ]
    },
    { id: 2, title: 'Gender & Articles', level: 'A1', rule: 'il/un (m.) | la/una (f.)',
      tip: 'Italian nouns are masculine or feminine. Articles must agree.',
      videoUrl: 'https://www.youtube.com/embed/itqVP8hWcAk',
      examples: [
        { target: 'il ragazzo / la ragazza', rom: 'eel rah-GAT-tsoh / lah rah-GAT-tsah.', en: 'the boy / the girl', parts: [p('il', 'ART-M'), p('ragazzo', 'N'), p('la', 'ART-F'), p('ragazza', 'N')] },
      ]
    },
    { id: 3, title: 'Present Tense -ARE', level: 'A1', rule: 'parlare → parlo / parli / parla',
      tip: 'Drop -are and add: -o, -i, -a, -iamo, -ate, -ano.',
      videoUrl: 'https://www.youtube.com/embed/wVWJGLvlI0k',
      examples: [
        { target: 'Io parlo italiano.', rom: 'Ee-oh PAR-loh ee-tahl-YAH-noh.', en: 'I speak Italian.', parts: [p('Io', 'S'), p('parlo', 'V'), p('italiano', 'O')] },
      ]
    },
    { id: 4, title: 'Negation with non', level: 'A1', rule: 'non + verb',
      tip: 'Simply place "non" before the verb to negate it.',
      videoUrl: 'https://www.youtube.com/embed/Ab7JoQmJfzw',
      examples: [
        { target: 'Non capisco.', rom: 'Non kah-PEES-koh.', en: "I don't understand.", parts: [p('Non', 'NEG'), p('capisco', 'V')] },
      ]
    },
    { id: 5, title: 'Adjective Agreement', level: 'A2', rule: 'Adjectives agree with noun in gender/number',
      tip: 'Add -a for feminine singular, -i for masculine plural, -e for feminine plural.',
      videoUrl: 'https://www.youtube.com/embed/cSFclSKrISQ',
      examples: [
        { target: 'Il libro è interessante.', rom: 'Eel LEE-broh eh een-teh-res-SAN-teh.', en: 'The book is interesting.', parts: [p('Il libro', 'S'), p('è', 'V'), p('interessante', 'ADJ')] },
      ]
    },
    { id: 6, title: 'Passato Prossimo (Past Tense)', level: 'A2', rule: 'essere/avere + past participle (-ato, -uto, -ito)',
      tip: 'Used for completed actions in the past.',
      videoUrl: 'https://www.youtube.com/embed/cWXIFVEnBhg',
      examples: [
        { target: 'Ho mangiato una mela.', rom: 'Oh mahn-JAH-toh oo-nah MEH-lah.', en: 'I ate an apple.', parts: [p('Ho mangiato', 'V-PAST'), p('una mela', 'O')] },
      ]
    },
    { id: 7, title: 'Direct Object Pronouns', level: 'A2', rule: 'Pronoun + Verb',
      tip: 'Object pronouns go before the conjugated verb.',
      videoUrl: 'https://www.youtube.com/embed/A9XWCP0dne4',
      examples: [
        { target: 'Ti vedo.', rom: 'Tee VEH-doh.', en: 'I see you.', parts: [p('Ti', 'OBJ'), p('vedo', 'V')] },
      ]
    },
    { id: 8, title: 'The Imperfect Tense (Imperfetto)', level: 'A2', rule: 'Verb stem + -avo, -evi, -ivo',
      tip: 'Used for habits, descriptions, and ongoing states in the past.',
      videoUrl: 'https://www.youtube.com/embed/Vq-U6JHVcJY',
      examples: [
        { target: 'Da bambino giocavo sempre.', rom: 'Dah bahm-BEE-noh joh-CAH-voh SEM-preh.', en: 'As a child, I always used to play.', parts: [p('Da bambino', 'ADV'), p('giocavo', 'V-IMP'), p('sempre', 'ADV')] },
      ]
    },
    { id: 9, title: 'The Subjunctive Mood (Congiuntivo Presente)', level: 'B1/B2', rule: 'che + Subject + Subjunctive Verb',
      tip: 'Used to express doubt, hope, emotion, opinion, or desire in subordinate clauses.',
      videoUrl: 'https://www.youtube.com/embed/a77ShLMFFSI',
      examples: [
        { target: 'Spero che tu stia bene.', rom: 'SPEH-roh keh too STEE-ah BEH-neh.', en: 'I hope you are well.', parts: [p('Spero', 'V-HOPE'), p('che', 'CONJ'), p('tu', 'S'), p('stia', 'V-SUBJ'), p('bene', 'ADV')] },
      ]
    },
    { id: 10, title: 'The Future Tense (Futuro Semplice)', level: 'A2', rule: 'Infinitive stem + -rò, -rai, -rà, -remo, -rete, -ranno',
      tip: 'Used to express future actions, plans, or predictions.',
      videoUrl: 'https://www.youtube.com/embed/Te4orugkJCE',
      examples: [
        { target: 'Partirò domani.', rom: 'Par-tee-ROH doh-MAH-nee.', en: 'I will leave tomorrow.', parts: [p('Partirò', 'V-FUT'), p('domani', 'ADV')] },
      ]
    },
    { id: 11, title: 'Double Object Pronouns', level: 'B1', rule: 'Indirect pronoun + direct pronoun + verb',
      tip: 'When combining indirect and direct pronouns, the indirect pronoun changes its ending to -e.',
      videoUrl: 'https://www.youtube.com/embed/ff9u4vx5GzA',
      examples: [
        { target: 'Me lo dà.', rom: 'Meh lo dah.', en: 'He gives it to me.', parts: [p('Me', 'PRON-IND'), p('lo', 'PRON-DIR'), p('dà', 'V')] },
      ]
    },
    { id: 12, title: 'The Conditional Mood (Condizionale Presente)', level: 'A2', rule: 'Infinitive stem + -rei, -resti, -rebbe, -remmo, -reste, -rebbero',
      tip: 'Used to express polite requests, wishes, hypothetical situations, or advice.',
      videoUrl: 'https://www.youtube.com/embed/Htvq35lz1Yc',
      examples: [
        { target: 'Vorrei un caffè.', rom: 'Vor-RAY oon caf-FEH.', en: 'I would like a coffee.', parts: [p('Vorrei', 'V-COND'), p('un caffè', 'O')] },
      ]
    },
    { id: 13, title: 'The Past Perfect (Trapassato Prossimo)', level: 'B1', rule: 'imperfetto auxiliary + past participle',
      tip: 'Used to describe an action completed before another past action.',
      videoUrl: 'https://www.youtube.com/embed/0FFi-v92uqY',
      examples: [
        { target: 'Avevo mangiato.', rom: 'Ah-VEH-voh mahn-JAH-toh.', en: 'I had eaten.', parts: [p('Avevo mangiato', 'V-PPERF')] },
      ]
    },
    { id: 14, title: "Relative Pronouns \'cui\' (which/whom)", level: 'B2', rule: 'preposition + cui',
      tip: 'Used after prepositions (e.g. con cui = with which, di cui = of which).',
      videoUrl: 'https://www.youtube.com/embed/VYNsdj8LFHU',
      examples: [
        { target: 'La ragazza di cui parli.', rom: 'Lah rah-GAT-tsah dee cooy PAR-lee.', en: 'The girl of whom you speak.', parts: [p('La ragazza', 'N'), p('di cui', 'REL'), p('parli', 'V')] },
      ]
    },
    { id: 15, title: 'The Future Perfect (Futuro Anteriore)', level: 'B2', rule: 'future auxiliary + past participle',
      tip: 'Expresses an action that will have been completed before another future action.',
      videoUrl: 'https://www.youtube.com/embed/XbG6UrT1sNI',
      examples: [
        { target: 'Quando avrò finito, uscirò.', rom: 'CWAHN-doh ah-VROH fee-NEE-toh, oo-shee-ROH.', en: 'When I have finished, I will go out.', parts: [p('Quando', 'CONJ'), p('avrò finito', 'V-FUT-PERF'), p('uscirò', 'V')] },
      ]
    },
    { id: 16, title: 'Subjunctive Past (Congiuntivo Passato)', level: 'B2', rule: 'subjunctive present auxiliary + past participle',
      tip: 'Expresses a past action in a subordinate clause requiring the subjunctive.',
      videoUrl: 'https://www.youtube.com/embed/dKcsjcx0jNQ',
      examples: [
        { target: 'Spero che tu abbia capito.', rom: 'SPEH-roh keh too AB-byah kah-PEE-toh.', en: 'I hope that you understood.', parts: [p('Spero', 'V1'), p('che', 'CONJ'), p('tu', 'S'), p('abbia capito', 'V-SUBJ-PAST')] },
      ]
    },
  ],
  en: [
    { id: 1, title: 'Simple Present Tense', level: 'A1', rule: 'I/you/we/they + base | he/she/it + -s',
      tip: 'The third-person singular adds -s or -es to the verb.',
      videoUrl: 'https://www.youtube.com/embed/nvVdIJ0las0',
      examples: [
        { target: 'She speaks English.', rom: 'Shee SPEEKS ING-glish.', en: 'She speaks English.', parts: [p('She', 'S'), p('speaks', 'V'), p('English', 'O')] },
      ]
    },
    { id: 2, title: 'Present Continuous', level: 'A1', rule: 'am/is/are + verb-ing',
      tip: 'Use present continuous for actions happening right now.',
      videoUrl: 'https://www.youtube.com/embed/rFdhrR6Dpco',
      examples: [
        { target: 'I am studying now.', rom: 'Ay am STOO-dee-ing now.', en: 'I am studying now.', parts: [p('I', 'S'), p('am studying', 'V-CONT'), p('now', 'T')] },
      ]
    },
    { id: 3, title: 'Yes/No Questions', level: 'A1', rule: 'Do/Does + subject + base verb?',
      tip: 'Use "do" (I/you/we/they) or "does" (he/she/it) to form questions.',
      videoUrl: 'https://www.youtube.com/embed/YIkewDhlSwQ',
      examples: [
        { target: 'Do you speak French?', rom: 'Doo yoo SPEEK French?', en: 'Do you speak French?', parts: [p('Do', 'AUX'), p('you', 'S'), p('speak', 'V'), p('French', 'O')] },
      ]
    },
    { id: 4, title: 'Past Simple', level: 'A2', rule: 'Regular: verb + -ed | Irregular: memorise',
      tip: 'Most verbs add -ed for past tense, but many common verbs are irregular.',
      videoUrl: 'https://www.youtube.com/embed/dmJrYbDjxQY',
      examples: [
        { target: 'I went to the market yesterday.', rom: 'Ay WENT too thuh MAR-kit YES-ter-day.', en: 'I went to the market yesterday.', parts: [p('I', 'S'), p('went', 'V-PAST'), p('to the market', 'O'), p('yesterday', 'T')] },
      ]
    },
    { id: 5, title: 'Modal Verbs', level: 'A2', rule: 'can / will / should / must + base verb',
      tip: 'Modal verbs never change form. The main verb stays in its base form.',
      videoUrl: 'https://www.youtube.com/embed/36wG9pSYu7Q',
      examples: [
        { target: 'You should practise every day.', rom: 'Yoo SHUD PRAK-tis EV-ree day.', en: 'You should practise every day.', parts: [p('You', 'S'), p('should', 'MOD'), p('practise', 'V'), p('every day', 'T')] },
      ]
    },
    { id: 6, title: 'Present Perfect Tense', level: 'B1', rule: 'have/has + past participle',
      tip: 'Connects the past to the present (e.g. actions started in past and continuing now).',
      videoUrl: 'https://www.youtube.com/embed/CNC0ocQ4bgM',
      examples: [
        { target: 'I have lived here for five years.', rom: 'Ay hav livd heer for fyv yeerz.', en: 'I have lived here for five years.', parts: [p('I', 'S'), p('have lived', 'V-PERF'), p('here', 'ADV'), p('for five years', 'T')] },
      ]
    },
    { id: 7, title: 'Passive Voice', level: 'B1', rule: 'Subject + to be + past participle',
      tip: 'Used when the focus is on the action or the receiver, not who does it.',
      videoUrl: 'https://www.youtube.com/embed/1GgTD_69JXg',
      examples: [
        { target: 'The cake was eaten.', rom: 'Thuh keyk woz ee-tuhn.', en: 'The cake was eaten.', parts: [p('The cake', 'O'), p('was eaten', 'V-PASS')] },
      ]
    },
    { id: 8, title: 'First Conditional', level: 'A2', rule: 'If + simple present, will + base verb',
      tip: 'Expresses real or possible future situations.',
      videoUrl: 'https://www.youtube.com/embed/s59ygVYxpag',
      examples: [
        { target: 'If it rains, we will stay home.', rom: 'If it reynz, wee wil stey hohm.', en: 'If it rains, we will stay home.', parts: [p('If it rains', 'COND'), p('we', 'S'), p('will stay', 'V-FUTURE'), p('home', 'ADV')] },
      ]
    },
    { id: 9, title: 'Second Conditional', level: 'B1', rule: 'If + past simple, would + base verb',
      tip: 'Used for imaginary or highly unlikely present/future situations.',
      videoUrl: 'https://www.youtube.com/embed/71u-NoY4Ag8',
      examples: [
        { target: 'If I won the lottery, I would travel.', rom: 'If Ay wun thuh lot-uh-ree, Ay wud trav-uhl.', en: 'If I won the lottery, I would travel.', parts: [p('If I won the lottery', 'COND'), p('I would travel', 'RESULT')] },
      ]
    },
    { id: 10, title: 'Third Conditional', level: 'B2', rule: 'If + past perfect, would have + past participle',
      tip: 'Expresses hypothetical situations in the past that did not happen.',
      videoUrl: 'https://www.youtube.com/embed/x1SImmUuytg',
      examples: [
        { target: 'If you had studied, you would have passed.', rom: 'If yoo had stoo-deed, yoo wud hav past.', en: 'If you had studied, you would have passed.', parts: [p('If you had studied', 'COND'), p('you would have passed', 'RESULT')] },
      ]
    },
    { id: 11, title: 'Relative Clauses', level: 'B1', rule: 'Noun + who/which/that + relative clause',
      tip: 'Use who for people, which for things. That is used only in defining relative clauses.',
      videoUrl: 'https://www.youtube.com/embed/eFmfoeTkhH0',
      examples: [
        { target: 'The book which I bought is good.', rom: 'Thuh book wich Ay bawt iz gud.', en: 'The book which I bought is good.', parts: [p('The book', 'N'), p('which', 'REL'), p('I bought', 'CL'), p('is good', 'V')] },
      ]
    },
    { id: 12, title: 'Gerund vs. Infinitive', level: 'B1', rule: 'Verb + verb-ing OR Verb + to-infinitive',
      tip: 'Some verbs are followed by gerunds (e.g. enjoy, avoid), some by infinitives (e.g. want, decide).',
      videoUrl: 'https://www.youtube.com/embed/-s1gu725tA4',
      examples: [
        { target: 'I enjoy reading books.', rom: 'Ay en-joy REE-ding books.', en: 'I enjoy reading books.', parts: [p('I', 'S'), p('enjoy', 'V'), p('reading books', 'GER-O')] },
      ]
    },
    { id: 13, title: 'Passive Voice in Continuous Tenses', level: 'B2', rule: 'subject + is/are/was/were + being + past participle',
      tip: 'Used for actions in progress being acted upon a subject.',
      videoUrl: 'https://www.youtube.com/embed/N7uvEllP5Jg',
      examples: [
        { target: 'The house is being painted.', rom: 'Thuh house iz bee-ing peyn-tid.', en: 'The house is being painted.', parts: [p('The house', 'O'), p('is being painted', 'V-PASS-CONT')] },
      ]
    },
    { id: 14, title: 'Reported Speech (Tense Backshift)', level: 'B1', rule: 'present -> past | past -> past perfect | will -> would',
      tip: 'When reporting someone\'s words in the past, shift the original verb tense back.',
      videoUrl: 'https://www.youtube.com/embed/eplQBhE0-Hg',
      examples: [
        { target: 'He said he was tired.', rom: 'Hee sed hee woz ty-erd.', en: 'He said he was tired.', parts: [p('He said', 'REPORT'), p('he was tired', 'CL')] },
      ]
    },
    { id: 15, title: 'Future Continuous', level: 'B1', rule: 'will + be + verb-ing',
      tip: 'Used to describe actions that will be in progress at a specific time in the future.',
      videoUrl: 'https://www.youtube.com/embed/H5UD03yKfVI',
      examples: [
        { target: 'I will be studying at eight.', rom: 'Ay wil bee STOO-dee-ing at eyt.', en: 'I will be studying at eight.', parts: [p('I', 'S'), p('will be studying', 'V-FUT-CONT'), p('at eight', 'T')] },
      ]
    },
    { id: 16, title: 'Wish Clauses', level: 'B1/B2', rule: 'wish + past simple (present wish) / wish + past perfect (past regret)',
      tip: 'Expresses desires for things to be different than they are or were.',
      videoUrl: 'https://www.youtube.com/embed/-vefS0B1DIY',
      examples: [
        { target: 'I wish I were there.', rom: 'Ay wish Ay wer thair.', en: 'I wish I were there.', parts: [p('I wish', 'EXP'), p('I were there', 'CL')] },
      ]
    },
  ],
  ar: [
    { id: 1, title: 'Subject-Verb-Object (SVO)', level: 'A1', rule: 'Subject + Verb + Object',
      tip: 'Standard Arabic often uses Verb-Subject-Object (VSO), but SVO is also widely used in Modern Standard Arabic and dialects.',
      videoUrl: 'https://www.youtube.com/embed/05SOrkbyhjM',
      examples: [
        { target: 'أنا أدرس اللغة العربية.', rom: "Ana adrusu al-lughah al-'arabiyyah.", en: 'I study the Arabic language.', parts: [p('أنا', 'S'), p('أدرس', 'V'), p('اللغة العربية', 'O')] },
      ]
    },
    { id: 2, title: 'Noun-Adjective Agreement', level: 'A1', rule: 'Noun + Adjective',
      tip: 'In Arabic, adjectives come after the noun they modify and agree in gender, number, and definiteness.',
      videoUrl: 'https://www.youtube.com/embed/sSA0JrrgB5o',
      examples: [
        { target: 'الكتاب الجديد مفيد.', rom: 'Al-kitab al-jadid mufid.', en: 'The new book is useful.', parts: [p('الكتاب', 'N'), p('الجديد', 'ADJ'), p('مفيد', 'PRED')] },
      ]
    },
    { id: 3, title: 'Negation with لا', level: 'A1', rule: 'لا + Verb',
      tip: 'Place لا (la) before a present tense verb to negate it.',
      videoUrl: 'https://www.youtube.com/embed/Y80KljpmjJs',
      examples: [
        { target: 'أنا لا أشرب القهوة.', rom: 'Ana la ashrabu al-qahwah.', en: 'I do not drink coffee.', parts: [p('أنا', 'S'), p('لا', 'NEG'), p('أشرب', 'V'), p('القهوة', 'O')] },
      ]
    },
    { id: 4, title: 'Definite Article ال', level: 'A1', rule: 'ال + Noun',
      tip: 'The definite article ال (al-) is prefixed directly to the noun.',
      videoUrl: 'https://www.youtube.com/embed/CJO1qnEI5SY',
      examples: [
        { target: 'البيت كبير.', rom: 'Al-baytu kabir.', en: 'The house is big.', parts: [p('البيت', 'N-DEF'), p('كبير', 'ADJ')] },
      ]
    },
    { id: 5, title: 'Possessive Pronoun Suffixes', level: 'A2', rule: 'Noun + Pronoun Suffix',
      tip: 'Possession is indicated by adding a pronoun suffix to the end of the noun.',
      videoUrl: 'https://www.youtube.com/embed/yJh_Rz9cYyI',
      examples: [
        { target: 'هذا كتابي.', rom: 'Hada kitabi.', en: 'This is my book.', parts: [p('هذا', 'DEM'), p('كتابي', 'N-POSS')] },
      ]
    },
    { id: 6, title: 'The Nominal Sentence (الجملة الاسمية)', level: 'A1', rule: 'Subject (Mubtada) + Predicate (Khabar)',
      tip: 'A sentence starting with a noun. It does not require a verb "to be" in the present tense.',
      videoUrl: 'https://www.youtube.com/embed/sU19ybMqoy4',
      examples: [
        { target: 'الولد ذكي.', rom: 'Al-waladu dakiyy.', en: 'The boy is smart.', parts: [p('الولد', 'S'), p('ذكي', 'PRED')] },
      ]
    },
    { id: 7, title: 'Future Tense with sa- or sawfa', level: 'A2', rule: 'sa- / sawfa + Present Verb',
      tip: 'Prefix sa- for near future, or use sawfa before the verb for distant future.',
      videoUrl: 'https://www.youtube.com/embed/mqYyvoLbyu8',
      examples: [
        { target: 'سأدرس غداً.', rom: 'Sa-adrusu ghadan.', en: 'I will study tomorrow.', parts: [p('سأدرس', 'V-FUT'), p('غداً', 'T')] },
      ]
    },
    { id: 8, title: 'Negation of Past Tense with lam', level: 'A2', rule: 'lam + Present Jussive Verb',
      tip: 'Negates actions in the past using the particle lam followed by the present tense verb.',
      videoUrl: 'https://www.youtube.com/embed/AQljO85_ZyU',
      examples: [
        { target: 'لم أذهب إلى المدرسة.', rom: 'Lam adhab ila al-madrasah.', en: 'I did not go to school.', parts: [p('لم أذهب', 'V-NEG'), p('إلى المدرسة', 'O')] },
      ]
    },
    { id: 9, title: 'The Verbal Sentence (الجملة الفعلية)', level: 'A1', rule: 'Verb (Fil) + Subject (Fail) + Object (Maful Bihi)',
      tip: 'In classic Arabic, sentences commonly start with the verb, and the verb agrees with the subject in gender only.',
      videoUrl: 'https://www.youtube.com/embed/rInk0BrPMk8',
      examples: [
        { target: 'كتب الطالب الدرس.', rom: 'Kataba at-talibu ad-darsa.', en: 'The student wrote the lesson.', parts: [p('كتب', 'V'), p('الطالب', 'S'), p('الدرس', 'O')] },
      ]
    },
    { id: 10, title: 'The Idafa Construction (الإضافة)', level: 'A2', rule: 'Noun 1 (indefinite) + Noun 2 (definite)',
      tip: 'Used to express possession or association (e.g. the book of the teacher). Noun 1 never takes al- or tanween.',
      videoUrl: 'https://www.youtube.com/embed/SRVv9xCmhMU',
      examples: [
        { target: 'كتاب المعلم جديد.', rom: 'Kitabu al-mu‘allimi jadid.', en: "The teacher's book is new.", parts: [p('كتاب المعلم', 'IDAF-N'), p('جديد', 'ADJ')] },
      ]
    },
    { id: 11, title: 'Negation of Present Tense with la vs. lam vs. lan', level: 'B1', rule: 'la + present (general) / lam + jussive (past) / lan + subjunctive (future)',
      tip: 'Different particles negate different times: la for present, lam for past, and lan for future.',
      videoUrl: 'https://www.youtube.com/embed/AQljO85_ZyU',
      examples: [
        { target: 'لن أسافر غداً.', rom: 'Lan usafira ghadan.', en: 'I will not travel tomorrow.', parts: [p('لن', 'NEG-FUT'), p('أسافر', 'V'), p('غداً', 'T')] },
      ]
    },
    { id: 12, title: 'Dual Form for Nouns and Verbs (المثنى)', level: 'A2', rule: 'Noun + an / ayn',
      tip: 'Arabic has a grammatical dual number (for two people/things). Add -an in nominative case.',
      videoUrl: 'https://www.youtube.com/embed/Odk9XA0SKdc',
      examples: [
        { target: 'هذان كتابان.', rom: 'Hadan kitabān.', en: 'These are two books.', parts: [p('هذان', 'DEM-DUAL'), p('كتابان', 'N-DUAL')] },
      ]
    },
    { id: 13, title: 'The Kana and its Sisters (كان وأخواتها)', level: 'B1', rule: 'kana + Subject (nominative) + Predicate (accusative)',
      tip: 'The verb كان (to be) changes the predicate of a nominal sentence to the accusative case.',
      videoUrl: 'https://www.youtube.com/embed/wqTDvbrD-2Y',
      examples: [
        { target: 'كان الولد ذكياً.', rom: 'Kana al-waladu dakiyy-an.', en: 'The boy was smart.', parts: [p('كان', 'AUX'), p('الولد', 'S'), p('ذكياً', 'PRED-ACC')] },
      ]
    },
    { id: 14, title: 'The Relative Pronouns (الذي / التي)', level: 'A2', rule: 'Noun (definite) + relative pronoun + relative clause',
      tip: 'Relative pronouns agree in gender and number with the noun they modify, and are only used if the noun is definite.',
      videoUrl: 'https://www.youtube.com/embed/jDIiem4Fztg',
      examples: [
        { target: 'الرجل الذي رأيته.', rom: 'Ar-rajulu alladī ra\'aytuhu.', en: 'The man whom I saw.', parts: [p('الرجل', 'N'), p('الذي', 'REL'), p('رأيته', 'CL')] },
      ]
    },
    { id: 15, title: 'Negation of Future with lan', level: 'B1', rule: 'lan + Present Subjunctive Verb',
      tip: 'Use lan directly before the present tense verb to negate future actions.',
      videoUrl: 'https://www.youtube.com/embed/AQljO85_ZyU',
      examples: [
        { target: 'لن أسافر غداً.', rom: 'Lan usāfira ghadan.', en: 'I will not travel tomorrow.', parts: [p('لن', 'NEG-FUT'), p('أسافر', 'V'), p('غداً', 'T')] },
      ]
    },
    { id: 16, title: 'Passive Voice (الفعل المبني للمجهول)', level: 'B2', rule: 'Past: fu\'ila / Present: yuf\'alu',
      tip: 'The passive verb is formed by changing the vowel sounds of the active verb.',
      videoUrl: 'https://www.youtube.com/embed/uwPdp5awuVk',
      examples: [
        { target: 'كُتِبَ الدرسُ.', rom: 'Kutiba ad-darsu.', en: 'The lesson was written.', parts: [p('كُتِبَ', 'V-PASS'), p('الدرسُ', 'S-DEPUTY')] },
      ]
    },
  ],
};

import i18n from '../services/i18n';

/** Legacy export */
export const GRAMMAR = ALL_GRAMMAR.zh;

export function getGrammar(lang: LanguageCode = 'zh'): GrammarRule[] {
  const grammar = ALL_GRAMMAR[lang] ?? ALL_GRAMMAR.zh;
  return grammar.map(g => ({
    ...g,
    title: i18n.t(g.title, g.title),
    rule: i18n.t(g.rule, g.rule),
    tip: g.tip ? i18n.t(g.tip, g.tip) : '',
    examples: g.examples.map(ex => ({
      ...ex,
      en: i18n.t(ex.en, ex.en)
    }))
  }));
}
