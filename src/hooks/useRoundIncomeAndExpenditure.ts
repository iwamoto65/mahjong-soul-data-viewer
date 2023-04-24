export const CulcRoundIncomeAndExpenditure = (totalGame: number, totalRound: number, finalPoints: number[]) => {
  if (finalPoints.length === 0) {
    return 0
  } else if (finalPoints.length === 1) {
    return ((finalPoints[0] - 25000) * totalGame / totalRound)
  }

  const sumPoints = finalPoints.reduce((a, b) => a + b)
  const averagePoints = (sumPoints / finalPoints.length)

  return ((averagePoints - 25000) * totalGame / totalRound)
}
