import SendFeedback from "@/components/SendFeedback";
import NotificationCenter from "@/components/NotificationCenter";
import UserNav from "@/components/UserNav";
import EditUserProfile from "./EditUserProfile";
import { useState } from "react";
const UserDashboard = () => {
  const [openEdit, setEditOpen] = useState(false);
  return (
    <div className="flex flex-row-reverse items-center gap-x-6">
      <UserNav setEditOpen={setEditOpen} />
      <EditUserProfile
        openEdit={openEdit}
        setEditOpen={setEditOpen}
        title="Edit Profile"
        description="edit your profile and click save when you are done"
        formId="EditProfileForm"
      />
      <NotificationCenter />
      <SendFeedback />
    </div>
  );
};
export default UserDashboard;
