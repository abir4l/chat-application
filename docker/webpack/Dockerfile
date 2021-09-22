FROM node:10-alpine

WORKDIR /usr/src/app

EXPOSE 8000

COPY client .

RUN npm install

CMD ["npm", "run", "watch"]