export const CulcLiqiIncome = (incomes: number[]) => {
  if (incomes.length === 0) return 0

  const sumScore = incomes.reduce((a, b) => a + b)
  const totalHuleCount = incomes.length

  return (sumScore / totalHuleCount).toFixed(0)
}
