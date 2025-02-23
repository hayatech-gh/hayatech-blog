export const isNew = (date: string) => {
  const currentDate = new Date();
  const blogDate = new Date(date.replace(/\./g, '-')); // 日付を適切な形式に変換
  const diffInDays =
    (currentDate.getTime() - blogDate.getTime()) / (1000 * 60 * 60 * 24); // 日数差分を計算
  return diffInDays <= 14; // 2週間以内か判定
};
