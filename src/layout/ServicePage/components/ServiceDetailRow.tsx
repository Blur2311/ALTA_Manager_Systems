import { GoDotFill } from "react-icons/go";

type ServiceDetailRowProps = {
  orderNumber: number;
  status: string;
  color: string;
  lastRow: boolean;
};
export const ServiceDetailRow: React.FC<ServiceDetailRowProps> = ({
  orderNumber,
  status,
  color,
  lastRow,
}) => {
  return (
    <>
      <tr className={`h-12 ${color}`}>
        <td
          className={`border-orange100 ${lastRow && "rounded-bl-xl"} border-e px-4`}
        >
          {orderNumber}
        </td>
        <td className={`${lastRow && "rounded-br-xl"} px-4`}>
          <div className="flex items-center gap-1">
            <GoDotFill
              className={`text-[16px] ${status === "Bỏ qua" ? "text-dotGray" : status === "Đã sử dụng" ? "text-dotGreen" : "text-dotBlue"}`}
            />
            <p>
              {status === "Bỏ qua"
                ? "Vắng"
                : status === "Đã sử dụng"
                  ? "Đã hoàn thành"
                  : "Đang thực hiện"}
            </p>
          </div>
        </td>
      </tr>
    </>
  );
};
