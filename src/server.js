import "dotenv/config";
import express from "express";
import { Queue } from "bullmq";
import { Worker } from "bullmq";
import redisConfig from "./config/redis";

const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

// Instantiate ExpressAdapter for Bullboard
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

// Instantite 2 Queues

const myQueue = new Queue("foo", {
  connection: redisConfig,
});

const myQueue1 = new Queue("foo1", {
  connection: redisConfig,
});

// Create BullBoard and instatitate the 2 queues inside of it

const bullboard = createBullBoard({
  queues: [new BullMQAdapter(myQueue), new BullMQAdapter(myQueue1)],
  serverAdapter,
});

// Add jobs to both queues

myQueue.add("myJobName", { foo: "bar" });
myQueue.add("myJobName2222", { foo: "bar" });

// Instantiate Workers to consume the jobs from producer

const worker = new Worker(
  "foo",
  async (job) => {
    console.log(job.name);
  },
  { connection: redisConfig }
);

const worker1 = new Worker(
  "foo1",
  async (job) => {
    console.log("jobId", job.id);
    console.log("jobName", job.name);
    console.log("jobData", job.data);
  },
  { connection: redisConfig }
);

// Listen to workers events

worker.on("completed", (job) => {
  console.log(`${job.id} has completed`);
  console.log(job.name);
});

worker1.on("completed", (job) => {
  console.log(`${job.id} has completed`);
  console.log(job.name);
});

// Initializes an instance of an Express Application

const app = express();

// Set middleware to specify router for BullBoard

app.use("/admin/queues", serverAdapter.getRouter());

// Start the server

app.listen(3333, () => {
  console.log("Running on 3333");
  console.log("For the UI, open http://localhost:3333/admin/queues");
  console.log("Make sure Reis is running on port 6379 by default");
});
