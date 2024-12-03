# Use an official Node.js runtime as the base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the application port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]