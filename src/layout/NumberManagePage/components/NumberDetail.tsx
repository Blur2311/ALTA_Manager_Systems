import { GoDotFill } from "react-icons/go";
import { RightSideButton } from "../../../components/RightSideButton";
import { PiKeyReturnFill } from "react-icons/pi";

export const NumberDetail = () => {
  return (
    <>
      <div className="ms-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý cấp số</h4>
        <div className="mt-8">
          <div className="flex items-start gap-6">
            <div className="flex-1 rounded-2xl bg-white shadow-shadowBox">
              <div className="min-h-[600px] px-6 py-4">
                <h6 className="text-xl font-bold text-orange500">
                  Thông tin cấp số
                </h6>
                <div className="mt-5 flex items-center">
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Họ tên:
                      </p>
                      <p className="font-normal text-textGray400">
                        Nguyễn Thị Dung
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Tên dịch vụ:
                      </p>
                      <p className="font-normal text-textGray400">
                        Khám tim mạch
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Số thứ tự:
                      </p>
                      <p className="font-normal text-textGray400">2001201</p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Thời gian cấp:
                      </p>
                      <p className="font-normal text-textGray400">
                        14:35 - 07/11/2021
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Hạn sử dụng:
                      </p>
                      <p className="font-normal text-textGray400">
                        18:00 - 07/11/2021
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Nguồn cấp:
                      </p>
                      <p className="font-normal text-textGray400">Kiosk</p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Trạng thái:
                      </p>
                      <div className="flex items-center gap-1">
                        <GoDotFill className="text-[#4277FF]" />
                        <p className="font-normal text-textGray400">Đang chờ</p>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Số điện thoại:
                      </p>
                      <p className="font-normal text-textGray400">0948523623</p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Địa chỉ Email:
                      </p>
                      <p className="font-normal text-textGray400">
                        nguyendung@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <RightSideButton
              Icon={PiKeyReturnFill}
              text={<span>Quay lại</span>}
            />
          </div>
        </div>
      </div>
    </>
  );
};
