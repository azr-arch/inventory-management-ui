import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ ping: "pong" });
});

app.listen(8000, () => {
  console.log("server started on 8000");
});
