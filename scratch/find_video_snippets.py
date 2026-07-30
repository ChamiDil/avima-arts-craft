import re

with open(r'C:\Users\Chami\.gemini\antigravity\brain\fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5\.system_generated\steps\1273\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

matches = [m.start() for m in re.finditer(r'youtube|video|mp4', text, re.IGNORECASE)]
print(f"Found {len(matches)} occurrences")
for idx in matches[:10]:
    snippet = text[max(0, idx-50):min(len(text), idx+150)]
    clean_snip = snippet.encode('ascii', 'ignore').decode('ascii')
    print("--- SNIPPET ---")
    print(clean_snip)
