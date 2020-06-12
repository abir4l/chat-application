FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY index.js index.js

EXPOSE 8000

CMD ["node", "index.js"]
#CMD ["/bin/sh"]

