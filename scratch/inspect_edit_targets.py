from PIL import Image

images = {
    'cultural_dancers': 'c:/Users/Chami/Downloads/Malika/assets/line_art/cultural_dancers.jpg',
    'perahera_procession': 'c:/Users/Chami/Downloads/Malika/assets/line_art/perahera_procession.jpg',
    'lotus_24inch': 'c:/Users/Chami/Downloads/Malika/assets/plates/lotus_mandala_24inch.jpg',
    'traditional_art_mandala': 'c:/Users/Chami/Downloads/Malika/assets/plates/traditional_art_mandala.jpg',
    'plate11': 'c:/Users/Chami/Downloads/Malika/assets/plates/plate11.jpg',
    'plate12': 'c:/Users/Chami/Downloads/Malika/assets/plates/plate12.jpg'
}

for name, path in images.items():
    with Image.open(path) as img:
        print(f"{name}: size={img.size}, mode={img.mode}")
