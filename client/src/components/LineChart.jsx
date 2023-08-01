import Chart from "react-apexcharts";
import { Card, CardContent } from "@/components/ui/card";

const LineChart = () => {
  const options = {
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
      toolbar: {
        show: false,
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
      <p>w: ${console.dir(w)}</p>
            <p>seriesIndex: ${series[seriesIndex][dataPointIndex]}</p>
            <p>dataPointIndex: ${dataPointIndex}</p>
          </div>`,
    },

    legend: {
      show: true,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#7cd7ff"],
    },
    markers: {
      // the dot that appears when you hover
      colors: ["#7cd7ff"],
      hover: {
        size: 5,
      },
    },
  };

  const series = [
    {
      name: "light",
      data: [
        [1, 124],
        [2, 56],
        [3, 28],
        [4, 0],
      ],
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
