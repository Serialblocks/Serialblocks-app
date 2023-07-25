import { LinkIcon, StopIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const socket = io.connect("http://localhost:3003", {
  transports: ["websocket"],
  autoConnect: false,
});
const Socket = () => {
  useEffect(() => {
    socket.on("getParsedData", (data) => {
      console.log(data);
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
    <Card className="col-span-1 row-span-2 ">
      <CardContent className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-2">
          <Button onClick={() => socket.connect()} className="">
            <LinkIcon className="mr-2 w-4 h-4" />
            connect live
          </Button>
          <Button variant="secondary" className="">
            <XMarkIcon className="mr-2 w-4 h-4" />
            Clear
          </Button>
        </div>
        <Button onClick={() => socket.disconnect()}>Disconect</Button>
      </CardContent>
    </Card>
  );
};

export { Socket };
