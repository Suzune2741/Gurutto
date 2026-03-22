import { MdArrowDropDown } from "react-icons/md";

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

/**
 * 汎用的なドロップダウンリスト
 * @param props
 * @param props.value 現在選択されている値
 * @param props.onChange 選択肢が変更されたときの処理
 * @param props.options 選択肢の配列
 */
export const DropDownList = ({ value, onChange, options }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-0">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer w-fit"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <MdArrowDropDown className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};
