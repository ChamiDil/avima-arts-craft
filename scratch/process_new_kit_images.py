from PIL import Image
import os

brain_dir = 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5'
user_up_dir = os.path.join(brain_dir, '.user_uploaded')
jew_dir = 'c:/Users/Chami/Downloads/Malika/assets/jewellary'
os.makedirs(jew_dir, exist_ok=True)

# 1. Convert and save the 2 new tool kit images
kit_img_file = 'media__1784820990223.png'
findings_img_file = 'media__1784820993623.png'

kit_img = Image.open(os.path.join(user_up_dir, kit_img_file)).convert('RGB')
findings_img = Image.open(os.path.join(user_up_dir, findings_img_file)).convert('RGB')

kit_img.save(os.path.join(jew_dir, 'jewelry_tools_hardware_kit_full.jpg'), 'JPEG', quality=93)
kit_img.save(os.path.join(brain_dir, 'jewelry_tools_hardware_kit_full.jpg'), 'JPEG', quality=93)

findings_img.save(os.path.join(jew_dir, 'jewelry_metal_findings_close_up.jpg'), 'JPEG', quality=93)
findings_img.save(os.path.join(brain_dir, 'jewelry_metal_findings_close_up.jpg'), 'JPEG', quality=93)

print("Saved 2 new tool kit & hardware images successfully!")

# 2. Create a composite frame combining the 2 new tool kit images side-by-side
target_h = 650
w1 = int(kit_img.width * (target_h / kit_img.height))
w2 = int(findings_img.width * (target_h / findings_img.height))

img1_r = kit_img.resize((w1, target_h), Image.Resampling.LANCZOS)
img2_r = findings_img.resize((w2, target_h), Image.Resampling.LANCZOS)

gap = 12
total_w = w1 + w2 + (gap * 3)
total_h = target_h + (gap * 2)

kit_composite = Image.new('RGB', (total_w, total_h), (18, 22, 31))
kit_composite.paste(img1_r, (gap, gap))
kit_composite.paste(img2_r, (w1 + (gap * 2), gap))

kit_composite.save(os.path.join(jew_dir, 'jewelry_tools_hardware_kit_combined.jpg'), 'JPEG', quality=95)
kit_composite.save(os.path.join(brain_dir, 'jewelry_tools_hardware_kit_combined.jpg'), 'JPEG', quality=95)

print(f"Tool kit composite created successfully! Size: {total_w}x{total_h}")
