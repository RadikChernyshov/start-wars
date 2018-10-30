FROM node:10.8.0-alpine
LABEL maintainer=radik.chernyshov@gmail.com

RUN ["npm", "i", "-g", "yarn", "nodemon"]
RUN ["mkdir", "-p", "/app/backend"]

WORKDIR /app

COPY package.json yarn.lock ./
RUN ["yarn", "install", "--silent", "--non-interactive", "--frozen-lockfile"]
RUN ["yarn", "cache", "clean"]
CMD ["nodemon", "--watch", "backend", "backend/bin/start"]