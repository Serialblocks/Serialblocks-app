import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
    <Card className="row-span-2 col-span-3 min-h-[10rem]">
      <CardContent className="relative">
        <CardTitle className="flex items-center gap-1">
          <Droplets className="inline h-6 w-6" /> Humidity
        </CardTitle>

        <span className="flex gap-1 justify-start mt-4">
          <p className="text-3xl font-bold">30</p>
          <span className="font-medium text-lg">%</span>
        </span>
        <div className="absolute right-2 top-2">
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger>
                <Button size="pill" className="shadow-md select-none" asChild>
                  <div>DHT11</div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                requires DHT-11 sensor, <br /> make sure to use Temperature in
                your JSON to get activated
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export { Humidity };
