import { Input, Pagination, PaginationProps, Select } from "antd";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa6";
import { RightSideButton } from "../../components/RightSideButton";
import { UserRow } from "./components/UserRow";
import { PiPlusSquareFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Accounts } from "../../model/Accounts";
import { getAllAccount } from "../../utils/AccountUtils";
import { getAllRole } from "../../utils/RoleUtils";
import { customPaginationitemRender } from "../../components/Pagination";

export const UserList = () => {
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(9);

  useEffect(() => {
    const fetchUserData = async () => {
      setAccounts(await getAllAccount());
    };

    const fetchRoleData = async () => {
      const fetchedRoles = await getAllRole();
      const mappedOptions = fetchedRoles.map((role) => ({
        value: role.roleName,
        label: (
          <span className="font-nunito text-base text-gray5">
            {role.roleName}
          </span>
        ),
      }));
      setOptions(mappedOptions);
    };

    fetchUserData();
    fetchRoleData();
  }, []);

  const handleChangeSelected = (value: string) => {
    setSelectedRole(value);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  const filteredRoles = accounts.filter((acc) => {
    const matchesSearch = acc.fullName
      .toLowerCase()
      .includes(search.toLowerCase());

    // Nếu role là null thì sẽ trả về true còn
    // nếu ko thì xét điều kiện bên kia
    const matchesRole = !selectedRole || acc.role === selectedRole;
    // Nếu true cả 2 đk thì sẽ cho trả về
    return matchesSearch && matchesRole;
  });

  const paginatedAccounts = filteredRoles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      <div className="container ps-6 pt-4">
        <h4 className="text-2xl font-bold text-orange500">
          Danh sách tài khoản
        </h4>
        <div className="mt-4 flex gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="">
                <p className="text-base font-semibold text-textGray500">
                  Xem theo
                </p>
                <Select
                  placeholder="Vai trò"
                  size="large"
                  onChange={handleChangeSelected}
                  suffixIcon={
                    <FaCaretDown className="text-2xl text-orange500" />
                  }
                  className="custom-user-select mt-1 h-11 w-[300px] font-nunito"
                  options={options}
                />
              </div>
              <div className="">
                <p className="text-base font-semibold text-textGray500">
                  Từ khoá
                </p>
                <Input
                  size="large"
                  suffix={<FiSearch className="text-xl text-orange500" />}
                  className="mt-1 h-11 w-[300px] border-[1.5px] font-nunito"
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
                    Tên đăng nhập
                  </th>
                  <th className="border-e border-white px-4">Họ tên</th>
                  <th className="border-e border-white px-4">Số điện thoại</th>
                  <th className="border-e border-white px-4">Email</th>
                  <th className="border-e border-white px-4">Vai trò</th>
                  <th className="border-e border-white px-4">
                    Trạng thái hoạt động
                  </th>
                  <th className="rounded-tr-xl px-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-textGray400">
                {paginatedAccounts.map((acc, index) => (
                  <UserRow
                    key={acc.id}
                    id={acc.id}
                    username={acc.username}
                    fullName={acc.fullName}
                    phoneNumber={acc.phoneNumber}
                    email={acc.email}
                    role={acc.role}
                    status={acc.status}
                    color={index % 2 !== 0 ? "bg-orange50" : "bg-white"}
                    lastRow={index === paginatedAccounts.length - 1}
                  />
                ))}
              </tbody>
            </table>
            <div className="float-end mt-6">
              <Pagination
                defaultCurrent={1}
                current={currentPage} // Trang hiện tại
                total={filteredRoles.length} // Tổng số tài khoản sau khi lọc
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger={false}
                itemRender={customPaginationitemRender}
              />
            </div>
          </div>
          <RightSideButton
            link="/home/user-manage/add"
            Icon={PiPlusSquareFill}
            text={
              <span>
                Thêm <br /> tài khoản
              </span>
            }
          />
        </div>
      </div>
    </>
  );
};
