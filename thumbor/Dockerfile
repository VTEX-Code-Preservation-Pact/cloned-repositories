FROM ribeirofelix/thumbor

COPY circus.d/nginx.ini.tpl /etc/circus.d/
COPY setup.d/nginx /etc/setup.d/30-nginx
COPY conf/nginx.conf /etc/nginx/nginx.conf

# thumbor conf
COPY setup.d/thumbor /etc/setup.d/40-thumbor
COPY circus.d/thumbor.ini.tpl /etc/circus.d/
COPY conf/thumbor.conf.tpl /code/thumbor.conf.tpl

COPY extensions/http_revalidating_loader.py /code/env/lib/python2.7/site-packages/thumbor/loaders/
ENV LOADER='thumbor.loaders.http_revalidating_loader'

ENV CIRCUS_HTTPD=true
ENV CIRCUS_STATSD=true

EXPOSE 80 8000
