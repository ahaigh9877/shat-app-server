const express = require("express");

const app = express();

const port = 4000;

app.listen(port, () =>
  console.log(`SHAT-App listens all the time to the port called "${port}"`)
);

app.get("/", (req, res, next) => {
  res.send("FFFFUUUUUCCCCCKKKKK");
});
