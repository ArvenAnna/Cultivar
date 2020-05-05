From node:carbon

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

#COPY daemon.json /etc/docker/daemon.json

WORKDIR /usr/src/app

RUN npm install

ARG photoLocation
ARG templocation
ARG previewImagePrefix

RUN ./node_modules/.bin/webpack --env.PHOTO_CATALOG=${photoLocation} --env.TEMP_CATALOG=${templocation} --env.PREVIEW_IMG_PREFIX=${previewImagePrefix}


EXPOSE 4003

CMD ["npm", "run", "node-server"]
