import { Select } from "antd";
import { FaCaretDown } from "react-icons/fa";
import AreaChart from "./AreaChart";

export const ChartBoard = () => {
  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow-progressShadow">
        <div className="flex items-start justify-between">
          <div className="">
            <h3 className="text-xl font-bold text-textGray500">
              Bảng thống kê theo ngày
            </h3>
            <p className="mt-1 text-sm text-textGray200">Tháng 11/2021</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold text-textGray500">Xem theo</p>
            <Select
              defaultValue="Ngày"
              size="large"
              onChange={handleChange}
              suffixIcon={<FaCaretDown className="text-2xl text-orange500" />}
              className="custom-chart-select min-w-[106px] border-gray100 font-nunito"
              options={[
                {
                  value: "Ngày",
                  label: (
                    <span className="font-nunito text-base text-gray5">
                      Ngày
                    </span>
                  ),
                },
                {
                  value: "Tháng",
                  label: (
                    <span className="font-nunito text-base text-gray5">
                      Tháng
                    </span>
                  ),
                },
                {
                  value: "Năm",
                  label: (
                    <span className="font-nunito text-base text-gray5">
                      Năm
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <div className="max-w-full">
          <AreaChart />
        </div>
      </div>
    </>
  );
};
