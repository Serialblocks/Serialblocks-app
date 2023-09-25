import { ChevronRight, Clock, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useEffect, useRef, useState } from "react";
import { testJSON, dateFormatter } from "@/lib/utils";
import { socket } from "@/api/socket";
import { Toggle } from "@/components/ui/toggle";
const writeOnPort = async (command) => {
  let res = await fetch(`./api/serialPort/write?command=${command}`);
};

const Terminal = ({ isPortConn, setSerialData, portConfig }) => {
  const [serialOutput, setSerialOutput] = useState([
    { value: "WELCOME TO THE SUMMONERS RIFT..", timestamp: Date.now() },
  ]);
  const { path, baudRate } = portConfig;
  const [timestamped, setTimeStamped] = useState(false);
  useEffect(() => {
    // on disconnection       // divRef.current.scrollTop = divRef.current.scrollHeight;
    socket.on("rawData", (data) => {
      console.log(data);
      setSerialOutput((prevOutput) => [...prevOutput, JSON.parse(data)]);
    });
    socket.on("portClose", (data) => alert(data));
    socket.on("portError", (data) => alert(data));
  }, [setSerialData]);

  return (
    <Card className=" col-span-6 row-[span_8_/_span_8] border-none bg-terminal font-mono text-terminal-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 rounded-t-lg bg-terminal-header p-0 text-sm/4 font-semibold tracking-tight">
        <span className="ml-1 flex gap-1">
          <TerminalSquare className="inline h-4 w-4" />
          {!isPortConn ? "TERMINAL" : path}
        </span>
        <Toggle
          size="sm"
          defaultPressed={false}
          onPressedChange={setTimeStamped}
          className="group mr-[1px] rounded-none rounded-tr-md p-1"
        >
          <Clock className="inline h-4 w-4" />
        </Toggle>
      </CardHeader>
      <CardContent className="flex h-full flex-col p-0">
        <div className="mt-1 max-h-[16rem] flex-1 overflow-y-scroll whitespace-break-spaces px-1 scrollbar scrollbar-thumb-terminal-thumb/80 hover:scrollbar-thumb-terminal-thumb">
          {serialOutput.map(({ value, timestamp }) => (
            <span
              key={timestamp}
              data-timestamped={timestamped}
              className="group flex items-baseline gap-2"
            >
              {value}
              <span className="text-xs text-muted-foreground opacity-0 transition-opacity duration-75 group-hover:opacity-100 group-data-[timestamped=true]:opacity-100">
                {dateFormatter.format(timestamp)}
              </span>
            </span>
          ))}
        </div>
        <form
          className="m-1 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            //TODO: IF NOT CONNECTED don't connect again

            writeOnPort(e.currentTarget.command.value);
            e.currentTarget.reset();
          }}
        >
          <Input
            className="h-8 px-2"
            type="text"
            name="command"
            placeholder="Enter your command (e.g., LED_TOGGLE)"
          />
          <Button className="h-8" size="sm">
            <ChevronRight className="mr-2 h-5 w-5" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { Terminal };
