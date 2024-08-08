export const CulcLiqiIncomeAndExpenditure = (liqi: number, hule: { liqi: boolean, deltaScore: number }[], expenditures: number[]): number => {
  if (liqi === 0) return 0

  let incomes: number[] = []
  hule.forEach((h) => { if (h.liqi) incomes.push(h.deltaScore) })

  let incomeSumScore: number
  if (incomes.length === 0) {
    incomeSumScore = 0
  } else if (incomes.length === 1) {
    incomeSumScore = incomes[0]
  } else {
    incomeSumScore = incomes.reduce((a, b) => a + b)
  }

  let expenditureSumScore: number
  if (expenditures.length === 0) {
    expenditureSumScore = 0
  } else if (expenditures.length === 1) {
    expenditureSumScore = expenditures[0]
  } else {
    expenditureSumScore = expenditures.reduce((a, b) => a + b)
  }

  return Number(((incomeSumScore + expenditureSumScore - liqi * 1000) / liqi).toFixed(0))
}
