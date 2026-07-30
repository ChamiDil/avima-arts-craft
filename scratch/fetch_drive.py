import urllib.request
import re
import json

url = 'https://drive.google.com/drive/folders/1Xbft-auvHhu6ANr-GwOlmAGUzFvM5JH9?usp=sharing'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})

try:
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    print("Page fetched successfully! Length:", len(html))
    
    # Search for video / file names and IDs in Drive HTML structure
    matches = re.findall(r'\[\"(1[a-zA-Z0-9_-]{25,})\".*?\"(.*?)\"', html)
    print("Matches found:", len(matches))
    for m in matches[:50]:
        print(m)
        
    # Also search for filenames ending in .mp4, .mov, .avi, etc.
    file_names = set(re.findall(r'[\w\s-]+\.(?:mp4|mov|avi|webm|m4v|mkv)', html, re.I))
    print("\nVideo files found:", file_names)

except Exception as e:
    print("Error:", e)
