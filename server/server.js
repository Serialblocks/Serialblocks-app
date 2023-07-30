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

let SERIALPORT;
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
  const { path, baudRate } = req.query;
  console.log("Attempting to connect to serialPort");
  SERIALPORT = new SerialPort({
    path,
    baudRate: parseInt(baudRate),
    autoOpen: false,
    endOnClose: true,
  });
  SERIALPORT.open();
  SERIALPORT.on("open", () => res.status(200).json({ status: "OK", data: "" }));
  SERIALPORT.on("error", (err) =>
    res.status(200).json({ status: "FAILED", data: { error: err.message } })
  );
});

app.get("/api/serialPort/disconnect", async (req, res) => {
  if (!SERIALPORT) return;
  SERIALPORT.close();
  SERIALPORT.on("end", () => {
    res.status(200).json({ status: "OK", data: "" });
  });
  // unlikely
  SERIALPORT.on("error", (err) =>
    res.status(403).json({ status: "FAILED", data: { error: err.message } })
  );
});

app.get("/api/serialPort/write", async (req, res) => {
  const { command } = req.query;
  console.log(command);
  if (!SERIALPORT) return;
  SERIALPORT.write(`${command}\r`);
  res.status(200).json({ status: "OK", data: command });
});
capabilities;
// WEBSOCKET CONNECTION
io.on("connection", (socket) => {
  //  TODO: handle better
  if (!SERIALPORT) return;
  const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\n\r" }));
  parser.on("data", async (data) => {
    socket.emit("getParsedData", data);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
    // SERIALPORT.close();
  });
});

app.get("/", (req, res) => res.json(`you are in the root dir`));
server.listen(3003, () => {
  console.log("Server is running");
});
