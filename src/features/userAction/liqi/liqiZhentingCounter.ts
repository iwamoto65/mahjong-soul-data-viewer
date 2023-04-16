export const countLiqiZhenting = (seat: number, recordDealTile: any[], recordChiPengGang: any[]) => {
  let zhentingLiqiCount: number = 0

  recordDealTile.concat(recordChiPengGang).forEach((record) => {
    if (record.result.data.liqi && record.result.data.liqi.seat === seat) {
      if (record.result.data.zhenting[seat]) zhentingLiqiCount++
    }
  })

  return zhentingLiqiCount
}
