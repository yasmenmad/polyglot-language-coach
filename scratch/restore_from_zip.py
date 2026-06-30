import zipfile
import os

def main():
    zip_path = r"C:\Users\User\Desktop\hanyustar_fixed_project.zip"
    if not os.path.exists(zip_path):
        print(f"Zip file not found at: {zip_path}")
        return
        
    print(f"Found backup zip at {zip_path}. Extracting original data files...")
    
    files_to_extract = [
        'frontend/src/data/units.ts',
        'frontend/src/data/vocab.ts',
        'frontend/src/data/lessonSentences.ts'
    ]
    
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        for f in files_to_extract:
            try:
                zip_ref.extract(f, '.')
                print(f"Extracted: {f}")
            except Exception as e:
                print(f"Error extracting {f}: {e}")

if __name__ == '__main__':
    main()
