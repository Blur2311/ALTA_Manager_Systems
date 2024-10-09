import { Button, Input, Select } from "antd";
import { FaAsterisk, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

import { FaXmark } from "react-icons/fa6";

export const DeviceCU = () => {
  const [load, setLoad] = useState(false);

  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
  };
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const options = [
    { label: "Tất cả", value: "1" },
    { label: "Khám răng hàm mặt", value: "2" },
    { label: "Khám tai mũi họng", value: "3" },
  ];

  const handleChangeSelect = (value: string[]) => {
    setSelectedItems(value);
  };

  return (
    <>
      <div className="mx-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý tài khoản</h4>
        <div className="mt-8">
          <form action="">
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
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập mã thiết bị"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
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
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
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
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
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
                        defaultValue="Kiosk"
                        size="large"
                        onChange={handleChange}
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
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
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
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
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
                    className={`custom-multiple-select mt-2 ${selectedItems.length > 0 ? "border-changed" : ""}`}
                    onChange={handleChangeSelect}
                    options={options}
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
                to={`/home/role`}
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
                Thêm
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
