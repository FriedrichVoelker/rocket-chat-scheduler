FROM node:16
WORKDIR /usr/src/rocketchatscheduler

COPY package*.json ./

RUN npm install
COPY . .
CMD [ "node", "index.js" ]