import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const url =
  process.env.NODE_ENV === "production"
    ? undefined
    : "http://192.168.1.180:3003/";
// : "https://true-areas-swim.loca.lt/";

// by default HTTP long-polling connection is established first, and then an upgrade to WebSocket is attempted.
// this makes sure that websocket connection is the default and fallsback to HTTP long-polling.
// this should so
// cors: {
//   origin: "*",
//   methods: ["GET", "POST"],
// },
export const initialAuth = {
  sessionID: uuidv4(),
  path: "path/to/port",
  baudRate: 0,
  delimiter: "\r\n",
  EOL: "\r\n",
  dataBits: 8,
  lock: true,
  stopBits: 1,
  parity: "",
  rtscts: false,
  xon: false,
  xoff: false,
  xany: false,
  hupcl: true,
};
export const socket = io(url, {
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnectionAttempts: 5,
  auth: initialAuth,
  // defaults
});
