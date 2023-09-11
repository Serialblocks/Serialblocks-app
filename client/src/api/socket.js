import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3003/";
// autoconnect should be connected true for full capabilities
export const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: false,
});
