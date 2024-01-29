import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { RgbColorPicker } from "react-colorful";
import { useEffect, useMemo, useState } from "react";
import { useSerialStore } from "@/store/Serialstore";
import { debounce } from "lodash";

function formatRGB({ r, g, b }) {
  // for (const [key, color] of Object.entries(rgb)) {
  //   if (Object.hasOwn(rgb, key)) {
  //     rgb[key] = String(color).padStart(3, "0");
  //   }
  // }
  const paddedR = String(r).padStart(3, "0");
  const paddedG = String(g).padStart(3, "0");
  const paddedB = String(b).padStart(3, "0");
  return `RGB_${paddedR}_${paddedG}_${paddedB}`;
}
const RGB = () => {
  const { writeToPort } = useSerialStore((store) => store.serialActions);
  const isPortOpen = useSerialStore((store) => store.isPortOpen);
  const debouncedColorChangeHandler = useMemo(
    () => debounce((color) => isPortOpen && writeToPort(formatRGB(color)), 10),
    [isPortOpen],
  );

  // Stop the invocation of the debounced function after unmounting
  useEffect(() => debouncedColorChangeHandler.cancel(), []);

  return (
    <Card className="col-span-3 row-span-2 min-h-[10rem]">
      {/* <CardHeader className="p-4 pb-0">
        <CardTitle className="flex items-center gap-1">
          <Palette className="inline h-6 w-6" />
          RGB LED
        </CardTitle>
        <Button size="pill" className="absolute right-2 top-2" asChild>
          <div>RGB</div>
        </Button>
      </CardHeader> */}
      <CardContent className="p-[0.375rem]">
        <RgbColorPicker
          className="!h-auto !w-auto basis-full rounded-sm"
          onChange={debouncedColorChangeHandler}
        />
      </CardContent>
    </Card>
  );
};

export { RGB };
