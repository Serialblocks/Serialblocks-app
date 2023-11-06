import Chart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Trash2 } from "lucide-react";
import { intlFormatDistance } from "date-fns";
import Status from "@/components/ui/Status";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { useStore } from "@/store/store";
import { useMemo, useState } from "react";
const dateFormatter = new Intl.DateTimeFormat("en", {
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 2,
});
const LineChart = () => {
  const { interval, data } = useStore((store) => store.serialData.brightness);
  const { x: timestamp = null, y: value = null } = data.slice(-1).at(0);
  const clearSerialDatum = useStore(
    (store) => store.stateActions.clearSerialDatum,
  );
  const isPortOpen = useStore((store) => store.isPortOpen);
  const [num, setNum] = useState(10);
  const options = useMemo(
    () => ({
      noData: {
        text: "yoo",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "14px",
          fontFamily: undefined,
        },
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
          enabled: true,
          easing: "easeinout",

          animateGradually: {
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
            // TODO: CHANGE COLOR USING HSL VAR ..
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
        custom: ({ series, seriesIndex, dataPointIndex, w }) => `
        <div class="flex flex-col rounded-lg border bg-background">
   <div class="flex flex-row justify-between p-1 gap-4 items-baseline">
      <span class="text-xs">${dateFormatter.format(
        w.globals.initialSeries[seriesIndex].data[dataPointIndex].x,
      )}
      </span>
      <span class="text-xs">${intlFormatDistance(
        w.globals.initialSeries[seriesIndex].data[dataPointIndex].x,
        Date.now(),
      )}</span>
   </div>
   <hr />
   <div class="p-2 flex flex-row items-center justify-between">
      <span class="h-[0.625rem] w-[0.625rem] shadow-xl bg-primary rounded-full outline outline-1 outline-primary-foreground"></span>
      <span class="font-bold text-foreground">
      ${series[seriesIndex][dataPointIndex]}
      </span>
   </div>
</div>`,
      },
      stroke: {
        curve: "smooth",
        width: 3.5,
        colors: "hsl(var(--primary))",
      },
      markers: {
        enabled: true,
        strokeColors: "hsl(var(--background))",
        strokeWidth: 2.5,
        strokeOpacity: 1,
        // the dot that appears when you hover
        colors: "hsl(var(--primary))",
        hover: {
          size: 7,
        },
      },
    }),
    [interval, num],
  );

  const series = [
    {
      data: data,
    },
  ];

  return (
    <Card className="relative col-span-6 row-span-5">
      <CardContent className="">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-1">
            <Sun className="inline h-6 w-6" />
            Brightness
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
            <button onClick={() => clearSerialDatum("brightness")}>
              <Trash2 className="inline h-5 w-5" />
            </button>
          </div>
        </CardHeader>

        {/* <div className=" absolute inset-0 h-full w-full rounded-lg bg-[url('@/assets/grid.svg')] bg-[position:calc(100%+5px)_calc(100%+24px)] opacity-10"></div> */}
        <Chart type="line" options={options} series={series} />
      </CardContent>
    </Card>
  );
};
export { LineChart };
