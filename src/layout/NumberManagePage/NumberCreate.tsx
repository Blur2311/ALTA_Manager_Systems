import { Button, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { FaAsterisk, FaCaretDown, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { formatTimestamp, getAllService } from "../../utils/ServiceUtils";
import { NumberManagement } from "../../model/Number";
import { createNumber } from "../../utils/NumberUtils";
import { createLog } from "../../utils/UserLogUtils";

export const NumberCreate = () => {
  const [load, setLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenInfo, setIsModalOpenInfo] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>();
  const [numb, setNumb] = useState<NumberManagement>();
  const [errors, setErrors] = useState({
    customerName: false,
    phoneNumber: false,
    email: false,
  });
  const [numbReturn, setNumbReturn] = useState<any>();

  useEffect(() => {
    const fetchServiceData = async () => {
      const fetchedService = await getAllService();
      if (fetchedService) {
        const mappedOptions = fetchedService.map((data) => ({
          value: data.serviceName,
          label: (
            <span className="font-nunito text-base text-gray5">
              {data.serviceName}
            </span>
          ),
        }));
        setOptions(mappedOptions);
      }
    };

    fetchServiceData();
  }, []);

  const handleChangeNumb = (field: keyof NumberManagement) => (value: any) => {
    setNumb((prevNumb) => {
      if (prevNumb) {
        return {
          ...prevNumb,
          [field]: value,
        };
      }
      return { [field]: value } as NumberManagement;
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModelInfo = () => {
    setIsModalOpenInfo(true);
  };

  const closeModelInfo = () => {
    setIsModalOpenInfo(false);
  };

  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
    setSelectedService(value);
  };

  const validate = async () => {
    let tempErrors = { ...errors };
    let isValid = true;

    // Kiểm tra họ tên
    if (!numb?.customerName) {
      tempErrors.customerName = true;
      isValid = false;
    } else {
      tempErrors.customerName = false;
    }

    // Kiểm tra số điện thoại
    if (!numb?.phoneNumber) {
      tempErrors.phoneNumber = true;
      isValid = false;
    } else {
      tempErrors.phoneNumber = false;
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!numb?.email || !emailRegex.test(numb?.email)) {
      tempErrors.email = true;
      isValid = false;
    } else {
      tempErrors.email = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    const isValid = await validate();

    if (isValid) {
      try {
        if (selectedService) {
          const data = await createNumber(numb, selectedService);
          setNumbReturn(data);
          await createLog("Tạo thông tin cấp số " + selectedService);
        }
      } catch (error) {
        console.error("Error saving role:", error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 500));
        closeModelInfo();
        showModal();
        setSelectedService(null);
        setNumb(undefined);
      }
    }
    setLoad(false);
  };
  return (
    <>
      <div className="mx-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý cấp số</h4>
        <div className="mt-8">
          <div className="">
            <div className="rounded-2xl bg-white shadow-shadowBox">
              <div className="min-h-[600px] pt-6">
                <div className="flex flex-col items-center">
                  <h3 className="text-[32px] font-bold text-orange500">
                    CẤP SỐ MỚI
                  </h3>
                  <p className="mt-5 text-xl font-bold text-textGray400">
                    Dịch vụ khách hàng lựa chọn
                  </p>
                  <Select
                    placeholder={"Chọn dịch vụ"}
                    size="large"
                    onChange={handleChange}
                    value={selectedService}
                    suffixIcon={
                      <FaCaretDown className="text-2xl text-orange500" />
                    }
                    className="custom-user-select mt-3 h-11 w-[400px] font-nunito"
                    options={options}
                  />
                  <div className="mt-20 flex items-center justify-center gap-8">
                    <Link
                      to={`/home/number`}
                      className="h-12 w-[147px] rounded-lg border-[1.5px] border-orange400 bg-orange50 px-6 py-[10px] text-center text-base font-bold text-orange400 shadow-downShadow"
                    >
                      Hủy bỏ
                    </Link>

                    <Button
                      loading={load}
                      disabled={selectedService ? false : true}
                      iconPosition={"end"}
                      size="large"
                      onClick={showModelInfo}
                      className={`!h-12 !w-[147px] !rounded-lg !border-0 ${selectedService ? "!bg-orange400" : "!bg-orange100"} !px-6 !py-2 font-nunito !text-base !font-bold !text-white !shadow-downShadow`}
                    >
                      Thêm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        closeIcon={<FaXmark className="text-2xl text-orange500" />}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        <div>
          <div className="flex min-h-[385px] min-w-[470px] flex-col items-center justify-between rounded-3xl bg-white pt-12 font-nunito">
            <div className="flex flex-col items-center">
              <h6 className="text-[32px] font-bold text-textGray400">
                Số thứ tự được cấp
              </h6>
              <h1 className="text-[56px] font-extrabold text-orange500">
                {numbReturn?.order}
              </h1>
              <p className="text-lg text-textGray500">
                DV: {numbReturn?.serviceName} <b>(tại quầy số 1)</b>
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-3 rounded-b-3xl bg-orange500 py-4">
              <div className="flex items-end gap-2 text-[22px] font-bold text-white">
                <p className="w-[143px]">Thời gian cấp:</p>
                <p className="">
                  {numbReturn?.provisionTime &&
                    formatTimestamp(numbReturn?.provisionTime)}
                </p>
              </div>
              <div className="flex items-end gap-2 text-[22px] font-bold text-white">
                <p className="w-[143px]">Hạn sử dụng:</p>
                <p className="">
                  {numbReturn?.expiryDate &&
                    formatTimestamp(numbReturn?.expiryDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        closeIcon={null}
        open={isModalOpenInfo}
        footer={null}
        className="custom-modal-info"
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex min-h-[510px] min-w-[571px] flex-col items-center justify-between rounded-2xl bg-white px-9 pb-7 pt-8 font-nunito">
              <h6 className="text-2xl font-bold text-orange500">
                Điền thông tin của bạn
              </h6>
              <div className="flex w-full flex-col gap-4">
                <div className="">
                  <label className="flex items-center gap-1 text-lg text-textGray500">
                    Họ và tên
                    <FaAsterisk className="text-[6px] text-textRed" />
                  </label>
                  <Input
                    size="large"
                    placeholder="Nhập họ tên"
                    className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                    status={`${errors.customerName ? "error" : ""}`}
                    disabled={load}
                    value={numb?.customerName}
                    onChange={(e) =>
                      handleChangeNumb("customerName")(e.target.value)
                    }
                  />
                </div>
                <div className="">
                  <label className="flex items-center gap-1 text-lg text-textGray500">
                    Số điện thoại
                    <FaAsterisk className="text-[6px] text-textRed" />
                  </label>
                  <Input
                    size="large"
                    placeholder="Nhập số điện thoại"
                    className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                    status={`${errors.phoneNumber ? "error" : ""}`}
                    disabled={load}
                    value={numb?.phoneNumber}
                    onChange={(e) =>
                      handleChangeNumb("phoneNumber")(e.target.value)
                    }
                  />
                </div>
                <div className="">
                  <label className="flex items-center gap-1 text-lg text-textGray500">
                    Email
                    <FaAsterisk className="text-[6px] text-textRed" />
                  </label>
                  <Input
                    size="large"
                    placeholder="Nhập email"
                    className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                    status={`${errors.email ? "error" : ""}`}
                    disabled={load}
                    value={numb?.email}
                    onChange={(e) => handleChangeNumb("email")(e.target.value)}
                  />
                  <p className="mt-3 flex items-center gap-1 text-sm text-textGray300">
                    <FaAsterisk className="text-[6px] text-textRed" />
                    Là trường thông tin bắt buộc
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={closeModelInfo}
                  type="button"
                  className="h-12 w-[117px] rounded-lg border-[1.5px] border-orange400 bg-orange50 px-6 py-[10px] text-center text-base font-bold text-orange400 shadow-downShadow"
                >
                  Hủy bỏ
                </button>
                <Button
                  loading={load}
                  iconPosition={"end"}
                  size="large"
                  htmlType="submit"
                  className="!h-12 !w-[117px] !rounded-lg !border-0 !bg-orange400 !px-6 !py-2 font-nunito !text-base !font-bold !text-white !shadow-downShadow"
                >
                  Xác nhận
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
