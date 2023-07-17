// import express from "express";
// import { SerialPort } from "serialport";
// import { ReadlineParser } from "@serialport/parser-readline";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import "dotenv/config";

// const app = express();
// const PORT = process.env.PORT;
// const httpServer = createServer(app);

// // app.use(express.json({ extended: false }));
// app.use(cors());

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
// const SERIALPORT = new SerialPort({
//   path: "COM15",
//   baudRate: 115200,
// });

// io.on("connection", (socket) => {
const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\n" }));
parser.on("data", (data) => {
  console.log(data);
});
// });

// app.get("/api/getSerialData", (req, res) => {
//   try {
//     const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\n" }));
//     parser.on("data", (data) => {
//       res.json(data);
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/api/listPorts", async (req, res) => {
//   try {
//     const serialPorts = await SerialPort.list();
//     res.json(serialPorts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(6001, "localhost", () => {
//   console.log(`Server listening on port ${PORT}`);
// });

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

/**df */

import express from "express";
// import { SerialPort } from "serialport";
// import { ReadlineParser } from "@serialport/parser-readline";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
// import "dotenv/config";

// const PORT = process.env.PORT;
const app = express();

// app.use(express.json({ extended: false }));
app.use(cors());
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// const SERIALPORT = new SerialPort({
//   path: "COM15",
//   baudRate: 115200,
// });
// SERIALPORT.on("error", function (err) {
//   console.log("Error serialPort connection: ", err.message);
// });

io.on("connection", (socket) => {
  console.log("established");

  // Emitting a new message. Will be consumed by the client
  const response = new Date();
  socket.emit("SerialReadingsFromAPI", response);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// app.get("/api/getSerialData", (req, res) => {
//   try {
//     const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\n" }));
//     parser.on("data", (data) => {
//       res.json(data);
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/api/listPorts", async (req, res) => {
//   try {
//     const serialPorts = await SerialPort.list();
//     res.json(serialPorts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

httpServer.listen(6001, () => {
  console.log(`Server listening on port 6001`);
});
////////////fghgfhgf

io.on("request", (request) => {
  // console.log("established");

  // Emitting a new message. Will be consumed by the client
  const response = `sheko date: ${new Date()}`;

  const connection = request.accept(null, request.origin);

  connection.emit("SerialReadingsFromAPI", response);

  connection.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

/******* BREAKK*/

import express from "express";
import { webSocketServer } from "socket.io";
import cors from "cors";

app.use(cors({ origin: "*" }));

const server = app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

const wsServer = new webSocketServer({ httpServer: server });

app.get("/", (req, res) => {
  let linkId = "linkme";
  console.log("henna");
  res.send(`http://localhost:3000/${linkId}`);
});

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  connection.on("message", (message) => {
    console.log(message);
  });
});

/*ASDAS */
