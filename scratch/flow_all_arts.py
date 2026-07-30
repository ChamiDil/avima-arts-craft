import zipfile
import xml.etree.ElementTree as ET

docx_path = 'c:/Users/Chami/Downloads/Malika/Photos/All arts item and projects.docx'
z = zipfile.ZipFile(docx_path)

# Map relations
rels_root = ET.fromstring(z.read('word/_rels/document.xml.rels'))
rel_map = {el.attrib['Id']: el.attrib['Target'] for el in rels_root if 'Id' in el.attrib and 'Target' in el.attrib}

# Parse document flow
root = ET.fromstring(z.read('word/document.xml'))
out = []

def walk(el):
    # Check for text
    if el.tag.endswith('t') and el.text:
        out.append(f"TEXT: {el.text}")
    # Check for image blip
    elif el.tag.endswith('blip') and '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed' in el.attrib:
        embed_id = el.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed']
        out.append(f"IMAGE: {rel_map[embed_id]}")
    for child in el:
        walk(child)

walk(root)

with open('c:/Users/Chami/Downloads/Malika/Photos/all_arts_flow.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))

print("All arts flow saved successfully to all_arts_flow.txt")
