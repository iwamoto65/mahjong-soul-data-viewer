import type { RecordDiscardTileActions, Round } from "@/types/userAction"

type UnrongAlongWithLiqi = {
  round: number,
  time: number | undefined
}[]

// 放銃時に立直しているかどうかを判定する処理
export const checkStateOfUnrongAlongWithLiqi = (
  seat: number,
  recordDiscardTile: RecordDiscardTileActions,
  unrongTimes: number[],
  rounds: Round[]
): UnrongAlongWithLiqi => {
  let discardTiles: RecordDiscardTileActions = []
  let discardTilePassed: any[] = []
  let passedJustBeforeUnrong: number[] = []
  let unrongAlongWithLiqi: UnrongAlongWithLiqi = []

  // RecordDiscardTile（打牌に関するデータ）の時間のみを取得
  recordDiscardTile.forEach((record) => {
    if (record.result.data.seat === seat) {
      discardTiles.push(record)
      discardTilePassed.push(record.passed)
    }
  })

  // 放銃する直前の打牌に関するデータの時間を取得（※findLastが使用できないのでreverseして時間を新→古の順番に並び替えている）
  unrongTimes.forEach((unrongTime: number) => passedJustBeforeUnrong.push(discardTilePassed.reverse().find((time: number) => time < unrongTime)))
  // 放銃する直前の打牌で立直を宣言している場合は立直時放銃としてカウントする
  discardTiles.forEach((data: { passed: number, result: { data: { is_liqi: boolean }}}) => {
    passedJustBeforeUnrong.forEach((passed: number) => {
      if (data.passed === passed && data.result.data.is_liqi) {
        rounds.forEach((r: Round) => {
          if (r.startTime < passed && passed < r.endTime) {
            unrongAlongWithLiqi.push({ round: r.round, time: unrongTimes.find((unrongTime: number) => unrongTime > passed) })
          }
        })
      }
    })
  })

  return unrongAlongWithLiqi
}
