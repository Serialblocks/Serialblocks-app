import {
  BoltIcon,
  SignalIcon,
  BoltSlashIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const Status = ({ isConnected }) => {
  return (
    <Card className="col-span-1 row-span-2">
      <CardContent className="grid grid-cols-2 gap-2">
        <Button
          asChild
          id="portConn"
          size="pill"
          variant={isConnected ? "primary" : ""}
          className="col-span-1 row-span-1"
          color={isConnected ? "teal" : "slate"}
        >
          <span>
            {isConnected ? (
              <>
                <CpuChipIcon className="w-4 h-4 mr-2" />
                COM15
              </>
            ) : (
              <BoltSlashIcon className="w-4 h-4" />
            )}
          </span>
        </Button>

        <Button
          id="socketConn"
          asChild
          size="pill"
          variant="live"
          className="col-span-1"
        >
          <span>
            <SignalIcon className="w-4 h-4 mr-2 animate-pulse" />
            live
          </span>
        </Button>

        <Button size="pill" variant="increase" className="col-span-1" asChild>
          <span>
            <ArrowTrendingUpIcon className="w-4 h-4 mr-2" />
            +12.3%
          </span>
        </Button>

        <Button size="pill" variant="decrease" className="col-span-1" asChild>
          <span>
            <ArrowTrendingDownIcon className="w-4 h-4 mr-2" />
            -12.3%
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export { Status };
