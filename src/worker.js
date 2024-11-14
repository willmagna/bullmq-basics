import { Worker } from "bullmq";
import redisConfig from "./config/redis";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const worker = new Worker(
  "myFirstQueue",
  async (job) => {
    console.log("jobId:", job.id);
    console.log("jobName:", job.name);
    console.log("jobData:", job.data);
    job.updateProgress(0);
    await sleep(1000);
    job.updateProgress(20);
    await sleep(1000);
    job.updateProgress(40);
    await sleep(1000);
    job.updateProgress(60);
    await sleep(1000);
    job.updateProgress(80);
    await sleep(1000);
    job.updateProgress(100);
  },
  { connection: redisConfig }
);

worker.on("progress", (job, progress) => {
  console.log(`${progress}%`);
});

worker.on("completed", (job) => {
  console.log(`Job ${job.id} - ${job.name} has completed`);
  console.log("===========================");
});
