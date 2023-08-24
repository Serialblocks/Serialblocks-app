import { ChevronRight, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useEffect, useRef, useState } from "react";
import { testJSON } from "@/lib/utils";
import { socket } from "@/api/socket";
const writeOnPort = async (command) => {
  let res = await fetch(`./api/serialPort/write?command=${command}`);
  console.log(res);
};

const Terminal = ({ isPortConn, setSerialData, portConfig }) => {
  const [serialOutput, setSerialOutput] = useState([
    { value: 0, timestamp: 0 },
  ]);
  const { path, baudRate } = portConfig;

  useEffect(() => {
    const onParsedData = (data) => {
      if (testJSON(data)) {
        let serialDataObj = JSON.parse(data);

        setSerialData((prevData) => {
          for (const [key, value] of Object.entries(serialDataObj)) {
            prevData[key] = Array.isArray(prevData[key])
              ? [...prevData[key], { value, timestamp: Date.now() }]
              : {
                  value: value,
                  timestamp: Date.now(),
                };
          }
          return JSON.parse(JSON.stringify(prevData));
          // LDR: [...prevData.LDR.slice(-25), serialDataObj.LDR],
        });
      }

      // PROBLEM OCCURS WHEN DATA IS A JSON OF LED STATUS..
      setSerialOutput((prevOutput) => [
        ...prevOutput,
        { value: data, timestamp: Date.now() },
      ]);
    };

    // on disconnection       // divRef.current.scrollTop = divRef.current.scrollHeight;

    socket.on("getParsedData", onParsedData);
    socket.on("portClose", (data) => alert(data));
    socket.on("portError", (data) => alert(data));
  }, [setSerialData]);

  return (
    <Card className=" col-span-6 row-[span_8_/_span_8] border-none bg-terminal font-mono text-terminal-foreground">
      <CardContent className="flex h-full flex-col p-0">
        <CardTitle className="flex items-center gap-1 rounded-t-lg bg-[#DFE0E2] p-1 text-sm/4 font-semibold tracking-tight dark:bg-[#333644]">
          <TerminalSquare className="inline h-4 w-4" />
          {!isPortConn ? "TERMINAL" : path}
        </CardTitle>
        <div className="mt-1 max-h-[13.25rem] flex-1 overflow-y-scroll whitespace-break-spaces px-1 scrollbar scrollbar-thumb-terminal-thumb/80 hover:scrollbar-thumb-terminal-thumb">
          {serialOutput.map(({ value, timestamp }, i) => (
            <Fragment key={i}>{value + "\n"}</Fragment>
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
