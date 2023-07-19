import { useState } from "react";
import { Power } from "./Power";
import cn from "../utils/classNames";

const SpeedMeter = ({ colSpan, rowSpan }) => {
  const [count, setCount] = useState(97);
  return (
    <>
      <div
        className={cn(
          "flex flex-col justify-center items-center border-2 border-slate-400/10 bg-white p-2",
          `col-span-${colSpan} row-span-${rowSpan} `
        )}
      >
        <Power value={count} />
      </div>
      {/*       <button
        style={{ marginTop: 20 }}
        onClick={() => setCount((prevCount) => prevCount - 6)}
      >
        click me
      </button> */}
    </>
  );
};

export default SpeedMeter;
