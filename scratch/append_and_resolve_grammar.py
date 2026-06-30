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
        """    { id: 6, title: 'The 把 (bǎ) Sentence Structure', level: 'HSK 3', rule: 'Subject + 把 + Object + Verb + Other Element',
      tip: 'Use the 把 construction to focus on the result or influence on the object.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_6',
      examples: [
        { target: '我把书看完了。', rom: 'Wǒ bǎ shū kàn wán le.', en: 'I finished reading the book.', parts: [p('我', 'S'), p('把', 'BA'), p('书', 'O'), p('看完', 'V'), p('了', 'PART')] },
      ]
    }""",
        """    { id: 7, title: 'The 被 (bèi) Passive Structure', level: 'HSK 3', rule: 'Receiver + 被 + Doer + Verb + Other Element',
      tip: '被 indicates passive voice. The doer can sometimes be omitted.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_7',
      examples: [
        { target: '杯子被妹妹打破了。', rom: 'Bēizi bèi mèimei dǎ pò le.', en: 'The cup was broken by little sister.', parts: [p('杯子', 'O'), p('被', 'BEI'), p('妹妹', 'S'), p('打破', 'V'), p('了', 'PART')] },
      ]
    }""",
        """    { id: 8, title: 'Expressing "As soon as... then..." with 一...就...', level: 'HSK 2', rule: '一 + Action 1 + 就 + Action 2',
      tip: 'Shows that Action 2 happens immediately after Action 1.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_zh_8',
      examples: [
        { target: '我一回家就吃饭。', rom: 'Wǒ yī huí jiā jiù chī fàn.', en: 'As soon as I get home, I eat.', parts: [p('我', 'S'), p('一', 'YI'), p('回家', 'V1'), p('就', 'JIU'), p('吃饭', 'V2')] },
      ]
    }"""
    ],
    'es': [
        """    { id: 6, title: 'The Preterite vs. Imperfect', level: 'A2', rule: 'Preterite (completed action) vs. Imperfect (ongoing/description)',
      tip: 'Preterite is for specific completed events; imperfect is for descriptions, habits, and background.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_6',
      examples: [
        { target: 'Ayer comí una manzana.', rom: 'Ah-YEHR coh-MEE oo-nah mahn-ZAH-nah.', en: 'Yesterday I ate an apple.', parts: [p('Ayer', 'ADV'), p('comí', 'V-PRET'), p('una manzana', 'O')] },
      ]
    }""",
        """    { id: 7, title: 'Present Subjunctive Intro', level: 'B1', rule: 'Subject 1 + Verb (wish/doubt) + que + Subject 2 + Subjunctive Verb',
      tip: 'Used to express desires, doubts, emotions, or recommendations.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_7',
      examples: [
        { target: 'Espero que vengas.', rom: 'Es-PEH-roh keh BEN-gahs.', en: 'I hope that you come.', parts: [p('Espero', 'V1'), p('que', 'CONJ'), p('vengas', 'V2-SUBJ')] },
      ]
    }""",
        """    { id: 8, title: 'The Conditional Tense', level: 'B1', rule: 'Infinitive + -ía, -ías, -ía, -íamos, -ían',
      tip: 'Expresses what would happen in hypothetical situations.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_es_8',
      examples: [
        { target: 'Yo comería más.', rom: 'Yoh coh-meh-REE-ah mas.', en: 'I would eat more.', parts: [p('Yo', 'S'), p('comería', 'V-COND'), p('más', 'ADV')] },
      ]
    }"""
    ],
    'fr': [
        """    { id: 6, title: 'Passé Composé vs. Imparfait', level: 'A2', rule: 'Passé Composé (completed action) vs. Imparfait (ongoing background)',
      tip: 'Passé composé is used for one-off completed events; imparfait for descriptions and ongoing past events.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_6',
      examples: [
        { target: "J'ai mangé hier.", rom: 'Zhay mahn-zhay ee-air.', en: 'I ate yesterday.', parts: [p("J'ai mangé", 'V-PAST'), p('hier', 'ADV')] },
      ]
    }""",
        """    { id: 7, title: 'Direct & Indirect Object Pronouns', level: 'A2', rule: 'Subject + pronoun (le/la/les/lui/leur) + verb',
      tip: 'Object pronouns go before the verb in French.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_7',
      examples: [
        { target: 'Je te vois.', rom: 'Zhuh tuh vwah.', en: 'I see you.', parts: [p('Je', 'S'), p('te', 'OBJ'), p('vois', 'V')] },
      ]
    }""",
        """    { id: 8, title: 'The Subjunctive Mood', level: 'B1', rule: 'il faut que + subject + subjunctive verb',
      tip: 'Expresses obligation, necessity, or doubt.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_fr_8',
      examples: [
        { target: 'Il faut que je parte.', rom: 'Eel foh kuh zhuh part.', en: 'It is necessary that I leave.', parts: [p('Il faut que', 'EXP'), p('je', 'S'), p('parte', 'V-SUBJ')] },
      ]
    }"""
    ],
    'de': [
        """    { id: 6, title: 'Subordinate Clauses & Verb-End Rule (Weil, Dass)', level: 'A2', rule: 'Weil/Dass + Subject + Object + Verb (conjugated verb at end)',
      tip: 'Conjunctions like "weil" (because) and "dass" (that) push the conjugated verb to the very end of the clause.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_6',
      examples: [
        { target: 'Weil ich müde bin.', rom: 'Vyl ikh MUE-deh bin.', en: 'Because I am tired.', parts: [p('Weil', 'CONJ'), p('ich', 'S'), p('müde', 'ADJ'), p('bin', 'V')] },
      ]
    }""",
        """    { id: 7, title: 'The Dative Case', level: 'A2', rule: 'Indirect Object uses Dative: dem/der/dem/den',
      tip: 'Used for the recipient of an action, or after specific dative prepositions.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_7',
      examples: [
        { target: 'Ich gebe dem Mann das Buch.', rom: 'Ikh GAY-buh dehm Mann das Bookh.', en: 'I give the man the book.', parts: [p('Ich', 'S'), p('gebe', 'V'), p('dem Mann', 'O-DAT'), p('das Buch', 'O-ACC')] },
      ]
    }""",
        """    { id: 8, title: 'Two-Way Prepositions (Wechselpräpositionen)', level: 'B1', rule: 'Accusative (movement) vs. Dative (location)',
      tip: 'Use accusative when there is movement to a new location, dative when staying in place.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_de_8',
      examples: [
        { target: 'Ich gehe in das Kino.', rom: 'Ikh GAY-uh in das KEE-noh.', en: 'I am walking into the cinema.', parts: [p('Ich', 'S'), p('gehe', 'V'), p('in das Kino', 'O-ACC')] },
      ]
    }"""
    ],
    'ja': [
        """    { id: 6, title: 'The Object Marker を (o/wo)', level: 'N5', rule: 'Noun + を + Transitive Verb',
      tip: 'を marks the direct object of a transitive verb.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_6',
      examples: [
        { target: '水を飲みます。', rom: 'Mizu o nomimasu.', en: 'I drink water.', parts: [p('水', 'N'), p('を', 'OBJ'), p('飲みます', 'V')] },
      ]
    }""",
        """    { id: 7, title: 'Polite Requests: 〜てください', level: 'N5', rule: 'Verb-て + ください',
      tip: 'Used to politely ask someone to do something.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_7',
      examples: [
        { target: '日本語 de 話してください。', rom: 'Nihongo de hanashite kudasai.', en: 'Please speak in Japanese.', parts: [p('日本語で', 'O'), p('話して', 'V-て'), p('ください', 'POL')] },
      ]
    }""",
        """    { id: 8, title: 'Expressing Desires: 〜たい', level: 'N5', rule: 'Verb stem + たい',
      tip: 'Replace -ます with -たい to express wanting to do an action.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ja_8',
      examples: [
        { target: '寿司を食べたいです。', rom: 'Sushi o tabetai desu.', en: 'I want to eat sushi.', parts: [p('寿司を', 'O'), p('食べたい', 'V-WANT'), p('です', 'POL')] },
      ]
    }"""
    ],
    'ko': [
        """    { id: 6, title: 'Subject Marker 이/가', level: '초급', rule: 'Noun + 이(consonant) / 가(vowel)',
      tip: 'Unlike topic markers, 이/가 focuses on the subject performing the action.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_6',
      examples: [
        { target: '비가 와요.', rom: 'Bi-ga wayo.', en: 'It is raining.', parts: [p('비가', 'S-MARKER'), p('와요', 'V')] },
      ]
    }""",
        """    { id: 7, title: 'The Connective -고 (and)', level: '초급', rule: 'Verb stem + 고 + next clause',
      tip: 'Connects two verbs, adjectives, or clauses meaning "and".',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_7',
      examples: [
        { target: '먹고 가요.', rom: 'Meog-go gayo.', en: 'I eat and go.', parts: [p('먹고', 'V1-고'), p('가요', 'V2')] },
      ]
    }""",
        """    { id: 8, title: 'Expressing Ability: -(으)ㄹ 수 있다', level: '초급', rule: 'Verb stem + 을/ㄹ 수 있다 (can do)',
      tip: 'Means "can" or "be able to".',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ko_8',
      examples: [
        { target: '한국어를 할 수 있어요.', rom: 'Han-gug-eo-reul hal su isseoyo.', en: 'I can speak Korean.', parts: [p('한국어를', 'O'), p('할 수 있어요', 'V-CAN')] },
      ]
    }"""
    ],
    'it': [
        """    { id: 6, title: 'Passato Prossimo (Past Tense)', level: 'A2', rule: 'essere/avere + past participle (-ato, -uto, -ito)',
      tip: 'Used for completed actions in the past.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_6',
      examples: [
        { target: 'Ho mangiato una mela.', rom: 'Oh mahn-JAH-toh oo-nah MEH-lah.', en: 'I ate an apple.', parts: [p('Ho mangiato', 'V-PAST'), p('una mela', 'O')] },
      ]
    }""",
        """    { id: 7, title: 'Direct Object Pronouns', level: 'A2', rule: 'Pronoun + Verb',
      tip: 'Object pronouns go before the conjugated verb.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_7',
      examples: [
        { target: 'Ti vedo.', rom: 'Tee VEH-doh.', en: 'I see you.', parts: [p('Ti', 'OBJ'), p('vedo', 'V')] },
      ]
    }""",
        """    { id: 8, title: 'The Imperfect Tense (Imperfetto)', level: 'A2', rule: 'Verb stem + -avo, -evi, -ivo',
      tip: 'Used for habits, descriptions, and ongoing states in the past.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_it_8',
      examples: [
        { target: 'Da bambino giocavo sempre.', rom: 'Dah bahm-BEE-noh joh-CAH-voh SEM-preh.', en: 'As a child, I always used to play.', parts: [p('Da bambino', 'ADV'), p('giocavo', 'V-IMP'), p('sempre', 'ADV')] },
      ]
    }"""
    ],
    'en': [
        """    { id: 6, title: 'Present Perfect Tense', level: 'B1', rule: 'have/has + past participle',
      tip: 'Connects the past to the present (e.g. actions started in past and continuing now).',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_6',
      examples: [
        { target: 'I have lived here for five years.', rom: 'Ay hav livd heer for fyv yeerz.', en: 'I have lived here for five years.', parts: [p('I', 'S'), p('have lived', 'V-PERF'), p('here', 'ADV'), p('for five years', 'T')] },
      ]
    }""",
        """    { id: 7, title: 'Passive Voice', level: 'B1', rule: 'Subject + to be + past participle',
      tip: 'Used when the focus is on the action or the receiver, not who does it.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_7',
      examples: [
        { target: 'The cake was eaten.', rom: 'Thuh keyk woz ee-tuhn.', en: 'The cake was eaten.', parts: [p('The cake', 'O'), p('was eaten', 'V-PASS')] },
      ]
    }""",
        """    { id: 8, title: 'First Conditional', level: 'A2', rule: 'If + simple present, will + base verb',
      tip: 'Expresses real or possible future situations.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_en_8',
      examples: [
        { target: 'If it rains, we will stay home.', rom: 'If it reynz, wee wil stey hohm.', en: 'If it rains, we will stay home.', parts: [p('If it rains', 'COND'), p('we', 'S'), p('will stay', 'V-FUTURE'), p('home', 'ADV')] },
      ]
    }"""
    ],
    'ar': [
        """    { id: 6, title: 'The Nominal Sentence (الجملة الاسمية)', level: 'A1', rule: 'Subject (Mubtada) + Predicate (Khabar)',
      tip: 'A sentence starting with a noun. It does not require a verb "to be" in the present tense.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_6',
      examples: [
        { target: 'الولد ذكي.', rom: 'Al-waladu dakiyy.', en: 'The boy is smart.', parts: [p('الولد', 'S'), p('ذكي', 'PRED')] },
      ]
    }""",
        """    { id: 7, title: 'Future Tense with sa- or sawfa', level: 'A2', rule: 'sa- / sawfa + Present Verb',
      tip: 'Prefix sa- for near future, or use sawfa before the verb for distant future.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_7',
      examples: [
        { target: 'سأدرس غداً.', rom: 'Sa-adrusu ghadan.', en: 'I will study tomorrow.', parts: [p('سأدرس', 'V-FUT'), p('غداً', 'T')] },
      ]
    }""",
        """    { id: 8, title: 'Negation of Past Tense with lam', level: 'A2', rule: 'lam + Present Jussive Verb',
      tip: 'Negates actions in the past using the particle lam followed by the present tense verb.',
      videoUrl: 'https://www.youtube.com/embed/placeholder_ar_8',
      examples: [
        { target: 'لم أذهب إلى المدرسة.', rom: 'Lam adhab ila al-madrasah.', en: 'I did not go to school.', parts: [p('لم أذهب', 'V-NEG'), p('إلى المدرسة', 'O')] },
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
    print("New grammar rules appended with placeholders.")

def resolve_placeholders():
    grammar_file = 'frontend/src/data/grammar.ts'
    with open(grammar_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    current_lang = None
    rule_id = None
    rule_title = None
    
    # We will search and resolve each placeholder URL
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
            
            # Form search queries
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
                print(f"  [Warning] No video found for '{rule_title}'. Using a generic fallback.")
                # Fallback to standard video
                resolved_id = "EKcSdYks2gE" # default chinese grammar or similar
                
            # Replace placeholder with real video URL in the line
            indent = re.match(r'^(\s*)', line).group(1)
            lines[idx] = f"{indent}videoUrl: 'https://www.youtube.com/embed/{resolved_id}',\n"
            
            # Sleep brief moment to protect rate limits
            time.sleep(0.5)
            
    with open(grammar_file, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("\nAll placeholders successfully resolved!")

if __name__ == '__main__':
    append_new_rules()
    resolve_placeholders()
