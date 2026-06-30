import re
import os

def restore_units():
    units_file = 'frontend/src/data/units.ts'
    with open(units_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove all added C1 units (id 9, 10, 11, 12)
    # We can split by lines, and for each language group, drop lines containing id: 9, 10, 11, 12 and their contents
    # A clean way is to truncate/remove any unit definitions from id 9 onwards
    lines = content.split('\n')
    new_lines = []
    skip = False
    for line in lines:
        if 'id: 9,' in line:
            skip = True
        if skip and ']},' in line and ('es:' in line or 'fr:' in line or 'de:' in line or 'ja:' in line or 'ko:' in line or 'it:' in line or 'en:' in line or 'ar:' in line or '};' in line):
            # We reached the end of the added block and the start of the next language
            skip = False
            # We must restore the closing bracket "  ]," of the previous language block that we replaced
            new_lines.append('  ],')
        if not skip:
            new_lines.append(line)
            
    # Fix the trailing array close at the end of the file if needed
    final_content = '\n'.join(new_lines)
    # If the file ends with double close brackets because of our skip logic, clean it up
    final_content = re.sub(r',\s*\]\s*,\s*\]\s*,\s*\]', ', ]', final_content)
    with open(units_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Units restored.")

def restore_vocab():
    vocab_file = 'frontend/src/data/vocab.ts'
    with open(vocab_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We know the last words of the original file for each language
    last_words = {
        'zh': '对不起',
        'es': 'hasta luego', # wait, looking at step 4: "hasta luego", "por favor"
        'fr': 'excusez-moi',
        'de': 'Entschuldigung',
        'ja': 'すみません',
        'ko': '죄송합니다',
        'it': 'scusi',
        'en': 'excuse me',
        'ar': 'لا'
    }
    
    # We will strip out anything after the last word for each language
    lines = content.split('\n')
    new_lines = []
    current_lang = None
    in_array = False
    skip = False
    
    for line in lines:
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\[', line)
        if lang_match:
            current_lang = lang_match.group(1)
            in_array = True
            skip = False
            new_lines.append(line)
            continue
            
        if in_array and current_lang:
            target_word = last_words[current_lang]
            if target_word in line:
                new_lines.append(line)
                skip = True
                continue
                
        if skip and re.match(r'^\s*\],', line):
            skip = False
            in_array = False
            current_lang = None
            new_lines.append(line)
            continue
            
        if not skip:
            new_lines.append(line)
            
    final_content = '\n'.join(new_lines)
    with open(vocab_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Vocab restored.")

def restore_sentences():
    sentences_file = 'frontend/src/data/lessonSentences.ts'
    with open(sentences_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Remove lesson sentences from 901 onwards
    lines = content.split('\n')
    new_lines = []
    skip = False
    for line in lines:
        if '901:' in line:
            skip = True
        if skip and '},' in line and ('es:' in line or 'fr:' in line or 'de:' in line or 'ja:' in line or 'ko:' in line or 'it:' in line or 'en:' in line or 'ar:' in line or '};' in line):
            skip = False
            # Re-insert the closing brace of the previous language block
            new_lines.append('  },')
        if not skip:
            new_lines.append(line)
            
    final_content = '\n'.join(new_lines)
    with open(sentences_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Sentences restored.")

if __name__ == '__main__':
    restore_units()
    restore_vocab()
    restore_sentences()
