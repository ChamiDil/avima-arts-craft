import gdown
import zipfile
import os

jew_dir = 'c:/Users/Chami/Downloads/Malika/assets/videos'
os.makedirs(jew_dir, exist_ok=True)

files_to_download = [
    ('1qkbWC2krdkcdARFNoq0X36hDZb6UvIku', 'Mahogani_plate_art_1.zip'),
    ('1kqYnTtFOMcOGtO6zWwnV-UGfrwK1F6UO', 'fly_wood_jewellry_2.zip'),
    ('1p7SvkCJTY7r6qeJDSLZskZT-LOTTdNMo', 'Canvas_Art_3.zip'),
    ('1wtvDTmMHt_1KWpdSGvynr_rydDAV-s3x', 'Cement_art_4.zip'),
    ('1a68Rkc2JFm4y3k0opbFesMgvVsXklXJK', 'all_Arts_item_and_project.zip')
]

for fid, fname in files_to_download:
    zip_path = os.path.join(jew_dir, fname)
    url = f"https://drive.google.com/uc?id={fid}"
    print(f"\nDownloading {fname} (ID: {fid})...")
    try:
        gdown.download(url, zip_path, quiet=False)
        if os.path.exists(zip_path) and zipfile.is_zipfile(zip_path):
            extract_folder = os.path.join(jew_dir, fname.replace('.zip', ''))
            os.makedirs(extract_folder, exist_ok=True)
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(extract_folder)
            print(f"Extracted {fname} to {extract_folder}:")
            for root, dirs, files in os.walk(extract_folder):
                for f in files:
                    print("  -", os.path.join(root, f))
        else:
            print(f"File {fname} is not a valid zip file or download failed.")
    except Exception as e:
        print(f"Error processing {fname}: {e}")

print("\nFinished downloading and extracting all Drive zip archives!")
