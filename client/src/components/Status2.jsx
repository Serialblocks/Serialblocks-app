import { Badge, BadgeDelta } from "@tremor/react";
import { BoltIcon, SignalIcon, BoltSlashIcon } from "@heroicons/react/24/solid";
import cn from "../utils/classNames";

const Status = ({ colSpan, rowSpan, isPortConn }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 grid-rows-2 gap-2 border-2 border-slate-400/10 bg-white p-2",
        `col-span-${colSpan} row-span-${rowSpan} `
      )}
    >
      <Badge
        id="portConn"
        size="md"
        className="col-span-1 row-span-1"
        color={isPortConn ? "teal" : "slate"}
        icon={isPortConn ? BoltIcon : BoltSlashIcon}
      >
        {isPortConn ? "connected!" : "not connected"}
      </Badge>
      <Badge
        id="socketConn"
        className="col-span-1 row-span-1"
        size="md"
        icon={SignalIcon}
      >
        live
      </Badge>

      <BadgeDelta
        deltaType="moderateIncrease"
        isIncreasePositive={true}
        size="md"
        className="col-span-1 row-span-1"
      >
        +12.3%
      </BadgeDelta>

      <BadgeDelta
        deltaType="moderateIncrease"
        isIncreasePositive={true}
        size="md"
        className="col-span-1 row-span-1"
      >
        +12.3%
      </BadgeDelta>
    </div>
  );
};

export default Status;
