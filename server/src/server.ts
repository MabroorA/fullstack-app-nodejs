import express from "express";
import dotenv from "dotenv";
import router from "../routes/router";

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

const Port = process.env.PORT || 5000;
app.listen(Port, () =>
  console.log(`Server started on port http://localhost:${Port}`)
);
