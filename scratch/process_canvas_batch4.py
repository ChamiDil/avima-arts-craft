import os
from PIL import Image

uploaded_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/.user_uploaded'
dest_dir = 'c:/Users/Chami/Downloads/Malika/assets/canvas'
os.makedirs(dest_dir, exist_ok=True)

img_files = [
    ('media__1784916352793.jpg', 'canvas_majestic_elephant_livingroom.jpg'),
    ('media__1784916352803.jpg', 'canvas_majestic_elephant_closeup.jpg'),
    ('media__1784916352815.jpg', 'canvas_sunflower_woman_circular.jpg'),
    ('media__1784916352836.jpg', 'canvas_trio_garden_studio_display.jpg'),
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

# Also combine Majestic Elephant Closeup & Livingroom mockup as a 2-panel frame!
img_ele1 = Image.open(os.path.join(dest_dir, 'canvas_majestic_elephant_closeup.jpg'))
img_ele2 = Image.open(os.path.join(dest_dir, 'canvas_majestic_elephant_livingroom.jpg'))

target_h = 580
w_ele1 = int(img_ele1.width * (target_h / img_ele1.height))
w_ele2 = int(img_ele2.width * (target_h / img_ele2.height))

img_ele1_res = img_ele1.resize((w_ele1, target_h), Image.Resampling.LANCZOS)
img_ele2_res = img_ele2.resize((w_ele2, target_h), Image.Resampling.LANCZOS)

gap = 12
total_w = w_ele1 + w_ele2 + gap

comp_ele = Image.new('RGB', (total_w, target_h), (15, 19, 28))
comp_ele.paste(img_ele1_res, (0, 0))
comp_ele.paste(img_ele2_res, (w_ele1 + gap, 0))

comp_ele_path = os.path.join(dest_dir, 'canvas_majestic_elephant_2panel_frame.jpg')
comp_ele.save(comp_ele_path, 'JPEG', quality=93)
print(f"\nCreated 2-panel Majestic Elephant frame -> {comp_ele_path} ({comp_ele.size})")
