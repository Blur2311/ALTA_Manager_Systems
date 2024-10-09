import { Button, Modal, Select } from "antd";
import { useState } from "react";
import { FaCaretDown, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const NumberCreate = () => {
  const [load, setLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
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
                    suffixIcon={
                      <FaCaretDown className="text-2xl text-orange500" />
                    }
                    className="custom-user-select mt-3 h-11 w-[400px] font-nunito"
                    options={[
                      {
                        value: "Khám tim mạch",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Khám tim mạch
                          </span>
                        ),
                      },
                      {
                        value: "Khám sản - Phụ khoa",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Khám sản - Phụ khoa
                          </span>
                        ),
                      },
                      {
                        value: "Khám răng hàm mặt",
                        label: (
                          <span className="font-nunito text-base text-gray5">
                            Khám răng hàm mặt
                          </span>
                        ),
                      },
                    ]}
                  />
                  <div className="mt-20 flex items-center justify-center gap-8">
                    <Link
                      to={`/home/role`}
                      className="h-12 w-[147px] rounded-lg border-[1.5px] border-orange400 bg-orange50 px-6 py-[10px] text-center text-base font-bold text-orange400 shadow-downShadow"
                    >
                      Hủy bỏ
                    </Link>
                    <Modal
                      closeIcon={
                        <FaXmark className="text-2xl text-orange500" />
                      }
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
                              2001201
                            </h1>
                            <p className="text-lg text-textGray500">
                              DV: Khám răng hàm mặt <b>(tại quầy số 1)</b>
                            </p>
                          </div>
                          <div className="flex w-full flex-col items-center gap-3 rounded-b-3xl bg-orange500 py-4">
                            <div className="flex items-end gap-2 text-[22px] font-bold text-white">
                              <p className="w-[143px]">Thời gian cấp:</p>
                              <p className="">14:35 - 07/11/2021</p>
                            </div>
                            <div className="flex items-end gap-2 text-[22px] font-bold text-white">
                              <p className="w-[143px]">Hạn sử dụng:</p>
                              <p className="">18:00 - 07/11/2021</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                    <Button
                      loading={load}
                      iconPosition={"end"}
                      size="large"
                      onClick={showModal}
                      className="!h-12 !w-[147px] !rounded-lg !border-0 !bg-orange400 !px-6 !py-2 font-nunito !text-base !font-bold !text-white !shadow-downShadow"
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
    </>
  );
};
