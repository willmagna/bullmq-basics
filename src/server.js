import "dotenv/config";
import express from "express";
import routes from "./routes";
import bullBoard from "./bullBoard";

const app = express();
app.use(express.json());

routes(app);
bullBoard(app);

app.listen(3333, () => {
  console.log("Running on 3333");
  console.log("For the UI, open http://localhost:3333/admin/queues");
  console.log("Make sure Reis is running on port 6379 by default");
});
