import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const GameLatestCard = ({ title, result, totalCount, totalRound }: { title: string, result: number, totalCount: number, totalRound: number }) => {
  return (
    <div className="drop-shadow-lg rounded-lg" style={{ backgroundColor: '#F5F6FB' }}>
      <div className="py-10 text-center">
        <p className="mt-4 text-3xl font-bold">
          <span>{ title }率</span>&nbsp;
          <span className="ml-5">{ fixFloatNumber(result) }%</span>
        </p>
        <p className="mt-4">
          <span>{title}回数：{ totalCount }</span>&nbsp;
          <span className="ml-3">総局数：{ totalRound }</span>
        </p>
      </div>
    </div>
  )
}
