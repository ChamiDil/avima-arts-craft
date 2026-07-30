import re
import json

with open('c:/Users/Chami/Downloads/Malika/scratch/drive.html', encoding='utf-8', errors='ignore') as f:
    html = f.read()

print("drive.html read successfully. Length:", len(html))

# Extract all JSON arrays or strings inside AF_initDataCallback
callbacks = re.findall(r'AF_initDataCallback\((.*?)\);</script>', html, re.DOTALL)
print("Found callbacks:", len(callbacks))

all_file_entries = []

for c in callbacks:
    # find all strings that look like drive file IDs (28-33 chars) and filenames
    file_matches = re.findall(r'\[\"(1[a-zA-Z0-9_-]{25,35})\",\[\"(.*?)\",\"(video/.*?|application/.*?|image/.*?|folder.*?)\"', c)
    for fm in file_matches:
        all_file_entries.append(fm)

print(f"Total file entries found: {len(all_file_entries)}")
for entry in all_file_entries:
    print(entry)

# If empty, let's search for any strings with video or mp4 or names in quotes
if not all_file_entries:
    print("\nAlternative search for titles/names in html:")
    titles = re.findall(r'\[\"(1[a-zA-Z0-9_-]{25,35})\",\[\"(.*?)\"', html)
    print(f"Found {len(titles)} ID-Title pairs:")
    unique_titles = {}
    for tid, tname in titles:
        if len(tname) > 1 and not tname.startswith('http') and not tname.startswith('drive'):
            unique_titles[tid] = tname
    for k, v in list(unique_titles.items())[:40]:
        print(f"ID: {k}  -->  Title: {v}")
