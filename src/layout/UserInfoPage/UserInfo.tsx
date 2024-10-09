import { Input, Spin, Tooltip } from "antd";
import { MdOutlineCameraAlt } from "react-icons/md";
import { auth, storage } from "../../config/firebase";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import { Accounts } from "../../model/Accounts";
import { useDispatch } from "react-redux";
import { login } from "../../context/slice/userSlice";

export const UserInfo = () => {
  const [user, setUser] = useState<Accounts | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState("/cat.jpeg");
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.currentUser?.photoURL) {
      setPhotoURL(auth?.currentUser?.photoURL);
    }
    // Lấy thông tin người dùng từ Redux store
    const accountCookie = Cookies.get("userInfo");

    if (accountCookie) {
      const parsedAccount = JSON.parse(accountCookie);
      const account: Accounts = {
        id: parsedAccount.id,
        email: parsedAccount.email,
        fullName: parsedAccount.fullName,
        password: parsedAccount.password,
        phoneNumber: parsedAccount.phoneNumber,
        role: parsedAccount.role,
        status: parsedAccount.status,
        username: parsedAccount.username,
      };

      setUser(account); // Lưu thông tin tài khoản vào state
    } else {
      console.log("Không có thông tin tài khoản trong cookie");
    }
  }, []);

  console.log(user);
  console.log(auth?.currentUser?.photoURL);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Kiểm tra xem file có phải là ảnh hay không
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null); // Reset file nếu không phải là ảnh
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const user = auth.currentUser;
    const fileRef = ref(storage, `images/${user?.uid}/${selectedFile.name}`);

    setUploading(true);

    try {
      await uploadBytes(fileRef, selectedFile); // Upload file
      const url = await getDownloadURL(fileRef); // Lấy URL file đã upload
      setPhotoURL(url); // Lưu URL vào state
      console.log("Uploaded file URL:", url);
      if (url) {
        setPhotoURL(url);

        // Cập nhật photoURL trong Firebase Authentication
        if (user) {
          await updateProfile(user, { photoURL: url });
        }
      }
      dispatch(login({ profileImageUrl: url }));
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="me-auto ms-6 mt-20">
        <div className="flex max-w-[1064px] items-center gap-6 rounded-xl bg-white px-6 pb-[54px] pt-10 shadow-infoShadow">
          <div className="flex flex-col items-center gap-5">
            {/* <input type="file" onChange={handleChangeFile} /> */}
            <div className="relative">
              <Tooltip title="Choose Image">
                <div className="relative flex h-[248px] w-[248px] cursor-pointer items-center justify-center overflow-hidden rounded-full">
                  <input
                    type="file"
                    onChange={handleChangeFile}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  {uploading ? (
                    <Spin size="small" />
                  ) : (
                    <img
                      src={photoURL || "placeholder-image-url.jpg"} // Thay thế bằng URL ảnh placeholder nếu cần
                      alt="Uploaded"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </Tooltip>
              <div className="absolute bottom-0 right-8">
                <Tooltip title="Submit Image">
                  <button
                    onClick={handleUpload}
                    className="flex items-center justify-center rounded-full bg-orange500 pb-[7px] pe-[7px] ps-2 pt-2 text-white shadow-whiteInShadow"
                  >
                    <MdOutlineCameraAlt className="text-[30px]" />
                  </button>
                </Tooltip>
              </div>
            </div>
            <h1 className="text-2xl font-bold">{user?.fullName}</h1>
          </div>
          <div className="flex-1">
            <form action="" className="container flex gap-6 text-textGray">
              <div className="w-2/4 space-y-6">
                <div>
                  <label htmlFor="" className="text-base font-semibold">
                    Tên người dùng
                  </label>
                  <Input
                    size="large"
                    disabled
                    value={user?.fullName}
                    className="!text-gray400 !mt-2 !border-0 !bg-gray50 !px-4 !py-3"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-base font-semibold">
                    Số điện thoại
                  </label>
                  <Input
                    size="large"
                    disabled
                    value={"0" + user?.phoneNumber}
                    className="!text-gray400 !mt-2 !border-0 !bg-gray50 !px-4 !py-3"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-base font-semibold">
                    Email:
                  </label>
                  <Input
                    size="large"
                    disabled
                    value={user?.email}
                    className="!text-gray400 !mt-2 !border-0 !bg-gray50 !px-4 !py-3"
                  />
                </div>
              </div>
              <div className="w-2/4 space-y-6">
                <div>
                  <label htmlFor="" className="text-base font-semibold">
                    Tên đăng nhập
                  </label>
                  <Input
                    size="large"
                    disabled
                    value={user?.username}
                    className="!text-gray400 !mt-2 !border-0 !bg-gray50 !px-4 !py-3"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-base font-semibold">
                    Mật khẩu
                  </label>
                  <Input
                    size="large"
                    disabled
                    value={user?.password}
                    className="!text-gray400 !mt-2 !border-0 !bg-gray50 !px-4 !py-3"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-base font-semibold">
                    Vai trò:
                  </label>
                  <Input
                    size="large"
                    disabled
                    value={user?.role}
                    className="!text-gray400 !mt-2 !border-0 !bg-gray50 !px-4 !py-3"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
