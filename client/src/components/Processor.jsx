import { useStore } from "@/api/store";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Cpu } from "lucide-react";
const Processor = () => {
  const { value, timestamp } = useStore(
    (store) => store.serialData.ProcessorTemp,
  );
  return (
    <Card className="col-span-3 row-span-2 min-h-[10rem]">
      <CardContent className="relative">
        <CardTitle className="flex items-center gap-1">
          <Cpu className="inline h-6 w-6" />
          Processor
        </CardTitle>

        <div className="mt-4 flex justify-start gap-1">
          <p className="text-3xl font-bold">{parseFloat(value)}</p>
          <span className="text-lg font-medium">°C</span>
        </div>

        <div className="absolute right-4 top-4">
          <span className="relative flex h-3 w-3">
            <span
              key={timestamp}
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 repeat-1"
            ></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export { Processor };
