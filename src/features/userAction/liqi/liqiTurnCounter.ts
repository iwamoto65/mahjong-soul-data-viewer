import { checkStateOfUnrongAlongWithLiqi } from "../common/stateOfUnrongAlongWithLiqiChecker"
import type { UserInputActions, RecordDiscardTileActions, Round } from "@/types/userAction"

type LiqiTurns = number[]

export const countLiqiTurn = (
  seat: number,
  userInput: UserInputActions,
  recordDiscardTile: RecordDiscardTileActions,
  unrongTimes: number[],
  rounds: Round[]
): LiqiTurns => {
  let userInputPassed: number[] = []
  const operationType: { [key: string]: number } = { discardTile: 1, anGang: 4, addGang: 6, liqi: 7 }
  let status: { round: number, passed: number[] }[] = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, passed: [] }))
  const unrongStatus = checkStateOfUnrongAlongWithLiqi(seat, recordDiscardTile, unrongTimes, rounds)
  let liqiTurns: LiqiTurns = []

  userInput.forEach((action) => {
    if (action.result.seat === seat && action.result.operation && Object.values(operationType).includes(action.result.operation.type)) {
      userInputPassed.push(action.passed)
    }
  })

  rounds.forEach((r: Round) => {
    userInputPassed.forEach((passed) => {
      if (r.startTime < passed && passed < r.endTime) {
        status.forEach((s) => { if (r.round === s.round) s.passed.push(passed) })
      }
    })
  })

  status.forEach((s) => {
    s.passed.forEach((passed) => {
      userInput.forEach((action: { passed: number, result: { operation: { type: number }}}) => {
        if (action.passed === passed && action.result.operation.type === operationType.liqi) {
          if (unrongStatus.length > 0) {
            unrongStatus.forEach((us) => { if (us.round !== s.round) liqiTurns.push(s.passed.length) })
          } else {
            liqiTurns.push(s.passed.length)
          }
        }
      })
    })
  })

  return liqiTurns
}
