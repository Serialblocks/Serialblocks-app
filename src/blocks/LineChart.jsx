import Chart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListX, Sun } from "lucide-react";
import { intlFormatDistance } from "date-fns";
import Status from "@/components/ui/Status";
import { useSerialStore } from "@/store/Serialstore";
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import ButtonTooltip from "@/components/ui/ButtonTooltip";
import { Button } from "@/components/ui/button";
const dateFormatter = new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 2,
});
const CustomToolTip = ({
  series,
  seriesIndex,
  dataPointIndex,
  w: {
    globals: { initialSeries },
  },
}) => `
<div class="flex flex-col rounded-lg border bg-background">
<div class="flex flex-row justify-between p-1 gap-4 items-baseline">
<span class="text-xs">${dateFormatter.format(
  initialSeries[seriesIndex].data[dataPointIndex].x,
)}
</span>
<span class="text-xs">${intlFormatDistance(
  initialSeries[seriesIndex].data[dataPointIndex].x,
  Date.now(),
)}</span>
</div>
<hr />
<div class="p-2 flex flex-row items-center justify-between">
<span class="flex gap-1 items-center capitalize leading-snug text-sm"> <span class="h-[0.625rem] w-[0.625rem] shadow-xl bg-primary rounded-full outline outline-1 outline-primary-foreground" ></span>${
  initialSeries[seriesIndex].label
}</span>
<span class="font-bold text-foreground font-mono">
${series[seriesIndex][dataPointIndex]}
</span>
</div>
</div>`;

const LineChart = () => {
  const serialDatumName = "brightness";
  const { interval, data } = useSerialStore(
    (store) => store.serialData[serialDatumName],
  );
  const { x: timestamp = null, y: value = null } = data.slice(-1).at(0);
  const clearSerialDatum = useSerialStore(
    (store) => store.stateActions.clearSerialDatum,
  );
  const isPortOpen = useSerialStore((store) => store.isPortOpen);
  const [num, setNum] = useState(10);
  const options = useMemo(
    () => ({
      noData: {
        text: "No data is available yet",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
      },
      chart: {
        type: "numeric",
        selection: {
          enabled: true,
          type: "x",
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
          autoSelected: "pan",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        fontFamily: "Open Sans, Arial, sans-serif",
        animations: {
          easing: "linear",
          animateGradually: {
            enabled: true,
            speed: interval,
          },
          dynamicAnimation: {
            enabled: true,
            speed: interval,
          },
        },
      },
      grid: {
        show: true,

        position: "back",
      },
      xaxis: {
        type: "numeric",
        range: interval * num,
        lines: {
          show: true,
        },
        yaxis: {
          min: 0,
          max: 200,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
          width: 1,
          position: "back",
          opacity: 0.9,
          stroke: {
            color: "hsl(var(--muted-foreground))",
            width: 1,
            dashArray: 0,
          },
        },
        dropShadow: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          show: false,
        },
      },
      tooltip: {
        followCursor: false,
        custom: CustomToolTip,
      },
      stroke: {
        curve: "smooth",
        width: 3.5,
        colors: "hsl(var(--primary))",
      },
      markers: {
        enabled: true,
        size: !isPortOpen ? 4 : 0,
        colors: "hsl(var(--background))",
        strokeColors: "hsl(var(--primary))",
        strokeWidth: 2.5,
        fillOpacity: 1,
        hover: {
          sizeOffset: !isPortOpen ? 3 : 5,
        },
      },
    }),
    [interval, num, isPortOpen],
  );

  const series = [
    {
      label: serialDatumName,
      data: data.slice(1),
    },
  ];

  return (
    <Card className="relative col-span-6 row-span-5">
      <CardContent className="">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-1 capitalize">
            <Sun className="inline h-6 w-6" />
            <div>
              {serialDatumName}
              <p className="text-xs font-normal text-primary/90">LDR</p>
            </div>
          </CardTitle>
          <div className="flex flex-row items-center gap-2">
            <ButtonTooltip title="Clear Output">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearSerialDatum(serialDatumName)}
                asChild
              >
                <div>
                  <ListX className="inline h-4 w-4" />
                </div>
              </Button>
            </ButtonTooltip>
            <Status
              value={value}
              timestamp={timestamp}
              interval={interval}
              isPortOpen={isPortOpen}
            />
          </div>
        </CardHeader>

        <Chart type="line" options={options} series={series} />
        <Slider
          defaultValue={[3]}
          min={3}
          max={100}
          step={1}
          onValueChange={setNum}
        />
      </CardContent>
    </Card>
  );
};
export { LineChart };
