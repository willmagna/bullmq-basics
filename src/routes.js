import Queue from "./queue";

function routes(app) {
  app.get("/", async (req, res) => {
    await Queue.add("myFirstJob", { foo: "bar" }, { delay: 5000 });
    res.send({ msg: "root route" });
  });

  app.get("/second-job", async (req, res) => {
    await Queue.add("mySecondJob", { foo: "xyz" });
    res.send({ msg: "root route" });
  });
}

export default routes;
