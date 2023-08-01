import { Card, CardContent } from "@/components/ui/card";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Temperature = () => {
  return (
    <Card className="row-span-1 col-span-3">
      <CardContent className="relative">
        <span className="flex flex-row items-center font-medium gap-1">
          <Sun className="inline h-6 w-6" />
          <p>Temperature</p>
        </span>
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

export { Temperature };
