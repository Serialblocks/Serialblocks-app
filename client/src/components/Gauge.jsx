import { useState } from "react";
import { Power } from "./Power";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

const Gauge = () => {
  const [count, setCount] = useState(97);
  return (
    <>
      <Card className="row-span-1 col-span-2">
        <CardContent className="">
          <Power value={count} />
          {/*       <button
        style={{ marginTop: 20 }}
        onClick={() => setCount((prevCount) => prevCount - 6)}
      >
        click me
      </button> */}
        </CardContent>
      </Card>
    </>
  );
};

export { Gauge };
