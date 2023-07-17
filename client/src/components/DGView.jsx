import { SignalIcon } from "@heroicons/react/24/solid";

import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";

const data = [
  {
    time: "1 sec",
    temp: "28.4",
  },
  {
    time: "Federal Councillor",
    temp: "26.4",
  },
  {
    time: "Federal Councillor",
    temp: "23.4",
  },
  {
    time: "Federal Councillor",
    temp: "21.5",
  },
  {
    time: "Federal Councillor",
    temp: "23.5",
  },
];

const DGView = () => (
  <Card>
    <Title>Data grid view of temperature vs time</Title>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Index</TableHeaderCell>
          <TableHeaderCell>Time</TableHeaderCell>
          <TableHeaderCell>Temperature</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Text>{index + 1}</Text>
            </TableCell>
            <TableCell>
              <Text>{`${item.temp} °C`}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

export default DGView;
