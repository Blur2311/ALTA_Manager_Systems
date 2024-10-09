import { Link } from "react-router-dom";

type RoleRowProps = {
  id: string;
  role: string;
  quantity: number;
  description: string;
  color: string;
  lastRow: boolean;
};
export const RoleRow: React.FC<RoleRowProps> = ({
  id,
  role,
  quantity,
  description,
  color,
  lastRow,
}) => {
  return (
    <>
      <tr className={`h-12 ${color}`}>
        <td
          className={`border-orange100 ${lastRow && "rounded-bl-xl"} border-e px-4`}
        >
          {role}
        </td>
        <td className="border-e border-orange100 px-4">{quantity}</td>
        <td className="border-e border-orange100 px-4">{description}</td>
        <td className={`${lastRow && "rounded-br-xl"} px-4`}>
          <Link to={`/home/role/${id}`} className="text-[#4277FF] underline">
            Cập nhật
          </Link>
        </td>
      </tr>
    </>
  );
};
