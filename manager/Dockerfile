#
# This file is part of User Dashboard.
#
# Copyright (C) 2023 GEO Secretariat.
#
# User Dashboard is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.
#

FROM node:16-alpine

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
COPY ./patches ./patches

ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn install

WORKDIR /opt/app
COPY ./ .

RUN yarn build

EXPOSE 1337
CMD ["yarn", "develop"]
