import { ChevronRight, TerminalSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useEffect, useState } from "react";
import { testJSON } from "@/lib/utils";
import { socket } from "@/service/socket";
const writeOnPort = async (command) => {
  let res = await fetch(`./api/serialPort/write?command=${command}`);
  console.log(res);
};

const Terminal = ({ isPortConn, setSerialData, portConfig }) => {
  const [serialOutput, setSerialOutput] = useState([]);

  const { path, baudRate } = portConfig;

  useEffect(() => {
    const onParsedData = (data) => {
      if (testJSON(data)) {
        let serialDataObj = JSON.parse(data);
        setSerialData((prevData) => ({
          ...prevData,
          ...serialDataObj,
          LDR: [...prevData.LDR, serialDataObj.LDR],
          // LDR: [...prevData.LDR.slice(-25), serialDataObj.LDR],
        }));
      }
      setSerialOutput((prevOutput) => [...prevOutput.slice(-100), data]);
    };

    socket.on("getParsedData", onParsedData);
  }, [setSerialData]);

  return (
    <Card className="relative col-span-6 row-span-4 bg-terminal text-terminal-foreground">
      <CardContent className="p-0">
        <span className="flex p-1 items-center gap-1 text-sm/3 rounded-t-lg font-mono font-semibold bg-[#333644]">
          <TerminalSquare className="inline w-4 h-4" />
          <p className="">{!isPortConn ? "TERMINAL" : path}</p>
        </span>
        <div className="px-1 h-36 overflow-y-scroll">
          {serialOutput.map((output, i) => (
            <Fragment key={i}>
              {output}
              <br />
            </Fragment>
          ))}
        </div>
        <form
          className="flex gap-2 p-1"
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
            placeholder="type START and press enter"
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
