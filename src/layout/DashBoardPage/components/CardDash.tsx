import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

type CardDashProps = {
  icon: React.ReactNode; // Nhận bất kỳ React node nào, thường là icon
  value?: number;
  percent?: number;
  status?: boolean;
  text?: string;
  color?: string;
};

export const CardDash: React.FC<CardDashProps> = ({
  icon,
  value = 0,
  percent,
  status,
  text,
  color,
}) => {
  return (
    <>
      <div className="w-[186px] rounded-[10px] bg-white py-2 pe-2 ps-3 shadow-progressShadow">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`${color} relative h-12 w-12 rounded-full bg-opacity-15`}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                {icon}
              </div>
            </div>

            <p className="text-sm font-bold">
              Số thứ tự <br /> {text}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-extrabold text-textGray400">
              {value}
            </h4>
            <div
              className={`${status ? "bg-[#ff9501]" : "bg-textRed"} rounded-lg bg-opacity-15 pe-1`}
            >
              <p
                className={`flex items-center text-[8px] ${status ? "text-orange400" : "text-textRed"}`}
              >
                {status ? (
                  <FaArrowUp className="m-1 text-[8px]" />
                ) : (
                  <FaArrowDown className="m-1 text-[8px]" />
                )}
                {percent}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
