import os
import sys
import torch
import torchvision.transforms as transforms
from torchvision.utils import save_image
from PIL import Image, ImageDraw, ImageFont

# --- Setup paths ---
sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from src.models.vae import VAE
from src.models.style_encoder import StyleEncoder

# ----- Configuration -----
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
latent_dim = 32
style_dim = 32
vae_path = "outputs/vae_epoch4.pth"
style_encoder_path = "outputs/style_encoder_epoch4.pth"

style_image_paths = [
    "samples/user_char1.jpg",
    "samples/user_char2.jpg",
    "samples/user_char3.jpg",
    "samples/user_char4.jpg",
    "samples/user_char5.jpg"
]

unicode_targets = ["क्ष", "ज्ञ", "त्र", "श्र", "कि"]  # Add more if needed
font_path = "fonts/NotoSansDevanagari.ttf"  # <-- Use Devanagari-supporting font

save_dir = "outputs/custom_stylized"
os.makedirs(save_dir, exist_ok=True)

# ----- Load Models -----
vae = VAE(latent_dim=latent_dim, style_dim=style_dim).to(device)
vae.load_state_dict(torch.load(vae_path))
vae.eval()

style_encoder = StyleEncoder(style_dim=style_dim).to(device)
style_encoder.load_state_dict(torch.load(style_encoder_path))
style_encoder.eval()

# ----- Transforms -----
transform = transforms.Compose([
    transforms.Grayscale(),
    transforms.Resize((64, 64)),
    transforms.ToTensor()
])

# ----- Load Style Images and Encode Style Vector -----
style_tensors = []
for path in style_image_paths:
    try:
        img = Image.open(path).convert("RGB")
        img_tensor = transform(img).unsqueeze(0).to(device)
        style_vec = style_encoder(img_tensor)
        style_tensors.append(style_vec)
    except Exception as e:
        print(f"Error loading {path}: {e}")

style_vector = torch.mean(torch.stack(style_tensors), dim=0)  # [1, style_dim]

# ----- Function: Render Unicode Character -----
def render_unicode_char(char, font_path, img_size=(64, 64)):
    font = ImageFont.truetype(font_path, size=48)
    img = Image.new("L", img_size, color=255)
    draw = ImageDraw.Draw(img)
    
    # Use textbbox instead of textsize
    bbox = draw.textbbox((0, 0), char, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    
    draw.text(((img_size[0] - w) / 2, (img_size[1] - h) / 2), char, fill=0, font=font)
    return img


# ----- Generate Stylized Outputs -----
for char in unicode_targets:
    # 1. Render the Unicode character
    img = render_unicode_char(char, font_path)
    img_tensor = transform(img).unsqueeze(0).to(device)

    # 2. Encode content using VAE encoder
    mu, logvar = vae.encode(img_tensor)
    z = vae.reparameterize(mu, logvar)

    # 3. Decode with style
    output = vae.decode(z, style_vector)

    # 4. Save
    save_path = os.path.join(save_dir, f"{char}_styled.png")
    save_image(output, save_path)
    print(f"Saved styled version of '{char}' to {save_path}")

print("All stylized Unicode characters saved.")
