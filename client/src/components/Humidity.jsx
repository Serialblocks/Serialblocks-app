import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
const Humidity = ({ Humidity }) => {
  const { value, timestamp } = { value: 0, timestamp: 0 };
  return (
    <Card className="col-span-3 row-span-2 min-h-[10rem]">
      <CardContent className="relative">
        <CardTitle className="flex items-center gap-1">
          <Droplets className="inline h-6 w-6" /> Humidity
        </CardTitle>

        <span className="mt-4 flex justify-start gap-1">
          <p className="text-3xl font-bold">30</p>
          <span className="text-lg font-medium">%</span>
        </span>

        <div className="absolute right-2 top-2">
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="select-none shadow-md">DHT11 </Badge>
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
