import { useState } from "react";

import { SerialPort } from "@/components/SerialPort";
import { Socket } from "@/components/Socket";
import { LineChart } from "@/components/LineChart";
import { Processor } from "@/components/Processor";

import { LED } from "@/components/LED";
import { Plant } from "@/components/Plant";
import { Temperature } from "@/components/Temperature";
import { Toaster } from "@/components/ui/toaster";
import { Humidity } from "./components/Humidity";
import { Footer } from "@/components/Footer";

const App = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [serialData, setSerialData] = useState({
    Temperature: 0,
    LDR: 0,
    LED: 0,
  });
  const [serialOutput, setSerialOutput] = useState([]);
  console.log(serialData);
  console.log(serialOutput);
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-4 gap-2 max-w-7xl mx-auto">
        <SerialPort
          setIsConnected={setIsConnected}
          isConnected={isConnected}
          setSerialData={setSerialData}
          setSerialOutput={setSerialOutput}
        />
        <Socket serialOutput={serialOutput} />
        <LineChart />
        <Processor />
        <LED />
        <Temperature />
        <Humidity />
        <Plant />
        <Footer />
      </div>
      <Toaster />
    </>
  );
};
export default App;
