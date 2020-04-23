FROM node:12.7-alpine AS build
WORKDIR /opt/confirmationFrontend
COPY package.json ./
COPY . .
RUN npm install
RUN npm run build


FROM nginx:1.17.1-alpine AS deploy

EXPOSE 80
COPY --from=build /opt/confirmationFrontend/dist/confirmationFrontend /usr/share/nginx/html