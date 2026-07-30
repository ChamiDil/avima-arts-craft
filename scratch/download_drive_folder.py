import os
import sys

try:
    import gdown
    print("gdown version:", gdown.__version__)
    
    url = "https://drive.google.com/drive/folders/1Xbft-auvHhu6ANr-GwOlmAGUzFvM5JH9?usp=sharing"
    out_dir = "c:/Users/Chami/Downloads/Malika/assets/videos"
    os.makedirs(out_dir, exist_ok=True)
    
    print("Downloading folder contents to assets/videos...")
    files = gdown.download_folder(url, output=out_dir, quiet=False, use_api=False)
    print("Downloaded files:", files)

except Exception as e:
    print("Error during gdown download:", e)
