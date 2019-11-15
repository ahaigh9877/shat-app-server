const express = require("express");

const app = express();

const port = 4000;

app.listen(() =>
  console.log(`SHAT-App listens all the time to the port called "${port}"`)
);
