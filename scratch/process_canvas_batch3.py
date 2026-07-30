import os
from PIL import Image

uploaded_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/.user_uploaded'
dest_dir = 'c:/Users/Chami/Downloads/Malika/assets/canvas'
os.makedirs(dest_dir, exist_ok=True)

img_files = [
    ('media__1784916210028.jpg', 'canvas_shiva_monochrome.jpg'),
    ('media__1784916210037.jpg', 'canvas_woman_geometric_popart.jpg'),
    ('media__1784916210047.jpg', 'canvas_elephant_embrace_circular.jpg'),
    ('media__1784916210056.jpg', 'canvas_red_supra_car.jpg'),
    ('media__1784916210066.jpg', 'canvas_trio_circular_grass_display.jpg'),
]

for idx, (fname, out_name) in enumerate(img_files, 1):
    src = os.path.join(uploaded_dir, fname)
    if os.path.exists(src):
        im = Image.open(src)
        print(f"Image {idx} ({fname}): size={im.size}, mode={im.mode}")
        out_path = os.path.join(dest_dir, out_name)
        im.convert('RGB').save(out_path, 'JPEG', quality=93)
        print(f"  Saved -> {out_path}")
    else:
        print(f"Error: {src} not found!")

print("Batch 3 processing complete!")
