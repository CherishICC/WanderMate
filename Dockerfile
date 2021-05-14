# Step 1

FROM node:10-alpine as build-step

RUN mkdir /app

WORKDIR /app

COPY backend/package.json /app

RUN npm install

COPY backend /app

CMD ["npm","run","dev"]
