export const countUnrongAlongWithLiqi = (seat: number, recordDiscardTile: any[], unrongTimes: number[]) => {
  let discardTiles: any[] = []
  let discardTilePassed: any[] = []
  let passedJustBeforeUnrong: number[] = []
  let unrongCount: number = 0

  recordDiscardTile.forEach((record) => {
    if (record.result.data.seat === seat) discardTiles.push(record)
  })

  // RecordDiscardTile（打牌に関するデータ）の時間のみを取得
  discardTiles.forEach((data: { passed: number }) => discardTilePassed.push(data.passed))
  // 放銃する直前の打牌に関するデータの時間を取得（※findLastが使用できないのでreverseして時間を新→古の順番に並び替えている）
  unrongTimes.forEach((unrongTime: number) => passedJustBeforeUnrong.push(discardTilePassed.reverse().find((time: number) => time < unrongTime)))
  discardTiles.forEach((data: { passed: number, result: { data: { is_liqi: boolean }}}) => {
    passedJustBeforeUnrong.forEach((passed: number) => {
      if (data.passed === passed && data.result.data.is_liqi) unrongCount++
    })
  })

  return unrongCount
}
