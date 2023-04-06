import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcHuleRate = (totalRound: number = 0, hules: number = 0) => {
  if (totalRound === 0) return 0

  return fixFloatNumber((hules / totalRound * 100))
}
