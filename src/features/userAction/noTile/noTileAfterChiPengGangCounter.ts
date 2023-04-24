export const countNoTileAfterChiPengGang = (seat: number, recordChiPengGang: any[], recordNoTile: any[], rounds: any[]) => {
  let status: { round: number, chiPengGang: boolean, noTile: boolean }[] = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, chiPengGang: false, noTile: false }))
  let noTileAfterChiPengGangCount: number = 0

  recordChiPengGang.forEach((record) => {
    rounds.forEach((r) => {
      if (r.startTime < record.passed && record.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round && record.result.data.seat === seat) {
            s.chiPengGang = true
          }
        })
      }
    })
  })

  recordNoTile.forEach((record) => {
    rounds.forEach((r) => {
      if (r.startTime < record.passed && record.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round) {
            s.noTile = true
          }
        })
      }
    })
  })

  status.forEach((s) => { if (s.chiPengGang && s.noTile) noTileAfterChiPengGangCount++ })

  return noTileAfterChiPengGangCount
}
