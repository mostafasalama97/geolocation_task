# backend/Dockerfile

# Use Node.js LTS version as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define environment variable for Node.js
ENV NODE_ENV=production

# Start the backend server
CMD ["npm", "start"]
