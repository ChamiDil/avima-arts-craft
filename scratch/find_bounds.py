from PIL import Image

image_path = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570720313.png'
with Image.open(image_path) as img:
    w, h = img.size
    y = h // 2
    # Trace horizontally at middle y
    row_pixels = [img.getpixel((x, y))[:3] for x in range(w)]
    
    # Print first 60 pixels from left and last 60 from right at y=426
    print("Left 60 pixels at mid-y:")
    for x in range(60):
        print(f"{x}: {row_pixels[x]}", end=" | " if x % 5 != 4 else "\n")
    print("\nRight 60 pixels at mid-y:")
    for x in range(w - 60, w):
        print(f"{x}: {row_pixels[x]}", end=" | " if x % 5 != 4 else "\n")
