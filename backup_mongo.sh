#!/bin/bash

# cuz fuck chat , claude and gemini
# you put this besides your folder not inside of it ( /home/ubuntu/ not /home/ubuntu/ygp) 
TIMESTAMP=$(date +%Y%m%d%H%M%S)

docker exec mongo mongodump \
  --username admin \
  --password ilovemihyar \
  --authenticationDatabase admin \
  --db mydb \
  --out="/backup/backup_${TIMESTAMP}" \
  --gzip



docker exec mongo find /mongo_backups \
  -maxdepth 1 \
  -type d \
  -name "backup_*" \
  -mtime +7 \
  -exec rm -rf {} \;