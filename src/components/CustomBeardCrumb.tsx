import { Breadcrumb } from "antd"; // Import component Breadcrumb từ Ant Design
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from "react-router-dom";

const breadcrumbNameMap: Record<string, string> = {
  "/home": "Home",
  "/home/user-info": "Thông tin cá nhân",
  "/home/dashboard": "Dashboard",
  "/home/device": "Quản lý thiết bị",
  "/home/service": "Quản lý dịch vụ",
  "/home/number": "Quản lý số",
  "/home/report": "Báo cáo",
  "/home/role": "Quản lý vai trò",
  "/home/user-manage": "Quản lý người dùng",
  "/home/user-history": "Lịch sử người dùng",
};

const CustomBreadcrumb = () => {
  const location = useLocation();
  // console.log(location.pathname);

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  // console.log(pathSnippets);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      title: (
        <span className="font-nunito text-xl font-bold text-orange500">
          {breadcrumbNameMap[url] || "Trang không tồn tại"}
        </span>
      ),
      key: url,
    };
  });

  return (
    <Breadcrumb
      items={breadcrumbItems}
      separator={<IoIosArrowForward className="text-xl" />}
    />
  );
};

export default CustomBreadcrumb;
