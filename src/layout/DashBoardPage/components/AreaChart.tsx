import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import kiểu ApexOptions

const AreaChart: React.FC = () => {
  // Định nghĩa kiểu cho chartOptions
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
      type: "datetime",
      tickAmount: 5, // Hiển thị 5 tháng
      categories: [
        "2023-05-01T00:00:00.000Z",
        "2023-06-01T00:00:00.000Z",
        "2023-07-01T00:00:00.000Z",
        "2023-08-01T00:00:00.000Z",
        "2023-09-01T00:00:00.000Z",
      ],
    },
    yaxis: {
      min: 0, // Giá trị nhỏ nhất trên trục y
      max: 6000, // Giá trị lớn nhất trên trục y
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

  const series = [
    {
      name: "Số lượng",
      data: [3000, 4211, 3500, 5000, 4900], // Dữ liệu theo tháng
    },
  ];

  return (
    <div>
      {/* Truyền options và series */}
      <Chart options={chartOptions} series={series} type="area" height={350} />
    </div>
  );
};

export default AreaChart;
