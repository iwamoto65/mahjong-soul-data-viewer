import { fixFloatNumber } from "@/utils/fixFloatNumber";

export const GameLatestTitleCard = ({ title, result, totalCount, totalRound }: { title: string; result: number; totalCount: number; totalRound: number }) => {
  return (
    <div className="drop-shadow-lg rounded-lg" style={{ backgroundColor: "#F5F6FB" }}>
      <div className="py-10 text-center">
        <p className="mt-4 text-3xl font-bold">
          <span>{title}</span>&nbsp;
          <span className="ml-5">{totalCount}</span>
        </p>
        <p className="mt-4">
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
