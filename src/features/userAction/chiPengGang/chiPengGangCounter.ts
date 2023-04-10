export const countChiPengGang = (rounds: { round: number, startTime: number, endTime: number }[], recordChiPengGang: any[], seat: number) => {
  let chiPengGangTimes: number[] = []
  let chiPengGangRounds: number[] = []

  recordChiPengGang.forEach((record) => {
    if (record.result.data.seat === seat) chiPengGangTimes.push(record.passed)
  })

  rounds.forEach((r) => {
    chiPengGangTimes.forEach((t) => {
      if (r.startTime < t && t < r.endTime) chiPengGangRounds.push(r.round)
    })
  })

  const chiPengGangUniqueCount: number = new Set(chiPengGangRounds).size

  return chiPengGangUniqueCount
}
