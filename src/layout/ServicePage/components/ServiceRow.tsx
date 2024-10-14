import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

type ServiceRowProps = {
  id: string;
  serviceId: string;
  serviceName: string;
  description: string;
  status: boolean;
  color: string;
  lastRow: boolean;
};
export const ServiceRow: React.FC<ServiceRowProps> = ({
  id,
  serviceId,
  serviceName,
  description,
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
          {serviceId}
        </td>
        <td className="border-e border-orange100 px-4">{serviceName}</td>
        <td className="border-e border-orange100 px-4">{description}</td>
        <td className="border-e border-orange100 px-4">
          <div className="flex items-center gap-1">
            <GoDotFill
              className={`text-[16px] ${status ? "text-dotGreen" : "text-dotRed"}`}
            />
            <p>{status ? "Đang hoạt động" : "Ngưng hoạt động"}</p>
          </div>
        </td>
        <td className="border-e border-orange100 px-4">
          <Link
            to={`/home/service/detail/${id}`}
            className="text-[#4277FF] underline"
          >
            Chi tiết
          </Link>
        </td>
        <td className={`${lastRow && "rounded-br-xl"} px-4`}>
          <Link
            to={`/home/service/update/${id}`}
            className="text-[#4277FF] underline"
          >
            Cập nhật
          </Link>
        </td>
      </tr>
    </>
  );
};
