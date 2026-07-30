from PIL import Image

src = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784596385247.png'
dest_assets = 'c:/Users/Chami/Downloads/Malika/assets/line_art/perahera_procession.jpg'
dest_brain = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/perahera_procession.jpg'

with Image.open(src) as img:
    w, h = img.size
    print(f"Original size: {w}x{h}")
    # Inner artwork area inside black picture frame:
    crop_box = (int(w * 0.07), int(h * 0.23), int(w * 0.94), int(h * 0.77))
    cropped = img.crop(crop_box).convert('RGB')
    cropped.save(dest_assets, 'JPEG', quality=95)
    cropped.save(dest_brain, 'JPEG', quality=95)
    print("Cropped perahera procession successfully!")
