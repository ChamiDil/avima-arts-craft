import urllib.request
import re
import os

url = 'https://drive.google.com/embeddedfolderview?id=1Xbft-auvHhu6ANr-GwOlmAGUzFvM5JH9#list'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
})

try:
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    print("Embedded folderview length:", len(html))
    
    # Save to file
    with open('c:/Users/Chami/Downloads/Malika/scratch/embedded_drive.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    # Extract file links and names
    # Pattern in embedded folderview: <div class="flip-entry-title">FILENAME</div> ... id="entry-FILEID"
    file_items = re.findall(r'id=\"entry-([a-zA-Z0-9_-]+)\".*?<div class=\"flip-entry-title\">(.*?)</div>', html, re.DOTALL)
    print(f"Found {len(file_items)} items in embedded view:")
    for fid, fname in file_items:
        print(f"ID: {fid}  |  Name: {fname.strip()}")

except Exception as e:
    print("Error:", e)
