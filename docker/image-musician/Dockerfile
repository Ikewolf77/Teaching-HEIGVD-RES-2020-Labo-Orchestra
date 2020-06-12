FROM node:12.16.3

RUN apt-get update && \
	apt-get install -y vim && \
	apt-get install -y tcpdump

COPY src /opt/app

ENTRYPOINT ["node","/opt/app/index.js"]