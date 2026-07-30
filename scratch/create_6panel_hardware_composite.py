from PIL import Image
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
jew_dir = 'c:/Users/Chami/Downloads/Malika/assets/jewellary'
os.makedirs(jew_dir, exist_ok=True)

img_files = [
    'jewelry_raw_flower_cutout.jpg',
    'jewelry_painted_flower_cutout.jpg',
    'jewelry_cat_charms_pair.jpg',
    'jewelry_cat_keyring_assembled.jpg',
    'jewelry_tools_hardware_kit_full.jpg',
    'jewelry_metal_findings_close_up.jpg'
]

images = [Image.open(os.path.join(jew_dir, f)).convert('RGB') for f in img_files]

target_h = 600
resized_imgs = []
for img in images:
    w, h = img.size
    new_w = int(w * (target_h / h))
    resized_imgs.append(img.resize((new_w, target_h), Image.Resampling.LANCZOS))

gap = 10
total_w = sum(img.width for img in resized_imgs) + (gap * (len(resized_imgs) + 1))
total_h = target_h + (gap * 2)

composite = Image.new('RGB', (total_w, total_h), (18, 22, 31))
x_offset = gap
for img in resized_imgs:
    composite.paste(img, (x_offset, gap))
    x_offset += img.width + gap

dest_assets = os.path.join(jew_dir, 'plywood_jewelry_full_kit_and_hardware_6panel.jpg')
dest_brain = os.path.join(brain_dir, 'plywood_jewelry_full_kit_and_hardware_6panel.jpg')

composite.save(dest_assets, 'JPEG', quality=95)
composite.save(dest_brain, 'JPEG', quality=95)

print(f"6-Panel Tool Kit & Hardware Composite Frame created successfully! Size: {total_w}x{total_h}")
