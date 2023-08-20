import express from "express";
import { Server } from "socket.io";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import cors from "cors";
import http from "http";

const app = express();
app.use(cors({ origin: "*" }));
const server = http.createServer(app);
const io = new Server(server);

let SERIALPORT = null;
// EXPRESS ENDPOINTS
app.get("/api/listPorts", async (req, res) => {
  console.log("listPorts ran");
  try {
    const serialPorts = await SerialPort.list();
    res.status(200).json({ status: "OK", data: serialPorts });
  } catch (err) {
    res.status(500).json({ status: "FAILED", data: { error: err.message } });
  }
});

app.get("/api/serialPort/connect", async (req, res) => {
  console.log("Attempting to connect to serialPort");
  const { path, baudRate } = req.query;
  SERIALPORT = new SerialPort({
    path,
    baudRate: parseInt(baudRate),
    autoOpen: true,
    // endOnClose: true,
  });
  SERIALPORT.on("open", () => {
    res.status(200).json({ status: "OK", data: "" });
  });
  SERIALPORT.on("error", (err) =>
    res.status(200).json({ status: "FAILED", data: { error: err.message } })
  );
});

app.get("/api/serialPort/disconnect", async (req, res) => {
  console.log("Attempting to disconnect port");
  if (!SERIALPORT)
    return res.status(403).json({
      status: "FAILED",
      error: "serialport isn't connected, unauthorized access",
    });
  //
  if (SERIALPORT.isOpen) {
    SERIALPORT.close();

    SERIALPORT.on("close", () => {
      res.status(200).json({ status: "OK", data: "" });
    });
  } else {
    res.status(200).json({ status: "OK", data: "" });
  }

  // unlikely
  SERIALPORT.on("error", (err) =>
    res.status(200).json({ status: "FAILED", data: { error: err.message } })
  );
});

app.get("/api/serialPort/write", async (req, res) => {
  console.log("Attempting to write on port");
  if (!SERIALPORT)
    return res.status(403).json({
      status: "FAILED",
      error: "serialport isn't connected, unauthorized access",
    });

  const { command } = req.query;
  SERIALPORT.write(`${command}\r`);
  res.status(200).json({ status: "OK", data: command });
});

// WEBSOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("transport method", socket.conn.transport.name); // prints "websocket"
  console.log("I GOT CONNECTED!!!!!"); // prints "websocket"

  //  TODO: handle better
  if (!SERIALPORT) return;

  const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  parser.on("data", async (data) => {
    socket.emit("getParsedData", data);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
    // SERIALPORT.close();
  });

  // TODO: ADD THESE FEATURES

  SERIALPORT.on("close", () => {
    socket.emit("portClose", "port closed suddently!!!!!!!!!");
  });

  SERIALPORT.on("error", () => {
    socket.emit("portError", "port errored suddently!!!!!!!!!");
  });
});

app.get("/", (req, res) => res.json(`you are in the root dir`));
server.listen(3003, () => {
  console.log("Server is running");
});
