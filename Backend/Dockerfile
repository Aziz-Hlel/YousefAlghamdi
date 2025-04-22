
########################
# STAGE 1: Build       #
########################
FROM node:22.14.0-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

########################
# STAGE 2: Runtime     #
########################

FROM node:22.14.0-alpine

WORKDIR /app

# Only copy production dependencies and built files
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

# Set environment to production
ENV NODE_ENV=production

# Run the compiled code
CMD ["node", "dist/index.js"]



