import os
import shutil

base = 'c:/Users/Chami/Downloads/Malika/assets/videos'

categories = {
    'mahogany': ['plate 1.mp4', 'plate 2.mp4', 'plate 3.mp4', 'VID_20251103_105214.mp4'],
    'jewellary': ['flywood 1.mp4', 'flywood 2.mp4'],
    'canvas': ['canvas video.mp4', 'canvas video 2.mp4'],
    'cement': ['cement 1.mp4', 'cement 2.mp4'],
    'project': ['Video Project 6.mp4', 'Video Project 7.mp4']
}

for cat, file_names in categories.items():
    cat_dir = os.path.join(base, cat)
    os.makedirs(cat_dir, exist_ok=True)
    
    for fn in file_names:
        # Search for file in base subdirectories
        found = False
        for root, dirs, files in os.walk(base):
            if root != cat_dir and fn in files:
                src_path = os.path.join(root, fn)
                dest_path = os.path.join(cat_dir, fn.replace(' ', '_').lower())
                shutil.copy2(src_path, dest_path)
                print(f"Copied {fn} -> {dest_path} ({os.path.getsize(dest_path)/(1024*1024):.2f} MB)")
                found = True
                break
        if not found:
            print(f"Warning: Could not find {fn}")

print("\n--- ORGANIZED CATEGORY VIDEOS ---")
for cat in categories:
    cat_dir = os.path.join(base, cat)
    print(f"\n[{cat.upper()}]")
    for f in os.listdir(cat_dir):
        fp = os.path.join(cat_dir, f)
        print(f"  - {f} ({os.path.getsize(fp)/(1024*1024):.2f} MB)")
