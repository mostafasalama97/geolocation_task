# frontend/Dockerfile

# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the Next.js application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install production dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable for Node.js
ENV NODE_ENV=production

# Start the Next.js server
CMD ["npm", "start"]
