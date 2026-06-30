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
        'zh': """    { id: 13, title: 'Literature & Philosophy', emoji: '📚', lessons: [
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
    ]}""",

        'es': """    { id: 13, title: 'Literatura y Filosofía', emoji: '📚', lessons: [
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
    ]}""",

        'fr': """    { id: 13, title: 'Littérature et Philosophie', emoji: '📚', lessons: [
      { id: 1301, title: 'Philosophie Classique', words: ['philosophie', 'confucianisme', 'taoïsme', 'bienveillance'] },
      { id: 1302, title: 'Analyse Littéraire', words: ['analyse', 'récit', 'symbole', 'critique'] },
      { id: 1309, title: 'Unit Test', words: ['Review', 'Quiz', 'Practice', 'Mastery'] }
    ]},
    { id: 14, title: 'Droit et Justice', emoji: '⚖️', lessons: [
      { id: 1401, title: 'Système Juridique', words: ['loi', 'constitution', 'litige', 'défense'] },
      { id: 1402, title: 'Droits de l\\'Homme', words: ['droits', 'liberté', 'égalité', 'dignité'] },
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
    ]}""",

        'de': """    { id: 13, title: 'Literatur & Philosophie', emoji: '📚', lessons: [
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
    ]}""",

        'ja': """    { id: 13, title: '文学と哲学', emoji: '📚', lessons: [
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
    ]}""",

        'ko': """    { id: 13, title: '문학과 철학', emoji: '📚', lessons: [
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
    ]}""",

        'it': """    { id: 13, title: 'Letteratura e Filosofia', emoji: '📚', lessons: [
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
    ]}""",

        'en': """    { id: 13, title: 'Literature & Philosophy', emoji: '📚', lessons: [
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
    ]}""",

        'ar': """    { id: 13, title: 'الأدب والفلسفة', emoji: '📚', lessons: [
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
    ]}"""
    }

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
    print("Units C2 appended successfully.")

