import { ChevronRight, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
    <Card className="relative col-span-6 font-mono row-span-4 bg-terminal text-terminal-foreground">
      <CardContent className="p-0">
        <CardTitle className="tracking-tight flex p-1 items-center gap-1 text-sm/3 rounded-t-lg font-semibold bg-[#DFE0E2] dark:bg-[#333644]">
          <TerminalSquare className="inline w-4 h-4" />
          {!isPortConn ? "TERMINAL" : path}
        </CardTitle>
        <div className="px-1 mt-1 h-36 overflow-y-scroll scrollbar scrollbar-thumb-[#E3E5E9] hover:scrollbar-thumb-[#DBDFE3]  dark:hover:scrollbar-thumb-[#262B41] dark:scrollbar-thumb-[#292D45]">
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad" "ahmad"
          "ahmad" "ahmad" "ahmad"
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
