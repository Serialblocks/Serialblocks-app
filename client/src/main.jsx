import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Input } from "@/components/ui/input";
const Test = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("submitted");
      }}
    >
      <Input type="text" defaultValue="test input on submit enter" />
    </form>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
