import re

with open(r'C:\Users\Chami\.gemini\antigravity\brain\fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5\.system_generated\steps\1291\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract string literals or video links inside window.WIZ_global_data or JSON arrays
matches = re.findall(r'"(https?://[^\s"]+)"', text)
print("=== Matches ===")
for m in sorted(set(matches)):
    if 'drive' in m or 'video' in m or 'youtube' in m or 'storage' in m or 'google' in m:
        print(m)
