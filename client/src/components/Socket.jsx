import { LinkIcon, StopIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

import { Button } from "@/ui/button";

const Socket = () => {
  return (
    <Card className="col-span-1 row-span-2 ">
      <CardContent className="flex flex-col gap-2 ">
        {/* <div className="flex flex-col gap-2"> */}
        <Button className="">
          <LinkIcon className="mr-2 w-4 h-4" />
          connect live
        </Button>
        <Button variant="secondary" className="">
          <XMarkIcon className="mr-2 w-4 h-4" />
          Clear
        </Button>
        {/* </div> */}
        {/* <Button>reset</Button> */}
      </CardContent>
    </Card>
  );
};

export { Socket };
