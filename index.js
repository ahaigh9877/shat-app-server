const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

// This is necessary to read the body of the request!!
const jsonParser = bodyParser();
app.use(jsonParser);

// standin for a proper database. That's why it's defined at the top-level, in global scope.
// re-created every time the server starts.
const messages = [];

app.get("/", (req, res, next) => {
  res.send("FFFFUUUUUCCCCCKKKKK");
});

// Post request, sending a message, storing it in the array and returning it as a response.
app.post("/message", (req, res, next) => {
  const { message } = req.body;
  messages.push(message);
  res.send(message);
});

app.get("/message", (req, res, next) => {
  res.send(messages);
});

app.listen(port, () =>
  console.log(`SHAT-App listens all the time to the port called "${port}"`)
);
