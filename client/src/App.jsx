import { useEffect } from "react";
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
import { useStore } from "@/api/store";

const App = () => {
  const connected = useStore((store) => store.connected);
  const { disconnect } = useStore((store) => store.serialActions);

  // cleanup for when the component unmounts/page closes or refreshes
  useEffect(() => {
    const cleanup = () => {
      // on socket disconnection disconnect port with it..
      // or emit to an event that disconnects the port itself
      // NEW: on socket disconnection disconnect port with it and viceversa
      if (connected) {
        //TODO: Disconnect event listeners
        // socket.current.off("getParsedData");
        disconnect();
      }
    };
    window.addEventListener("beforeunload", cleanup);
    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, [connected, disconnect]);

  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-12 grid-rows-[min_content_1fr] gap-4">
        <SerialPort />
        <Terminal />
        <LineChart />
        <Processor />
        <RGB />
        <LED />
        <Humidity />
        <Footer />
      </div>
      <Toaster />
    </>
  );
};
export default App;
