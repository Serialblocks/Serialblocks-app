import { Card, CardContent } from "@/components/ui/card";
import { Cpu } from "lucide-react";
const Processor = () => {
  return (
    <Card className="row-span-1 col-span-3">
      <CardContent>
        <span className="flex flex-row items-center font-medium gap-1">
          <Cpu className="inline h-6 w-6" />
          <p>Processor</p>
        </span>
        <span className="flex gap-1 justify-start mt-4">
          <p className="text-3xl font-bold">13</p>
          <span className="font-medium text-lg">°C</span>
        </span>
      </CardContent>
    </Card>
  );
};

export { Processor };
