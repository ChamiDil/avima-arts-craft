import os
import shutil

src = 'C:/Users/Chami/Downloads/Malika/Photos/create_an_video_using_this_pic.mp4'
dest_dir = 'c:/Users/Chami/Downloads/Malika/assets/videos'
os.makedirs(dest_dir, exist_ok=True)
dest = os.path.join(dest_dir, 'hero_malika_video.mp4')

if os.path.exists(src):
    shutil.copy2(src, dest)
    print(f"Successfully copied video -> {dest} (Size: {os.path.getsize(dest)} bytes)")
else:
    print(f"File not found: {src}")
