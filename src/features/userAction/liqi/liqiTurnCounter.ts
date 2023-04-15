import { checkStateOfUnrongAlongWithLiqi } from "../common/stateOfUnrongAlongWithLiqiChecker"

export const countLiqiTurn = (seat: number, userInput: any[], recordDiscardTile: any[], unrongTimes: number[], rounds: any[]) => {
  let userInputPassed: number[] = []
  const operationType: { [key: string]: number } = { discardTile: 1, anGang: 4, addGang: 6, liqi: 7 }
  let status: { round: number, passed: number[] }[] = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, passed: [] }))
  const unrongStatus = checkStateOfUnrongAlongWithLiqi(seat, recordDiscardTile, unrongTimes, rounds)
  let liqiTurns: number[] = []

  userInput.forEach((action) => {
    if (action.user_input.seat === seat && action.user_input.operation && Object.values(operationType).includes(action.user_input.operation.type)) {
      userInputPassed.push(action.passed)
    }
  })

  rounds.forEach((r: { round: number, startTime: number, endTime: number }) => {
    userInputPassed.forEach((passed) => {
      if (r.startTime < passed && passed < r.endTime) {
        status.forEach((s) => { if (r.round === s.round) s.passed.push(passed) })
      }
    })
  })

  status.forEach((s) => {
    s.passed.forEach((passed) => {
      userInput.forEach((action: { passed: number, user_input: { operation: { type: number }}}) => {
        if (action.passed === passed && action.user_input.operation.type === operationType.liqi) {
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
