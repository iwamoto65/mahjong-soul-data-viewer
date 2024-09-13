export const GameLatestGameResult = ({
  modeState,
  rankLevel,
  gameRecordStats,
}: {
  modeState: { type: string; room: string };
  rankLevel: string;
  gameRecordStats: { place: number; finalPoint: number; gradingScore: number };
}) => {
  return (
    <>
      <h1 className="m-0 text-xl font-bold text-[#333B4F] font-roboto">対局結果</h1>
      <div className="grid grid-cols-2 gap-y-4 mt-6 font-roboto">
        <GameResultItem title={"部屋"} value={modeState.type + modeState.room} />
        <GameResultItem title={"段位"} value={rankLevel.replace(/三麻|四麻/g, "")} />
        <GameResultItem title={"順位"} value={gameRecordStats.place} />
        <GameResultItem title={"最終持ち点"} value={gameRecordStats.finalPoint} />
        <GameResultItem title={"獲得ポイント"} value={gameRecordStats.gradingScore} />
      </div>
    </>
  );
};

const GameResultItem = ({ title, value }: { title: string; value: string | number }) => {
  return (
    <>
      <p className="text-xl text-gray-600">{title}</p>
      <p className="text-right text-xl font-medium text-[#333B4F]">{value}</p>
    </>
  );
};
