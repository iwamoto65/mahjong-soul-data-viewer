export const storeUnrongScore = (seat: number, recordHule: any[]) => {
  let unrongScores: number[] = []

  recordHule.forEach((record) => {
    if (record.result.data.delta_scores[seat] < 0) {
      const NumberOfPeopleWithNegativeScore: number = record.result.data.delta_scores.filter((score: number) => score < 0).length
      if (NumberOfPeopleWithNegativeScore === 1) {
        unrongScores.push(record.result.data.delta_scores[seat])
      }
    }
  })

  return unrongScores
}