def append_vocab():
    vocab_file = 'frontend/src/data/vocab.ts'
    if not os.path.exists(vocab_file):
        print(f"Error: Could not find {vocab_file}")
        return
        
    with open(vocab_file, 'r', encoding='utf-8') as f:
        content = f.read()

    vocab_inserts = {
        'zh': """    // C2 Literature & Philosophy
    { h: '哲学', p: 'zhéxué', m: 'philosophy', t: 4 },
    { h: '儒家', p: 'Rújiā', m: 'Confucianism', t: 4 },
    { h: '道家', p: 'Dàojiā', m: 'Taoism', t: 4 },
    { h: '仁爱', p: 'rén\\'ài', m: 'benevolence / humanity', t: 4 },
    { h: '分析', p: 'fēnxī', m: 'to analyze / analysis', t: 3 },
    { h: '叙事', p: 'xùshì', m: 'narrative / storytelling', t: 4 },
    { h: '象征', p: 'xiàngzhēng', m: 'symbol / to symbolize', t: 4 },
    { h: '批判', p: 'pīpàn', m: 'criticism / to criticize', t: 4 },
    // C2 Law & Justice
    { h: '法律', p: 'fǎlǜ', m: 'law', t: 3 },
    { h: '宪法', p: 'xiànfǎ', m: 'constitution', t: 4 },
    { h: '诉讼', p: 'sùsòng', m: 'lawsuit / litigation', t: 4 },
    { h: '辩护', p: 'biànhù', m: 'defense / to defend', t: 4 },
    { h: '人权', p: 'rénquán', m: 'human rights', t: 4 },
    { h: '自由', p: 'zìyóu', m: 'freedom / liberty', t: 3 },
    { h: '平等', p: 'píngděng', m: 'equality', t: 4 },
    { h: '尊严', p: 'zūnyán', m: 'dignity', t: 4 },
    // C2 Finance & Economics
    { h: '经济', p: 'jīngjì', m: 'economy', t: 3 },
    { h: '通胀', p: 'tōngzhàng', m: 'inflation', t: 4 },
    { h: '贸易', p: 'màoyì', m: 'trade', t: 4 },
    { h: '金融', p: 'jīnróng', m: 'finance', t: 4 },
    { h: '投资', p: 'tóuzī', m: 'investment / to invest', t: 3 },
    { h: '股票', p: 'gǔpiào', m: 'stocks / share', t: 4 },
    { h: '债券', p: 'zhàiquàn', m: 'bonds', t: 4 },
    { h: '风险', p: 'fēngxiǎn', m: 'risk / hazard', t: 4 },
    // C2 Environment & Ethics
    { h: '气候', p: 'qìhòu', m: 'climate', t: 3 },
    { h: '排放', p: 'páifàng', m: 'emission', t: 4 },
    { h: '环保', p: 'huánbǎo', m: 'environmental protection', t: 4 },
    { h: '生态', p: 'shēngtài', m: 'ecology / ecosystem', t: 4 },
    { h: '伦理', p: 'lúnlǐ', m: 'ethics', t: 4 },
    { h: '基因', p: 'jīyīn', m: 'gene', t: 4 },
    { h: '克隆', p: 'kèlóng', m: 'cloning', t: 4 },
    { h: '道德', p: 'dàodé', m: 'morality / morals', t: 4 }""",

        'es': """    // C2 Literature & Philosophy
    { h: 'filosofía', p: 'fee-loh-soh-FEE-ah', m: 'philosophy', t: 3 },
    { h: 'confucianismo', p: 'con-foo-thyah-NEES-moh', m: 'Confucianism', t: 4 },
    { h: 'taoísmo', p: 'tah-OEES-moh', m: 'Taoism', t: 4 },
    { h: 'benevolencia', p: 'beh-neh-boh-LEN-thyah', m: 'benevolence', t: 4 },
    { h: 'análisis', p: 'ah-NAH-lee-sees', m: 'analysis', t: 3 },
    { h: 'narrativa', p: 'nah-rah-TEE-bah', m: 'narrative', t: 3 },
    { h: 'símbolo', p: 'SEEM-boh-loh', m: 'symbol', t: 3 },
    { h: 'crítica', p: 'CREE-tee-cah', m: 'criticism / review', t: 3 },
    // C2 Law & Justice
    { h: 'ley', p: 'lay', m: 'law', t: 2 },
    { h: 'constitución', p: 'con-stee-too-THYON', m: 'constitution', t: 3 },
    { h: 'litigio', p: 'lee-TEE-hyoh', m: 'litigation / lawsuit', t: 4 },
    { h: 'defensa', p: 'deh-FEN-sah', m: 'defense', t: 2 },
    { h: 'derechos', p: 'deh-REH-chos', m: 'rights', t: 2 },
    { h: 'libertad', p: 'lee-behr-TAD', m: 'freedom / liberty', t: 3 },
    { h: 'igualdad', p: 'ee-gwal-DAD', m: 'equality', t: 3 },
    { h: 'dignidad', p: 'deeg-nee-DAD', m: 'dignity', t: 3 },
    // C2 Finance & Economics
    { h: 'economía', p: 'eh-coh-noh-MEE-ah', m: 'economy', t: 3 },
    { h: 'inflación', p: 'een-flah-THYON', m: 'inflation', t: 3 },
    { h: 'comercio', p: 'coh-MEHR-thyoh', m: 'trade / commerce', t: 2 },
    { h: 'finanzas', p: 'fee-NAHN-thas', m: 'finance', t: 3 },
    { h: 'inversión', p: 'een-behr-SYON', m: 'investment', t: 3 },
    { h: 'acciones', p: 'ac-THYOH-nes', m: 'stocks / shares', t: 3 },
    { h: 'bonos', p: 'BOH-nos', m: 'bonds', t: 3 },
    { h: 'riesgo', p: 'RYES-goh', m: 'risk', t: 2 },
    // C2 Environment & Ethics
    { h: 'clima', p: 'CLEE-mah', m: 'climate', t: 2 },
    { h: 'emisiones', p: 'eh-mee-SYOH-nes', m: 'emissions', t: 3 },
    { h: 'ecología', p: 'eh-coh-loh-HEE-ah', m: 'ecology', t: 3 },
    { h: 'protección', p: 'proh-tec-THYON', m: 'protection', t: 3 },
    { h: 'ética', p: 'EH-tee-cah', m: 'ethics', t: 3 },
    { h: 'genes', p: 'HEH-nes', m: 'genes', t: 3 },
    { h: 'clonación', p: 'cloh-nah-THYON', m: 'cloning', t: 4 },
    { h: 'moral', p: 'moh-RAL', m: 'morality / moral', t: 3 }""",

        'fr': """    // C2 Literature & Philosophy
    { h: 'philosophie', p: 'fee-lo-zo-fee', m: 'philosophy', t: 3 },
    { h: 'confucianisme', p: 'kon-fy-syah-neesm', m: 'Confucianism', t: 4 },
    { h: 'taoïsme', p: 'tah-o-eesm', m: 'Taoism', t: 4 },
    { h: 'bienveillance', p: 'byan-vay-yahns', m: 'benevolence / kindness', t: 4 },
    { h: 'analyse', p: 'ah-nah-leez', m: 'analysis', t: 3 },
    { h: 'récit', p: 'ray-see', m: 'narrative / story', t: 3 },
    { h: 'symbole', p: 'san-bol', m: 'symbol', t: 3 },
    { h: 'critique', p: 'kree-teek', m: 'criticism / review', t: 3 },
    // C2 Law & Justice
    { h: 'loi', p: 'lwah', m: 'law', t: 2 },
    { h: 'constitution', p: 'kon-stee-tyoo-syohn', m: 'constitution', t: 3 },
    { h: 'litige', p: 'lee-teezh', m: 'litigation / dispute', t: 4 },
    { h: 'défense', p: 'day-fahns', m: 'defense', t: 2 },
    { h: 'droits', p: 'drwah', m: 'rights', t: 2 },
    { h: 'liberté', p: 'lee-bair-tay', m: 'freedom / liberty', t: 3 },
    { h: 'égalité', p: 'ay-gah-lee-tay', m: 'equality', t: 3 },
    { h: 'dignité', p: 'deen-yee-tay', m: 'dignity', t: 3 },
    // C2 Finance & Economics
    { h: 'économie', p: 'ay-co-no-mee', m: 'economy', t: 3 },
    { h: 'inflation', p: 'an-flah-syohn', m: 'inflation', t: 3 },
    { h: 'commerce', p: 'co-mairss', m: 'trade / commerce', t: 2 },
    { h: 'finance', p: 'fee-nahns', m: 'finance', t: 3 },
    { h: 'investissement', p: 'an-veh-stees-mahn', m: 'investment', t: 3 },
    { h: 'actions', p: 'ahk-syohn', m: 'stocks / actions', t: 3 },
    { h: 'obligations', p: 'o-blee-gah-syohn', m: 'bonds', t: 3 },
    { h: 'risque', p: 'reesk', m: 'risk', t: 2 },
    // C2 Environment & Ethics
    { h: 'climat', p: 'clee-mah', m: 'climate', t: 2 },
    { h: 'émissions', p: 'ay-mee-syohn', m: 'emissions', t: 3 },
    { h: 'écologie', p: 'ay-co-lo-zhee', m: 'ecology', t: 3 },
    { h: 'protection', p: 'pro-tek-syohn', m: 'protection', t: 3 },
    { h: 'éthique', p: 'ay-teek', m: 'ethics', t: 3 },
    { h: 'gène', p: 'zhen', m: 'gene', t: 3 },
    { h: 'clonage', p: 'clo-nahzh', m: 'cloning', t: 4 },
    { h: 'morale', p: 'mo-rahl', m: 'morality / moral', t: 3 }""",

        'de': """    // C2 Literature & Philosophy
    { h: 'Philosophie', p: 'fee-lo-zo-FEE', m: 'philosophy', t: 3 },
    { h: 'Konfuzianismus', p: 'kon-foo-tsyah-NIS-moos', m: 'Confucianism', t: 4 },
    { h: 'Taoismus', p: 'tow-IS-moos', m: 'Taoism', t: 4 },
    { h: 'Barmherzigkeit', p: 'barm-HERTS-ikh-kyt', m: 'benevolence / mercy', t: 4 },
    { h: 'Analyse', p: 'ah-nah-LUE-zeh', m: 'analysis', t: 3 },
    { h: 'Erzählung', p: 'er-TSAE-loong', m: 'narrative / story', t: 3 },
    { h: 'Symbol', p: 'zuem-BOHL', m: 'symbol', t: 3 },
    { h: 'Kritik', p: 'kree-TEEK', m: 'criticism / review', t: 3 },
    // C2 Law & Justice
    { h: 'Gesetz', p: 'geh-ZETS', m: 'law / statute', t: 2 },
    { h: 'Verfassung', p: 'fer-FAS-soong', m: 'constitution', t: 3 },
    { h: 'Rechtsstreit', p: 'REKHTS-shtryt', m: 'litigation / lawsuit', t: 4 },
    { h: 'Verteidigung', p: 'fer-TY-dee-goong', m: 'defense', t: 3 },
    { h: 'Rechte', p: 'REKH-teh', m: 'rights', t: 2 },
    { h: 'Freiheit', p: 'FRY-hyt', m: 'freedom / liberty', t: 3 },
    { h: 'Gleichheit', p: 'GLAYKH-hyt', m: 'equality', t: 3 },
    { h: 'Würde', p: 'WUER-deh', m: 'dignity', t: 3 },
    // C2 Finance & Economics
    { h: 'Wirtschaft', p: 'VIRT-shaft', m: 'economy', t: 3 },
    { h: 'Inflation', p: 'in-flah-TSYOHN', m: 'inflation', t: 3 },
    { h: 'Handel', p: 'HAN-del', m: 'trade / commerce', t: 2 },
    { h: 'Finanzen', p: 'fee-NANT-sen', m: 'finance', t: 3 },
    { h: 'Investition', p: 'in-ves-tee-TSYOHN', m: 'investment', t: 3 },
    { h: 'Aktien', p: 'AK-tsyen', m: 'stocks / shares', t: 3 },
    { h: 'Anleihen', p: 'AN-ly-en', m: 'bonds', t: 3 },
    { h: 'Risiko', p: 'REE-zee-koh', m: 'risk', t: 2 },
    // C2 Environment & Ethics
    { h: 'Klima', p: 'KLEE-mah', m: 'climate', t: 2 },
    { h: 'Emissionen', p: 'eh-mee-SYOH-nen', m: 'emissions', t: 3 },
    { h: 'Ökologie', p: 'oe-koh-loh-GEE', m: 'ecology', t: 3 },
    { h: 'Umweltschutz', p: 'OOM-velt-shuts', m: 'environmental protection', t: 3 },
    { h: 'Ethik', p: 'AY-tik', m: 'ethics', t: 3 },
    { h: 'Gen', p: 'gehn', m: 'gene', t: 3 },
    { h: 'Klonen', p: 'KLOH-nen', m: 'cloning', t: 4 },
    { h: 'Moral', p: 'moh-RAHL', m: 'morality / morals', t: 3 }""",

        'ja': """    // C2 Literature & Philosophy
    { h: '哲学', p: 'tetsugaku', m: 'philosophy', t: 0 },
    { h: '儒教', p: 'jukyō', m: 'Confucianism', t: 0 },
    { h: '道教', p: 'dōkyō', m: 'Taoism', t: 0 },
    { h: '仁愛', p: 'jin\\'ai', m: 'benevolence', t: 0 },
    { h: '分析', p: 'bunseki', m: 'analysis', t: 0 },
    { h: '叙事', p: 'joji', m: 'narrative', t: 0 },
    { h: '象徴', p: 'shōchō', m: 'symbol', t: 0 },
    { h: '批判', p: 'hihan', m: 'criticism', t: 0 },
    // C2 Law & Justice
    { h: '法律', p: 'hōritsu', m: 'law', t: 0 },
    { h: '憲法', p: 'kenpō', m: 'constitution', t: 0 },
    { h: '訴訟', p: 'soshō', m: 'litigation / lawsuit', t: 0 },
    { h: '辩护', p: 'bengo', m: 'defense', t: 0 },
    { h: '人権', p: 'jinken', m: 'human rights', t: 0 },
    { h: '自由', p: 'jiyū', m: 'freedom / liberty', t: 0 },
    { h: '平等', p: 'byōdō', m: 'equality', t: 0 },
    { h: '尊厳', p: 'songen', m: 'dignity', t: 0 },
    // C2 Finance & Economics
    { h: '経済', p: 'keizai', m: 'economy', t: 0 },
    { h: 'インフレ', p: 'infure', m: 'inflation', t: 0 },
    { h: '貿易', p: 'bōeki', m: 'trade', t: 0 },
    { h: '金融', p: 'kin\\'yū', m: 'finance', t: 0 },
    { h: '投資', p: 'tōshi', m: 'investment', t: 0 },
    { h: '株式', p: 'kabushiki', m: 'stocks', t: 0 },
    { h: '債券', p: 'saiken', m: 'bonds', t: 0 },
    { h: 'リスク', p: 'risuku', m: 'risk', t: 0 },
    // C2 Environment & Ethics
    { h: '気候', p: 'kikō', m: 'climate', t: 0 },
    { h: '排出量', p: 'haishutsuryō', m: 'emissions', t: 0 },
    { h: '環境保護', p: 'kankyōhogo', m: 'environmental protection', t: 0 },
    { h: '生態系', p: 'seitaikei', m: 'ecology / ecosystem', t: 0 },
    { h: '倫理', p: 'rinri', m: 'ethics', t: 0 },
    { h: '遺伝子', p: 'idenshi', m: 'gene', t: 0 },
    { h: 'クローン', p: 'kurōn', m: 'cloning', t: 0 },
    { h: '道徳', p: 'dōtoku', m: 'morality / morals', t: 0 }""",

        'ko': """    // C2 Literature & Philosophy
    { h: '철학', p: 'cheolhak', m: 'philosophy', t: 0 },
    { h: '유교', p: 'yugyo', m: 'Confucianism', t: 0 },
    { h: '도교', p: 'dogyo', m: 'Taoism', t: 0 },
    { h: '인애', p: 'inae', m: 'benevolence', t: 0 },
    { h: '분석', p: 'bunseok', m: 'analysis', t: 0 },
    { h: '서사', p: 'seosa', m: 'narrative', t: 0 },
    { h: '상징', p: 'sangjing', m: 'symbol', t: 0 },
    { h: '비판', p: 'bipan', m: 'criticism', t: 0 },
    // C2 Law & Justice
    { h: '법률', p: 'beobryul', m: 'law', t: 0 },
    { h: '헌법', p: 'heonbeob', m: 'constitution', t: 0 },
    { h: '소송', p: 'sosong', m: 'litigation / lawsuit', t: 0 },
    { h: '변호', p: 'byeonho', m: 'defense', t: 0 },
    { h: '인권', p: 'inkwon', m: 'human rights', t: 0 },
    { h: '자유', p: 'jayu', m: 'freedom / liberty', t: 0 },
    { h: '평등', p: 'pyeongdeung', m: 'equality', t: 0 },
    { h: '존엄', p: 'joneom', m: 'dignity', t: 0 },
    // C2 Finance & Economics
    { h: '경제', p: 'gyeongje', m: 'economy', t: 0 },
    { h: '인플레이션', p: 'inpleisyeon', m: 'inflation', t: 0 },
    { h: '무역', p: 'muyeok', m: 'trade', t: 0 },
    { h: '금융', p: 'geumnyung', m: 'finance', t: 0 },
    { h: '투자', p: 'tuja', m: 'investment', t: 0 },
    { h: '주식', p: 'jusik', m: 'stocks', t: 0 },
    { h: '채권', p: 'chaegwon', m: 'bonds', t: 0 },
    { h: '위험', p: 'wiheom', m: 'risk', t: 0 },
    // C2 Environment & Ethics
    { h: '기후', p: 'gihu', m: 'climate', t: 0 },
    { h: '배출', p: 'baechul', m: 'emissions', t: 0 },
    { h: '환경 보호', p: 'hwangyeong boho', m: 'environmental protection', t: 0 },
    { h: '생태', p: 'saengtae', m: 'ecology / ecosystem', t: 0 },
    { h: '윤리', p: 'yunri', m: 'ethics', t: 0 },
    { h: '유전자', p: 'yujeonja', m: 'gene', t: 0 },
    { h: '복제', p: 'bokje', m: 'cloning', t: 0 },
    { h: '도덕', p: 'dodeok', m: 'morality / morals', t: 0 }""",

        'it': """    // C2 Literature & Philosophy
    { h: 'filosofia', p: 'fee-loh-soh-FEE-ah', m: 'philosophy', t: 1 },
    { h: 'confucianesimo', p: 'con-foo-chah-NEES-moh', m: 'Confucianism', t: 2 },
    { h: 'taoismo', p: 'tah-OEES-moh', m: 'Taoism', t: 2 },
    { h: 'benevolenza', p: 'beh-neh-boh-LEN-tsah', m: 'benevolence', t: 2 },
    { h: 'analisi', p: 'ah-NAH-lee-see', m: 'analysis', t: 1 },
    { h: 'narrativa', p: 'nah-rah-TEE-vah', m: 'narrative', t: 1 },
    { h: 'simbolo', p: 'SEEM-boh-loh', m: 'symbol', t: 1 },
    { h: 'critica', p: 'CREE-tee-cah', m: 'criticism / review', t: 1 },
    // C2 Law & Justice
    { h: 'legge', p: 'LEJ-jeh', m: 'law', t: 1 },
    { h: 'costituzione', p: 'cos-tee-too-TSYOH-neh', m: 'constitution', t: 2 },
    { h: 'contenzioso', p: 'con-ten-TSYOH-soh', m: 'litigation', t: 2 },
    { h: 'difesa', p: 'dee-FAY-sah', m: 'defense', t: 1 },
    { h: 'diritti', p: 'dee-REET-tee', m: 'rights', t: 1 },
    { h: 'libertà', p: 'lee-behr-TAH', m: 'freedom / liberty', t: 2 },
    { h: 'uguaglianza', p: 'oo-gwahl-YAHN-tsah', m: 'equality', t: 3 },
    { h: 'dignità', p: 'deen-yee-TAH', m: 'dignity', t: 2 },
    // C2 Finance & Economics
    { h: 'economia', p: 'eh-coh-noh-MEE-ah', m: 'economy', t: 1 },
    { h: 'inflazione', p: 'een-flah-TSYOH-neh', m: 'inflation', t: 2 },
    { h: 'commercio', p: 'com-MEHR-choh', m: 'trade / commerce', t: 1 },
    { h: 'finanza', p: 'fee-NAHN-tsah', m: 'finance', t: 2 },
    { h: 'investimento', p: 'een-bes-tee-MEN-toh', m: 'investment', t: 2 },
    { h: 'azioni', p: 'ah-TSYOH-nee', m: 'stocks / shares', t: 2 },
    { h: 'obbligazioni', p: 'ob-blee-gah-TSYOH-nee', m: 'bonds', t: 2 },
    { h: 'rischio', p: 'REES-kyoh', m: 'risk', t: 1 },
    // C2 Environment & Ethics
    { h: 'clima', p: 'CLEE-mah', m: 'climate', t: 1 },
    { h: 'emissioni', p: 'eh-mees-SYOH-nee', m: 'emissions', t: 2 },
    { h: 'ecologia', p: 'eh-coh-loh-JEE-ah', m: 'ecology', t: 2 },
    { h: 'tutela', p: 'too-TEH-lah', m: 'protection / guarding', t: 2 },
    { h: 'etica', p: 'EH-tee-cah', m: 'ethics', t: 1 },
    { h: 'gene', p: 'JEH-neh', m: 'gene', t: 1 },
    { h: 'clonazione', p: 'cloh-nah-TSYOH-neh', m: 'cloning', t: 3 },
    { h: 'morale', p: 'moh-RAH-leh', m: 'morality / moral', t: 2 }""",

        'en': """    // C2 Literature & Philosophy
    { h: 'philosophy', p: 'fi-LOS-uh-fee', m: 'philosophy', t: 2 },
    { h: 'confucianism', p: 'kuhn-FYOO-shuh-niz-uhm', m: 'Confucianism', t: 3 },
    { h: 'taoism', p: 'TOW-iz-uhm', m: 'Taoism', t: 3 },
    { h: 'benevolence', p: 'buh-NEV-uh-luhns', m: 'benevolence', t: 3 },
    { h: 'analysis', p: 'uh-NAL-uh-sis', m: 'analysis', t: 2 },
    { h: 'narrative', p: 'NAR-uh-tiv', m: 'narrative', t: 2 },
    { h: 'symbol', p: 'SIM-buhl', m: 'symbol', t: 1 },
    { h: 'criticism', p: 'KRIT-uh-siz-uhm', m: 'criticism', t: 2 },
    // C2 Law & Justice
    { h: 'law', p: 'law', m: 'law', t: 1 },
    { h: 'constitution', p: 'kon-sti-TOO-shuhn', m: 'constitution', t: 2 },
    { h: 'litigation', p: 'lit-i-GEY-shuhn', m: 'litigation', t: 3 },
    { h: 'defense', p: 'dih-FENS', m: 'defense', t: 1 },
    { h: 'rights', p: 'rayts', m: 'rights', t: 1 },
    { h: 'freedom', p: 'FREE-duhm', m: 'freedom', t: 1 },
    { h: 'equality', p: 'ih-KWOL-i-tee', m: 'equality', t: 2 },
    { h: 'dignity', p: 'DIG-ni-tee', m: 'dignity', t: 2 },
    // C2 Finance & Economics
    { h: 'economy', p: 'ih-KON-uh-mee', m: 'economy', t: 2 },
    { h: 'inflation', p: 'in-FLEY-shuhn', m: 'inflation', t: 2 },
    { h: 'trade', p: 'treyd', m: 'trade', t: 1 },
    { h: 'finance', p: 'FAY-nans', m: 'finance', t: 2 },
    { h: 'investment', p: 'in-VEST-muhnt', m: 'investment', t: 2 },
    { h: 'stocks', p: 'stoks', m: 'stocks', t: 1 },
    { h: 'bonds', p: 'bondz', m: 'bonds', t: 1 },
    { h: 'risk', p: 'risk', m: 'risk', t: 1 },
    // C2 Environment & Ethics
    { h: 'climate', p: 'KLAY-mit', m: 'climate', t: 1 },
    { h: 'emissions', p: 'ih-MISH-uhnz', m: 'emissions', t: 2 },
    { h: 'ecology', p: 'ih-KOL-uh-jee', m: 'ecology', t: 2 },
    { h: 'protection', p: 'pruh-TEK-shuhn', m: 'protection', t: 2 },
    { h: 'ethics', p: 'ETH-iks', m: 'ethics', t: 2 },
    { h: 'gene', p: 'jeen', m: 'gene', t: 1 },
    { h: 'cloning', p: 'KLOH-ning', m: 'cloning', t: 2 },
    { h: 'morality', p: 'muh-RAL-i-tee', m: 'morality / morals', t: 2 }""",

        'ar': """    // C2 Literature & Philosophy
    { h: 'فلسفة', p: 'falsafah', m: 'philosophy', t: 1 },
    { h: 'كونفوشيوسية', p: 'konfushiyusiyyah', m: 'Confucianism', t: 2 },
    { h: 'تاوية', p: 'tawiyyah', m: 'Taoism', t: 2 },
    { h: 'حب الرعية', p: 'hubb ar-ra‘iyyah', m: 'benevolence', t: 3 },
    { h: 'تحليل', p: 'tahlil', m: 'analysis', t: 1 },
    { h: 'سرد', p: 'sard', m: 'narrative', t: 1 },
    { h: 'رمز', p: 'ramz', m: 'symbol', t: 1 },
    { h: 'نقد', p: 'naqd', m: 'criticism / critique', t: 1 },
    // C2 Law & Justice
    { h: 'قانون', p: 'qanun', m: 'law', t: 1 },
    { h: 'دستور', p: 'dustur', m: 'constitution', t: 1 },
    { h: 'تقاضي', p: 'taqadi', m: 'litigation', t: 2 },
    { h: 'دفاع', p: 'difa‘', m: 'defense', t: 1 },
    { h: 'حقوق', p: 'huquq', m: 'rights', t: 1 },
    { h: 'حرية', p: 'hurriyyah', m: 'freedom / liberty', t: 1 },
    { h: 'مساواة', p: 'musawah', m: 'equality', t: 2 },
    { h: 'كرامة', p: 'karamah', m: 'dignity', t: 1 },
    // C2 Finance & Economics
    { h: 'اقتصاد', p: 'iqtisad', m: 'economy', t: 1 },
    { h: 'تضخم', p: 'tadakhkhum', m: 'inflation', t: 2 },
    { h: 'تجارة', p: 'tijarah', m: 'trade / commerce', t: 1 },
    { h: 'مالية', p: 'maliyyah', m: 'finance', t: 2 },
    { h: 'استثمار', p: 'istithmar', m: 'investment', t: 2 },
    { h: 'أسهم', p: 'ashum', m: 'stocks / shares', t: 1 },
    { h: 'سندات', p: 'sanadāt', m: 'bonds', t: 2 },
    { h: 'مخاطرة', p: 'mukhatarah', m: 'risk', t: 2 },
    // C2 Environment & Ethics
    { h: 'مناخ', p: 'munakh', m: 'climate', t: 1 },
    { h: 'انبعاثات', p: 'inbi‘athāt', m: 'emissions', t: 2 },
    { h: 'بيئة', p: 'bi’ah', m: 'environment / ecology', t: 1 },
    { h: 'حماية', p: 'himayah', m: 'protection', t: 1 },
    { h: 'أخلاقيات', p: 'akhlaqiyyāt', m: 'ethics', t: 2 },
    { h: 'جين', p: 'jin', m: 'gene', t: 1 },
    { h: 'استنساخ', p: 'istinsakh', m: 'cloning', t: 2 },
    { h: 'أخلاق', p: 'akhlaq', m: 'morality / morals', t: 1 }"""
    }

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
    print("Vocab C2 appended successfully.")

