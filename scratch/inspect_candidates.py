import re
import json
import urllib.request
import urllib.parse
import time
import os
import sys

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

def main():
    grammar_file = 'frontend/src/data/grammar.ts'
    
    with open(grammar_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_lang = None
    rules = []
    current_rule = None

    for i, line in enumerate(lines):
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\[', line)
        if lang_match:
            current_lang = lang_match.group(1)
            continue
        
        rule_match = re.search(r'\{\s*id:\s*(\d+),\s*title:\s*[\x27\x22]([^\x27\x22]+)[\x27\x22]', line)
        if rule_match:
            rule_id = int(rule_match.group(1))
            rule_title = rule_match.group(2)
            current_rule = {
                'lang': current_lang,
                'id': rule_id,
                'title': rule_title
            }
            rules.append(current_rule)

    candidates_dict = {}

    for rule in rules:
        lang = rule['lang']
        rule_id = rule['id']
        title = rule['title']
        
        key = f"{lang}_{rule_id}"
        query = f"{lang_map[lang]} grammar {title}"
        print(f"Searching for candidate videos: {query}...")
        
        raw_ids = search_youtube_videos(query)
        
        candidates = []
        for vid in raw_ids[:8]: # Check top 8 candidates
            is_valid, video_title = verify_video(vid)
            if is_valid:
                candidates.append({
                    "id": vid,
                    "title": video_title
                })
                if len(candidates) >= 5: # Keep top 5 valid ones
                    break
            time.sleep(0.05)
            
        candidates_dict[key] = {
            "lang": lang,
            "rule_id": rule_id,
            "rule_title": title,
            "candidates": candidates
        }
        print(f"  Found {len(candidates)} valid candidates.")
        time.sleep(0.5)

    with open('scratch/candidates.json', 'w', encoding='utf-8') as f:
        json.dump(candidates_dict, f, indent=2, ensure_ascii=False)
    print("Done! Saved candidates to scratch/candidates.json.")

if __name__ == '__main__':
    main()
