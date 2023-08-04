import Chart from "react-apexcharts";
import { Card, CardContent } from "@/components/ui/card";

const LineChart = ({ LDR }) => {
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
    //TODO:
    title: {
      text: "Dynamic Updating Chart",
      align: "left",
      style: {
        cssClass: "",
      },
    },
    tooltip: {
      enabled: true,
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
        w,
      }) => `<div class="bg-green-600">
      <p>w: ${/* console.dir(w) */ ""}</p>
            <p>seriesIndex: ${series[seriesIndex][dataPointIndex]}</p>
            <p>dataPointIndex: ${dataPointIndex}</p>
          </div>`,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: "#3B82F6",
    },
    markers: {
      // the dot that appears when you hover
      colors: "#3B82F6",
      hover: {
        size: 4,
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
    <Card className="col-span-6 row-span-3">
      <CardContent>
        <Chart options={options} series={series} />
      </CardContent>
    </Card>
  );
};
export { LineChart };
