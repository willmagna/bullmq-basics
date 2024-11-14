import { Worker } from "bullmq";
import redisConfig from "./config/redis";
import firstQueue from "./jobs/firstQueue";

const worker = new Worker(firstQueue.queueName, firstQueue.handle, {
  connection: redisConfig,
});

worker.on("progress", (job, progress) => {
  console.log(`${progress}%`);
});

worker.on("completed", (job) => {
  console.log(`Job ${job.id} - ${job.name} has completed`);
  console.log("===========================");
});
