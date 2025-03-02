# Use an official Node.js runtime as a base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

#Copy the .env file from the root directory
COPY .env .env

# Expose port 3001 for the backend API
EXPOSE 3001

# Start the backend server
CMD ["node", "app.js"]