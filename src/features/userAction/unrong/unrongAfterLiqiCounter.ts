export const countUnrongAfterLiqi = (
  seat: number,
  rounds: { round: number, startTime: number, endTime: number }[],
  dealTiles: any[],
  chiPengGangTiles: any[],
  unrongTimes: number[],
  recordHule: any[]
) => {
  let liqiFixedPassed: number[] = []
  let status: { round: number, liqi: boolean, unrong: boolean, score: number }[] = new Array(rounds.length).fill(null).map((_, i) => ({ round: i+1, liqi: false, unrong: false, score: 0 }))
  let unrongAfterLiqi: { total: number, scores: number[] } = { total: 0, scores: [] }
  let unrongFixed: { passed: number, score: number }[] = []

  // 立直が成立した時間を取得
  dealTiles.concat(chiPengGangTiles).forEach((tile: { passed: number, result: { data: { liqi?: { seat: number }}}}) => {
    if (tile.result.data.liqi && tile.result.data.liqi.seat === seat) liqiFixedPassed.push(tile.passed)
  })

  recordHule.forEach((record) => {
    unrongTimes.forEach((unrongTime) => {
      if (unrongTime === record.passed) {
        unrongFixed.push({ passed: unrongTime, score: record.result.data.delta_scores[seat] })
      }
    })
  })

  // 立直成立時間と放銃時間を局ごとに分ける
  rounds.forEach((r) => {
    liqiFixedPassed.forEach((liqiTime: number) => {
      if (r.startTime < liqiTime && liqiTime < r.endTime) {
        status.forEach((s) => { if (s.round === r.round) s.liqi = true })
      }
    })
    unrongFixed.forEach((fixed: { passed: number, score: number }) => {
      if (r.startTime < fixed.passed && fixed.passed < r.endTime) {
        status.forEach((s) => {
          if (s.round === r.round) {
            s.unrong = true
            s.score = fixed.score
          }
        })
      }
    })
  })

  // 自分が立直している状態かつ放銃したときのみカウントする
  status.forEach((s) => {
    if (s.liqi && s.unrong) {
      unrongAfterLiqi.total++
      unrongAfterLiqi.scores.push(s.score)
    }
  })

  return unrongAfterLiqi
}
