import { useAttackBalanceIndexHook } from "./useAttackBalanceIndexHook"
import { useDefenseBalanceIndexHook } from "./useDefenseBalanceIndexHook"

export const useAttackAndDefenseBalanceIndexHook = (
  totalRoundCount: number,
  totalHuleCount: number,
  totalDadian: number[],
  totalUnrongCount: number,
  totalUnrongScore: number[]
) => {
  const attackBalanceIndex = useAttackBalanceIndexHook(totalRoundCount, totalHuleCount, totalDadian)
  const defenseBalanceIndex = useDefenseBalanceIndexHook(totalRoundCount, totalUnrongCount, totalUnrongScore)

  return (attackBalanceIndex - defenseBalanceIndex)
}
