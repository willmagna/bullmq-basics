export default {
  name: "mySecondQueue",
  async job(job) {
    console.log("jobId:", job.id);
    console.log("jobName:", job.name);
    console.log("jobData:", job.data);
  },
};