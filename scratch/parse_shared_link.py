import re
import urllib.request

url = "https://share.gemini.google/uosEfYFT5hYv"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print(f"HTML Length: {len(html)}")
        
        # Search for any video, drive, mp4, youtube or media links in the page
        media_urls = re.findall(r'https?://[^\s"\'<>]+', html)
        print("\nAll URLs found in shared link:")
        for u in media_urls:
            if any(k in u.lower() for k in ['video', 'drive', 'mp4', 'webm', 'mov', 'lh3', 'usercontent', 'blob', 'stream', 'share', 'file', 'storage']):
                print(" ->", u)

        # Print all plain text paragraphs / response content
        text_matches = re.findall(r'"([^"]*video[^"]*)"', html, re.IGNORECASE)
        print("\nText snippets mentioning video:")
        for t in text_matches[:10]:
            print(" ::", t[:150])

except Exception as e:
    print(f"Error fetching: {e}")
