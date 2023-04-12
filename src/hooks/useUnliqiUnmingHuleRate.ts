import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcUnliqiUnmingHuleRate = (huleRound: number, unliqiRound: number) => {
  if (huleRound === 0) return 0

  return fixFloatNumber((unliqiRound / huleRound * 100))
}
