FROM node:lts-alpine
WORKDIR /usr/src/rocketchatscheduler

COPY package*.json ./

RUN npm install
COPY . .
CMD [ "node", "index.js" ]