#!/bin/bash

# This script performs daily backups of a MongoDB database running in a Docker container.
# It stores backups locally in a 'mongo_backups' folder (in the same directory as this script)
# and cleans up backups older than a specified number of days.

# --- Configuration ---
# Name of the MongoDB Docker container (as defined in your compose.yaml)
CONTAINER_NAME="mongo"

# Folder name for backups (will be created in the same directory as this script)
BACKUP_DIR_NAME="mongo_backups"

# Number of days to keep backups
RETENTION_DAYS=7
# --- End of Configuration ---


# --- Get Script's Directory and Define Paths ---
# This ensures paths are correct, regardless of where the script is called from.
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
HOST_BACKUP_PATH="${SCRIPT_DIR}/${BACKUP_DIR_NAME}"
ENV_FILE="${SCRIPT_DIR}/.env" # Assumes .env is in the same directory as the script

# --- Load Environment Variables from .env file ---
# The script needs database credentials and name from your .env file.
if [ -f "$ENV_FILE" ]; then
  echo "INFO: Loading environment variables from $ENV_FILE"

  # Read specific variables needed for the backup.
  # This expects VAR=value format in .env, and handles cases where values might be quoted.
  PROD___MONGO_INITDB_DATABASE=$(grep -E "^PROD___MONGO_INITDB_DATABASE=" "$ENV_FILE" | cut -d '=' -f2-)
  PROD___MONGO_INITDB_ROOT_USERNAME=$(grep -E "^PROD___MONGO_INITDB_ROOT_USERNAME=" "$ENV_FILE" | cut -d '=' -f2-)
  PROD___MONGO_INITDB_ROOT_PASSWORD=$(grep -E "^PROD___MONGO_INITDB_ROOT_PASSWORD=" "$ENV_FILE" | cut -d '=' -f2-)

  # Remove potential surrounding quotes (single or double) from the extracted values
  PROD___MONGO_INITDB_DATABASE=$(echo "${PROD___MONGO_INITDB_DATABASE}" | sed -e "s/^'//" -e "s/'$//" -e 's/^"//' -e 's/"$//' -e 's/\r$//')
  PROD___MONGO_INITDB_ROOT_USERNAME=$(echo "${PROD___MONGO_INITDB_ROOT_USERNAME}" | sed -e "s/^'//" -e "s/'$//" -e 's/^"//' -e 's/"$//' -e 's/\r$//')
  PROD___MONGO_INITDB_ROOT_PASSWORD=$(echo "${PROD___MONGO_INITDB_ROOT_PASSWORD}" | sed -e "s/^'//" -e "s/'$//" -e 's/^"//' -e 's/"$//' -e 's/\r$//')

else
  echo "ERROR: .env file not found at ${ENV_FILE}."
  echo "This script requires your .env file to be in the same directory: ${SCRIPT_DIR}"
  echo "Please ensure it exists and contains PROD___MONGO_INITDB_DATABASE, PROD___MONGO_INITDB_ROOT_USERNAME, and PROD___MONGO_INITDB_ROOT_PASSWORD."
  exit 1
fi

# Validate that variables were loaded from .env
if [ -z "${PROD___MONGO_INITDB_DATABASE}" ] || \
   [ -z "${PROD___MONGO_INITDB_ROOT_USERNAME}" ] || \
   [ -z "${PROD___MONGO_INITDB_ROOT_PASSWORD}" ]; then
  echo "ERROR: One or more required variables (PROD___MONGO_INITDB_DATABASE, PROD___MONGO_INITDB_ROOT_USERNAME, PROD___MONGO_INITDB_ROOT_PASSWORD) could not be read from ${ENV_FILE}."
  echo "Please check your .env file content and ensure these variables are correctly defined."
  exit 1
fi

# Assign to more readable variable names for use in the script
DB_NAME="${PROD___MONGO_INITDB_DATABASE}"
MONGO_USER="${PROD___MONGO_INITDB_ROOT_USERNAME}"
MONGO_PASS="${PROD___MONGO_INITDB_ROOT_PASSWORD}"

