from PIL import Image

originals = {
    'plate11': 'c:/Users/Chami/Downloads/Malika/Photos/extracted_mahogany/word/media/image24.jpg',
    'plate12': 'c:/Users/Chami/Downloads/Malika/Photos/extracted_mahogany/word/media/image25.jpg',
    'trad_art_mandala': 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570716241.jpg',
    'lotus_24inch': 'C:/Users/Chami/.gemini/antigravity/brain/fc73a3f8-f23c-43b9-bbe5-2bc9e6bee1c5/media__1784570136241.jpg'
}

for name, path in originals.items():
    with Image.open(path) as img:
        print(f"{name}: size={img.size}, mode={img.mode}")
