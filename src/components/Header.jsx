import EditUserProfile from "@/components/EditUserProfile";
import UserDashboard from "@/components/UserDashboard";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/UserStore";

const Header = () => {
  const isLoggedIn = useUserStore((store) => store.isLoggedIn);

  /*   useEffect(() => {
    const UpdateUserStore = async () => {
      await useUserStore.persist.rehydrate();
    };
    document.addEventListener("visibilitychange", UpdateUserStore);
    window.addEventListener("focus", UpdateUserStore);
    return () => {
      document.removeEventListener("visibilitychange", UpdateUserStore);
      window.removeEventListener("focus", UpdateUserStore);
    };
  }, []); */

  return (
    <header>
      <div className="container flex  flex-row items-center justify-between py-2">
        <div className="relative flex flex-col font-ligo">
          <p className="flex h-[3.875rem] items-end overflow-hidden text-7xl/none">
            s
          </p>
          <span className="absolute ml-[1.6875rem] mt-[2.625rem] font-medium">
            beta
          </span>
        </div>
        {isLoggedIn ? (
          <UserDashboard />
        ) : (
          <EditUserProfile
            TriggerComponent={<Button variant="outline">Get Started</Button>}
            title="Get started"
            description="edit your profile and click save when you are done"
            formId="GetStartedForm"
          />
        )}
      </div>
      <hr />
    </header>
  );
};

export default Header;
