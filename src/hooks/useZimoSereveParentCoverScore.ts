export const CulcZimoSereveParentCoverScore = (parentCoverScores: number[]) => {
  if (parentCoverScores.length === 0) {
    return 0
  } else if (parentCoverScores.length === 1) {
    return Math.abs(parentCoverScores[0])
  }

  let sereveParentCoverScores: number[] = []

  parentCoverScores.forEach((score) => { if (Math.abs(score) >= 3900) sereveParentCoverScores.push(score) })
  const totalScore: number = parentCoverScores.reduce((a, b) => Math.abs(a) + Math.abs(b))

  return (totalScore / sereveParentCoverScores.length)
}
