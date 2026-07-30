import re
import urllib.request
import json

url = "https://gemini.google.com/share/c4565cae1139"
req = urllib.request.Request(
    url,
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    }
)

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        print(f"Downloaded HTML length: {len(html)}")

        # Search for any mp4, webm, googlevideo, video, or media URLs
        video_urls = re.findall(r'https?://[^\s"\'<>\\]+(?:\.mp4|\.webm|\.mov|video|googlevideo)[^\s"\'<>\\]*', html, re.IGNORECASE)
        print("=== Direct Video URLs Found ===")
        for u in set(video_urls):
            print(" ->", u)

        # Search for any lh3 or googleusercontent media URLs
        lh_urls = re.findall(r'https?://lh3\.googleusercontent\.com/[^\s"\'<>\\]+', html)
        print("\n=== Google UserContent URLs Found ===")
        for u in set(lh_urls):
            print(" ->", u)

        # Search inside JS array data for any video assets
        print("\n=== Searching for video keywords in JS data ===")
        for line in html.split('\n'):
            if 'video' in line.lower() or 'mp4' in line.lower() or 'googlevideo' in line.lower():
                print("Line snippet:", line[:200])

except Exception as e:
    print(f"Error: {e}")
