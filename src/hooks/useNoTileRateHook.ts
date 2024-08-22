import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useNoTileRateHook = (totalRound: number, noTileRound: number) => {
  if (totalRound === 0) return 0

  return fixFloatNumber((noTileRound / totalRound * 100))
}
