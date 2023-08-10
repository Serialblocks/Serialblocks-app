import { useEffect, useState } from "react";

import {
  SerialPort,
  Terminal,
  LineChart,
  Processor,
  LED,
  Temperature,
  Humidity,
  Footer,
} from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { socket } from "@/api/socket";
const App = () => {
  const [isPortConn, setIsPortConn] = useState(null);
  const [portConfig, setPortConfig] = useState({
    path: "",
    baudRate: "",
  });
  const [serialData, setSerialData] = useState({
    Temperature: 0,
    LDR: [],
    LED: 0,
  });
  // cleanup for when the component unmounts/page closes or refreshes
  useEffect(() => {
    const cleanup = () => {
      // TODO:IF SOCKET CONNECTED / IF PORT CONNECTED
      if (isPortConn) {
        fetch("./api/serialPort/disconnect");
      }
      if (socket.connected) {
        socket.off("getParsedData");
        socket.disconnect();
      }
    };
    window.addEventListener("beforeunload", cleanup);

    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, [isPortConn]);

  return (
    <>
      <div className="grid grid-cols-12 grid-rows-[min_content_1fr] gap-4 max-w-7xl mx-auto">
        <SerialPort
          setIsPortConn={setIsPortConn}
          isPortConn={isPortConn}
          portConfig={portConfig}
          setPortConfig={setPortConfig}
        />
        <Terminal
          isPortConn={isPortConn}
          setSerialData={setSerialData}
          portConfig={portConfig}
        />

        <LineChart LDR={serialData.LDR} />
        <Processor Temperature={serialData.Temperature} />

        <LED />
        <Temperature />
        <Humidity />
        <Footer />
      </div>
      <Toaster />
    </>
  );
};
export default App;
