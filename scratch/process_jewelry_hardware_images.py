from PIL import Image
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
jew_dir = 'c:/Users/Chami/Downloads/Malika/assets/jewellary'
os.makedirs(jew_dir, exist_ok=True)

img_files = [
    ('media__1784820694937.png', 'jewelry_raw_flower_cutout.jpg'),
    ('media__1784820699478.png', 'jewelry_painted_flower_cutout.jpg'),
    ('media__1784820702930.png', 'jewelry_cat_charms_pair.jpg'),
    ('media__1784820706144.png', 'jewelry_cat_keyring_assembled.jpg')
]

images = []
for src, dest in img_files:
    img = Image.open(os.path.join(brain_dir, src)).convert('RGB')
    img.save(os.path.join(jew_dir, dest), 'JPEG', quality=93)
    img.save(os.path.join(brain_dir, dest), 'JPEG', quality=93)
    images.append(img)

# Combine all 4 into a wide single composite frame
target_height = 600
resized_imgs = []
for img in images:
    w, h = img.size
    new_w = int(w * (target_height / h))
    resized_imgs.append(img.resize((new_w, target_height), Image.Resampling.LANCZOS))

gap = 12
total_width = sum(img.width for img in resized_imgs) + (gap * (len(resized_imgs) + 1))
total_height = target_height + (gap * 2)

composite = Image.new('RGB', (total_width, total_height), (18, 22, 31))
x_offset = gap
for img in resized_imgs:
    composite.paste(img, (x_offset, gap))
    x_offset += img.width + gap

dest_assets_comp = os.path.join(jew_dir, 'plywood_jewelry_tools_hardware_combined.jpg')
dest_brain_comp = os.path.join(brain_dir, 'plywood_jewelry_tools_hardware_combined.jpg')

composite.save(dest_assets_comp, 'JPEG', quality=95)
composite.save(dest_brain_comp, 'JPEG', quality=95)

print(f"4 Jewelry images and composite frame created successfully! Composite Size: {total_width}x{total_height}")
