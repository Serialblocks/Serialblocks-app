import ReactDOM from "react-dom/client";
import App from "./App";
import { Select, SelectItem } from "@tremor/react";
import { useState } from "react";

const Test = () => {
  const [value, setValue] = useState("");
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectItem value="1">Kilometers</SelectItem>
      <SelectItem value="2">Meters</SelectItem>
      <SelectItem value="3">Miles</SelectItem>
      <SelectItem value="4">Nautical Miles</SelectItem>
    </Select>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
