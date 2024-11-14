FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

CMD ["node", "./dist/server.js"]


# Create a Docker Network
## docker network create queue-bullmq

# Run Docker Redis
## sudo docker run --network queue-bullmq -p 6379:6379 --name bullmq-redis -d redis redis-server --appendonly yes --requirepass 123456

# SERVER - Build Docker Image:
## sudo docker build . -t bullmq-server 

# SERVER - Run Docker Image:
## docker run --network queue-bullmq -p 3333:3333 --env-file ./.env -d --name bullmq-server bullmq-server

# WORKER - Build Docker Image:
## sudo docker build . -t bullmq-worker

# WORKER - Run Docker Image:
## docker run --network queue-bullmq --env-file ./.env -d --name bullmq-worker bullmq-worker


