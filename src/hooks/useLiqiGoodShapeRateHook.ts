import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useLiqiGoodShapeRateHook = (remainingTileCount: number[]) => {
  if (remainingTileCount.length === 0) return 0

  let goodShapeCount: number = 0
  remainingTileCount.forEach((count) => { if (count >= 6) goodShapeCount++ })

  return fixFloatNumber((goodShapeCount / remainingTileCount.length) * 100)
}
