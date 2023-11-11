import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import Status from "@/components/ui/Status";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import LedIcon from "@/assets/led.svg?react";
import { intlFormatDistance } from "date-fns";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

let LED = () => {
  const { value, interval, timestamp } = useStore(
    (store) => store.serialData.LED,
  );
  const [referenceTimestamp, setReferenceTimestamp] = useState(() =>
    Date.now(),
  );
  const dateFormatter = new Intl.DateTimeFormat("en", {
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 2,
  });

  const { writeToPort } = useStore((store) => store.serialActions);
  const isPortOpen = useStore((store) => store.isPortOpen);
  return (
    <Card className="relative col-span-3 row-span-2 ">
      <CardHeader className="items-start p-4 pb-0">
        <CardTitle className="flex flex-col items-start gap-x-2">
          <span className="flex items-center gap-[0.0625rem]">
            <LedIcon
              className={cn(
                "inline h-6 w-6 scale-[1.75]",
                value && "[&_g_path]:fill-yellow-300",
              )}
            />
            LED
          </span>
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
      <CardContent className="flex flex-col justify-between">
        <div className="flex flex-row justify-between">
          <span className="flex justify-start gap-1">
            {value ? "ON" : "OFF"}
          </span>
          {timestamp && (
            <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
              <span>{dateFormatter.format(timestamp)}</span>
              {timestamp < referenceTimestamp
                ? intlFormatDistance(timestamp, referenceTimestamp)
                : "now"}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReferenceTimestamp(Date.now())}
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        <Button onClick={() => isPortOpen && writeToPort("LED_TOGGLE")}>
          Toggle
        </Button>
      </CardContent>
    </Card>
  );
};

export { LED };
