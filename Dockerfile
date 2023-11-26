# Using Node.js v16 Alpine as base image
FROM node:18.18.2-alpine3.18

# Label the source of the Dockerfile
LABEL org.opencontainers.image.source="https://github.com/Nutrify-Dicoding/nutrify-server"

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install --only=production

# Copy project files and folders to the working directory
COPY . .

# Binds to port 9000
EXPOSE 9000

# Command to run the app
CMD [ "npm", "start" ]