FROM node:10-alpine

WORKDIR /usr/src/app

RUN npm install

EXPOSE 8000

COPY ./entry.sh /entry.sh

RUN chmod u+x /entry.sh

RUN ls -l /

ENTRYPOINT ["/entry.sh"]
 
#CMD ["node", "index.js"]
#CMD ["/bin/sh"]

