import { checkStateOfUnrongAlongWithLiqi } from "../common/stateOfUnrongAlongWithLiqiChecker"
import type { UserInputActions, RecordDiscardTileActions, Round } from "@/types/userAction"

type Status = {
  round: number;
  player: { isLiqi: boolean, time: number };
  opponent: { isLiqi: boolean, times: number[] };
}[]
type LiqiPreemptionCount = number

export const countLiqiPreemption = (
  seat: number,
  userInput: UserInputActions,
  recordDiscardTile: RecordDiscardTileActions,
  unrongTimes: number[],
  rounds: Round[]
): LiqiPreemptionCount => {
  let status: Status = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, player: { isLiqi: false, time: 0 }, opponent: { isLiqi: false, times: [] }}))
  let playerLiqiPassed: number[] = []
  let opponentLiqiPassed: number[] = []
  let liqiPreemptionCount: LiqiPreemptionCount = 0
  const operationType: { [key: string]: number } = { liqi: 7 }
  const unrongStatus = checkStateOfUnrongAlongWithLiqi(seat, recordDiscardTile, unrongTimes, rounds)

  userInput.forEach((action: { passed: number, result: { seat: number, operation: { type: number } } }) => {
    if (action.result.operation && action.result.operation.type === operationType.liqi) {
      if (action.result.seat === seat) {
        playerLiqiPassed.push(action.passed)
      } else {
        opponentLiqiPassed.push(action.passed)
      }
    }
  })

  // 立直が成立しているか、また成立している場合はその時間を取得している
  rounds.forEach((r: Round) => {
    playerLiqiPassed.forEach((playerPassed: number) => {
      if (r.startTime < playerPassed && playerPassed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round) {
            if (unrongStatus.length > 0) {
              unrongStatus.forEach((us) => {
                if (us.round !== s.round) {
                  s.player.isLiqi = true
                  s.player.time = playerPassed
                }
              })
            } else {
              s.player.isLiqi = true
              s.player.time = playerPassed
            }
          }
        })
      }
    })
    opponentLiqiPassed.forEach((opponentPassed: number) => {
      if (r.startTime < opponentPassed && opponentPassed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round) {
            s.opponent.isLiqi = true
            s.opponent.times.push(opponentPassed)
          }
        })
      }
    })
  })

  status.forEach((s) => {
    if (s.player.isLiqi && !s.opponent.isLiqi) {
      liqiPreemptionCount++
    } else if (s.player.isLiqi && s.opponent.isLiqi) {
      if (s.player.time < s.opponent.times[0]) liqiPreemptionCount++
    }
  })

  return liqiPreemptionCount
}
