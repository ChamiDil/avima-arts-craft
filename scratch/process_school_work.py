from PIL import Image
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
dest_dir = 'c:/Users/Chami/Downloads/Malika/assets/school'
os.makedirs(dest_dir, exist_ok=True)

# 1. Combine 1st, 2nd, and 3rd images side-by-side in the same frame
img1_path = os.path.join(brain_dir, 'media__1784599576696.png')
img2_path = os.path.join(brain_dir, 'media__1784599579575.png')
img3_path = os.path.join(brain_dir, 'media__1784599582711.png')

with Image.open(img1_path) as im1, Image.open(img2_path) as im2, Image.open(img3_path) as im3:
    im1_rgb = im1.convert('RGB')
    im2_rgb = im2.convert('RGB')
    im3_rgb = im3.convert('RGB')
    
    h_target = 800
    w1 = int(im1_rgb.width * (h_target / im1_rgb.height))
    w2 = int(im2_rgb.width * (h_target / im2_rgb.height))
    w3 = int(im3_rgb.width * (h_target / im3_rgb.height))
    
    im1_r = im1_rgb.resize((w1, h_target), Image.Resampling.LANCZOS)
    im2_r = im2_rgb.resize((w2, h_target), Image.Resampling.LANCZOS)
    im3_r = im3_rgb.resize((w3, h_target), Image.Resampling.LANCZOS)
    
    spacing = 10
    total_w = w1 + w2 + w3 + (spacing * 2)
    combined = Image.new('RGB', (total_w, h_target), (15, 15, 15))
    
    combined.paste(im1_r, (0, 0))
    combined.paste(im2_r, (w1 + spacing, 0))
    combined.paste(im3_r, (w1 + w2 + (spacing * 2), 0))
    
    combined.save(os.path.join(dest_dir, 'school_work_murals_combined.jpg'), 'JPEG', quality=93)
    combined.save(os.path.join(brain_dir, 'school_work_murals_combined.jpg'), 'JPEG', quality=93)
    print("Combined 1st, 2nd, and 3rd school work images successfully!")

# 2. Process 4th image (Yoga & Wellness Center wall mural) - crop hand at bottom left
img4_path = os.path.join(brain_dir, 'media__1784599630642.png')
with Image.open(img4_path) as im4:
    im4_rgb = im4.convert('RGB')
    w, h = im4_rgb.size
    # Crop top 72% to remove hand from foreground
    crop_box = (0, 0, w, int(h * 0.72))
    cropped_im4 = im4_rgb.crop(crop_box)
    cropped_im4.save(os.path.join(dest_dir, 'yoga_wellness_mural.jpg'), 'JPEG', quality=93)
    cropped_im4.save(os.path.join(brain_dir, 'yoga_wellness_mural.jpg'), 'JPEG', quality=93)
    print("Cropped yoga wellness mural image successfully!")

# 3. Process 5th image (Giraffe cutout art)
img5_path = os.path.join(brain_dir, 'media__1784599634447.png')
with Image.open(img5_path) as im5:
    im5.convert('RGB').save(os.path.join(dest_dir, 'giraffe_cutout_art.jpg'), 'JPEG', quality=93)
    im5.convert('RGB').save(os.path.join(brain_dir, 'giraffe_cutout_art.jpg'), 'JPEG', quality=93)
    print("Saved giraffe cutout art successfully!")
