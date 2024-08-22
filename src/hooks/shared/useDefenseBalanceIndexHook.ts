import { useUnrongRateHook } from "./useUnrongRateHook"
import { useAverageUnrongScoreHook } from "./useAverageUnrongScoreHook"

export const useDefenseBalanceIndexHook = (totalRoundCount: number, totalUnrongCount: number, totalUnrongScore: number[]) => {
  const unrongRate: number = useUnrongRateHook(totalRoundCount, totalUnrongCount)
  const averageUnrongScore: number = useAverageUnrongScoreHook(totalUnrongScore)

  return Number(((unrongRate / 100) * averageUnrongScore).toFixed(0))
}
