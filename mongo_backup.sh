#!/bin/bash

# === Resolve the directory where this script lives ===
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="$SCRIPT_DIR/mongo_backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
DB_NAME="${PROD___MONGO_INITDB_DATABASE}"  # Uses your env variable
USERNAME="${PROD___MONGO_INITDB_ROOT_USERNAME}"
PASSWORD="${PROD___MONGO_INITDB_ROOT_PASSWORD}"

DAYS_TO_KEEP=7
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.archive.gz"

# === Create backup directory if it doesn't exist ===
mkdir -p "$BACKUP_DIR"

# === Run compressed backup from Docker ===
docker exec "$CONTAINER_NAME" sh -c \
  "mongodump \
    --username='$USERNAME' \
    --password='$PASSWORD' \
    --authenticationDatabase='admin' \
    --db='$DB_NAME' \
    --archive --gzip" > "$BACKUP_FILE"

# === Cleanup old backups (older than 7 days) ===
find "$BACKUP_DIR" -type f -name "*.gz" -mtime +$DAYS_TO_KEEP -exec rm {} \;
