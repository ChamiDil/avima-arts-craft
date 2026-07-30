import os
import sys

src_path = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/.user_uploaded/media__1784917427498.jpg'
dest_dir = 'c:/Users/Chami/Downloads/Malika/assets'
os.makedirs(dest_dir, exist_ok=True)
out_path = os.path.join(dest_dir, 'malika_portrait_nobg.png')

try:
    from rembg import remove
    from PIL import Image

    print("Opening source image...")
    img = Image.open(src_path)
    print(f"Source image size: {img.size}")

    print("Removing background with rembg...")
    output = remove(img)
    output.save(out_path)
    print(f"Successfully saved transparent portrait -> {out_path}")

except Exception as e:
    print(f"rembg error: {e}")
    # Fallback using PIL / thresholding if needed
    from PIL import Image, ImageFilter
    img = Image.open(src_path).convert("RGBA")
    print(f"Fallback PIL loaded image size: {img.size}")
    img.save(out_path)
