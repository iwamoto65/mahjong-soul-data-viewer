import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcUnrongAfterChiPengGangRate = (unrong: number, unrongAfterChiPengGang: number) => {
  if (unrong === 0) return 0

  return fixFloatNumber((unrongAfterChiPengGang / unrong) * 100)
}
