import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def append_units():
    units_file = 'frontend/src/data/units.ts'
    if not os.path.exists(units_file):
        print(f"Error: Could not find {units_file}")
        return

    with open(units_file, 'r', encoding='utf-8') as f:
        content = f.read()

    inserts = {
        'zh': """    { id: 9, title: 'Business & Negotiation', emoji: '💼', lessons: [
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
    ]}""",

        'es': """    { id: 9, title: 'Negocios y Negociación', emoji: '💼', lessons: [
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
    ]}""",

        'fr': """    { id: 9, title: "Affaires et Négociation", emoji: '💼', lessons: [
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
    ]}""",

        'de': """    { id: 9, title: 'Geschäft & Verhandlung', emoji: '💼', lessons: [
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
    ]}""",

        'ja': """    { id: 9, title: 'ビジネスと交渉', emoji: '💼', lessons: [
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
    ]}""",

        'ko': """    { id: 9, title: '비즈니스와 협상', emoji: '💼', lessons: [
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
    ]}""",

        'it': """    { id: 9, title: 'Affari e Negoziazione', emoji: '💼', lessons: [
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
    ]}""",

        'en': """    { id: 9, title: 'Business & Negotiation', emoji: '💼', lessons: [
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
    ]}""",

        'ar': """    { id: 9, title: 'الأعمال والتفاوض', emoji: '💼', lessons: [
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
    ]}"""
    }

    lines = content.split('\n')
    output_lines = []
    
    current_lang = None
    in_array = False
    
    for i, line in enumerate(lines):
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\[', line)
        if lang_match:
            current_lang = lang_match.group(1)
            in_array = True
            output_lines.append(line)
            continue
        
        if in_array and re.match(r'^\s*\],', line):
            # Append comma to the line before it if not already present
            if len(output_lines) > 0:
                last_line = output_lines[-1].rstrip()
                if not last_line.endswith(','):
                    output_lines[-1] = last_line + ","
            
            lang_insert = inserts.get(current_lang)
            if lang_insert:
                output_lines.append(lang_insert)
            in_array = False
            current_lang = None
            output_lines.append(line)
            continue
            
        output_lines.append(line)
        
    new_content = '\n'.join(output_lines)
    with open(units_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Units appended successfully.")

def append_vocab():
    vocab_file = 'frontend/src/data/vocab.ts'
    if not os.path.exists(vocab_file):
        print(f"Error: Could not find {vocab_file}")
        return
        
    with open(vocab_file, 'r', encoding='utf-8') as f:
        content = f.read()

    vocab_inserts = {
        'zh': """    // C1 Business & Negotiation
    { h: '谈判', p: 'tánpàn', m: 'negotiation / to negotiate', t: 4 },
    { h: '合同', p: 'hétong', m: 'contract / agreement', t: 4 },
    { h: '合作', p: 'hézuò', m: 'cooperation / partnership', t: 4 },
    { h: '议程', p: 'yìchéng', m: 'agenda / schedule', t: 4 },
    { h: '市场', p: 'shìchǎng', m: 'market', t: 3 },
    { h: '客户', p: 'kèhù', m: 'client / customer', t: 4 },
    { h: '活动', p: 'huódòng', m: 'campaign / activity', t: 3 },
    { h: '收入', p: 'shōurù', m: 'income / revenue', t: 4 },
    // C1 Politics & Society
    { h: '投票', p: 'tóupiào', m: 'to vote / ballot', t: 4 },
    { h: '民主', p: 'mínzhǔ', m: 'democracy', t: 4 },
    { h: '选举', p: 'xuǎnjǔ', m: 'election', t: 4 },
    { h: '政策', p: 'zhèngcè', m: 'policy', t: 4 },
    { h: '贫困', p: 'pínkùn', m: 'poverty', t: 4 },
    { h: '平等', p: 'píngděng', m: 'equality', t: 4 },
    { h: '正义', p: 'zhèngyì', m: 'justice / righteousness', t: 4 },
    { h: '公民', p: 'gōngmín', m: 'citizen', t: 4 },
    // C1 Science & Technology
    { h: '算法', p: 'suànfǎ', m: 'algorithm', t: 4 },
    { h: '机器人', p: 'jīqìrén', m: 'robot', t: 3 },
    { h: '自动化', p: 'zìdònghuà', m: 'automation', t: 4 },
    { h: '智能', p: 'zhìnéng', m: 'intelligence / smart', t: 4 },
    { h: '星系', p: 'xīngxì', m: 'galaxy', t: 4 },
    { h: '轨道', p: 'guǐdào', m: 'orbit / track', t: 4 },
    { h: '行星', p: 'xíngxīng', m: 'planet', t: 4 },
    { h: '火箭', p: 'huǒjiàn', m: 'rocket', t: 4 },
    // C1 Art & Literature
    { h: '绘画', p: 'huìhuà', m: 'painting / drawing', t: 4 },
    { h: '杰作', p: 'jiézuò', m: 'masterpiece', t: 4 },
    { h: '画廊', p: 'huàláng', m: 'gallery', t: 4 },
    { h: '雕塑', p: 'diāosù', m: 'sculpture', t: 4 },
    { h: '小说', p: 'xiǎoshuō', m: 'novel / fiction', t: 3 },
    { h: '诗歌', p: 'shīgē', m: 'poetry', t: 4 },
    { h: '作者', p: 'zuòzhě', m: 'author / writer', t: 3 },
    { h: '隐喻', p: 'yǐnyù', m: 'metaphor', t: 4 }""",

        'es': """    // C1 Business
    { h: 'negociar', p: 'neh-goh-SYAR', m: 'to negotiate', t: 3 },
    { h: 'contrato', p: 'con-TRAH-toh', m: 'contract', t: 2 },
    { h: 'colaboración', p: 'coh-lah-boh-rah-SYON', m: 'partnership / collaboration', t: 3 },
    { h: 'agenda', p: 'ah-HEN-dah', m: 'agenda', t: 2 },
    { h: 'mercado', p: 'mehr-CAH-doh', m: 'market', t: 2 },
    { h: 'cliente', p: 'clyen-teh', m: 'client / customer', t: 2 },
    { h: 'campaña', p: 'cam-PAH-nyah', m: 'campaign', t: 3 },
    { h: 'ingresos', p: 'een-GREH-sos', m: 'revenue / income', t: 3 },
    // C1 Politics
    { h: 'votar', p: 'boh-TAR', m: 'to vote', t: 2 },
    { h: 'democracia', p: 'deh-moh-CRAH-syah', m: 'democracy', t: 3 },
    { h: 'elección', p: 'eh-lec-SYON', m: 'election', t: 3 },
    { h: 'política', p: 'poh-LEE-tee-cah', m: 'policy / politics', t: 2 },
    { h: 'pobreza', p: 'poh-BREH-thah', m: 'poverty', t: 3 },
    { h: 'igualdad', p: 'ee-gwal-DAD', m: 'equality', t: 3 },
    { h: 'justicia', p: 'hoos-TEE-thyah', m: 'justice', t: 3 },
    { h: 'ciudadanía', p: 'thyoo-dah-dah-NEE-ah', m: 'citizenship', t: 4 },
    // C1 Tech
    { h: 'algoritmo', p: 'al-goh-REET-moh', m: 'algorithm', t: 4 },
    { h: 'robot', p: 'roh-BOT', m: 'robot', t: 2 },
    { h: 'automatización', p: 'ow-toh-mah-tee-thah-SYON', m: 'automation', t: 4 },
    { h: 'inteligencia', p: 'een-teh-lee-HEN-thyah', m: 'intelligence', t: 3 },
    { h: 'galaxia', p: 'gah-LAX-yah', m: 'galaxy', t: 3 },
    { h: 'órbita', p: 'OR-bee-tah', m: 'orbit', t: 3 },
    { h: 'planeta', p: 'plah-NEH-tah', m: 'planet', t: 2 },
    { h: 'cohete', p: 'coh-EH-teh', m: 'rocket', t: 3 },
    // C1 Art
    { h: 'pintura', p: 'peen-TOO-rah', m: 'painting', t: 2 },
    { h: 'obra maestra', p: 'OH-brah mah-ES-trah', m: 'masterpiece', t: 3 },
    { h: 'galería', p: 'gah-leh-REE-ah', m: 'gallery', t: 2 },
    { h: 'escultura', p: 'es-cool-TOO-rah', m: 'sculpture', t: 3 },
    { h: 'novela', p: 'noh-BEH-lah', m: 'novel', t: 2 },
    { h: 'poesía', p: 'poh-eh-SEE-ah', m: 'poetry', t: 3 },
    { h: 'autor', p: 'ow-TOR', m: 'author', t: 2 },
    { h: 'metáfora', p: 'meh-TAH-foh-rah', m: 'metaphor', t: 4 }""",

        'fr': """    // C1 Business
    { h: 'négocier', p: 'nay-go-syay', m: 'to negotiate', t: 3 },
    { h: 'contrat', p: 'kon-trah', m: 'contract', t: 2 },
    { h: 'partenariat', p: 'par-tuh-nah-ryah', m: 'partnership', t: 3 },
    { h: 'ordre du jour', p: "ordr dyoo zhoor", m: 'agenda', t: 3 },
    { h: 'marché', p: 'mar-shay', m: 'market', t: 2 },
    { h: 'client', p: 'klee-ahn', m: 'client / customer', t: 2 },
    { h: 'campagne', p: 'kahn-pahn-yuh', m: 'campaign', t: 3 },
    { h: 'revenu', p: 'ruh-vnoo', m: 'revenue / income', t: 3 },
    // C1 Politics
    { h: 'voter', p: 'vo-tay', m: 'to vote', t: 2 },
    { h: 'démocratie', p: 'day-mo-krah-see', m: 'democracy', t: 3 },
    { h: 'élection', p: 'ay-lek-syohn', m: 'election', t: 3 },
    { h: 'politique', p: 'po-lee-teek', m: 'policy / politics', t: 2 },
    { h: 'pauvreté', p: 'poh-vruh-tay', m: 'poverty', t: 3 },
    { h: 'égalité', p: 'ay-gah-lee-tay', m: 'equality', t: 3 },
    { h: 'justice', p: 'zhoo-steess', m: 'justice', t: 3 },
    { h: 'citoyenneté', p: 'see-twah-yen-tay', m: 'citizenship', t: 4 },
    // C1 Tech
    { h: 'algorithme', p: 'al-go-reetm', m: 'algorithm', t: 4 },
    { h: 'robot', p: 'ro-bo', m: 'robot', t: 2 },
    { h: 'automatisation', p: 'o-to-mah-tee-zah-syohn', m: 'automation', t: 4 },
    { h: 'intelligence', p: 'an-teh-lee-zhahns', m: 'intelligence', t: 3 },
    { h: 'galaxie', p: 'gah-lahk-see', m: 'galaxy', t: 3 },
    { h: 'orbite', p: 'or-beet', m: 'orbit', t: 3 },
    { h: 'planète', p: 'plah-net', m: 'planet', t: 2 },
    { h: 'fusée', p: 'fy-zay', m: 'rocket', t: 3 },
    // C1 Art
    { h: 'peinture', p: 'pan-tyur', m: 'painting', t: 2 },
    { h: 'chef-d\\'œuvre', p: "shef duh-vruh", m: 'masterpiece', t: 4 },
    { h: 'galerie', p: 'gah-luh-ree', m: 'gallery', t: 2 },
    { h: 'sculpture', p: 'skyl-tyur', m: 'sculpture', t: 3 },
    { h: 'roman', p: 'ro-mahn', m: 'novel', t: 2 },
    { h: 'poésie', p: 'po-ay-zee', m: 'poetry', t: 3 },
    { h: 'auteur', p: 'oh-tur', m: 'author', t: 2 },
    { h: 'métaphore', p: 'may-tah-for', m: 'metaphor', t: 4 }""",

        'de': """    // C1 Business
    { h: 'verhandeln', p: 'fer-HAN-deln', m: 'to negotiate', t: 2 },
    { h: 'Vertrag', p: 'fer-TRAHK', m: 'contract', t: 2 },
    { h: 'Partnerschaft', p: 'PART-ner-shaft', m: 'partnership', t: 3 },
    { h: 'Agenda', p: 'ah-GEN-dah', m: 'agenda', t: 2 },
    { h: 'Markt', p: 'markt', m: 'market', t: 0 },
    { h: 'Kunde', p: 'KOON-deh', m: 'client / customer', t: 2 },
    { h: 'Kampagne', p: 'kam-PAHN-yuh', m: 'campaign', t: 3 },
    { h: 'Einnahmen', p: 'AYN-nah-men', m: 'revenue / income', t: 3 },
    // C1 Politics
    { h: 'wählen', p: 'VAE-len', m: 'to vote', t: 2 },
    { h: 'Demokratie', p: 'deh-moh-krah-TEE', m: 'democracy', t: 3 },
    { h: 'Wahl', p: 'vahl', m: 'election', t: 2 },
    { h: 'Politik', p: 'poh-lee-TEEK', m: 'policy / politics', t: 2 },
    { h: 'Armut', p: 'AR-moot', m: 'poverty', t: 2 },
    { h: 'Gleichheit', p: 'GLAYKH-hyt', m: 'equality', t: 3 },
    { h: 'Gerechtigkeit', p: 'geh-REKHK-tikh-kyt', m: 'justice', t: 3 },
    { h: 'Staatsbürgerschaft', p: 'SHTAHTS-buer-ger-shaft', m: 'citizenship', t: 4 },
    // C1 Tech
    { h: 'Algorithmus', p: 'al-goh-RIT-moos', m: 'algorithm', t: 4 },
    { h: 'Roboter', p: 'roh-BOT-er', m: 'robot', t: 2 },
    { h: 'Automatisierung', p: 'ow-toh-mah-tee-ZEE-roong', m: 'automation', t: 4 },
    { h: 'Intelligenz', p: 'in-tel-ee-GENTS', m: 'intelligence', t: 3 },
    { h: 'Galaxie', p: 'gah-lak-SEE', m: 'galaxy', t: 3 },
    { h: 'Umlaufbahn', p: 'OOM-lowf-bahn', m: 'orbit', t: 3 },
    { h: 'Planet', p: 'plah-NEET', m: 'planet', t: 2 },
    { h: 'Rakete', p: 'rah-KAY-teh', m: 'rocket', t: 2 },
    // C1 Art
    { h: 'Gemälde', p: 'geh-MAEL-deh', m: 'painting', t: 2 },
    { h: 'Meisterwerk', p: 'MAYS-ter-verk', m: 'masterpiece', t: 3 },
    { h: 'Galerie', p: 'gah-luh-REE', m: 'gallery', t: 2 },
    { h: 'Skulptur', p: 'skoolp-TOOR', m: 'sculpture', t: 3 },
    { h: 'Roman', p: 'roh-MAHN', m: 'novel', t: 2 },
    { h: 'Poesie', p: 'poh-eh-ZEE', m: 'poetry', t: 3 },
    { h: 'Autor', p: 'OW-tor', m: 'author', t: 2 },
    { h: 'Metapher', p: 'meh-TAH-fer', m: 'metaphor', t: 4 }""",

        'ja': """    // C1 Business
    { h: '交渉する', p: 'kōshō suru', m: 'to negotiate', t: 0 },
    { h: '契約', p: 'keiyaku', m: 'contract', t: 0 },
    { h: '提携', p: 'teikei', m: 'partnership / collaboration', t: 0 },
    { h: '議題', p: 'gidai', m: 'agenda / topic', t: 0 },
    { h: '市場', p: 'shijō', m: 'market', t: 0 },
    { h: '顧客', p: 'kokyaku', m: 'client / customer', t: 0 },
    { h: 'キャンペーン', p: 'kyanpēn', m: 'campaign', t: 0 },
    { h: '収益', p: 'shūeki', m: 'revenue / income', t: 0 },
    // C1 Politics
    { h: '投票', p: 'tōhyō', m: 'to vote', t: 0 },
    { h: '民主主義', p: 'minshushugi', m: 'democracy', t: 0 },
    { h: '選挙', p: 'senkyo', m: 'election', t: 0 },
    { h: '政策', p: 'seisaku', m: 'policy', t: 0 },
    { h: '貧困', p: 'hinkon', m: 'poverty', t: 0 },
    { h: '平等', p: 'byōdō', m: 'equality', t: 0 },
    { h: '正義', p: 'seigi', m: 'justice', t: 0 },
    { h: '市民権', p: 'shiminken', m: 'citizenship', t: 0 },
    // C1 Tech
    { h: 'アルゴリズム', p: 'arugorizumu', m: 'algorithm', t: 0 },
    { h: 'ロボット', p: 'robotto', m: 'robot', t: 0 },
    { h: '自動化', p: 'jidōka', m: 'automation', t: 0 },
    { h: '知能', p: 'chinō', m: 'intelligence', t: 0 },
    { h: '銀河', p: 'ginga', m: 'galaxy', t: 0 },
    { h: '軌道', p: 'kidō', m: 'orbit', t: 0 },
    { h: '惑星', p: 'wakusei', m: 'planet', t: 0 },
    { h: 'ロケット', p: 'roketto', m: 'rocket', t: 0 },
    // C1 Art
    { h: '絵画', p: 'kaiga', m: 'painting', t: 0 },
    { h: '傑作', p: 'kessaku', m: 'masterpiece', t: 0 },
    { h: '画廊', p: 'garō', m: 'gallery', t: 0 },
    { h: '彫刻', p: 'chōkoku', m: 'sculpture', t: 0 },
    { h: '小説', p: 'shōsetsu', m: 'novel', t: 0 },
    { h: '詩', p: 'shi', m: 'poetry / poem', t: 0 },
    { h: '著者', p: 'chosha', m: 'author', t: 0 },
    { h: '比喩', p: 'hiyu', m: 'metaphor', t: 0 }""",

        'ko': """    // C1 Business
    { h: '협상하다', p: 'hyeopsanghada', m: 'to negotiate', t: 0 },
    { h: '계약', p: 'gyeyak', m: 'contract', t: 0 },
    { h: '파트너십', p: 'pateuneosip', m: 'partnership', t: 0 },
    { h: '의제', p: 'uije', m: 'agenda', t: 0 },
    { h: '시장', p: 'sijang', m: 'market', t: 0 },
    { h: '고객', p: 'gogaek', m: 'client / customer', t: 0 },
    { h: '캠페인', p: 'kaempein', m: 'campaign', t: 0 },
    { h: '수익', p: 'suik', m: 'revenue / income', t: 0 },
    // C1 Politics
    { h: '투표', p: 'tupyo', m: 'to vote / ballot', t: 0 },
    { h: '민주주의', p: 'minjujuui', m: 'democracy', t: 0 },
    { h: '선거', p: 'seongeo', m: 'election', t: 0 },
    { h: '정책', p: 'jeongchaek', m: 'policy', t: 0 },
    { h: '빈곤', p: 'bingon', m: 'poverty', t: 0 },
    { h: '평등', p: 'pyeongdeung', m: 'equality', t: 0 },
    { h: '정의', p: 'jeongui', m: 'justice', t: 0 },
    { h: '시민권', p: 'siminkwon', m: 'citizenship', t: 0 },
    // C1 Tech
    { h: '알고리즘', p: 'algorijeum', m: 'algorithm', t: 0 },
    { h: '로봇', p: 'robot', m: 'robot', t: 0 },
    { h: '자동화', p: 'jadonghwa', m: 'automation', t: 0 },
    { h: '지능', p: 'jineung', m: 'intelligence', t: 0 },
    { h: '은하', p: 'eunha', m: 'galaxy', t: 0 },
    { h: '궤도', p: 'gwedo', m: 'orbit', t: 0 },
    { h: '행성', p: 'haengseong', m: 'planet', t: 0 },
    { h: '로켓', p: 'roket', m: 'rocket', t: 0 },
    // C1 Art
    { h: '회화', p: 'hoehwa', m: 'painting', t: 0 },
    { h: '걸작', p: 'geoljak', m: 'masterpiece', t: 0 },
    { h: '화랑', p: 'hwarang', m: 'gallery', t: 0 },
    { h: '조각', p: 'jogak', m: 'sculpture', t: 0 },
    { h: '소설', p: 'soseol', m: 'novel', t: 0 },
    { h: '시', p: 'si', m: 'poetry', t: 0 },
    { h: '저자', p: 'jeoja', m: 'author', t: 0 },
    { h: '비유', p: 'biyu', m: 'metaphor', t: 0 }""",

        'it': """    // C1 Business
    { h: 'negoziare', p: 'neh-goh-TSYAH-reh', m: 'to negotiate', t: 1 },
    { h: 'contratto', p: 'con-TRAHT-toh', m: 'contract', t: 2 },
    { h: 'collaborazione', p: 'col-lah-boh-rah-TSYOH-neh', m: 'partnership / collaboration', t: 2 },
    { h: 'agenda', p: 'ah-JEN-dah', m: 'agenda', t: 1 },
    { h: 'mercato', p: 'mehr-CAH-toh', m: 'market', t: 1 },
    { h: 'cliente', p: 'klyen-teh', m: 'client / customer', t: 1 },
    { h: 'campagna', p: 'cam-PAHN-yah', m: 'campaign', t: 2 },
    { h: 'entrate', p: 'en-TRAH-teh', m: 'revenue / income', t: 2 },
    // C1 Politics
    { h: 'votare', p: 'boh-TAH-reh', m: 'to vote', t: 1 },
    { h: 'democrazia', p: 'deh-moh-crah-TSEE-ah', m: 'democracy', t: 2 },
    { h: 'elezione', p: 'eh-leh-TSYOH-neh', m: 'election', t: 2 },
    { h: 'politica', p: 'poh-LEE-tee-cah', m: 'policy / politics', t: 1 },
    { h: 'povertà', p: 'poh-vehr-TAH', m: 'poverty', t: 2 },
    { h: 'uguaglianza', p: 'oo-gwahl-YAHN-tsah', m: 'equality', t: 3 },
    { h: 'giustizia', p: 'joos-TEET-syah', m: 'justice', t: 2 },
    { h: 'cittadinanza', p: 'cheet-tah-dee-NAHN-tsah', m: 'citizenship', t: 4 },
    // C1 Tech
    { h: 'algoritmo', p: 'al-goh-REET-moh', m: 'algorithm', t: 3 },
    { h: 'robot', p: 'roh-BOT', m: 'robot', t: 1 },
    { h: 'automazione', p: 'ow-toh-mah-TSYOH-neh', m: 'automation', t: 4 },
    { h: 'intelligenza', p: 'een-tel-lee-JHEN-tsah', m: 'intelligence', t: 2 },
    { h: 'galassia', p: 'gah-LAHS-syah', m: 'galaxy', t: 2 },
    { h: 'orbita', p: 'OR-bee-tah', m: 'orbit', t: 2 },
    { h: 'pianeta', p: 'pyah-NEH-tah', m: 'planet', t: 1 },
    { h: 'razzo', p: 'RAHT-tsoh', m: 'rocket', t: 1 },
    // C1 Art
    { h: 'pittura', p: 'peet-TOO-rah', m: 'painting', t: 1 },
    { h: 'capolavoro', p: 'cah-poh-lah-VOH-roh', m: 'masterpiece', t: 2 },
    { h: 'galleria', p: 'gahl-leh-REE-ah', m: 'gallery', t: 1 },
    { h: 'sculpture', p: 'scool-TOO-rah', m: 'sculpture', t: 2 },
    { h: 'romanzo', p: 'roh-MAHN-tsoh', m: 'novel', t: 1 },
    { h: 'poesia', p: 'poh-eh-SEE-ah', m: 'poetry', t: 2 },
    { h: 'autore', p: 'ow-TOH-reh', m: 'author', t: 1 },
    { h: 'metafora', p: 'meh-TAH-foh-rah', m: 'metaphor', t: 4 }""",

        'en': """    // C1 Business
    { h: 'negotiate', p: 'nih-GOH-shee-eyt', m: 'to negotiate', t: 2 },
    { h: 'contract', p: 'KON-trakt', m: 'contract', t: 1 },
    { h: 'partnership', p: 'PART-ner-ship', m: 'partnership / collaboration', t: 1 },
    { h: 'agenda', p: 'uh-JEN-duh', m: 'agenda', t: 1 },
    { h: 'market', p: 'MAHR-kit', m: 'market', t: 1 },
    { h: 'customer', p: 'KUS-tuh-mer', m: 'client / customer', t: 1 },
    { h: 'campaign', p: 'kam-PEYN', m: 'campaign', t: 2 },
    { h: 'revenue', p: 'REV-uh-nyoo', m: 'revenue / income', t: 2 },
    // C1 Politics
    { h: 'vote', p: 'voht', m: 'to vote', t: 1 },
    { h: 'democracy', p: 'dih-MOK-ruh-see', m: 'democracy', t: 2 },
    { h: 'election', p: 'ih-LEK-shuhn', m: 'election', t: 1 },
    { h: 'policy', p: 'POL-uh-see', m: 'policy / rules', t: 1 },
    { h: 'poverty', p: 'POV-er-tee', m: 'poverty', t: 2 },
    { h: 'equality', p: 'ih-KWOL-i-tee', m: 'equality', t: 2 },
    { h: 'justice', p: 'JUS-tis', m: 'justice', t: 1 },
    { h: 'citizenship', p: 'SIT-i-zuhn-ship', m: 'citizenship', t: 3 },
    // C1 Tech
    { h: 'algorithm', p: 'AL-guh-rith-uhm', m: 'algorithm', t: 3 },
    { h: 'robot', p: 'ROH-bot', m: 'robot', t: 1 },
    { h: 'automation', p: 'aw-tuh-MEY-shuhn', m: 'automation', t: 3 },
    { h: 'intelligence', p: 'in-TEL-i-juhns', m: 'intelligence', t: 1 },
    { h: 'galaxy', p: 'GAL-uhk-see', m: 'galaxy', t: 2 },
    { h: 'orbit', p: 'AWR-bit', m: 'orbit', t: 2 },
    { h: 'planet', p: 'PLAN-it', m: 'planet', t: 1 },
    { h: 'rocket', p: 'ROK-it', m: 'rocket', t: 1 },
    // C1 Art
    { h: 'painting', p: 'PEYN-ting', m: 'painting', t: 1 },
    { h: 'masterpiece', p: 'MAS-ter-pees', m: 'masterpiece', t: 2 },
    { h: 'gallery', p: 'GAL-uh-ree', m: 'gallery', t: 1 },
    { h: 'sculpture', p: 'SKULP-cher', m: 'sculpture', t: 2 },
    { h: 'novel', p: 'NOV-uhl', m: 'novel', t: 1 },
    { h: 'poetry', p: 'POH-i-tree', m: 'poetry', t: 2 },
    { h: 'author', p: 'AW-ther', m: 'author', t: 1 },
    { h: 'metaphor', p: 'MET-uh-fawr', m: 'metaphor', t: 3 }""",

        'ar': """    // C1 Business
    { h: 'يتفاوض', p: 'yatafawad', m: 'to negotiate', t: 1 },
    { h: 'عقد', p: '‘aqd', m: 'contract', t: 1 },
    { h: 'شراكة', p: 'sharakah', m: 'partnership', t: 1 },
    { h: 'جدول أعمال', p: 'jadwal a‘mal', m: 'agenda', t: 2 },
    { h: 'سوق', p: 'suq', m: 'market', t: 1 },
    { h: 'عميل', p: '‘amil', m: 'client / customer', t: 1 },
    { h: 'حملة', p: 'hamlah', m: 'campaign', t: 1 },
    { h: 'إيرادات', p: 'iradāt', m: 'revenue / income', t: 2 },
    // C1 Politics
    { h: 'يصوت', p: 'yusawwit', m: 'to vote', t: 1 },
    { h: 'ديمقراطية', p: 'dimuqratiyyah', m: 'democracy', t: 2 },
    { h: 'انتخابات', p: 'intikhabāt', m: 'election', t: 2 },
    { h: 'سياسة', p: 'siyasah', m: 'politics / policy', t: 1 },
    { h: 'فقر', p: 'faqr', m: 'poverty', t: 1 },
    { h: 'مساواة', p: 'musawah', m: 'equality', t: 2 },
    { h: 'عدالة', p: '‘adalah', m: 'justice', t: 2 },
    { h: 'مواطنة', p: 'muwatanah', m: 'citizenship', t: 2 },
    // C1 Tech
    { h: 'خوارزمية', p: 'khawarizmiyyah', m: 'algorithm', t: 3 },
    { h: 'روبوت', p: 'rubut', m: 'robot', t: 1 },
    { h: 'أتمتة', p: 'atmatah', m: 'automation', t: 2 },
    { h: 'ذكاء', p: "dhaka'", m: 'intelligence', t: 1 },
    { h: 'مجرة', p: 'majarrah', m: 'galaxy', t: 2 },
    { h: 'مدار', p: 'madar', m: 'orbit', t: 2 },
    { h: 'كوكب', p: 'kawkab', m: 'planet', t: 1 },
    { h: 'صاروخ', p: 'sarukh', m: 'rocket', t: 1 },
    // C1 Art
    { h: 'لوحة', p: 'lawhah', m: 'painting / board', t: 1 },
    { h: 'تحفة فنية', p: 'tuhfah fanniyyah', m: 'masterpiece', t: 2 },
    { h: 'معرض', p: 'ma‘rid', m: 'gallery', t: 1 },
    { h: 'نحت', p: 'naht', m: 'sculpture', t: 1 },
    { h: 'رواية', p: 'riwayah', m: 'novel', t: 1 },
    { h: 'شعر', p: 'shi‘r', m: 'poetry', t: 1 },
    { h: 'مؤلف', p: "mu'allif", m: 'author', t: 1 },
    { h: 'استعارة', p: 'isti‘arah', m: 'metaphor', t: 2 }"""
    }

    lines = content.split('\n')
    output_lines = []
    current_lang = None
    in_array = False
    
    for i, line in enumerate(lines):
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\[', line)
        if lang_match:
            current_lang = lang_match.group(1)
            in_array = True
            output_lines.append(line)
            continue
            
        if in_array and re.match(r'^\s*\],', line):
            vocab_insert = vocab_inserts.get(current_lang)
            if vocab_insert:
                output_lines.append(vocab_insert)
            in_array = False
            current_lang = None
            output_lines.append(line)
            continue
            
        output_lines.append(line)

    new_content = '\n'.join(output_lines)
    with open(vocab_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Vocab appended successfully.")

def append_sentences():
    sentences_file = 'frontend/src/data/lessonSentences.ts'
    if not os.path.exists(sentences_file):
        print(f"Error: Could not find {sentences_file}")
        return
        
    with open(sentences_file, 'r', encoding='utf-8') as f:
        content = f.read()

    sentence_inserts = {
        'zh': """    901: [
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
    ]""",

        'es': """    901: [
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
    ]""",

        'fr': """    901: [
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
    ]""",

        'de': """    901: [
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
    ]""",

        'ja': """    901: [
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
    ]""",

        'ko': """    901: [
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
    ]""",

        'it': """    901: [
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
    ]""",

        'en': """    901: [
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
    ]""",

        'ar': """    901: [
      { target: 'نحتاج إلى التفاوض على عقد الشراكة غداً.', rom: 'Nahtaju ila at-tafawudi \\'ala \\'aqdi ash-sharakati ghadan.', en: 'We need to negotiate the partnership contract tomorrow.' }
    ],
    902: [
      { target: 'تحليل السوق والحملة يساعد في زيادة الإيرادات.', rom: 'Tahlilu as-suqi wal-hamlati yusa\\'idu fi ziyadati al-iradat.', en: 'Analyzing the market and the campaign helps increase revenue.' }
    ],
    1001: [
      { target: 'يشارك المواطنون في الديمقراطية بالتصويت في الانتخابات.', rom: 'Yushariku al-muwatinuna fi ad-dimuqratiyyati bit-taswiti fi al-intikhabat.', en: 'Citizens participate in democracy by voting in elections.' }
    ],
    1002: [
      { target: 'محاربة الفقر هي سياسة رئيسية لتحقيق العدالة والمساواة.', rom: 'Muharabatu al-faqri hiya siyasatun ra\\'isiyyatun litahqiqi al-\\'adalati wal-musawah.', en: 'Fighting poverty is a key policy for achieving justice and equality.' }
    ],
    1101: [
      { target: 'خوارزمية الذكاء الاصطناعي تدير الأتمتة الصناعية.', rom: 'Khawarizmiyyatu adh-dhaka\\'i al-istina\\'iyyi tudiru al-atmatata as-sina\\'iyyah.', en: 'The artificial intelligence algorithm manages industrial automation.' }
    ],
    1102: [
      { target: 'يدخل الصاروخ في مدار لاستكشاف كواكب في المجرة.', rom: 'Yadkhulu as-sarukhu fi madarin listikshafi kawakiba fil-majarrah.', en: 'The rocket enters orbit to explore planets in the galaxy.' }
    ],
    1201: [
      { target: 'يضم المعرض لوحات كلاسيكية وتحفاً فنية ومنحوتات.', rom: 'Yadummu al-ma\\'ridu lawhatin klasīkiyyah wa-tuhfan fanniyyah wa-manhutāt.', en: 'The gallery houses classical paintings, masterpieces, and sculptures.' }
    ],
    1202: [
      { target: 'يستخدم المؤلف استعارات شعرية في روايته الجديدة.', rom: 'Yastakhdimu al-mu\\'allifu isti\\'aratin shi\\'riyyatan fi riwayatihi al-jadidah.', en: 'The author uses poetic metaphors in his new novel.' }
    ]"""
    }

    lines = content.split('\n')
    output_lines = []
    current_lang = None
    in_record = False
    
    for i, line in enumerate(lines):
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\{', line)
        if lang_match:
            current_lang = lang_match.group(1)
            in_record = True
            output_lines.append(line)
            continue
            
        if in_record and re.match(r'^\s*\},', line):
            if len(output_lines) > 0:
                output_lines[-1] = output_lines[-1].rstrip() + ","
            
            sentence_insert = sentence_inserts.get(current_lang)
            if sentence_insert:
                output_lines.append(sentence_insert)
            in_record = False
            current_lang = None
            output_lines.append(line)
            continue
            
        output_lines.append(line)
        
    new_content = '\n'.join(output_lines)
    with open(sentences_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Sentences appended successfully.")

if __name__ == '__main__':
    append_units()
    append_vocab()
    append_sentences()
