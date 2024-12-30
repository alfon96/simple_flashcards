# Use the official Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Use development mode to enable hot-reloading
CMD ["node", "--inspect=0.0.0.0:9229", "node_modules/.bin/next", "dev"]

