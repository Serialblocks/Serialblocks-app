import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo } from "react";

let Temperature = memo(() => {
  return (
    <Card className="row-span-1 col-span-3 relative">
      {/* adding before:absolute and changing opacity of the before pseudo element will add grain effect to the background of the card */}
      <CardContent className=" before:inset-0 before:content-[' '] before:rounded-lg before:opacity-0 before:bg-[url(@/assets/noise.svg)]">
        <CardTitle className="flex items-center gap-1">
          <Sun className="inline h-6 w-6" />
          Temperature
        </CardTitle>
        <span className="flex gap-1 justify-start mt-4">
          <p className="text-3xl font-bold">27</p>
          <p className="font-medium text-lg">°C</p>
        </span>
        <Button size="pill" className="absolute right-2 top-2" asChild>
          <div>DHT11</div>
        </Button>
      </CardContent>
    </Card>
  );
});
Temperature.displayName = "Temperature";

export { Temperature };
