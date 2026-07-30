import os
from PIL import Image

uploaded_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/.user_uploaded'
dest_dir = 'c:/Users/Chami/Downloads/Malika/assets/canvas'
os.makedirs(dest_dir, exist_ok=True)

img_files = [
    'media__1784826929551.jpg', # Image 1: Circular Lotus Buddha
    'media__1784827086127.jpg', # Image 2: Paints & Gesso & Spray
    'media__1784827297300.jpg', # Image 3: Brushes & Palette
    'media__1784827301630.jpg', # Image 4: Elephant Family Canvases
    'media__1784827304624.jpg', # Image 5: Sri Lanka Japan Canvas
]

for idx, fname in enumerate(img_files, 1):
    src = os.path.join(uploaded_dir, fname)
    if os.path.exists(src):
        im = Image.open(src)
        print(f"Image {idx} ({fname}): size={im.size}, mode={im.mode}")
        
        # Save individual clean versions
        out_name = f"canvas_user_img_{idx}.jpg"
        out_path = os.path.join(dest_dir, out_name)
        im.convert('RGB').save(out_path, 'JPEG', quality=92)
        print(f"  Saved -> {out_path}")

# Now let's create the side-by-side composite frame for Image 2 and Image 3!
img2 = Image.open(os.path.join(dest_dir, 'canvas_user_img_2.jpg'))
img3 = Image.open(os.path.join(dest_dir, 'canvas_user_img_3.jpg'))

# Target height for composite
target_h = 620
w2 = int(img2.width * (target_h / img2.height))
w3 = int(img3.width * (target_h / img3.height))

img2_resized = img2.resize((w2, target_h), Image.Resampling.LANCZOS)
img3_resized = img3.resize((w3, target_h), Image.Resampling.LANCZOS)

gap = 12
total_w = w2 + w3 + gap

composite = Image.new('RGB', (total_w, target_h), (15, 19, 28))
composite.paste(img2_resized, (0, 0))
composite.paste(img3_resized, (w2 + gap, 0))

composite_path = os.path.join(dest_dir, 'canvas_tools_colors_2panel_frame.jpg')
composite.save(composite_path, 'JPEG', quality=92)
print(f"\nCreated 2-panel tools & colors composite frame -> {composite_path} ({composite.size})")

# Also create side-by-side frame for Image 4 and Image 5 (Elephant Family + Sri Lanka Japan Canvas)
img4 = Image.open(os.path.join(dest_dir, 'canvas_user_img_4.jpg'))
img5 = Image.open(os.path.join(dest_dir, 'canvas_user_img_5.jpg'))

w4 = int(img4.width * (target_h / img4.height))
w5 = int(img5.width * (target_h / img5.height))

img4_resized = img4.resize((w4, target_h), Image.Resampling.LANCZOS)
img5_resized = img5.resize((w5, target_h), Image.Resampling.LANCZOS)

total_w2 = w4 + w5 + gap
composite_paintings = Image.new('RGB', (total_w2, target_h), (15, 19, 28))
composite_paintings.paste(img4_resized, (0, 0))
composite_paintings.paste(img5_resized, (w4 + gap, 0))

comp_paintings_path = os.path.join(dest_dir, 'canvas_featured_paintings_2panel.jpg')
composite_paintings.save(comp_paintings_path, 'JPEG', quality=92)
print(f"Created 2-panel featured paintings frame -> {comp_paintings_path} ({composite_paintings.size})")
