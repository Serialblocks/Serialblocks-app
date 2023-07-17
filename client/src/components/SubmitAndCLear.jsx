import { Button } from "@tremor/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const SubmitAndCLear = () => {
  return (
    <div className="flex flex-col justify-around gap-4">
      <Button size="md">submit</Button>
      <Button icon={XMarkIcon} size="md">
        clear
      </Button>
    </div>
  );
};

export default SubmitAndCLear;
