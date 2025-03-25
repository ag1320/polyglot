#version
FROM node:18-slim

#creat container directory
RUN mkdir /app

#working directory
WORKDIR /app

#copy the files from the directory to the container
COPY . /app

#expose the port
EXPOSE 5173

#run commands
RUN npm install
CMD ["npm", "run", "dev"]