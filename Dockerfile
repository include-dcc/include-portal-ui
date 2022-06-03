#FROM node:16.6.1 as build-stage
FROM ubuntu:20.04 as build-stage

RUN apt update && apt install npm

WORKDIR /app

COPY package.json package-lock.json /app/

#RUN npm install --ignore-scripts
#RUN npm rebuild node-sass

COPY ./ /app/

RUN npm run build:netlify

#FROM nginx:1.20

#COPY --from=build-stage /app/build/ /usr/share/nginx/html

#COPY static.conf /etc/nginx/conf.d/default.conf