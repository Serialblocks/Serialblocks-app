import { useEffect } from "react";
import {
  Terminal,
  LineChart,
  Processor,
  RGB,
  LED,
  Humidity,
  Footer,
} from "@/components";
import { useStore } from "@/api/store";
import Notification from "@/components/Notification";
import { SerialPortForm } from "@/components/SerialPortForm";

const App = () => {
  const isWsConnected = useStore((store) => store.isWsConnected);
  const { disconnect, closePort } = useStore((store) => store.serialActions);

  // cleanup for when the component unmounts/page closes or refreshes
  useEffect(() => {
    const cleanup = async () => {
      if (isWsConnected) {
        //TODO: Disconnect event listeners
        closePort();
        await new Promise((res) => setTimeout(res, 1000, "success"));
        disconnect();
      }
    };
    window.addEventListener("beforeunload", cleanup);
    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, [isWsConnected, disconnect, closePort]);

  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-12 grid-rows-[min_content_1fr] gap-4">
        <SerialPortForm />
        <Terminal />
        <LineChart />
        <Processor />
        <RGB />
        <LED />
        <Humidity />
        <Footer />
      </div>
      <Notification />
    </>
  );
};
export default App;
