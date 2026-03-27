import { FaShareAlt } from "react-icons/fa";
import type { Shop } from "~/types/hotpepper";
import { Button } from "./Button";
/**
 * 共有ボタンのコンポーネント
 * @param shop 共有する店舗の情報
 */
export const ShareButton = ({ shop }: { shop: Shop }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shop.name,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Button
      type="button"
      icon={<FaShareAlt size={16} />}
      onClick={handleShare}
      className="bg-gray-100 flex flex-row  gap-1.5 border-2 h-fit w-fit py-1.5 px-2  hover:relative hover:top-0.5 hover:left-0.5 shadow-md items-center"
    >
      共有する
    </Button>
  );
};
