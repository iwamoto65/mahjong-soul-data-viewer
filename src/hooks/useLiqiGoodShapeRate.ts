import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiGoodShapeRate = (remainingTileCount: number[]) => {
  if (remainingTileCount.length === 0) return

  let goodShapeCount: number = 0
  remainingTileCount.forEach((count) => { if (count >= 6) goodShapeCount++ })

  return fixFloatNumber((goodShapeCount / remainingTileCount.length) * 100)
}
