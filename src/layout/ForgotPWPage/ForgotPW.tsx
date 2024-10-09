import { Button, Input } from "antd";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { checkEmailExists } from "../../utils/AccountUtils";

export const ForgotPW: React.FC = () => {
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    setEmail(email.trim());
    await new Promise((resolve) => setTimeout(resolve, 500));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError(true);
      setMessage("Vui lòng nhập email!");
      setLoad(false);
      return;
    } else if (!emailRegex.test(email)) {
      setError(true);
      setMessage("Email không hợp lệ!");
      setLoad(false);
      return;
    } else {
      setError(false);
      setMessage("");
    }
    console.log(await checkEmailExists(email));
    const isValid = await checkEmailExists(email);
    if (!isValid) {
      try {
        const actionCodeSettings = {
          // URL của trang đặt lại mật khẩu trên local
          url: `http://localhost:5173/reset-password?email=${email}`, // Địa chỉ local để test
          handleCodeInApp: true, // Đảm bảo xử lý mã trong ứng dụng
        };
        await sendPasswordResetEmail(auth, email, actionCodeSettings);
        setMessage(
          "Gửi thành công! Hãy kiểm tra email của bạn để nhận liên kết đặt lại mật khẩu.",
        );
      } catch (err) {
        console.log("Có lỗi xảy ra. Vui lòng kiểm tra lại email của bạn.");
      }
    }
    setLoad(false);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-1 bg-bgGray p-4">
          <div className="mt-20 flex justify-center">
            <img src="logoalta.png" alt="" />
          </div>
          <div className="mt-20 flex justify-center">
            <form
              onSubmit={handleResetPassword}
              className="container space-y-3 text-textGray"
              style={{ maxWidth: 400 }}
            >
              <h3 className="text-center text-2xl font-bold text-textGray500">
                Đặt lại mật khẩu
              </h3>
              <div className="">
                <label htmlFor="" className="text-lg">
                  Vui lòng nhập email để đặt lại mật khẩu của bạn *
                </label>
                <Input
                  size="large"
                  placeholder="Nhập email của bạn"
                  value={email}
                  status={`${error ? "error" : ""}`}
                  disabled={load}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
                {message && (
                  <p
                    className={`mt-1 text-sm ${error ? "text-textRed" : "text-dotGreen"}`}
                  >
                    {message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-evenly pt-6">
                <Link
                  to={`/login`}
                  className="w-40 rounded-lg border border-orange400 px-6 py-2 text-center text-base font-bold text-orange400"
                >
                  Hủy
                </Link>
                <Button
                  loading={load}
                  iconPosition={"end"}
                  size="large"
                  htmlType="submit"
                  className="!w-40 !rounded-lg !border-0 !bg-orange400 !px-6 !py-2 font-nunito !text-base !font-bold !text-white !shadow-downShadow"
                >
                  Tiếp tục
                </Button>
              </div>
            </form>
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
