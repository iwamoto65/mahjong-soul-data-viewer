import { CulcHuleRate } from "./useHuleRate"
import { CulcAverageDadianScore } from '@/hooks/useAverageDadianScore';

export const CulcAttackBalanceIndex = (totalRoundCount: number, totalHuleCount: number, totalDadian: number[]) => {
  const huleRate: number = CulcHuleRate(totalRoundCount, totalHuleCount)
  const averageDadianScore: number = CulcAverageDadianScore(totalDadian)

  return Number(((huleRate / 100) * averageDadianScore).toFixed(0))
}
