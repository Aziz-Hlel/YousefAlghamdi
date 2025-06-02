#!/bin/bash

# Simple MongoDB backup script
# Put this file next to your compose.yaml file

# Load your .env file
source .env

# Create backup folder
mkdir -p mongo_backups

# Create backup with today's date
DATE=$(date +%Y%m%d)
BACKUP_NAME="backup_${DATE}"

# Do the backup
docker exec mongo mongodump \
  --username="$PROD___MONGO_INITDB_ROOT_USERNAME" \
  --password="$PROD___MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase=admin \
  --db="$PROD___MONGO_INITDB_DATABASE" \
  --out="/tmp/$BACKUP_NAME"

# Copy backup from container to your computer
docker cp mongo:/tmp/$BACKUP_NAME ./mongo_backups/

# Delete backups older than 7 days
find ./mongo_backups -type f -mtime +7 -delete

# Clean up container
docker exec mongo rm -rf "/tmp/$BACKUP_NAME"

echo "Backup done: mongo_backups/$BACKUP_NAME"