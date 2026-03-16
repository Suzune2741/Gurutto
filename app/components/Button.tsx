import { Children, type ButtonHTMLAttributes } from "react";

type ButtonSize = "sm" | "md" | "lg";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
};
const sizeClass: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded-lg",
  md: "text-sm px-4 py-2 rounded-xl",
  lg: "text-base px-6 py-3 rounded-xl",
};
export const Button = ({
  size = "md",
  className = "",
  children,
  ...props
}: Props) => {
  return (
    <button
      type="submit"
      className={[
        "h-11 bg-red-500 hover:bg-red-700 text-white font-medium transition-colors",
        sizeClass[size],
      ].join(" ")}
    >
      {children}
    </button>
  );
};
