import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

export const customPaginationitemRender = (
  _current: number,
  type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
  originalElement: React.ReactNode,
) => {
  if (type === "prev") {
    return (
      <div className="flex h-full items-center justify-center rounded-md">
        <BiSolidLeftArrow className="text-textGray200" />
      </div>
    );
  }
  if (type === "next") {
    return (
      <div className="flex h-full items-center justify-center rounded-md">
        <BiSolidRightArrow className="text-textGray200" />
      </div>
    );
  }
  return originalElement;
};
