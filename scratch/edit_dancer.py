from PIL import Image

src_path = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570720313.png'
dest_path = 'c:/Users/Chami/Downloads/Malika/assets/plates/traditional_dancer.jpg'

# Parameters for the plate circle
x_c = 242
y_c = 426
r = 220

with Image.open(src_path) as img:
    # Convert to RGB (jpeg does not support RGBA)
    img_rgb = img.convert('RGB')
    pixels = img_rgb.load()
    w, h = img_rgb.size
    
    # Process the pixels
    for y in range(h):
        for x in range(w):
            # Calculate distance from circle center
            dist_sq = (x - x_c) ** 2 + (y - y_c) ** 2
            
            # If outside the plate circle, and in the hand region (bottom-left area)
            if dist_sq > r ** 2:
                # The hand is on the left side, below y=550
                if x < 242 and y > 520:
                    # Reflect from the right side of the background
                    target_x = w - 1 - x
                    # Copy pixel from the right side
                    pixels[x, y] = pixels[target_x, y]
                    
    # Save as JPEG
    img_rgb.save(dest_path, 'JPEG', quality=95)
    print("Dancer image edited and saved successfully!")
