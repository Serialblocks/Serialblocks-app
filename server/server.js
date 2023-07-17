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
  try {
    const serialPorts = await SerialPort.list();
    res.json(serialPorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/serialPort", async (req, res) => {
  const { path, baudRate } = req.query;
  console.log("Attempting to connect to serialPort");
  SERIALPORT = new SerialPort({
    path,
    baudRate: parseInt(baudRate),
    autoOpen: false,
  });

  SERIALPORT.open();

  SERIALPORT.on("open", () => res.json("connection established"));
  SERIALPORT.on("error", (err) => res.json(err));
});

// WEBSOCKET CONNECTION
io.on("connection", (socket) => {
  //  TODO: handle better
  if (!SERIALPORT) return;
  const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\n" }));
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
