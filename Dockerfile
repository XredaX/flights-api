FROM node:20

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
  xdg-utils \
  ca-certificates \
  fonts-noto-color-emoji

# Continue with your existing Dockerfile instructions
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]