FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (use npm install if package-lock.json missing)
RUN if [ -f package-lock.json ]; then npm ci --only=production; else npm install --only=production; fi

# Copy source code
COPY src ./src

# Expose port (Railway sets PORT automatically)
EXPOSE 8080

# Start application (using JavaScript directly, no TypeScript build needed)
CMD ["node", "src/server.js"]
