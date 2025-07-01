# Use the official Nginx base image
FROM nginx

# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Expose port 8080
EXPOSE 80

# Copy files from the current directory to the working directory
COPY . .

COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
