from PIL import Image

src = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784596381381.png'
dest_assets = 'c:/Users/Chami/Downloads/Malika/assets/line_art/cultural_dancers.jpg'
dest_brain = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/cultural_dancers.jpg'

with Image.open(src) as img:
    w, h = img.size
    print(f"Original size: {w}x{h}")
    # The black picture frame is around the image. Crop inner area:
    # left ~ 22%, top ~ 14%, right ~ 83%, bottom ~ 80%
    crop_box = (int(w * 0.22), int(h * 0.14), int(w * 0.83), int(h * 0.80))
    cropped = img.crop(crop_box).convert('RGB')
    cropped.save(dest_assets, 'JPEG', quality=95)
    cropped.save(dest_brain, 'JPEG', quality=95)
    print("Cropped cultural dancers successfully!")
