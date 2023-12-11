import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import Status from "@/components/ui/Status";
import { useStore } from "@/store/Serialstore";
const Humidity = () => {
  const { value, timestamp, interval } = useStore(
    (store) => store.serialData.humidity,
  );
  const isPortOpen = useStore((store) => store.isPortOpen);
  return (
    <Card className="col-span-3 row-span-2 min-h-[10rem]">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="flex items-center gap-1">
          <Droplets className="inline h-6 w-6" />
          <div>
            Humidity
            <p className="text-xs font-normal text-primary/90">DHT11</p>
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
      <CardContent className="">
        <div className="mt-4 flex justify-start gap-1">
          <p className="font-mono text-3xl font-bold">{value || 0}</p>
          <span className="text-lg font-medium">%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export { Humidity };
