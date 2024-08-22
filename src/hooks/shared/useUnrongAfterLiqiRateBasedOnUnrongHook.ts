import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useUnrongAfterLiqiRateBasedOnUnrongHook = (unrong: number, unrongAfterLiqi: number): number => {
  if (unrong === 0) return 0

  return fixFloatNumber((unrongAfterLiqi / unrong) * 100)
}
