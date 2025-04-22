#!/bin/bash

set -euo pipefail

echo "⚠️  This script will remove all Docker containers, images, volumes, networks, and builder cache."
read -p "Are you sure you want to continue? [y/N]: " confirm

if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

echo "🚨 Stopping all running containers..."
docker stop $(docker ps -q) 2>/dev/null || true

echo "🧹 Removing all containers..."
docker rm $(docker ps -a -q) 2>/dev/null || true

echo "🖼️ Removing all images..."
docker rmi -f $(docker images -q) 2>/dev/null || true

echo "📦 Removing all volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null || true

echo "🌐 Removing all custom networks..."
docker network prune -f

echo "🛠️ Removing all builder cache..."
docker builder prune -a -f

echo "✅ Docker reset complete. You now have a clean slate."
