# Step 1

FROM node:10-alpine as build-step

# RUN mkdir /app

# WORKDIR /app

# COPY backend/package.json /app

# RUN npm install

# COPY backend /app
# RUN npm run dev

RUN mkdir /frontend_app

WORKDIR /frontend_app

COPY frontend/package.json /frontend_app

RUN npm install

RUN npm run lint --fix

COPY frontend /frontend_app

RUN npm run serve

# Stage 2


FROM nginx:1.17.1-alpine

EXPOSE 8081

COPY --from=build-step /app/build /usr/share/nginx/html

