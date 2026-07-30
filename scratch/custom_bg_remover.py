import numpy as np
from PIL import Image

src_path = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/.user_uploaded/media__1784917427498.jpg'
dest_path = 'c:/Users/Chami/Downloads/Malika/assets/malika_portrait_nobg.png'

# First try rembg if installed
try:
    from rembg import remove
    print("Using rembg for state-of-the-art background removal...")
    img = Image.open(src_path)
    nobg = remove(img)
    nobg.save(dest_path)
    print(f"Saved via rembg -> {dest_path}")
    exit(0)
except Exception as e:
    print(f"rembg not ready yet ({e}), running smart fallback segmentation...")

img = Image.open(src_path).convert("RGBA")
arr = np.array(img, dtype=np.float32)

r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
luminance = 0.299 * r + 0.587 * g + 0.114 * b

# Subject coordinates estimate: center 20% to 80% horizontally, 8% to 98% vertically
h, w = arr.shape[:2]
mask = np.zeros((h, w), dtype=np.uint8)

# Center bounding box for subject
x1, x2 = int(w * 0.28), int(w * 0.72)
y1, y2 = int(h * 0.08), int(h * 0.98)

for y in range(h):
    for x in range(w):
        if x1 <= x <= x2 and y1 <= y <= y2:
            # Check if this pixel belongs to background stage
            # Stage floor/backdrop has dark values or red flare spots outside body
            val_r, val_g, val_b = r[y, x], g[y, x], b[y, x]
            lum = luminance[y, x]
            
            # Saree cyan check
            is_saree = (val_g > 140 and val_b > 160) or (val_r > 180 and val_g > 140 and val_b < 140)
            # Gown slate blue check
            is_gown = (val_b > val_r + 5) and (45 < lum < 160) and (val_g > 50)
            # Skin tone check
            is_skin = (val_r > 120) and (val_g > 80) and (val_r > val_g) and (val_g > val_b)
            # Hair & gown shadows (near center x)
            is_subject_dark = (lum < 50) and (abs(x - w//2) < w * 0.16) and (y < h * 0.85)

            if is_saree or is_gown or is_skin or is_subject_dark:
                mask[y, x] = 255
            else:
                # Soft transition
                if lum > 40:
                    mask[y, x] = int(min(255, lum * 1.5))
                else:
                    mask[y, x] = 0

arr[:, :, 3] = mask
result = Image.fromarray(arr.astype(np.uint8))
result.save(dest_path)
print(f"Saved custom segmented portrait -> {dest_path}")
