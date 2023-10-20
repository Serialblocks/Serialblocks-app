import { ChevronRight, Clock, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/api/store";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 2,
});
// TODO: LOCK SCROLL
// const sheko = window.getComputedStyle($0).height;
// $0.style.maxHeight = sheko;
//https://stackoverflow.com/questions/45395184/css-grid-row-max-height-1fr-scroll-content
const Terminal = () => {
  const [timestamped, setTimeStamped] = useState(false);

  const serialOutput = useStore((store) => store.serialOutput);
  const { writeToPort } = useStore((store) => store.serialActions);
  const isPortOpen = useStore((store) => store.isPortOpen);
  const sessionID = useStore((store) => store.sessionID);
  const { path } = useStore((store) => store.config);
  const serialPorts = useStore((store) => store.serialPorts);

  return (
    <Card className=" col-span-6 row-[span_8_/_span_8] max-h-[19.5rem] border-none bg-terminal font-mono text-terminal-foreground">
      <CardContent className="flex h-full flex-col p-0">
        <CardHeader className="flex flex-row items-center gap-1 rounded-t-lg bg-[#DFE0E2] p-1 text-sm/4 font-semibold tracking-tight dark:bg-[#333644]">
          <CardTitle>
            <TerminalSquare className="inline h-4 w-4" />
            {isPortOpen ? path : "TERMINAL"}
          </CardTitle>
          <Toggle
            size="sm"
            defaultPressed={false}
            onPressedChange={setTimeStamped}
            className="group/datastate mr-[1px] rounded-none rounded-tr-md p-1"
          >
            <Clock className="inline h-4 w-4" />
          </Toggle>
        </CardHeader>
        <div className="mt-1 basis-full overflow-y-scroll px-1 text-sm scrollbar scrollbar-thumb-terminal-thumb/80 hover:scrollbar-thumb-terminal-thumb">
          {<p>SessionID: {sessionID}</p>}
          {path && Array.isArray(serialPorts) && (
            <pre>
              SerialPort Info
              {JSON.stringify(
                serialPorts.find((serialPort) => serialPort.path === path),
                null,
                1,
              )?.slice(1, -1)}
            </pre>
          )}
          {serialOutput.map(({ value, timestamp }, i) => (
            <p
              data-timestamped={timestamped}
              key={i}
              className="group flex flex-row items-baseline gap-2"
            >
              {value}
              <span className="text-xs text-muted-foreground opacity-0 transition-opacity duration-75 group-hover:opacity-100 group-data-[timestamped=true]:opacity-100">
                {dateFormatter.format(timestamp)}
              </span>
            </p>
          ))}
        </div>
        <form
          className="m-1 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            writeToPort(e.currentTarget.command.value);
            e.currentTarget.reset();
          }}
        >
          <Input
            className="h-8 px-2"
            type="text"
            name="command"
            disabled={!isPortOpen}
            placeholder={
              isPortOpen
                ? "Enter your command (e.g., LED_TOGGLE)"
                : "Connect to a port first to use the terminal."
            }
          />
          <Button
            type="submit"
            disabled={!isPortOpen}
            className="h-8"
            size="sm"
          >
            <ChevronRight className="mr-2 h-5 w-5" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { Terminal };
