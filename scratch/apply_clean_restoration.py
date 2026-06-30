import re
import os

def clean_and_write(backup_path, target_path):
    if not os.path.exists(backup_path):
        print(f"Backup not found: {backup_path}")
        return
        
    with open(backup_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Split lines
    lines = content.split('\n')
    cleaned_lines = []
    
    start_collecting = False
    for line in lines:
        if line.startswith('Showing lines') or line.startswith('The following code'):
            continue
        if line.startswith('File Path:'):
            continue
        if line.startswith('Total Lines:') or line.startswith('Total Bytes:'):
            continue
        
        # Check if line matches the view_file format "1: import ..."
        match = re.match(r'^\s*(\d+):\s?(.*)', line)
        if match:
            # We strip the line number and space
            cleaned_lines.append(match.group(2))
            
    # Write to target
    target_dir = os.path.dirname(target_path)
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
        
    with open(target_path, 'w', encoding='utf-8') as out:
        out.write('\n'.join(cleaned_lines))
        
    print(f"Restored: {target_path} from {backup_path}")

def main():
    clean_and_write('scratch/units_backup.txt', 'frontend/src/data/units.ts')
    clean_and_write('scratch/vocab_backup.txt', 'frontend/src/data/vocab.ts')
    clean_and_write('scratch/sentences_backup.txt', 'frontend/src/data/lessonSentences.ts')

if __name__ == '__main__':
    main()
