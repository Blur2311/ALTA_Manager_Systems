import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { login, logout } from "../../context/slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getAccountByUsername } from "../../utils/AccountUtils";
import { Link } from "react-router-dom";

export const SignIn: React.FC = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [load, setLoad] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth?.currentUser?.email);

  useEffect(() => {
    const userInfoCookie = Cookies.get("userInfo");

    if (!userInfoCookie) {
      // Không tìm thấy cookie, logout người dùng
      console.log("Cookie không tồn tại, đăng xuất người dùng");
      dispatch(logout());
    } else {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log("Người dùng hiện tại:", user.email);
          const profileImageUrl = user.photoURL || "";
          dispatch(login({ profileImageUrl }));
          navigate("/home");
        }
      });

      return () => unsubscribe();
    }
  }, [navigate, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);

    if (username === "" || password === "") {
      setError(true);
      setErrorMessage("Vui lòng không để trống");
      setLoad(false);
      return;
    }

    try {
      const account = await getAccountByUsername(username);

      if (account) {
        setError(false);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userCredential: UserCredential = await signInWithEmailAndPassword(
          auth,
          account.email,
          password,
        );

        // Dispatch thông tin người dùng vào Redux
        if (userCredential.user.photoURL) {
          dispatch(login({ profileImageUrl: userCredential.user.photoURL }));
        }
        // Lưu thông tin vào cookie
        Cookies.set("userInfo", JSON.stringify(account), { expires: 7 }); // Cookie sẽ hết hạn sau 7 ngày

        const user = userCredential.user; // Thông tin người dùng đã đăng nhập
        console.log("Đăng nhập thành công:", user);
        navigate("/home");
      } else {
        setError(true);
        setErrorMessage("Sai mật khẩu hoặc tên đăng nhập");
      }
    } catch (error: any) {
      console.error("Lỗi:", error.message);
      setError(true);
      setErrorMessage("Sai mật khẩu hoặc tên đăng nhập");
    } finally {
      setLoad(false);
    }
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
              className="container space-y-3 text-textGray"
              style={{ maxWidth: 400 }}
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="" className="text-lg">
                  Tên đăng nhập *
                </label>
                <Input
                  size="large"
                  className="font-nunito text-base font-normal text-textGray400"
                  status={`${error ? "error" : ""}`}
                  disabled={load}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="" className="text-lg">
                  Mật khẩu *
                </label>
                <Input.Password
                  size="large"
                  className="font-nunito text-base font-normal text-textGray400"
                  status={`${error ? "error" : ""}`}
                  disabled={load}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div>
                  <p className="mb-5 text-sm text-textRed">
                    <InfoCircleOutlined className="me-1" />
                    {errorMessage}
                  </p>
                </div>
              )}
              {!error && (
                <div>
                  <Link to="/forgot" className="text-sm text-textRed">
                    Quên mật khẩu?
                  </Link>
                </div>
              )}
              <div className="flex flex-col items-center space-y-3">
                <Button
                  loading={load}
                  iconPosition={"end"}
                  size="large"
                  htmlType="submit"
                  className="!w-40 !rounded-lg border-0 !bg-orange400 !px-6 !py-2 font-nunito !text-base !font-bold !text-white !shadow-downShadow"
                >
                  Đăng nhập
                </Button>
                {error && (
                  <Link to="/forgot" className="text-sm text-textRed">
                    Quên mật khẩu?
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="w-[848px] flex-none p-4">
          <div className="container relative mx-auto h-full ps-14 pt-16">
            <img src="/frame2.png" alt="" />
            <div className="absolute left-2/4 top-2/4 text-orange500">
              <p className="mb-3 text-3xl">Hệ thống</p>
              <p className="text-4xl font-black">QUẢN LÝ XẾP HÀNG</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
