import { Button, Checkbox, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaAsterisk } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Service } from "../../model/Service";
import { Timestamp } from "firebase/firestore";
import {
  checkServiceId,
  createService,
  getServiceById,
  updateService,
} from "../../utils/ServiceUtils";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { createLog } from "../../utils/UserLogUtils";

export const ServiceCU = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [service, setService] = useState<Service>({
    id: "",
    serviceId: "",
    serviceName: "",
    description: "",
    autoIncreFrom: 0,
    autoIncreTo: 0,
    currentNumber: 0,
    prefix: 0,
    surfix: 0,
    reset: false,
    status: false,
    timeCreate: Timestamp.fromMillis(0),
  });
  const [errors, setErrors] = useState({
    serviceId: "",
    serviceName: "",
  });
  const [checks, setChecks] = useState({
    checkAuto: false,
    checkPre: false,
    checkSur: false,
  });

  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới

  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        const data = await getServiceById(id);
        data &&
          setService({
            id: id,
            serviceId: data.serviceId,
            serviceName: data.serviceName,
            description: data.description,
            autoIncreFrom: data.autoIncreFrom,
            autoIncreTo: data.autoIncreTo,
            currentNumber: data.currentNumber,
            prefix: data.prefix,
            surfix: data.surfix,
            reset: data.reset,
            status: data.status,
            timeCreate: data.timeCreate,
          });
      }
    };
    if (isUpdateMode) {
      fetchService();
    }
    console.log(service);
  }, []);

  useEffect(() => {
    if (isUpdateMode) {
      setChecks({
        checkAuto: service.autoIncreFrom !== 0 || service.autoIncreTo !== 0,
        checkPre: service.prefix !== 0,
        checkSur: service.surfix !== 0,
      });
    }
    console.log(service);
  }, [service]);

  const handleChangeService = (field: keyof Service) => (value: any) => {
    setService((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [field]: value,
        };
      }
      return { [field]: value } as Service;
    });
  };

  const handleCheckboxChange =
    (field: keyof typeof checks) => (e: CheckboxChangeEvent) => {
      setChecks((prevChecks) => ({
        ...prevChecks,
        [field]: e.target.checked, // Cập nhật trạng thái của checkbox cụ thể
      }));
    };

  const validate = async () => {
    let tempErrors = { ...errors };
    let isValid = true;

    const serviceIdExist = isUpdateMode
      ? await checkServiceId(service.serviceId, id)
      : await checkServiceId(service.serviceId);

    if (!service.serviceId) {
      tempErrors.serviceId = "Không được để trống";
      isValid = false;
    } else if (!serviceIdExist) {
      tempErrors.serviceId = "ID đã tồn tại";
      isValid = false;
    } else {
      tempErrors.serviceId = "";
    }

    if (!service.serviceName) {
      tempErrors.serviceName = "Không được để trống";
      isValid = false;
    } else tempErrors.serviceName = "";

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
          await updateService(id!, service);
          await createLog("Cập nhật thông tin dịch vụ " + service.serviceName);
        } else {
          await createService(service);
          await createLog("Tạo thông tin dịch vụ " + service.serviceName);
        }
      } catch (error) {
        console.error("Error saving role:", error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/home/service");
      }
    }
    setLoad(false);
  };

  return (
    <>
      <div className="mx-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý dịch vụ</h4>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl bg-white shadow-shadowBox">
              <div className="px-6 pb-4 pt-6">
                <h6 className="text-xl font-bold text-orange500">
                  Thông tin dịch vụ
                </h6>
                <div className="mt-3 flex justify-between gap-6">
                  <div className="flex-1">
                    <div className="">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Mã dịch vụ:
                        <FaAsterisk className="text-[6px] text-textRed" />
                        {errors.serviceId && (
                          <p className="text-xs text-textRed">
                            {errors.serviceId}
                          </p>
                        )}
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập mã dịch vụ"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.serviceId ? "error" : ""}`}
                        disabled={load}
                        value={service?.serviceId}
                        onChange={(e) =>
                          handleChangeService("serviceId")(e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Tên dịch vụ:
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập tên dịch vụ"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.serviceName ? "error" : ""}`}
                        disabled={load}
                        value={service?.serviceName}
                        onChange={(e) =>
                          handleChangeService("serviceName")(e.target.value)
                        }
                      />
                    </div>
                    <h6 className="mt-4 text-xl font-bold text-orange500">
                      Quy tắc cấp số
                    </h6>
                    <div className="mt-3 flex w-full">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                          <div className="min-w-[156px]">
                            <Checkbox
                              className="custom-checkbox font-nunito text-base font-semibold text-textGray500"
                              checked={checks.checkAuto}
                              onChange={handleCheckboxChange("checkAuto")}
                            >
                              Tăng tự động từ:
                            </Checkbox>
                          </div>
                          <div className="flex items-center gap-3">
                            <InputNumber
                              size="small"
                              min={0}
                              max={9999}
                              className="w-[80px] border-[1.5px] border-gray100 px-3 py-[10px] !font-nunito text-base font-normal text-textGray400"
                              disabled={load || !checks.checkAuto}
                              value={service?.autoIncreFrom}
                              onChange={(value) =>
                                handleChangeService("autoIncreFrom")(value)
                              }
                            />
                            <p>đến</p>
                            <InputNumber
                              size="small"
                              min={0}
                              max={9999}
                              className="w-[80px] border-[1.5px] border-gray100 px-3 py-[10px] !font-nunito text-base font-normal text-textGray400"
                              disabled={load || !checks.checkAuto}
                              value={service?.autoIncreTo}
                              onChange={(value) =>
                                handleChangeService("autoIncreTo")(value)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="min-w-[156px]">
                            <Checkbox
                              className="custom-checkbox font-nunito text-base font-semibold text-textGray500"
                              checked={checks.checkPre}
                              onChange={handleCheckboxChange("checkPre")}
                            >
                              Prefix:
                            </Checkbox>
                          </div>
                          <InputNumber
                            size="small"
                            min={0}
                            max={9999}
                            className="w-[80px] border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                            disabled={load || !checks.checkPre}
                            value={service?.prefix}
                            onChange={(value) =>
                              handleChangeService("prefix")(value)
                            }
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="min-w-[156px]">
                            <Checkbox
                              className="custom-checkbox font-nunito text-base font-semibold text-textGray500"
                              checked={checks.checkSur}
                              onChange={handleCheckboxChange("checkSur")}
                            >
                              Surfix:
                            </Checkbox>
                          </div>
                          <InputNumber
                            size="small"
                            min={0}
                            max={9999}
                            className="w-[80px] border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                            disabled={load || !checks.checkSur}
                            value={service?.surfix}
                            onChange={(value) =>
                              handleChangeService("surfix")(value)
                            }
                          />
                        </div>
                        <Checkbox
                          className="custom-checkbox font-nunito text-base font-semibold text-textGray500"
                          checked={service?.reset}
                          onChange={(e) =>
                            handleChangeService("reset")(e.target.checked)
                          }
                        >
                          Reset mỗi ngày
                        </Checkbox>
                      </div>
                    </div>
                    <p className="mt-4 flex items-center gap-1 text-sm text-textGray300">
                      <FaAsterisk className="text-[6px] text-textRed" />
                      Là trường thông tin bắt buộc
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="">
                      <label className="text-lg text-textGray500">Mô tả:</label>
                      <TextArea
                        size="large"
                        placeholder="Mô tả dịch vụ"
                        className="mt-2 !min-h-36 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        disabled={load}
                        value={service?.description}
                        onChange={(e) =>
                          handleChangeService("description")(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-8">
              <Link
                to={`/home/service`}
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
