import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation, matchPath, Link } from "react-router-dom";

// const breadcrumbNameMap: Record<string, string> = {
//   "/home": "Home",
//   "/home/user-info": "Thông tin cá nhân",
//   "/home/dashboard": "Dashboard",
//   "/home/device": "Quản lý thiết bị",
//   "/home/device/add": "Thêm thiết bị",
//   "/home/device/detail/:id": "Chi tiết thiết bị",
//   "/home/device/update/:id": "Cập nhật thiết bị",
//   "/home/service": "Quản lý dịch vụ",
//   "/home/service/add": "Thêm dịch vụ",
//   "/home/service/detail/:id": "Chi tiết dịch vụ",
//   "/home/service/update/:id": "Cập nhật dịch vụ",
//   "/home/number": "Quản lý số",
//   "/home/number/add": "Cấp số mới",
//   "/home/number/detail/:id": "Chi tiết số",
//   "/home/report": "Báo cáo",
//   "/home/role": "Quản lý vai trò",
//   "/home/role/add": "Thêm vai trò",
//   "/home/role/:id": "Cập nhật vai trò",
//   "/home/user-manage": "Quản lý người dùng",
//   "/home/user-manage/add": "Thêm người dùng",
//   "/home/user-manage/:id": "Cập nhật người dùng",
//   "/home/user-history": "Lịch sử người dùng",
// };

const CustomBreadcrumb = () => {
  const [items, setItems] = useState<any[]>();
  const location = useLocation();

  useEffect(() => {
    const checkRoute = () => {
      switch (true) {
        case location.pathname === "/home/user-info":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Thông tin cá nhân
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/dashboard":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Dashboard
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/device":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  Thiết bị
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Danh sách thiết bị
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/device/add":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/device"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Thiết bị
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/device"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Danh sách thiết bị
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Thêm thiết bị
                </span>
              ),
            },
          ]);
          break;

        case matchPath("/home/device/detail/:id", location.pathname) !== null:
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/device"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Thiết bị
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/device"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Danh sách thiết bị
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Chi tiết thiết bị
                </span>
              ),
            },
          ]);
          break;

        case matchPath("/home/device/update/:id", location.pathname) !== null:
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/device"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Thiết bị
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/device"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Danh sách thiết bị
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Cập nhật thiết bị
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/service":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  Dịch vụ
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Danh sách dịch vụ
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/service/add":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/service"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Dịch vụ
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/service"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Danh sách dịch vụ
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Thêm dịch vụ
                </span>
              ),
            },
          ]);
          break;

        case matchPath("/home/service/detail/:id", location.pathname) !== null:
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/service"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Dịch vụ
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/service"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Danh sách dịch vụ
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Chi tiết
                </span>
              ),
            },
          ]);
          break;

        case matchPath("/home/service/update/:id", location.pathname) !== null:
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/service"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Dịch vụ
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/service"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Danh sách dịch vụ
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Cập nhật
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/number":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  Cấp số
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Danh sách cấp số
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/number/add":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/number"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Cấp số
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/number"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Danh sách cấp số
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Cấp số mới
                </span>
              ),
            },
          ]);
          break;

        case matchPath("/home/number/detail/:id", location.pathname) !== null:
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/number"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Cấp số
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/number"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Danh sách cấp số
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Chi tiết
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/report":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  Báo cáo
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Lập báo cáo
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/role":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  Cài đặt hệ thống
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Quản lý vai trò
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/role/add":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/role"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Cài đặt hệ thống
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/role"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Quản lý vai trò
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Thêm vai trò
                </span>
              ),
            },
          ]);
          break;

        case matchPath("/home/role/:id", location.pathname) !== null:
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/role"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Cài đặt hệ thống
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/role"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Quản lý vai trò
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Cập nhật vai trò
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/user-manage":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  Cài đặt hệ thống
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Quản lý tài khoản
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/user-manage/add":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/user-manage"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Cài đặt hệ thống
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/user-manage"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Quản lý tài khoản
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Thêm tài khoản
                </span>
              ),
            },
          ]);
          break;

        case matchPath("/home/user-manage/:id", location.pathname) !== null:
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/user-manage"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Cài đặt hệ thống
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  <Link
                    to={"/home/user-manage"}
                    className="hover:!bg-transparent hover:!text-orange400"
                  >
                    Quản lý tài khoản
                  </Link>
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Cập nhật tài khoản
                </span>
              ),
            },
          ]);
          break;

        case location.pathname === "/home/user-history":
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-[#7E7D88]">
                  Cài đặt hệ thống
                </span>
              ),
            },
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  Nhật ký hoạt động
                </span>
              ),
            },
          ]);
          break;

        default:
          setItems([
            {
              title: (
                <span className="font-nunito text-xl font-bold text-orange500">
                  whut
                </span>
              ),
            },
          ]);
          break;
      }
    };

    checkRoute();
  }, [location.pathname]);

  return (
    <Breadcrumb
      items={items}
      separator={<IoIosArrowForward className="h-full text-base" />}
    />
  );
};

export default CustomBreadcrumb;
