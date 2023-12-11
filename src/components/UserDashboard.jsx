import SendFeedback from "@/components/SendFeedback";
import NotificationCenter from "@/components/NotificationCenter";
import UserNav from "@/components/UserNav";
const UserDashboard = () => {
  return (
    <div className="flex flex-row-reverse items-center gap-x-6">
      <UserNav />
      <NotificationCenter />
      <SendFeedback />
    </div>
  );
};
export default UserDashboard;
