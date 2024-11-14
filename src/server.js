import "dotenv/config";
import { Queue } from "bullmq";
import { Worker } from "bullmq";
import redisConfig from "./config/redis";

const myQueue = new Queue("foo", {
  connection: redisConfig,
});

myQueue.add("myJobName", { foo: "bar" });

const worker = new Worker(
  "foo",
  async (job) => {
    console.log(job.name);
  },
  { connection: redisConfig }
);

worker.on("completed", (job) => {
  console.log(`${job.id} has completed`);
  console.log(job.name);
});
