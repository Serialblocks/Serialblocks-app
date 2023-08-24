import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { RgbColorPicker } from "react-colorful";
import { useState } from "react";
function formatRGB({ r, g, b }) {
  // for (const [key, color] of Object.entries(rgb)) {
  //   if (Object.hasOwn(rgb, key)) {
  //     rgb[key] = String(color).padStart(3, "0");
  //   }
  // }
  const paddedR = String(r).padStart(3, "0");
  const paddedG = String(g).padStart(3, "0");
  const paddedB = String(b).padStart(3, "0");
  console.log(`RGB_${paddedR}_${paddedG}_${paddedB}`);
  return `RGB_${paddedR}_${paddedG}_${paddedB}`;
}
const RGB = () => {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  return (
    <Card className="col-span-3 row-span-2 min-h-[10rem]">
      <CardContent className="relative flex flex-col">
        <CardTitle className="flex items-center gap-1">
          <Palette className="inline h-6 w-6" />
          RGB_LED
        </CardTitle>
        <RgbColorPicker
          color={color}
          className="h-auto flex-1"
          onChange={(color) => {
            console.log(color);
            fetch(`./api/serialPort/write?command=${formatRGB(color)}`);
            setColor(color);
          }}
        />
        <Button size="pill" className="absolute right-2 top-2" asChild>
          <div>RGB</div>
        </Button>
      </CardContent>
    </Card>
  );
};

export { RGB };
