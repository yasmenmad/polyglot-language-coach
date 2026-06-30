import os
import json

def main():
    log_dir = r"C:\Users\User\.gemini\antigravity\brain\a3471db7-17f1-44b5-a23b-cd4e3bbc4fcc\.system_generated\logs"
    transcript_file = os.path.join(log_dir, "transcript.jsonl")
    
    if not os.path.exists(transcript_file):
        print("Transcript file not found:", transcript_file)
        return
        
    print("Searching transcript for original files...")
    
    original_units = None
    original_vocab = None
    original_sentences = None
    
    with open(transcript_file, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            try:
                data = json.loads(line)
                # Look for tool outputs or contents of the files from previous view_file calls
                # In view_file, the content is in step output or tool outputs
                content = data.get('content', '')
                if 'File Path: `file:///C:/Users/User/Desktop/LANG/hanyustar_fixed/frontend/src/data/units.ts`' in content:
                    original_units = content
                if 'File Path: `file:///C:/Users/User/Desktop/LANG/hanyustar_fixed/frontend/src/data/vocab.ts`' in content:
                    original_vocab = content
                if 'File Path: `file:///C:/Users/User/Desktop/LANG/hanyustar_fixed/frontend/src/data/lessonSentences.ts`' in content:
                    original_sentences = content
            except Exception:
                pass
                
    if original_units:
        print("Found original units.ts content! Writing to scratch/units_backup.txt")
        with open('scratch/units_backup.txt', 'w', encoding='utf-8') as out:
            out.write(original_units)
    else:
        print("Original units.ts content not found in logs.")
        
    if original_vocab:
        print("Found original vocab.ts content! Writing to scratch/vocab_backup.txt")
        with open('scratch/vocab_backup.txt', 'w', encoding='utf-8') as out:
            out.write(original_vocab)
            
    if original_sentences:
        print("Found original lessonSentences.ts content! Writing to scratch/sentences_backup.txt")
        with open('scratch/sentences_backup.txt', 'w', encoding='utf-8') as out:
            out.write(original_sentences)

if __name__ == '__main__':
    main()
