import {
  DatePicker,
  DatePickerProps,
  Input,
  Pagination,
  PaginationProps,
} from "antd";
import { FiSearch } from "react-icons/fi";
import { BiSolidRightArrow } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { UserHistoryRow } from "./components/UserHistoryRow";
import { customPaginationitemRender } from "../../components/Pagination";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { UserLog } from "../../model/UserLog";
import Cookies from "js-cookie";
import { getUserLogByUsername } from "../../utils/UserLogUtils";

export const UserHistory = () => {
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const accountCookie = Cookies.get("userInfo");
        if (accountCookie) {
          const parsedAccount = JSON.parse(accountCookie);
          const logData = await getUserLogByUsername(parsedAccount.username);
          logData && setUserLogs(logData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLogData();
  }, []);

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  const onStartDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setStartDate(date);
    console.log("Selected start date:", dateString);
  };

  const onEndDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setEndDate(date);
    console.log("Selected end date:", dateString);
  };

  const filteredLogs = userLogs
    .filter((data) => {
      const matchesSearch = data.username
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTimeCreate =
        (!startDate || dayjs(data.timestamp.toDate()).isAfter(startDate)) &&
        (!endDate || dayjs(data.timestamp.toDate()).isBefore(endDate));

      return matchesSearch && matchesTimeCreate;
    })
    // Sắp xếp theo timestamp giảm dần
    .sort(
      (a, b) => b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime(),
    );

  const paginatedServices = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

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
                    }
                    onChange={onStartDateChange}
                    format="DD/MM/YYYY"
                    placeholder="From"
                    className="h-11 w-[150px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                  />
                  <BiSolidRightArrow className="text-[10px] text-textGray400" />
                  <DatePicker
                    suffixIcon={
                      <LuCalendarDays className="text-xl text-orange500" />
                    }
                    onChange={onEndDateChange}
                    format="DD/MM/YYYY"
                    placeholder="To"
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
                  <th className="border-e border-white px-4">
                    Thời gian tác động
                  </th>
                  <th className="border-e border-white px-4">IP thực hiện</th>
                  <th className="rounded-tr-xl px-4">Thao tác thực hiện</th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-textGray400">
                {paginatedServices.map((data, index) => (
                  <UserHistoryRow
                    key={data.id}
                    username={data.username}
                    timestamp={data.timestamp}
                    ipAddress={data.ipAddress}
                    action={data.action}
                    color={index % 2 !== 0 ? "bg-orange50" : "bg-white"}
                    lastRow={index === paginatedServices.length - 1}
                  />
                ))}
              </tbody>
            </table>
            <div className="float-end mt-6">
              <Pagination
                defaultCurrent={1}
                current={currentPage} // Trang hiện tại
                total={filteredLogs.length} // Tổng số tài khoản sau khi lọc
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger={false}
                itemRender={customPaginationitemRender}
              />
            </div>
          </div>
          <div className="w-20"></div>
        </div>
      </div>
    </>
  );
};
