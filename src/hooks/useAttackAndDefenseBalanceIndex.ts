import { CulcAttackBalanceIndex } from "./useAttackBalanceIndex"
import { CulcDefenseBalanceIndex } from "./useDefenseBalanceIndex"

export const CulcAttackAndDefenseBalanceIndex = (
  totalRoundCount: number,
  totalHuleCount: number,
  totalDadian: number[],
  totalUnrongCount: number,
  totalUnrongScore: number[]
) => {
  const attackBalanceIndex = CulcAttackBalanceIndex(totalRoundCount, totalHuleCount, totalDadian)
  const defenseBalanceIndex = CulcDefenseBalanceIndex(totalRoundCount, totalUnrongCount, totalUnrongScore)

  return (attackBalanceIndex - defenseBalanceIndex)
}
