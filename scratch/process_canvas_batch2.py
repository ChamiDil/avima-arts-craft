import os
from PIL import Image

uploaded_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/.user_uploaded'
dest_dir = 'c:/Users/Chami/Downloads/Malika/assets/canvas'
os.makedirs(dest_dir, exist_ok=True)

img_files = [
    ('media__1784916007835.jpg', 'canvas_jesus_circular_popart.jpg'),       # 1st: Jesus Portrait
    ('media__1784916014662.jpg', 'canvas_buddha_perspective_paints.jpg'),   # 2nd: Buddha angle with paints
    ('media__1784916036213.jpg', 'canvas_perahera_progress.jpg'),           # 3rd: Temple Perahera progress
    ('media__1784916036221.jpg', 'canvas_tiger_mandala_art.jpg'),           # 4th: Tiger Mandala
    ('media__1784916036231.jpg', 'canvas_perahera_finished.jpg'),           # 5th: Temple Perahera finished
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

# Now combine 3rd and 5th picture as ONE single frame!
img3 = Image.open(os.path.join(dest_dir, 'canvas_perahera_progress.jpg'))
img5 = Image.open(os.path.join(dest_dir, 'canvas_perahera_finished.jpg'))

target_h = 580
w3 = int(img3.width * (target_h / img3.height))
w5 = int(img5.width * (target_h / img5.height))

img3_resized = img3.resize((w3, target_h), Image.Resampling.LANCZOS)
img5_resized = img5.resize((w5, target_h), Image.Resampling.LANCZOS)

gap = 12
total_w = w3 + w5 + gap

composite = Image.new('RGB', (total_w, target_h), (15, 19, 28))
composite.paste(img3_resized, (0, 0))
composite.paste(img5_resized, (w3 + gap, 0))

composite_path = os.path.join(dest_dir, 'canvas_perahera_progress_to_finished_frame.jpg')
composite.save(composite_path, 'JPEG', quality=93)
print(f"\nCreated 2-panel composite frame for 3rd & 5th images -> {composite_path} ({composite.size})")
