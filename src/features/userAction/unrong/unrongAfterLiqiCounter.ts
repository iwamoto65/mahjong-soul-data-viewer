export const countUnrongAfterLiqi = (
  seat: number,
  rounds: { round: number, startTime: number, endTime: number }[],
  dealTiles: any[],
  chiPengGangTiles: any[],
  unrongTimes: number[]
) => {
  let liqiFixedPassed: number[] = []
  let status: { round: number, liqi: boolean, unrong: boolean }[] = new Array(rounds.length).fill(null).map((_, i) => ({ round: i+1, liqi: false, unrong: false }))
  let unrongAfterLiqiCount: number = 0

  // 立直が成立した時間を取得
  dealTiles.concat(chiPengGangTiles).forEach((tile: { passed: number, result: { data: { liqi?: { seat: number }}}}) => {
    if (tile.result.data.liqi && tile.result.data.liqi.seat === seat) liqiFixedPassed.push(tile.passed)
  })

  // 立直成立時間と放銃時間を局ごとに分ける
  rounds.forEach((r) => {
    liqiFixedPassed.forEach((liqiTime: number) => {
      if (r.startTime < liqiTime && liqiTime < r.endTime) {
        status.forEach((s) => { if (s.round === r.round) s.liqi = true })
      }
    })
    unrongTimes.forEach((unrongTime: number) => {
      if (r.startTime < unrongTime && unrongTime < r.endTime) {
        status.forEach((s) => { if (s.round === r.round) s.unrong = true })
      }
    })
  })

  // 自分が立直している状態かつ放銃したときのみカウントする
  status.forEach((s) => { if (s.liqi && s.unrong) unrongAfterLiqiCount++ })

  return unrongAfterLiqiCount
}
