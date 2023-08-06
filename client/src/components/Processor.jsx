import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Cpu } from "lucide-react";
const Processor = ({ Temperature }) => {
  const date = new Date();
  return (
    <Card className="row-span-1 col-span-3 min-h-[10rem]">
      <CardContent className="relative">
        <CardTitle className="flex items-center gap-1">
          <Cpu className="inline h-6 w-6" />
          Processor
        </CardTitle>

        <div className="flex gap-1 justify-start mt-4">
          <p className="text-3xl font-bold">{Temperature.toFixed(2)}</p>
          <span className="font-medium text-lg">°C</span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="relative flex h-3 w-3">
            <span
              key={date.getTime()}
              className="animate-ping repeat-1 absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
            ></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export { Processor };
