import "./index.css";

import SerialPort from "./components/SerialPort";
import SocketBlock from "./components/socketBlock";
import Status2 from "./components/Status2";

import DGView from "./components/DGView";
import DummyGraph from "./components/DummyGraph";
import Lamp from "./components/Lamp";
import { useState } from "react";

const App = () => {
  const [isPortConn, setIsPortConn] = useState(null);

  return (
    <div className="grid grid-cols-5 grid-rows-[min-content_1fr] gap-2 max-w-6xl [&>*]:rounded-md m-auto">
      <SerialPort
        colSpan="3"
        rowSpan="2"
        setIsPortConn={setIsPortConn}
        isPortConn={isPortConn}
      />
      <SocketBlock colSpan="1" rowSpan="2" />
      <Status2 colSpan="1" rowSpan="2" isPortConn={isPortConn} />

      <DummyGraph colSpan="3" rowSpan="2" />
      <DGView colSpan="2" rowSpan="1" />
      <Lamp colSpan="2" rowSpan="1" />
    </div>
  );
};
export default App;
