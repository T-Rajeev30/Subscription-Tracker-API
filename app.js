import express from "express";

import { PORT } from "./config/env.js";
const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to a Backend Project");
});

app.listen(PORT, () => {
  console.log(
    `Subscription Tracker API is running on PORT http://localhost:${PORT}`
  );
});

export default app;
