import { MdArrowDropDown } from "react-icons/md";
import { useSearchParams } from "react-router";

type Option = {
  value: string;
  label: string;
};
type Props = {
  options: Option[];
};
/**
 * ドロップダウンリスト
 * @param props
 * @param props.options 選択肢の配列
 */
export const DropDownList = ({ options }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCount = searchParams.get("count") || "10";

  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    newParams.set("count", selectedValue);
    newParams.set("page", "1");

    setSearchParams(newParams);
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-0">
      <div className="relative">
        <select
          value={currentCount}
          onChange={handleSelectOption}
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
