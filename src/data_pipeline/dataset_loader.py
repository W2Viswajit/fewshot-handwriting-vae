from torchvision import datasets, transforms
from torch.utils.data import DataLoader

def get_loaders(data_root='data/processed/hindi', batch_size=64):
    transform = transforms.Compose([
        transforms.Grayscale(num_output_channels=1),   # ensure 1 channel
        transforms.Resize((64, 64)),                   # ensure consistent input size
        transforms.ToTensor(),                         # convert to [0,1] tensor
    ])

    train_dataset = datasets.ImageFolder(root=data_root, transform=transform)
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

    return train_loader