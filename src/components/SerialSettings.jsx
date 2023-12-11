import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SerialSettingsForm from "@/components/SerialSettingsForm";
import { useStore } from "@/store/Serialstore";
import { useUserStore } from "@/store/UserStore";
const SerialSettings = ({ children }) => {
  const isPortOpen = useStore((store) => store.isPortOpen);
  const isLoggedIn = useUserStore((store) => store.isLoggedIn);
  return (
    <Popover>
      <PopoverTrigger disabled={!isPortOpen && isLoggedIn}>
        {children}
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-[19rem] p-1.5">
        <SerialSettingsForm />
      </PopoverContent>
    </Popover>
  );
};
export default SerialSettings;
