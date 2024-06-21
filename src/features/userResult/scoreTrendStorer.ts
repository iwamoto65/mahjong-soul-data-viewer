export const storeScoreTrend = (userAccounts: any[], userResults: any[], recordNewRound: any[]) => {
  let status: { player: string, scores: { [key: string]: number } }[] = userAccounts.map((account) => ({ player: account.nickname, scores: {} }))

  recordNewRound.forEach((record) => {
    const data = record.result.data
    const round = `${data.chang}${data.ju}${data.ben}`

    status.forEach((s, i) => Object.assign(s.scores, { [round]: data.scores[i] }))
  })

  // 最終局の数字を割り出せないので999と定義する
  userResults.forEach((result: { part_point_1: number }, i: number) => {
    Object.assign(status[i].scores, { 999: result.part_point_1 })
  })

  return status
}
