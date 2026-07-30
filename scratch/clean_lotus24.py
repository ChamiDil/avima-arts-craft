from PIL import Image, ImageDraw

src = 'c:/Users/Chami/Downloads/Malika/assets/plates/lotus_mandala_24inch.jpg'
dest_assets = 'c:/Users/Chami/Downloads/Malika/assets/plates/lotus_mandala_24inch.jpg'
dest_brain = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/lotus_mandala_24inch.jpg'

with Image.open(src) as img:
    w, h = img.size
    print(f"Size: {w}x{h}")
    # Calculate plate circle bounds
    # Center is roughly (w/2, h/2), radius is ~ min(w, h)/2 - margin
    xc, yc = w // 2, h // 2
    r = min(w, h) // 2 - 25
    
    # Create mask
    mask = Image.new('L', (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((xc - r, yc - r, xc + r, yc + r), fill=255)
    
    # Create dark clean background image
    bg = Image.new('RGB', (w, h), (15, 15, 15))
    img_rgb = img.convert('RGB')
    bg.paste(img_rgb, (0, 0), mask)
    
    bg.save(dest_assets, 'JPEG', quality=95)
    bg.save(dest_brain, 'JPEG', quality=95)
    print("Lotus 24 inch background removed successfully!")
