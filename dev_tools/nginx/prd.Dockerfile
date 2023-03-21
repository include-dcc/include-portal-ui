FROM nginx:1.23.2
RUN rm /etc/nginx/conf.d/default.conf
COPY prd.crt /etc/nginx/prd.crt
COPY prd.key /etc/nginx/prd.key
COPY nginx-prd.conf /etc/nginx/conf.d/default.conf