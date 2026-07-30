from PIL import Image
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
user_up_dir = os.path.join(brain_dir, '.user_uploaded')
jew_dir = 'c:/Users/Chami/Downloads/Malika/assets/jewellary'
os.makedirs(jew_dir, exist_ok=True)

mappings = [
    ('media__1784821877167.png', 'jewelry_creation_daisy_necklaces.jpg'),
    ('media__1784821881684.png', 'jewelry_creation_packaged_butterflies.jpg'),
    ('media__1784821925660.png', 'jewelry_creation_butterfly_brooches_pair.jpg'),
    ('media__1784821934125.png', 'jewelry_creation_butterfly_brooches_quad.jpg'),
    ('media__1784821937034.png', 'jewelry_creation_necklace_card_sun.jpg')
]

images = []
for src, dest in mappings:
    img = Image.open(os.path.join(user_up_dir, src)).convert('RGB')
    img.save(os.path.join(jew_dir, dest), 'JPEG', quality=93)
    img.save(os.path.join(brain_dir, dest), 'JPEG', quality=93)
    images.append(img)

# Combine all 5 into a wide single composite frame
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

dest_assets_comp = os.path.join(jew_dir, 'jewelry_unique_creations_full_wide.jpg')
dest_brain_comp = os.path.join(brain_dir, 'jewelry_unique_creations_full_wide.jpg')

composite.save(dest_assets_comp, 'JPEG', quality=95)
composite.save(dest_brain_comp, 'JPEG', quality=95)

print(f"5 Unique Creation images and composite frame created successfully! Composite Size: {total_w}x{total_h}")
