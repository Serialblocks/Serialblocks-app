import { ChevronRight, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/api/store";

const dateFormatter = new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 2,
});
const Terminal = () => {
  const serialOutput = useStore((store) => store.serialOutput);
  console.log("~~~~~~~~~~~~~~");
  console.log(serialOutput);
  console.log("~~~~~~~~~~~~~~");

  const connected = useStore((store) => store.connected);
  const { write } = useStore((store) => store.serialActions);

  return (
    <Card className=" col-span-6 row-[span_8_/_span_8] border-none bg-terminal font-mono text-terminal-foreground">
      <CardContent className="flex h-full flex-col p-0">
        <CardTitle className="flex items-center gap-1 rounded-t-lg bg-[#DFE0E2] p-1 text-sm/4 font-semibold tracking-tight dark:bg-[#333644]">
          <TerminalSquare className="inline h-4 w-4" />
          {!connected ? "TERMINAL" : "COM1"}
        </CardTitle>
        <div className="mt-1 max-h-[16rem] flex-1 overflow-y-scroll whitespace-break-spaces px-1 scrollbar scrollbar-thumb-terminal-thumb/80 hover:scrollbar-thumb-terminal-thumb">
          {serialOutput.map(({ value, timestamp }, i) => (
            <p key={i} className="group flex flex-row items-baseline gap-2">
              {value}
              <span className="text-xs text-muted-foreground opacity-0 transition-opacity duration-75 group-hover:opacity-100">
                {dateFormatter.format(timestamp)}
              </span>
            </p>
          ))}
        </div>
        <form
          className="m-1 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            //TODO: IF NOT CONNECTED don't connect again
            write(e.currentTarget.command.value);
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
