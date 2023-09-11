import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import { Test } from "@/test";
import { socket } from "@/api/socket";
ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <button onClick={() => socket.connect()}>connect</button>
    <button onClick={() => socket.disconnect()}>disconnect</button>
  </div>,
);
