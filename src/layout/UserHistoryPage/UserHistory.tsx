import {
  DatePicker,
  DatePickerProps,
  Input,
  Pagination,
  PaginationProps,
} from "antd";
import { FiSearch } from "react-icons/fi";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { UserHistoryRow } from "./components/UserHistoryRow";

export const UserHistory = () => {
  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("Selected date:", dateString);
  };
  const itemRender = (
    current: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactNode,
  ) => {
    if (type === "prev") {
      return (
        <div className="flex h-full items-center justify-center rounded-md">
          <BiSolidLeftArrow className="text-textGray200" />
        </div>
      );
    }
    if (type === "next") {
      return (
        <div className="flex h-full items-center justify-center rounded-md">
          <BiSolidRightArrow className="text-textGray200" />
        </div>
      );
    }
    return originalElement;
  };

  return (
    <>
      <div className="container ps-6 pt-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="">
                <p className="text-base font-semibold text-textGray500">
                  Chọn thời gian
                </p>
                <div className="mt-1 flex items-center justify-start gap-1">
                  <DatePicker
                    suffixIcon={
                      <LuCalendarDays className="text-xl text-orange500" />
                    } // Icon màu cam
                    onChange={onChangeDate}
                    format="DD/MM/YYYY"
                    placeholder="10/10/2021"
                    className="h-11 w-[150px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                  />
                  <BiSolidRightArrow className="text-[10px] text-textGray400" />
                  <DatePicker
                    suffixIcon={
                      <LuCalendarDays className="text-xl text-orange500" />
                    }
                    onChange={onChangeDate}
                    format="DD/MM/YYYY"
                    placeholder="18/10/2021"
                    className="h-11 w-[150px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                  />
                </div>
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
                  // status={`${error ? "error" : ""}`}
                  // disabled={load}
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
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
                  <th className="border-e border-white px-4">
                    Thời gian tác động
                  </th>
                  <th className="border-e border-white px-4">IP thực hiện</th>
                  <th className="rounded-tr-xl px-4">Thao tác thực hiện</th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-textGray400">
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-white"
                  lastRow={false}
                />
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-orange50"
                  lastRow={false}
                />
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-white"
                  lastRow={false}
                />
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-orange50"
                  lastRow={false}
                />
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-white"
                  lastRow={false}
                />
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-orange50"
                  lastRow={false}
                />
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-white"
                  lastRow={false}
                />
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-orange50"
                  lastRow={false}
                />
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-white"
                  lastRow={false}
                />
                <UserHistoryRow
                  username="tuyetnguyen@12"
                  timestamp="01/12/2021 15:12:17"
                  ipAddress="192.168.3.1"
                  action="Cập nhật thông tin dịch vụ DV_01"
                  color="bg-orange50"
                  lastRow={true}
                />
              </tbody>
            </table>
            <div className="float-end mt-6">
              <Pagination
                defaultCurrent={1}
                total={500}
                pageSize={10}
                onChange={onChange}
                showSizeChanger={false}
                itemRender={itemRender}
              />
            </div>
          </div>
          <div className="w-20"></div>
        </div>
      </div>
    </>
  );
};
