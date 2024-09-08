import { checkStateOfUnrongAlongWithLiqi } from "../common/stateOfUnrongAlongWithLiqiChecker"
import type { RecordDiscardTileActions, Round } from "@/types/userAction"

type WaitingTileCount = number[]

export const countLiqiWaitingTile = (
  seat: number,
  recordDiscardTile: RecordDiscardTileActions,
  unrongTimes: number[],
  rounds: Round[]
): WaitingTileCount => {
  let status: { round: number, waitingTileCount: number, isLiqi: boolean }[] = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, waitingTileCount: 0, isLiqi: false }))
  const unrongStatus = checkStateOfUnrongAlongWithLiqi(seat, recordDiscardTile, unrongTimes, rounds)
  let waitingTileCount: WaitingTileCount = []

  recordDiscardTile.forEach((record) => {
    if (record.result.data.seat === seat && (record.result.data.is_liqi || record.result.data.is_wliqi)) {
      rounds.forEach((r) => {
        if (r.startTime < record.passed && record.passed < r.endTime) {
          status.forEach((s) => {
            if (r.round == s.round) {
              s.isLiqi = true
              s.waitingTileCount = record.result.data.tingpais.length
            }
          })
        }
      })
    }
  })

  status.forEach((s) => {
    if (unrongStatus.length > 0) {
      unrongStatus.forEach((us) => {
        if (s.round !== us.round && s.isLiqi) waitingTileCount.push(s.waitingTileCount)
      })
    } else {
      if (s.isLiqi) waitingTileCount.push(s.waitingTileCount)
    }
  })

  return waitingTileCount
}
