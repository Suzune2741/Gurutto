import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonSize = "sm" | "md" | "lg";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  icon?: ReactNode;
};
const sizeClass: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded-lg",
  md: "text-sm px-4 py-2 rounded-xl",
  lg: "text-base px-6 py-3 rounded-xl",
};
/**
 * 汎用的なボタン
 * @param props
 * @param props.size ボタンのサイズ（"sm" | "md" | "lg" ,デフォルトは "md"）
 * @param props.icon ボタン内に表示するアイコン要素
 * @param props.className 追加のCSSクラス
 * @param props.children ボタンのテキストや内包する要素
 */
export const Button = ({
  size = "md",
  icon,
  className = "",
  children,
  ...props
}: Props) => {
  return (
    <button
      type="submit"
      className={[
        "h-11 text-white font-medium transition-colors flex items-center gap-2",
        sizeClass[size],
        className
      ].join(" ")}
      {...props}
    >
      {children}
      {icon && <>{icon}</>}
    </button>
  );
};
