export const CulcAverageUnrongScore = (unrong: number[]) => {
  if (unrong.length === 0) {
    return 0
  } else if (unrong.length === 1) {
    return Math.abs(unrong[0])
  }

  const sumScore: number = unrong.reduce((a, b) => Math.abs(a) + Math.abs(b))
  const totalUnrongCount: number = unrong.length

  return (sumScore / totalUnrongCount).toFixed(0)
}
