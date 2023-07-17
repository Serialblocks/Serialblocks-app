import { Card, Title, LineChart } from "@tremor/react";

const chartdata = [
  {
    temp: 28.4,
    time: 1,
  },
  {
    temp: 26.4,
    time: 2,
  },
  {
    temp: 23.4,
    time: 3,
  },
  {
    temp: 21.5,
    time: 4,
  },
  {
    temp: 23.5,
    time: 5,
  },
];

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}%`;

export default function DummyGraph() {
  return (
    <Card>
      <Title>plotting time:x-axis vs temperature:y-axis</Title>
      <LineChart
        className="mt-6"
        data={chartdata}
        index="time"
        categories={["temp"]}
        colors={["indigo"]}
        valueFormatter={(n) => `${n}°C`}
        yAxisWidth={40}
      />
    </Card>
  );
}
