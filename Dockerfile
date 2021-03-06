# Use Node version 14
FROM node:14

# Create app directory within container
WORKDIR /usr/src/app

# Install app dependencies
# A wild card is used to ensure both package.json AND package-lock.json are copied 
COPY package*.json ./
COPY tsconfig.json ./

# Copy across source folder
COPY ./src ./src

RUN npm install -g nodemon
RUN npm install

EXPOSE 1883
EXPOSE 9001
CMD ["npm", "start"]
