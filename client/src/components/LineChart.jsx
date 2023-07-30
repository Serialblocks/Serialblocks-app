import Chart from "react-apexcharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LineChart = () => {
  const options = {
    xaxis: {
      type: "numeric",
    },
  };

  const series = [
    {
      data: [
        [1, 34],
        [3, 54],
        [5, 23],
        [15, 43],
      ],
    },
  ];

  return (
    <Card className="col-span-6 row-span-3">
      <CardContent>
        <Chart options={options} series={series} type="line" />
      </CardContent>
    </Card>
  );
};
export { LineChart };
