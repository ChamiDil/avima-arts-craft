import re
import json

with open(r'C:\Users\Chami\.gemini\antigravity\brain\fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5\.system_generated\steps\1291\content.md', 'r', encoding='utf-8') as f:
    html = f.read()

# Look for AF_initDataCallback or WIZ_global_data
callbacks = re.findall(r'AF_initDataCallback\s*\(\s*({.*?})\s*\);', html, re.DOTALL)
print(f"Found {len(callbacks)} AF_initDataCallback blocks")

for idx, cb in enumerate(callbacks):
    print(f"\n--- Callback {idx} ---")
    print(cb[:300])

# Search for any google drive link or video url in the html
drive_links = re.findall(r'https?://drive\.google\.com/[^\s"\'<>\\]+', html)
print("\nDrive links:", drive_links)

video_links = re.findall(r'https?://[^\s"\'<>\\]+\.(?:mp4|webm|mov)', html)
print("Video file links:", video_links)
