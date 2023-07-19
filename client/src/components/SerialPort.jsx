import { Select, SelectItem, TextInput, Button } from "@tremor/react";
import cn from "../utils/classNames";
import Spinner from "./Spinner";
import {
  LinkIcon,
  MagnifyingGlassIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const SerialPort = ({ colSpan, rowSpan, setIsPortConn, isPortConn }) => {
  const [serialPorts, setSerialPorts] = useState([]);
  const [portConnLoader, setPortConnLoader] = useState(false);

  console.log(isPortConn);

  const [path, setPath] = useState("");
  const [baudRate, setBaudRate] = useState("");

  const SPL = !serialPorts?.length;
  console.log(path);

  const fetchSerialPorts = async () => {
    let req = await fetch("./api/listPorts");
    let { data } = await req.json();
    setSerialPorts(data);
  };

  const selectItems = serialPorts.map(
    ({ manufacturer: Mfr, path, serialNumber: SN }) => (
      <SelectItem key={SN} value={path}>
        {path} - {Mfr}
        <tt> {SN}</tt>
      </SelectItem>
    )
  );

  const disconnectPort = async () => {
    let request = await fetch("./api/serialPort/disconnect");
    let { status } = await request.json();
    setIsPortConn(status === "OK" ? false : true);

    // TODO: show error message typically com15 refused to open data.message
  };

  const connectPort = async () => {
    let request = await fetch(
      `./api/serialPort/connect?path=${path}&baudRate=${baudRate}`
    );
    let { status, data } = await request.json();
    setIsPortConn(status === "OK");
    // TODO: handle error message typically com15 refused to open data.message
  };

  return (
    <div
      className={cn(
        "grid grid-cols-5 grid-rows-2 gap-2 border-2 border-slate-400/10 bg-white p-2",
        `col-span-${colSpan} row-span-${rowSpan}`
      )}
    >
      <Select value={path} onValueChange={setPath} className="col-span-2">
        {selectItems}
      </Select>

      <TextInput
        onChange={({ currentTarget: { value } }) => setBaudRate(value)}
        value={baudRate}
        disabled={SPL}
        placeholder="baud rate"
        className="col-span-2"
      />

      <Button
        onClick={fetchSerialPorts}
        icon={MagnifyingGlassIcon}
        className="col-span-1"
      >
        {serialPorts === null ? "load ports" : "search again"}
      </Button>

      <Button
        className="col-span-5"
        onClick={!isPortConn ? connectPort : disconnectPort}
        disabled={SPL || !baudRate}
        icon={!isPortConn && portConnLoader ? Spinner : BoltIcon}
        size="md"
      >
        {isPortConn ? "disconnect" : "connect"}
      </Button>
    </div>
  );
};

export default SerialPort;
