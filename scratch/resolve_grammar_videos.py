import re
import json
import urllib.request
import urllib.parse
import time
import os
import sys

# Ensure stdout prints unicode characters correctly on Windows
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
    cache_file = 'scratch/grammar_cache.json'
    
    if not os.path.exists(grammar_file):
        print(f"Error: Could not find grammar file at {grammar_file}")
        sys.exit(1)

    # Load cache if it exists
    cache = {}
    if os.path.exists(cache_file):
        try:
            with open(cache_file, 'r', encoding='utf-8') as cf:
                cache = json.load(cf)
            print(f"Loaded {len(cache)} cached video mappings.")
        except Exception:
            pass

    # Read grammar file lines
    with open(grammar_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_lang = None
    rules = []
    current_rule = None

    for i, line in enumerate(lines):
        # Language block
        lang_match = re.match(r'^\s*([a-z]{2}):\s*\[', line)
        if lang_match:
            current_lang = lang_match.group(1)
            continue
        
        # Rule object
        rule_match = re.search(r'\{\s*id:\s*(\d+),\s*title:\s*[\x27\x22]([^\x27\x22]+)[\x27\x22]', line)
        if rule_match:
            rule_id = int(rule_match.group(1))
            rule_title = rule_match.group(2)
            current_rule = {
                'lang': current_lang,
                'id': rule_id,
                'title': rule_title,
                'line_idx': i,
                'video_url_line_idx': None,
                'old_video_id': None
            }
            rules.append(current_rule)
            continue

        # videoUrl property
        video_match = re.search(r'videoUrl:\s*[\x27\x22]([^\x27\x22]+)[\x27\x22]', line)
        if video_match and current_rule:
            video_url = video_match.group(1)
            current_rule['video_url_line_idx'] = i
            current_rule['old_video_id'] = video_url.split('/')[-1]

    print(f"Found {len(rules)} rules in {grammar_file}.")

    # Resolve each rule
    updated_count = 0
    for rule in rules:
        lang = rule['lang']
        rule_id = rule['id']
        title = rule['title']
        cache_key = f"{lang}_{rule_id}"

        print(f"\nProcessing [{lang.upper()}] Rule {rule_id}: {title}")

        # Check cache first
        if cache_key in cache:
            cached_id = cache[cache_key]
            # Verify if cached ID is still valid
            is_valid, v_title = verify_video(cached_id)
            if is_valid:
                print(f"  [CACHE OK] Using cached ID {cached_id} ({v_title})")
                rule['new_video_id'] = cached_id
                continue
            else:
                print(f"  [CACHE INVALID] Cached ID {cached_id} is no longer valid: {v_title}")

        # If not cached or invalid, search
        queries = [
            f"{lang_map[lang]} grammar {title} lesson",
            f"{lang_map[lang]} {title} grammar",
            f"{lang_map[lang]} grammar lesson"
        ]

        found_valid = False
        for q in queries:
            print(f"  Searching YouTube: '{q}'...")
            candidate_ids = search_youtube_videos(q)
            print(f"    Found {len(candidate_ids)} candidates. Verifying...")
            for cid in candidate_ids:
                is_valid, v_title = verify_video(cid)
                if is_valid:
                    print(f"    [VERIFIED WORKING] {cid} -> {v_title}")
                    rule['new_video_id'] = cid
                    cache[cache_key] = cid
                    # Save cache updates incrementally
                    with open(cache_file, 'w', encoding='utf-8') as cf:
                        json.dump(cache, cf, indent=2, ensure_ascii=False)
                    found_valid = True
                    break
                else:
                    # Brief pause to avoid hammering oEmbed rate limits
                    time.sleep(0.05)
            if found_valid:
                break
            time.sleep(0.5)

        if not found_valid:
            print(f"  [WARNING] Could not find any valid video for rule: {title}. Falling back to default.")
            # Standard fallback (e.g. general language channel intro or lesson)
            rule['new_video_id'] = rule['old_video_id']

    # Rewrite the file with new video URLs
    print("\nRewriting grammar file with updated video URLs...")
    for rule in rules:
        if 'new_video_id' in rule and rule['video_url_line_idx'] is not None:
            idx = rule['video_url_line_idx']
            old_line = lines[idx]
            new_id = rule['new_video_id']
            # Reconstruct the line preserving original indentation and formatting
            indent = re.match(r'^(\s*)', old_line).group(1)
            lines[idx] = f"{indent}videoUrl: 'https://www.youtube.com/embed/{new_id}',\n"
            updated_count += 1

    with open(grammar_file, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    print(f"\nFinished! Updated {updated_count} rules in {grammar_file}.")

if __name__ == '__main__':
    main()
