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

export const DashBoard = () => {
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
                    value={4.221}
                    status={true}
                    percent={32.41}
                    color="bg-[#6695FB]"
                  />
                  <CardDash
                    icon={
                      <BsCalendarCheck className="text-2xl text-[#35C75A]" />
                    }
                    text="đã sử dụng"
                    value={3.721}
                    status={false}
                    percent={32.41}
                    color="bg-[#35C75A]"
                  />
                  <CardDash
                    icon={
                      <RiContactsLine className="text-2xl text-orange300" />
                    }
                    text="đang chờ"
                    value={468}
                    status={true}
                    percent={56.41}
                    color="bg-[#ffac6a]"
                  />
                  <CardDash
                    icon={
                      <BsBookmarkStar className="text-2xl text-[#F86D6D]" />
                    }
                    text="đã bỏ qua"
                    value={32}
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
                  total={4.221}
                  active={3.799}
                  inactive={422}
                  fRing={90}
                  sRing={10}
                />
                <ProgressBox
                  color={"#4277FF"}
                  Icon={MessageOutlined}
                  text="Dịch vụ"
                  total={276}
                  active={210}
                  inactive={66}
                  fRing={76}
                  sRing={24}
                />
                <ProgressBox
                  color={"#35C75A"}
                  Icon={FiLayers}
                  text="Cấp số"
                  total={4.221}
                  active={3.721}
                  inactive={486}
                  fRing={86}
                  sRing={10}
                  tRing={5}
                  skip={32}
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
