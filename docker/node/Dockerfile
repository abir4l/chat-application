FROM node:10-alpine

WORKDIR /usr/src/app

EXPOSE 8000

COPY server/src/package.json .

RUN npm install

CMD ["npm", "run", "dev"]

