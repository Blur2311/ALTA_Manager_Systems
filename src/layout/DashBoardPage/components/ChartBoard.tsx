import { Select } from "antd";
import { FaCaretDown } from "react-icons/fa";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { NumberManagement } from "../../../model/Number";
import { getAllNumber } from "../../../utils/NumberUtils";
import { Timestamp } from "firebase/firestore";

export const ChartBoard = () => {
  const [numbers, setNumbers] = useState<NumberManagement[]>([]);
  const [chartData, setChartData] = useState<number[]>([]); // Dữ liệu biểu đồ
  const [selectedPeriod, setSelectedPeriod] = useState("Ngày");
  const [selectedX, setSelectedX] = useState<any[]>([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllNumber(); // Giả sử đây là API lấy toàn bộ dữ liệu
      if (data) {
        setNumbers(data);
      }
    };

    fetchData();
  }, []);

  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedPeriod(value);
  };

  const convertTimestampToDate = (timestamp: Timestamp) => {
    return timestamp.toDate();
  };

  const classifyDataByPeriod = () => {
    const dayData: number[] = [];
    const weekData: number[] = new Array(4).fill(0); // 4 tuần trong tháng
    const monthData: number[] = new Array(12).fill(0); // 12 tháng trong năm

    numbers.forEach((num) => {
      const provisionDate = convertTimestampToDate(num.provisionTime);

      // Chỉ lấy dữ liệu của năm hiện tại
      if (provisionDate.getFullYear() !== currentYear) {
        return;
      }

      // Chỉ lấy dữ liệu của tháng hiện tại khi chọn "Ngày" hoặc "Tháng"
      if (selectedPeriod === "Ngày" || selectedPeriod === "Tháng") {
        if (provisionDate.getMonth() !== currentMonth) {
          return;
        }
      }

      // Phân loại theo ngày
      if (selectedPeriod === "Ngày") {
        const dayIndex = provisionDate.getDate() - 1; // Lấy ngày trong tháng (1-31)
        dayData[dayIndex] = (dayData[dayIndex] || 0) + 1; // Đếm số lượng theo ngày
        const newArrayDate = dayData
          .map((value, index) => (value > 0 ? `Ngày ${index + 1}` : null))
          .filter((index) => index !== null);
        setSelectedX(newArrayDate);
        setChartData(dayData.filter(Boolean)); // Lọc bỏ các giá trị null/undefined
      }

      // Phân loại theo tuần
      else if (selectedPeriod === "Tuần") {
        const weekIndex = Math.floor((provisionDate.getDate() - 1) / 7); // Tính tuần trong tháng
        weekData[weekIndex] = (weekData[weekIndex] || 0) + 1; // Đếm số lượng theo tuần
        setSelectedX(["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"]);
        setChartData(weekData);
      }

      // Phân loại theo tháng
      else if (selectedPeriod === "Tháng") {
        const monthIndex = provisionDate.getMonth(); // Lấy tháng từ 0 đến 11
        monthData[monthIndex] = (monthData[monthIndex] || 0) + 1; // Đếm số lượng theo tháng
        setSelectedX([
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ]);
        setChartData(monthData);
      }
    });
  };

  useEffect(() => {
    classifyDataByPeriod();
  }, [numbers, selectedPeriod]);

  const series = [
    {
      name: "Số lượng",
      data: chartData, // Dữ liệu
    },
  ];
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#CEDDFF", // Màu gradient bắt đầu
            opacity: 1,
          },
          {
            offset: 100,
            color: "#CEDDFF", // Màu gradient kết thúc
            opacity: 0.1,
          },
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#5185F7"],
    },
    xaxis: {
      categories: selectedX,
    },
    yaxis: {
      min: 0, // Giá trị nhỏ nhất trên trục y
      max: 50, // Giá trị lớn nhất trên trục y
      labels: {
        formatter: function (val) {
          return val.toFixed(0); // Hiển thị số nguyên trên trục y
        },
      },
    },
    tooltip: {
      x: {
        format: "MM/yyyy", // Hiển thị tháng/năm
      },
    },
  };
  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow-progressShadow">
        <div className="flex items-start justify-between">
          <div className="">
            <h3 className="text-xl font-bold text-textGray500">
              Bảng thống kê theo {selectedPeriod.toLowerCase()}
            </h3>
            <p className="mt-1 text-sm text-textGray200">
              {selectedPeriod === "Tháng"
                ? `Năm ${currentYear}` // Nếu chọn "Năm", hiển thị năm hiện tại
                : `Tháng ${currentMonth + 1}/${currentYear}`}
            </p>
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
                  value: "Tuần",
                  label: (
                    <span className="font-nunito text-base text-gray5">
                      Tuần
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
              ]}
            />
          </div>
        </div>
        <div className="max-w-full">
          <Chart
            options={chartOptions}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </>
  );
};
