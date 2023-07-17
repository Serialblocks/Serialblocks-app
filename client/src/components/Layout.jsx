import { Outlet } from "react-router-dom";
import SideNavigation from "./SideNavigation";
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-row gap-4 bg-slate-50 text-slate-900">
      <SideNavigation />
      <Outlet />
    </div>
  );
};
export default Layout;
