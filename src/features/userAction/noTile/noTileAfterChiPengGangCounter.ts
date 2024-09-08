import type { RecordChiPengGangActions, RecordNoTileActions, Round } from "@/types/userAction"

type NoTileAfterChiPengGangCount = number

export const countNoTileAfterChiPengGang = (
  seat: number,
  recordChiPengGang: RecordChiPengGangActions,
  recordNoTile: RecordNoTileActions,
  rounds: Round[]
): NoTileAfterChiPengGangCount => {
  let status: { round: number, chiPengGang: boolean, noTile: boolean }[] = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, chiPengGang: false, noTile: false }))
  let noTileAfterChiPengGangCount: NoTileAfterChiPengGangCount = 0

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
    rounds.forEach((r: Round) => {
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
