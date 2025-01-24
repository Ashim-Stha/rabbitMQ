FROM node:16-alpine

RUN npm install -g nodemon

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "nodemon","app" ]

