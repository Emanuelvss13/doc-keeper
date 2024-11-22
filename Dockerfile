FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx nest build

RUN ls -l /app/dist

EXPOSE 3000

CMD ["node", "dist/src/main"]
