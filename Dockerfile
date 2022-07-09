FROM node:16-alpine

WORKDIR /src/

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

CMD ["npm","start"]
EXPOSE 3000