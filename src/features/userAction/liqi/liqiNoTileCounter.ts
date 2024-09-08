import type { RecordNoTileActions, RecordDealTileActions, RecordChiPengGangActions, Round } from "@/types/userAction"

type Status = {
  round: number;
  isTingpai: boolean;
  isLiqi: boolean;
}[]
type LiqiNoTileCount = number

export const countLiqiNoTile = (
  seat: number,
  recordNoTile: RecordNoTileActions,
  recordDealTile: RecordDealTileActions,
  recordChiPengGang: RecordChiPengGangActions,
  rounds: Round[]
): LiqiNoTileCount => {
  let status: Status = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, isTingpai: false, isLiqi: false }))
  let liqiNoTileCount: LiqiNoTileCount = 0

  recordNoTile.forEach((record: { passed: number, result: { data: { players: { tingpai: boolean }[] }}}) => {
    rounds.forEach((r) => {
      if (r.startTime < record.passed && record.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round) {
            if (record.result.data.players[seat].tingpai) s.isTingpai = true
          }
        })
      }
    })
  })

  const combineRecord = [...recordDealTile, ...recordChiPengGang]

  combineRecord.forEach((record: { passed: number, result: { data: { liqi?: { seat: number }}}}) => {
    if (record.result.data.liqi && record.result.data.liqi.seat === seat) {
      rounds.forEach((r) => {
        if (r.startTime < record.passed && record.passed < r.endTime) {
          status.forEach((s) => {
            if (s.round === r.round) s.isLiqi = true
          })
        }
      })
    }
  })

  status.forEach((s) => {
    if (s.isTingpai && s.isLiqi) liqiNoTileCount++
  })

  return liqiNoTileCount
}
