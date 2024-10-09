import {
  BarChartOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FiLayers } from "react-icons/fi";
import { Button, Dropdown, MenuProps } from "antd";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { PiDesktop } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { logout } from "../../context/slice/userSlice";
import { useState } from "react";
import Cookies from "js-cookie";

export const SideBar = () => {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getNavLinkClass = (path: string) =>
    //Kiểm tra đường dẫn trùng với tên thì nó sẽ active
    location.pathname.startsWith(path)
      ? "!text-white !bg-orange400 !font-bold"
      : "!text-textGray300 !font-semibold hover:!bg-orange50 hover:!text-orange500";

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <NavLink
          className="p-3 ps-1 text-left font-nunito text-base"
          to={`/home/role`}
        >
          Quản lý vai trò
        </NavLink>
      ),
      className: `!p-0 !px-3 !rounded-none !rounded-se-xl ${getNavLinkClass("/home/role")}`,
    },
    {
      key: "2",
      label: (
        <NavLink
          to={`/home/user-manage`}
          className="p-3 ps-1 text-left font-nunito text-base"
        >
          Quản lý tài khoản
        </NavLink>
      ),
      className: `!p-0 !px-3 !rounded-none ${getNavLinkClass("/home/user-manage")}`,
    },
    {
      key: "3",
      label: (
        <NavLink
          to={`/home/user-history`}
          className="p-3 ps-1 text-left font-nunito text-base"
        >
          Nhật ký người dùng
        </NavLink>
      ),
      className: `!p-0 !px-3 !rounded-none !rounded-ee-xl ${getNavLinkClass("/home/user-history")}`,
    },
  ];

  const isActive = [
    "/home/role",
    "/home/user-manage",
    "/home/user-history",
  ].some((path) => location.pathname.startsWith(path));

  const handleLogout = async () => {
    try {
      setLoad(true); // Hiển thị trạng thái loading ngay lập tức
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Chờ 1 giây
      await signOut(auth); // Đăng xuất khỏi Firebase
      Cookies.remove("userInfo");
      dispatch(logout()); // Cập nhật Redux store
      navigate("/login"); // Điều hướng về trang đăng nhập
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    } finally {
      setLoad(false); // Tắt trạng thái loading sau khi hoàn tất
    }
  };

  return (
    <>
      <div className="shadow-sideShadow w-[220px] flex-none bg-white">
        <div className="flex min-h-[810px] flex-col items-center justify-between">
          <div className="w-full">
            <div className="mt-8 flex justify-center">
              <img src="/logoalta.png" alt="" className="w-20" />
            </div>
            <div className="mt-14 flex flex-col gap-2">
              <NavLink
                to={`/home/dashboard`}
                className={({ isActive }) => {
                  return isActive
                    ? "bg-orange500 p-3 ps-1 text-left text-base font-semibold text-white"
                    : "p-3 ps-1 text-left text-base font-semibold text-textGray300 hover:bg-orange50 hover:text-orange500";
                }}
              >
                <div className="mx-3 flex items-center gap-2">
                  <LuLayoutDashboard className="text-xl" />
                  Dashboard
                </div>
              </NavLink>
              <NavLink
                to={`/home/device`}
                className={({ isActive }) => {
                  return isActive
                    ? "bg-orange500 p-3 ps-1 text-left text-base font-semibold text-white"
                    : "p-3 ps-1 text-left text-base font-semibold text-textGray300 hover:bg-orange50 hover:text-orange500";
                }}
              >
                <div className="mx-3 flex items-center gap-2">
                  <PiDesktop className="text-xl" />
                  Thiết bị
                </div>
              </NavLink>
              <NavLink
                to={`/home/service`}
                className={({ isActive }) => {
                  return isActive
                    ? "bg-orange500 p-3 ps-1 text-left text-base font-semibold text-white"
                    : "p-3 ps-1 text-left text-base font-semibold text-textGray300 hover:bg-orange50 hover:text-orange500";
                }}
              >
                <div className="mx-3 flex items-center gap-2">
                  <MessageOutlined className="text-xl" />
                  Dịch vụ
                </div>
              </NavLink>
              <NavLink
                to={`/home/number`}
                className={({ isActive }) => {
                  return isActive
                    ? "bg-orange500 p-3 ps-1 text-left text-base font-semibold text-white"
                    : "p-3 ps-1 text-left text-base font-semibold text-textGray300 hover:bg-orange50 hover:text-orange500";
                }}
              >
                <div className="mx-3 flex items-center gap-2">
                  <FiLayers className="text-xl" />
                  Cấp số
                </div>
              </NavLink>
              <NavLink
                to={`/home/report`}
                className={({ isActive }) => {
                  return isActive
                    ? "bg-orange500 p-3 ps-1 text-left text-base font-semibold text-white"
                    : "p-3 ps-1 text-left text-base font-semibold text-textGray300 hover:bg-orange50 hover:text-orange500";
                }}
              >
                <div className="mx-3 flex items-center gap-2">
                  <BarChartOutlined className="text-xl" />
                  Báo cáo
                </div>
              </NavLink>
              <div className="relative">
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  overlayClassName="custom-dropdown-sidebar"
                  overlayStyle={{ minWidth: 200, left: "15.3%", top: "55.5%" }}
                >
                  <div
                    className={`p-3 ps-1 text-left text-base font-semibold ${isActive ? "bg-orange500 text-white" : "text-textGray300 hover:bg-orange50 hover:text-orange500"}`}
                  >
                    <div className="mx-3 flex items-center gap-2">
                      <SettingOutlined className="text-xl" />
                      Cài đặt hệ thống
                      <IoMdMore className="text-xl" />
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>

          <div className="mb-7">
            <Button
              loading={load}
              size="large"
              onClick={handleLogout}
              className="!w-[176px] justify-start !rounded-lg border-0 !bg-orange50 !px-3 !py-5 font-nunito !text-base !font-semibold !text-orange500 !shadow-downShadow"
            >
              <div className="flex gap-3">
                <LuLogOut className="h-6" />
                Đăng xuất
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <Menu
            className="w-full !border-0 mx-0 !font-semibold !text-base !font-nunito"
            items={[
              {
                label: "Dashboard",
                key: "/",
                icon: <LuLayoutDashboard className="!text-xl" />,
                className: "!mx-0 !rounded-none !w-full",
              },
              {
                label: "Thiết bị",
                key: "/e",
                icon: <PiDesktop />,
                className: "!mx-0 !rounded-none !w-full",
              },
              {
                label: "Dịch vụ",
                key: "/s",
                icon: <MessageOutlined />,
                className: "!mx-0 !rounded-none !w-full",
              },
              {
                label: "Cấp số",
                key: "/c",
                icon: <FiLayers />,
                className: "!mx-0 !rounded-none !w-full",
              },
              {
                label: "Báo cáo",
                key: "/b",
                icon: <BarChartOutlined />,
                className: "!mx-0 !rounded-none !w-full",
              },
              {
                label: "Cài đặt hệ thống",
                key: "/",
                icon: <SettingOutlined />,
                className: "!mx-0 !rounded-none !w-full",
              },
            ]}
          ></Menu> */
}
