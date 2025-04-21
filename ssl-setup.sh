#!/bin/bash
set -e

# Create necessary directories
mkdir -p certbot/conf certbot/www

# Step 1: Copy initial configuration
echo "Setting up initial Nginx configuration..."
cp nginx.initial.conf nginx.conf

# Step 2: Start Nginx with initial configuration
echo "Starting Nginx with initial configuration..."
docker compose -f compose.yaml -f compose.prod.yaml up -d proxy

# Step 3: Wait for Nginx to start
echo "Waiting for Nginx to start..."
sleep 10

# Step 4: Test if Nginx is up
echo "Testing Nginx..."
curl -I http://localhost || echo "Nginx may not be running correctly. Continuing anyway..."

# Step 5: Obtain SSL certificate
echo "Attempting to obtain SSL certificate..."
docker compose -f compose.yaml -f compose.prod.yaml run --rm certbot certonly --webroot -w /var/www/certbot --email tigana137@gmail.com -d ygp.ae --agree-tos --non-interactive --force-renewal
# Step 6: Check if certificates were obtained
if [ -f "certbot/conf/live/ygp.ae/fullchain.pem" ]; then
    echo "SSL certificates obtained successfully!"
    
    # Step 7: Switch to SSL configuration
    echo "Switching to SSL configuration..."
    cp nginx.ssl.conf nginx.conf
    
    # Step 8: Restart Nginx to apply SSL configuration
    echo "Restarting Nginx with SSL configuration..."
    docker compose -f compose.yaml -f compose.prod.yaml restart proxy
    
    # Step 9: Start all services
    echo "Starting all services..."
    docker compose -f compose.yaml -f compose.prod.yaml up -d
    
    echo "Deployment complete with SSL!"
else
    echo "Failed to obtain SSL certificates. Continuing with HTTP only..."
    
    # Step 10: Start all services without SSL
    echo "Starting all services without SSL..."
    docker compose -f compose.yaml -f compose.prod.yaml up -d
    
    echo "Deployment complete without SSL. You can try again later."
fi