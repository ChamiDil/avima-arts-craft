import gdown
import zipfile
import os

video_dir = 'c:/Users/Chami/Downloads/Malika/assets/videos'
os.makedirs(video_dir, exist_ok=True)

files_to_download = [
    ('1qkbWC2krdkcdARFNoq0X36hDZb6UvIku', 'Mahogani_plate_art_1.zip'),
    ('1kqYnTtFOMcOGtO6zWwnV-UGfrwK1F6UO', 'fly_wood_jewellary_2.zip'),
    ('1p7SvkCJTY7r6qeJDSLZskZT-LOTTdNMo', 'Canvas_Art_3.zip'),
    ('1wtvDTmMHt_1KWpdSGvynr_rydDAV-s3x', 'Cement_art_4.zip'),
    ('1a68Rkc2JFm4y3k0opbFesMgvVsXklXJK', 'all_Arts_item_and_project.zip'),
    ('1cc1VK2vnD_KZlBIz4bW0ldZzHlosR0v1', 'Presentation1_00111.pdf')
]

for fid, fname in files_to_download:
    dest_file = os.path.join(video_dir, fname)
    print(f"\nDownloading {fname} (ID: {fid})...")
    try:
        res = gdown.download(id=fid, output=dest_file, quiet=False)
        print("Downloaded to:", res)
        if dest_file.endswith('.zip') and os.path.exists(dest_file) and zipfile.is_zipfile(dest_file):
            extract_folder = os.path.join(video_dir, fname.replace('.zip', ''))
            os.makedirs(extract_folder, exist_ok=True)
            with zipfile.ZipFile(dest_file, 'r') as zip_ref:
                zip_ref.extractall(extract_folder)
            print(f"Extracted zip to {extract_folder}:")
            for root, dirs, files in os.walk(extract_folder):
                for f in files:
                    print("  ->", os.path.join(root, f))
    except Exception as e:
        print(f"Error downloading {fname}:", e)

print("\nFinished downloading and extracting all Drive zip archives!")
