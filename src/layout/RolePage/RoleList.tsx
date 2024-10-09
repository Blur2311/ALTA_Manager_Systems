import { Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { PiPlusSquareFill } from "react-icons/pi";
import { RightSideButton } from "../../components/RightSideButton";
import { RoleRow } from "./components/RoleRow";
import { useEffect, useState } from "react";
import { Role } from "../../model/Role";
import { getAllRole } from "../../utils/RoleUtils";

export const RoleList = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setRoles(await getAllRole());
  };

  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container ps-6 pt-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h4 className="text-2xl font-bold text-orange500">
                Danh sách vai trò
              </h4>
              <div className="">
                <p className="text-base font-semibold text-textGray500">
                  Từ khoá
                </p>
                <Input
                  size="large"
                  suffix={<FiSearch className="text-xl text-orange500" />}
                  className="mt-1 font-nunito"
                  placeholder="Nhập từ khóa"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-20"></div>
        </div>
        <div className="mt-4 flex items-start gap-6">
          <div className="flex-1">
            <table className="w-full rounded-xl shadow-shadowBox">
              <thead>
                <tr className="h-12 bg-orange400 text-left text-base font-bold text-white">
                  <th className="rounded-tl-xl border-e border-white px-4">
                    Tên vai trò
                  </th>
                  <th className="border-e border-white px-4">Số người dùng</th>
                  <th className="border-e border-white px-4">Mô tả</th>
                  <th className="rounded-tr-xl px-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-textGray400">
                {filteredRoles.map((role, index) => (
                  <RoleRow
                    key={role.id}
                    id={role.id}
                    role={role.roleName}
                    quantity={role.quantity}
                    description={role.description}
                    color={index % 2 !== 0 ? "bg-orange50" : "bg-white"}
                    lastRow={index === roles.length - 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <RightSideButton
            link="/home/role/add"
            Icon={PiPlusSquareFill}
            text={
              <span>
                Thêm <br /> vai trò
              </span>
            }
          />
        </div>
      </div>
    </>
  );
};
