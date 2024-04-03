FROM node:20-alpine

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install

WORKDIR /opt/src
COPY . .

EXPOSE 8081
CMD ["npm","run","start"] 