import { useEffect, useState } from "react";

import {
  SerialPort,
  Terminal,
  LineChart,
  Processor,
  RGB,
  LED,
  Humidity,
  Footer,
} from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { socket } from "@/api/socket";
const App = () => {
  const [isPortConn, setIsPortConn] = useState(null);
  const [portConfig, setPortConfig] = useState({
    path: "",
    baudRate: "115200",
  });
  const [serialData, setSerialData] = useState({
    ProcessorTemp: { value: undefined, timestamp: 0 },
    Humidity: { value: undefined, timestamp: 0 },
    Brightness: [{ value: undefined, timestamp: 0 }],
    LED: { value: undefined, timestamp: 0 },
  });
  // cleanup for when the component unmounts/page closes or refreshes
  useEffect(() => {
    socket.on("minpulatedData", (data) => {
      setSerialData((prevData) => {
        // you can mututate the prevData object as long as you are going to return a new object {...prevData}
        // TODO: CHECK IF IT'S OKAY TO USE prevData itself
        for (const key of Object.keys(prevData)) {
          prevData[key] = Array.isArray(prevData[key])
            ? [...prevData[key], data[key]]
            : data[key] || prevData[key];
        }
        return { ...prevData };
      });
    });

    const cleanup = () => {
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
      <div className="mx-auto grid max-w-7xl grid-cols-12 grid-rows-[min_content_1fr] gap-4">
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

        <LineChart Brightness={serialData.Brightness} />
        <Processor ProcessorTemp={serialData.ProcessorTemp} />
        <RGB />
        <LED />
        <Humidity Humidity={serialData.Humidity} />
        <Footer />
      </div>
      <Toaster />
    </>
  );
};
export default App;
