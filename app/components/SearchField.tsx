import { Form, useSearchParams } from "react-router";
import { Button } from "./Button";
import { IoSearchSharp } from "react-icons/io5";
import { Slider } from "./Slider";
import { ConditionFilters } from "./ConditionFilters";

type Props = {
  lat?: number;
  lng?: number;
};
/**
 * 検索フィールド
 * @param props
 * @param props.lat 緯度
 * @param props.lng 経度
 */
export const SearchField = ({ lat, lng }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <Form
      method="get"
      className="w-full flex flex-col items-center"
      action="/research"
    >
      <div className="w-full max-w-xl flex flex-col items-center">
        <div className="w-full flex flex-col items-center my-3">
          <p className="text-xl mb-2 font-medium">検索半径</p>

          <div className="w-full px-2">
            <Slider />
          </div>
        </div>

        <div className="mb-4">
          <ConditionFilters />
        </div>

        <div className="flex flex-row justify-center gap-2">
          <input
            type="text"
            name="keyword"
            placeholder="うどん,ラーメン..."
            autoComplete="off"
            className="flex-1 min-w-50 h-11 px-4 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 transition-colors"
          />
          <input type="hidden" name="lat" value={lat ?? "35.6895"} />
          <input type="hidden" name="lng" value={lng ?? "139.6917"} />
          <input
            type="hidden"
            name="count"
            value={searchParams.get("count") || "10"}
          />
          {/*スマホとPCでボタンサイズを変更させる*/}
          <div className="block md:hidden">
            <Button
              type="submit"
              icon={<IoSearchSharp size={18} />}
              className="text-white bg-red-500 hover:bg-red-700 w-full"
              size="sm"
            >
              検索
            </Button>
          </div>
          <div className="hidden md:block">
            <Button
              type="submit"
              icon={<IoSearchSharp size={18} />}
              className="text-white bg-red-500 hover:bg-red-700"
              size="md"
            >
              検索
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
