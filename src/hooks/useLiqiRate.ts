import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiRate = (totalRound: number = 0, liqi: number = 0) => {
  if (totalRound === 0) return 0

  return fixFloatNumber((liqi / totalRound * 100))
}
