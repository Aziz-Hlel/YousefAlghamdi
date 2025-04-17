#!/bin/bash

#   🧠 What this script now does:
#   Updates the system with apt update and installs any available updates.
#   
#   Installs useful base packages (e.g., git, curl, htop, etc.).
#   
#   Sets the timezone to UTC (you can adjust it if needed).
#   
#   Installs Docker:
#   
#   Adds Docker’s official GPG key.
#   
#   Sets up Docker’s repository.
#   
#   Installs Docker Engine and Docker CLI.
#   
#   Starts Docker and enables it to start on boot.
#   
#   Installs Docker Compose by downloading the plugin.
#   
#   Reboots the machine with a prompt, allowing the user to confirm.

############################################################################

set -e  # Exit on error

# ------------------------------------
# Update package lists and upgrade everything
# ------------------------------------
echo "🔧 Updating package lists and upgrading system..."
sudo apt update && sudo apt upgrade -y

# ------------------------------------
# Install useful base packages
# ------------------------------------
echo "📦 Installing useful base packages..."
sudo apt install -y git curl wget unzip htop build-essential ca-certificates curl gnupg lsb-release

# ------------------------------------
# Set timezone to UTC (change if needed)
# ------------------------------------
echo "⏰ Setting timezone to UTC..."
sudo timedatectl set-timezone UTC

# ------------------------------------
# Docker installation
# ------------------------------------
echo "🐳 Installing Docker..."

# Add Docker’s official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin

# Enable and start Docker
sudo systemctl enable docker
sudo systemctl start docker

# Add current user to docker group
sudo usermod -aG docker $USER

# ------------------------------------
# Docker Compose installation
# ------------------------------------
echo "🔧 Installing Docker Compose plugin..."

mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.27.1/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose

# ------------------------------------
# Reboot prompt
# ------------------------------------
echo "⚠️ The machine will now reboot to apply changes."
read -n 1 -s -r -p $'\nPress any key to confirm and reboot the machine...\n'
sudo reboot
