import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";

import { Card, CardContent } from "@/components/ui/card";
import { Search, SearchCheck, SearchX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/api/store";
import { useState } from "react";
const toastMsg = {
  title: "",
  description: "",
};
const SerialPort = () => {
  const { toast } = useToast();
  //TODO: move isLoading and serialPorts to zustand and show them in terminal
  // const isLoading = useStore((store) => store.isLoading);
  // const serialPorts = useStore((store) => store.serialPorts);

  const [isLoading, setIsLoading] = useState(false);
  const [serialPorts, setSerialPorts] = useState(undefined);

  const { path, baudRate } = useStore((store) => store.config);
  const connected = useStore((store) => store.connected);
  const { connect, disconnect } = useStore((store) => store.serialActions);
  const { updateConfig } = useStore((store) => store.stateActions);

  const SPL = serialPorts?.length > 0 && !!path;

  const fetchSerialPorts = async () => {
    // try {
    setIsLoading(true);
    let res = await fetch("./api/listPorts");
    if (res.ok) {
      let { data } = await res.json();
      if (data.length > 0) {
        toastMsg.title = `Found ${data.length} port(s) available.`;
        toastMsg.description = "select the one you want from the dropdown!";
      } else {
        toastMsg.title = "There are no ports connected at the moment.";
        toastMsg.description = "Don't fret!, give it another shot";
      }
      setSerialPorts(data);
    } else {
      toastMsg.title =
        "There was a problem with locating connected serial ports, \n please try again later.";
      toastMsg.description = `${res.statusText} (${res.status})`;
      setSerialPorts(null);
    }
    setIsLoading(false);
    toast(toastMsg);
  };

  //real serialports
  const selectItems =
    Array.isArray(serialPorts) && serialPorts?.length
      ? serialPorts.map(({ manufacturer: Mfr, path, serialNumber: SN }) => (
          <SelectItem key={SN} value={path}>
            {path} - {Mfr}
            <tt> {SN}</tt>
          </SelectItem>
        ))
      : "";

  return (
    <Card className="col-span-6 row-span-6">
      <CardContent className="grid grid-cols-5 grid-rows-2 gap-2 ">
        <Select
          value={path}
          onValueChange={(newPath) => updateConfig({ path: newPath })}
          disabled={!serialPorts}
        >
          <SelectTrigger className="col-span-2">
            <SelectValue placeholder="im not working!" />
          </SelectTrigger>
          <SelectContent>
            {selectItems && (
              <SelectGroup>
                <SelectLabel>SerialPorts</SelectLabel>
                {selectItems}
              </SelectGroup>
            )}
          </SelectContent>
        </Select>

        <Input
          value={baudRate}
          onChange={
            ({ currentTarget: { value: newBaudRate } }) =>
              updateConfig({ baudRate: newBaudRate })
            // console.log(newBaudRate)
          }
          disabled={!SPL}
          placeholder="baud rate"
          className="col-span-2"
        />

        <Button
          variant="outline"
          onClick={fetchSerialPorts}
          className="col-span-1 px-2"
        >
          {serialPorts === undefined ? (
            <Search className="mr-2 h-4 w-4" />
          ) : serialPorts?.length > 0 ? (
            <SearchCheck className="mr-2 h-4 w-4" />
          ) : (
            <SearchX className="mr-2 h-4 w-4" />
          )}
          List Ports
        </Button>

        <Button
          className="col-span-5"
          onClick={connected ? disconnect : connect}
          disabled={!SPL}
          size="md"
        >
          {isLoading && <Spinner />}
          {connected ? "Disconnect" : "Connect"}
        </Button>
      </CardContent>
    </Card>
  );
};

export { SerialPort };
