import Chart from "react-apexcharts";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Sun } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const LineChart = ({ Brightness }) => {
  const [value, setVa] = useState(null);
  console.log(Brightness);
  const options = {
    grid: {
      show: true,
      borderColor: "hsl(var(--primary))",
      strokeDashArray: 4,
      position: "back",
      xaxis: {},
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      // max: 100,
    },
    xaxis: {
      type: "numeric",
      range: 25,
      lines: {
        show: false,
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
      id: "realtime",
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
        w,
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
      size: 4,
      // the dot that appears when you hover
      colors: "hsl(var(--primary))",
      hover: {
        size: 6,
      },
    },
  };

  const series = {
    data: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1693422915640,
        y: 31,
      },
      {
        x: 1693422915640,
        y: 31,
      },
      {
        x: 1693422916647,
        y: 31,
      },
      {
        x: 1693422916647,
        y: 31,
      },
      {
        x: 1693422917639,
        y: 32,
      },
      {
        x: 1693422917639,
        y: 32,
      },
      {
        x: 1693422918646,
        y: 31,
      },
      {
        x: 1693422918646,
        y: 31,
      },
      {
        x: 1693422919653,
        y: 31,
      },
      {
        x: 1693422919653,
        y: 31,
      },
      {
        x: 1693422920661,
        y: 32,
      },
      {
        x: 1693422920661,
        y: 32,
      },
      {
        x: 1693422921668,
        y: 31,
      },
      {
        x: 1693422921668,
        y: 31,
      },
      {
        x: 1693422922660,
        y: 32,
      },
      {
        x: 1693422922660,
        y: 32,
      },
    ],
  };
  console.log(Brightness);
  return (
    <Card className="relative col-span-6 row-span-5">
      <CardContent className="">
        <CardTitle className="flex items-center gap-1">
          <Sun className="inline h-6 w-6" />
          Brightness
        </CardTitle>
        <div className=" absolute inset-0 h-full w-full rounded-lg bg-[url('@/assets/grid.svg')] bg-[position:calc(100%+5px)_calc(100%+24px)] opacity-10"></div>
        <Chart options={options} series={series} />
        <div className="absolute right-2 top-2">
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger>
                <Button size="pill" className="select-none shadow-md" asChild>
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
export { LineChart };
