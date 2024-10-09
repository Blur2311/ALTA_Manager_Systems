import { Button, Input, Select } from "antd";
import { FaAsterisk, FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllRole } from "../../utils/RoleUtils";
import { Accounts } from "../../model/Accounts";
import {
  checkEmailExists,
  checkUsernameExists,
  createAccount,
  getAccountById,
  updateAccount,
} from "../../utils/AccountUtils";

export const UserCU = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [user, setUser] = useState<Accounts>({
    id: "",
    email: "",
    fullName: "",
    password: "",
    phoneNumber: "",
    role: "Kế toán",
    status: false,
    username: "",
  });
  const [rePassword, setRePassword] = useState("");

  const [errors, setErrors] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
    username: "",
    password: false,
    rePassword: false,
    role: false,
  });

  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới

  const handleChangeUser = (field: keyof Accounts) => (value: any) => {
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [field]: value,
        };
      }
      return { [field]: value } as Accounts;
    });
  };

  const fetchRoleData = async () => {
    try {
      const fetchedRoles = await getAllRole();
      const mappedOptions = fetchedRoles.map((role) => ({
        value: role.roleName,
        label: (
          <span className="font-nunito text-base text-gray5">
            {role.roleName}
          </span>
        ),
      }));
      setOptions(mappedOptions);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchUserData = async () => {
    const accData = await getAccountById(id!);
    if (accData) {
      setUser({
        id: id || "",
        email: accData.email,
        fullName: accData.fullName,
        password: accData.password,
        phoneNumber: accData.phoneNumber,
        role: accData.role,
        status: accData.status,
        username: accData.username,
      });
      setRePassword(accData.password);
    }
  };

  const validate = async () => {
    let tempErrors = { ...errors };
    let isValid = true;

    // Kiểm tra họ tên
    if (!user.fullName) {
      tempErrors.fullName = true;
      isValid = false;
    } else {
      tempErrors.fullName = false;
    }

    // Kiểm tra số điện thoại
    if (!user.phoneNumber) {
      tempErrors.phoneNumber = true;
      isValid = false;
    } else {
      tempErrors.phoneNumber = false;
    }

    // Kiểm tra email
    const emailExists = isUpdateMode
      ? await checkEmailExists(user.email, id)
      : await checkEmailExists(user.email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email || !emailRegex.test(user.email)) {
      tempErrors.email = true;
      isValid = false;
    } else if (!emailExists) {
      tempErrors.email = true;
      isValid = false;
    } else {
      tempErrors.email = false;
    }

    console.log(emailExists);

    // Kiểm tra vai trò
    if (!user.role) {
      tempErrors.role = true;
      isValid = false;
    } else {
      tempErrors.role = false;
    }

    // Kiểm tra tên đăng nhập có trùng trong Firestore không
    const usernameExists = isUpdateMode
      ? await checkUsernameExists(user.username, id)
      : await checkUsernameExists(user.username);
    console.log(usernameExists);

    if (!user.username) {
      tempErrors.username = "Không được để trống";
      isValid = false;
    } else if (!usernameExists) {
      tempErrors.username = "Tên đăng nhập đã tồn tại";
      isValid = false;
    } else {
      tempErrors.username = "";
    }

    // Kiểm tra mật khẩu
    if (!user.password || user.password.length < 6) {
      tempErrors.password = true;
      isValid = false;
    } else {
      tempErrors.password = false;
    }

    // Kiểm tra nhập lại mật khẩu
    if (rePassword !== user.password || rePassword === "") {
      tempErrors.rePassword = true;
      isValid = false;
    } else {
      tempErrors.rePassword = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  useEffect(() => {
    fetchRoleData();
    if (isUpdateMode) {
      fetchUserData();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);

    const isValid = await validate();

    if (isValid) {
      try {
        if (isUpdateMode) {
          await updateAccount(id!, user);
        } else {
          await createAccount(user);
        }
      } catch (error) {
        console.error("Error saving role:", error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/home/user-manage");
      }
    }
    setLoad(false);
  };

  return (
    <>
      <div className="mx-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">Quản lý tài khoản</h4>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="h-[530px] rounded-2xl bg-white shadow-shadowBox">
              <div className="px-6 py-4">
                <h6 className="text-xl font-bold text-orange500">
                  Thông tin tài khoản
                </h6>
                <div className="mt-3 flex justify-between gap-6">
                  <div className="flex-1">
                    <div className="">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Họ tên
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập họ tên"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.fullName ? "error" : ""}`}
                        disabled={load}
                        value={user?.fullName}
                        onChange={(e) =>
                          handleChangeUser("fullName")(e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
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
                        value={user?.phoneNumber}
                        onChange={(e) =>
                          handleChangeUser("phoneNumber")(e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
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
                        value={user?.email}
                        onChange={(e) =>
                          handleChangeUser("email")(e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Vai trò
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Select
                        placeholder="Chọn vai trò"
                        size="large"
                        status={`${errors.role ? "error" : ""}`}
                        value={user?.role}
                        onChange={handleChangeUser("role")}
                        suffixIcon={
                          <FaCaretDown className="text-2xl text-orange500" />
                        }
                        className="custom-user-select mt-2 !h-12 w-full font-nunito"
                        options={options}
                      />
                    </div>

                    <p className="mt-3 flex items-center gap-1 text-sm text-textGray300">
                      <FaAsterisk className="text-[6px] text-textRed" />
                      Là trường thông tin bắt buộc
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Tên đăng nhập:
                        <FaAsterisk className="text-[6px] text-textRed" />
                        {errors.username && (
                          <p className="text-xs text-textRed">
                            {errors.username}
                          </p>
                        )}
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập tên đăng nhập"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.username !== "" ? "error" : ""}`}
                        disabled={load}
                        value={user?.username}
                        onChange={(e) =>
                          handleChangeUser("username")(e.target.value)
                        }
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
                        status={`${errors.password ? "error" : ""}`}
                        disabled={load}
                        value={user?.password}
                        onChange={(e) =>
                          handleChangeUser("password")(e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Nhập lại mật khẩu:
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Input.Password
                        size="large"
                        placeholder="Nhập lại mật khẩu"
                        className="mt-2 border-[1.5px] border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        status={`${errors.rePassword ? "error" : ""}`}
                        disabled={load}
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Tình trạng
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Select
                        placeholder="Chọn trạng thái hoạt động"
                        size="large"
                        value={user?.status ? "Hoạt động" : "Ngưng hoạt động"} // Hiển thị tình trạng đã chọn
                        onChange={handleChangeUser("status")}
                        suffixIcon={
                          <FaCaretDown className="text-2xl text-orange500" />
                        }
                        className="custom-user-select mt-2 !h-12 w-full font-nunito"
                        options={[
                          {
                            value: false,
                            label: (
                              <span className="font-nunito text-base text-gray5">
                                Ngưng hoạt động
                              </span>
                            ),
                          },
                          {
                            value: true,
                            label: (
                              <span className="font-nunito text-base text-gray5">
                                Hoạt động
                              </span>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8">
              <Link
                to={`/home/user-manage`}
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
                {isUpdateMode ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
