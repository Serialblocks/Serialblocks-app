import { SignalIcon } from "@heroicons/react/24/solid";
import { Card, CardContent } from "@/components/ui/card";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { SerialMonitor } from "./SerialMonitor";
import { Input } from "@/components/ui/input";
const socket = io.connect("http://localhost:3003", {
  transports: ["websocket"],
  autoConnect: false,
});
const Socket = ({ setSerialData, setSerialOutput }) => {
  const formRef = useRef(null);
  const writeOnPort = async (command) => {
    let res = await fetch(`./api/serialPort/write?command=${command}`);
    console.log(res);
    // if (res.ok) {
    //   let { status, data } = await res.json();
    //   if (status === "OK") {
    //     toastMsg.title = `Connected`;
    //     toastMsg.description = `${path} has been connected successfully.`;
    //     setIsConnected(true);
    //   } else {
    //     toastMsg.title = "Connection problem";
    //     toastMsg.description = `${data.error}.`;
    //     setIsConnected(false);
    //   }
    // } else {
    //   toastMsg.title =
    //     "There was a problem connecting to serial port, \n please try again later.";
    //   toastMsg.description = `${res.statusText} (${res.status})`;
    //   setIsConnected(false);
    // }
    // toast(toastMsg);
    // setIsLoading(false);
  };
  useEffect(() => {
    socket.on("getParsedData", (data) => {
      let serialDataObj = JSON.parse(data);
      setSerialData((prevData) => ({
        ...prevData,
        ...serialDataObj,
      }));
      setSerialOutput((prevOutput) => [...prevOutput.slice(-3), data]);
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
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            writeOnPort(formRef.current.elements.command.value);
          }}
        >
          <Input
            className="col-span-1 row-span-1"
            type="text"
            name="command"
            placeholder="type and press enter"
          />
        </form>
      </CardContent>
    </Card>
  );
};

export { Socket };
