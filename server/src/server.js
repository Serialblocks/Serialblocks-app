import express from "express";
import { Server } from "socket.io";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import cors from "cors";
import http from "http";
import { SerialPortMock } from "serialport";
function isJSON(text) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}
const app = express();
app.use(cors({ origin: "*" }));
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// EXPRESS ENDPOINTS
app.get("/api/listPorts", async (req, res) => {
  console.log("listPorts ran");
  try {
    // const path = "/COM99";
    // SerialPortMock.binding.createPort(path);
    // const serialport = new SerialPortMock({ path, baudRate: 9600 });
    // // const serialPorts = await SerialPortMock.list();
    const serialPorts = await SerialPort.list();
    res.status(200).json({ status: "OK", data: serialPorts });
  } catch (err) {
    res.status(500).json({ status: "FAILED", data: { error: err.message } });
  }
});

app.get("/api/serialPort/disconnect", (req, res) => {
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
    // SEND CONFLICT 409 WASN'T CONNECTED TO BEGIN WITH
    res.status(200).json({ status: "OK", data: "" });
  }

  // unlikely
  SERIALPORT.on("error", (err) =>
    res.status(200).json({ status: "FAILED", data: { error: err.message } })
  );
});

app.get("/api/serialPort/write", (req, res) => {
  console.log("Attempting to write on port");
  if (!SERIALPORT)
    return res.status(403).json({
      status: "FAILED",
      error: "serialport isn't connected, unauthorized access",
    });

  const { command } = req.query;
  console.log(command);
  SERIALPORT.write(command.trim() + "\r\n");
  //A combination of CR (carriage return) and LF (line feed) control characters sequence is used as end-of-line (EOL) marker.
  res.status(200).json({ status: "OK", data: command });
});

// WEBSOCKET CONNECTION

io.on("new_namespace", (namespace) => {
  console.log(namespace.name);
});

io.of(/^\/COM\d+$/).on("connection", (socket) => {
  console.log("transport method", socket.conn.transport.name); // prints "websocket"
  console.log(`${socket.id} has connected!`);
  // const newNamespace = socket.nsp;
  // console.log("helloooo!!!", newNamespace);

  const { path, baudRate } = socket.handshake.query;
  console.log(path, baudRate);
  // console.dir(socket.handshake.query);
  const SERIALPORT = new SerialPort({
    path: "s",
    baudRate: parseInt(34),
    autoOpen: true,
    // endOnClose: true,
  });
  SERIALPORT.on("open", () => {
    console.log("portConnected");
    socket.emit("portStatus", { status: "OK", data: "" });
  });
  SERIALPORT.on("error", (err) =>
    socket.emit("portStatus", {
      status: "FAILED",
      data: { error: err.message },
    })
  );

  // broadcast to all clients in the given sub-namespace
  // newNamespace.emit("hello");

  socket.on("connect", () => {
    console.log(`${socket.id} has connected!`);
  });
  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} has disconnected with reason ${reason}`);
  });
  //  TODO: handle better
  const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  parser.on("data", (data) => {
    if (isJSON(data)) {
      const parsedData = JSON.parse(data);
      for (const key of Object.keys(parsedData)) {
        parsedData[key] = { value: parsedData[key], timestamp: Date.now() };
      }
      socket.emit("minpulatedData", parsedData);
    }
    socket.emit(
      "rawData",
      JSON.stringify({ value: data, timestamp: Date.now() })
    );
  });
  // TODO: ADD THESE FEATURES

  SERIALPORT.on("close", () => {
    console.log(socket.id + "closed port all of a suddent");
    io.to(socket.id).emit("portClose", "port closed suddently!!!!!!!!!");
  });

  SERIALPORT.on("error", () => {
    io.to(socket.id).emit("portError", "port errored suddently!!!!!!!!!");
  });
});

app.get("/", (req, res) => res.json(`you are in the root dir`));
httpServer.listen(3003, () => {
  console.log("Server is running");
});
