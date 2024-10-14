import firebase from "firebase/compat/app";
import { formatTimestampUserLog } from "../../../utils/UserLogUtils";

type UserHistoryRowProps = {
  username: string;
  timestamp: firebase.firestore.Timestamp;
  ipAddress: string;
  action: string;
  color: string;
  lastRow: boolean;
};
export const UserHistoryRow: React.FC<UserHistoryRowProps> = ({
  username,
  timestamp,
  ipAddress,
  action,
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
        <td className="border-e border-orange100 px-4">
          {formatTimestampUserLog(timestamp)}
        </td>
        <td className="border-e border-orange100 px-4">{ipAddress}</td>
        <td className={`${lastRow && "rounded-br-xl"} px-4`}>{action}</td>
      </tr>
    </>
  );
};
