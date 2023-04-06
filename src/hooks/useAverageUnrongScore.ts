export const CulcAverageUnrongScore = (unrong: number[]) => {
  if (unrong.length === 0) return 0

  const sumScore: number = unrong.reduce((a, b) => Math.abs(a) + Math.abs(b))
  const totalUnrongCount: number = unrong.length

  return (sumScore / totalUnrongCount).toFixed(0)
}
