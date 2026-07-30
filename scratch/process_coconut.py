from PIL import Image
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
dest_dir = 'c:/Users/Chami/Downloads/Malika/assets/coconut'
os.makedirs(dest_dir, exist_ok=True)

# 1. Combine 1st and 2nd images side-by-side in the same frame
img1_path = os.path.join(brain_dir, 'media__1784597442087.png')
img2_path = os.path.join(brain_dir, 'media__1784597445101.png')

with Image.open(img1_path) as im1, Image.open(img2_path) as im2:
    im1_rgb = im1.convert('RGB')
    im2_rgb = im2.convert('RGB')
    
    # Target height
    h_target = 800
    w1 = int(im1_rgb.width * (h_target / im1_rgb.height))
    w2 = int(im2_rgb.width * (h_target / im2_rgb.height))
    
    im1_resized = im1_rgb.resize((w1, h_target), Image.Resampling.LANCZOS)
    im2_resized = im2_rgb.resize((w2, h_target), Image.Resampling.LANCZOS)
    
    combined = Image.new('RGB', (w1 + w2 + 10, h_target), (15, 15, 15))
    combined.paste(im1_resized, (0, 0))
    combined.paste(im2_resized, (w1 + 10, 0))
    
    combined_dest = os.path.join(dest_dir, 'coconut_lamp_combined.jpg')
    combined_brain = os.path.join(brain_dir, 'coconut_lamp_combined.jpg')
    combined.save(combined_dest, 'JPEG', quality=93)
    combined.save(combined_brain, 'JPEG', quality=93)
    print("Combined 1st & 2nd coconut lamp images successfully!")

# 2. Save 3rd image: Coconut Display
img3_path = os.path.join(brain_dir, 'media__1784597482241.png')
with Image.open(img3_path) as im3:
    im3.convert('RGB').save(os.path.join(dest_dir, 'coconut_crafts_display.jpg'), 'JPEG', quality=93)
    im3.convert('RGB').save(os.path.join(brain_dir, 'coconut_crafts_display.jpg'), 'JPEG', quality=93)

# 3. Save 4th image: Jewelry set coconut handmade
img4_path = os.path.join(brain_dir, 'media__1784597531175.png')
with Image.open(img4_path) as im4:
    im4.convert('RGB').save(os.path.join(dest_dir, 'coconut_jewelry_set.jpg'), 'JPEG', quality=93)
    im4.convert('RGB').save(os.path.join(brain_dir, 'coconut_jewelry_set.jpg'), 'JPEG', quality=93)

# 4. Save 5th image: Original coconut clock with pen holder
img5_path = os.path.join(brain_dir, 'media__1784597497241.png')
with Image.open(img5_path) as im5:
    im5.convert('RGB').save(os.path.join(dest_dir, 'coconut_clock_pen_holder.jpg'), 'JPEG', quality=93)
    im5.convert('RGB').save(os.path.join(brain_dir, 'coconut_clock_pen_holder.jpg'), 'JPEG', quality=93)

print("All coconut images processed and saved!")
