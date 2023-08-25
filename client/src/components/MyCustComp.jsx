import React from "react";
import { useEffect } from "react";

const MyCustComp = () => {
  useEffect(() => {
    console.log("cust component mounted, bitch!");
  }, []);
  return <div>MyCustComp</div>;
};

export default MyCustComp;
