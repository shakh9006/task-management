FROM node:18.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

CMD ["npm", "run", "db:seed:roles"]
CMD ["npm", "run", "db:seed:super"]
CMD ["npm", "run", "start:dev"]