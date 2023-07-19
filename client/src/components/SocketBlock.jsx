import { Button } from "@tremor/react";
import { LinkIcon, StopIcon } from "@heroicons/react/24/solid";
import cn from "../utils/classNames";

const SocketBlock = ({ colSpan, rowSpan }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-3 grid-rows-2 gap-2 border-2 border-slate-400/10 bg-white p-2",
        `col-span-${colSpan} row-span-${rowSpan}`
      )}
    >
      <Button className="col-span-2 row-span-1" size="md" icon={LinkIcon}>
        connect live
      </Button>

      <Button
        className="col-span-1 row-span-2 break-words text-center"
        size="md"
      >
        reset
      </Button>

      <Button className="col-span-2 row-span-1" size="md" icon={StopIcon}>
        disconnect
      </Button>
    </div>
  );
};

export default SocketBlock;
