import React, { useState, useEffect } from "react";
import { Checkbox } from "antd"; // Import đúng kiểu sự kiện
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface RoleCheckBoxProps {
  title: string;
  options: string[];
  onPermissionChange: (checkedList: string[]) => void;
  checkedList: string[];
}

export const RoleCheckBox: React.FC<RoleCheckBoxProps> = ({
  title,
  options,
  onPermissionChange,
  checkedList,
}) => {
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setCheckAll(checkedList.length === options.length); // Kiểm tra nếu tất cả đều được chọn
  }, [checkedList, options.length]);

  const onChange = (checked: boolean, option: string) => {
    const newList = checked
      ? [...checkedList, option]
      : checkedList.filter((item) => item !== option);
    onPermissionChange(newList);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const allChecked = e.target.checked ? options : [];
    onPermissionChange(allChecked);
    setCheckAll(e.target.checked);
  };

  return (
    <div>
      <h6 className="text-xl font-bold text-orange500">{title}</h6>
      <div className="mt-3 flex flex-col gap-3">
        <Checkbox
          indeterminate={
            checkedList.length > 0 && checkedList.length < options.length
          }
          onChange={onCheckAllChange}
          checked={checkAll}
          className="custom-checkbox font-nunito text-base font-semibold text-textGray400"
        >
          Tất cả
        </Checkbox>
        {options.map((option) => (
          <Checkbox
            key={option}
            className="custom-checkbox font-nunito text-base font-semibold text-textGray400"
            checked={checkedList.includes(option)} // Kiểm tra nếu option có trong checkedList
            onChange={(e: CheckboxChangeEvent) =>
              onChange(e.target.checked, option)
            }
          >
            {option}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
