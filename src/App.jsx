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
import { Toaster } from "@/components/ui/toaster";
import { useUserStore } from "@/store/UserStore";
import { useSocketStore } from "@/store/SocketStore";

const App = () => {
  const Theme = useUserStore((store) => store.Theme);
  const updateAuth = useUserStore((store) => store.updateAuth);
  const socket = useSocketStore((store) => store.socket);
  const handleConnection = useUserStore((store) => store.handleConnection);
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
    if (isLoggedIn) {
      updateAuth();
      handleConnection({ closeOpenedPort: false, action: "CONNECT" });
    }
    const cleanup = () => {
      if (socket.connected) {
        handleConnection({ closeOpenedPort: true, action: "DISCONNECT" });
      }
    };

    window.addEventListener("beforeunload", cleanup);
    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

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
      <Toaster />
    </div>
  );
};
export default App;
