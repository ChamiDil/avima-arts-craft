from PIL import Image
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
jew_dir = 'c:/Users/Chami/Downloads/Malika/assets/jewellary'
os.makedirs(jew_dir, exist_ok=True)

img_files = [
    'media__1784819097381.png', # Stack of Raw Plywood Boards
    'media__1784819100534.png', # Drawing & Layout Tools
    'media__1784819273264.png', # Technical 4.00 cm x 3.50 cm Dimension Blueprint
    'media__1784819094298.png', # Sketching Butterfly & Circle Layout
    'media__1784819087331.png', # Raw Cutout Wooden Butterfly in Hand
    'media__1784819091217.png', # Batch of Cut Wooden Flower & Butterfly Shapes
    'media__1784819269495.png', # White Gesso Primed Wooden Cutouts Array
    'media__1784819265830.png'  # Finished Hand-Painted Butterfly in Hand
]

images = [Image.open(os.path.join(brain_dir, f)).convert('RGB') for f in img_files]

# Resize all 8 images to equal target height (600px) keeping aspect ratio
target_height = 600
resized_imgs = []
for img in images:
    w, h = img.size
    new_w = int(w * (target_height / h))
    resized_imgs.append(img.resize((new_w, target_height), Image.Resampling.LANCZOS))

# Calculate total width for horizontal composite with 10px gaps
gap = 10
total_width = sum(img.width for img in resized_imgs) + (gap * (len(resized_imgs) + 1))
total_height = target_height + (gap * 2)

# Create a sleek dark background canvas (#12161f)
composite = Image.new('RGB', (total_width, total_height), (18, 22, 31))

# Paste images horizontally in logical 8-step chronological order
x_offset = gap
for img in resized_imgs:
    composite.paste(img, (x_offset, gap))
    x_offset += img.width + gap

# Save composite frame
dest_assets = os.path.join(jew_dir, 'handcrafted_wooden_butterfly_full_process_wide.jpg')
dest_brain = os.path.join(brain_dir, 'handcrafted_wooden_butterfly_full_process_wide.jpg')

composite.save(dest_assets, 'JPEG', quality=95)
composite.save(dest_brain, 'JPEG', quality=95)
print(f"8-Image Ultra-Wide Process Frame created successfully! Size: {total_width}x{total_height}")
