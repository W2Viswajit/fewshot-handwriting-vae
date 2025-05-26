import os
import sys
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision.utils import save_image

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.append(ROOT_DIR)

from src.models.vae import VAE
from src.models.style_encoder import StyleEncoder  # <- NEW IMPORT
from src.data_pipeline.dataset_loader import get_loaders

# Setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
epochs = 20
batch_size = 64
latent_dim = 32
style_dim = 32
lr = 1e-3
save_dir = "outputs"

os.makedirs(save_dir, exist_ok=True)

# Load data
train_loader = get_loaders(batch_size=batch_size)

# Initialize models
vae = VAE(latent_dim=latent_dim, style_dim=style_dim).to(device)
style_encoder = StyleEncoder(style_dim=style_dim).to(device)

# Optimizer (combine parameters of both models)
optimizer = optim.Adam(list(vae.parameters()) + list(style_encoder.parameters()), lr=lr)

# Loss Function
def loss_function(recon_x, x, mu, logvar, beta=1.0):
    recon_loss = nn.functional.mse_loss(recon_x, x, reduction='mean')
    kl_div = -0.5 * torch.mean(1 + logvar - mu.pow(2) - logvar.exp())
    return recon_loss + beta * kl_div

# Training Loop
for epoch in range(1, epochs + 1):
    vae.train()
    style_encoder.train()
    train_loss = 0

    for batch_idx, (data, _) in enumerate(train_loader):
        data = data.to(device)
        optimizer.zero_grad()

        style_vec = style_encoder(data)  # [B, style_dim]
        recon_batch, mu, logvar = vae(data, style_vec)

        loss = loss_function(recon_batch, data, mu, logvar)
        loss.backward()
        train_loss += loss.item()
        optimizer.step()

        if batch_idx % 100 == 0:
            print(f"Epoch [{epoch}/{epochs}] Batch [{batch_idx}] Loss: {loss.item() / len(data):.4f}")

    print(f"====> Epoch {epoch} Average loss: {train_loss / len(train_loader.dataset):.4f}")

    # Save reconstruction example
    vae.eval()
    style_encoder.eval()
    with torch.no_grad():
        sample = next(iter(train_loader))[0][:8].to(device)
        style_vec = style_encoder(sample)
        recon, _, _ = vae(sample, style_vec)
        save_image(sample.cpu(), os.path.join(save_dir, f'original_{epoch}.png'))
        save_image(recon.cpu(), os.path.join(save_dir, f'recon_{epoch}.png'))

    # Save models
    torch.save(vae.state_dict(), os.path.join(save_dir, f'vae_epoch{epoch}.pth'))
    torch.save(style_encoder.state_dict(), os.path.join(save_dir, f'style_encoder_epoch{epoch}.pth'))
