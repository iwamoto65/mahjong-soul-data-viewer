import { fixFloatNumber } from "@/utils/fixFloatNumber";

export const GameLatestTitleCard = ({ title, result, totalCount, totalRound }: { title: string; result: number; totalCount: number; totalRound: number }) => {
  return (
    <div
      className="rounded-lg"
      style={{
        backgroundColor: "#F5F6FB",
        backgroundImage: "linear-gradient(135deg, #F5F6FB 0%, #EBEDF3 100%)",
        borderColor: "#D9DBE1",
        border: "1px solid #D9DBE1", // 薄い境界線
        boxShadow: "0px 4px 6px rgba(46, 59, 78, 0.1), 0px 8px 12px rgba(46, 59, 78, 0.05)",
      }}
    >
      <div className="py-10 text-center">
        <p className="mt-4 text-3xl font-bold" style={{ color: "#2E3B4E" }}>
          <span>{title}</span>&nbsp;
          <span className="ml-5">{totalCount}</span>
        </p>
        <p className="mt-4" style={{ color: "#7A8190" }}>
          <span>
            {title}率：{fixFloatNumber(result)}%
          </span>
          &nbsp;
          <span className="ml-3">総局数：{totalRound}</span>
        </p>
      </div>
    </div>
  );
};
