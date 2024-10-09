import {
  DatePickerProps,
  Input,
  Pagination,
  PaginationProps,
  Select,
} from "antd";
import { FiSearch } from "react-icons/fi";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

import { PiPlusSquareFill } from "react-icons/pi";
import { FaCaretDown } from "react-icons/fa6";
import { RightSideButton } from "../../../components/RightSideButton";
import { DeviceRow } from "./DeviceRow";

export const DeviceList = () => {
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
        <h4 className="text-2xl font-bold text-orange500">
          Danh sách thiết bị
        </h4>
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
                    Trạng thái kết nối
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
                        value: "Kết nối",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Kết nối
                          </span>
                        ),
                      },
                      {
                        value: "Mất kết nối",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Mất kết nối
                          </span>
                        ),
                      },
                    ]}
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
                  <th className="rounded-tl-xl border-e border-white pe-2 ps-4">
                    Mã thiết bị
                  </th>
                  <th className="border-e border-white px-2">Tên thiết bị</th>
                  <th className="border-e border-white px-2">Địa chỉ IP</th>
                  <th className="border-e border-white px-2">
                    Trạng thái hoạt động
                  </th>
                  <th className="border-e border-white px-2">
                    Trạng thái kết nối
                  </th>
                  <th className="border-e border-white px-4">
                    Dịch vụ sử dụng
                  </th>
                  <th className="border-e border-white px-4"></th>
                  <th className="rounded-tr-xl px-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-textGray400">
                <DeviceRow
                  deviceId="KIO_01"
                  deviceName="Kiosk"
                  ipAddress="192.168.1.10"
                  status={true}
                  connectionStatus={false}
                  usedServices="Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt,
                  Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
                  color="bg-white"
                  lastRow={false}
                />
                <DeviceRow
                  deviceId="KIO_01"
                  deviceName="Kiosk"
                  ipAddress="192.168.1.10"
                  status={true}
                  connectionStatus={true}
                  usedServices="Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt,
                  Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
                  color="bg-orange50"
                  lastRow={false}
                />
                <DeviceRow
                  deviceId="KIO_01"
                  deviceName="Kiosk"
                  ipAddress="192.168.1.10"
                  status={true}
                  connectionStatus={true}
                  usedServices="Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt,
                  Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
                  color="bg-white"
                  lastRow={false}
                />
                <DeviceRow
                  deviceId="KIO_01"
                  deviceName="Kiosk"
                  ipAddress="192.168.1.10"
                  status={false}
                  connectionStatus={true}
                  usedServices="Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt,
                  Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
                  color="bg-orange50"
                  lastRow={false}
                />
                <DeviceRow
                  deviceId="KIO_01"
                  deviceName="Kiosk"
                  ipAddress="192.168.1.10"
                  status={false}
                  connectionStatus={false}
                  usedServices="Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt,
                  Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
                  color="bg-white"
                  lastRow={false}
                />
                <DeviceRow
                  deviceId="KIO_01"
                  deviceName="Kiosk"
                  ipAddress="192.168.1.10"
                  status={true}
                  connectionStatus={true}
                  usedServices="Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt,
                  Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
                  color="bg-orange50"
                  lastRow={false}
                />
                <DeviceRow
                  deviceId="KIO_01"
                  deviceName="Kiosk"
                  ipAddress="192.168.1.10"
                  status={true}
                  connectionStatus={false}
                  usedServices="Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt,
                  Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
                  color="bg-white"
                  lastRow={false}
                />
                <DeviceRow
                  deviceId="KIO_01"
                  deviceName="Kiosk"
                  ipAddress="192.168.1.10"
                  status={true}
                  connectionStatus={true}
                  usedServices="Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt,
                  Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
                  color="bg-orange50"
                  lastRow={false}
                />
                <DeviceRow
                  deviceId="KIO_01"
                  deviceName="Kiosk"
                  ipAddress="192.168.1.10"
                  status={true}
                  connectionStatus={false}
                  usedServices="Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt,
                  Khám tai mũi họng, Khám hô hấp, Khám tổng quát"
                  color="bg-white"
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
          <RightSideButton
            Icon={PiPlusSquareFill}
            text={
              <span>
                Thêm <br /> thiết bị
              </span>
            }
          />
        </div>
      </div>
    </>
  );
};
