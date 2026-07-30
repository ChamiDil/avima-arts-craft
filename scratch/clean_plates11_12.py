from PIL import Image, ImageDraw

def clean_plate(src, dest_assets, dest_brain, xc, yc, r, bg_color=(15, 15, 15)):
    with Image.open(src) as img:
        w, h = img.size
        print(f"Cleaning {src}: {w}x{h}")
        mask = Image.new('L', (w, h), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((xc - r, yc - r, xc + r, yc + r), fill=255)
        
        bg = Image.new('RGB', (w, h), bg_color)
        img_rgb = img.convert('RGB')
        bg.paste(img_rgb, (0, 0), mask)
        
        # Crop around plate
        pad = 30
        crop_box = (max(0, xc - r - pad), max(0, yc - r - pad), min(w, xc + r + pad), min(h, yc + r + pad))
        cropped = bg.crop(crop_box)
        
        cropped.save(dest_assets, 'JPEG', quality=95)
        cropped.save(dest_brain, 'JPEG', quality=95)
        print(f"Saved cleaned plate to {dest_assets}")

# Clean plate11 (Earthy Spiral Clay Plate)
clean_plate(
    'c:/Users/Chami/Downloads/Malika/assets/plates/plate11.jpg',
    'c:/Users/Chami/Downloads/Malika/assets/plates/plate11.jpg',
    'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/plate11.jpg',
    xc=602, yc=640, r=520
)

# Clean plate12 (Golden Swirls Plate)
clean_plate(
    'c:/Users/Chami/Downloads/Malika/assets/plates/plate12.jpg',
    'c:/Users/Chami/Downloads/Malika/assets/plates/plate12.jpg',
    'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/plate12.jpg',
    xc=800, yc=602, r=530
)
