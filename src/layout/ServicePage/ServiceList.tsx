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
import { formatTimestamp, getAllService } from "../../utils/ServiceUtils";

export const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServiceData = async () => {
      const data = await getAllService();
      data && setServices(data);
    };

    fetchServiceData();
  }, []);

  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
  };
  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("Selected date:", dateString);
    console.log(date);
  };

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
                        value: "Hoạt động",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Hoạt động
                          </span>
                        ),
                      },
                      {
                        value: "Ngưng hoạt động",
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
                      } // Icon màu cam
                      onChange={onChangeDate}
                      format="DD/MM/YYYY"
                      placeholder="From"
                      className="h-11 w-[150px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                    />
                    <BiSolidRightArrow className="text-[10px] text-textGray400" />
                    <DatePicker
                      suffixIcon={
                        <LuCalendarDays className="text-xl text-orange500" />
                      }
                      onChange={onChangeDate}
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
                <ServiceRow
                  serviceId="KIO_01"
                  serviceName="Kiosk"
                  description="Mô tả dịch vụ 1"
                  status={true}
                  color="bg-white"
                  lastRow={false}
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
