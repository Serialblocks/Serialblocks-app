import express from "express";
import { Server } from "socket.io";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import cors from "cors";
import http from "http";

const app = express();
app.use(cors({ origin: "*" }));
const httpServer = http.createServer(app);
const io = new Server(httpServer);

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

// WEBSOCKET CONNECTION
// io.on("new_namespace", (namespace) => {
//   console.log(`"line 38" ${namespace.name}`);
// });

io.on("connection", (socket) => {
  console.log(socket.connected); // true
  // console.log(`${socket.id} has connected!`);
  socket.on("connect", function () {
    // SERIALPORT.open();
    console.log(`${socket.id} has connected!`);

    console.log(socket.connected); // true
  });

  // socket.on("connect_error", (error) => {
  //   console.log(Error + "erorr!!");
  // });
  // socket.on("error", (error) => {
  //   console.log(Error + "erorr!!");
  // });

  // console.log(`"line 42" ${socket.nsp.name}`);

  // const {
  //   path,
  //   baudRate,
  //   delimiter,
  //   EOL,
  //   dataBits,
  //   lock,
  //   stopBits,
  //   parity,
  //   rtscts,
  //   xon,
  //   xoff,
  //   xany,
  //   hupcl,
  // } = {
  //   path: "COM1",
  //   baudRate: "115200",
  //   delimiter: "\r",
  //   EOL: "\r\n",
  //   /** Must be one of these: 5, 6, 7, or 8 defaults to 8 */
  //   dataBits: 8,
  //   /** Prevent other processes from opening the port. Windows does not currently support `false`. Defaults to true */
  //   lock: true,
  //   /** Must be 1, 1.5 or 2 defaults to 1 */
  //   stopBits: 1,
  //   parity: "",
  //   /** Flow control Setting. Defaults to false */
  //   rtscts: false,
  //   /** Flow control Setting. Defaults to false */
  //   xon: false,
  //   /** Flow control Setting. Defaults to false */
  //   xoff: false,
  //   /** Flow control Setting defaults to false*/
  //   xany: false,
  //   /** drop DTR on close. Defaults to true */
  //   hupcl: true,
  // };

  // const SERIALPORT = new SerialPort({
  //   path,
  //   baudRate: parseInt(baudRate),
  //   autoOpen: false,
  // });

  // SERIALPORT.on("error", () => {
  //   // set error state with reason
  //   console.error("port err");
  // });

  // SERIALPORT.on("open", () => {
  //   // set open state
  //   // console.log(`${socket.id} has connected!`);
  // });

  // const parser = SERIALPORT.pipe(new ReadlineParser({ delimiter }));
  // parser.on("data", (data) => {
  //   socket.emit("minpulatedData", data);
  //   socket.emit("rawData", data);
  //   console.log(data);
  // });

  // // EOL
  // socket.on("writeOnPort", (command) => {
  //   console.log(command);
  //   SERIALPORT.write(command.trim() + EOL);
  // });

  // socket.on("disconnect", (reason) => {
  //   if (SERIALPORT.isOpen) {
  //     SERIALPORT.close();
  //   }
  //   console.log(`${socket.id} has disconnected with reason ${reason}`);
  // });
});

app.get("/", (req, res) => res.json(`you are in the root dir`));
httpServer.listen(3003, () => {
  console.log("Server is running");
});

// app.get("/api/serialPort/disconnect", (req, res) => {
//   console.log("Attempting to disconnect port");
//   if (!SERIALPORT)
//     return res.status(403).json({
//       status: "FAILED",
//       error: "serialport isn't connected, unauthorized access",
//     });
//   //
//   if (SERIALPORT.isOpen) {
//     SERIALPORT.close();

//     SERIALPORT.on("close", () => {
//       res.status(200).json({ status: "OK", data: "" });
//     });
//   } else {
//     // SEND CONFLICT 409 WASN'T CONNECTED TO BEGIN WITH
//     res.status(200).json({ status: "OK", data: "" });
//   }

//   // unlikely
//   SERIALPORT.on("error", (err) =>
//     res.status(200).json({ status: "FAILED", data: { error: err.message } })
//   );
// });
// TODO: ADD THESE FEATURES

//   SERIALPORT.on("close", () => {
//     console.log(socket.id + "closed port all of a suddent");
//     io.to(socket.id).emit("portClose", "port closed suddently!!!!!!!!!");
//   });

//   SERIALPORT.on("error", () => {
//     io.to(socket.id).emit("portError", "port errored suddently!!!!!!!!!");
//   });

// SERIALPORT.on("open", () => {
//   console.log("portConnected");
//   socket.emit("portStatus", { status: "OK", data: "" });
// });
// SERIALPORT.on("error", (err) =>
//   socket.emit("portStatus", {
//     status: "FAILED",
//     data: { error: err.message },
//   })
// );
