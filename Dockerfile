FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install nodemon globally
RUN npm install -g nodemon

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy rest of the app
COPY . .

# Default command
CMD [ "nodemon", "--legacy-watch", "index.js" ]
