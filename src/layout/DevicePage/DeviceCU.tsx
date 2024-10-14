import { Button, Input, Select } from "antd";
import { FaAsterisk, FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { getAllService } from "../../utils/ServiceUtils";
import { Device } from "../../model/Device";
import {
  checkDeviceId,
  createDevice,
  getDeviceById,
  updateDevice,
} from "../../utils/DeviceUtils";
import axios from "axios";
import { createLog } from "../../utils/UserLogUtils";

export const DeviceCU = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới

  const [load, setLoad] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [device, setDevice] = useState<Device>({
    id: "",
    deviceId: "",
    deviceName: "",
    deviceType: "Kiosk",
    ipAddress: "",
    connectionStatus: true,
    status: true,
    username: "",
    password: "",
    serviceUsed: [],
  });
  const [errors, setErrors] = useState({
    deviceId: "",
    deviceName: "",
    ipAddress: "",
    username: "",
    password: "",
    serviceUsed: "",
  });

  useEffect(() => {
    const loadServiceOptions = async () => {
      try {
        const fetchedService = await getAllService();
        if (fetchedService) {
          const mappedOptions = fetchedService.map((data) => ({
            value: data.serviceName,
            label: data.serviceName,
          }));
          setOptions(mappedOptions);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    const fetchDeviceData = async () => {
      if (id) {
        const data = await getDeviceById(id);
        data &&
          setDevice({
            id: id,
            deviceId: data.deviceId,
            deviceName: data.deviceName,
            deviceType: data.deviceType,
            ipAddress: data.ipAddress,
            connectionStatus: data.connectionStatus,
            status: data.status,
            username: data.username,
            password: data.password,
            serviceUsed: data.serviceUsed,
          });
      }
    };

    const updateIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        console.log(response.data.ip); // Lưu địa chỉ IP vào state
        handleChangeDevice("ipAddress")(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    loadServiceOptions();
    if (isUpdateMode) {
      fetchDeviceData();
    } else {
      updateIp();
    }
  }, []);

  const handleChangeDevice = (field: keyof Device) => (value: any) => {
    setDevice((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [field]: value,
        };
      }
      return { [field]: value } as Device;
    });
  };

  const validate = async () => {
    let tempErrors = { ...errors };
    let isValid = true;

    const deviceIdExist = isUpdateMode
      ? await checkDeviceId(device.deviceId, id)
      : await checkDeviceId(device.deviceId);

    if (!device.deviceId) {
      tempErrors.deviceId = "Không được để trống";
      isValid = false;
    } else if (!deviceIdExist) {
      tempErrors.deviceId = "ID đã tồn tại";
      isValid = false;
    } else {
      tempErrors.deviceId = "";
    }

    if (!device.deviceName) {
      tempErrors.deviceName = "Không được để trống";
      isValid = false;
    } else tempErrors.deviceName = "";

    if (!device.ipAddress) {
      tempErrors.ipAddress = "Không được để trống";
      isValid = false;
    } else tempErrors.ipAddress = "";

    if (!device.username) {
      tempErrors.username = "Không được để trống";
      isValid = false;
    } else tempErrors.username = "";

    if (!device.password || device.password.length < 6) {
      tempErrors.password = "Không hợp lệ";
      isValid = false;
    } else tempErrors.password = "";

    if (device.serviceUsed.length == 0) {
      tempErrors.serviceUsed = "Không được để trống";
      isValid = false;
    } else tempErrors.serviceUsed = "";

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    const isValid = await validate();
    if (isValid) {
      try {
        if (isUpdateMode) {
          await updateDevice(id!, device);
          await createLog("Cập nhật thông tin thiết bị " + device.deviceId);
        } else {
          await createDevice(device);
          await createLog("Tạo thông tin thiết bị " + device.deviceId);
        }
      } catch (error) {
        console.error("Error saving role:", error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/home/device");
      }
    }
    setLoad(false);
  };

  return (
    <>
      <div className="mx-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý tài khoản</h4>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="h-[530px] rounded-2xl bg-white shadow-shadowBox">
              <div className="px-6 py-4">
                <h6 className="text-xl font-bold text-orange500">
                  Thông tin thiết bị
                </h6>
                <div className="mt-3 flex justify-between gap-6">
                  <div className="flex-1">
                    <div className="">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Mã thiết bị:
                        <FaAsterisk className="text-[6px] text-textRed" />
                        {errors.deviceId && (
                          <p className="text-xs text-textRed">
                            {errors.deviceId}
                          </p>
                        )}
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập mã thiết bị"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.deviceId ? "error" : ""}`}
                        disabled={load}
                        value={device?.deviceId}
                        onChange={(e) =>
                          handleChangeDevice("deviceId")(e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Tên thiết bị:
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập tên thiết bị"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.deviceName ? "error" : ""}`}
                        disabled={load}
                        value={device?.deviceName}
                        onChange={(e) =>
                          handleChangeDevice("deviceName")(e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Địa chỉ IP:
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập địa chỉ IP"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.ipAddress ? "error" : ""}`}
                        disabled={load}
                        value={device?.ipAddress}
                        onChange={(e) =>
                          handleChangeDevice("ipAddress")(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Loại thiết bị:
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Select
                        size="large"
                        disabled={load}
                        value={device?.deviceType}
                        onChange={handleChangeDevice("deviceType")}
                        suffixIcon={
                          <FaCaretDown className="text-2xl text-orange500" />
                        }
                        className="custom-user-select mt-2 !h-12 w-full font-nunito"
                        options={[
                          {
                            value: "Kiosk",
                            label: (
                              <span className="font-nunito text-base text-gray5">
                                Kiosk
                              </span>
                            ),
                          },
                          {
                            value: "Display counter",
                            label: (
                              <span className="font-nunito text-base text-gray5">
                                Display counter
                              </span>
                            ),
                          },
                        ]}
                      />
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Tên đăng nhập:
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập tên đăng nhập"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.username ? "error" : ""}`}
                        disabled={load}
                        value={device?.username}
                        onChange={(e) =>
                          handleChangeDevice("username")(e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Mật khẩu:
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Input.Password
                        size="large"
                        placeholder="Nhập mật khẩu"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.password ? "error" : ""}`}
                        disabled={load}
                        value={device?.password}
                        onChange={(e) =>
                          handleChangeDevice("password")(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="flex items-center gap-1 text-lg text-textGray500">
                    Dịch vụ sử dụng:
                    <FaAsterisk className="text-[6px] text-textRed" />
                  </label>
                  <Select
                    mode="multiple"
                    allowClear
                    removeIcon={
                      <FaXmark className="text-xl font-bold text-white" />
                    }
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Nhập dịch vụ sử dụng"
                    className={`custom-multiple-select mt-2 ${device?.serviceUsed.length > 0 ? "border-changed" : ""}`}
                    disabled={load}
                    value={device?.serviceUsed}
                    onChange={handleChangeDevice("serviceUsed")}
                    options={options}
                    status={`${errors.serviceUsed ? "error" : ""}`}
                  />
                </div>

                <p className="mt-3 flex items-center gap-1 text-sm text-textGray300">
                  <FaAsterisk className="text-[6px] text-textRed" />
                  Là trường thông tin bắt buộc
                </p>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8">
              <Link
                to={`/home/device`}
                className="h-12 w-[147px] rounded-lg border-[1.5px] border-orange400 bg-orange50 px-6 py-[10px] text-center text-base font-bold text-orange400 shadow-downShadow"
              >
                Hủy bỏ
              </Link>
              <Button
                loading={load}
                iconPosition={"end"}
                size="large"
                htmlType="submit"
                className="!h-12 !w-[147px] !rounded-lg !border-0 !bg-orange400 !px-6 !py-2 font-nunito !text-base !font-bold !text-white !shadow-downShadow"
              >
                {isUpdateMode ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
