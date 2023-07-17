import { Card, Title, LineChart } from "@tremor/react";

const Chart = ({ chartdata }) => (
  <Card>
    <Title>(x:,y:Temperature)Temperature </Title>

    <LineChart
      className="mt-6"
      data={chartdata}
      index="time"
      categories={["temp"]}
      colors={["emerald", "gray"]}
      valueFormatter={(n) => `${n}°C`}
      yAxisWidth={40}
    />
  </Card>
);
export default Chart;
