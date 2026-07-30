from PIL import Image
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
user_up_dir = os.path.join(brain_dir, '.user_uploaded')
canvas_dir = 'c:/Users/Chami/Downloads/Malika/assets/canvas'
os.makedirs(canvas_dir, exist_ok=True)

mappings = [
    ('media__1784826929551.jpg', 'canvas_elephant_family_masterpiece.jpg'),
    ('media__1784827086127.jpg', 'canvas_tools_materials_preparation.jpg'),
    ('media__1784827297300.jpg', 'canvas_buddha_progress_face.jpg'),
    ('media__1784827301630.jpg', 'canvas_buddha_progress_circular.jpg'),
    ('media__1784827304624.jpg', 'canvas_buddha_lotus_finished.jpg')
]

imgs = []
for src, dest in mappings:
    img = Image.open(os.path.join(user_up_dir, src)).convert('RGB')
    img.save(os.path.join(canvas_dir, dest), 'JPEG', quality=93)
    img.save(os.path.join(brain_dir, dest), 'JPEG', quality=93)
    imgs.append(img)

print("Saved all 5 Canvas Art images successfully!")

# Combine 3rd, 4th, and 5th images (Buddha progress to final) into a 3-panel composite
buddha_imgs = imgs[2:]
target_h = 600
resized_buddha = []
for img in buddha_imgs:
    w, h = img.size
    new_w = int(w * (target_h / h))
    resized_buddha.append(img.resize((new_w, target_h), Image.Resampling.LANCZOS))

gap = 10
total_w = sum(img.width for img in resized_buddha) + (gap * (len(resized_buddha) + 1))
total_h = target_h + (gap * 2)

composite = Image.new('RGB', (total_w, total_h), (18, 22, 31))
x_offset = gap
for img in resized_buddha:
    composite.paste(img, (x_offset, gap))
    x_offset += img.width + gap

dest_assets_comp = os.path.join(canvas_dir, 'canvas_buddha_progress_3panel.jpg')
dest_brain_comp = os.path.join(brain_dir, 'canvas_buddha_progress_3panel.jpg')

composite.save(dest_assets_comp, 'JPEG', quality=95)
composite.save(dest_brain_comp, 'JPEG', quality=95)

print(f"3-Panel Buddha Progress Composite Frame created successfully! Size: {total_w}x{total_h}")
