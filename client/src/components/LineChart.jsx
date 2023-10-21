import Chart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeInfo, Info, Sun } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
const LineChart = () => {
  const Brightness = useStore((store) => store.serialData.Brightness);
  const options = {
    // grid: {
    //   show: true,
    //   borderColor: "hsl(var(--primary))",
    //   strokeDashArray: 4,
    //   position: "back",
    //   xaxis: {},
    //   yaxis: {
    //     lines: {
    //       show: true,
    //     },
    //   },
    // },
    xaxis: {
      type: "datetime",
      // max: 60,
      // min: 1,
      // range: 3,
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
        stroke: {
          // TODO: CHANGE COLOR USING HSL VAR ..
          color: "#D1D5DB",
          width: 1,
          dashArray: 0,
        },
      },
      tooltip: {
        enabled: false,
      },
      labels: {
        show: false,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
      fontFamily: "Open Sans, Arial, sans-serif",
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      zoom: {
        enabled: false,
      },
    },

    tooltip: {
      enabled: true,
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
      }) => `<div class="rounded-lg border bg-background p-2">
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col">
          <span class="text-[0.70rem] uppercase text-muted-foreground">
          ${series[seriesIndex][dataPointIndex]}
          </span>
          <span class="font-bold text-muted-foreground">
          ${dataPointIndex}</span>
        </div>`,
    },

    stroke: {
      curve: "smooth",
      width: 2.5,
      colors: "hsl(var(--primary))",
    },
    markers: {
      // the dot that appears when you hover
      colors: "hsl(var(--primary))",
      hover: {
        size: 6,
      },
    },
  };

  const series = [
    {
      name: "Brightness",
      data: Brightness.slice(10),
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
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <Info className="inline h-5 w-5 hover:opacity-80" />
              </TooltipTrigger>
              <TooltipContent>
                requires DHT-11 sensor, <br /> make sure to use{" "}
                <code>"Temperature"</code> in your JSON to get activated
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>

        {/* <div className=" absolute inset-0 h-full w-full rounded-lg bg-[url('@/assets/grid.svg')] bg-[position:calc(100%+5px)_calc(100%+24px)] opacity-10"></div> */}
        <Chart options={options} series={series} />
      </CardContent>
    </Card>
  );
};
export { LineChart };
