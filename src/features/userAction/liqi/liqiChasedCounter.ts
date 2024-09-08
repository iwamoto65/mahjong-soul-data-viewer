import type { UserInputActions, Round } from "@/types/userAction"

type Status = {
  round: number;
  player: { isLiqi: boolean, time: number };
  opponent: { isLiqi: boolean, times: number[] };
}[]
type LiqiChasedCount = number;

export const countLiqiChased = (seat: number, userInput: UserInputActions, rounds: Round[]): LiqiChasedCount => {
  let status: Status = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, player: { isLiqi: false, time: 0 }, opponent: { isLiqi: false, times: [] }}))
  let playerLiqiPassed: number[] = []
  let opponentLiqiPassed: number[] = []
  let liqiChasedCount: LiqiChasedCount = 0
  const operationType: { [key: string]: number } = { liqi: 7 }

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
            s.player.isLiqi = true
            s.player.time = playerPassed
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
    if (s.player.isLiqi && s.opponent.isLiqi) {
      if (s.player.time < s.opponent.times[0]) liqiChasedCount++
    }
  })

  return liqiChasedCount
}
