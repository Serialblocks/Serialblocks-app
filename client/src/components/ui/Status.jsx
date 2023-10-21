import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Status = ({ timestamp, value, interval }) => {
  const [last6Timestamps, setlast6Timestamps] = useState([]);
  const [avgof5Intervals, setAvgof5Intervals] = useState(0);
  const shouldRunEffect = last6Timestamps.length < 6 || interval !== undefined;
  useEffect(() => {
    if (shouldRunEffect) {
      if (timestamp > 0) {
        setlast6Timestamps((prevTimestamps) => [...prevTimestamps, timestamp]);
      }
    }
  }, [timestamp, shouldRunEffect]);

  useEffect(() => {
    if (last6Timestamps.length === 6) {
      const total = last6Timestamps.reduce(
        (acc, currTimestamp, i) =>
          i + 1 < last6Timestamps.length
            ? acc + (last6Timestamps[i + 1] - currTimestamp)
            : acc,
        0,
      );
      console.log(total / 5);
    }
  }, [last6Timestamps]);
  // with css show delay indicator after interval
  //action based won't have a status
  // 200ms is the default for the interval
  //

  return (
    <div className="absolute right-4 top-4">
      <span className="relative flex h-3 w-3">
        <span
          key={timestamp}
          style={{ "--interval": interval }}
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 repeat-1",
          )}
        ></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
      </span>
    </div>
  );
};
export default Status;
