# Build stage
FROM node:20.19-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20.19-alpine AS runner

WORKDIR /app

# Copy built output from builder
COPY --from=builder /app/.output ./.output

# Expose port
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

# Start the server
CMD ["node", ".output/server/index.mjs"]
