// import express from "express";
// import { Server } from "socket.io";
// import { SerialPort } from "serialport";
// import { ReadlineParser } from "@serialport/parser-readline";
// import cors from "cors";
// import http from "http";

// const app = express();
// app.use(cors({ origin: "*" }));
// const server = http.createServer(app);
// const io = new Server(server);

// io.on("connection", (socket) => {
//   socket.on("sendCred", ({ path, baudRate }) => {
//     const SERIALPORT = new SerialPort({
//       path,
//       baudRate,
//       autoOpen: false,
//     });
//     console.log(SERIALPORT.open());

//     SERIALPORT.on("error", function (err) {
//       console.log("Error IDKWHYYY: ", err.message);
//     });

//     const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter: "\n" }));
//     parser.on("data", async (data) => {
//       // await new Promise((res) => setTimeout(res, 5000)); // delay 200ms between each reading without delaying microcontroller
//       socket.emit("getParsedData", data);
//     });

//     return SERIALPORT.on("open", function () {
//       console.log("connection established");
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log(`${socket.id} has disconnected`);
//     //TODO: DISCONNECT SERIAL CONN
//   });
// });

// app.get("/api/listPorts", async (req, res) => {
//   console.log("listPorts requested");
//   try {
//     const serialPorts = await SerialPort.list();
//     res.json(serialPorts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/", (req, res) => res.json(`you are in the root dir`));
// server.listen(3003, () => {
//   console.log("Server is running");
// });

console.log(process.argv.slice(2));
