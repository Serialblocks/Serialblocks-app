import { ChevronRight, TerminalSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Socket = ({ serialOutput }) => {
  const writeOnPort = async (command) => {
    let res = await fetch(`./api/serialPort/write?command=${command}`);
    console.log(res);
  };

  return (
    <Card className="relative col-span-6 row-span-4 bg-terminal text-terminal-foreground">
      <CardContent className="p-0">
        <span className="flex flex-row items-center gap-1 text-sm rounded-t-md font-mono font-semibold bg-[#333644]">
          <TerminalSquare className="ml-1 inline w-4 h-4" />
          <p className="">{true ? "COM15" : "TERMINAL"}</p>
        </span>

        {serialOutput.map((output, i) => (
          <p key={i} className="text-xs">
            {output}
          </p>
        ))}

        <form
          className="flex flex-row gap-2 absolute inset-x-0 bottom-0 p-1"
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
            placeholder="type and press enter"
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

export { Socket };
