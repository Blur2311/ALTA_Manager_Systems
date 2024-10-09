import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaAsterisk } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoleCheckBox } from "./components/RoleCheckBox";
import { createRole, getRole, updateRole } from "../../utils/RoleUtils";

export const RoleCU = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [functionGroupA, setFunctionGroupA] = useState<string[]>([]);
  const [functionGroupB, setFunctionGroupB] = useState<string[]>([]);

  const navigate = useNavigate();

  const { id } = useParams<{ id?: string }>(); // Nhận tham số id tùy chọn
  const isUpdateMode = Boolean(id); // Xác định chế độ cập nhật hay tạo mới

  const fetchRole = async (id: string) => {
    const roleData = await getRole(id);
    if (roleData) {
      setRoleName(roleData.roleName || "");
      setDescription(roleData.description || "");
      setFunctionGroupA(roleData.functionGroupA || []);
      setFunctionGroupB(roleData.functionGroupB || []);
      setQuantity(roleData.quantity || 0);
    }
  };

  useEffect(() => {
    if (isUpdateMode) {
      fetchRole(id!);
    } else {
      // Xóa dữ liệu trong form khi tạo mới
      setRoleName("");
      setDescription("");
      setFunctionGroupA([]);
      setFunctionGroupB([]);
      setQuantity(0);
    }
  }, [id]);

  // Hàm xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      functionGroupA.length === 0 ||
      functionGroupB.length === 0 ||
      !roleName.trim()
    ) {
      setError(true);
      return;
    } else setError(false);

    setLoad(true);

    const roleData = {
      roleName,
      description,
      functionGroupA,
      functionGroupB,
      quantity,
    };
    try {
      if (isUpdateMode) {
        await updateRole(id!, roleData);
      } else {
        await createRole(roleData);
      }
    } catch (error) {
      console.error("Error saving role:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoad(false);
      navigate("/home/role");
    }
  };

  return (
    <>
      <div className="mx-6 mt-4">
        <h4 className="text-2xl font-bold text-orange500">
          {isUpdateMode ? "Cập nhật vai trò" : "Thêm vai trò"}
        </h4>
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="rounded-2xl bg-white shadow-shadowBox">
              <div className="px-6 py-4">
                <h6 className="text-xl font-bold text-orange500">
                  Thông tin vai trò
                </h6>
                <div className="mt-3 flex justify-between gap-6">
                  <div className="flex-1">
                    <div className="">
                      <label className="flex items-center gap-1 text-lg text-textGray500">
                        Tên vai trò
                        <FaAsterisk className="text-[6px] text-textRed" />
                      </label>
                      <Input
                        size="large"
                        placeholder="Nhập tên vai trò"
                        className="mt-2 border-2 border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        value={roleName}
                        disabled={load}
                        onChange={(e) => setRoleName(e.target.value)}
                        status={`${error ? "error" : ""}`}
                      />
                    </div>
                    <div className="mt-3">
                      <label className="text-lg text-textGray500">Mô tả:</label>
                      <TextArea
                        rows={6}
                        disabled={load}
                        size="large"
                        placeholder="Nhập mô tả"
                        className="mt-2 border-2 border-gray100 px-3 py-[10px] font-nunito text-base font-normal text-textGray400"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <p className="mt-3 flex items-center gap-1 text-sm text-textGray300">
                      <FaAsterisk className="text-[6px] text-textRed" />
                      Là trường thông tin bắt buộc
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="flex items-center gap-1 text-lg text-textGray500">
                      Phân quyền chức năng
                      <FaAsterisk className="text-[6px] text-textRed" />
                    </p>
                    <div
                      className={`mt-2 rounded-lg bg-orange50 px-6 py-4 ${error ? "border border-textRed" : ""}`}
                    >
                      <div className="flex flex-col gap-6">
                        <RoleCheckBox
                          title="Nhóm chức năng A"
                          options={[
                            "Chức năng x",
                            "Chức năng y",
                            "Chức năng z",
                          ]}
                          onPermissionChange={(newCheckedList) =>
                            setFunctionGroupA(newCheckedList)
                          } // Nhận danh sách quyền đã chọn
                          checkedList={functionGroupA}
                        />
                        <RoleCheckBox
                          title="Nhóm chức năng B"
                          options={[
                            "Chức năng x",
                            "Chức năng y",
                            "Chức năng z",
                          ]}
                          onPermissionChange={(newCheckedList) =>
                            setFunctionGroupB(newCheckedList)
                          } // Nhận danh sách quyền đã chọn
                          checkedList={functionGroupB}
                        />
                      </div>
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
                {isUpdateMode ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
