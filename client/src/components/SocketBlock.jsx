import { Button } from "@tremor/react";
import { LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SocketBlock = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <Button size="md" icon={MagnifyingGlassIcon}>
          live test
        </Button>
        <Button size="md" icon={MagnifyingGlassIcon}>
          stop test
        </Button>
      </div>

      <Button icon={LinkIcon} size="md">
        clear graph and data grid view
      </Button>
    </div>
  );
};

export default SocketBlock;
