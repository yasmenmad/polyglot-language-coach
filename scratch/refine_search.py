import re
import json
import urllib.request
import urllib.parse
import time
import sys

sys.stdout.reconfigure(encoding='utf-8')

refine_queries = {
    'es_2': 'Spanish regular ar verbs present tense lesson',
    'fr_4': 'French regular er verbs present tense lesson',
    'it_3': 'Italian present tense are verbs lesson',
    'ar_3': 'Arabic negation with la lesson'
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
        print(f"Error: {e}")
    return video_ids

def verify_video(video_id):
    oembed_url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
    try:
        req = urllib.request.Request(oembed_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                title = data.get('title', '')
                return True, title
    except Exception:
        pass
    return False, None

def main():
    for key, q in refine_queries.items():
        print(f"\nRefining {key} with query: '{q}'")
        vids = search_youtube_videos(q)
        count = 0
        for vid in vids[:15]:
            is_valid, title = verify_video(vid)
            if is_valid:
                print(f"  [{vid}] -> {title}")
                count += 1
                if count >= 5:
                    break
            time.sleep(0.05)

if __name__ == '__main__':
    main()
