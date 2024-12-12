# bullmq-basics

### Branches order implementation

1. basics

2. bullboard-implemented-to-bullmq

3. file-structure-implemented

4. separate-function-for-queues

5. template

### Run project local

Clone project

    git clone git@github.com:willmagna/bullmq-basics.git

Add .env to the project

    cp .env.example .env

Install all the dependencies

    yarn install

Run server

    yarn run dev:server

Run Worker

    yarn run dev:worker

Run both parallel

    yarn run dev

You can run worker in a separate project like another server in production. Go to https://github.com/willmagna/bullmq-worker and run the project locally

### Run the project in Docker Container

#### You will need the bullmq-worker project https://github.com/willmagna/bullmq-worker

Create a Docker Network

    docker network create queue-bullmq

Change REDIS_HOST on .env file

    from REDIS_HOST=localhost
    to REDIS_HOST=bullmq-redis

Run Docker Redis

    sudo docker run --network queue-bullmq -p 6379:6379 --name bullmq-redis -d redis redis-server --appendonly yes --requirepass 123456

SERVER - Build Docker Image

    sudo docker build . -t bullmq-server

SERVER - Run Docker Image

    docker run --network queue-bullmq -p 3333:3333 --env-file ./.env -d --name bullmq-server bullmq-server

WORKER - Build Docker Image

    sudo docker build . -t bullmq-worker

WORKER - Run Docker Image

    docker run --network queue-bullmq --env-file ./.env -d --name bullmq-worker bullmq-worker
