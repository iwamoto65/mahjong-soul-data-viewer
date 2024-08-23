export const TabItem = ({ title, count, style }: { title: string; count: number; style?: string }) => {
  return (
    <div className={`flex justify-between ${style}`}>
      <span>{title}</span>
      <span>{count}</span>
    </div>
  );
};
