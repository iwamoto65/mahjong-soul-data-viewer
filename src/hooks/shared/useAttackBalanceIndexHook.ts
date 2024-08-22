import { useHuleRateHook } from "./useHuleRateHook"
import { useAverageDadianScoreHook } from '@/hooks/shared/useAverageDadianScoreHook';

export const useAttackBalanceIndexHook = (totalRoundCount: number, totalHuleCount: number, totalDadian: number[]) => {
  const huleRate: number = useHuleRateHook(totalRoundCount, totalHuleCount)
  const averageDadianScore: number = useAverageDadianScoreHook(totalDadian)

  return Number(((huleRate / 100) * averageDadianScore).toFixed(0))
}
