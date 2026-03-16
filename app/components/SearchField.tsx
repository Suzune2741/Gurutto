import { Form } from "react-router";
import { Button } from "./Button";
type Props = {
  lat?: number;
  lng?: number;
};
export const SearchField = ({ lat, lng }: Props) => {
  return (
    <Form method="get">
      <input
        type="text"
        name="keyword"
        placeholder="うどん,ラーメン..."
        className="flex-1 h-11 px-4 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 transition-colors"
      />
      <input type="hidden" name="lat" value={lat ?? "35.6895"} />
      <input type="hidden" name="lng" value={lng ?? "139.6917"} />
      <Button type="submit">検索</Button>
    </Form>
  );
};
