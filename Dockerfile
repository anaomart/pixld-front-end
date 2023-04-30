FROM node:17

WORKDIR /frontend

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm" , "start" ]

EXPOSE 3001




