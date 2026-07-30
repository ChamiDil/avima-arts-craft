import os
import time

current_time = time.time()
search_dirs = ['c:/Users/Chami/Downloads/Malika', 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5']

for search_dir in search_dirs:
    print(f"Searching: {search_dir}")
    for root, dirs, files in os.walk(search_dir):
        for file in files:
            filepath = os.path.join(root, file)
            try:
                mtime = os.path.getmtime(filepath)
                # modified in the last 20 minutes
                if current_time - mtime < 1200:
                    print(f"  {file} (mtime: {time.ctime(mtime)}, size: {os.path.getsize(filepath)})")
            except Exception as e:
                pass
