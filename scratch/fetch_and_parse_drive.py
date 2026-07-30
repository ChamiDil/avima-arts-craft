import urllib.request
import re
import json

url = 'https://drive.google.com/drive/folders/1Xbft-auvHhu6ANr-GwOlmAGUzFvM5JH9?usp=sharing'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
}

req = urllib.request.Request(url, headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

with open('c:/Users/Chami/Downloads/Malika/scratch/drive.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Fetched HTML length:", len(html))

# Extract drive items
titles = re.findall(r'\[\"(1[a-zA-Z0-9_-]{25,35})\",\[\"(.*?)\"', html)
print(f"Found {len(titles)} ID-Title pairs:")
unique_titles = {}
for tid, tname in titles:
    if len(tname) > 1 and '\\u' in tname or not tname.startswith('http'):
        # Decode unicode escapes if any
        try:
            tname_decoded = tname.encode().decode('unicode_escape')
        except:
            tname_decoded = tname
        unique_titles[tid] = tname_decoded

for k, v in list(unique_titles.items())[:60]:
    print(f"ID: {k}  -->  Title: {v}")
