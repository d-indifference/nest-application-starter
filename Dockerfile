FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]