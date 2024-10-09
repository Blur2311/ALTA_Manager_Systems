import { FaSquarePen } from "react-icons/fa6";
import { RightSideButton } from "../../../components/RightSideButton";

export const DeviceDetail = () => {
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
                      <p className="font-normal text-textGray400">KIO_01</p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Tên thiết bị:
                      </p>
                      <p className="font-normal text-textGray400">Kiosk</p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Địa chỉ IP:
                      </p>
                      <p className="font-normal text-textGray400">
                        128.172.308
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Loại thiết bị:
                      </p>
                      <p className="font-normal text-textGray400">Kiosk</p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Tên đăng nhập:
                      </p>
                      <p className="font-normal text-textGray400">Linhkyo011</p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Mật khẩu:
                      </p>
                      <p className="font-normal text-textGray400">CMS</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 w-[160px] text-base font-semibold text-textGray500">
                  Dịch vụ sử dụng:
                </p>
                <p className="mt-2 font-normal text-textGray400">
                  Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám
                  tai mũi họng, Khám hô hấp, Khám tổng quát.
                </p>
              </div>
            </div>
            <RightSideButton
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
