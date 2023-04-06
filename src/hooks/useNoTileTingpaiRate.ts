import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcNoTileTingpaiRate = (NoTileRound: number, noTileTingpaiRound: number) => {
  if (NoTileRound === 0) return 0

  return fixFloatNumber((noTileTingpaiRound / NoTileRound * 100))
}
