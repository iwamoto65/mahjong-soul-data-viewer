import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcUnrongRate = (totalRound: number = 0, unrong: number = 0) => {
  if (totalRound === 0) return 0

  return fixFloatNumber((unrong / totalRound * 100))
}
