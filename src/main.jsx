import ReactDOM from "react-dom/client";
import "./index.css";
import App from "@/App";
import { inject } from "@vercel/analytics";
inject();
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
