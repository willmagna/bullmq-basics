import Queue from "./queue";

const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const bullboard = createBullBoard({
  queues: [new BullMQAdapter(Queue)],
  serverAdapter,
});

export default function (app) {
  app.use("/admin/queues", serverAdapter.getRouter());
}
