#!/bin/bash

# MongoDB Docker Backup Script
# This script backs up your containerized MongoDB daily

# Configuration
CONTAINER_NAME="mongo"
BACKUP_DIR="/home/ubuntu/mongodb-backups"
DB_NAME="${PROD___MONGO_INITDB_DATABASE}"  # Uses your env variable
USERNAME="${PROD___MONGO_INITDB_ROOT_USERNAME}"
PASSWORD="${PROD___MONGO_INITDB_ROOT_PASSWORD}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RETENTION_DAYS=7

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Perform backup using docker exec
echo "Starting MongoDB backup..."
docker exec $CONTAINER_NAME mongodump \
  --username=$USERNAME \
  --password=$PASSWORD \
  --authenticationDatabase=admin \
  --db=$DB_NAME \
  --gzip \
  --archive=/tmp/backup_$TIMESTAMP.gz

# Copy backup from container to host
docker cp $CONTAINER_NAME:/tmp/backup_$TIMESTAMP.gz $BACKUP_DIR/

# Remove backup file from container
docker exec $CONTAINER_NAME rm /tmp/backup_$TIMESTAMP.gz

# Delete backups older than 7 days
find $BACKUP_DIR -name "backup_*.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: $BACKUP_DIR/backup_$TIMESTAMP.gz"
echo "Backup size: $(du -h $BACKUP_DIR/backup_$TIMESTAMP.gz | cut -f1)"