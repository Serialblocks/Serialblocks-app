import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SketchPicker } from "react-color";
import { useState } from "react";

function Meow() {
  const [color, setColor] = useState({});
  console.log(Array.from(color).join(","));
  const [hidden, setHidden] = useState(false);
  const pickerStyle = {
    default: {
      picker: {
        position: "absolute",
        bottom: "30px",
        left: "100px",
      },
    },
  };
  return (
    <div className="App" style={{ background: color }}>
      <div className="container">
        {hidden && (
          <SketchPicker
            styles={pickerStyle}
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.rgb)}
          />
        )}

        <button onClick={() => setHidden(!hidden)}>
          {hidden ? "Close Color Picker" : "Open Color Picker"}
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
