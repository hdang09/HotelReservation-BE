FROM node
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 5000
CMD = ["yarn", "run", "start"]
