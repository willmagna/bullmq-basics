import { Queue } from "bullmq";
import redisConfig from "./config/redis";

const queue = new Queue("myFirstQueue", {
  connection: redisConfig,
});

export default queue;
