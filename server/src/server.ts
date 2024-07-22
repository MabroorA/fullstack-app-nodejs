import express from "express";
import dotenv from "dotenv";

const app = express();


app.get("/", (req, res) => {
    res.send("Server Is UP");
  });

const Port = process.env.PORT || 5000;
app.listen(Port, () =>
  console.log(`Server started on port http://localhost:${Port}`)
);