def append_sentences():
    sentences_file = 'frontend/src/data/lessonSentences.ts'
    if not os.path.exists(sentences_file):
        print(f"Error: Could not find {sentences_file}")
        return
        
    with open(sentences_file, 'r', encoding='utf-8') as f:
        content = f.read()

    sentence_inserts = {
        'zh': """    1301: [
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
    ]""",

        'es': """    1301: [
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
    ]""",

        'fr': """    1301: [
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
    ]""",

        'de': """    1301: [
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
    ]""",

        'ja': """    1301: [
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
      { target: 'インフレと世界貿易は経済や金融に影響を与えます。', rom: 'Infure to sekai bōeki wa keizai ya kin\\'yū ni eikyō o ataemasu.', en: 'Inflation and world trade influence the economy and finance.' }
    ],
    1502: [
      { target: '株式や債券への投資には常に市場リスクが伴います。', rom: 'Kabushiki ya saiken he no tōshi ni wa tsuneni shijō risuku ga tomanaimasu.', en: 'Investing in stocks or bonds always involves market risks.' }
    ],
    1601: [
      { target: '気候変動に対処するため、排出量の削減と環境保護が必要です。', rom: 'Kikō hendō ni taisho suru tame, haishutsuryō no sakugen to kankyōhogo ga hitsuyō desu.', en: 'To address climate change, emissions reduction and environmental protection are necessary.' }
    ],
    1602: [
      { target: '遺伝子クローン技術は倫理的・道徳的な議論を巻き起こしています。', rom: 'Idenshi kurōn gijutsu wa rinriteki dōtokuteki na giron o makiokoshite imasu.', en: 'Gene cloning technology is stirring ethical and moral debates.' }
    ]""",

        'ko': """    1301: [
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
    ]""",

        'it': """    1301: [
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
    ]""",

        'en': """    1301: [
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
    ]""",

        'ar': """    1301: [
      { target: 'تبحث الفلسفة الكلاسيكية في الفكر الكونفوشيوسي والتاوي.', rom: 'Tabhathu al-falsafah al-klasīkiyyah fī al-fikri al-kunfūšiyūsī wat-tāwī.', en: 'Classical philosophy discusses Confucian and Taoist thought.' }
    ],
    1302: [
      { target: 'يوضح التحليل الأدبي معاني الرموز في السرد القصصي.', rom: 'Yuwaddihu at-tahlīlu al-adabiyyu ma‘ānī ar-rumūzi fī as-sardi al-qasasiyy.', en: 'Literary analysis clarifies the meaning of symbols in storytelling.' }
    ],
    1401: [
      { target: 'يحدد الدستور شروط الدفاع في التقاضي القانوني.', rom: 'Yuhaddidu ad-dustūru šurūta ad-difā‘i fī at-taqādī al-qānūniyy.', en: 'The constitution defines defense conditions in legal litigation.' }
    ],
    1402: [
      { target: 'حماية الحرية والمساواة أساس صون الكرامة وحقوق الإنسان.', rom: 'Himāyatu al-hurriyyati wal-musāwāti asāsu sawoni al-karāmati wa-huqūqi al-insān.', en: 'Protecting freedom and equality is key to preserving human rights and dignity.' }
    ],
    1501: [
      { target: 'يؤثر التضخم والتجارة العالمية على الاقتصاد والمالية.', rom: 'Yu’athiru at-tadakhkhumu wat-tijāratu al-‘ālamiyyatu ‘alā al-iqtisādi wal-māliyyah.', en: 'Inflation and global trade affect the economy and finance.' }
    ],
    1502: [
      { target: 'الاستثمار في الأسهم والسندات ينطوي دائماً على مخاطر سوقية.', rom: 'Al-istithmāru fī al-ashumi was-sanadāti yantawī dā’iman ‘alā mukhātirin sūqiyyah.', en: 'Investing in stocks and bonds always involves market risks.' }
    ],
    1601: [
      { target: 'لمكافحة تغير المناخ، يجب خفض الانبعاثات والاهتمام بحماية البيئة.', rom: 'Limukāfahati taghayyuri al-munākhi, yajibu khafdu al-inbi‘āthāti wal-ihtimāmu bihimāyati al-bī’ah.', en: 'To combat climate change, emissions must be cut and environment protection prioritized.' }
    ],
    1602: [
      { target: 'يثير استنساخ الجينات نقاشات أخلاقية ودينية معقدة.', rom: 'Yuthīru istinsākhu al-jīnāti niqāšātin akhlāqiyyatan wa-dīniyyatan mu‘aqqadah.', en: 'Gene cloning triggers complex bioethical and religious debates.' }
    ]"""
    }

    lines = content.split('\n')
    output_lines = []
    current_lang = None
    in_record = False
    
    for line in lines:
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\{', line)
        if lang_match:
            current_lang = lang_match.group(1)
            in_record = True
            output_lines.append(line)
            continue
            
        if in_record and re.match(r'^\s*\},', line):
            if len(output_lines) > 0:
                last_line = output_lines[-1].rstrip()
                if not last_line.endswith(','):
                    output_lines[-1] = last_line + ","
            
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
    print("Sentences C2 appended successfully.")

if __name__ == '__main__':
    append_units()
    append_vocab()
    append_sentences()
