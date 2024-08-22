export const useRoundIncomeAndExpenditureHook = (totalGame: number, totalRound: number, finalPoints: number[]) => {
  if (finalPoints.length === 0) {
    return 0
  } else if (finalPoints.length === 1) {
    return Number(((finalPoints[0] - 25000) * totalGame / totalRound).toFixed(0))
  }

  const sumPoints = finalPoints.reduce((a, b) => a + b)
  const averagePoints = (sumPoints / finalPoints.length)

  return Number(((averagePoints - 25000) * totalGame / totalRound).toFixed(0))
}
