import { Progress } from "antd";
import { GoDotFill } from "react-icons/go";

type ProgressBoxProps = {
  color: string;
  Icon: React.ElementType;
  text: string;
  total: number;
  active: number;
  inactive: number;
  fRing: number;
  sRing: number;
  tRing?: number;
  skip?: number;
};

export const ProgressBox: React.FC<ProgressBoxProps> = ({
  color,
  Icon,
  text,
  total,
  active,
  inactive,
  fRing,
  sRing,
  tRing,
  skip,
}) => {
  return (
    <>
      <div className="h-[83px] rounded-xl shadow-progressShadow">
        <div className="mx-4 flex h-full items-center">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative">
              <Progress
                type="circle"
                percent={fRing}
                size={60}
                strokeColor={color}
                format={(percent) => (
                  <span className="font-nunito text-sm font-bold text-textGray400">
                    {percent}%
                  </span>
                )}
              />
              <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 transform">
                <Progress
                  type="circle"
                  percent={sRing}
                  size={50}
                  strokeColor={"#7E7D88"}
                  format={() => null}
                />
              </div>
              {tRing && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <Progress
                    type="circle"
                    percent={tRing}
                    size={40}
                    strokeColor={"#F178B6"}
                    format={() => null}
                  />
                </div>
              )}
            </div>
            <div className="">
              <h4 className="text-2xl font-extrabold text-textGray400">
                {total}
              </h4>
              <div
                className="flex items-center gap-1 text-sm font-semibold"
                style={{ color: color }}
              >
                <Icon />
                <p className="">{text}</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className={`flex flex-col ${skip ? "" : "gap-1"}`}>
              <div className="flex items-center">
                <div className="flex w-28 items-center gap-1">
                  <GoDotFill
                    className={`inline text-[8px]`}
                    style={{ color: color }}
                  />
                  <p className="text-xs font-normal text-textGray300">
                    {tRing ? "Đã sử dụng" : "Đang hoạt động"}
                  </p>
                </div>
                <p className="text-sm font-bold" style={{ color: color }}>
                  {active}
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex w-28 items-center gap-1">
                  <GoDotFill className="inline text-[8px] text-textGray300" />
                  <p className="text-xs font-normal text-textGray300">
                    {tRing ? "Đang chờ" : "Ngưng hoạt động"}
                  </p>
                </div>
                <p className="text-sm font-bold" style={{ color: color }}>
                  {inactive}
                </p>
              </div>
              {tRing && (
                <div className="flex items-center">
                  <div className="flex w-28 items-center gap-1">
                    <GoDotFill className="inline text-[8px] text-[#F178B6]" />
                    <p className="text-xs font-normal text-textGray300">
                      Bỏ qua
                    </p>
                  </div>
                  <p className="text-sm font-bold" style={{ color: color }}>
                    {skip}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
