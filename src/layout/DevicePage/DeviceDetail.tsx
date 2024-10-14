import { FaSquarePen } from "react-icons/fa6";
import { RightSideButton } from "../../components/RightSideButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Device } from "../../model/Device";
import { getDeviceById } from "../../utils/DeviceUtils";

export const DeviceDetail = () => {
  const [device, setDevice] = useState<Device>();

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        const data = await getDeviceById(id);
        data &&
          setDevice({
            id: id,
            deviceId: data.deviceId,
            connectionStatus: data.connectionStatus,
            deviceName: data.deviceName,
            deviceType: data.deviceType,
            ipAddress: data.ipAddress,
            password: data.password,
            serviceUsed: data.serviceUsed,
            status: data.status,
            username: data.username,
          });
      }
    };

    fetchService();
  }, []);
  return (
    <>
      <div className="ms-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý dịch vụ</h4>
        <div className="mt-8">
          <div className="flex items-start gap-6">
            <div className="flex-1 rounded-2xl bg-white shadow-shadowBox">
              <div className="min-h-[600px] px-6 py-4">
                <h6 className="text-xl font-bold text-orange500">
                  Thông tin thiết bị
                </h6>
                <div className="mt-5 flex items-center">
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Mã thiết bị:
                      </p>
                      <p className="font-normal text-textGray400">
                        {device?.deviceId}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Tên thiết bị:
                      </p>
                      <p className="font-normal text-textGray400">
                        {device?.deviceName}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Địa chỉ IP:
                      </p>
                      <p className="font-normal text-textGray400">
                        {device?.ipAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Loại thiết bị:
                      </p>
                      <p className="font-normal text-textGray400">
                        {device?.deviceType}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Tên đăng nhập:
                      </p>
                      <p className="font-normal text-textGray400">
                        {device?.username}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Mật khẩu:
                      </p>
                      <p className="font-normal text-textGray400">
                        {device?.password}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 w-[160px] text-base font-semibold text-textGray500">
                  Dịch vụ sử dụng:
                </p>
                <p className="mt-2 font-normal text-textGray400">
                  {device?.serviceUsed.join(", ")}
                </p>
              </div>
            </div>
            <RightSideButton
              link={`/home/device/update/${id}`}
              Icon={FaSquarePen}
              text={
                <span>
                  Cập nhật
                  <br /> thiết bị
                </span>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
