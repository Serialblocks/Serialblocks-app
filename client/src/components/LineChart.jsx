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
const LineChart = ({ LDR }) => {
  // LDR = [25, 65, 32, 101, 24, 77, 123];
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
    xaxis: {
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
      // the dot that appears when you hover
      colors: "hsl(var(--primary))",
      hover: {
        size: 6,
      },
    },
  };

  const series = [
    {
      name: "light",
      data: LDR,
    },
  ];

  return (
    <Card className="col-span-6 row-span-5 relative">
      <CardContent className="">
        <CardTitle className="flex items-center gap-1">
          <Sun className="inline h-6 w-6" />
          Brightness
        </CardTitle>
        <div className=" absolute rounded-lg inset-0 w-full h-full bg-[url('@/assets/grid.svg')] opacity-10 bg-[position:calc(100%+5px)_calc(100%+24px)]"></div>
        <Chart options={options} series={series} />
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
export { LineChart };
