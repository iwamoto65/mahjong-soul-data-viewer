export const storeUnrongScore = (seat: number, recordHule: any[]) => {
  let liqiScores: number[] = []
  let unliqiScores: number[] = []

  recordHule.forEach((record) => {
    if (record.result.data.delta_scores[seat] < 0) {
      const NumberOfPeopleWithNegativeScore: number = record.result.data.delta_scores.filter((score: number) => score < 0).length

      if (NumberOfPeopleWithNegativeScore === 1) {
        record.result.data.hules.forEach((hule: { seat: number, liqi: boolean }) => {
          if (hule.seat === seat && hule.liqi) {
            liqiScores.push(record.result.data.delta_scores[seat])
          } else {
            unliqiScores.push(record.result.data.delta_scores[seat])
          }
        })
      }
    }
  })

  return { liqi: liqiScores, unliqi: unliqiScores }
}
