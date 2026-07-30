import urllib.request
import zipfile
import os
import requests

video_dir = 'c:/Users/Chami/Downloads/Malika/assets/videos'
os.makedirs(video_dir, exist_ok=True)

files_to_download = [
    ('1qkbWC2krdkcdARFNoq0X36hDZb6UvIku', 'Mahogani_plate_art_1.zip'),
    ('1kqYnTtFOMcOGtO6zWwnV-UGfrwK1F6UO', 'fly_wood_jewellary_2.zip'),
    ('1p7SvkCJTY7r6qeJDSLZskZT-LOTTdNMo', 'Canvas_Art_3.zip'),
    ('1wtvDTmMHt_1KWpdSGvynr_rydDAV-s3x', 'Cement_art_4.zip'),
    ('1a68Rkc2JFm4y3k0opbFesMgvVsXklXJK', 'all_Arts_item_and_project.zip')
]

session = requests.Session()

for fid, fname in files_to_download:
    zip_path = os.path.join(video_dir, fname)
    print(f"\nDownloading {fname}...")
    
    url = f"https://drive.google.com/uc?export=download&id={fid}"
    response = session.get(url, stream=True)
    
    # Check for confirmation token if large file
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            url = f"https://drive.google.com/uc?export=download&confirm={value}&id={fid}"
            response = session.get(url, stream=True)
            break
            
    with open(zip_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=32768):
            if chunk:
                f.write(chunk)
                
    size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"Downloaded {fname}: {size_mb:.2f} MB")
    
    if zipfile.is_zipfile(zip_path):
        extract_folder = os.path.join(video_dir, fname.replace('.zip', ''))
        os.makedirs(extract_folder, exist_ok=True)
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_folder)
        print(f"Extracted to {extract_folder}:")
        for root, dirs, files in os.walk(extract_folder):
            for file in files:
                print("  ->", os.path.join(root, file))

print("\nDirect download script completed successfully!")
