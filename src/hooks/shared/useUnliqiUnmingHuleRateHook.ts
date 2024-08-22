import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useUnliqiUnmingHuleRateHook = (huleRound: number, unliqiRound: number) => {
  if (huleRound === 0) return 0

  return fixFloatNumber((unliqiRound / huleRound * 100))
}
