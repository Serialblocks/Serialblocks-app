import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import EditUserProfile from "@/components/EditUserProfile";
import { useUserStore } from "@/store/UserStore";
import DeleteDataAlert from "@/components/DeleteDataAlert";

const UserNav = () => {
  const { DisplayName, Theme, Email, updateUserData } = useUserStore(
    (store) => store,
  );
  const clearUserData = useUserStore((store) => store.clearUserData);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row-reverse items-center gap-1">
          <Button
            variant="outline"
            className="flex h-10 w-10 items-center justify-center gap-[0.125rem] rounded-full bg-muted font-medium capitalize text-muted-foreground"
          >
            <span>{DisplayName[0]}.</span>
          </Button>
          <ChevronDown className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{DisplayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {Email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <EditUserProfile
            TriggerComponent={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit Profile
              </DropdownMenuItem>
            }
            title="Edit Profile"
            description="edit your profile and click save when you are done"
            formId="EditProfileForm"
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between gap-x-4 focus:bg-popover focus:text-popover-foreground"
          onSelect={(e) => e.preventDefault()}
        >
          Theme
          <Select
            defaultValue={Theme}
            onValueChange={(newTheme) => updateUserData({ Theme: newTheme })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteDataAlert clearUserData={clearUserData}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Delete Data
          </DropdownMenuItem>
        </DeleteDataAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserNav;
