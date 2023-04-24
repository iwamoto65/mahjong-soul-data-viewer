import { CulcUnrongRate } from "./useUnrongRate"
import { CulcAverageUnrongScore } from "./useAverageUnrongScore"

export const CulcDefenseBalanceIndex = (totalRoundCount: number, totalUnrongCount: number, totalUnrongScore: number[]) => {
  const unrongRate: number = CulcUnrongRate(totalRoundCount, totalUnrongCount)
  const averageUnrongScore: number = CulcAverageUnrongScore(totalUnrongScore)

  return Number(((unrongRate / 100) * averageUnrongScore).toFixed(0))
}
