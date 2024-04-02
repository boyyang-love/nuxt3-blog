#1、基于镜像node版本
FROM node:20.11.1
#2、作者
MAINTAINER boyyang
#3、参数，node的环境为生产环境
ENV NODE_ENV=production
#4、任意ip
ENV HOST 0.0.0.0
#5、容器内创建目录/nuxt3
RUN mkdir -p /nuxt3
#6、复制当前的内容到容器内容部目录/nuxt3
COPY .output/ . /nuxt3/
#7、切换工作目录到/nuxt3
WORKDIR /nuxt3
#8、暴露端口3000，默认端口
EXPOSE 3000
#12、start
CMD ["node","./.output/server/index.mjs"]