export const CulcAverageDadianScore = (dadian: number[]) => {
  if (dadian.length === 0) return 0

  const sumScore: number = dadian.reduce((a, b) => a + b)
  const totalHuleCount: number = dadian.length

  return Number((sumScore / totalHuleCount).toFixed(0))
}
