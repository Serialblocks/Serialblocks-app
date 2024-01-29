import { useSerialStore } from "@/store/Serialstore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import Status from "@/components/ui/Status";

const Processor = () => {
  const { value, interval, timestamp } = useSerialStore(
    (store) => store.serialData.processorTemp,
  );
  const isPortOpen = useSerialStore((store) => store.isPortOpen);
  return (
    <Card className="col-span-3 row-span-2 ">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="flex items-center gap-1">
          <Cpu className="inline h-6 w-6" />
          <div>
            Processor
            <p className="text-xs font-normal text-primary/90">
              Internal Temp sensor
            </p>
          </div>
        </CardTitle>
        <div className="flex flex-row items-center gap-2">
          <Status
            value={value}
            timestamp={timestamp}
            interval={interval}
            isPortOpen={isPortOpen}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mt-4 flex justify-start gap-1">
          <p className="font-mono text-3xl font-bold">
            {(parseFloat(value) || 0).toFixed(2)}
          </p>
          <span className="text-lg font-medium">°C</span>
        </div>
      </CardContent>
    </Card>
  );
};

export { Processor };
