from PIL import Image

def find_hand_region(path, name):
    with Image.open(path) as img:
        w, h = img.size
        print(f"=== {name} ({w}x{h}) ===")
        # Check bottom and side edges for skin tones (high R, moderate G, lower B)
        # Sample bottom rows
        for y in range(h - 150, h, 30):
            skin_pixels = []
            for x in range(0, w, 30):
                r, g, b = img.getpixel((x, y))[:3]
                if r > 120 and g > 70 and r > g + 20 and g > b + 10:
                    skin_pixels.append((x, y, (r, g, b)))
            if skin_pixels:
                print(f"Row {y} potential skin: {skin_pixels[:3]} (total {len(skin_pixels)})")

find_hand_region('c:/Users/Chami/Downloads/Malika/Photos/extracted_mahogany/word/media/image24.jpg', 'plate11')
find_hand_region('c:/Users/Chami/Downloads/Malika/Photos/extracted_mahogany/word/media/image25.jpg', 'plate12')
find_hand_region('C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570716241.jpg', 'trad_art_mandala')
find_hand_region('C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570136241.jpg', 'lotus_24inch')
