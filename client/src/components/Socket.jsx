import { SignalIcon } from "@heroicons/react/24/solid";
import { Card, CardContent } from "@/components/ui/card";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { SerialMonitor } from "./SerialMonitor";
import { Input } from "@/components/ui/input";
const socket = io.connect("http://localhost:3003", {
  transports: ["websocket"],
  autoConnect: false,
});
const Socket = ({ setSerialData }) => {
  useEffect(() => {
    socket.on("getParsedData", (data) => {
      let dataObj = JSON.parse(data);
      setSerialData((prevData) => ({
        ...prevData,
        ...dataObj,
        OutputArr: [...prevData.OutputArr.slice(-3), data],
      }));
    });

    socket.on("connect", () => {
      console.log("connected");
      //live tag
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      //NOT LIVE
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Card className="col-span-6 row-span-4">
      <CardContent className="grid grid-cols-3 grid-rows-2 gap-2">
        <Button
          onClick={() => socket.connect()}
          className="col-span-1 row-span-1"
        >
          <SignalIcon className="mr-2 w-5 h-5" />
          Live
        </Button>
        <SerialMonitor />
        <Input
          className="col-span-1 row-span-1"
          type="text"
          placeholder="type and press enter"
        />
      </CardContent>
    </Card>
  );
};

export { Socket };
