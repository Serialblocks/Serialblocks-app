import { TextInput, Button } from "@tremor/react";
import { LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SerialPort = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <TextInput placeholder="port name" />
        <TextInput placeholder="baud rate" />
        <Button size="xs" icon={MagnifyingGlassIcon}>
          check ports
        </Button>
      </div>
      <Button icon={LinkIcon} size="md">
        connect
      </Button>
    </div>
  );
};

export default SerialPort;
