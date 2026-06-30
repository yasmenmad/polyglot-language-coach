import re
import os
import sys
import json
import urllib.request
import urllib.parse
import time

sys.stdout.reconfigure(encoding='utf-8')

lang_map = {
    'zh': 'Chinese',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'ja': 'Japanese',
    'ko': 'Korean',
    'it': 'Italian',
    'en': 'English',
    'ar': 'Arabic'
}

new_rules_data = {
    'zh': [
        """    { id: 13, title: 'The Emphatic 是...的 (shì...de) Structure', level: 'HSK 2', rule: 'Subject + 是 + Information + Verb + 的',
      tip: 'Emphasizes a specific detail (like time, place, or manner) about a past event.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_13',
      examples: [
        { target: '我是昨天来的。', rom: 'Wǒ shì zuótiān lái de.', en: 'It was yesterday that I came.', parts: [p('我', 'S'), p('是', 'SHI'), p('昨天', 'INFO'), p('来', 'V'), p('的', 'DE')] },
      ]
    }""",
        """    { id: 14, title: 'Expressing "Not only... but also..." with 不仅...而且...', level: 'HSK 3', rule: '不仅 + Clause 1, 而且 + Clause 2',
      tip: 'Links two related qualities or facts with rising intensity.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_14',
      examples: [
        { target: '她不仅聪明，而且很漂亮。', rom: 'Tā bùjǐn cōngmíng, érqiě hěn piàoliang.', en: 'She is not only smart, but also very beautiful.', parts: [p('她', 'S'), p('不仅', 'CONJ1'), p('聪明', 'ADJ1'), p('而且', 'CONJ2'), p('很漂亮', 'ADJ2')] },
      ]
    }""",
        """    { id: 15, title: 'The Rhetorical Question with 不是...吗？', level: 'HSK 3', rule: '不是 + Statement + 吗？',
      tip: 'Used to express surprise, rhetoric, or reminder (meaning "Isn\\'t it...?").',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_15',
      examples: [
        { target: '你不是学生吗？', rom: 'Nǐ búshì xuéshēng ma?', en: 'Aren\\'t you a student?', parts: [p('你', 'S'), p('不是', 'NEG'), p('学生', 'N'), p('吗', 'Q')] },
      ]
    }""",
        """    { id: 16, title: 'The Passive with 让 (ràng) or 叫 (jiào)', level: 'HSK 3', rule: 'Receiver + 让/叫 + Doer + Verb',
      tip: 'Similar to 被, but more common in informal spoken Chinese.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_16',
      examples: [
        { target: '自行车让弟弟骑走了。', rom: 'Zìxíngchē ràng dìdi qí zǒu le.', en: 'The bicycle was ridden away by little brother.', parts: [p('自行车', 'OBJ'), p('让', 'RANG'), p('弟弟', 'S'), p('骑走', 'V'), p('了', 'PART')] },
      ]
    }"""
    ],
    'es': [
        """    { id: 13, title: 'The Past Subjunctive with \\'si\\'', level: 'B2', rule: 'Si + Imperfect Subjunctive, Conditional',
      tip: 'Used for hypothetical situations in the present (e.g. If I won... I would...).',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_13',
      examples: [
        { target: 'Si ganara la lotería, viajaría.', rom: 'See gah-NAH-rah lah loh-teh-REE-ah, byah-hah-REE-ah.', en: 'If I won the lottery, I would travel.', parts: [p('Si', 'CONJ'), p('ganara', 'V-SUBJ'), p('la lotería', 'O'), p('viajaría', 'V-COND')] },
      ]
    }""",
        """    { id: 14, title: "Relative Pronoun \\'cuyo/cuya\\' (Whose)", level: 'C1', rule: 'Noun 1 + cuyo/cuya/cuyos/cuyas + Noun 2',
      tip: 'Translates to "whose" and agrees in gender and number with the noun that follows it.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_14',
      examples: [
        { target: 'El autor cuyo libro leí.', rom: 'El ow-TOR COO-yoh LEE-broh leh-EE.', en: 'The author whose book I read.', parts: [p('El autor', 'N1'), p('cuyo', 'REL'), p('libro', 'N2'), p('leí', 'V')] },
      ]
    }""",
        """    { id: 15, title: 'The Future Perfect (Futuro Compuesto)', level: 'B2', rule: 'habré / habrás / habrá + past participle',
      tip: 'Expresses an action that will have been completed before a point in the future.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_15',
      examples: [
        { target: 'Para mañana habré terminado.', rom: 'PAH-rah mah-NYAH-nah ah-BREH tehr-mee-NAH-doh.', en: 'By tomorrow I will have finished.', parts: [p('Para mañana', 'ADV'), p('habré terminado', 'V-FUT-PERF')] },
      ]
    }""",
        """    { id: 16, title: 'Subjunctive with Conjunctions of Time', level: 'B2', rule: 'Conjunction of time + Subjunctive (for future actions)',
      tip: 'When referring to future events, conjunctions of time like cuando trigger the subjunctive.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_16',
      examples: [
        { target: 'Cuando llegue, te llamaré.', rom: 'CWAHN-doh YEH-geh, teh yah-mah-REH.', en: 'When I arrive, I will call you.', parts: [p('Cuando', 'CONJ'), p('llegue', 'V-SUBJ'), p('te llamaré', 'V-FUT')] },
      ]
    }"""
    ],
    'fr': [
        """    { id: 13, title: 'The Conditional Perfect (Conditionnel Passé)', level: 'B2', rule: 'Conditionnel Present auxiliary + past participle',
      tip: 'Expresses regrets or past hypotheticals (e.g. I would have eaten).',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_13',
      examples: [
        { target: "J'aurais mangé.", rom: 'Zhoh-reh mahn-zhay.', en: 'I would have eaten.', parts: [p("J'aurais mangé", 'V-COND-PAST')] },
      ]
    }""",
        """    { id: 14, title: "Relative Pronoun \\'dont\\' (of which/whom)", level: 'B2', rule: 'Noun + dont + subject + verb',
      tip: 'Replaces a prepositional phrase starting with "de".',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_14',
      examples: [
        { target: 'Le livre dont tu parles.', rom: 'Luh leev-ruh dohn tyoo parl.', en: 'The book of which you speak.', parts: [p('Le livre', 'N'), p('dont', 'REL'), p('tu', 'S'), p('parles', 'V')] },
      ]
    }""",
        """    { id: 15, title: 'The Gerundive (Le Gérondif)', level: 'B1', rule: 'en + present participle (-ant)',
      tip: 'Expresses simultaneous action or means/manner (e.g. while eating, by studying).',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_15',
      examples: [
        { target: 'En mangeant, je lis.', rom: 'Ahn mahn-zhahn, zhuh lee.', en: 'While eating, I read.', parts: [p('En mangeant', 'GER'), p('je', 'S'), p('lis', 'V')] },
      ]
    }""",
        """    { id: 16, title: "Passive Voice with \\'faire\\' (Causative)", level: 'B2', rule: 'faire + infinitive',
      tip: 'Used when the subject has something done by someone else (e.g. to have/get something done).',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_16',
      examples: [
        { target: 'Je fais réparer ma voiture.', rom: 'Zhuh feh ray-pah-ray mah vwah-tyur.', en: 'I am getting my car repaired.', parts: [p('Je', 'S'), p('fais réparer', 'V-CAUS'), p('ma voiture', 'O')] },
      ]
    }"""
    ],
    'de': [
        """    { id: 13, title: 'Past Perfect (Plusquamperfekt)', level: 'B1', rule: 'hatte/war + past participle',
      tip: 'Used to show an action occurred before another past event.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_13',
      examples: [
        { target: 'Ich hatte gegessen.', rom: 'Ikh HAT-teh geh-GAY-sen.', en: 'I had eaten.', parts: [p('Ich', 'S'), p('hatte gegessen', 'V-PPERF')] },
      ]
    }""",
        """    { id: 14, title: 'Passive Voice in Past (Passiv Präteritum)', level: 'B1', rule: 'wurde + past participle',
      tip: 'Focuses on a past action being completed on a subject.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_14',
      examples: [
        { target: 'Das Buch wurde geschrieben.', rom: 'Das Bookh VOOR-deh geh-SHREE-ben.', en: 'The book was written.', parts: [p('Das Buch', 'S'), p('wurde geschrieben', 'V-PASS-PAST')] },
      ]
    }""",
        """    { id: 15, title: 'Future Tense (Futur I)', level: 'A2', rule: 'werden + infinitive',
      tip: 'Expresses future actions, intentions, or assumptions.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_15',
      examples: [
        { target: 'Ich werde morgen kommen.', rom: 'Ikh VEHR-deh mor-gen KOM-men.', en: 'I will come tomorrow.', parts: [p('Ich', 'S'), p('werde kommen', 'V-FUT'), p('morgen', 'ADV')] },
      ]
    }""",
        """    { id: 16, title: "Concessive Clauses with \\'obwohl\\' (Although)", level: 'A2', rule: 'obwohl + subject + conjugated verb at end',
      tip: 'Expresses a contrast or concession, sending the verb to the end.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_16',
      examples: [
        { target: 'Obwohl es regnet, gehe ich.', rom: 'Op-VOHL es REG-net, GAY-uh ikh.', en: 'Although it is raining, I am going.', parts: [p('Obwohl', 'CONJ'), p('es', 'S'), p('regnet', 'V1'), p('gehe ich', 'CL')] },
      ]
    }"""
    ],
    'ja': [
        """    { id: 13, title: 'Volitional Form (Let\\'s do...)', level: 'N4', rule: 'Group 1: u -> o-line + u | Group 2: ru -> yō',
      tip: 'Informal way of suggesting or inviting someone to do something.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_13',
      examples: [
        { target: '食べよう！', rom: 'Tabeyō!', en: 'Let\\'s eat!', parts: [p('食べよう', 'V-VOL')] },
      ]
    }""",
        """    { id: 14, title: 'Expressing Conjecture: 〜でしょう', level: 'N5/N4', rule: 'Plain form + でしょう',
      tip: 'Used to express probability, conjecture, or polite suggestion.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_14',
      examples: [
        { target: '明日は雨でしょう。', rom: 'Ashita wa ame deshō.', en: 'It will probably rain tomorrow.', parts: [p('明日は', 'T'), p('雨', 'N'), p('でしょう', 'CONJEC')] },
      ]
    }""",
        """    { id: 15, title: 'Causative-Passive Form: 〜させられる', level: 'N3', rule: 'Verb causative stem + passive ending (rareru)',
      tip: 'Indicates being made/forced to do an action by someone else.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_15',
      examples: [
        { target: '勉強させられました。', rom: 'Benkyō saseraremashita.', en: 'I was made to study.', parts: [p('勉強', 'N'), p('させられました', 'V-CAUS-PASS')] },
      ]
    }""",
        """    { id: 16, title: 'Respectful Keigo (Honorifics): 〜お〜になる', level: 'N3', rule: 'お + Verb stem + になる',
      tip: 'Standard way to elevate the action of a respected person.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_16',
      examples: [
        { target: '先生がお書きになります。', rom: 'Sensei ga okaki ni narimasu.', en: 'The teacher writes.', parts: [p('先生が', 'S'), p('お書きになります', 'V-HON')] },
      ]
    }"""
    ],
    'ko': [
        """    { id: 13, title: 'The Past Perfect: -었었-/-았었-', level: '중급', rule: 'Verb stem + 었었/았었 + ending',
      tip: 'Used to express a past situation that is discontinued or completed far in the past.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_13',
      examples: [
        { target: '거기 갔었어요.', rom: 'Geogi gasseosseoyo.', en: 'I went there long ago.', parts: [p('거기', 'ADV'), p('갔었어요', 'V-PPERF')] },
      ]
    }""",
        """    { id: 14, title: 'Expressing Supposition: -(으)ㄹ 것 같다', level: '초급', rule: 'Verb/Adj + (으)ㄹ 것 같다',
      tip: 'Means "it seems like" or "I think it will...".',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_14',
      examples: [
        { target: '비가 올 것 같아요.', rom: 'Bi-ga ol geot gat-ayo.', en: 'It seems like it will rain.', parts: [p('비가', 'S'), p('올 것 같아요', 'V-SUPPOSE')] },
      ]
    }""",
        """    { id: 15, title: 'The Retrospective Tense: -더라', level: '중급', rule: 'Verb stem + 더라',
      tip: 'Used when recalling or reporting a past experience directly observed.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_15',
      examples: [
        { target: '그 영화 재미있더라.', rom: 'Geu yeonghwa jaemi-itdeora.', en: 'I recalled that movie was interesting.', parts: [p('그 영화', 'O'), p('재미있더라', 'V-RETRO')] },
      ]
    }""",
        """    { id: 16, title: 'Adverbial ending -ge', level: '초급', rule: 'Adj stem + 게',
      tip: 'Converts an adjective into an adverb (equivalent to -ly).',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_16',
      examples: [
        { target: '빠르게 달리다.', rom: 'Ppa-reu-ge dallida.', en: 'To run quickly.', parts: [p('빠르게', 'ADV'), p('달리다', 'V')] },
      ]
    }"""
    ],
    'it': [
        """    { id: 13, title: 'The Past Perfect (Trapassato Prossimo)', level: 'B1', rule: 'imperfetto auxiliary + past participle',
      tip: 'Used to describe an action completed before another past action.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_13',
      examples: [
        { target: 'Avevo mangiato.', rom: 'Ah-VEH-voh mahn-JAH-toh.', en: 'I had eaten.', parts: [p('Avevo mangiato', 'V-PPERF')] },
      ]
    }""",
        """    { id: 14, title: "Relative Pronouns \\'cui\\' (which/whom)", level: 'B2', rule: 'preposition + cui',
      tip: 'Used after prepositions (e.g. con cui = with which, di cui = of which).',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_14',
      examples: [
        { target: 'La ragazza di cui parli.', rom: 'Lah rah-GAT-tsah dee cooy PAR-lee.', en: 'The girl of whom you speak.', parts: [p('La ragazza', 'N'), p('di cui', 'REL'), p('parli', 'V')] },
      ]
    }""",
        """    { id: 15, title: 'The Future Perfect (Futuro Anteriore)', level: 'B2', rule: 'future auxiliary + past participle',
      tip: 'Expresses an action that will have been completed before another future action.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_15',
      examples: [
        { target: 'Quando avrò finito, uscirò.', rom: 'CWAHN-doh ah-VROH fee-NEE-toh, oo-shee-ROH.', en: 'When I have finished, I will go out.', parts: [p('Quando', 'CONJ'), p('avrò finito', 'V-FUT-PERF'), p('uscirò', 'V')] },
      ]
    }""",
        """    { id: 16, title: 'Subjunctive Past (Congiuntivo Passato)', level: 'B2', rule: 'subjunctive present auxiliary + past participle',
      tip: 'Expresses a past action in a subordinate clause requiring the subjunctive.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_16',
      examples: [
        { target: 'Spero che tu abbia capito.', rom: 'SPEH-roh keh too AB-byah kah-PEE-toh.', en: 'I hope that you understood.', parts: [p('Spero', 'V1'), p('che', 'CONJ'), p('tu', 'S'), p('abbia capito', 'V-SUBJ-PAST')] },
      ]
    }"""
    ],
    'en': [
        """    { id: 13, title: 'Passive Voice in Continuous Tenses', level: 'B2', rule: 'subject + is/are/was/were + being + past participle',
      tip: 'Used for actions in progress being acted upon a subject.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_13',
      examples: [
        { target: 'The house is being painted.', rom: 'Thuh house iz bee-ing peyn-tid.', en: 'The house is being painted.', parts: [p('The house', 'O'), p('is being painted', 'V-PASS-CONT')] },
      ]
    }""",
        """    { id: 14, title: 'Reported Speech (Tense Backshift)', level: 'B1', rule: 'present -> past | past -> past perfect | will -> would',
      tip: 'When reporting someone\\'s words in the past, shift the original verb tense back.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_14',
      examples: [
        { target: 'He said he was tired.', rom: 'Hee sed hee woz ty-erd.', en: 'He said he was tired.', parts: [p('He said', 'REPORT'), p('he was tired', 'CL')] },
      ]
    }""",
        """    { id: 15, title: 'Future Continuous', level: 'B1', rule: 'will + be + verb-ing',
      tip: 'Used to describe actions that will be in progress at a specific time in the future.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_15',
      examples: [
        { target: 'I will be studying at eight.', rom: 'Ay wil bee STOO-dee-ing at eyt.', en: 'I will be studying at eight.', parts: [p('I', 'S'), p('will be studying', 'V-FUT-CONT'), p('at eight', 'T')] },
      ]
    }""",
        """    { id: 16, title: 'Wish Clauses', level: 'B1/B2', rule: 'wish + past simple (present wish) / wish + past perfect (past regret)',
      tip: 'Expresses desires for things to be different than they are or were.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_16',
      examples: [
        { target: 'I wish I were there.', rom: 'Ay wish Ay wer thair.', en: 'I wish I were there.', parts: [p('I wish', 'EXP'), p('I were there', 'CL')] },
      ]
    }"""
    ],
    'ar': [
        """    { id: 13, title: 'The Kana and its Sisters (كان وأخواتها)', level: 'B1', rule: 'kana + Subject (nominative) + Predicate (accusative)',
      tip: 'The verb كان (to be) changes the predicate of a nominal sentence to the accusative case.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_13',
      examples: [
        { target: 'كان الولد ذكياً.', rom: 'Kana al-waladu dakiyy-an.', en: 'The boy was smart.', parts: [p('كان', 'AUX'), p('الولد', 'S'), p('ذكياً', 'PRED-ACC')] },
      ]
    }""",
        """    { id: 14, title: 'The Relative Pronouns (الذي / التي)', level: 'A2', rule: 'Noun (definite) + relative pronoun + relative clause',
      tip: 'Relative pronouns agree in gender and number with the noun they modify, and are only used if the noun is definite.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_14',
      examples: [
        { target: 'الرجل الذي رأيته.', rom: 'Ar-rajulu alladī ra\\'aytuhu.', en: 'The man whom I saw.', parts: [p('الرجل', 'N'), p('الذي', 'REL'), p('رأيته', 'CL')] },
      ]
    }""",
        """    { id: 15, title: 'Negation of Future with lan', level: 'B1', rule: 'lan + Present Subjunctive Verb',
      tip: 'Use lan directly before the present tense verb to negate future actions.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_15',
      examples: [
        { target: 'لن أسافر غداً.', rom: 'Lan usāfira ghadan.', en: 'I will not travel tomorrow.', parts: [p('لن', 'NEG-FUT'), p('أسافر', 'V'), p('غداً', 'T')] },
      ]
    }""",
        """    { id: 16, title: 'Passive Voice (الفعل المبني للمجهول)', level: 'B2', rule: 'Past: fu\\'ila / Present: yuf\\'alu',
      tip: 'The passive verb is formed by changing the vowel sounds of the active verb.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_16',
      examples: [
        { target: 'كُتِبَ الدرسُ.', rom: 'Kutiba ad-darsu.', en: 'The lesson was written.', parts: [p('كُتِبَ', 'V-PASS'), p('الدرسُ', 'S-DEPUTY')] },
      ]
    }"""
    ]
}

