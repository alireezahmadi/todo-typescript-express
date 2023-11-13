FROM node:alpine 

WORKDIR /usr/app 

COPY . .

RUN npm install

RUN npm run build

CMD [ "node", "dist/server.js" ]