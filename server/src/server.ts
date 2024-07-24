import express from "express";
import router from "./routes/router";

const app = express();
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use("/", router);

export default app;