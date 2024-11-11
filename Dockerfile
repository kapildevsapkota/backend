# Use Node.js Alpine image as base
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Install Sequelize CLI globally
RUN npm install -g sequelize-cli

# Copy all necessary files and directories
COPY ./config ./config
COPY ./controllers ./controllers
COPY ./middleware ./middleware
COPY ./migrations ./migrations  
COPY ./models ./models
COPY ./routes ./routes
COPY app.js .
COPY server.js .
COPY nodemon.json .
COPY ./seeders ./seeders

# Define the command to run the application
CMD ["npm", "start"]
