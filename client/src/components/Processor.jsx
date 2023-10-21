import { useStore } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import Status from "@/components/ui/Status";
const Processor = () => {
  const { value, timestamp } = useStore(
    (store) => store.serialData.ProcessorTemp,
  );
  const isPortOpen = useStore((store) => store.isPortOpen);
  return (
    <Card className="col-span-3 row-span-2 min-h-[10rem]">
      <CardContent className="relative">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <Cpu className="inline h-6 w-6" />
            Processor
          </CardTitle>
          <Status value={value} timestamp={timestamp} isPortOpen={isPortOpen} />
        </CardHeader>

        <div className="mt-4 flex justify-start gap-1">
          <p className="text-3xl font-bold">{parseFloat(value)}</p>
          <span className="text-lg font-medium">°C</span>
        </div>
      </CardContent>
    </Card>
  );
};

export { Processor };
