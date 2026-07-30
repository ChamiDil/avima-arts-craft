from PIL import Image

image_path = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570720313.png'
with Image.open(image_path) as img:
    print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
    # Print some pixel colors from the top-left background area
    for y in range(0, 100, 20):
        print(f"Row {y}: {[img.getpixel((x, y)) for x in range(0, 100, 20)]}")
