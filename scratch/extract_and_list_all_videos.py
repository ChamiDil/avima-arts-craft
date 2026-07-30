import zipfile
import os

root = 'c:/Users/Chami/Downloads/Malika/assets/videos'

for f in os.listdir(root):
    if f.endswith('.zip'):
        zip_path = os.path.join(root, f)
        folder_name = f.replace('.zip', '')
        extract_path = os.path.join(root, folder_name)
        if zipfile.is_zipfile(zip_path):
            os.makedirs(extract_path, exist_ok=True)
            with zipfile.ZipFile(zip_path, 'r') as z:
                z.extractall(extract_path)
            print(f"Extracted {f} to {extract_path}")
        else:
            print(f"{f} is not a valid zip file yet (size: {os.path.getsize(zip_path)} bytes)")

print("\n--- ALL EXTRACTED VIDEO FILES ---")
for r, d, fs in os.walk(root):
    for fn in fs:
        if not fn.endswith('.zip'):
            full = os.path.join(r, fn)
            print(full, f"({os.path.getsize(full)/(1024*1024):.2f} MB)")
