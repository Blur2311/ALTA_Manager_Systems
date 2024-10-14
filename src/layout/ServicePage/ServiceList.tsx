import {
  DatePicker,
  DatePickerProps,
  Input,
  Pagination,
  PaginationProps,
  Select,
} from "antd";
import { FiSearch } from "react-icons/fi";
import { BiSolidRightArrow } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { PiPlusSquareFill } from "react-icons/pi";
import { FaCaretDown } from "react-icons/fa6";
import { RightSideButton } from "../../components/RightSideButton";
import { ServiceRow } from "./components/ServiceRow";
import { customPaginationitemRender } from "../../components/Pagination";
import { useEffect, useState } from "react";
import { Service } from "../../model/Service";
import { getAllService } from "../../utils/ServiceUtils";
import dayjs, { Dayjs } from "dayjs";

export const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>("Tất cả");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(9);

  useEffect(() => {
    const fetchServiceData = async () => {
      const data = await getAllService();
      data && setServices(data);
    };

    fetchServiceData();
  }, []);

  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedStatus(value);
  };
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

  const filteredServices = services.filter((ser) => {
    const matchesSearch = ser.serviceName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "Tất cả" || ser.status.toString() === selectedStatus;

    // Lọc theo thời gian tạo
    const matchesTimeCreate =
      (!startDate || dayjs(ser.timeCreate.toDate()).isAfter(startDate)) &&
      (!endDate || dayjs(ser.timeCreate.toDate()).isBefore(endDate));

    return matchesSearch && matchesStatus && matchesTimeCreate;
  });

  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      <div className="container ps-6 pt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý dịch vụ</h4>
        <div className="mt-4 flex gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="">
                  <p className="text-base font-semibold text-textGray500">
                    Trạng thái hoạt động
                  </p>
                  <Select
                    defaultValue="Tất cả"
                    size="large"
                    onChange={handleChange}
                    suffixIcon={
                      <FaCaretDown className="text-2xl text-orange500" />
                    }
                    className="custom-user-select mt-1 h-11 w-[300px] font-nunito"
                    options={[
                      {
                        value: "Tất cả",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Tất cả
                          </span>
                        ),
                      },
                      {
                        value: "true",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Hoạt động
                          </span>
                        ),
                      },
                      {
                        value: "false",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Ngưng hoạt động
                          </span>
                        ),
                      },
                    ]}
                  />
                </div>
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
                    Mã dịch vụ
                  </th>
                  <th className="border-e border-white px-4">Tên dịch vụ</th>
                  <th className="border-e border-white px-4">Mô tả</th>
                  <th className="border-e border-white px-4">
                    Trạng thái hoạt động
                  </th>
                  <th className="border-e border-white px-4"></th>
                  <th className="rounded-tr-xl px-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-textGray400">
                {paginatedServices.map((data, index) => (
                  <ServiceRow
                    key={data.id}
                    id={data.id}
                    serviceId={data.serviceId}
                    serviceName={data.serviceName}
                    description={data.description}
                    status={data.status}
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
                total={filteredServices.length} // Tổng số tài khoản sau khi lọc
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger={false}
                itemRender={customPaginationitemRender}
              />
            </div>
          </div>
          <RightSideButton
            link="/home/service/add"
            Icon={PiPlusSquareFill}
            text={
              <span>
                Thêm <br />
                dịch vụ
              </span>
            }
          />
        </div>
      </div>
    </>
  );
};
