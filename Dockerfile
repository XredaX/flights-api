# Use an official Node.js runtime as the base image
FROM node:20-slim

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
  libgdk-pixbuf2.0-0 \
  libgobject-2.0-0 \
  libatk-1.0-0 \
  libatk-bridge2.0-0 \
  libatspi2.0-0 \
  libpangocairo-1.0-0 \
  libpango-1.0-0 \
  libcups2 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libasound2 \
  libnspr4 \
  libnss3 \
  libxss1 \
  libxtst6 \
  libappindicator3-1 \
  libu2f-udev \
  libdbus-1-3 \
  fonts-liberation \
  libgbm1 \
  xdg-utils \
  ca-certificates \
  fonts-noto-color-emoji

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files into the container, including the JSON file
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the application port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]