import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Graph from "../components/Graph";
import { io } from "socket.io-client";
import { Badge } from "@tremor/react";
import { SignalIcon } from "@heroicons/react/24/solid";

const socket = io.connect("http://localhost:3003", {
  transports: ["websocket"],
  autoConnect: false,
});

const onSubmit = async ({ path, baudRate }) => {
  let request = await fetch(
    `./api/serialPort?path=${path}&baudRate=${baudRate}`
  );
  let response = await request.json();
  console.log(response);
};
const Operation = () => {
  const [serialPorts, setSerialPorts] = useState(null);
  const [chartdata, setChartData] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    socket.on("getParsedData", (data) => {
      setChartData((prevData) => [
        ...prevData,
        { time: prevData.length * 1, temp: data },
      ]);
    });

    socket.on("connect", () => {
      console.log("connected");
      //live tag
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      //NOT LIVE
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  async function listPorts() {
    let res = await fetch("./api/listPorts");
    let ports = await res.json();
    setSerialPorts(ports);
  }

  return (
    <section className="flex flex-col">
      <h1>Operation</h1>
      <h1>live or not live</h1>

      <button onClick={listPorts}>list COM PORTS</button>
      {serialPorts !== null && (
        <div>
          <span>
            found {serialPorts.length} serial port
            {serialPorts.length !== 1 && "s"}
          </span>
          {serialPorts.map(
            (
              { path, manufacturer, serialNumber, vendorId, productId },
              index
            ) => (
              <div key={index} className="flex flex-col justify-center">
                <span>path: {path}</span>
                <span>manufacturer: {manufacturer}</span>
                <span>serialNumber: {serialNumber}</span>
                <span>vendorId: {vendorId}</span>
                <span>productId: {productId}</span>
              </div>
            )
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Enter serial port number"
          {...register("path", { required: true })}
        />
        <input
          placeholder="Enter baudRate"
          type="number"
          {...register("baudRate", { required: true })}
        />
        <input type="submit" value="send" />
      </form>

      <button onClick={() => socket.connect()}>listen live</button>
      <Badge icon={SignalIcon}>live</Badge>

      <button onClick={() => socket.disconnect()}>disconnect</button>

      <Graph chartdata={chartdata} />
    </section>
  );
};

export default Operation;
