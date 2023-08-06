import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
const LED = () => {
  return (
    <Card className="row-span-1 col-span-3">
      <CardContent className="relative">
        <CardTitle className="flex items-center gap-1">
          <Palette className="inline h-6 w-6" />
          RGB_LED
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
};

export { LED };
