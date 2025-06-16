# Get a certificate (this is what was missing)
docker compose -f compose.yaml -f compose.prod.yaml run --rm certbot certonly --webroot -w /var/www/certbot --email tigana137@gmail.com -d ygp.ae --agree-tos --non-interactive --force-renewal

# Check if the certificate was obtained
ls -la certbot/conf/live/ygp.ae/

# If certificates exist, switch to SSL configuration
cp nginx.ssl.conf nginx.conf

# Restart Nginx to apply SSL configuration
docker compose -f compose.yaml -f compose.prod.yaml restart proxy

# Start all services
docker compose -f compose.yaml -f compose.prod.yaml up -d