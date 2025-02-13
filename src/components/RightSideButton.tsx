import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type RightSideButtonProps = {
  text: ReactNode;
  Icon: React.ElementType;
  link: string;
};

export const RightSideButton: React.FC<RightSideButtonProps> = ({
  text,
  Icon,
  link,
}) => {
  return (
    <>
      <NavLink to={link} className="w-20 rounded-s-lg bg-orange50 px-1 py-3">
        <div className="flex flex-col items-center gap-1">
          <Icon className="text-[28px] text-orange500" />
          <p className="text-center text-sm font-semibold text-orange500">
            {text}
          </p>
        </div>
      </NavLink>
    </>
  );
};
