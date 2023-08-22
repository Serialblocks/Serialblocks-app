import { ChevronRight, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useEffect, useRef, useState } from "react";
import { testJSON } from "@/lib/utils";
import { socket } from "@/api/socket";
import axios from "axios"; //
const writeOnPort = async (command) => {
  let res = await axios.get(`./api/serialPort/write?command=${command}`);
  console.log(res);
};

const Terminal = ({ isPortConn, setSerialData, portConfig }) => {
  const [serialOutput, setSerialOutput] = useState([]);
  const { path, baudRate } = portConfig;

  useEffect(() => {
    const onParsedData = (data) => {
      console.log(data);

      if (testJSON(data)) {
        let serialDataObj = JSON.parse(data);
        setSerialData((prevData) => ({
          ...prevData,
          ...serialDataObj,
          LDR: [...prevData.LDR, serialDataObj.LDR],
          // LDR: [...prevData.LDR.slice(-25), serialDataObj.LDR],
        }));
      }
      setSerialOutput((prevOutput) => [...prevOutput, data]);
      // divRef.current.scrollTop = divRef.current.scrollHeight;
    };

    socket.on("getParsedData", onParsedData);
    socket.on("portClose", (data) => alert(data));
    socket.on("portError", (data) => alert(data));
  }, [setSerialData]);

  return (
    <Card className=" border-none col-span-6 font-mono row-[span_8_/_span_8] bg-terminal text-terminal-foreground">
      <CardContent className="p-0 flex flex-col h-full">
        <CardTitle className="tracking-tight flex p-1 items-center gap-1 text-sm/3 rounded-t-lg font-semibold bg-[#DFE0E2] dark:bg-[#333644]">
          <TerminalSquare className="inline w-4 h-4" />
          {!isPortConn ? "TERMINAL" : path}
        </CardTitle>
        <div className="px-1 mt-1 flex-1 overflow-y-scroll scrollbar hover:scrollbar-thumb-terminal-thumb scrollbar-thumb-terminal-thumb/80">
          {serialOutput.map((output, i) => (
            <Fragment key={i}>
              {output}
              <br />
            </Fragment>
          ))}
        </div>
        <form
          className="flex gap-2 m-1"
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
            <ChevronRight className="mr-2 w-5 h-5" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { Terminal };
