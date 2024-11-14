function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  queueName: "myFirstQueue",
  async handle(job) {
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
};
