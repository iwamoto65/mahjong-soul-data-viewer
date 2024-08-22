import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useZimoRateHook = (huleRound: number = 0, zimoRound: number = 0) => {
  if (huleRound === 0) return 0

  return fixFloatNumber((zimoRound / huleRound * 100))
}
