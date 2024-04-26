#FROM nginx:alpine
#FROM harbor.ihr360.com/build-deps/alpine-nginx
FROM harbor.ihr360.com/build-deps/alpine-nginx-supervisor

MAINTAINER David Wei "david.wei@ihr360.com"

ADD ./etc /etc
#RUN apk update
#RUN apk add supervisor curl
# sshd_config file is edited for enable access key and disable access password
RUN mkdir -p /etc/supervisor.d /opt/xxx /scripts
ENV MONIT intranet
ENV BRANCH dev
RUN echo '*    *     *     *     *     run-parts /scripts' >> /etc/crontabs/root
ADD scripts/health /scripts/health
ADD scripts/upload /scripts/upload
ADD scripts/uploadMenu /scripts/uploadMenu
ADD supervisor/nginx.ini /etc/supervisor.d/
ADD supervisor/cron.ini /etc/supervisor.d/
RUN chmod +x /scripts/health
RUN chmod +x /scripts/upload
RUN chmod +x /scripts/uploadMenu

ADD  info.json /opt
ADD  menu.json /opt
COPY  build-en /opt/xxx/en
COPY  build-zh_CN /opt/xxx/zh_CN
COPY  build-ja /opt/xxx/ja


#默认打包方案，便于后端联调
#ADD  build /opt/xxx/default

EXPOSE 22

CMD ["supervisord", "-n"]
