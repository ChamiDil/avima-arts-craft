import subprocess
import os

out_dir = "c:/Users/Chami/Downloads/Malika/assets/videos"
os.makedirs(out_dir, exist_ok=True)

url = "https://drive.google.com/drive/folders/1Xbft-auvHhu6ANr-GwOlmAGUzFvM5JH9?usp=sharing"

cmd = f'python -m gdown --folder "{url}" -O "{out_dir}"'
print("Running command:", cmd)
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
print("STDOUT:", res.stdout)
print("STDERR:", res.stderr)
