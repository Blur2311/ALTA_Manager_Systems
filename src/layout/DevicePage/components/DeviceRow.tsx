import { Popover } from "antd";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

type DeviceRowProps = {
  id: string;
  deviceId: string;
  deviceName: string;
  ipAddress: string;
  status: boolean;
  connectionStatus: boolean;
  serviceUsed: string[];
  color: string;
  lastRow: boolean;
};
export const DeviceRow: React.FC<DeviceRowProps> = ({
  id,
  deviceId,
  deviceName,
  ipAddress,
  status,
  connectionStatus,
  serviceUsed,
  color,
  lastRow,
}) => {
  const formattedServices = serviceUsed.join(", ");
  const showText =
    formattedServices.length > 25
      ? formattedServices.slice(0, 25) + "..."
      : formattedServices;

  return (
    <>
      <tr className={`h-12 ${color}`}>
        <td
          className={`border-orange100 ${lastRow && "rounded-bl-xl"} border-e pe-2 ps-4`}
        >
          {deviceId}
        </td>
        <td className="border-e border-orange100 px-2">{deviceName}</td>
        <td className="border-e border-orange100 px-2">{ipAddress}</td>
        <td className="border-e border-orange100 px-2">
          <div className="flex items-center gap-1">
            <GoDotFill
              className={`text-[16px] ${status ? "text-dotGreen" : "text-dotRed"}`}
            />
            <p>{status ? "Hoạt động" : "Ngưng hoạt động"}</p>
          </div>
        </td>
        <td className="border-e border-orange100 px-2">
          <div className="flex items-center gap-1">
            <GoDotFill
              className={`text-[16px] ${connectionStatus ? "text-dotGreen" : "text-dotRed"}`}
            />
            <p>{connectionStatus ? "Kết nối" : "Mất kết nối"}</p>
          </div>
        </td>
        <td className="border-e border-orange100 px-4">
          {showText}
          <br />
          {formattedServices.length > 25 && (
            <Popover
              content={formattedServices}
              arrow={false}
              trigger="click"
              className="cursor-pointer text-[#4277FF] underline"
              overlayStyle={{
                width: 400,
                fontFamily: "Nunito",
                border: "1px solid #FFC89B",
                borderRadius: 8,
              }}
            >
              Xem thêm
            </Popover>
          )}
        </td>
        <td className="border-e border-orange100 px-4">
          <Link
            to={`/home/device/detail/${id}`}
            className="text-[#4277FF] underline"
          >
            Chi tiết
          </Link>
        </td>
        <td className={`${lastRow && "rounded-br-xl"} px-4`}>
          <Link
            to={`/home/device/update/${id}`}
            className="text-[#4277FF] underline"
          >
            Cập nhật
          </Link>
        </td>
      </tr>
    </>
  );
};
