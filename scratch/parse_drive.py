import urllib.request
import re
import os

url = 'https://drive.google.com/drive/folders/1Xbft-auvHhu6ANr-GwOlmAGUzFvM5JH9?usp=sharing'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
})

html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Write html out to check
with open('c:/Users/Chami/Downloads/Malika/scratch/drive.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Saved drive.html. Searching for files...")

# Find all file items in Drive initial data payload
# Drive stores data in AF_initDataCallback
pattern = re.compile(r'\"(1[a-zA-Z0-9_-]{25,})\".*?\"(.*?)\"')
items = re.findall(r'\[\"(1[a-zA-Z0-9_-]{25,})\",\[\"(.*?)\"', html)
print("Items found:", len(items))
for item_id, item_name in items[:30]:
    print(f"ID: {item_id} | Name: {item_name}")

# Also search for video extensions or titles
video_matches = re.findall(r'\[\"(1[a-zA-Z0-9_-]{25,})\".*?\"(.*? video|video.*?|\w+\.mp4|\w+\.mov|\w+\.3gp)\"', html, re.I)
print("Video matches:", video_matches)
