#version
FROM node:18-alpine

# Create container directory
RUN mkdir /app

# Set working directory
WORKDIR /app

# Copy the project files to the container
COPY . /app

# Expose the port
EXPOSE 3001

# Install dependencies
RUN npm install

# Run the migration script
CMD npm start
