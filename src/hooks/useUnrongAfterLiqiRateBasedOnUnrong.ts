import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcUnrongAfterLiqiRateBasedOnUnrong = (unrong: number, unrongAfterLiqi: number): number => {
  if (unrong === 0) return 0

  return fixFloatNumber((unrongAfterLiqi / unrong) * 100)
}
