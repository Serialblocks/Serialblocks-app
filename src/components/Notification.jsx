import { useStore } from "@/store/Serialstore";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Notification = () => {
  const { toast } = useToast();
  const toastContent = useStore((store) => store.toastContent);

  useEffect(() => {
    // displays a toast using the toast function whenever the toastContent had been set.
    toastContent.title &&
      toastContent.description &&
      toast({ ...toastContent, className: "mt-[0.15rem]" });
  }, [toastContent, toast]);

  return <Toaster />;
};

export default Notification;
