FROM node:16.3.0-alpine

WORKDIR /home/app

ADD package.json /home/app
RUN npm install
ADD . /home/app

CMD ["npm", "prod"]

EXPOSE 3010
