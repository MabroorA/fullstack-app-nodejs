// src/startServer.ts
import app from "./server";
import dotenv from "dotenv";
dotenv.config();

const Port = process.env.PORT || 5000;
app.listen(Port, () =>
  console.log(`Server started on port http://localhost:${Port}`)
);
