import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3003";

export const socket = io.connect(URL, {
  transports: ["websocket"],
  autoConnect: false,
});
