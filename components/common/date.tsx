import { parseISO, format } from "date-fns";
/*
parseISO: ISO形式の日付文字列をJavaScriptのDateオブジェクトに変換
format: Dateオブジェクトを指定した形式の文字列に変換
*/

interface DateProps {
  dateString: string;
}

/*
参考：
    cccc: Monday ~ Sunday
    LLLL: January ~ December
    MM: 1 ~ 12
    dd: 1 ~ 31
    yyyy: 1900, 2025
*/

const Date = ({ dateString }: DateProps) => {
  const reDateString = dateString.replace(/\./g, "-"); //2025.01.11 => 2025-01-11
  const date = parseISO(reDateString); //Dateオブジェクトに変換
  return (
    <time className="w-1/2 text-right" dateTime={dateString}>
      {format(date, "yyyy.MM.dd")}
    </time>
  );
};

export default Date;
