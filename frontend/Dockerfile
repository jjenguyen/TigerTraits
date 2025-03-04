# Step 1: Build the frontend using Node.js
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json ./package-lock.json ./
RUN npm install

# Debug step: List files in the working directory after copy
RUN ls -la /app

# Copy the rest of the frontend code
COPY . .

COPY ./.env .env

# Another debug: List files after copying everything
RUN ls -la /app

# Build the React app
RUN npm run build

# Step 2: Serve the frontend using Nginx
FROM nginx:alpine

# Copy the Nginx config from frontend/nginx.conf to /etc/nginx/
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build from the previous stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for serving the frontend
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]