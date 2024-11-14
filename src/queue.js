import { Queue } from "bullmq";
import redisConfig from "./config/redis";
import * as queues from "./queues";

const queueList = Object.values(queues).map((queue) => ({
  instance: new Queue(queue.name, { connection: redisConfig }),
  queueName: queue.name,
}));

export default {
  queueList,
  add(queueName, ...data) {
    const queue = queueList.find((queue) => queue.queueName === queueName);
    return queue.instance.add(...data);
  },
  getJobs(queueName) {
    const queue = queueList.find((queue) => queue.queueName === queueName);
    return queue.instance.getJobs();
  },
};
