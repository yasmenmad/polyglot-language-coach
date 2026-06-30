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
        """    { id: 9, title: 'The Comparative with 比 (bǐ)', level: 'HSK 2', rule: 'A + 比 + B + Adjective',
      tip: 'Used to compare two things where A is more adjective than B.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_9',
      examples: [
        { target: '他比我高。', rom: 'Tā bǐ wǒ gāo.', en: 'He is taller than me.', parts: [p('他', 'A'), p('比', 'COMP'), p('我', 'B'), p('高', 'ADJ')] },
      ]
    }""",
        """    { id: 10, title: 'Expressing "Although... but..." with 虽然...但是...', level: 'HSK 2', rule: '虽然 + Clause 1, 但是 + Clause 2',
      tip: 'Used to express a concession or contrast between two clauses.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_10',
      examples: [
        { target: '虽然下雨，但是我很开心。', rom: 'Suīrán xià yǔ, dànshì wǒ hěn kāixīn.', en: 'Although it is raining, I am very happy.', parts: [p('虽然', 'CONJ1'), p('下雨', 'C1'), p('但是', 'CONJ2'), p('我很开心', 'C2')] },
      ]
    }""",
        """    { id: 11, title: 'The Continuous Aspect with 着 (zhe)', level: 'HSK 2', rule: 'Verb + 着',
      tip: 'Indicates an action is in progress or a state is continuous.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_11',
      examples: [
        { target: '门开着。', rom: 'Mén kāi zhe.', en: 'The door is open.', parts: [p('门', 'S'), p('开', 'V'), p('着', 'CONT')] },
      ]
    }""",
        """    { id: 12, title: 'Double Negation for Emphasis', level: 'HSK 4', rule: '不得不 + Verb / 没有...不...',
      tip: 'Two negatives make a strong positive statement.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_12',
      examples: [
        { target: '我不得不去。', rom: 'Wǒ bùdébù qù.', en: 'I have no choice but to go.', parts: [p('我', 'S'), p('不得不', 'D-NEG'), p('去', 'V')] },
      ]
    }"""
    ],
    'es': [
        """    { id: 9, title: 'The Imperfect Subjunctive', level: 'B2', rule: 'Drop -ron from Preterite 3rd pl. and add -ra, -ras, -ra...',
      tip: 'Used in hypothetical conditions (with "si") and in past desires or doubts.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_9',
      examples: [
        { target: 'Si yo fuera rico.', rom: 'See yoh FWEH-rah REE-coh.', en: 'If I were rich.', parts: [p('Si', 'CONJ'), p('yo', 'S'), p('fuera', 'V-SUBJ-PAST'), p('rico', 'ADJ')] },
      ]
    }""",
        """    { id: 10, title: 'The Future Tense (Futuro Simple)', level: 'B1', rule: 'Infinitive + -é, -ás, -á, -emos, -éis, -án',
      tip: 'Expresses actions that will happen in the future, or probability in the present.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_10',
      examples: [
        { target: 'Viajaré mañana.', rom: 'Byah-hah-REH mah-NYAH-nah.', en: 'I will travel tomorrow.', parts: [p('Viajaré', 'V-FUT'), p('mañana', 'ADV')] },
      ]
    }""",
        """    { id: 11, title: 'Relative Pronouns', level: 'B2', rule: 'Noun + relative pronoun + description',
      tip: 'Used to connect clauses and avoid repetition of nouns.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_11',
      examples: [
        { target: 'El hombre que canta.', rom: 'El OM-breh keh CAN-tah.', en: 'The man who sings.', parts: [p('El hombre', 'N'), p('que', 'REL'), p('canta', 'V')] },
      ]
    }""",
        """    { id: 12, title: "Passive Voice with 'se'", level: 'B1', rule: 'se + 3rd person verb + subject',
      tip: 'Used when the agent performing the action is not specified.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_12',
      examples: [
        { target: 'Se habla español aquí.', rom: 'Seh AH-blah es-pah-NYOL ah-KEE.', en: 'Spanish is spoken here.', parts: [p('Se', 'PASS'), p('habla', 'V'), p('español', 'S'), p('aquí', 'ADV')] },
      ]
    }"""
    ],
    'fr': [
        """    { id: 9, title: 'The Plus-que-parfait (Past Perfect)', level: 'B1', rule: 'Imparfait auxiliary (avoir/être) + past participle',
      tip: 'Used to describe an action that happened before another action in the past.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_9',
      examples: [
        { target: "J'avais mangé.", rom: 'Zhah-veh mahn-zhay.', en: 'I had eaten.', parts: [p("J'avais mangé", 'V-PPERF')] },
      ]
    }""",
        """    { id: 10, title: 'Relative Pronouns: qui, que, dont, où', level: 'A2/B1', rule: 'Noun + relative pronoun + relative clause',
      tip: 'Qui is the subject, que is the direct object, dont replaces objects of de, où is for place or time.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_10',
      examples: [
        { target: 'Le livre que je lis.', rom: 'Luh leev-ruh kuh zhuh lee.', en: 'The book that I am reading.', parts: [p('Le livre', 'N'), p('que', 'REL'), p('je', 'S'), p('lis', 'V')] },
      ]
    }""",
        """    { id: 11, title: 'The Future Simple Tense', level: 'A2', rule: 'Infinitive (drop -e for -re) + -ai, -as, -a, -ons, -ez, -ont',
      tip: 'Expresses future events (equivalent to "will" in English).',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_11',
      examples: [
        { target: 'Je parlerai demain.', rom: 'Zhuh parl-ray duh-man.', en: 'I will speak tomorrow.', parts: [p('Je', 'S'), p('parlerai', 'V-FUT'), p('demain', 'ADV')] },
      ]
    }""",
        """    { id: 12, title: 'Double Pronoun Construction', level: 'B1', rule: 'Subject + Pronoun 1 + Pronoun 2 + Verb',
      tip: 'When using multiple pronouns (like indirect and direct object), they follow a strict order.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_12',
      examples: [
        { target: 'Il me le donne.', rom: 'Eel muh luh dun.', en: 'He gives it to me.', parts: [p('Il', 'S'), p('me', 'PRON1'), p('le', 'PRON2'), p('donne', 'V')] },
      ]
    }"""
    ],
    'de': [
        """    { id: 9, title: 'The Subjunctive II (Konjunktiv II)', level: 'B1', rule: 'würde + Infinitive',
      tip: 'Used for wishes, polite requests, and hypothetical conditions.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_9',
      examples: [
        { target: 'Ich würde gerne reisen.', rom: 'Ikh VUER-deh GEHR-nuh RY-zen.', en: 'I would like to travel.', parts: [p('Ich', 'S'), p('würde reisen', 'V-SUBJ'), p('gerne', 'ADV')] },
      ]
    }""",
        """    { id: 10, title: 'Relative Clauses (Relativsätze)', level: 'B1', rule: 'Noun + relative pronoun (der/die/das/etc.) + verb at the end',
      tip: 'The relative pronoun matches the gender of the noun but takes the case from its role in the relative clause.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_10',
      examples: [
        { target: 'Der Mann, den ich sehe.', rom: 'Dehr Mann, dehn ikh ZEH-uh.', en: 'The man whom I see.', parts: [p('Der Mann', 'N'), p('den', 'REL-ACC'), p('ich', 'S'), p('sehe', 'V')] },
      ]
    }""",
        """    { id: 11, title: 'Passive Voice (Passiv)', level: 'B1', rule: 'werden + past participle',
      tip: 'Focuses on the action rather than the actor.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_11',
      examples: [
        { target: 'Das Buch wird gelesen.', rom: 'Das Bookh virt geh-LAY-zen.', en: 'The book is being read.', parts: [p('Das Buch', 'S'), p('wird gelesen', 'V-PASS')] },
      ]
    }""",
        """    { id: 12, title: 'Infinitives with "zu"', level: 'B1', rule: 'Main clause + zu + Infinitive',
      tip: 'Used after certain verbs, adjectives, and nouns.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_12',
      examples: [
        { target: 'Es ist schwer zu lernen.', rom: 'Es ist shvayr tsoo LEHR-nen.', en: 'It is difficult to learn.', parts: [p('Es ist schwer', 'CL'), p('zu lernen', 'INF-ZU')] },
      ]
    }"""
    ],
    'ja': [
        """    { id: 9, title: 'The Potential Form', level: 'N4', rule: 'Group 1: u -> e + ru | Group 2: ru -> rareru',
      tip: 'Indicates ability or possibility to perform an action.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_9',
      examples: [
        { target: '日本語が话せます。', rom: 'Nihongo ga hanasemasu.', en: 'I can speak Japanese.', parts: [p('日本語が', 'O'), p('話せます', 'V-POT')] },
      ]
    }""",
        """    { id: 10, title: 'Giving and Receiving: 〜てあげる / 〜てもらう / 〜てくれる', level: 'N4', rule: 'Verb-te + ageru/morau/kureru',
      tip: 'Expresses acts of giving and receiving favors or services.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_10',
      examples: [
        { target: '本を買ってくれました。', rom: 'Hon o katte kuremashita.', en: 'They bought a book for me.', parts: [p('本を', 'O'), p('買ってくれました', 'V-FAVOR')] },
      ]
    }""",
        """    { id: 11, title: 'The Passive Form: 〜られる', level: 'N4', rule: 'Group 1: u -> a + reru | Group 2: ru -> rareru',
      tip: 'Used to express passive action, often with a nuance of annoyance.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_11',
      examples: [
        { target: '雨に降られました。', rom: 'Ame ni furaremashita.', en: 'I was rained on.', parts: [p('雨に', 'AGENT'), p('降られました', 'V-PASS')] },
      ]
    }""",
        """    { id: 12, title: 'The Causative Form: 〜させる', level: 'N3', rule: 'Group 1: u -> a + seru | Group 2: ru -> saseru',
      tip: 'Used to express making or letting someone do an action.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_12',
      examples: [
        { target: '子供に勉強させます。', rom: 'Kodomo ni benkyō sasemasu.', en: 'I make my child study.', parts: [p('子供に', 'AGENT'), p('勉強させます', 'V-CAUS')] },
      ]
    }"""
    ],
    'ko': [
        """    { id: 9, title: 'The Causative Ending -게 하다', level: '중급', rule: 'Verb stem + 게 하다',
      tip: 'Expresses making, letting, or causing someone to do an action.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_9',
      examples: [
        { target: '그를 웃게 했어요.', rom: 'Geu-reul ut-ge haesseoyo.', en: 'I made him laugh.', parts: [p('그를', 'O'), p('웃게 했어요', 'V-CAUS')] },
      ]
    }""",
        """    { id: 10, title: 'Hypothetical Condition: -(으)면', level: '초급', rule: 'Verb stem + 면(vowel) / 으면(consonant)',
      tip: 'Equivalent to "if" or "when" in English.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_10',
      examples: [
        { target: '돈이 있으면 사요.', rom: 'Don-i isseumyeon sayo.', en: 'If I have money, I will buy it.', parts: [p('돈이', 'S'), p('있으면', 'V-COND'), p('사요', 'V2')] },
      ]
    }""",
        """    { id: 11, title: 'The Passive Form: -아/어지다', level: '중급', rule: 'Verb stem + 아/어지다',
      tip: 'Indicates that a subject is acted upon, or changes into a state.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_11',
      examples: [
        { target: '날씨가 따뜻해져요.', rom: 'Nalssi-ga ttatteuthae-jeoyo.', en: 'The weather is becoming warm.', parts: [p('날씨가', 'S'), p('따뜻해져요', 'V-PASS')] },
      ]
    }""",
        """    { id: 12, title: 'Expressing Intention: -(으)려고 하다', level: '초급', rule: 'Verb stem + 려고(vowel) / 으려고(consonant) 하다',
      tip: 'Expresses a plan, intention, or purpose to do something.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_12',
      examples: [
        { target: '공부하려고 해요.', rom: 'Gongbu-haryeogo haeyo.', en: 'I intend to study.', parts: [p('공부하려고 해요', 'V-INTENT')] },
      ]
    }"""
    ],
    'it': [
        """    { id: 9, title: 'The Subjunctive Mood (Congiuntivo Presente)', level: 'B1/B2', rule: 'che + Subject + Subjunctive Verb',
      tip: 'Used to express doubt, hope, emotion, opinion, or desire in subordinate clauses.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_9',
      examples: [
        { target: 'Spero che tu stia bene.', rom: 'SPEH-roh keh too STEE-ah BEH-neh.', en: 'I hope you are well.', parts: [p('Spero', 'V-HOPE'), p('che', 'CONJ'), p('tu', 'S'), p('stia', 'V-SUBJ'), p('bene', 'ADV')] },
      ]
    }""",
        """    { id: 10, title: 'The Future Tense (Futuro Semplice)', level: 'A2', rule: 'Infinitive stem + -rò, -rai, -rà, -remo, -rete, -ranno',
      tip: 'Used to express future actions, plans, or predictions.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_10',
      examples: [
        { target: 'Partirò domani.', rom: 'Par-tee-ROH doh-MAH-nee.', en: 'I will leave tomorrow.', parts: [p('Partirò', 'V-FUT'), p('domani', 'ADV')] },
      ]
    }""",
        """    { id: 11, title: 'Double Object Pronouns', level: 'B1', rule: 'Indirect pronoun + direct pronoun + verb',
      tip: 'When combining indirect and direct pronouns, the indirect pronoun changes its ending to -e.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_11',
      examples: [
        { target: 'Me lo dà.', rom: 'Meh lo dah.', en: 'He gives it to me.', parts: [p('Me', 'PRON-IND'), p('lo', 'PRON-DIR'), p('dà', 'V')] },
      ]
    }""",
        """    { id: 12, title: 'The Conditional Mood (Condizionale Presente)', level: 'A2', rule: 'Infinitive stem + -rei, -resti, -rebbe, -remmo, -reste, -rebbero',
      tip: 'Used to express polite requests, wishes, hypothetical situations, or advice.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_12',
      examples: [
        { target: 'Vorrei un caffè.', rom: 'Vor-RAY oon caf-FEH.', en: 'I would like a coffee.', parts: [p('Vorrei', 'V-COND'), p('un caffè', 'O')] },
      ]
    }"""
    ],
    'en': [
        """    { id: 9, title: 'Second Conditional', level: 'B1', rule: 'If + past simple, would + base verb',
      tip: 'Used for imaginary or highly unlikely present/future situations.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_9',
      examples: [
        { target: 'If I won the lottery, I would travel.', rom: 'If Ay wun thuh lot-uh-ree, Ay wud trav-uhl.', en: 'If I won the lottery, I would travel.', parts: [p('If I won the lottery', 'COND'), p('I would travel', 'RESULT')] },
      ]
    }""",
        """    { id: 10, title: 'Third Conditional', level: 'B2', rule: 'If + past perfect, would have + past participle',
      tip: 'Expresses hypothetical situations in the past that did not happen.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_10',
      examples: [
        { target: 'If you had studied, you would have passed.', rom: 'If yoo had stoo-deed, yoo wud hav past.', en: 'If you had studied, you would have passed.', parts: [p('If you had studied', 'COND'), p('you would have passed', 'RESULT')] },
      ]
    }""",
        """    { id: 11, title: 'Relative Clauses', level: 'B1', rule: 'Noun + who/which/that + relative clause',
      tip: 'Use who for people, which for things. That is used only in defining relative clauses.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_11',
      examples: [
        { target: 'The book which I bought is good.', rom: 'Thuh book wich Ay bawt iz gud.', en: 'The book which I bought is good.', parts: [p('The book', 'N'), p('which', 'REL'), p('I bought', 'CL'), p('is good', 'V')] },
      ]
    }""",
        """    { id: 12, title: 'Gerund vs. Infinitive', level: 'B1', rule: 'Verb + verb-ing OR Verb + to-infinitive',
      tip: 'Some verbs are followed by gerunds (e.g. enjoy, avoid), some by infinitives (e.g. want, decide).',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_12',
      examples: [
        { target: 'I enjoy reading books.', rom: 'Ay en-joy REE-ding books.', en: 'I enjoy reading books.', parts: [p('I', 'S'), p('enjoy', 'V'), p('reading books', 'GER-O')] },
      ]
    }"""
    ],
    'ar': [
        """    { id: 9, title: 'The Verbal Sentence (الجملة الفعلية)', level: 'A1', rule: 'Verb (Fil) + Subject (Fail) + Object (Maful Bihi)',
      tip: 'In classic Arabic, sentences commonly start with the verb, and the verb agrees with the subject in gender only.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_9',
      examples: [
        { target: 'كتب الطالب الدرس.', rom: 'Kataba at-talibu ad-darsa.', en: 'The student wrote the lesson.', parts: [p('كتب', 'V'), p('الطالب', 'S'), p('الدرس', 'O')] },
      ]
    }""",
        """    { id: 10, title: 'The Idafa Construction (الإضافة)', level: 'A2', rule: 'Noun 1 (indefinite) + Noun 2 (definite)',
      tip: 'Used to express possession or association (e.g. the book of the teacher). Noun 1 never takes al- or tanween.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_10',
      examples: [
        { target: 'كتاب المعلم جديد.', rom: 'Kitabu al-mu‘allimi jadid.', en: "The teacher's book is new.", parts: [p('كتاب المعلم', 'IDAF-N'), p('جديد', 'ADJ')] },
      ]
    }""",
        """    { id: 11, title: 'Negation of Present Tense with la vs. lam vs. lan', level: 'B1', rule: 'la + present (general) / lam + jussive (past) / lan + subjunctive (future)',
      tip: 'Different particles negate different times: la for present, lam for past, and lan for future.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_11',
      examples: [
        { target: 'لن أسافر غداً.', rom: 'Lan usafira ghadan.', en: 'I will not travel tomorrow.', parts: [p('لن', 'NEG-FUT'), p('أسافر', 'V'), p('غداً', 'T')] },
      ]
    }""",
        """    { id: 12, title: 'Dual Form for Nouns and Verbs (المثنى)', level: 'A2', rule: 'Noun + an / ayn',
      tip: 'Arabic has a grammatical dual number (for two people/things). Add -an in nominative case.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_12',
      examples: [
        { target: 'هذان كتابان.', rom: 'Hadan kitabān.', en: 'These are two books.', parts: [p('هذان', 'DEM-DUAL'), p('كتابان', 'N-DUAL')] },
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
            # Append comma to the line before it if it does not already end with one
            if len(output_lines) > 0:
                last_line = output_lines[-1].rstrip()
                if not last_line.endswith(','):
                    output_lines[-1] = last_line + ","
                    
            # Insert the new rules for this language
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
    print("New rules 9-12 appended with placeholders.")

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
