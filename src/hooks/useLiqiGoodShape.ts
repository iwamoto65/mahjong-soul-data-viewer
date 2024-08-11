export const CulcLiqiGoodShape = (remainingTileCount: number[]) => {
  if (remainingTileCount.length === 0) return 0

  let goodShapeCount: number = 0
  remainingTileCount.forEach((count) => { if (count >= 6) goodShapeCount++ })

  return goodShapeCount
}
