from PIL import Image

image_path = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570720313.png'
with Image.open(image_path) as img:
    w, h = img.size
    print(f"Size: {w}x{h}")
    # Sample every 50 pixels horizontally and vertically
    for y in range(0, h, 80):
        row_str = []
        for x in range(0, w, 80):
            pixel = img.getpixel((x, y))
            row_str.append(f"({x},{y}):{pixel[:3]}")
        print("  ".join(row_str))
