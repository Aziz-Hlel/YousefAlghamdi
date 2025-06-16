############################################
# Build frontend static assets
############################################
FROM node:22.14.0-alpine AS builder

WORKDIR /app

# Define build arguments for Vite env variables
ARG VITE_API_URL
ARG VITE_API_NODE_ENV

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .


# Build the frontend
RUN npm run build

##################################################
# Export only the build artifacts
##################################################
FROM caddy:2.10.0-alpine@sha256:e2e3a089760c453bc51c4e718342bd7032d6714f15b437db7121bfc2de2654a6

# WORKDIR /app
COPY --from=builder /app/dist /srv

EXPOSE 8443

