import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

let LED = () => {
  return (
    <Card className="relative col-span-3 row-span-2 ">
      {/* adding before:absolute and changing opacity of the before pseudo element will add grain effect to the background of the card */}
      <CardContent className="before:inset-0 before:rounded-lg before:bg-[url(@/assets/noise.svg)] before:opacity-0">
        <CardTitle className="flex items-center gap-1">
          <Sun className="inline h-6 w-6" />
          <div>
            Led
            <p className="text-xs font-normal text-primary/90">LED</p>
          </div>
        </CardTitle>
        <span className="mt-4 flex justify-start gap-1">
          <p className="font-mono text-3xl font-bold">27</p>
          <p className="text-lg font-medium">°C</p>
        </span>
        <Button size="pill" className="absolute right-2 top-2" asChild>
          <div>DHT11</div>
        </Button>
      </CardContent>
    </Card>
  );
};

export { LED };
