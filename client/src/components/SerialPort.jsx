import { useRef, useState } from "react";

import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Spinner } from "@/ui/spinner";
import { ToastAction } from "@/ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

import {
  LinkIcon,
  MagnifyingGlassIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";

import { useToast } from "@/ui/use-toast";

const SerialPort = ({ setIsConnected, isConnected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [portConfig, setPortConfig] = useState({
    path: "",
    baudRate: "",
  });
  const [serialPorts, setSerialPorts] = useState(null);

  const { toast } = useToast();
  const { path, baudRate } = portConfig;

  const SPL = !serialPorts?.length;
  const toastMsg = {
    title: "",
    description: "",
  };

  console.log(serialPorts, "ss");
  // TODO: FIX multiple re-renders on writing the baudrate

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
    }
    toast(toastMsg);
  };

  const selectItems =
    Array.isArray(serialPorts) && serialPorts.length
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
      setIsConnected(status === "OK" ? false : true);
      toastMsg.title = `Disconnected`;
      toastMsg.description = `${path} has been disconnected successfully.`;
    } else {
      toastMsg.title =
        "There was a problem disconnecting the serial port, \n please try again later.";
      toastMsg.description = `${res.statusText} (${res.status})`;
    }
    toast(toastMsg);
    setIsLoading(false);
  };

  const connectPort = async () => {
    setIsLoading(true);
    let res = await fetch(
      `./api/serialPort/connect?path=${path}&baudRate=${baudRate}`
    );
    if (res.ok) {
      let { status, data } = await res.json();
      if (status === "OK") {
        toastMsg.title = `Connected`;
        toastMsg.description = `${path} has been connected successfully.`;
        setIsConnected(true);
      } else {
        toastMsg.title = "Connection problem";
        toastMsg.description = `${data.error}.`;
        setIsConnected(false);
      }
    } else {
      toastMsg.title =
        "There was a problem connecting to serial port, \n please try again later.";
      toastMsg.description = `${res.statusText} (${res.status})`;
      setIsConnected(false);
    }
    toast(toastMsg);
    setIsLoading(false);
  };

  return (
    <Card className="col-span-3 row-span-2">
      <CardContent className="grid grid-cols-5 grid-rows-2 gap-2 ">
        <Select
          value={path}
          onValueChange={(newPath) =>
            setPortConfig((prevConfig) => ({
              ...prevConfig,
              path: newPath,
            }))
          }
          disabled={serialPorts === null}
        >
          <SelectTrigger className="col-span-2">
            <SelectValue placeholder="im not working!" />
          </SelectTrigger>
          {selectItems && <SelectContent>{selectItems}</SelectContent>}
        </Select>

        <Input
          onChange={({ currentTarget: { value: newBaudRate } }) =>
            setPortConfig((prevConfig) => ({
              ...prevConfig,
              baudRate: newBaudRate,
            }))
          }
          value={baudRate}
          disabled={SPL}
          placeholder="baud rate"
          className="col-span-2"
        />

        <Button
          variant="fetch"
          onClick={fetchSerialPorts}
          className="col-span-1"
        >
          <MagnifyingGlassIcon className="mr-2 w-4 h-4" />
          {serialPorts === null ? "load ports" : "another shot"}
        </Button>

        <Button
          className="col-span-5"
          variant="connect"
          onClick={isConnected ? disconnectPort : connectPort}
          disabled={SPL || !baudRate}
          size="md"
        >
          {isLoading && <Spinner />}
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </CardContent>
    </Card>
  );
};

export { SerialPort };
