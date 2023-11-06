import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import Status from "@/components/ui/Status";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { useStore } from "@/store/store";
const Humidity = () => {
  const { value, timestamp, interval } = useStore(
    (store) => store.serialData.humidity,
  );
  const isPortOpen = useStore((store) => store.isPortOpen);
  return (
    <Card className="col-span-3 row-span-2 min-h-[10rem]">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="flex items-center gap-1">
          <Droplets className="inline h-6 w-6" /> Humidity
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
