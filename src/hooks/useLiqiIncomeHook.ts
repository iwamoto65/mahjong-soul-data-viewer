export const useLiqiIncomeHook = (hule: { liqi: boolean, deltaScore: number }[]): number => {
  let incomes: number[] = []

  hule.forEach((h) => { if (h.liqi) incomes.push(h.deltaScore) })

  if (incomes.length === 0) {
    return 0
  } else if (incomes.length === 1) {
    return incomes[0] - 1000
  }

  const sumScore = incomes.reduce((a, b) => a + b) - (1000 * incomes.length)
  const totalHuleCount = incomes.length

  return Number((sumScore / totalHuleCount).toFixed(0))
}
