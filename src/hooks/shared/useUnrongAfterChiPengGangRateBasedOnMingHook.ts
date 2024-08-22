import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useUnrongAfterChiPengGangRateBasedOnMingHook = (chiPengGang: number, unrongAfterChiPengGang: number) => {
  if (chiPengGang === 0) return 0

  return fixFloatNumber((unrongAfterChiPengGang / chiPengGang) * 100)
}
