#!/bin/bash
set -euo pipefail

# --- Configuration ---
RETENTION_DAYS=7
BACKUP_DIR="./backups"
DB_HOST="mongo"
AUTH_DB="admin"


DB_USER="${DB_USER}"
DB_PASS="${DB_PASS}"
DB_NAME="${DB_NAME:-mydb}"

# --- Validation ---
: "${DB_HOST:?ERROR: Missing DB_HOST}"
: "${DB_USER:?ERROR: Missing DB_USER}"
: "${DB_PASS:?ERROR: Missing DB_PASS}"
: "${DB_NAME:?ERROR: Missing DB_NAME}"
: "${AUTH_DB:?ERROR: Missing AUTH_DB}"

# --- Setup ---
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_PATH="$BACKUP_DIR/backup_${TIMESTAMP}"
mkdir -p "$BACKUP_DIR"

log_with_timestamp() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_with_timestamp "🚀 Starting MongoDB backup for: $DB_NAME"

# --- Create backup ---
if mongodump \
    --host "$DB_HOST" \
    --username "$DB_USER" \
    --password "$DB_PASS" \
    --authenticationDatabase "$AUTH_DB" \
    --db "$DB_NAME" \
    --gzip \
    --archive="$BACKUP_PATH.archive.gz" \
    --quiet; then

    if [ -s "$BACKUP_PATH.archive.gz" ]; then
        SIZE=$(du -h "$BACKUP_PATH.archive.gz" | cut -f1)
        log_with_timestamp "✅ Backup completed: $BACKUP_PATH.archive.gz"
        log_with_timestamp "📦 Backup size: $SIZE"

        # Quick validation: ensure archive structure is readable
        if mongorestore --dryRun --archive="$BACKUP_PATH.archive.gz" --gzip --quiet > /dev/null 2>&1; then
            log_with_timestamp "✅ Backup integrity verified"
        else
            log_with_timestamp "⚠️  WARNING: Backup archive validation failed!"
            exit 1
        fi
    else
        log_with_timestamp "❌ ERROR: Backup file is empty!"
        exit 1
    fi
else
    log_with_timestamp "❌ ERROR: mongodump failed!"
    exit 1
fi

# --- Cleanup old backups ---
log_with_timestamp "🧹 Cleaning up backups older than $RETENTION_DAYS days..."
DELETED_COUNT=$(find "$BACKUP_DIR" -name "backup_*.archive.gz" -type f -mtime +$RETENTION_DAYS -print -delete 2>/dev/null | wc -l)

if [ "$DELETED_COUNT" -gt 0 ]; then
    log_with_timestamp "🗑️  Deleted $DELETED_COUNT old backup(s)"
else
    log_with_timestamp "ℹ️  No old backups to delete"
fi

# --- Summary ---
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "backup_*.archive.gz" -type f 2>/dev/null | wc -l)
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)
log_with_timestamp "📊 Total backups: $BACKUP_COUNT (Total size: $TOTAL_SIZE)"

log_with_timestamp "✨ MongoDB backup process completed successfully!"
