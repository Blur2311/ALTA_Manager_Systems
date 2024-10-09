type UserHistoryRowProps = {
  username: string;
  timestamp: string;
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
        <td className="border-orange100 border-e px-4">{timestamp}</td>
        <td className="border-orange100 border-e px-4">{ipAddress}</td>
        <td className={`${lastRow && "rounded-br-xl"} px-4`}>{action}</td>
      </tr>
    </>
  );
};
