from PIL import Image
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
dest_dir = 'c:/Users/Chami/Downloads/Malika/assets/school'
os.makedirs(dest_dir, exist_ok=True)

# 1st image: Traditional Yoga School Wall Mural (Crop hand from bottom foreground)
img1_path = os.path.join(brain_dir, 'media__1784599897075.png')
with Image.open(img1_path) as im1:
    im1_rgb = im1.convert('RGB')
    w, h = im1_rgb.size
    # Crop out bottom 22% hand region
    crop_box = (0, 0, w, int(h * 0.78))
    cropped = im1_rgb.crop(crop_box)
    cropped.save(os.path.join(dest_dir, 'traditional_yoga_school_mural.jpg'), 'JPEG', quality=93)
    cropped.save(os.path.join(brain_dir, 'traditional_yoga_school_mural.jpg'), 'JPEG', quality=93)
    print("Cropped hand from yoga school mural image successfully!")

# 2nd image: Giraffe & Monkey Cutouts
img2_path = os.path.join(brain_dir, 'media__1784599900679.png')
with Image.open(img2_path) as im2:
    im2.convert('RGB').save(os.path.join(dest_dir, 'giraffe_monkey_cutout.jpg'), 'JPEG', quality=93)
    im2.convert('RGB').save(os.path.join(brain_dir, 'giraffe_monkey_cutout.jpg'), 'JPEG', quality=93)

# 3rd image: Monkey Hanging from Tree Frame
img3_path = os.path.join(brain_dir, 'media__1784599904971.png')
with Image.open(img3_path) as im3:
    im3.convert('RGB').save(os.path.join(dest_dir, 'monkey_tree_frame.jpg'), 'JPEG', quality=93)
    im3.convert('RGB').save(os.path.join(brain_dir, 'monkey_tree_frame.jpg'), 'JPEG', quality=93)

print("3 new school work images processed and saved successfully!")
