#!/bin/bash
set -e

# Step 1: Deploy with initial configuration
echo "Deploying initial configuration..."
cp nginx.initial.conf nginx.conf
docker compose -f compose.yaml -f compose.prod.yaml up -d proxy

# Step 2: Run Certbot to obtain certificates
echo "Running Certbot to obtain certificates..."
docker compose -f compose.yaml -f compose.prod.yaml up certbot

# Step 3: Deploy full SSL configuration
echo "Deploying full SSL configuration..."
cp nginx.ssl.conf nginx.conf
docker compose -f compose.yaml -f compose.prod.yaml restart proxy

# Step 4: Start all services
echo "Starting all services..."
docker compose -f compose.yaml -f compose.prod.yaml up -d

echo "Deployment complete!"