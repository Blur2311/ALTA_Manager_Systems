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
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { ServiceDetailRow } from "./components/ServiceDetailRow";
import { FaSquarePen } from "react-icons/fa6";
import { PiKeyReturnFill } from "react-icons/pi";

export const ServiceDetail = () => {
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
      <div className="ms-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý dịch vụ</h4>
        <div className="mt-8">
          <div className="flex gap-6">
            <div className="w-[370px] rounded-2xl bg-white shadow-shadowBox">
              <div className="px-6 py-4">
                <h6 className="text-xl font-bold text-orange500">
                  Thông tin dịch vụ
                </h6>
                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex items-end">
                    <p className="w-[100px] text-base font-semibold text-textGray500">
                      Mã dịch vụ:
                    </p>
                    <p className="font-normal text-textGray400">201</p>
                  </div>
                  <div className="flex items-end">
                    <p className="w-[100px] text-base font-semibold text-textGray500">
                      Tên dịch vụ:
                    </p>
                    <p className="font-normal text-textGray400">
                      Khám tim mạch
                    </p>
                  </div>
                  <div className="flex items-end">
                    <p className="w-[100px] text-base font-semibold text-textGray500">
                      Mô tả:
                    </p>
                    <p className="font-normal text-textGray400">
                      Chuyên các bệnh lý về tim
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
                          // status={`${error ? "error" : ""}`}
                          // disabled={load}
                          // value={username}
                          // onChange={(e) => setUsername(e.target.value)}
                        />
                        <p>đến</p>
                        <InputNumber
                          size="small"
                          className="w-[70px] border-[1.5px] border-gray100 px-[5px] py-[10px] !font-nunito text-base font-normal text-textGray400"
                          // status={`${error ? "error" : ""}`}
                          // disabled={load}
                          // value={username}
                          // onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <div className="min-w-[125px]">
                        <p className="text-base font-semibold text-textGray500">
                          Prefix:
                        </p>
                      </div>
                      <InputNumber
                        size="small"
                        className="w-[70px] border-[1.5px] border-gray100 px-[5px] py-[10px] !font-nunito text-base font-normal text-textGray400"
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <p className="text-base font-semibold text-textGray500">
                      Reset mỗi ngày
                    </p>
                    <p className="text-base font-normal text-textGray500">
                      Ví dụ: 201-2001
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
                          onChange={handleChange}
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
                              value: "Đã hoàn thành",
                              label: (
                                <span className="font-nunito text-base text-gray5">
                                  Đã hoàn thành
                                </span>
                              ),
                            },
                            {
                              value: "Đã thực hiện",
                              label: (
                                <span className="font-nunito text-base text-gray5">
                                  Đã thực hiện
                                </span>
                              ),
                            },
                            {
                              value: "Vắng",
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
                            onChange={onChangeDate}
                            format="DD/MM/YYYY"
                            placeholder="10/10/2021"
                            className="h-11 w-[130px] border-[1.5px] px-4 py-2 font-nunito text-base font-normal"
                          />
                          <BiSolidRightArrow className="text-[10px] text-textGray400" />
                          <DatePicker
                            suffixIcon={
                              <LuCalendarDays className="text-xl text-orange500" />
                            }
                            onChange={onChangeDate}
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
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
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
                      <ServiceDetailRow
                        orderNumber={2010001}
                        status={true}
                        color="bg-white"
                        lastRow={false}
                      />
                      <ServiceDetailRow
                        orderNumber={2010001}
                        status={false}
                        color="bg-orange50"
                        lastRow={false}
                      />
                      <ServiceDetailRow
                        orderNumber={2010001}
                        status={null}
                        color="bg-white"
                        lastRow={false}
                      />
                      <ServiceDetailRow
                        orderNumber={2010001}
                        status={false}
                        color="bg-orange50"
                        lastRow={false}
                      />
                      <ServiceDetailRow
                        orderNumber={2010001}
                        status={null}
                        color="bg-white"
                        lastRow={false}
                      />
                      <ServiceDetailRow
                        orderNumber={2010001}
                        status={false}
                        color="bg-orange50"
                        lastRow={false}
                      />
                      <ServiceDetailRow
                        orderNumber={2010001}
                        status={null}
                        color="bg-white"
                        lastRow={false}
                      />
                      <ServiceDetailRow
                        orderNumber={2010001}
                        status={false}
                        color="bg-orange50"
                        lastRow={true}
                      />
                    </tbody>
                  </table>
                  <div className="float-end mt-4">
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
              </div>
            </div>
            <div className="w-20">
              <div className="flex flex-col items-center rounded-s-lg bg-orange50">
                <button type="button" className="w-full px-1 py-3">
                  <div className="flex flex-col items-center gap-1">
                    <FaSquarePen className="text-[28px] text-orange500" />
                    <p className="text-center text-sm font-semibold text-orange500">
                      Cập nhật
                      <br />
                      danh sách
                    </p>
                  </div>
                </button>
                <div className="h-[1px] w-[72px] bg-orange100"></div>
                <button type="button" className="w-full px-1 py-3">
                  <div className="flex flex-col items-center gap-1">
                    <PiKeyReturnFill className="text-[28px] text-orange500" />
                    <p className="text-center text-sm font-semibold text-orange500">
                      Quay lại
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
