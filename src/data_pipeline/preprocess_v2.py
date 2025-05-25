import os
from PIL import Image, ImageOps
import numpy as np

folder = 'data/processed/hindi'
target_size = (64, 64)

print("Scanning:", os.path.abspath(folder))

def fix_image(path):
    try:
        print(f"Processing: {path}")
        img = Image.open(path).convert('L')  # Convert to grayscale

        # Invert if background is lighter
        if np.array(img).mean() > 128:
            img = ImageOps.invert(img)

        img = img.resize(target_size, Image.Resampling.LANCZOS)
        img.save(path)
        print(f"Fixed: {os.path.basename(path)}")
    except Exception as e:
        print(f"Error processing {path}: {e}")

# Walk through subfolders and process all images
count = 0
for root, dirs, files in os.walk(folder):
    for fname in files:
        if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.tif', '.tiff')):
            count += 1
            fix_image(os.path.join(root, fname))

print(f"Total images processed: {count}")
