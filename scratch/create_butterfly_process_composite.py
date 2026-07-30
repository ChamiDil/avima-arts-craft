from PIL import Image, ImageOps
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
jew_dir = 'c:/Users/Chami/Downloads/Malika/assets/jewellary'
os.makedirs(jew_dir, exist_ok=True)

img_files = [
    'media__1784819087331.png', # 1. Cut wooden butterfly in hand
    'media__1784819091217.png', # 2. Cut wooden shapes (flowers & wings)
    'media__1784819094298.png', # 3. Butterfly measurements sketch (9.5 x 4 cm)
    'media__1784819097381.png', # 4. Raw plywood boards stack
    'media__1784819100534.png'  # 5. Fine drawing tools & ruler
]

images = [Image.open(os.path.join(brain_dir, f)).convert('RGB') for f in img_files]

# Resize all images to equal target height (e.g. 600px) maintaining aspect ratio
target_height = 600
resized_imgs = []
for img in images:
    w, h = img.size
    new_w = int(w * (target_height / h))
    resized_imgs.append(img.resize((new_w, target_height), Image.Resampling.LANCZOS))

# Calculate total width for horizontal composite with 12px gaps
gap = 12
total_width = sum(img.width for img in resized_imgs) + (gap * (len(resized_imgs) + 1))
total_height = target_height + (gap * 2)

# Create a sleek dark background canvas (#12161f)
composite = Image.new('RGB', (total_width, total_height), (18, 22, 31))

# Paste images horizontally
x_offset = gap
for img in resized_imgs:
    composite.paste(img, (x_offset, gap))
    x_offset += img.width + gap

# Save composite frame
dest_assets = os.path.join(jew_dir, 'handcrafted_wooden_butterfly_process_combined.jpg')
dest_brain = os.path.join(brain_dir, 'handcrafted_wooden_butterfly_process_combined.jpg')

composite.save(dest_assets, 'JPEG', quality=95)
composite.save(dest_brain, 'JPEG', quality=95)
print(f"Composite frame created successfully with size {total_width}x{total_height}!")
