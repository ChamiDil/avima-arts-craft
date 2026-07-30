from PIL import Image, ImageDraw, ImageFilter

# 1. Earthy Spiral Clay Plate (plate11)
src_11 = 'c:/Users/Chami/Downloads/Malika/Photos/extracted_mahogany/word/media/image24.jpg'
dest_11 = 'c:/Users/Chami/Downloads/Malika/assets/plates/plate11.jpg'
brain_11 = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/plate11.jpg'

with Image.open(src_11) as img:
    img = img.convert('RGB')
    w, h = img.size
    # Plate circle: center (480, 520), radius 420
    xc, yc, r = 480, 520, 415
    
    # Create mask for plate
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            dist_sq = (x - xc)**2 + (y - yc)**2
            if dist_sq > r**2:
                # If in the bottom hand region (y > 900)
                if y > 890:
                    # Sample background from top-left or top-right background at same relative angle
                    # Or reflect from top background
                    sample_y = max(0, 2 * yc - y)
                    pixels[x, y] = pixels[x, min(sample_y, h-1)]
    img.save(dest_11, 'JPEG', quality=95)
    img.save(brain_11, 'JPEG', quality=95)
    print("plate11 hand removed successfully keeping background!")

# 2. Golden Swirls Plate (plate12)
src_12 = 'c:/Users/Chami/Downloads/Malika/Photos/extracted_mahogany/word/media/image25.jpg'
dest_12 = 'c:/Users/Chami/Downloads/Malika/assets/plates/plate12.jpg'
brain_12 = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/plate12.jpg'

with Image.open(src_12) as img:
    img = img.convert('RGB')
    w, h = img.size
    # Plate circle: center (800, 600), radius 530
    xc, yc, r = 800, 600, 530
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            dist_sq = (x - xc)**2 + (y - yc)**2
            if dist_sq > r**2:
                # Hand is at bottom right (x > 900, y > 950)
                if x > 850 and y > 950:
                    sample_x = max(0, 2 * xc - x)
                    pixels[x, y] = pixels[sample_x, y]
    img.save(dest_12, 'JPEG', quality=95)
    img.save(brain_12, 'JPEG', quality=95)
    print("plate12 hand removed successfully keeping background!")

# 3. Traditional Art Mandala
src_trad = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570716241.jpg'
dest_trad = 'c:/Users/Chami/Downloads/Malika/assets/plates/traditional_art_mandala.jpg'
brain_trad = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/traditional_art_mandala.jpg'

with Image.open(src_trad) as img:
    img = img.convert('RGB')
    w, h = img.size
    xc, yc, r = 366, 480, 360
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            dist_sq = (x - xc)**2 + (y - yc)**2
            if dist_sq > r**2:
                if y > 750:
                    sample_y = max(0, 2 * yc - y)
                    pixels[x, y] = pixels[x, sample_y]
    img.save(dest_trad, 'JPEG', quality=95)
    img.save(brain_trad, 'JPEG', quality=95)
    print("traditional_art_mandala hand removed successfully keeping background!")

# 4. Size 24 inch Lotus Flower Mandala
src_lotus = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570136241.jpg'
dest_lotus = 'c:/Users/Chami/Downloads/Malika/assets/plates/lotus_mandala_24inch.jpg'
brain_lotus = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/lotus_mandala_24inch.jpg'

with Image.open(src_lotus) as img:
    img = img.convert('RGB')
    w, h = img.size
    xc, yc, r = 424, 354, 320
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            dist_sq = (x - xc)**2 + (y - yc)**2
            if dist_sq > r**2:
                if x > 650 and y > 450:
                    sample_x = max(0, 2 * xc - x)
                    pixels[x, y] = pixels[sample_x, y]
    img.save(dest_lotus, 'JPEG', quality=95)
    img.save(brain_lotus, 'JPEG', quality=95)
    print("lotus_mandala_24inch hand removed successfully keeping background!")
