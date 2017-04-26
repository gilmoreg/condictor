FROM debian:latest
MAINTAINER gilmoreg@live.com

RUN apt-get update
RUN apt-get install -y curl nano
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN apt-get clean

# Prevent npm install from running unless package.json changes
COPY ./package.json src/
RUN cd src && npm install

COPY . /src

WORKDIR src/

CMD ["npm", "start"]