#FROM nginx:alpine
#FROM docker.irenshi.cn/alpine-nginx
FROM harbor.ihr360.com/build-deps/alpine-nginx-supervisor

MAINTAINER David Wei "david.wei@ihr360.com"

ADD ./etc /etc
#RUN apk update
#RUN apk add supervisor curl
# sshd_config file is edited for enable access key and disable access password
# 根据不同项目修改 /opt/XXX项目名称
RUN mkdir -p /etc/supervisor.d /opt/applet-base
ENV MONIT intranet
ENV BRANCH dev
RUN echo '*    *     *     *     *     run-parts /scripts' >> /etc/crontabs/root
ADD scripts/health /scripts/health
ADD scripts/upload /scripts/upload
ADD supervisor/nginx.ini /etc/supervisor.d/
ADD supervisor/cron.ini /etc/supervisor.d/
RUN chmod +x /scripts/health
RUN chmod +x /scripts/upload

ADD  info.json /opt
# ADD build
ADD  build-en /opt/applet-base/en
ADD  build-zh_CN /opt/applet-base/zh_CN
ADD  build-ja /opt/applet-base/ja


EXPOSE 22

CMD ["supervisord", "-n"]
