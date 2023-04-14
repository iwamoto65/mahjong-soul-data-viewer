export const countLiqiPreemption = (seat: number, userInput: any[], rounds: { round: number, startTime: number, endTime: number }[]) => {
  let status: {
    round: number,
    player: { isLiqi: boolean, time: number },
    opponent: { isLiqi: boolean, times: number[] }
  }[] = new Array(rounds.length).fill(null).map((_, i) => ({ round: i + 1, player: { isLiqi: false, time: 0 }, opponent: { isLiqi: false, times: [] }}))
  let playerLiqiPassed: number[] = []
  let opponentLiqiPassed: number[] = []
  let liqiPreemptionCount: number = 0
  const operationType: { [key: string]: number } = { liqi: 7 }

  userInput.forEach((action: { passed: number, user_input: { seat: number, operation: { type: number } } }) => {
    if (action.user_input.operation && action.user_input.operation.type === operationType.liqi) {
      if (action.user_input.seat === seat) {
        playerLiqiPassed.push(action.passed)
      } else {
        opponentLiqiPassed.push(action.passed)
      }
    }
  })

  // 立直が成立しているか、また成立している場合はその時間を取得している
  rounds.forEach((r: { round: number, startTime: number, endTime: number }) => {
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
    if (s.player.isLiqi && !s.opponent.isLiqi) {
      liqiPreemptionCount++
    } else if (s.player.isLiqi && s.opponent.isLiqi) {
      if (s.player.time < s.opponent.times[0]) liqiPreemptionCount++
    }
  })

  return liqiPreemptionCount
}
