import { Form } from "react-router";
import { Button } from "./Button";
import { IoSearchSharp } from "react-icons/io5";
import { Slider } from "./Slider";

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
  return (
    <Form method="get" className="flex items-center" action="/research">
      <div className="flex flex-col">
        <div className="flex flex-col mb-2">
          <p>検索半径の設定</p>
          <Slider />
        </div>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            name="keyword"
            placeholder="うどん,ラーメン..."
            className="h-11 px-4 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 transition-colors"
          />
          <input type="hidden" name="lat" value={lat ?? "35.6895"} />
          <input type="hidden" name="lng" value={lng ?? "139.6917"} />
          <Button type="submit" icon={<IoSearchSharp />}>
            検索
          </Button>
        </div>
      </div>
    </Form>
  );
};
