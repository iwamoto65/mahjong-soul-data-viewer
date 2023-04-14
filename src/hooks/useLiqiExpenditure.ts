export const CulcLiqiExpenditure = (expenditures: number[]) => {
  if (expenditures.length === 0) {
    return 0
  } else if (expenditures.length === 1) {
    return Math.abs(expenditures[0]) + 1000
  }

  const sumScore = expenditures.reduce((a, b) => Math.abs(a) + Math.abs(b))
  const liqibengs = (1000 * expenditures.length)
  const totalHuleCount = expenditures.length

  return ((sumScore + liqibengs) / totalHuleCount).toFixed(0)
}
