FROM node:20-alpine

WORKDIR /app

# Copy package descriptors
COPY package*.json ./
COPY scripts ./scripts/

# Install production dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Expose HTTP port
EXPOSE 5000

# Environment defaults
ENV NODE_ENV=production
ENV PORT=5000

# Start server
CMD ["node", "src/server.js"]
