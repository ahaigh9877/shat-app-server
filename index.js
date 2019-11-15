const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// capitalised cos it's a class.
const Sse = require("json-sse");

const app = express();
const port = 4000;

// This is necessary to read the body of the request!!
const jsonParser = bodyParser();
const corsMiddleware = cors();
// gotta register cors first!!!!
app.use(corsMiddleware);
app.use(jsonParser);

// standin for a proper database. That's why it's defined at the top-level, in global scope.
// re-created every time the server starts. A "dictionary".
const messages = {};
// The stream: essentially a list of clients to which all data is sent. The list of rooms
const stream = new Sse();
const streams = {};

// * ============================================================================================== * //

// This is what happens when a NEW client joins the stream. All the data are sent.
app.get("/stream", (req, res, next) => {
  // get a list of rooms: the keys of the "messages" object.
  const rooms = Object.keys(messages);
  // serialise the data!!!
  const string = JSON.stringify(rooms);
  // add it to the stream...
  stream.updateInit(string);
  // then, this function adds the client to the stream. Stands in for res.send()
  stream.init(req, res);
});

// * ============================================================================================== * //

app.get("/streams/:roomName", (req, res, next) => {
  const { roomName } = req.params;
  const stream = streams[roomName];
  console.log("roomname", roomName);

  // the array of messages from from a given roomName
  const data = messages[roomName];
  // serialise the data!!!
  const string = JSON.stringify(data);
  // add it to the stream...
  stream.updateInit(string);
  // then, this function adds the client to the stream. Stands in for res.send()
  stream.init(req, res);
});

// * ============================================================================================== * //

// function to keep code DRY
function send(data) {
  const string = JSON.stringify(data);
  stream.send(string);
}

// add new rooms endpoint
app.post("/room", (req, res, next) => {
  const { name } = req.body;

  send(name);

  // [] used here to add a DYNAMIC PROPERTY to an object. (remember [] is an alternative object property access means)
  // a varable as property
  messages[name] = [];

  // add a new stream when a new room is created!!!
  // It's added to the "streams" object
  streams[name] = new Sse();

  res.send(name);
});

// * ============================================================================================== * //

// Post request, sending a message, storing it in the array and returning it as a response.
app.post("/message/:roomName", (req, res, next) => {
  const { message } = req.body;
  const { roomName } = req.params;
  console.log("message: ", message);
  console.log("Roomname ", roomName);

  // Use the room name to get the stream.
  const room = messages[roomName];
  console.log("messages ", messages);
  console.log("Room: ", room);

  room.push(message);

  // find the stream name in the streams dictionary
  const stream = streams[roomName];

  const string = JSON.stringify(message);

  stream.send(string);

  // send a response so that the endpoint doesn't time out, even though it's not much actual use.
  // always send the response at the end.
  res.send(message);
});

// * ============================================================================================== * //

app.get("/message", (req, res, next) => {
  res.send(messages);
});

// ** ================================= garbage below ============================================ ** //

app.get("/", (req, res, next) => {
  res.send("FFFFUUUUUCCCCCKKKKK");
});

app.listen(port, () =>
  console.log(`SHAT-App listens all the time to the port called "${port}"`)
);
