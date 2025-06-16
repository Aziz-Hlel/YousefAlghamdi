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
ENV NODE_ENV=production


# Build TypeScript to JavaScript
RUN npm run build


########################
# STAGE 2: Runtime     #
########################
FROM node:22.14.0-alpine

WORKDIR /app

# Only copy production dependencies and built files
COPY --from=builder /app/package*.json ./
RUN npm ci 
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

# !!! just for now copy the public folder to serve static images
COPY --from=builder /app/public ./public 


# Run the compiled code
CMD ["node", "dist/index.js"]



