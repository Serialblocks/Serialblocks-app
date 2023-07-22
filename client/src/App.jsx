import { Lamp } from "@/components/Lamp";
import { SerialPort } from "@/components/SerialPort";

import { useState } from "react";
import { Socket } from "@/components/Socket";
import { Status } from "@/components/Status";
import { LineChart } from "@/components/LineChart";
import { Gauge } from "@/components/Gauge";
import { Toaster } from "@/ui/toaster";

const App = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [serialData, setSerialData] = useState(null);
  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-2 max-w-7xl m-auto align-middle">
      <SerialPort setIsConnected={setIsConnected} isConnected={isConnected} />
      <Socket />
      <Status />

      <LineChart />
      <Gauge />
      <Lamp />
      <Toaster />
    </div>
  );
};
export default App;
