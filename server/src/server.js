import express from "express";
import { Server } from "socket.io";
import { SerialPort, SerialPortMock } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import cors from "cors";
import http from "http";
import chalk from "chalk"; // to pin point server console outputs easily

const app = express();
app.use(cors({ origin: "*" }));
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(socket.handshake.auth);
  const { sessionID, delimiter, EOL, ...serialPortConfig } =
    socket.handshake.auth;

  const SERIALPORT = new SerialPort({
    ...serialPortConfig,
    autoOpen: false,
  })
    .on("error", (err) => {
      // The error provides an error object whenever there is an unhandled error.
      // usually an error is handled with a callback to the method that produced it.
      // except the write method as it may or may not be called with the error as its first argument.

      socket.emit("portError", err, SERIALPORT.path);
      console.error(chalk.red("port err with reason:" + err));
    })
    .on("close", (err) => {
      if (err?.disconnected === true) {
        socket.emit("suddenPortDisc", err?.message, SERIALPORT.path);
        // BROADCAST sudden disconnection
        socket.broadcast.emit("notifyClients", {
          action: "suddenPortDisc",
          path: SERIALPORT.path,
          sessionID,
          err: err?.message,
        });
      }
    });

  // reading from Port
  const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter }));
  parser.on("data", (data) => {
    socket.emit("parsedData", data);
    socket.emit("rawData", data);
  });

  socket
    .on("listPorts", async (cb) => {
      // TODO: add isFetching state
      const serialPorts = await SerialPort.list();
      cb(serialPorts);
    })
    .on("openPort", (cb) => {
      // client requested to open Port
      if (!SERIALPORT.isOpen) {
        SERIALPORT.open((arg) => {
          // arg is either an Error object or null
          // null indicates a successful connection
          // while an Error object (message, name and stack[optional]) indicates a problem with opening the port.
          // 1) port isn't connected to server (file not found)
          // 2) port is already connected/unavailable (access is denied)
          // BROADCAST opening port
          socket.broadcast.emit("notifyClients", {
            action: "openPort",
            path: SERIALPORT.path,
            sessionID,
          });
          cb(arg?.message || null, SERIALPORT.path);
        });
      }
    })
    .on("writeToPort", (command) => {
      if (SERIALPORT.isOpen) {
        // If a port is disconnected during a write, the write will error in addition to the close event.
        // the callback may or may not be called with the error as its first argument.
        // To reliably detect write errors, add a listener for the 'error' event.
        SERIALPORT.write(command.trim() + EOL, "utf8"); // trim() remove any \r \n, whitespace.
      }
    })
    .on("closePort", (cb) => {
      // client requested to disconnect Port
      if (SERIALPORT.isOpen) {
        // If there are in-progress writes when the port is closed the writes will error.
        SERIALPORT.close(() => {
          cb(SERIALPORT.path);

          // BROADCAST client disconnection
          socket.broadcast.emit("notifyClients", {
            action: "closePort",
            path: SERIALPORT.path,
            sessionID,
          });
        });
      }
    });
});

app.get("/", (req, res) => res.json(`you are in the root dir`));
httpServer.listen(3003, () => {
  console.log("Server is running");
});
