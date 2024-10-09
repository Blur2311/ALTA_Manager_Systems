import {
  DatePicker,
  DatePickerProps,
  Pagination,
  PaginationProps,
  Select,
} from "antd";
import { BiSolidRightArrow } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { RightSideButton } from "../../components/RightSideButton";
import { FaFileDownload } from "react-icons/fa";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { ReportRow } from "./ReportRow";
import { useState } from "react";
import { customPaginationitemRender } from "../../components/Pagination";

export const Report = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const handleChangeMul = (value: string[]) => {
    console.log(`Selected: ${value}`);
    setSelectedServices(value);
  };
  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
  };
  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("Selected date:", dateString);
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
                      onChange={handleChange}
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
                          value: "2040001",
                          label: (
                            <span className="font-nunito text-base text-gray5">
                              2040001
                            </span>
                          ),
                        },
                        {
                          value: "2040002",
                          label: (
                            <span className="font-nunito text-base text-gray5">
                              2040002
                            </span>
                          ),
                        },
                      ]}
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
                      value={selectedServices}
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
                          value: "Khám tim mạch",
                          label: (
                            <span className="font-nunito text-base text-gray5">
                              Khám tim mạch
                            </span>
                          ),
                        },
                        {
                          value: "Khám mắt",
                          label: (
                            <span className="font-nunito text-base text-gray5">
                              Khám mắt
                            </span>
                          ),
                        },
                        {
                          value: "Khám tổng quát",
                          label: (
                            <span className="font-nunito text-base text-gray5">
                              Khám tổng quát
                            </span>
                          ),
                        },
                      ]}
                    />
                  </th>
                  <th className="border-e border-white px-4">
                    <Select
                      placeholder={
                        <span className="text-white">Thời gian cấp</span>
                      }
                      size="large"
                      onChange={handleChange}
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
                          value: "07:10  01/10/2021",
                          label: (
                            <span className="font-nunito text-base text-gray5">
                              07:10 01/10/2021
                            </span>
                          ),
                        },
                        {
                          value: "07:28  01/10/2021",
                          label: (
                            <span className="font-nunito text-base text-gray5">
                              07:28 01/10/2021
                            </span>
                          ),
                        },
                      ]}
                    />
                  </th>
                  <th className="border-e border-white px-4">
                    <Select
                      placeholder={
                        <span className="text-white">Tình trạng</span>
                      }
                      size="large"
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={true}
                  supplySource="Kiosk"
                  color="bg-white"
                  lastRow={false}
                />
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={false}
                  supplySource="Kiosk"
                  color="bg-orange50"
                  lastRow={false}
                />
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={null}
                  supplySource="Kiosk"
                  color="bg-white"
                  lastRow={false}
                />
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={false}
                  supplySource="Kiosk"
                  color="bg-orange50"
                  lastRow={false}
                />
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={null}
                  supplySource="Kiosk"
                  color="bg-white"
                  lastRow={false}
                />
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={false}
                  supplySource="Kiosk"
                  color="bg-orange50"
                  lastRow={false}
                />
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={true}
                  supplySource="Kiosk"
                  color="bg-white"
                  lastRow={false}
                />
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={false}
                  supplySource="Kiosk"
                  color="bg-orange50"
                  lastRow={false}
                />
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={true}
                  supplySource="Kiosk"
                  color="bg-white"
                  lastRow={false}
                />
                <ReportRow
                  order={2010001}
                  serviceName="Khám tim mạch"
                  provisionTime="07:20 - 07/10/2021"
                  status={false}
                  supplySource="Kiosk"
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
                itemRender={customPaginationitemRender}
              />
            </div>
          </div>
          <RightSideButton
            link=""
            Icon={FaFileDownload}
            text={<span>Tải về</span>}
          />
        </div>
      </div>
    </>
  );
};
