FROM node:alpine

WORKDIR /data
COPY ./ /data
RUN npm install

CMD [ "yarn", "test" ]
