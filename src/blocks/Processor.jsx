import { useStore } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import Status from "@/components/ui/Status";
import { InfoTooltip } from "@/components/ui/InfoTooltip";

const Processor = () => {
  const { value, interval, timestamp } = useStore(
    (store) => store.serialData.processorTemp,
  );
  const isPortOpen = useStore((store) => store.isPortOpen);
  return (
    <Card className="col-span-3 row-span-2 ">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="flex items-center gap-1">
          <Cpu className="inline h-6 w-6" />
          Processor
        </CardTitle>
        <div className="flex flex-row items-center gap-2">
          <Status
            value={value}
            timestamp={timestamp}
            interval={interval}
            isPortOpen={isPortOpen}
          />
          <InfoTooltip>
            requires DHT-11 sensor, <br /> make sure to use{interval}
            <code>"Temperature"</code> in your JSON to get activated
          </InfoTooltip>
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
