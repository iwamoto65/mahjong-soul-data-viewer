import type { RecordDealTileActions, RecordChiPengGangActions } from '@/types/userAction';

type ZhentingLiqiCount = number

export const countLiqiZhenting = (
  seat: number,
  recordDealTile: RecordDealTileActions,
  recordChiPengGang: RecordChiPengGangActions
): ZhentingLiqiCount => {
  let zhentingLiqiCount: ZhentingLiqiCount = 0
  const combineRecord = [...recordDealTile, ...recordChiPengGang]

  combineRecord.forEach((record) => {
    if (record.result.data.liqi && record.result.data.liqi.seat === seat) {
      if (record.result.data.zhenting[seat]) zhentingLiqiCount++
    }
  })

  return zhentingLiqiCount
}
