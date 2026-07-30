import json
import re

with open(r'C:\Users\Chami\.gemini\antigravity\brain\fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5\.system_generated\steps\1273\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Find any drive.google.com, youtube.com, usercontent, or video links
all_links = re.findall(r'https?://[^\s"\'<>]+', text)
print("=== All URLs found ===")
for l in sorted(set(all_links)):
    if not 'gstatic' in l and not 'google.com/js' in l:
        print(l)
