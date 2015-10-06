# 基础镜像
FROM docker-beego:pro
# 维护人员
MAINTAINER  liuhong1.happy@163.com
# 创建目录
RUN mkdir -p $GOPATH/src/github.com/liuhong1happy/ConsoleWindowApp
# 设置工作目录
WORKDIR $GOPATH/src/github.com/liuhong1happy/ConsoleWindowApp
# 复制代码
COPY . $GOPATH/src/github.com/liuhong1happy/ConsoleWindowApp
# 暴露8080
EXPOSE 8080
# 配置supervisord
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
# 启动supervisord
CMD ["/usr/bin/supervisord"]
