import type { UserAccount } from "@/types/userAccount"
import type { UserResult } from "@/types/userResult"
import type { RecordNewRoundActions } from "@/types/userAction"

type Status = {
  player: string
  scores: {
    [key: string]: number
  }
}[]

export const storeScoreTrend = (
  userAccounts: UserAccount[],
  userResults: UserResult[],
  recordNewRound: RecordNewRoundActions
): Status => {
  let status: Status = userAccounts.map((account) => ({ player: account.nickname, scores: {} }))

  recordNewRound.forEach((record) => {
    const data = record.result.data
    const round = `${data.chang}${data.ju}${data.ben}`

    status.forEach((s, i) => Object.assign(s.scores, { [round]: data.scores[i] }))
  })

  // 対局終了時の最終スコアも必要なのでkeyを999としてvalueを渡している。
  userResults.forEach((result: { seat: number, part_point_1: number }) => {
    Object.assign(status[result.seat].scores, { 999: result.part_point_1 })
  })

  return status
}
