import Queue from "./queue";

function routes(app) {
  app.get("/", async (req, res) => {
    await Queue.add(
      "myFirstQueue",
      "myFirstJob - FirstQueue",
      { foo: "bar" },
      { delay: 2000, attempts: 1 }
    );
    res.send({ msg: "root route" });
  });

  app.get("/second-queue", async (req, res) => {
    await Queue.add("mySecondQueue", "myFirstJob - SecondQueue", {
      foo: "xyz",
    });

    console.log(await Queue.getJobs("myFirstQueue", "cronExpressionTest"));
    res.send({ msg: "root route" });
  });

  app.get("/scheduler", async (req, res) => {
    await Queue.upsertJobScheduler(
      "myFirstQueue",
      "cronExpressionTest",
      {
        pattern: "* * * * *",
      },
      { name: "cron-job", data: { fromCronJob: "Jobbbb" }, opts: {} }
    );

    console.log(await Queue.getJobs("myFirstQueue", "cronExpressionTest"));
    res.send({ msg: "CronJob" });
  });

  app.get("/remove-scheduler", async (req, res) => {
    await Queue.removeJobScheduler("myFirstQueue", "cronExpressionTest");
    res.send({ msg: "RemoveCronJob" });
  });
}

export default routes;
