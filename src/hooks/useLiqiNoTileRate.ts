import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiNoTileRate = (liqi: number, noTile: number) => {
  if (liqi === 0) return 0

  return fixFloatNumber((noTile / liqi) * 100)
}
