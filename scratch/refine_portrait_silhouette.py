import numpy as np
from PIL import Image, ImageFilter

src_path = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/.user_uploaded/media__1784917427498.jpg'
out_path = 'c:/Users/Chami/Downloads/Malika/assets/malika_portrait_nobg.png'

img = Image.open(src_path).convert("RGBA")
w, h = img.size
pixels = np.array(img, dtype=np.float32)

r = pixels[:, :, 0]
g = pixels[:, :, 1]
b = pixels[:, :, 2]

# Calculate luminance
lum = 0.299 * r + 0.587 * g + 0.114 * b

# Create alpha mask initialized to 0
alpha = np.zeros((h, w), dtype=np.float32)

# Subject is centered horizontally: x between 25% and 75% of width
center_x_min = int(w * 0.26)
center_x_max = int(w * 0.74)
top_y = int(h * 0.08) # top of head

for y in range(top_y, h):
    for x in range(center_x_min, center_x_max):
        pr, pg, pb, plum = r[y, x], g[y, x], b[y, x], lum[y, x]
        
        # Color signatures:
        # Saree: bright cyan/blue (G > 130 and B > 150) or rainbow peach (R > 160 and G > 120)
        is_saree = (pg > 135 and pb > 150) or (pr > 170 and pg > 130 and pb > 110)
        
        # Graduation Gown: slate blue-grey (B > R and G > 70 and plum > 45)
        is_gown = (pb > pr - 10) and (pg > 65) and (45 < plum < 170)
        
        # Skin (Face, arms, neck): R > G > B
        is_skin = (pr > 110) and (pg > 75) and (pr > pg) and (pg > pb)
        
        # Hair (Dark pixels near center top): plum < 40 and near head center
        dist_from_center = abs(x - w / 2.0)
        is_hair = (plum < 65) and (dist_from_center < w * 0.18) and (y < h * 0.45)
        
        if is_saree or is_gown or is_skin or is_hair:
            alpha[y, x] = 255.0

# Apply morphological cleanup via Gaussian blur on alpha mask for smooth anti-aliased edge
alpha_img = Image.fromarray(alpha.astype(np.uint8), mode='L')
alpha_smooth = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.5))

# Combine original RGB with smooth Alpha
nobg_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
nobg_img.paste(img, (0, 0), mask=alpha_smooth)

# Crop tightly around subject standing posture
bbox = alpha_smooth.getbbox()
if bbox:
    nobg_cropped = nobg_img.crop(bbox)
else:
    nobg_cropped = nobg_img

nobg_cropped.save(out_path, "PNG")
print(f"Refined transparent portrait created -> {out_path} ({nobg_cropped.size})")