# --- Script Logic ---
echo "INFO: Starting MongoDB backup process..."
echo "INFO: Script directory: ${SCRIPT_DIR}"
echo "INFO: Backup storage path on host: ${HOST_BACKUP_PATH}"
echo "INFO: Database to backup: ${DB_NAME}"

# Create backup directory on the host if it doesn't exist
mkdir -p "${HOST_BACKUP_PATH}"
if [ $? -ne 0 ]; then
    echo "ERROR: Could not create backup directory ${HOST_BACKUP_PATH}. Check permissions."
    exit 1
fi

# Get current date and time for the backup file name (e.g., backup_mydatabase_20250602_170000.gz)
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE_NAME="backup_${DB_NAME}_${TIMESTAMP}.gz"

# This is the path *inside* the container, where the mounted volume ./mongo_backups (from host) is available as /backup
BACKUP_TARGET_IN_CONTAINER="/backup/${BACKUP_FILE_NAME}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "ERROR: Docker does not seem to be running. Please start Docker and try again."
  exit 1
fi

# Check if the MongoDB container is running
if ! docker ps --filter "name=^/${CONTAINER_NAME}$" --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
  echo "ERROR: MongoDB container '${CONTAINER_NAME}' is not running."
  echo "Please ensure your Docker services are started (e.g., using 'docker-compose up -d') and try again."
  exit 1
fi

echo "INFO: Creating backup of database '${DB_NAME}'..."
echo "INFO: Backup will be saved inside the container at '${BACKUP_TARGET_IN_CONTAINER}'"
echo "INFO: This maps to the host file: ${HOST_BACKUP_PATH}/${BACKUP_FILE_NAME}"

# Execute mongodump inside the container.
# It uses the credentials and database name loaded from your .env file.
# The backup is compressed (--gzip) and created as an archive (--archive).
# The output is written to the /backup directory inside the container, which is mounted from your host.
docker exec "${CONTAINER_NAME}" mongodump \
  --username "${MONGO_USER}" \
  --password "${MONGO_PASS}" \
  --authenticationDatabase admin \
  --db "${DB_NAME}" \
  --archive="${BACKUP_TARGET_IN_CONTAINER}" \
  --gzip

# Check if mongodump was successful
if [ $? -eq 0 ]; then
  echo "SUCCESS: MongoDB backup successful!"
  echo "SUCCESS: Backup saved to ${HOST_BACKUP_PATH}/${BACKUP_FILE_NAME}"
else
  echo "ERROR: MongoDB backup (mongodump command) failed."
  # You might want to remove a potentially partial/empty backup file if mongodump failed.
  # For example:
  # if [ -f "${HOST_BACKUP_PATH}/${BACKUP_FILE_NAME}" ]; then
  #   rm "${HOST_BACKUP_PATH}/${BACKUP_FILE_NAME}"
  #   echo "INFO: Removed potentially incomplete backup file due to error."
  # fi
  exit 1
fi

echo "INFO: Cleaning up old backups (older than ${RETENTION_DAYS} days) from ${HOST_BACKUP_PATH}..."
# Find and delete backup files older than RETENTION_DAYS.
# -name "backup_*.gz" ensures we only touch files matching our backup naming pattern.
# -type f ensures we only target files, not directories.
# -mtime +"${RETENTION_DAYS}" finds files modified more than RETENTION_DAYS ago (e.g., +7 means older than 7 days).
# -print will list the files being deleted (useful for logs).
# -delete actually deletes the files.
find "${HOST_BACKUP_PATH}" -name "backup_*.gz" -type f -mtime "+${RETENTION_DAYS}" -print -delete
if [ $? -ne 0 ]; then
    echo "WARNING: Cleanup of old backups may have encountered an issue. This could be due to permissions or other find command errors."
fi

echo "INFO: Backup and cleanup process finished."