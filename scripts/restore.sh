#!/bin/bash
set -euo pipefail

# --- Configuration ---
DB_HOST="mongo"
BACKUP_DIR="./backups"
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


# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# --- Helper functions ---
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1" >&2; }

AUTO_YES=false

# --- Parse arguments ---
while [[ $# -gt 0 ]]; do
  case "$1" in
    -y|--yes)
      AUTO_YES=true
      shift
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done



# --- Locate latest backup ---
if [ ! -d "$BACKUP_DIR" ]; then
    log_error "Backup directory not found: $BACKUP_DIR"
    exit 1
fi

BACKUP_FILE=$(ls -t "$BACKUP_DIR"/backup_*.archive.gz 2>/dev/null | head -n1 || true)
if [ -z "$BACKUP_FILE" ]; then
    log_error "No backup files found in $BACKUP_DIR"
    exit 1
fi

BACKUP_FILENAME=$(basename "$BACKUP_FILE")
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
BACKUP_DATE=$(date -r "$BACKUP_FILE" "+%Y-%m-%d %H:%M:%S" 2>/dev/null || stat "$BACKUP_FILE" | grep Modify | cut -d' ' -f2,3)

# --- Confirmation ---
log_warn "⚠️  This will ERASE all data in MongoDB database '${DB_NAME}'!"
echo ""
echo "  Database: $DB_NAME"
echo "  Backup:   $BACKUP_FILENAME"
echo "  Size:     $BACKUP_SIZE"
echo "  Created:  $BACKUP_DATE"
echo ""

if [ "$AUTO_YES" = false ]; then
    read -r -p "Type 'yes' to continue: " confirm
    if [ "$confirm" != "yes" ]; then
        log_info "Restore cancelled by user"
        exit 0
    fi
else
    log_info "Auto-confirm mode enabled (-y). Proceeding without prompt."
fi

# --- Verify backup file integrity ---
log_info "Verifying backup archive integrity..."
if ! gunzip -t "$BACKUP_FILE" >/dev/null 2>&1; then
    log_error "Backup file appears to be corrupted!"
    exit 1
fi

# --- Drop target database before restore ---
log_info "Dropping existing database '$DB_NAME'..."
mongo --host "$DB_HOST" \
      -u "$DB_USER" \
      -p "$DB_PASS" \
      --authenticationDatabase admin \
      --quiet \
      --eval "db.getSiblingDB('$DB_NAME').dropDatabase()" || log_warn "Failed to drop database (may not exist)."

# --- Restore backup ---
log_info "Restoring database from: $BACKUP_FILENAME"
if mongorestore \
    --host "$DB_HOST" \
    --username "$DB_USER" \
    --password "$DB_PASS" \
    --authenticationDatabase admin \
    --archive="$BACKUP_FILE" \
    --gzip \
    --drop \
    --quiet; then
    log_info "✅ Database restored successfully!"
else
    log_error "Restore failed!"
    exit 1
fi

# --- Verification ---
log_info "Verifying restore by counting collections..."
COLLECTION_COUNT=$(mongo --host "$DB_HOST" \
    -u "$DB_USER" \
    -p "$DB_PASS" \
    --authenticationDatabase admin \
    --quiet \
    --eval "db.getSiblingDB('$DB_NAME').getCollectionNames().length" 2>/dev/null || echo "unknown")

log_info "📊 Collections restored: $COLLECTION_COUNT"
echo ""
echo -e "${GREEN}🎉 Restore completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "  1. Verify data manually: mongo --host $DB_HOST -u $DB_USER -p $DB_PASS --authenticationDatabase admin"
echo "  2. Check collections: use $DB_NAME; show collections;"
echo "  3. Test your application connectivity"
