import gdown
import os

url = "https://drive.google.com/drive/folders/1Xbft-auvHhu6ANr-GwOlmAGUzFvM5JH9?usp=sharing"
out_dir = "c:/Users/Chami/Downloads/Malika/assets/videos"
os.makedirs(out_dir, exist_ok=True)

print("Starting gdown folder download...")
try:
    files = gdown.download_folder(url=url, output=out_dir, quiet=False, use_api=False)
    print("Download completed! Files:")
    for f in files:
        print(f)
except Exception as e:
    print("Download error:", e)
