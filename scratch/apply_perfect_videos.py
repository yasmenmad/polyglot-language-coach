import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

perfect_ids = {
    'zh': {
        1: 'EKcSdYks2gE', # Basic S + V + O
        2: 'IhJrP32Qdbw', # Negation with 不
        3: 'mFemJL9NqRs', # Yes/No Question with 吗
        4: 'N3NDACVNlhU', # Time Before Verb
        5: 'ixo1xiC-VGs'  # Resultative Complements
    },
    'es': {
        1: 'zV-XLyuyDyo', # Ser vs. Estar
        2: 'bePgbbhPUxI', # Regular -AR Verbs
        3: 'YeTIwDcKwZ4', # Definite Articles
        4: 'UmxmbFhyHFM', # Question Words
        5: '_uH_tosBLyo'  # Reflexive Verbs
    },
    'fr': {
        1: '84olv0BM4oY', # Être & Avoir
        2: 'V7AjuIDn4oU', # Gender of Nouns
        3: '40ZnnWck0Zk', # Negation: ne…pas
        4: '5WiTJJ4N2jQ', # Regular -ER Verbs
        5: 'yEayMFTFI6c'  # Adjective Agreement
    },
    'de': {
        1: 'y-aMTFMffDA', # Nominative Case
        2: 'jR4XeQxwGHQ', # Verb Position
        3: 'bD4vSw6AWps', # Modal Verbs
        4: '0V8IyLsLrNk', # Accusative Case
        5: 'vhj8Lr4bCEA'  # Separable Verbs
    },
    'ja': {
        1: '6A-TITNPO_U', # Verb at End (SOV)
        2: 'mTws1GwXcx8', # は (wa) Topic Marker
        3: 'ZPxcBRohW4M', # Negation with ない/ません
        4: 'udmzxXjOIEY', # て-form for Sequences
        5: 'ocZfV_3gAM0'  # Conditional: たら
    },
    'ko': {
        1: 'Xl4NkeIksOQ', # SOV Word Order
        2: 'fCxLNRLntc0', # Topic Marker 은/는
        3: 'Btq5KGFxuac', # Object Marker 을/를
        4: 'r4TNuJYeJM8', # Polite Ending -아요/어요
        5: 'tFNGSlIMr74'  # Honorific -시-
    },
    'it': {
        1: 'rusOdHFJPfU', # Essere & Avere
        2: 'itqVP8hWcAk', # Gender & Articles
        3: 'wVWJGLvlI0k', # Present Tense -ARE
        4: 'Ab7JoQmJfzw', # Negation with non
        5: 'cSFclSKrISQ'  # Adjective Agreement
    },
    'en': {
        1: 'nvVdIJ0las0', # Simple Present Tense
        2: 'rFdhrR6Dpco', # Present Continuous
        3: 'YIkewDhlSwQ', # Yes/No Questions
        4: 'dmJrYbDjxQY', # Past Simple
        5: '36wG9pSYu7Q'  # Modal Verbs
    },
    'ar': {
        1: '05SOrkbyhjM', # Subject-Verb-Object (SVO)
        2: 'sSA0JrrgB5o', # Noun-Adjective Agreement
        3: 'Y80KljpmjJs', # Negation with لا
        4: 'CJO1qnEI5SY', # Definite Article ال
        5: 'yJh_Rz9cYyI'  # Possessive Pronoun Suffixes
    }
}

def main():
    grammar_file = 'frontend/src/data/grammar.ts'
    
    with open(grammar_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_lang = None
    current_rule = None
    updated_count = 0

    for i, line in enumerate(lines):
        # Language block
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\[', line)
        if lang_match:
            current_lang = lang_match.group(1)
            continue
        
        # Rule object
        rule_match = re.search(r'\{\s*id:\s*(\d+),', line)
        if rule_match:
            rule_id = int(rule_match.group(1))
            current_rule = rule_id
            continue

        # videoUrl property
        video_match = re.search(r'videoUrl:\s*[\x27\x22]([^\x27\x22]+)[\x27\x22]', line)
        if video_match and current_lang and current_rule:
            if current_lang in perfect_ids and current_rule in perfect_ids[current_lang]:
                new_id = perfect_ids[current_lang][current_rule]
                indent = re.match(r'^(\s*)', line).group(1)
                lines[i] = f"{indent}videoUrl: 'https://www.youtube.com/embed/{new_id}',\n"
                updated_count += 1

    with open(grammar_file, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print(f"Successfully applied curated video list! Updated {updated_count} rules in {grammar_file}.")

if __name__ == '__main__':
    main()
