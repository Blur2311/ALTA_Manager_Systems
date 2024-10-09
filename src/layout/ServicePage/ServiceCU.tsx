import { Button, Checkbox, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaAsterisk } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ServiceCU = () => {
  const [load, setLoad] = useState(false);
  return (
    <>
      <div className="mx-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý dịch vụ</h4>
        <div className="mt-8">
          <form action="">
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
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập mã dịch vụ"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
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
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <h6 className="mt-4 text-xl font-bold text-orange500">
                      Quy tắc cấp số
                    </h6>
                    <div className="mt-3 flex w-full">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                          <div className="min-w-[156px]">
                            <Checkbox className="custom-checkbox font-nunito text-base font-semibold text-textGray500">
                              Tăng tự động từ:
                            </Checkbox>
                          </div>
                          <div className="flex items-center gap-3">
                            <InputNumber
                              size="small"
                              className="w-[80px] border-[1.5px] border-gray100 px-3 py-[10px] !font-nunito text-base font-normal text-textGray400"
                              // status={`${error ? "error" : ""}`}
                              // disabled={load}
                              // value={username}
                              // onChange={(e) => setUsername(e.target.value)}
                            />
                            <p>đến</p>
                            <InputNumber
                              size="small"
                              className="w-[80px] border-[1.5px] border-gray100 px-3 py-[10px] !font-nunito text-base font-normal text-textGray400"
                              // status={`${error ? "error" : ""}`}
                              // disabled={load}
                              // value={username}
                              // onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="min-w-[156px]">
                            <Checkbox className="custom-checkbox font-nunito text-base font-semibold text-textGray500">
                              Prefix:
                            </Checkbox>
                          </div>
                          <InputNumber
                            size="small"
                            className="w-[80px] border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                            // status={`${error ? "error" : ""}`}
                            // disabled={load}
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="min-w-[156px]">
                            <Checkbox className="custom-checkbox font-nunito text-base font-semibold text-textGray500">
                              Surfix:
                            </Checkbox>
                          </div>
                          <InputNumber
                            size="small"
                            className="w-[80px] border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                            // status={`${error ? "error" : ""}`}
                            // disabled={load}
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <Checkbox className="custom-checkbox font-nunito text-base font-semibold text-textGray500">
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
                        // status={`${error ? "error" : ""}`}
                        // disabled={load}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-8">
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
