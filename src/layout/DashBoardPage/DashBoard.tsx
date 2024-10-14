import { Calendar } from "antd";
import { ProgressBox } from "./components/ProgressBox";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CardDash } from "./components/CardDash";
import { BsBookmarkStar, BsCalendar, BsCalendarCheck } from "react-icons/bs";
import { RiContactsLine } from "react-icons/ri";
import { ChartBoard } from "./components/ChartBoard";
import { PiDesktop } from "react-icons/pi";
import { MessageOutlined } from "@ant-design/icons";
import { FiLayers } from "react-icons/fi";
import { Device } from "../../model/Device";
import { useEffect, useState } from "react";
import { getAllDevice } from "../../utils/DeviceUtils";
import { Service } from "../../model/Service";
import { getAllService } from "../../utils/ServiceUtils";
import { NumberManagement } from "../../model/Number";
import { getAllNumber } from "../../utils/NumberUtils";

export const DashBoard = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [numbers, setNumbers] = useState<NumberManagement[]>([]);

  useEffect(() => {
    const fetchDeviceData = async () => {
      const data = await getAllDevice();
      data && setDevices(data);
    };
    const fetchServiceData = async () => {
      const data = await getAllService();
      data && setServices(data);
    };
    const fetchNumberData = async () => {
      const data = await getAllNumber();
      data && setNumbers(data);
    };

    fetchNumberData();
    fetchServiceData();
    fetchDeviceData();
  }, []);

  const filterDeviceStatusTrue = devices.filter((data) => {
    return data.status === true;
  });

  const filterServiceStatusTrue = services.filter((data) => {
    return data.status === true;
  });

  const filterNumbStatusSuccess = numbers.filter((data) => {
    return data.status === "Đã sử dụng";
  });

  const filterNumbStatusWait = numbers.filter((data) => {
    return data.status === "Đang chờ";
  });

  const filterNumbStatusCancel = numbers.filter((data) => {
    return data.status === "Bỏ qua";
  });

  return (
    <>
      <div className="container w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-0 flex justify-between">
          <div className="flex-1">
            <div className="mx-6 mt-[104px]">
              <h4 className="text-2xl font-bold text-orange500">
                Biểu đồ cấp số
              </h4>
              <div className="mt-4 p-1">
                <div className="flex justify-between">
                  <CardDash
                    icon={<BsCalendar className="text-2xl text-[#6493F9]" />}
                    text="đã cấp"
                    value={numbers.length}
                    status={true}
                    percent={32.41}
                    color="bg-[#6695FB]"
                  />
                  <CardDash
                    icon={
                      <BsCalendarCheck className="text-2xl text-[#35C75A]" />
                    }
                    text="đã sử dụng"
                    value={filterNumbStatusSuccess.length}
                    status={false}
                    percent={32.41}
                    color="bg-[#35C75A]"
                  />
                  <CardDash
                    icon={
                      <RiContactsLine className="text-2xl text-orange300" />
                    }
                    text="đang chờ"
                    value={filterNumbStatusWait.length}
                    status={true}
                    percent={56.41}
                    color="bg-[#ffac6a]"
                  />
                  <CardDash
                    icon={
                      <BsBookmarkStar className="text-2xl text-[#F86D6D]" />
                    }
                    text="đã bỏ qua"
                    value={filterNumbStatusCancel.length}
                    status={false}
                    percent={22.41}
                    color="bg-[#F86D6D]"
                  />
                </div>
              </div>
              <div className="mt-4">
                <ChartBoard />
              </div>
            </div>
          </div>
          <div className="w-[400px] rounded-b-lg rounded-l-lg bg-white shadow-sideBarShadow">
            <div className="mx-6 mt-[104px]">
              <h4 className="text-2xl font-bold text-orange500">Tổng quan</h4>
              <div className="mt-4 flex flex-col gap-3">
                <ProgressBox
                  color={"#FF7506"}
                  Icon={PiDesktop}
                  text="Thiết bị"
                  total={devices.length}
                  active={filterDeviceStatusTrue.length}
                  inactive={devices.length - filterDeviceStatusTrue.length}
                  fRing={Math.round(
                    (filterDeviceStatusTrue.length / devices.length) * 100,
                  )}
                  sRing={Math.round(
                    ((devices.length - filterDeviceStatusTrue.length) /
                      devices.length) *
                      100,
                  )}
                />
                <ProgressBox
                  color={"#4277FF"}
                  Icon={MessageOutlined}
                  text="Dịch vụ"
                  total={services.length}
                  active={filterServiceStatusTrue.length}
                  inactive={services.length - filterServiceStatusTrue.length}
                  fRing={Math.round(
                    (filterServiceStatusTrue.length / services.length) * 100,
                  )}
                  sRing={Math.round(
                    ((services.length - filterServiceStatusTrue.length) /
                      services.length) *
                      100,
                  )}
                />
                <ProgressBox
                  color={"#35C75A"}
                  Icon={FiLayers}
                  text="Cấp số"
                  total={numbers.length}
                  active={filterNumbStatusSuccess.length}
                  inactive={filterNumbStatusWait.length}
                  skip={filterNumbStatusCancel.length}
                  fRing={Math.round(
                    (filterNumbStatusSuccess.length / numbers.length) * 100,
                  )}
                  sRing={Math.round(
                    (filterNumbStatusWait.length / numbers.length) * 100,
                  )}
                  tRing={Math.round(
                    (filterNumbStatusCancel.length / numbers.length) * 100,
                  )}
                />
              </div>
              <div className="shadow- mt-4 rounded-xl shadow-progressShadow">
                <div className="mx-8 my-4">
                  <Calendar
                    fullscreen={false}
                    className="custom-calendar font-nunito"
                    headerRender={({ value, onChange }) => {
                      const current = value;
                      const year = current.year();
                      const date = current.date();

                      return (
                        <div className="mb-2 flex items-center justify-between p-2 pt-4 text-orange500">
                          <button
                            onClick={() =>
                              onChange(current.subtract(1, "month"))
                            }
                          >
                            {<IoIosArrowBack className="text-xl" />}
                          </button>
                          <span className="text-base font-bold">
                            {`${date} ${current.format("MMM")} ${year}`}
                          </span>
                          <button
                            onClick={() => onChange(current.add(1, "month"))}
                          >
                            {<IoIosArrowForward className="text-xl" />}
                          </button>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
