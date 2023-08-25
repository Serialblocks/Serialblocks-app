import { useState } from "react";

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
import { socket } from "@/api/socket";
import { Search, SearchCheck, SearchX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SerialPort = ({
  setIsPortConn,
  isPortConn,
  portConfig,
  setPortConfig,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [serialPorts, setSerialPorts] = useState(undefined);
  const { toast } = useToast();
  const { path, baudRate } = portConfig;

  const SPL = serialPorts?.length > 0 && !!path;
  console.log(
    `serialPorts.length > 0: ${serialPorts?.length > 0} && path: ${!!path}`,
  );
  const toastMsg = {
    title: "",
    description: "",
  };

  // console.log(serialPorts, "ss");
  // TODO: FIX multiple re-renders on writing the baudrate
  // TODO:
  const fetchSerialPorts = async () => {
    // try {
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

  const disconnectPort = async () => {
    setIsLoading(true);

    let res = await fetch("./api/serialPort/disconnect");
    if (res.ok) {
      let { status } = await res.json();
      toastMsg.title = `Disconnected`;
      toastMsg.description = `${path} has been Disconnected successfully.`;
      setIsPortConn(status === "OK" ? false : true);
      // disconnect socket
      socket.disconnect();
    } else {
      toastMsg.title =
        "There was a problem disconnecting the serial port, \n please try again later.";
      toastMsg.description = `${res.statusText} (${res.status} ${res.data.error})`;
    }
    toast(toastMsg);
    setIsLoading(false);
  };

  const connectPort = async () => {
    setIsLoading(true);
    //TODO: CHECK PROBLEM WITH QUERY PARAMS AND NOT QUERY ATA IN SERVER
    let res = await fetch(
      `./api/serialPort/connect?path=${path}&baudRate=${baudRate}`,
    );
    console.dir(res);
    if (res.ok) {
      let { status, data } = await res.json();
      if (status === "OK") {
        toastMsg.title = `Connected`;
        toastMsg.description = `${path} has been connected successfully.`;
        setIsPortConn(true);
        // connect socket
        socket.connect();
      } else {
        toastMsg.title = "Connection problem.";
        toastMsg.description = `${data.error}.`;
        setIsPortConn(false);
      }
    } else {
      toastMsg.title =
        "There was a problem connecting to serial port, \n please try again later.";
      toastMsg.description = `${res.statusText} (${res.status})`;
      setIsPortConn(false);
    }
    toast(toastMsg);
    setIsLoading(false);
  };

  return (
    <Card className="col-span-6 row-span-6">
      <CardContent className="grid grid-cols-5 grid-rows-2 gap-2 ">
        <Select
          value={path}
          onValueChange={(newPath) =>
            setPortConfig((prevConfig) => ({
              ...prevConfig,
              path: newPath,
            }))
          }
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
          onBlur={({ currentTarget: { value: newBaudRate } }) => {
            // uncontrolled input
            setPortConfig((prevConfig) => ({
              ...prevConfig,
              baudRate: newBaudRate,
            }));
          }}
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
          variant="default"
          onClick={isPortConn ? disconnectPort : connectPort}
          disabled={!SPL}
          size="md"
        >
          {isLoading && <Spinner />}
          {isPortConn ? "Disconnect" : "Connect"}
        </Button>
      </CardContent>
    </Card>
  );
};

export { SerialPort };
