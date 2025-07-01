# Use the official Node.js 18 image as the base image for the build stage
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install the project dependencies specified in package.json
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Run the build script defined in package.json (this typically compiles/transpiles source code)
RUN npm run build

# Use the official Nginx image for the final stage
FROM nginx

# Copy a custom Nginx configuration file from the host machine to the container
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the built files from the builder stage to the Nginx default content directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to allow traffic to the Nginx server
EXPOSE 80

# Start the Nginx server in the foreground (this prevents the container from exiting)
CMD ["nginx", "-g", "daemon off;"]