import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

type UserRowProps = {
  id: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  status: boolean;
  color: string;
  lastRow: boolean;
};
export const UserRow: React.FC<UserRowProps> = ({
  id,
  username,
  fullName,
  phoneNumber,
  email,
  role,
  status,
  color,
  lastRow,
}) => {
  return (
    <>
      <tr className={`h-12 ${color}`}>
        <td
          className={`border-orange100 ${lastRow && "rounded-bl-xl"} border-e px-4`}
        >
          {username}
        </td>
        <td className="border-e border-orange100 px-4">{fullName}</td>
        <td className="border-e border-orange100 px-4">{phoneNumber}</td>
        <td className="border-e border-orange100 px-4">{email}</td>
        <td className="border-e border-orange100 px-4">{role}</td>
        <td className="border-e border-orange100 px-4">
          <div className="flex items-center gap-1">
            <GoDotFill
              className={`text-[16px] ${status ? "text-dotGreen" : "text-dotRed"}`}
            />
            <p>{status ? "Đang hoạt động" : "Ngưng hoạt động"}</p>
          </div>
        </td>
        <td className={`${lastRow && "rounded-br-xl"} px-4`}>
          <Link
            to={`/home/user-manage/${id}`}
            className="text-[#4277FF] underline"
          >
            Cập nhật
          </Link>
        </td>
      </tr>
    </>
  );
};
