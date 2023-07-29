import { useState } from "react";

import { SerialPort } from "@/components/SerialPort";
import { Socket } from "@/components/Socket";
import { LineChart } from "@/components/LineChart";
import { MCInternalTemp } from "@/components/MCInternalTemp";

import { LED } from "@/components/LED";
import { Plant } from "@/components/Plant";
import { Temperature } from "@/components/Temperature";
import { Toaster } from "@/components/ui/toaster";
import { Humidity } from "./components/Humidity";
import { Footer } from "@/components/Footer";

const App = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [serialData, setSerialData] = useState(null);
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-4 gap-2 max-w-7xl m-auto align-middle">
        <SerialPort setIsConnected={setIsConnected} isConnected={isConnected} />
        <Socket />
        <LineChart />
        <MCInternalTemp />
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
