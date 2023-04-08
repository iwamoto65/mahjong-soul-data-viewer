export const countChiPengGang = (rounds: { round: number, startTime: number, endTime: number }[], chiPengGangTimes: number[]) => {
  let chiPengGangRounds: number[] = []

  rounds.forEach((r) => {
    chiPengGangTimes.forEach((t) => {
      if (r.startTime < t && t < r.endTime) chiPengGangRounds.push(r.round)
    })
  })

  const chiPengGangUniqueCount: number = new Set(chiPengGangRounds).size

  return chiPengGangUniqueCount
}
