import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useNoTileTingpaiRateHook = (NoTileRound: number, noTileTingpaiRound: number) => {
  if (NoTileRound === 0) return 0

  return fixFloatNumber((noTileTingpaiRound / NoTileRound * 100))
}
