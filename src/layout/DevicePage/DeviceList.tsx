import { Input, Pagination, PaginationProps, Select } from "antd";
import { FiSearch } from "react-icons/fi";
import { PiPlusSquareFill } from "react-icons/pi";
import { FaCaretDown } from "react-icons/fa6";
import { DeviceRow } from "./components/DeviceRow";
import { RightSideButton } from "../../components/RightSideButton";
import { customPaginationitemRender } from "../../components/Pagination";
import { useEffect, useState } from "react";
import { Device } from "../../model/Device";
import { getAllDevice } from "../../utils/DeviceUtils";

export const DeviceList = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>("Tất cả");
  const [selectedConnect, setSelectedConnect] = useState<string | null>(
    "Tất cả",
  );

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(9);

  useEffect(() => {
    const fetchDeviceData = async () => {
      const data = await getAllDevice();
      data && setDevices(data);
    };

    fetchDeviceData();
  }, []);

  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedStatus(value);
  };
  const handleChangeConnect = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedConnect(value);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.deviceName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "Tất cả" ||
      device.status.toString() === selectedStatus;

    const matchesConnect =
      selectedConnect === "Tất cả" ||
      device.status.toString() === selectedConnect;

    return matchesSearch && matchesStatus && matchesConnect;
  });

  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

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
                    Trạng thái kết nối
                  </p>
                  <Select
                    defaultValue="Tất cả"
                    size="large"
                    onChange={handleChangeConnect}
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
                            Kết nối
                          </span>
                        ),
                      },
                      {
                        value: "false",
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
                {paginatedDevices.map((data, index) => (
                  <DeviceRow
                    key={data.id}
                    id={data.id}
                    deviceId={data.deviceId}
                    deviceName={data.deviceName}
                    ipAddress={data.ipAddress}
                    status={data.status}
                    connectionStatus={data.connectionStatus}
                    serviceUsed={data.serviceUsed}
                    color={index % 2 !== 0 ? "bg-orange50" : "bg-white"}
                    lastRow={index === paginatedDevices.length - 1}
                  />
                ))}
              </tbody>
            </table>
            <div className="float-end mt-6">
              <Pagination
                defaultCurrent={1}
                current={currentPage} // Trang hiện tại
                total={filteredDevices.length} // Tổng số tài khoản sau khi lọc
                pageSize={pageSize}
                onChange={onChange}
                showSizeChanger={false}
                itemRender={customPaginationitemRender}
              />
            </div>
          </div>
          <RightSideButton
            link="/home/device/add"
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
