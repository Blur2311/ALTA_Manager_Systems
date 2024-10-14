import { GoDotFill } from "react-icons/go";
import { RightSideButton } from "../../components/RightSideButton";
import { PiKeyReturnFill } from "react-icons/pi";
import { NumberManagement } from "../../model/Number";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNumbById } from "../../utils/NumberUtils";
import { formatTimestamp } from "../../utils/ServiceUtils";

export const NumberDetail = () => {
  const [numb, setNumb] = useState<NumberManagement>();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        const data = await getNumbById(id);
        data && setNumb(data);
      }
    };

    fetchService();
  }, []);

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
                        {numb?.customerName}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Tên dịch vụ:
                      </p>
                      <p className="font-normal text-textGray400">
                        {numb?.serviceName}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Số thứ tự:
                      </p>
                      <p className="font-normal text-textGray400">
                        {numb?.order}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Thời gian cấp:
                      </p>
                      <p className="font-normal text-textGray400">
                        {numb?.provisionTime &&
                          formatTimestamp(numb?.provisionTime)}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Hạn sử dụng:
                      </p>
                      <p className="font-normal text-textGray400">
                        {numb?.expiryDate && formatTimestamp(numb?.expiryDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Nguồn cấp:
                      </p>
                      <p className="font-normal text-textGray400">
                        {numb?.supplySource}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Trạng thái:
                      </p>
                      <div className="flex items-center gap-1">
                        <GoDotFill
                          className={`${numb?.status !== "Bỏ qua" ? (numb?.status === "Đang chờ" ? "text-[#4277FF]" : "text-textGray300") : "text-dotRed"}`}
                        />
                        <p className="font-normal text-textGray400">
                          {numb?.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Số điện thoại:
                      </p>
                      <p className="font-normal text-textGray400">
                        {numb?.phoneNumber}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <p className="w-[160px] text-base font-semibold text-textGray500">
                        Địa chỉ Email:
                      </p>
                      <p className="font-normal text-textGray400">
                        {numb?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <RightSideButton
              link="/home/number"
              Icon={PiKeyReturnFill}
              text={<span>Quay lại</span>}
            />
          </div>
        </div>
      </div>
    </>
  );
};
