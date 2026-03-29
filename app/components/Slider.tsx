import { useState } from "react";

/**
 * スライダー
 * 参考: https://daisyui.com/components/range/
 */
export const Slider = () => {
  const [index, setIndex] = useState<number>(2);
  const steps = [
    { label: "300m", distance: 1 },
    { label: "500m", distance: 2 },
    { label: "1km", distance: 3 },
    { label: "2km", distance: 4 },
    { label: "3km", distance: 5 },
  ];
  return (
    <div className="w-full max-w-sm mx-auto">
      <input type="hidden" name="radius" value={steps[index].distance} />
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        value={index}
        className="range  w-full"
        onChange={(e) => setIndex(Number(e.target.value))}
        step="1"
      />
      <div className="flex w-full justify-between px-2 mt-1">
        {steps.map((step) => (
          <span key={step.label} className="flex flex-col items-center w-0 ">
            <span>|</span>
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
};
