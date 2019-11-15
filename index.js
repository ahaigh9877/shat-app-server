const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const jsonParser = bodyParser();

const port = 4000;

app.use(jsonParser);

const messages = [];

app.get("/", (req, res, next) => {
  res.send("FFFFUUUUUCCCCCKKKKK");
});

app.post("/message", (req, res, next) => {
  const { message } = req.body;
  messages.push(message);
  res.send(message);
});

app.listen(port, () =>
  console.log(`SHAT-App listens all the time to the port called "${port}"`)
);
