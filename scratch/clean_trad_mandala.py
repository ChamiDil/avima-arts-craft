from PIL import Image, ImageDraw

src = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570716241.jpg'
dest_assets = 'c:/Users/Chami/Downloads/Malika/assets/plates/traditional_art_mandala.jpg'
dest_brain = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/traditional_art_mandala.jpg'

with Image.open(src) as img:
    w, h = img.size
    print(f"Size: {w}x{h}")
    
    # Plate circle bounds
    xc, yc = 590, 800
    r = 550
    
    # Create mask
    mask = Image.new('L', (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((xc - r, yc - r, xc + r, yc + r), fill=255)
    
    # Clean background
    bg = Image.new('RGB', (w, h), (18, 18, 18))
    img_rgb = img.convert('RGB')
    bg.paste(img_rgb, (0, 0), mask)
    
    # Crop tightly around the plate
    crop_box = (xc - r - 20, yc - r - 20, xc + r + 20, yc + r + 20)
    cropped = bg.crop(crop_box)
    
    cropped.save(dest_assets, 'JPEG', quality=95)
    cropped.save(dest_brain, 'JPEG', quality=95)
    print("Traditional Art Mandala background & hand removed successfully!")
