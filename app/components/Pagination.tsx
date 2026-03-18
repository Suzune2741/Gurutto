/**
 * 汎用的なページネーションコンポーネント
 * @param props
 * @param props.currentPage 現在のページ番号
 * @param props.totalPages 全ページ数
 * @param props.onPageChange ページが変更された時に呼ばれる関数
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 my-8">
      {/* 前へボタン */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition"
      >
        前へ
      </button>

      {/* 現在のページ / 全ページ */}
      <div className="text-gray-700 font-medium">
        {currentPage} <span className="text-gray-400 mx-1">/</span> {totalPages}
      </div>

      {/* 次へボタン */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition"
      >
        次へ
      </button>
    </div>
  );
};
