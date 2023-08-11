FROM node:alpine

COPY . /app

WORKDIR /app
RUN npm install 

WORKDIR /app

EXPOSE 4000

CMD node server.js
