import { Card, CardContent } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const Humidity = () => {
  return (
    <Card className="row-span-1 col-span-3">
      <CardContent className="relative">
        <span className="flex flex-row items-center font-medium gap-1">
          <Droplets className="inline h-6 w-6" />
          <p>Humidity</p>
        </span>
        <span className="flex gap-1 justify-start mt-4">
          <p className="text-3xl font-bold">30</p>
          <span className="font-medium text-lg">%</span>
        </span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button size="pill" className="absolute right-2 top-2" asChild>
                <div>DHT11</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>DHT IS A SENSOR FOR..</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export { Humidity };
