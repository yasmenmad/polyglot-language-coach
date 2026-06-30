import os
import zipfile

def zip_project(source_dir, output_zip):
    # Folders to exclude
    exclude_folders = {'node_modules', '__pycache__', '.git', '.venv', '.idea', '.vscode'}
    # Files to exclude (like the zip itself if placed inside the directory)
    exclude_files = {os.path.basename(output_zip), 'zip_project.py'}

    print(f"Creating zip file: {output_zip}")
    print(f"Excluding folders: {', '.join(exclude_folders)}")
    
    zip_count = 0
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Modify dirs in-place to skip excluded folders
            dirs[:] = [d for d in dirs if d not in exclude_folders]
            
            for file in files:
                if file in exclude_files:
                    continue
                
                file_path = os.path.join(root, file)
                # Get path relative to the source directory
                arcname = os.path.relpath(file_path, source_dir)
                zipf.write(file_path, arcname)
                zip_count += 1

    print(f"Successfully created zip with {zip_count} files at: {output_zip}")

if __name__ == '__main__':
    project_dir = os.path.abspath(os.path.dirname(__file__))
    # Output to the parent directory or desktop to keep the project directory clean
    desktop_dir = os.path.join(os.path.expanduser('~'), 'Desktop')
    output_zip_path = os.path.join(desktop_dir, 'hanyustar_fixed_project.zip')
    
    # If Desktop doesn't exist or isn't accessible, output in the parent directory
    if not os.path.exists(desktop_dir):
        output_zip_path = os.path.join(os.path.dirname(project_dir), 'hanyustar_fixed_project.zip')

    zip_project(project_dir, output_zip_path)
