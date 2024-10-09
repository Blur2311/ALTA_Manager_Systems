import { Button, Input } from "antd";
import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { updateAccountPW } from "../../utils/AccountUtils";

export const ResetPassword: React.FC = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get("oobCode");
  const continueUrl = queryParams.get("continueUrl");
  let email = null;

  if (continueUrl) {
    // Thêm bước giải mã phần URL đã bị mã hóa
    const decodedContinueUrl = decodeURIComponent(continueUrl);

    // Kiểm tra xem email có nằm trong decodedContinueUrl không
    const continueParams = new URLSearchParams(
      decodedContinueUrl.split("?")[1],
    );
    email = continueParams.get("email");
  }

  console.log("oobCode:", oobCode);
  console.log("email:", email);

  const handleResetPassword = async () => {
    setLoad(true);
    if (!oobCode) {
      setMessage("Mã xác thực không hợp lệ!");
      return;
    }

    // Kiểm tra mật khẩu
    if (!newPassword || newPassword.length < 6 || rePassword === "") {
      setError(true);
      setMessage("Không được để trống hoặc ít hơn 6 kí tự!");
      setLoad(false);
      return;
    } else setError(false);

    // Kiểm tra nhập lại mật khẩu
    if (rePassword !== newPassword) {
      setError(true);
      setMessage("Mật khẩu nhập lại không đúng!");
      setLoad(false);
      return;
    } else {
      setError(false);
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      email && updateAccountPW(email, newPassword);
      setMessage(
        "Mật khẩu đã được đổi thành công! Bạn sẽ được chuyển hướng đến trang đăng nhập.",
      );
    } catch (error) {
      console.log(error);
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoad(false);
    navigate("sign-in");
  };
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-1 bg-bgGray p-4">
          <div className="mt-20 flex justify-center">
            <img src="logoalta.png" alt="" />
          </div>
          <div className="mt-20 flex justify-center">
            <div
              className="container space-y-3 text-textGray"
              style={{ maxWidth: 400 }}
            >
              <h3 className="text-center text-2xl font-bold text-textGray500">
                Đặt lại mật khẩu mới
              </h3>
              <div>
                <label htmlFor="" className="text-lg">
                  Mật khẩu
                </label>
                <Input.Password
                  size="large"
                  status={`${error ? "error" : ""}`}
                  disabled={load}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-11"
                />
              </div>
              <div>
                <label htmlFor="" className="text-lg">
                  Nhập lại mật khẩu
                </label>
                <Input.Password
                  size="large"
                  status={`${error ? "error" : ""}`}
                  disabled={load}
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="h-11"
                />
              </div>
              {message && (
                <p
                  className={`mt-1 text-sm ${error ? "text-textRed" : "text-dotGreen"}`}
                >
                  {message}
                </p>
              )}
              <div className="flex flex-col items-center pt-6">
                <Button
                  loading={load}
                  iconPosition={"end"}
                  size="large"
                  onClick={handleResetPassword}
                  className="!w-40 !rounded-lg !border-0 !bg-orange400 !px-6 !py-2 font-nunito !text-base !font-bold !text-white !shadow-downShadow"
                >
                  Xác nhận
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[848px] flex-none p-4">
          <div className="container relative mx-auto h-full ps-14 pt-16">
            <img src="Frame.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
