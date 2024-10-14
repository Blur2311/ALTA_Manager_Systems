import { Timestamp } from "firebase/firestore";
import { GoDotFill } from "react-icons/go";
import { formatTimestamp } from "../../../utils/ServiceUtils";
import { Link } from "react-router-dom";

type NumberRowProps = {
  id: string;
  order: number;
  customerName: string;
  serviceName: string;
  provisionTime: Timestamp;
  expiryDate: Timestamp;
  status: string;
  supplySource: string;
  color: string;
  lastRow: boolean;
};
export const NumberRow: React.FC<NumberRowProps> = ({
  id,
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
        <td className="border-e border-orange100 px-4">
          {formatTimestamp(provisionTime)}
        </td>
        <td className="border-e border-orange100 px-4">
          {formatTimestamp(expiryDate)}
        </td>
        <td className="border-e border-orange100 px-4">
          <div className="flex items-center gap-1">
            <GoDotFill
              className={`text-[16px] ${status !== "Bỏ qua" ? (status === "Đang chờ" ? "text-[#4277FF]" : "text-textGray300") : "text-dotRed"}`}
            />
            <p>{status}</p>
          </div>
        </td>
        <td className="border-e border-orange100 px-4">{supplySource}</td>
        <td className={`${lastRow && "rounded-br-xl"} px-4`}>
          <Link
            to={`/home/number/detail/${id}`}
            className="text-[#4277FF] underline"
          >
            Chi tiết
          </Link>
        </td>
      </tr>
    </>
  );
};
