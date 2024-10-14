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
import { NumberRow } from "./components/NumberRow";
import { useEffect, useState } from "react";
import { NumberManagement } from "../../model/Number";
import { getAllNumber } from "../../utils/NumberUtils";
import dayjs, { Dayjs } from "dayjs";
import { customPaginationitemRender } from "../../components/Pagination";
import { getAllService } from "../../utils/ServiceUtils";

export const NumberList = () => {
  const [numbers, setNumbers] = useState<NumberManagement[]>([]);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>("Tất cả");
  const [selectedSupply, setSelectedSupply] = useState<string | null>("Tất cả");
  const [selectedService, setSelectedService] = useState<string | null>(
    "Tất cả",
  );
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllNumber();
      data && setNumbers(data);
    };

    const fetchServiceData = async () => {
      const fetchedService = await getAllService();
      if (fetchedService) {
        const mappedOptions = [
          {
            value: "Tất cả",
            label: (
              <span className="font-nunito text-base text-gray5">Tất cả</span>
            ),
          },
          ...fetchedService.map((data) => ({
            value: data.serviceName,
            label: (
              <span className="font-nunito text-base text-gray5">
                {data.serviceName}
              </span>
            ),
          })),
        ];
        setOptions(mappedOptions);
      }
    };

    fetchServiceData();
    fetchData();
  }, []);

  const handleChangeStatus = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedStatus(value);
  };
  const handleChangeSupply = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedSupply(value);
  };
  const handleChangeService = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedService(value);
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

  const filtered = numbers
    .filter((data) => {
      const matchesSearch = data.customerName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        selectedStatus === "Tất cả" || data.status === selectedStatus;

      const matchesSupply =
        selectedSupply === "Tất cả" || data.supplySource === selectedSupply;

      const matchesService =
        selectedService === "Tất cả" || data.serviceName === selectedService;

      // Lọc theo thời gian tạo
      const matchesTimeCreate =
        (!startDate || dayjs(data.provisionTime.toDate()).isAfter(startDate)) &&
        (!endDate || dayjs(data.provisionTime.toDate()).isBefore(endDate));

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSupply &&
        matchesService &&
        matchesTimeCreate
      );
    })
    .sort(
      (a, b) =>
        b.provisionTime.toDate().getTime() - a.provisionTime.toDate().getTime(),
    ); // Sắp xếp theo provisionTime từ mới nhất đến cũ nhất

  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      <div className="container ps-6 pt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý cấp số</h4>
        <div className="mt-4 flex gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="">
                  <p className="text-base font-semibold text-textGray500">
                    Tên dịch vụ
                  </p>
                  <Select
                    defaultValue="Tất cả"
                    size="large"
                    onChange={handleChangeService}
                    suffixIcon={
                      <FaCaretDown className="text-2xl text-orange500" />
                    }
                    className="custom-user-select mt-1 h-11 w-[154px] font-nunito"
                    options={options}
                  />
                </div>
                <div className="">
                  <p className="text-base font-semibold text-textGray500">
                    Tình trạng
                  </p>
                  <Select
                    defaultValue="Tất cả"
                    size="large"
                    onChange={handleChangeStatus}
                    suffixIcon={
                      <FaCaretDown className="text-2xl text-orange500" />
                    }
                    className="custom-user-select mt-1 h-11 w-[154px] font-nunito"
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
                        value: "Đang chờ",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Đang chờ
                          </span>
                        ),
                      },
                      {
                        value: "Đã sử dụng",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Đã sử dụng
                          </span>
                        ),
                      },
                      {
                        value: "Bỏ qua",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Bỏ qua
                          </span>
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="">
                  <p className="text-base font-semibold text-textGray500">
                    Nguồn cấp
                  </p>
                  <Select
                    defaultValue="Tất cả"
                    size="large"
                    onChange={handleChangeSupply}
                    suffixIcon={
                      <FaCaretDown className="text-2xl text-orange500" />
                    }
                    className="custom-user-select mt-1 h-11 w-[154px] font-nunito"
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
                        value: "Kiosk",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Kiosk
                          </span>
                        ),
                      },
                      {
                        value: "Hệ thống",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Hệ thống
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
                      } // Icon màu cam
                      onChange={onStartDateChange}
                      format="DD/MM/YYYY"
                      placeholder="10/10/2021"
                      className="h-11 w-[145px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                    />
                    <BiSolidRightArrow className="text-[10px] text-textGray400" />
                    <DatePicker
                      suffixIcon={
                        <LuCalendarDays className="text-xl text-orange500" />
                      }
                      onChange={onEndDateChange}
                      format="DD/MM/YYYY"
                      placeholder="18/10/2021"
                      className="h-11 w-[145px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
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
                  className="mt-1 h-11 w-[230px] border-[1.5px] font-nunito"
                  placeholder="Nhập từ khóa"
                  // status={`${error ? "error" : ""}`}
                  // disabled={load}
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
                    STT
                  </th>
                  <th className="border-e border-white px-4">Tên khách hàng</th>
                  <th className="border-e border-white px-4">Tên dịch vụ</th>
                  <th className="border-e border-white px-4">Thời gian cấp</th>
                  <th className="border-e border-white px-4">Hạn sử dụng</th>
                  <th className="border-e border-white px-4">Trạng thái</th>
                  <th className="border-e border-white px-4">Nguồn cấp</th>
                  <th className="rounded-tr-xl px-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-textGray400">
                {paginated.map((data, index) => (
                  <NumberRow
                    key={data.id}
                    id={data.id}
                    order={data.order}
                    customerName={data.customerName}
                    serviceName={data.serviceName}
                    provisionTime={data.provisionTime}
                    expiryDate={data.expiryDate}
                    status={data.status}
                    supplySource={data.supplySource}
                    color={index % 2 !== 0 ? "bg-orange50" : "bg-white"}
                    lastRow={index === paginated.length - 1}
                  />
                ))}
              </tbody>
            </table>
            <div className="float-end mt-6">
              <Pagination
                defaultCurrent={1}
                current={currentPage} // Trang hiện tại
                total={filtered.length} // Tổng số tài khoản sau khi lọc
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger={false}
                itemRender={customPaginationitemRender}
              />
            </div>
          </div>
          <RightSideButton
            link="/home/number/add"
            Icon={PiPlusSquareFill}
            text={
              <span>
                Cấp <br /> số mới
              </span>
            }
          />
        </div>
      </div>
    </>
  );
};
