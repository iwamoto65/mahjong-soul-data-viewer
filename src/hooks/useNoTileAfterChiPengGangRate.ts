import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcNoTileAfterChiPengGangRate = (chiPengGang: number, noTileAfterChiPengGang: number) => {
  if (chiPengGang === 0) return 0

  return fixFloatNumber((noTileAfterChiPengGang / chiPengGang) * 100)
}
