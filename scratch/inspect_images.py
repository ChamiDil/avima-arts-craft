import os
from PIL import Image

media_dir = 'c:/Users/Chami/Downloads/Malika/Photos/extracted_mahogany/word/media'
for filename in sorted(os.listdir(media_dir)):
    if filename.endswith(('.jpg', '.jpeg', '.png')):
        filepath = os.path.join(media_dir, filename)
        with Image.open(filepath) as img:
            print(f"{filename}: size={img.size}, format={img.format}")
