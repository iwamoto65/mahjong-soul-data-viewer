import type { RecordHuleActions, Round } from "@/types/userAction"

type ParentCoverScores = number[]

export const countZimoSevereParentCover = (
  seat: number,
  recordHule: RecordHuleActions,
  rounds: Round[]
): ParentCoverScores => {
  let status: { round: number, record: any[] }[] = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, record: [] }))
  let parentCoverScores: ParentCoverScores = []

  recordHule.forEach((record) => {
    rounds.forEach((r) => {
      if (r.startTime < record.passed && record.passed < r.endTime) {
        record.result.data.hules.forEach((hule: { seat: number, zimo: boolean, qinjia: boolean }) => {
          status.forEach((s) => {
            if (r.round === s.round && hule.seat !== seat && hule.zimo && !hule.qinjia) {
              if (record.result.data.delta_scores[seat] === Math.min(...record.result.data.delta_scores)) {
                parentCoverScores.push(record.result.data.delta_scores[seat])
              }
            }
          })
        })
      }
    })
  })

  return parentCoverScores
}
