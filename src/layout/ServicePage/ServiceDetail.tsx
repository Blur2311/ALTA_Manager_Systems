import {
  DatePicker,
  DatePickerProps,
  Input,
  InputNumber,
  Pagination,
  PaginationProps,
  Select,
} from "antd";
import { FaCaretDown } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { ServiceDetailRow } from "./components/ServiceDetailRow";
import { FaSquarePen } from "react-icons/fa6";
import { PiKeyReturnFill } from "react-icons/pi";
import { customPaginationitemRender } from "../../components/Pagination";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiceById } from "../../utils/ServiceUtils";
import { Service } from "../../model/Service";
import { NumberManagement } from "../../model/Number";
import { getAllNumber } from "../../utils/NumberUtils";
import dayjs, { Dayjs } from "dayjs";

export const ServiceDetail = () => {
  const [service, setService] = useState<Service>();
  const [numbers, setNumbers] = useState<NumberManagement[]>([]);

  const [selectedStatus, setSelectedStatus] = useState<string | null>("Tất cả");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(8);

  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn

  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        const data = await getServiceById(id);
        data &&
          setService({
            id: id,
            serviceId: data.serviceId,
            serviceName: data.serviceName,
            description: data.description,
            autoIncreFrom: data.autoIncreFrom,
            autoIncreTo: data.autoIncreTo,
            currentNumber: data.currentNumber,
            prefix: data.prefix,
            surfix: data.surfix,
            reset: data.reset,
            status: data.status,
            timeCreate: data.timeCreate,
          });
      }
    };
    const fetchData = async () => {
      const data = await getAllNumber();
      data && setNumbers(data);
    };

    fetchData();
    fetchService();
  }, []);

  const handleChangeStatus = (value: string) => {
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

  const filtered = numbers
    .filter((data) => {
      const matchesSearch = data.order
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        selectedStatus === "Tất cả" || data.status === selectedStatus;

      // Lọc theo thời gian tạo
      const matchesTimeCreate =
        (!startDate || dayjs(data.provisionTime.toDate()).isAfter(startDate)) &&
        (!endDate || dayjs(data.provisionTime.toDate()).isBefore(endDate));

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTimeCreate &&
        data.serviceName === service?.serviceName
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
      <div className="ms-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý dịch vụ</h4>
        <div className="mt-8">
          <div className="flex gap-6">
            <div className="min-h-[606px] w-[370px] rounded-2xl bg-white shadow-shadowBox">
              <div className="px-6 py-4">
                <h6 className="text-xl font-bold text-orange500">
                  Thông tin dịch vụ
                </h6>
                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex items-end">
                    <p className="w-[100px] text-base font-semibold text-textGray500">
                      Mã dịch vụ:
                    </p>
                    <p className="font-normal text-textGray400">
                      {service?.serviceId}
                    </p>
                  </div>
                  <div className="flex items-end">
                    <p className="w-[100px] text-base font-semibold text-textGray500">
                      Tên dịch vụ:
                    </p>
                    <p className="font-normal text-textGray400">
                      {service?.serviceName}
                    </p>
                  </div>
                  <div className="flex items-end">
                    <p className="w-[100px] text-base font-semibold text-textGray500">
                      Mô tả:
                    </p>
                    <p className="font-normal text-textGray400">
                      {service?.description}
                    </p>
                  </div>
                </div>
                <h6 className="mt-4 text-xl font-bold text-orange500">
                  Quy tắc cấp số
                </h6>
                <div className="mt-3 flex">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-[10px]">
                      <div className="min-w-[125px]">
                        <p className="text-base font-semibold text-textGray500">
                          Tăng tự động từ:
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <InputNumber
                          size="small"
                          className="w-[70px] border-[1.5px] border-gray100 px-[5px] py-[10px] !font-nunito text-base font-normal text-textGray400"
                          readOnly
                          value={service?.autoIncreFrom}
                        />
                        <p>đến</p>
                        <InputNumber
                          size="small"
                          className="w-[70px] border-[1.5px] border-gray100 px-[5px] py-[10px] !font-nunito text-base font-normal text-textGray400"
                          value={service?.autoIncreTo}
                          readOnly
                        />
                      </div>
                    </div>
                    {service?.prefix != 0 && (
                      <div className="flex items-center gap-[10px]">
                        <div className="min-w-[125px]">
                          <p className="text-base font-semibold text-textGray500">
                            Prefix:
                          </p>
                        </div>
                        <InputNumber
                          size="small"
                          className="w-[70px] border-[1.5px] border-gray100 px-[5px] py-[10px] !font-nunito text-base font-normal text-textGray400"
                          readOnly
                          value={service?.prefix}
                        />
                      </div>
                    )}
                    {service?.surfix != 0 && (
                      <div className="flex items-center gap-[10px]">
                        <div className="min-w-[125px]">
                          <p className="text-base font-semibold text-textGray500">
                            Surfix:
                          </p>
                        </div>
                        <InputNumber
                          size="small"
                          className="w-[70px] border-[1.5px] border-gray100 px-[5px] py-[10px] !font-nunito text-base font-normal text-textGray400"
                          readOnly
                          value={service?.surfix}
                        />
                      </div>
                    )}
                    {service?.reset && (
                      <p className="text-base font-semibold text-textGray500">
                        Reset mỗi ngày
                      </p>
                    )}
                    <p className="text-base font-normal text-textGray500">
                      Ví dụ:{" "}
                      {`${service?.prefix != 0 ? service?.prefix : ""}${service?.autoIncreFrom != 0 ? service?.autoIncreFrom : ""}${service?.surfix != 0 ? service?.surfix : ""}
                      - ${service?.prefix != 0 ? service?.prefix : ""}${service?.autoIncreTo != 0 ? service?.autoIncreTo : ""}${service?.surfix != 0 ? service?.surfix : ""}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-2xl bg-white px-6 pb-3 pt-4 shadow-shadowBox">
              <div className="">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="">
                        <p className="text-base font-semibold text-textGray500">
                          Trạng thái hoạt động
                        </p>
                        <Select
                          defaultValue="Tất cả"
                          size="large"
                          onChange={handleChangeStatus}
                          suffixIcon={
                            <FaCaretDown className="text-2xl text-orange500" />
                          }
                          className="custom-user-select mt-1 h-11 w-[160px] font-nunito"
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
                              value: "Đã sử dụng",
                              label: (
                                <span className="font-nunito text-base text-gray5">
                                  Đã hoàn thành
                                </span>
                              ),
                            },
                            {
                              value: "Đang chờ",
                              label: (
                                <span className="font-nunito text-base text-gray5">
                                  Đã thực hiện
                                </span>
                              ),
                            },
                            {
                              value: "Bỏ qua",
                              label: (
                                <span className="font-nunito text-base text-gray5">
                                  Vắng
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
                            className="h-11 w-[130px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                          />
                          <BiSolidRightArrow className="text-[10px] text-textGray400" />
                          <DatePicker
                            suffixIcon={
                              <LuCalendarDays className="text-xl text-orange500" />
                            }
                            onChange={onEndDateChange}
                            format="DD/MM/YYYY"
                            placeholder="18/10/2021"
                            className="h-11 w-[130px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
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
                        className="mt-1 h-11 w-[188px] border-[1.5px] font-nunito"
                        placeholder="Nhập từ khóa"
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-6">
                <div className="flex-1">
                  <table className="w-full rounded-xl shadow-shadowBox">
                    <thead>
                      <tr className="h-12 bg-orange400 text-left text-base font-bold text-white">
                        <th className="rounded-tl-xl border-e border-white px-4">
                          Số thứ tự
                        </th>
                        <th className="rounded-tr-xl px-4">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-normal text-textGray400">
                      {paginated.map((data, index) => (
                        <ServiceDetailRow
                          orderNumber={data.order}
                          status={data.status}
                          color={index % 2 !== 0 ? "bg-orange50" : "bg-white"}
                          lastRow={index === paginated.length - 1}
                        />
                      ))}
                    </tbody>
                  </table>
                  <div className="float-end mt-4">
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
              </div>
            </div>
            <div className="w-20">
              <div className="flex flex-col items-center rounded-s-lg bg-orange50">
                <Link
                  to={`/home/service/update/${id}`}
                  className="w-full px-1 py-3"
                >
                  <div className="flex flex-col items-center gap-1">
                    <FaSquarePen className="text-[28px] text-orange500" />
                    <p className="text-center text-sm font-semibold text-orange500">
                      Cập nhật
                      <br />
                      danh sách
                    </p>
                  </div>
                </Link>
                <div className="h-[1px] w-[72px] bg-orange100"></div>
                <Link to={`/home/service`} className="w-full px-1 py-3">
                  <div className="flex flex-col items-center gap-1">
                    <PiKeyReturnFill className="text-[28px] text-orange500" />
                    <p className="text-center text-sm font-semibold text-orange500">
                      Quay lại
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
