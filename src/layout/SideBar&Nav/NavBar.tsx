import { Dropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { Accounts } from "../../model/Accounts";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import CustomBreadcrumb from "../../components/CustomBeardCrumb";

const items: MenuProps["items"] = [
  {
    key: "1",
    type: "group",
    label: (
      <div className="py-[9px] ps-6 font-nunito text-xl font-bold text-white">
        Thông báo
      </div>
    ),
    className: "",
    children: [
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
            className="bg-white text-left font-nunito text-base font-semibold hover:!bg-orange50"
          >
            <h6 className="text-orange500">Người dùng: Nguyễn Thị Thùy Dung</h6>
            <p className="text-base text-textGray400">
              Thời gian nhận số: 12h20 ngày 30/11/2021
            </p>
          </a>
        ),
        className:
          "!text-textGray300 bg-white hover:!bg-orange50 hover:!text-orange500 !rounded-none !pt-4 !pb-3 !ps-6",
      },
      {
        type: "divider",
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
            className="bg-white text-left font-nunito text-base font-semibold hover:!bg-orange50"
          >
            <h6 className="text-orange500">Người dùng: Nguyễn Thị Thùy Dung</h6>
            <p className="text-base text-textGray400">
              Thời gian nhận số: 12h20 ngày 30/11/2021
            </p>
          </a>
        ),
        className:
          "!text-textGray300 bg-white hover:!bg-orange50 hover:!text-orange500 !rounded-none !pt-4 !pb-3 !ps-6",
      },
      {
        type: "divider",
      },
    ],
  },
];

export const NavBar = () => {
  const [user, setUser] = useState<Accounts>();
  const photoURL = useSelector(
    (state: RootState) => state.user.profileImageUrl,
  );

  useEffect(() => {
    // Lấy thông tin người dùng từ Redux store
    const accountCookie = Cookies.get("userInfo");

    if (accountCookie) {
      const parsedAccount = JSON.parse(accountCookie);
      const account: Accounts = {
        id: parsedAccount.id,
        email: parsedAccount.email,
        fullName: parsedAccount.fullName,
        password: parsedAccount.password,
        phoneNumber: parsedAccount.phoneNumber,
        role: parsedAccount.role,
        status: parsedAccount.status,
        username: parsedAccount.username,
      };

      setUser(account); // Lưu thông tin tài khoản vào state
    } else {
      console.log("Không có thông tin tài khoản trong cookie");
    }
  }, []);

  return (
    <>
      <div className="relative z-10 h-[88px] bg-transparent">
        <div className="container mx-auto h-full">
          <div className="me-16 ms-6 flex h-full items-center justify-between">
            <CustomBreadcrumb />
            <div className="flex items-center gap-6">
              <Dropdown
                menu={{ items }}
                placement="bottomLeft"
                trigger={["click"]}
                overlayStyle={{
                  width: "360px",
                  right: "20px",
                  top: "5rem",
                }}
              >
                <button className="rounded-full bg-orange50 p-[6px] text-xl text-orange300 transition-colors duration-300">
                  <IoIosNotifications />
                </button>
              </Dropdown>

              <div className="flex items-center gap-2">
                <Link
                  to={`user-info`}
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
                >
                  <img src={photoURL || "/cat.jpeg"} alt="" />
                </Link>
                <div className="">
                  <p className="text-xs text-textGray300">Xin chào</p>
                  <Link
                    to={`user-info`}
                    className="text-base font-bold text-textGray400"
                  >
                    {user?.fullName}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
