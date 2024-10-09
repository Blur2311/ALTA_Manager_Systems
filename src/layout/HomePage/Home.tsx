import { Outlet } from "react-router-dom";
import { NavBar } from "../SideBar&Nav/NavBar";
import { SideBar } from "../SideBar&Nav/SideBar";

export const Homepage = () => {
  return (
    <>
      <div className="flex min-h-screen bg-bgGray">
        <SideBar />
        <div className="relative flex-1">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </>
  );
};
