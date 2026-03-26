import { useState } from "react";
import { useSearchParams } from "react-router";
import type { IconType } from "react-icons";
import {
  MdChildFriendly,
  MdOutlineMeetingRoom,
  MdRestaurant,
} from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import { FaParking, FaSun, FaCreditCard } from "react-icons/fa";

type conditions = {
  key: string;
  label: string;
  Icon: IconType;
};

const CONDITIONS_MAP: conditions[] = [
  { key: "private_room", label: "個室", Icon: MdOutlineMeetingRoom },
  { key: "free_drink", label: "飲み放題", Icon: BiDrink },
  { key: "parking", label: "駐車場", Icon: FaParking },
  { key: "lunch", label: "ランチ", Icon: FaSun },
  { key: "free_food", label: "食べ放題", Icon: MdRestaurant },
  { key: "card", label: "クレカ可", Icon: FaCreditCard },
  { key: "child", label: "お子様OK", Icon: MdChildFriendly },
];

export const ConditionFilters = () => {
  const [searchParams] = useSearchParams();
  const [conditionState, setConditionState] = useState<Record<string, boolean>>(
    () => {
      const initialState: Record<string, boolean> = {};
      CONDITIONS_MAP.forEach(({ key }) => {
        initialState[key] = searchParams.get(key) === "1";
      });
      return initialState;
    },
  );

  const toggleCondition = (key: string) => {
    setConditionState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4">
        {CONDITIONS_MAP.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => toggleCondition(key)}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium transition-all rounded-full border ${
              conditionState[key]
                ? "bg-orange-50 text-orange-600 border-orange-400 shadow-sm"
                : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                conditionState[key] ? "text-orange-600" : "text-gray-400"
              }`}
            />
            {label}
          </button>
        ))}
      </div>

      {CONDITIONS_MAP.map(({ key }) =>
        conditionState[key] ? (
          <input key={`hidden-${key}`} type="hidden" name={key} value="1" />
        ) : null,
      )}
    </>
  );
};
