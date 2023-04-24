import { checkStateOfUnrongAlongWithLiqi } from "../common/stateOfUnrongAlongWithLiqiChecker"

export const countUnrongAfterChiPengGang = (seat: number, recordChiPengGang: any[], recordDiscardTile: any[], recordHule: any[], unrongTimes: number[], rounds: any[]) => {
  let status: { round: number, chiPengGang: boolean, unrong: boolean, score: number }[]
    = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, chiPengGang: false, unrong: false, score: 0 }))
  const unrongStatus = checkStateOfUnrongAlongWithLiqi(seat, recordDiscardTile, unrongTimes, rounds)
  let unrongAfterChiPengGang: { count: number, scores: number[] } = { count: 0, scores: [] }

  recordChiPengGang.forEach((record) => {
    rounds.forEach((r) => {
      if (r.startTime < record.passed && record.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round && record.result.data.seat === seat) s.chiPengGang = true
          unrongStatus.forEach((us) => {
            if (us.round === s.round) {
              s.unrong = true
              recordHule.forEach((rHule) => s.score = rHule.result.data.delta_scores[seat])
            }
          })
        })
      }
    })
  })

  status.forEach((s) => {
    if (s.chiPengGang && s.unrong) {
      unrongAfterChiPengGang.count++
      unrongAfterChiPengGang.scores.push(s.score)
    }
  })

  return unrongAfterChiPengGang
}
