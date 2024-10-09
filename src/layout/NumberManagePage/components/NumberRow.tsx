import { GoDotFill } from "react-icons/go";

type NumberRowProps = {
  order: number;
  customerName: string;
  serviceName: string;
  provisionTime: string;
  expiryDate: string;
  status: boolean | null;
  supplySource: string;
  color: string;
  lastRow: boolean;
};
export const NumberRow: React.FC<NumberRowProps> = ({
  order,
  customerName,
  serviceName,
  provisionTime,
  expiryDate,
  status,
  supplySource,
  color,
  lastRow,
}) => {
  return (
    <>
      <tr className={`h-12 ${color}`}>
        <td
          className={`border-orange100 ${lastRow && "rounded-bl-xl"} border-e px-4`}
        >
          {order}
        </td>
        <td className="border-e border-orange100 px-4">{customerName}</td>
        <td className="border-e border-orange100 px-4">{serviceName}</td>
        <td className="border-e border-orange100 px-4">{provisionTime}</td>
        <td className="border-e border-orange100 px-4">{expiryDate}</td>
        <td className="border-e border-orange100 px-4">
          <div className="flex items-center gap-1">
            <GoDotFill
              className={`text-[16px] ${status !== null ? (status ? "text-[#4277FF]" : "text-textGray300") : "text-dotRed"}`}
            />
            <p>
              {status !== null
                ? status
                  ? "Đang chờ"
                  : "Đã sử dụng"
                : "Bỏ qua"}
            </p>
          </div>
        </td>
        <td className="border-e border-orange100 px-4">{supplySource}</td>
        <td className={`${lastRow && "rounded-br-xl"} px-4`}>
          <a href="#" className="text-[#4277FF] underline">
            Chi tiết
          </a>
        </td>
      </tr>
    </>
  );
};
