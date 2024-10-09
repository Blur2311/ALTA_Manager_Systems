import {
  DatePicker,
  DatePickerProps,
  Input,
  Pagination,
  PaginationProps,
  Select,
} from "antd";
import { FiSearch } from "react-icons/fi";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { PiPlusSquareFill } from "react-icons/pi";
import { FaCaretDown } from "react-icons/fa6";
import { RightSideButton } from "../../../components/RightSideButton";
import { NumberRow } from "./NumberRow";

export const NumberList = () => {
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
                    onChange={handleChange}
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
                        value: "Khám sản - Phụ khoa",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Khám sản - Phụ khoa
                          </span>
                        ),
                      },
                      {
                        value: "Khám răng hàm mặt",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Khám răng hàm mặt
                          </span>
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="">
                  <p className="text-base font-semibold text-textGray500">
                    Tình trạng
                  </p>
                  <Select
                    defaultValue="Tất cả"
                    size="large"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                      onChange={onChangeDate}
                      format="DD/MM/YYYY"
                      placeholder="10/10/2021"
                      className="h-11 w-[145px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                    />
                    <BiSolidRightArrow className="text-[10px] text-textGray400" />
                    <DatePicker
                      suffixIcon={
                        <LuCalendarDays className="text-xl text-orange500" />
                      }
                      onChange={onChangeDate}
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
                <NumberRow
                  order={2010001}
                  customerName="Lê Huỳnh Ái Vân"
                  serviceName="Khám tim mạch"
                  provisionTime="14:35 - 07/11/2021"
                  expiryDate="14:35 - 12/11/2021"
                  status={true}
                  supplySource="Kiosk"
                  color="bg-white"
                  lastRow={false}
                />
                <NumberRow
                  order={2010001}
                  customerName="Lê Huỳnh Ái Vân"
                  serviceName="Khám tim mạch"
                  provisionTime="14:35 - 07/11/2021"
                  expiryDate="14:35 - 12/11/2021"
                  status={false}
                  supplySource="Kiosk"
                  color="bg-orange50"
                  lastRow={false}
                />
                <NumberRow
                  order={2010001}
                  customerName="Lê Huỳnh Ái Vân"
                  serviceName="Khám tim mạch"
                  provisionTime="14:35 - 07/11/2021"
                  expiryDate="14:35 - 12/11/2021"
                  status={null}
                  supplySource="Kiosk"
                  color="bg-white"
                  lastRow={false}
                />
                <NumberRow
                  order={2010001}
                  customerName="Lê Huỳnh Ái Vân"
                  serviceName="Khám tim mạch"
                  provisionTime="14:35 - 07/11/2021"
                  expiryDate="14:35 - 12/11/2021"
                  status={true}
                  supplySource="Kiosk"
                  color="bg-orange50"
                  lastRow={false}
                />
                <NumberRow
                  order={2010001}
                  customerName="Lê Huỳnh Ái Vân"
                  serviceName="Khám tim mạch"
                  provisionTime="14:35 - 07/11/2021"
                  expiryDate="14:35 - 12/11/2021"
                  status={false}
                  supplySource="Kiosk"
                  color="bg-white"
                  lastRow={false}
                />
                <NumberRow
                  order={2010001}
                  customerName="Lê Huỳnh Ái Vân"
                  serviceName="Khám tim mạch"
                  provisionTime="14:35 - 07/11/2021"
                  expiryDate="14:35 - 12/11/2021"
                  status={null}
                  supplySource="Kiosk"
                  color="bg-orange50"
                  lastRow={false}
                />
                <NumberRow
                  order={2010001}
                  customerName="Lê Huỳnh Ái Vân"
                  serviceName="Khám tim mạch"
                  provisionTime="14:35 - 07/11/2021"
                  expiryDate="14:35 - 12/11/2021"
                  status={true}
                  supplySource="Kiosk"
                  color="bg-white"
                  lastRow={false}
                />
                <NumberRow
                  order={2010001}
                  customerName="Lê Huỳnh Ái Vân"
                  serviceName="Khám tim mạch"
                  provisionTime="14:35 - 07/11/2021"
                  expiryDate="14:35 - 12/11/2021"
                  status={false}
                  supplySource="Kiosk"
                  color="bg-orange50"
                  lastRow={false}
                />
                <NumberRow
                  order={2010001}
                  customerName="Lê Huỳnh Ái Vân"
                  serviceName="Khám tim mạch"
                  provisionTime="14:35 - 07/11/2021"
                  expiryDate="14:35 - 12/11/2021"
                  status={null}
                  supplySource="Kiosk"
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
                Cấp <br /> số mới
              </span>
            }
          />
        </div>
      </div>
    </>
  );
};
