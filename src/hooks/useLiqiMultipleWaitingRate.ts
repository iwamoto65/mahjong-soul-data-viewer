import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiMultipleWaitingRate = (liqi: number, waitingTileCount: number[]) => {
  let multipleWaitingCount: number = 0

  if (liqi === 0) return 0

  waitingTileCount.forEach((count) => {
    if (count >= 2) multipleWaitingCount++
  })

  return fixFloatNumber((multipleWaitingCount / liqi) * 100)
}
