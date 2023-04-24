import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcHuleAfterMingRate = (chiPengGang: number, huleAfterChiPengGang: number) => {
  if (chiPengGang === 0) return 0

  return fixFloatNumber((huleAfterChiPengGang / chiPengGang) * 100)
}
