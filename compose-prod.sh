#!/bin/bash

# Load production environment variables into the current shell
# set -o allexport
# source .env.production
# set +o allexport

# Start services with base and prod override files
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
