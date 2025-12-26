FROM node:20.19-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG SUPABASE_URL
ARG SUPABASE_KEY
ARG CHIP_BRAND_ID
ARG CHIP_API_KEY
ARG CHIP_SANDBOX

# Set environment variables for build
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_KEY=$SUPABASE_KEY
ENV CHIP_BRAND_ID=$CHIP_BRAND_ID
ENV CHIP_API_KEY=$CHIP_API_KEY
ENV CHIP_SANDBOX=$CHIP_SANDBOX

# Build the application
RUN npm run build

# Production stage
FROM node:20.19-alpine

WORKDIR /app

# Copy built output
COPY --from=builder /app/.output ./.output

# Runtime environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
