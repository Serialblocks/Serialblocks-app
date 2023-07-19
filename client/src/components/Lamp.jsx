import React from "react";
import cn from "../utils/classNames";

const Lamp = ({ colSpan, rowSpan }) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center border-2 border-slate-400/10 bg-white p-2",
        `col-span-${colSpan} row-span-${rowSpan} `
      )}
    >
      Lamp
    </div>
  );
};

export default Lamp;
