export const useAverageLiqiTurnHook = (turns: number[]) => {
  if (turns.length === 0) {
    return 0
  } else if (turns.length === 1) {
    return turns[0]
  }

  const sumTurns = turns.reduce((a, b) => a + b)

  return (sumTurns / turns.length).toFixed(3)
}
