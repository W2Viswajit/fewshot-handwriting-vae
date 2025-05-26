import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
import torch
import torchvision.transforms as transforms
from torchvision.utils import save_image
from src.models.vae import VAE
from src.models.style_encoder import StyleEncoder
from src.data_pipeline.dataset_loader import get_loaders

# Load setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
latent_dim = 32
style_dim = 32
save_dir = "style_variations"
os.makedirs(save_dir, exist_ok=True)

# Load models
vae = VAE(latent_dim=latent_dim, style_dim=style_dim).to(device)
style_encoder = StyleEncoder(style_dim=style_dim).to(device)

vae.load_state_dict(torch.load("outputs/vae_epoch1.pth"))  # Adjust epoch
style_encoder.load_state_dict(torch.load("outputs/style_encoder_epoch1.pth"))

vae.eval()
style_encoder.eval()

# Load data
loader = get_loaders(batch_size=64)
data_iter = iter(loader)
content_batch, _ = next(data_iter)
style_batch, _ = next(data_iter)

# Use the same content image with different style vectors
content_img = content_batch[0].unsqueeze(0).to(device)  # shape: [1, 1, H, W]
style_imgs = style_batch[:8].to(device)                 # shape: [8, 1, H, W]

with torch.no_grad():
    content_mu, content_logvar = vae.encode(content_img)
    content_z = vae.reparameterize(content_mu, content_logvar)

    # Style vectors for 8 different styles
    style_vecs = style_encoder(style_imgs)

    # Repeat z to match style count
    content_z = content_z.expand(style_vecs.size(0), -1)

    # Decode with each style
    reconstructions = vae.decode(content_z, style_vecs)

    # Save output grid
    save_image(reconstructions.cpu(), os.path.join(save_dir, "styled_outputs.png"), nrow=4)
    save_image(style_imgs.cpu(), os.path.join(save_dir, "style_inputs.png"), nrow=4)
    save_image(content_img.cpu(), os.path.join(save_dir, "content_input.png"))
