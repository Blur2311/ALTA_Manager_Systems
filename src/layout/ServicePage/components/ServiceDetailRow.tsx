import { GoDotFill } from "react-icons/go";

type ServiceDetailRowProps = {
  orderNumber: number;
  status: boolean | null;
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
              className={`text-[16px] ${status === null ? "text-dotGray" : status ? "text-dotGreen" : "text-dotBlue"}`}
            />
            <p>
              {status === null
                ? "Vắng"
                : status
                  ? "Đã hoàn thành"
                  : "Đang thực hiện"}
            </p>
          </div>
        </td>
      </tr>
    </>
  );
};
