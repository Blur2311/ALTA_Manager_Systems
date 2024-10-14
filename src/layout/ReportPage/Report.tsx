import {
  DatePicker,
  DatePickerProps,
  Pagination,
  PaginationProps,
  Select,
} from "antd";
import { BiSolidRightArrow } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { FaFileDownload } from "react-icons/fa";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { ReportRow } from "./ReportRow";
import { useEffect, useState } from "react";
import { customPaginationitemRender } from "../../components/Pagination";
import dayjs, { Dayjs } from "dayjs";
import { NumberManagement } from "../../model/Number";
import { getAllNumber } from "../../utils/NumberUtils";
import { formatTimestamp, getAllService } from "../../utils/ServiceUtils";
import { DownloadType, exportToExcel } from "../../utils/OtherUtils";

export const Report = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [numbers, setNumbers] = useState<NumberManagement[]>([]);

  const [options, setOptions] = useState<any[]>([]);
  const [orderNumbersOptions, setOrderNumbersOptions] = useState<any[]>([]);
  const [orderDayOptions, setOrderDayOptions] = useState<any[]>([]);

  const [selectedStatus, setSelectedStatus] = useState<string | null>("Tất cả");
  const [selectedSupply, setSelectedSupply] = useState<string | null>("Tất cả");
  const [selectedOrder, setSelectedOrder] = useState<string | null>("Tất cả");
  const [selectedDay, setSelectedDay] = useState<string | null>("Tất cả");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllNumber();
      data && setNumbers(data);
      if (data) {
        const uniqueOrders = new Set<string>();
        const mappedOptions: { value: string; label: JSX.Element }[] = [
          {
            value: "Tất cả",
            label: (
              <span className="font-nunito text-base text-gray5">Tất cả</span>
            ),
          },
          ...data.reduce(
            (acc: { value: string; label: JSX.Element }[], number) => {
              if (!uniqueOrders.has(number.order.toString())) {
                uniqueOrders.add(number.order.toString());
                acc.push({
                  value: number.order.toString(),
                  label: (
                    <span className="font-nunito text-base text-gray5">
                      {number.order}
                    </span>
                  ),
                });
              }
              return acc;
            },
            [],
          ),
        ];
        setOrderNumbersOptions(mappedOptions);

        const uniqueDayOrders = new Set<string>();
        const mappedDayOptions: { value: string; label: JSX.Element }[] = [
          {
            value: "Tất cả",
            label: (
              <span className="font-nunito text-base text-gray5">Tất cả</span>
            ),
          },
          ...data.reduce(
            (acc: { value: string; label: JSX.Element }[], number) => {
              if (!uniqueDayOrders.has(formatTimestamp(number.provisionTime))) {
                uniqueDayOrders.add(formatTimestamp(number.provisionTime));
                acc.push({
                  value: formatTimestamp(number.provisionTime),
                  label: (
                    <span className="font-nunito text-base text-gray5">
                      {formatTimestamp(number.provisionTime)}
                    </span>
                  ),
                });
              }
              return acc;
            },
            [],
          ),
        ];
        setOrderDayOptions(mappedDayOptions);
      }
      console.log(data);
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

  const handleChangeDay = (value: string) => {
    setSelectedDay(value);
  };
  const handleChangeOrderNumber = (value: string) => {
    setSelectedOrder(value);
  };
  const handleChangeStatus = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedStatus(value);
  };
  const handleChangeSupply = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedSupply(value);
  };
  const handleChangeMul = (value: string[]) => {
    console.log(`Selected: ${value}`);
    setSelectedServices(value);
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
      const matchesStatus =
        selectedStatus === "Tất cả" || data.status === selectedStatus;

      const matchesSupply =
        selectedSupply === "Tất cả" || data.supplySource === selectedSupply;

      const matchesOrder =
        selectedOrder === "Tất cả" || data.order.toString() === selectedOrder;

      const matchesDay =
        selectedDay === "Tất cả" ||
        formatTimestamp(data.provisionTime) === selectedDay;
      const matchesService =
        selectedServices.length === 0 ||
        selectedServices.includes("Tất cả") || // Kiểm tra "Tất cả"
        selectedServices.includes(data.serviceName);
      // Lọc theo thời gian tạo
      const matchesTimeCreate =
        (!startDate || dayjs(data.provisionTime.toDate()).isAfter(startDate)) &&
        (!endDate || dayjs(data.provisionTime.toDate()).isBefore(endDate));

      return (
        matchesStatus &&
        matchesService &&
        matchesSupply &&
        matchesDay &&
        matchesOrder &&
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

  const downloadFile = async () => {
    const downloadData: DownloadType[] = numbers.map((data) => ({
      order: data.order,
      serviceName: data.serviceName,
      provisionTime: data.provisionTime,
      status: data.status,
      supplySource: data.supplySource,
    }));
    await exportToExcel(downloadData);
    console.log(downloadData);
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
                    onChange={onStartDateChange}
                    format="DD/MM/YYYY"
                    placeholder="10/10/2021"
                    className="h-11 w-[150px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                  />
                  <BiSolidRightArrow className="text-[10px] text-textGray400" />
                  <DatePicker
                    suffixIcon={
                      <LuCalendarDays className="text-xl text-orange500" />
                    }
                    onChange={onEndDateChange}
                    format="DD/MM/YYYY"
                    placeholder="18/10/2021"
                    className="h-11 w-[150px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                  />
                </div>
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
                    <Select
                      placeholder={
                        <span className="text-white">Số thứ tự</span>
                      }
                      size="large"
                      onChange={handleChangeOrderNumber}
                      suffixIcon={
                        <TbCaretUpDownFilled className="text-base text-white" />
                      }
                      className="custom-report-select h-full w-full font-nunito"
                      options={orderNumbersOptions}
                    />
                  </th>
                  <th className="border-e border-white px-4">
                    <Select
                      mode="multiple"
                      maxTagCount={1}
                      placeholder={
                        <span className="text-white">Tên dịch vụ</span>
                      }
                      size="large"
                      onChange={handleChangeMul}
                      suffixIcon={
                        <TbCaretUpDownFilled className="text-base text-white" />
                      }
                      className="custom-report-select h-full w-full font-nunito"
                      options={options}
                    />
                  </th>
                  <th className="border-e border-white px-4">
                    <Select
                      placeholder={
                        <span className="text-white">Thời gian cấp</span>
                      }
                      size="large"
                      onChange={handleChangeDay}
                      suffixIcon={
                        <TbCaretUpDownFilled className="text-base text-white" />
                      }
                      className="custom-report-select h-full w-full font-nunito"
                      options={orderDayOptions}
                    />
                  </th>
                  <th className="border-e border-white px-4">
                    <Select
                      placeholder={
                        <span className="text-white">Tình trạng</span>
                      }
                      size="large"
                      onChange={handleChangeStatus}
                      suffixIcon={
                        <TbCaretUpDownFilled className="text-base text-white" />
                      }
                      className="custom-report-select h-full w-full font-nunito"
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
                  </th>
                  <th className="rounded-tr-xl px-4">
                    <Select
                      placeholder={
                        <span className="text-white">Nguồn cấp</span>
                      }
                      size="large"
                      onChange={handleChangeSupply}
                      suffixIcon={
                        <TbCaretUpDownFilled className="text-base text-white" />
                      }
                      className="custom-report-select h-full w-full font-nunito"
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
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-textGray400">
                {paginated.map((data, index) => (
                  <ReportRow
                    key={data.id}
                    order={data.order}
                    serviceName={data.serviceName}
                    provisionTime={data.provisionTime}
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
          <button
            onClick={downloadFile}
            type="button"
            className="w-20 rounded-s-lg bg-orange50 px-1 py-3"
          >
            <div className="flex flex-col items-center gap-1">
              <FaFileDownload className="text-[28px] text-orange500" />
              <p className="text-center text-sm font-semibold text-orange500">
                Tải về
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
