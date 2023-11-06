import { useEffect } from "react";
import {
  Terminal,
  LineChart,
  Processor,
  RGB,
  LED,
  Humidity,
  SerialPortForm,
} from "@/blocks";
import { Footer, Notification } from "@/components";
import { useStore } from "@/store/store";

const App = () => {
  const isWsConnected = useStore((store) => store.isWsConnected);
  const { disconnect, closePort } = useStore((store) => store.serialActions);

  // cleanup for when the component unmounts/page closes or refreshes
  useEffect(() => {
    const cleanup = async () => {
      if (isWsConnected) {
        //TODO: Disconnect event listeners
        closePort();
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
// feat: empty func, data Status & debounce rgb color chng
