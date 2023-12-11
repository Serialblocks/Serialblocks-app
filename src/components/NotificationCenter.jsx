import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";

const NotificationCenter = () => {
  return (
    <Button variant="outline" className="w-10 rounded-full px-2">
      <BellIcon className="h-5 w-5" />
    </Button>
  );
};
export default NotificationCenter;
