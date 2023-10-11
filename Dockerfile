# ================================================
FROM node:16-alpine

LABEL maintainer="Gregorio Alvarez <allgrego14@gmail.com>"

WORKDIR /home/node/app

COPY package*.json ./

COPY ./ ./

RUN chown -R node:node /home/node/app \
    && touch /home/node/app/.timestamp \
    && ls -la /home/node/app;


USER node

RUN npm install 

#$(date --utc +%FT%T)
# ARG TS
# $(tar cf - ./ | sha1sum)
# ARG VERSION

# ENV APP_DATE=${TS}
# ENV APP_BUILD=${VERSION}

ARG NEXT_PUBLIC_MONITOR_HOURS_OFFSET=4
ARG NEXT_PUBLIC_BACKEND_BASE_URL=https://needed-that-data-api.up.railway.app
ARG NEXT_PUBLIC_APP_MODE=debug

ENV NEXT_PUBLIC_MONITOR_HOURS_OFFSET ${NEXT_PUBLIC_MONITOR_HOURS_OFFSET}
ENV NEXT_PUBLIC_BACKEND_BASE_URL ${NEXT_PUBLIC_BACKEND_BASE_URL}
ENV NEXT_PUBLIC_APP_MODE ${NEXT_PUBLIC_APP_MODE}

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]

