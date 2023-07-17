import { Badge, BadgeDelta } from "@tremor/react";
import { SignalIcon } from "@heroicons/react/24/solid";

const Status = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Badge size="xl" icon={SignalIcon}>
        live
      </Badge>
      <BadgeDelta
        deltaType="moderateIncrease"
        isIncreasePositive={true}
        size="xl"
      >
        +12.3%
      </BadgeDelta>
    </div>
  );
};

export default Status;
