import { useEffect, useLayoutEffect } from "react";
import {
  Terminal,
  LineChart,
  Processor,
  RGB,
  LED,
  Humidity,
  SerialPortForm,
} from "@/blocks";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Notification from "@/components/Notification";
import { useStore } from "@/store/Serialstore";
import { useUserStore } from "@/store/UserStore";
const App = () => {
  const isWsConnected = useStore((store) => store.isWsConnected);
  const { disconnect, closePort } = useStore((store) => store.serialActions);
  const Theme = useUserStore((store) => store.Theme);
  const isLoggedIn = useUserStore((store) => store.isLoggedIn);

  useLayoutEffect(() => {
    const documentClassList = document.documentElement.classList;
    if (Theme === "dark") {
      if (!documentClassList.contains("dark")) documentClassList.add("dark");
    } else {
      if (documentClassList.contains("dark")) documentClassList.remove("dark");
    }
  }, [Theme]);
  // cleanup for when the component unmounts/page closes or refreshes
  useEffect(() => {
    const cleanup = () => {
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
  }, [isWsConnected]);

  return (
    <div className="container flex flex-col gap-y-8 rounded-lg border border-border p-0">
      <Header />
      <main className="container my-auto grid grid-cols-12 grid-rows-[min_content_1fr] gap-6">
        <SerialPortForm />
        <Terminal />
        <LineChart />
        <Processor />
        <RGB />
        <LED />
        <Humidity />
        <Footer />
      </main>
      <Notification />
    </div>
  );
};
export default App;