def search_youtube_videos(query):
    query_encoded = urllib.parse.quote(query)
    url = f"https://www.youtube.com/results?search_query={query_encoded}"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
    })
    video_ids = []
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            matches = re.findall(r'"videoId"\s*:\s*"([a-zA-Z0-9_-]{11})"', html)
            for vid in matches:
                if vid not in video_ids:
                    video_ids.append(vid)
    except Exception as e:
        print(f"  [YouTube Search Error] {e}")
    return video_ids

def verify_video(video_id):
    oembed_url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
    try:
        req = urllib.request.Request(oembed_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                title = data.get('title', '')
                if "private video" in title.lower() or "deleted video" in title.lower():
                    return False, None
                return True, title
    except Exception as e:
        return False, str(e)
    return False, None

def append_new_rules():
    grammar_file = 'frontend/src/data/grammar.ts'
    if not os.path.exists(grammar_file):
        print(f"Error: {grammar_file} not found")
        sys.exit(1)
        
    with open(grammar_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    lines = content.split('\n')
    output_lines = []
    current_lang = None
    in_array = False
    
    for line in lines:
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\[', line)
        if lang_match:
            current_lang = lang_match.group(1)
            in_array = True
            output_lines.append(line)
            continue
            
        if in_array and re.match(r'^\s*\],', line):
            if len(output_lines) > 0:
                last_line = output_lines[-1].rstrip()
                if not last_line.endswith(','):
                    output_lines[-1] = last_line + ","
                    
            lang_inserts = new_rules_data.get(current_lang, [])
            for rule_str in lang_inserts:
                output_lines.append(rule_str + ",")
                
            in_array = False
            current_lang = None
            output_lines.append(line)
            continue
            
        output_lines.append(line)
        
    new_content = '\n'.join(output_lines)
    with open(grammar_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("New rules 13-16 appended with placeholders.")

def resolve_placeholders():
    grammar_file = 'frontend/src/data/grammar.ts'
    with open(grammar_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    current_lang = None
    rule_id = None
    rule_title = None
    
    for idx, line in enumerate(lines):
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\[', line)
        if lang_match:
            current_lang = lang_match.group(1)
            continue
            
        rule_match = re.search(r'id:\s*(\d+),\s*title:\s*[\x27\x22]([^\x27\x22]+)[\x27\x22]', line)
        if rule_match:
            rule_id = int(rule_match.group(1))
            rule_title = rule_match.group(2)
            continue
            
        placeholder_match = re.search(r'videoUrl:\s*[\x27\x22]https://www\.youtube\.com/embed/placeholder_([a-z]{2})_(\d+)[\x27\x22]', line)
        if placeholder_match:
            lang = placeholder_match.group(1)
            rid = int(placeholder_match.group(2))
            
            print(f"\nResolving placeholder for {lang.upper()} Rule {rid}: {rule_title}")
            
            queries = [
                f"{lang_map[lang]} grammar {rule_title} lesson",
                f"{lang_map[lang]} {rule_title} grammar",
                f"{lang_map[lang]} lesson {rule_title}"
            ]
            
            resolved_id = None
            for q in queries:
                print(f"  Searching YouTube: '{q}'...")
                candidates = search_youtube_videos(q)
                print(f"    Found {len(candidates)} candidates. Verifying...")
                for cid in candidates:
                    is_valid, title = verify_video(cid)
                    if is_valid:
                        print(f"    [OK] {cid} -> {title}")
                        resolved_id = cid
                        break
                    time.sleep(0.05)
                if resolved_id:
                    break
                time.sleep(0.5)
                
            if not resolved_id:
                print(f"  [Warning] No video found for '{rule_title}'. Using generic fallback.")
                resolved_id = "EKcSdYks2gE"
                
            indent = re.match(r'^(\s*)', line).group(1)
            lines[idx] = f"{indent}videoUrl: 'https://www.youtube.com/embed/{resolved_id}',\n"
            time.sleep(0.5)
            
    with open(grammar_file, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("\nAll placeholders successfully resolved!")

if __name__ == '__main__':
    append_new_rules()
    resolve_placeholders()
