FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/index.html
RUN rm -rf /usr/share/nginx/html/50x.html

ENV ENV_FILE_SERVER="/usr/share/nginx/html/otus/app/application/environment/env.js"
ENV API_URL="http://teste"

COPY source /usr/share/nginx/html/otus
COPY server/nginx.conf /etc/nginx/nginx.conf
COPY server/otus.conf /etc/nginx/conf.d/default.conf
COPY server/entrypoint.sh /opt/entrypoint/entrypoint.sh

RUN chmod 775 /opt/entrypoint/entrypoint.sh

CMD ["/bin/sh", "-c", "/opt/entrypoint/entrypoint.sh;","&&","nginx -g 'daemon off;'"]


