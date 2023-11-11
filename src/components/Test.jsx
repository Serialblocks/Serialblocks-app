import { LineChart } from "@/components";
import { useEffect, useRef, useState } from "react";
import { produce } from "immer";
import { dateFormatter } from "@/lib/utils";
const Test = () => {
  const [brightness, setBrightness] = useState({
    interval: 1000,
    data: [],
  });
  const { interval, data } = brightness;
  const [stop, setStop] = useState(false);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setBrightness(
          produce((draft) => {
            draft.data.push({
              x: Date.now(),
              y: ~~(Math.random() * 30),
            });
          }),
        );
      }, 1000);
    }
    if (stop && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [stop]);
  return (
    <>
      <LineChart data={data} interval={interval} />
      <button className="mt-40" onClick={() => setStop(true)}>
        stop
      </button>
    </>
  );
};
export default Test;
