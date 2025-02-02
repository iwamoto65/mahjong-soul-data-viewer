import type { RecordChiPengGangActions, RecordHuleActions, Round } from "@/types/userAction"

type UnrongAfterChiPengGang = {
  total: number
  scores: number[]
}

export const countUnrongAfterChiPengGang = (
  seat: number,
  recordChiPengGang: RecordChiPengGangActions,
  recordHule: RecordHuleActions,
  unrongTimes: number[],
  rounds: Round[]
): UnrongAfterChiPengGang => {
  let status: { round: number, chiPengGang: boolean, unrong: boolean, score: number }[]
    = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, chiPengGang: false, unrong: false, score: 0 }))
  let unrongAfterChiPengGang: UnrongAfterChiPengGang = { total: 0, scores: [] }

  recordChiPengGang.forEach((record) => {
    rounds.forEach((r) => {
      if (r.startTime < record.passed && record.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round && record.result.data.seat === seat) {
            s.chiPengGang = true
            unrongTimes.forEach((ut) => {
              if (r.startTime < ut && ut < r.endTime) {
                s.unrong = true
                recordHule.forEach((rHule) => { if (rHule.passed === ut) s.score = rHule.result.data.delta_scores[seat] })
              }
            })
          }
        })
      }
    })
  })

  status.forEach((s) => {
    if (s.chiPengGang && s.unrong) {
      unrongAfterChiPengGang.total++
      unrongAfterChiPengGang.scores.push(s.score)
    }
  })

  return unrongAfterChiPengGang
}
