import { Queue } from "bullmq";
import redisConfig from "./config/redis";
import * as queues from "./queues";

const queueList = Object.values(queues).map((queue) => ({
  instance: new Queue(queue.name, {
    connection: {
      ...redisConfig,
      retryStrategy: function (times) {
        return Math.max(Math.min(Math.exp(times), 20000), 1000);
      },
    },
  }),
  queueName: queue.name,
}));

queueList.forEach((queue) => {
  queue.instance.on("error", (err) => {
    console.log(`QUEUE ERROR: ${err}`);
  });
  queue.instance.on("ioredis:close", (err) => {
    console.log(`QUEUE IOREDIS CLOSE: ${err}`);
  });
});

export default {
  queueList,
  add(queueName, jobName, jobData, jobOptions) {
    const options = {
      ...jobOptions,
      removeOnComplete: { age: 60, count: 10 },
      removeOnFail: { age: 60, count: 10 },
    };
    const queue = queueList.find((queue) => queue.queueName === queueName);
    return queue.instance.add(jobName, jobData, options);
  },
  getJobs(queueName) {
    const queue = queueList.find((queue) => queue.queueName === queueName);
    return queue.instance.getJobs();
  },
  upsertJobScheduler(queueName, ...data) {
    const queue = queueList.find((queue) => queue.queueName === queueName);
    return queue.instance.upsertJobScheduler(...data);
  },
  removeJobScheduler(queueName, jobName) {
    const queue = queueList.find((queue) => queue.queueName === queueName);
    return queue.instance.removeJobScheduler(jobName);
  },
};
