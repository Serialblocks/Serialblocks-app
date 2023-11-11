import {
  ChevronRight,
  Clock,
  MoreHorizontal,
  TerminalSquare,
  Trash,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/store";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { dateFormatter } from "@/lib/utils";

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
  const pathPreview = useStore((store) => store.pathPreview);
  const serialPorts = useStore((store) => store.serialPorts);
  const clearSerialOutput = useStore(
    (store) => store.stateActions.clearSerialOutput,
  );
  return (
    <Card className="col-span-6 row-[span_8_/_span_8] flex flex-col border-none bg-terminal font-mono text-terminal-foreground">
      <CardHeader className="flex flex-row items-center rounded-t-lg bg-terminal-header px-1 py-0 text-sm/4 font-semibold tracking-tight">
        <CardTitle className="flex gap-1">
          <TerminalSquare className="inline h-4 w-4" />
          {isPortOpen ? path : "TERMINAL"}
        </CardTitle>
        <div className="flex flex-row items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clearSerialOutput}>
            <Trash2 className="inline h-5 w-5" />
          </Button>
          <Toggle
            size="sm"
            defaultPressed={false}
            onPressedChange={setTimeStamped}
          >
            <Clock className="inline h-4 w-4" />
          </Toggle>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex basis-full flex-col gap-2 p-0">
        <div className="mt-1 max-h-[15.8125rem] basis-full overflow-y-scroll px-1 text-[0.8rem] scrollbar scrollbar-thumb-terminal-thumb/80 hover:scrollbar-thumb-terminal-thumb">
          {<p>SessionID: {sessionID}</p>}
          {path && Array.isArray(serialPorts) && serialPorts.length > 0 && (
            <pre>
              SerialPort Info
              {JSON.stringify(
                serialPorts.find(
                  (serialPort) => serialPort.path === pathPreview,
                ),
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
          className="m-1 flex flex-row gap-2"
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
19.275;
