FROM node:16.6.1 as build-stage

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install --ignore-scripts
RUN npm rebuild node-sass

COPY ./ /app/

RUN npm run build

FROM nginx:stable

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY static.conf /etc/nginx/conf.d/default.conf