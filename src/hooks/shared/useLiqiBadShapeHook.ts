export const useLiqiBadShapeHook = (remainingTileCount: number[]) => {
  if (remainingTileCount.length === 0) return 0

  let badShapeCount: number = 0
  remainingTileCount.forEach((count) => { if (count < 6) badShapeCount++ })

  return badShapeCount
}
