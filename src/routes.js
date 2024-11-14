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
    await Queue.add("mySecondQueue", "mySecondJob - SecondQueue", {
      foo: "xyz",
    });
    res.send({ msg: "root route" });
  });
}

export default routes;
