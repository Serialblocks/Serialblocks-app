import {
  ChevronsDown,
  Clock,
  ListX,
  MoreHorizontal,
  TerminalSquare,
  Wand2,
} from "lucide-react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSerialStore } from "@/store/Serialstore";
import { Toggle } from "@/components/ui/toggle";
import { useCallback, useEffect, useMemo, useState } from "react";
import { dateFormatter } from "@/lib/utils";
import ButtonTooltip from "@/components/ui/ButtonTooltip";
import SerialSettings from "@/components/SerialSettings";
import { useUserStore } from "@/store/UserStore";
import TerminalForm from "@/components/TerminalForm";

const DateNow = Date.now();
const Terminal = () => {
  const [timestamped, setTimeStamped] = useState(false);
  const DisplayName = useUserStore((store) => store.DisplayName);
  const serialOutput = useSerialStore((store) => store.serialOutput);
  const isPortOpen = useSerialStore((store) => store.isPortOpen);
  const { path } = useUserStore((store) => store.portConfig);
  const pathPreview = useSerialStore((store) => store.pathPreview);
  const serialPorts = useSerialStore((store) => store.serialPorts);
  const clearSerialOutput = useSerialStore(
    (store) => store.stateActions.clearSerialOutput,
  );
  const { writeMockData } = useSerialStore((store) => store.serialActions);

  const [isWritingMockData, setIsWritingMockData] = useState(false);
  const toggleWritingMockData = useMemo(() => writeMockData(), []);
  const handleWritingMockData = useCallback(() => {
    const isCurrentlyWriting = toggleWritingMockData();
    setIsWritingMockData(isCurrentlyWriting);
  }, []);

  useEffect(() => {
    if (!isPortOpen && isWritingMockData) {
      toggleWritingMockData();
      setIsWritingMockData(false);
    }
  }, [isPortOpen, isWritingMockData]);
  return (
    <Card className="col-span-6 row-[span_8_/_span_8] flex flex-col border-none bg-terminal font-mono text-terminal-foreground">
      <CardHeader className="flex flex-row items-center rounded-t-lg bg-terminal-header px-1 py-0 text-sm/4 font-semibold tracking-tight">
        <CardTitle className="flex gap-1">
          <TerminalSquare className="inline h-4 w-4" />
          {isPortOpen ? path : "TERMINAL"}
        </CardTitle>
        <div className="flex flex-row items-center gap-2">
          <ButtonTooltip title="Clear Output">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSerialOutput}
              asChild
            >
              <div>
                <ListX className="inline h-4 w-4" />
              </div>
            </Button>
          </ButtonTooltip>
          <ButtonTooltip title="Toggle Timestamp">
            <Toggle
              size="sm"
              pressed={timestamped}
              onPressedChange={setTimeStamped}
              asChild
            >
              <div>
                <Clock className="h-4 w-4" />
              </div>
            </Toggle>
          </ButtonTooltip>
          <ButtonTooltip title="Simulate">
            <Toggle
              size="sm"
              pressed={isWritingMockData}
              onPressedChange={handleWritingMockData}
              disabled={!isPortOpen}
              asChild
            >
              <div>
                <Wand2 className="h-4 w-4" />
              </div>
            </Toggle>
          </ButtonTooltip>
          <ButtonTooltip title="Toggle Autoscroll">
            <Toggle size="sm" asChild>
              <div>
                <ChevronsDown className="h-4 w-4" />
              </div>
            </Toggle>
          </ButtonTooltip>
          <SerialSettings>
            <ButtonTooltip title="Settings" asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={isPortOpen}
                className="hover:bg-transparent"
                asChild
              >
                <div>
                  <MoreHorizontal className="inline h-4 w-4" />
                </div>
              </Button>
            </ButtonTooltip>
          </SerialSettings>
        </div>
      </CardHeader>
      <CardContent className="flex max-h-[21.325rem] basis-full flex-col gap-2 p-0">
        <div className="mt-1 basis-full overflow-y-scroll px-1 text-[0.8rem] scrollbar scrollbar-thumb-terminal-thumb/80 hover:scrollbar-thumb-terminal-thumb">
          <div
            data-timestamped={timestamped}
            className="group flex flex-row items-baseline gap-2"
          >
            {DisplayName
              ? `Hello ${DisplayName}, Welcome to SerialBlocks`
              : "Welcome to SerialBlocks"}
            <span className="text-xs text-muted-foreground opacity-0 transition-opacity duration-75 group-hover:opacity-100 group-data-[timestamped=true]:opacity-100">
              {dateFormatter.format(DateNow)}
            </span>
          </div>
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
            <div
              data-timestamped={timestamped}
              key={i}
              className="group flex flex-row items-baseline gap-2"
            >
              {value}
              <span className="text-xs text-muted-foreground opacity-0 transition-opacity duration-75 group-hover:opacity-100 group-data-[timestamped=true]:opacity-100">
                {dateFormatter.format(timestamp)}
              </span>
            </div>
          ))}
        </div>
        <TerminalForm />
      </CardContent>
    </Card>
  );
};

export { Terminal };
