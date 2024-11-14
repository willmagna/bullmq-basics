import { Queue } from "bullmq";
import redisConfig from "./config/redis";
import firstQueue from "./jobs/firstQueue";

const queue = new Queue(firstQueue.queueName, {
  connection: redisConfig,
});

export default queue;
