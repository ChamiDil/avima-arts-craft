from PIL import Image

src = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784598908158.png'
dest_assets = 'c:/Users/Chami/Downloads/Malika/assets/fabric/traditional_mask_single_bag.jpg'
dest_brain = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/traditional_mask_single_bag.jpg'

with Image.open(src) as img:
    w, h = img.size
    print(f"Original size: {w}x{h}")
    # The hand holding the bag is on the left side (x from 0 to ~w*0.20)
    # Crop from x = int(w * 0.18) to w to completely remove hand
    crop_box = (int(w * 0.18), 0, w, h)
    cropped = img.crop(crop_box).convert('RGB')
    cropped.save(dest_assets, 'JPEG', quality=95)
    cropped.save(dest_brain, 'JPEG', quality=95)
    print("Hand removed from mask bag image successfully!")
