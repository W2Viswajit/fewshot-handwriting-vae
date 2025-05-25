import os
from PIL import Image, ImageOps
import numpy as np

# Input and output folders
input_folder = 'data/raw/hindi'
output_folder = 'data/processed/hindi'
target_size = (64, 64)

# Ensure output folder exists
os.makedirs(output_folder, exist_ok=True)

def preprocess_image(image_path):
    # Open image and convert to grayscale
    img = Image.open(image_path).convert('L')

    # Invert if background is dark and foreground is light
    # Heuristic: if mean pixel is < 128, it's likely inverted
    if np.array(img).mean() < 128:
        img = ImageOps.invert(img)

    # Resize with antialiasing to keep quality
    img = img.resize(target_size, Image.Resampling.LANCZOS)

    return img

# Process all images
for filename in os.listdir(input_folder):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tif', '.tiff')):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        try:
            processed_img = preprocess_image(input_path)
            processed_img.save(output_path)
            print(f"Processed and saved: {filename}")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")
