import Chart from "react-apexcharts";
import { Card, CardContent } from "@/components/ui/card";

const LineChart = ({ LDR }) => {
  // LDR = [25, 65, 32, 101, 24, 77, 123];
  const options = {
    grid: {
      show: true,
      borderColor: "#90A4AE",
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
    title: {
      text: "Brightness level",
      align: "left",
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
      colors: "#3B82F6",
    },
    markers: {
      // the dot that appears when you hover
      colors: "#3B82F6",
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
    <Card className="col-span-6 row-span-3 relative">
      <CardContent className="">
        <div className=" absolute rounded-lg inset-0 w-full h-full bg-[url('@/assets/grid.svg')] opacity-10 bg-[position:calc(100%+5px)_calc(100%+24px)]"></div>
        <Chart options={options} series={series} />
      </CardContent>
    </Card>
  );
};
export { LineChart };
