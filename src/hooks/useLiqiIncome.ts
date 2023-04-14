export const CulcLiqiIncome = (incomes: number[]) => {
  if (incomes.length === 0) {
    return 0
  } else if (incomes.length === 1) {
    return incomes[0] - 1000
  }

  const sumScore = incomes.reduce((a, b) => a + b) - (1000 * incomes.length)
  const totalHuleCount = incomes.length

  return (sumScore / totalHuleCount).toFixed(0)
}
