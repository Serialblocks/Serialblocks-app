import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import Colorful from "@uiw/react-color-colorful";
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
  return `RGB_${paddedR}_${paddedG}_${paddedB}`;
}
const LED = () => {
  const [hex, setHex] = useState("#59c09a");
  return (
    <Card className="row-span-1 col-span-3">
      <CardContent className="relative">
        <CardTitle className="flex items-center gap-1">
          <Palette className="inline h-6 w-6" />
          RGB_LED
        </CardTitle>
        <Colorful
          color={hex}
          disableAlpha={true}
          onChange={(color) => {
            fetch(`./api/serialPort/write?command=${formatRGB(color.rgb)}`);
            setHex(color.hex);
          }}
        />
        <Button size="pill" className="absolute right-2 top-2" asChild>
          <div>RGB</div>
        </Button>
      </CardContent>
    </Card>
  );
};

export { LED };
